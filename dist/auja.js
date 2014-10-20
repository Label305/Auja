/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.15 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var requirejs, require, define;
(function (global) {
    var req, s, head, baseElement, dataMain, src,
        interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = '2.1.15',
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
        //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
                      /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',
        //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === 'object' && value &&
                        !isArray(value) && !isFunction(value) &&
                        !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    function defaultOnError(err) {
        throw err;
    }

    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite an existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof require !== 'undefined' && !isFunction(require)) {
        //assume it is a config object.
        cfg = require;
        require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers,
            checkLoadedTimeoutId,
            config = {
                //Defaults. Do not set a default for map
                //config to speed up normalize(), which
                //will run faster if there is no default.
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            registry = {},
            //registry of just enabled modules, to speed
            //cycle breaking code when lots of modules
            //are registered, but not activated.
            enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            defined = {},
            urlFetched = {},
            bundlesMap = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; i < ary.length; i++) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i == 1 && ary[2] === '..') || ary[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex,
                foundMap, foundI, foundStarMap, starI, normalizedBaseParts,
                baseParts = (baseName && baseName.split('/')),
                map = config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // If wanting node ID compatibility, strip .js from end
                // of IDs. Have to do this here, and not in nameToUrl
                // because node allows either .js or non .js to map
                // to same file.
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                // Starts with a '.' so need the baseName
                if (name[0].charAt(0) === '.' && baseParts) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = normalizedBaseParts.concat(name);
                }

                trimDots(name);
                name = name.join('/');
            }

            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split('/');

                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop;
                                }
                            }
                        }
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            // If the name points to a package's name, use
            // the package main instead.
            pkgMain = getOwn(config.pkgs, name);

            return pkgMain ? pkgMain : name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name &&
                            scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);

                //Custom require that does not do map translation, since
                //ID is "absolute", already mapped/resolved.
                context.makeRequire(null, {
                    skipMap: true
                })([id]);

                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        // If nested plugin references, then do not try to
                        // normalize, as it will not normalize correctly. This
                        // places a restriction on resourceIds, and the longer
                        // term solution is not to normalize until plugins are
                        // loaded and all normalizations to allow for async
                        // loading of a loader plugin. But for now, fixes the
                        // common uses. Details in #1131
                        normalizedName = name.indexOf('!') === -1 ?
                                         normalize(name, parentName, applyMap) :
                                         name;
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ?
                     '_unnormalized' + (unnormalizedCounter += 1) :
                     '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ?
                        prefix + '!' + normalizedName :
                        normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(defined, id) &&
                    (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === 'error') {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                //Array splice in the values since the context code has a
                //local var ref to defQueue, so cannot just reassign the one
                //on context.
                apsp.apply(defQueue,
                           [defQueue.length, 0].concat(globalDefQueue));
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function (mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return (mod.require = context.makeRequire(mod.map));
                }
            },
            'exports': function (mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return (defined[mod.map.id] = mod.exports);
                    } else {
                        return (mod.exports = defined[mod.map.id] = {});
                    }
                }
            },
            'module': function (mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return (mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function () {
                            return  getOwn(config.config, mod.map.id) || {};
                        },
                        exports: mod.exports || (mod.exports = {})
                    });
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var err, usingPathFallback,
                waitInterval = config.waitSeconds * 1000,
                //It is possible to disable the wait interval by using waitSeconds of 0.
                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function (mod) {
                var map = mod.map,
                    modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return (needCycleCheck = false);
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function (i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function () {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = (new Date()).getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function () {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err, cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    this.fetch();
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error. However,
                            //only do it for define()'d  modules. require
                            //errbacks should not be called for failures in
                            //their callbacks (#699). However if a global
                            //onError is set, use that.
                            if ((this.events.error && this.map.isDefine) ||
                                req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            // Favor return value over exports. If node/cjs in play,
                            // then will not have a return value anyway. Favor
                            // module.exports assignment over exports object.
                            if (this.map.isDefine && exports === undefined) {
                                cjsModule = this.module;
                                if (cjsModule) {
                                    exports = cjsModule.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                return onError((this.error = err));
                            }

                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;

                            if (req.onResourceLoad) {
                                req.onResourceLoad(context, this.map, this.depMaps);
                            }
                        }

                        //Clean up
                        cleanRegistry(id);

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }

                }
            },

            callPlugin: function () {
                var map = this.map,
                    id = map.id,
                    //Map already normalized the prefix.
                    pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod,
                        bundleId = getOwn(bundlesMap, this.map.id),
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                            enableBuildCallback: true
                        });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name,
                                                      this.map.parentMap);
                        on(normalizedMap,
                            'defined', bind(this, function (value) {
                                this.init([], function () { return value; }, null, {
                                    enabled: true,
                                    ignore: true
                                });
                            }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () { return value; }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError('fromtexteval',
                                             'fromText eval for ' + id +
                                            ' failed: ' + e,
                                             e,
                                             [id]));
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function () {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap,
                                               (this.map.isDefine ? this.map : this.map.parentMap),
                                               false,
                                               !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', bind(this, this.errback));
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function (name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function (name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' + args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
        }

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                //Save off the paths since they require special processing,
                //they are additive.
                var shim = config.shim,
                    objs = {
                        paths: true,
                        bundles: true,
                        config: true,
                        map: true
                    };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (!config[prop]) {
                            config[prop] = {};
                        }
                        mixin(config[prop], value, true, true);
                    } else {
                        config[prop] = value;
                    }
                });

                //Reverse map the bundles
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function (value, prop) {
                        each(value, function (v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop;
                            }
                        });
                    });
                }

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name;

                        pkgObj = typeof pkgObj === 'string' ? { name: pkgObj } : pkgObj;

                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            config.paths[name] = pkgObj.location;
                        }

                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main')
                                     .replace(currDirRegExp, '')
                                     .replace(jsSuffixRegExp, '');
                    });
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function (value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || (value.exports && getGlobal(value.exports));
                }
                return fn;
            },

            makeRequire: function (relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' +
                                        id +
                                        '" has not been loaded yet for context: ' +
                                        contextName +
                                        (relMap ? '' : '. Use require([])')));
                        }
                        return defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function (moduleNamePlusExt) {
                        var ext,
                            index = moduleNamePlusExt.lastIndexOf('.'),
                            segment = moduleNamePlusExt.split('/')[0],
                            isRelative = segment === '.' || segment === '..';

                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt,
                                                relMap && relMap.id, true), ext,  true);
                    },

                    defined: function (id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function (id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        removeScript(id);

                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse(defQueue, function(args, i) {
                            if(args[0] === id) {
                                defQueue.splice(i, 1);
                            }
                        });

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function (depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName) {
                var found, args, mod,
                    shim = getOwn(config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine',
                                             'No define call for ' + moduleName,
                                             null,
                                             [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url,
                    parentPath, bundleId,
                    pkgMain = getOwn(config.pkgs, moduleName);

                if (pkgMain) {
                    moduleName = pkgMain;
                }

                bundleId = getOwn(bundlesMap, moduleName);

                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt);
                }

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = config.paths;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');

                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += (ext || (/^data\:|\?/.test(url) || skipExt ? '' : '.js'));
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                }

                return config.urlArgs ? url +
                                        ((url.indexOf('?') === -1 ? '?' : '&') +
                                         config.urlArgs) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' ||
                        (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function (evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    return onError(makeError('scripterror', 'Script error for: ' + data.id, evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) { fn(); };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!require) {
        require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each([
        'toUrl',
        'undef',
        'defined',
        'specified'
    ], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = defaultOnError;

    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        return node;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
                    //Check if node.attachEvent is artificially added by custom script or
                    //natively supported by browser
                    //read https://github.com/jrburke/requirejs/issues/187
                    //if we can NOT find [native code] then it must NOT natively supported.
                    //in IE8, node.attachEvent does not have toString()
                    //Note the test for "[native code" with no closing brace, see:
                    //https://github.com/jrburke/requirejs/issues/273
                    !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                    !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEventListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation that a build has been done so that
                //only one script needs to be loaded anyway. This may need to be
                //reevaluated if other use cases become common.
                importScripts(url);

                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError('importscripts',
                                'importScripts failed for ' +
                                    moduleName + ' at ' + url,
                                e,
                                [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser && !cfg.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript = dataMain;

                //Set final baseUrl if there is not already an explicit one.
                if (!cfg.baseUrl) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/')  + '/' : './';

                    cfg.baseUrl = subPath;
                }

                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript = mainScript.replace(jsSuffixRegExp, '');

                 //If mainScript is still a path, fall back to dataMain
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function (name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, '')
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        (context ? context.defQueue : globalDefQueue).push([name, deps, callback]);
    };

    define.amd = {
        jQuery: true
    };


    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
}(this));

define("bower_components/requirejs/require.js", function(){});

/**
 * Menu item definition
 */
define('build/Objects/Abstract/page_item',[], function() {

    return function() {

        /**
         * Location of menu item
         * @type {integer}
         */
        this.order = 0;

        /**
         * Type of the menu item
         * @type {string}
         */
        this.type = 'unknown';

        /**
         * Setter for the order
         * @param order
         */
        this.setOrder = function(order) {
            this.order = order;
        };

        /**
         * Getter for the order
         * @returns integer
         */
        this.getOrder = function() {
            return this.order;
        };

        /**
         * Setter for the type
         * @param type
         */
        this.setType = function(type) {
            this.type = type;
        };

        /**
         * Getter for the type
         * @returns {type|*}
         */
        this.getType = function() {
            return this.type;
        };
    };

});
/**
 * Abstract form of a form item
 */
define('build/Objects/Abstract/form_item',[], function() {

    return function(data) {
        
        /**
         * Location of menu item
         * @type {integer}
         */
        this._order = data.order || 0;

        /**
         * Type of the menu item
         * @type {string}
         */
        this._type = 'unknown';
        
        /**
         * Name
         * @type {string}
         */
        this._name = data.name || null;
                
        /**
         * Label
         * @type {string}
         */
        this._label = data.label || '';

        /**
         * Value
         * @type {string}
         */
        this._value = data.value || null;

        /**
         * Required
         * @type {boolean}
         */
        this._required = data.required || false;

        /**
         * Setter for the order
         * @param order
         */
        this.setOrder = function(order) {
            this._order = order;
        };

        /**
         * Getter for the order
         * @returns integer
         */
        this.getOrder = function() {
            return this._order;
        };

        /**
         * Setter for the type
         * @param type
         */
        this.setType = function(type) {
            this._type = type;
        };

        /**
         * Getter for the type
         * @returns {type|*}
         */
        this.getType = function() {
            return this._type;
        };

        /**
         * Setter for name
         * @param name
         */
        this.setName = function(name) {
            this._name = name;
        };

        /**
         * Getter for name
         * @returns {string}
         */
        this.getName = function() {
            return this._name;
        };

        /**
         * Setter for label
         * @param label
         */
        this.setLabel = function(label) {
            this._label = label;
        };

        /**
         * Getter for label
         * @returns {string}
         */
        this.getLabel = function() {
            return this._label;
        };

        /**
         * Setter for value
         * @param value
         */
        this.setValue = function(value) {
            this._value = value;
        };

        /**
         * Getter for value
         * @returns {string}
         */
        this.getValue = function() {
            return this._value;
        };

        /**
         * Setter for required
         * @param required
         */
        this.setRequired = function(required) {
            this._required = required;
        };

        /**
         * Getter for required
         * @returns {boolean}
         */
        this.isRequired = function() {
            return this._required;
        };
        
    };    
});

define('build/Objects/Page/Form/header',['build/Objects/Abstract/form_item'], function(FormItem) {
    
    var Header = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('header');

        /**
         * Text
         * @type {string}
         */
        this.text = data.text || 'NULL';

        /**
         * Buttons
         * @type {array}
         */
        this.buttons = data.buttons || [];

        /**
         * Setter for text
         * @param text
         */
        this.setText = function(text) {
            this.text = text;
        };

        /**
         * Getter for text
         * @returns {string}
         */
        this.getText = function() {
            return this.text;
        };

        /**
         * Setter for buttons
         * @param buttons
         */
        this.setButtons = function(buttons) {
            this.buttons = buttons;
        };

        /**
         * Getter for buttons
         * @returns {array}
         */
        this.getButtons = function() {
            return this.buttons;
        };

    };
    
    // Inherit item
    Header.prototype = FormItem;

    // Fix constructor
    Header.prototype.constructor = Header;
    
    return Header;
});

define('build/Objects/Page/Form/number',['build/Objects/Abstract/form_item'], function(FormItem) {

    var Number = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('number');

        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName()
            }
        };
    };

    // Inherit Panel
    Number.prototype = FormItem;

    // Fix constructor
    Number.prototype.constructor = Number;

    return Number;
});

define('build/Objects/Page/Form/password',['build/Objects/Abstract/form_item'], function(FormItem) {

    var Password = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('password');
        
        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName()
            }
        };
    };

    // Inherit FormItem
    Password.prototype = FormItem;

    // Fix constructor
    Password.prototype.constructor = Password;
    
    return Password;
});

define('build/Objects/Page/Form/submit',['build/Objects/Abstract/form_item'], function(FormItem) {

    var Submit = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('submit');

        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName()
            }
        };


    };

    // Inherit Panel
    Submit.prototype = FormItem;

    // Fix constructor
    Submit.prototype.constructor = Submit;
    
    return Submit;
});

define('build/Objects/Page/Form/text',['build/Objects/Abstract/form_item'], function(FormItem) {

    var Text = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('text');

        /**
         * Max length of the text 
         * @type {Number|null}
         * @private
         */
        this._maxLength = data.maxLength || null;

        /**
         * Getter for maxLength
         * @returns {Number|null}
         */
        this.getMaxLength = function() {
            return this._maxLength;
        };

        /**
         * Setter for maxLength
         * @param maxLength
         */
        this.setMaxLength = function(maxLength) {
            this._maxLength = maxLength;
        };
        
        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName(),
                maxLength: this.getMaxLength()
            }
        };
    };

    // Inherit FormItem
    Text.prototype = FormItem;

    // Fix constructor
    Text.prototype.constructor = Text;
    
    return Text;
});

define('build/Objects/Page/Form/textarea',['build/Objects/Abstract/form_item'], function(FormItem) {

    var Textarea = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('textarea');

        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName()
            }
        };


    };

    // Inherit Panel
    Textarea.prototype = FormItem;

    // Fix constructor
    Textarea.prototype.constructor = Textarea;
    return Textarea;
});

define('build/Objects/Page/Form/url',['build/Objects/Abstract/form_item'], function(FormItem) {

    var Url = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('url');

        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName()
            }
        };
    };

    // Inherit Panel
    Url.prototype = FormItem;

    // Fix constructor
    Url.prototype.constructor = Url;

    return Url;
});

define('build/Objects/Page/Form/tel',['build/Objects/Abstract/form_item'], function(FormItem) {

    var Tel = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('tel');

        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName()
            }
        };
    };

    // Inherit Panel
    Tel.prototype = FormItem;

    // Fix constructor
    Tel.prototype.constructor = Tel;

    return Tel;
});

define('build/Objects/Page/Form/checkbox',['build/Objects/Abstract/form_item'], function(FormItem) {

    var Checkbox = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('checkbox');

        /**
         * The checked state of checkbox
         * @type {boolean|null}
         * @private
         */
        this._checked = data.checked || null;

        /**
         * Getter for checked
         * @returns {boolean|null}
         */
        this.isChecked = function() {
            return this._checked;
        };

        /**
         * Setter for checked
         * @param checked
         */
        this.setIsChecked = function(checked) {
            this._checked = checked;
        };
        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName(),
                checked: this.isChecked()
            }
        };
    };

    // Inherit FormItem
    Checkbox.prototype = FormItem;

    // Fix constructor
    Checkbox.prototype.constructor = Checkbox;
    
    return Checkbox;
});

define('build/Objects/Page/Form/email',['build/Objects/Abstract/form_item'], function(FormItem) {

    var Email = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('email');
        
        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName()
            }
        };
    };

    // Inherit FormItem
    Email.prototype = FormItem;

    // Fix constructor
    Email.prototype.constructor = Email;
    
    return Email;
});

define('build/Objects/Page/Form/select',['build/Objects/Abstract/form_item'], function(FormItem) {

    var Select = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('select');

        /**
         * The Options of Select
         * @type {array|null}
         * @private
         */
        this._options = data.options || null;

        

        /**
         * Getter for Options
         * @returns {array|null}
         */
        this.getOptions = function() {
            return this._options;
        };

        

        /**
         * Setter for Options
         * @param Selected
         */
        this.setOptions = function(options) {
            this._options = options;
        };

        
        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName(),
                options: this.getOptions()
            }
        };
    };

    // Inherit FormItem
    Select.prototype = FormItem;

    // Fix constructor
    Select.prototype.constructor = Select;
    
    return Select;
});

define('build/Objects/Page/Form/date',['build/Objects/Abstract/form_item'], function(FormItem) {

    var Date = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('date');
       
        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName()
            }
        };
    };

    // Inherit Panel
    Date.prototype = FormItem;

    // Fix constructor
    Date.prototype.constructor = Date;

    return Date;
});

define('build/Objects/Page/Form/range',['build/Objects/Abstract/form_item'], function(FormItem) {

    var Range = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('range');

        /**
         * Min and max of the range 
         * @type {Number|null}
         * @private
         */
        this._min = data.min || null;
        this._max = data.max || null;

        /**
         * Getters for min and max
         * @returns {Number|null}
         */
        this.getMin = function() {
            return this._min;
        };

        this.getMax = function() {
            return this._max;
        };

        /**
         * Setters for min and max
         * @param maxLength
         */
        this.setMin = function(min) {
            this._min = min;
        };
        
        this.setMax = function(max) {
            this._max = max;
        };
        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName(),
                min: this.getMin(),
                max: this.getMax()
            }
        };
    };

    // Inherit Panel
    Range.prototype = FormItem;

    // Fix constructor
    Range.prototype.constructor = Range;

    return Range;
});

define('build/Objects/Page/Form/trumbowyg',['build/Objects/Abstract/form_item'], function(FormItem) {

    var Trumbowyg = function(data) {

        //Call the parent constructor
        FormItem.call(this, data);

        //Set type of this object
        this.setType('trumbowyg');

        /**
         * Buttons for the editor
         * @type {string[]}
         */
        this.buttons = ['header', 'bold', 'italic', '|', 'unorderedList', 'orderedList', '|', 'insertImage', 'link', '|', 'viewHTML', 'fullscreen'];

        /**
         * Get attributes for this input
         * @return Object
         */
        this.getAttributes = function() {
            return {
                type: this.getType(),
                value: this.getValue(),
                name: this.getName()
            }
        };

        /**
         * Setter of buttons
         * @param buttons
         */
        this.setButtons = function(buttons) {
            this.buttons = buttons;
        };

        /**
         * Getter for buttons
         */
        this.getButtons = function() {
            return this.buttons;
        };

    };

    // Inherit Panel
    Trumbowyg.prototype = FormItem;

    // Fix constructor
    Trumbowyg.prototype.constructor = Trumbowyg;

    return Trumbowyg;
});
/**
 * Menu item factory will create menu item objects based on input
 */
var FormItemObjects = {
    'header': 'build/Objects/Page/Form/header',
    'number': 'build/Objects/Page/Form/number',
    'password': 'build/Objects/Page/Form/password',
    'submit': 'build/Objects/Page/Form/submit',
    'text': 'build/Objects/Page/Form/text',
    'textarea': 'build/Objects/Page/Form/textarea',
    'url': 'build/Objects/Page/Form/url',
    'tel': 'build/Objects/Page/Form/tel',
    'checkbox': 'build/Objects/Page/Form/checkbox',
    'email': 'build/Objects/Page/Form/email',
    'select': 'build/Objects/Page/Form/select',
    'date': 'build/Objects/Page/Form/date',
    'range': 'build/Objects/Page/Form/range',
    'trumbowyg': 'build/Objects/Page/Form/trumbowyg'
};

define('build/Factories/form_item_factory',[
    'build/Objects/Page/Form/header',
    'build/Objects/Page/Form/number',
    'build/Objects/Page/Form/password',
    'build/Objects/Page/Form/submit',
    'build/Objects/Page/Form/text',
    'build/Objects/Page/Form/textarea',
    'build/Objects/Page/Form/url',
    'build/Objects/Page/Form/tel',
    'build/Objects/Page/Form/checkbox',
    'build/Objects/Page/Form/email',
    'build/Objects/Page/Form/select',
    'build/Objects/Page/Form/date',
    'build/Objects/Page/Form/range',
    'build/Objects/Page/Form/trumbowyg'
], function() {

    return new function() {

        /**
         * Create the panel, will do this based on the type passed in the data
         */
        this.createItem = function(data) {
            if(FormItemObjects[data.type]) {
                var Item = require(FormItemObjects[data.type]);
                return new Item(data[data.type]);
            }
            
            console.error('Unknown item type passed to factory: ' + data.type);
            
            return false;
        }

    };

});

define('build/Objects/Page/form',['build/Objects/Abstract/page_item', 'build/Factories/form_item_factory'], function(PageItem, FormItemFactory) {

    var Form = function(data) {

        //Call the parent constructor
        PageItem.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'form';

        /**
         * Form items, is set during construct to make sure we use
         * the FormItemsFactory
         * @type {Array}
         */
        this.items = [];

        /**
         * Method
         * @type {string}
         */
        this.method = data.method || 'post';

        /**
         * Action
         * @type {string}
         */
        this.action = data.action || null;

        /**
         * Setter for Items
         * @param items
         */
        this.setItems = function(items) {
            this.items = items.map(function(item) {
                return FormItemFactory.createItem(item);
            }).filter(function(item) {
                return item !== false;
            });
        };

        /**
         * Getter for items
         * @returns {Array}
         */
        this.getItems = function() {
            return this.items;
        };

        /**
         * Setter for method
         * @param method
         */
        this.setMethod = function(method) {
            this.method = method;
        };

        /**
         * Getter for method
         * @returns {string}
         */
        this.getMethod = function() {
            return this.method;
        };

        /**
         * Setter for action
         * @param action
         */
        this.setAction = function(action) {
            this.action = action;
        };

        /**
         * Getter for action
         * @returns {string}
         */
        this.getAction = function() {
            return this.action;
        };

        if(data.items) {
            this.setItems(data.items);
        }
        
    };

    // Inherit Panel
    Form.prototype = PageItem;

    // Fix constructor
    Form.prototype.constructor = Form;

    return Form;
});
/**
 * Form factory will create form objects based on input
 */
define('build/Factories/form_factory',['build/Objects/Page/form'], function(Form) {

    return new function() {

        /**
         * Create the form
         */
        this.createForm = function(data) {
            return new Form(data);
        }

    };

});
define('build/Stores/auja',['fluxxor', 'build/Factories/form_factory'], function(Fluxxor, FormFactory) {

    /**
     * The main Auja store
     */
    return Fluxxor.createStore({

        /**
         * State of the Auja scaffolding
         */
        state: {
            "title": "",
            "authenticated": false,
            "debug": true,
            "colors": {
                "main": "#1ebab8",
                "secondary": "#E7EFEF",
                "alert": "#e85840"
            },
            "user": {
                "name": ""
            },
            "buttons": [],
            "menu": [],
            "routes": [],
            "authentication": false
        },

        /**
         * On initialization and on system update we will update the state
         * @param url
         */
        initialize: function(url) {
            this.bindActions(
                'initialize', this.update,
                'update', this.update,
                'message', this.message
            )  
        },

        /**
         * Getter for the state
         * @returns {*}
         */
        getState: function() {
            return this.state;
        },

        /**
         * Update, will fetch the 'data-src' tag from the body
         * @todo add error handling
         */
        update: function() {
            var request = new Request(document.body.getAttribute('data-src'));
            request.get()
                .done(function (response) {
                    
                    //Pass through the factory
                    if(response.main.authentication) {
                        response.main.authentication = FormFactory.createForm(response.main.authentication); 
                    }
                    
                    Object.merge(this.state, response.main, true, true);
                    this.emit('change');
                }.bind(this))
                .fail(function () {
                    // TODO handle this
                }.bind(this));
        },

        /**
         * Messages can contain snippets that are relevant for auja
         * @param message
         */
        message: function(message) {
            var changed = false;
            
            if(message.authenticated && this.state.authenticated != message.authenticated) {
                this.state.authenticated = message.authenticated;
                changed = true;
            }
            
            if(changed) {
                this.emit('change');
            }
        }
        
    })
    
});
/**
 * Abstract representation of a panel
 */
define('build/Objects/Abstract/panel',[], function() {
    
    return function() {

        /**
         * The object that called this panel in existence
         * @private
         */
        this._origin;

        /**
         * Type of panel we're looking at
         * @private
         */
        this._type;

        /**
         * ID of the panel
         * @type string
         * @private
         */
        this._id;

        /**
         * Index of the panel
         * @type string
         * @private
         */
        this._index;

        /**
         * Is updateable
         * @type {boolean}
         * @private
         */
        this._isUpdateable = false;

        /**
         * Url which the panel represents
         * @typ string
         * @private
         */
        this._url;

        /**
         * Setter for the ID
         * @param id
         */
        this.setId = function(id) {
            this._id = id;
        };
        
        /**
         * Getter for the ID
         * @returns {string|*}
         */
        this.getId = function() {
            return this._id;
        };

        /**
         * Setter for the index
         * @param index
         */
        this.setIndex = function(index) {
            this._index = index;
        };

        /**
         * Getter for the index
         * @returns {integer|*}
         */
        this.getIndex = function() {
            return this._index;
        };

        /**
         * Set the origin of the request
         * @param origin
         */
        this.setOrigin = function(origin) {
            this._origin = origin;
        };

        /**
         * Getter for the origin
         * @returns {origin|*}
         */
        this.getOrigin = function() {
            return this._origin;  
        };

        /**
         * Set type of the panel
         * @param type
         */
        this.setType = function(type) {
            this._type = type;
        };
        
        /**
         * Type of panel we're looking at 
         */
        this.getType = function() {
            return this._type;
        };

        /**
         * Setter for the url
         * @param id
         */
        this.setUrl = function(url) {
            this._url = url;
        };

        /**
         * Getter for the url
         * @returns {string|*}
         */
        this.getUrl = function() {
            return this._url;
        };


        /**
         * Getter for is updateable
         * @returns {*}
         */
        this.isUpdateable = function() {
            return this._isUpdateable;
        };

        /**
         * Setter for is updateable
         * @param is_updateable
         */
        this.setIsUpdateable = function(isUpdateable) {
            this._isUpdateable = isUpdateable;
        };
        
    }
    
});
/**
 * Menu item definition
 */
define('build/Objects/Abstract/menu_item',[], function () {

    return function () {

        /**
         * Location of menu item
         * @type {integer}
         */
        this.order = 0;

        /**
         * Type of the menu item
         * @type {string}
         */
        this.type = 'unknown';

        /**
         * ID
         * @type {mixed}
         */
        this.id = 0;

        /**
         * Weither or not the item is active
         * @type {boolean}
         */
        this.active = false;

        /**
         * Setter for the id
         * @param id
         */
        this.setId = function (id) {
            this.id = id;
        };

        /**
         * Getter for the id
         * @returns {id|*}
         */
        this.getId = function () {
            return this.id;
        };

        /**
         * Setter for the order
         * @param order
         */
        this.setOrder = function (order) {
            this.order = order;
        };

        /**
         * Getter for the order
         * @returns integer
         */
        this.getOrder = function () {
            return this.order;
        };

        /**
         * Setter for the type
         * @param type
         */
        this.setType = function (type) {
            this.type = type;
        };

        /**
         * Getter for the type
         * @returns {type|*}
         */
        this.getType = function () {
            return this.type;
        };

        /**
         * Getter for active
         * @return {boolean}
         */
        this.isActive = function () {
            return this.active;
        };

        /**
         * Setter for active
         * @param active
         */
        this.setIsActive = function(active) {
            this.active = active;
        }
    };

});
define('build/Objects/Menu/link',['build/Objects/Abstract/menu_item'], function (MenuItem) {

    var Link = function (data) {

        //Call the parent constructor
        MenuItem.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'link';

        /**
         * Target of this link
         * @type {string|boolean}
         */
        this.target = data.target || false;

        /**
         * Icon
         * @type {string}
         */
        this.icon = data.icon || 'planet';

        /**
         * Text
         * @type {string}
         */
        this.text = data.text || 'NULL';

        /**
         * Getter for the id
         * @returns string
         * @override
         */
        this.getId = function () {
            return this.target;
        };
        
        /**
         * Setter for icon
         * @param icon
         */
        this.setIcon = function (icon) {
            this.icon = icon;
        };

        /**
         * Getter for icon
         * @returns {string}
         */
        this.getIcon = function () {
            return this.icon;
        };

        /**
         * Setter for target
         * @param target
         */
        this.setTarget = function (target) {
            this.target = target;
        };

        /**
         * Getter for target
         * @returns {string|boolean}
         */
        this.getTarget = function () {
            return this.target;
        };

        /**
         * Setter for text
         * @param text
         */
        this.setText = function (text) {
            this.text = text;
        };

        /**
         * Getter for text
         * @returns {string}
         */
        this.getText = function () {
            return this.text;
        };

        /**
         * Update this Link with another Link
         * @param item
         */
        this.update = function (item) {
            this.setText(item.getText());
            this.setIcon(item.getIcon());
            this.setTarget(item.getTarget());
        };
    };

    // Inherit Panel
    Link.prototype = MenuItem;

    // Fix constructor
    Link.prototype.constructor = Link;
    
    return Link;
});

define('build/Objects/Menu/spacer',['build/Objects/Abstract/menu_item'], function(MenuItem) {

    var Spacer = function(data) {

        //Call the parent constructor
        MenuItem.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'spacer';

        /**
         * Text
         * @type {string}
         */
        this.text = data.text || 'NULL';
        
        /**
         * Setter for text
         * @param text
         */
        this.setText = function(text) {
            this.text = text;
        };

        /**
         * Getter for text
         * @returns {string}
         */
        this.getText = function() {
            return this.text;
        };

        /**
         * Update this item
         * @param item
         */
        this.update = function(item) {
            this.setText(item.getText());
        }
    };

    // Inherit Panel
    Spacer.prototype = MenuItem;

    // Fix constructor
    Spacer.prototype.constructor = Spacer;
    
    return Spacer;
});
/**
 * Abstract representation of a property
 */
define('build/Objects/Abstract/property',[], function() {

    return function(data) {

        /**
         * Name of the property
         * 
         * @type string
         * @private
         */
        this._name;

        /**
         * Getter for the name
         * @returns string
         */
        this.getName = function() {
            return this._name;
        };

        /**
         * Setter for the name
         * @param name
         */
        this.setName = function(name) {
            this._name = name;
        }
        
    }

});
define('build/Objects/Menu/Properties/searchable',['build/Objects/Abstract/property'], function(Property) {
    
    var SearchableProperty = function(data) {
        
        //Call the parent constructor
        Property.call(this, arguments);
        
        //Set name of this property
        this.setName('searchable');

        /**
         * Target of the searchable, should contain a %s to replace with the search query
         * @type string
         */
        this.target = data.target;

        /**
         * Setter for the target
         * @param target
         */
        this.setTarget = function(target) {
            this.target = target;
        };

        /**
         * Getter for the target
         * @returns {target|*}
         */
        this.getTarget = function() {
            return this.target;
        }
        
    };
    
    // Inherit Property
    SearchableProperty.prototype = Property;

    // Fix constructor
    SearchableProperty.prototype.constructor = SearchableProperty;

    return SearchableProperty;
});
/**
 * Resource property factory will create objects from resource item properties
 */
var ResourceItemProperties = {
    'searchable': 'build/Objects/Menu/Properties/searchable'
};
define('build/Factories/resource_property_factory',[
    'build/Objects/Menu/Properties/searchable'
], function () {

    return new function () {

        /**
         * Create the resource item properties
         */
        this.createProperties = function (data) {
            var result = [];
            for(var name in data) {
                if(ResourceItemProperties[name]) {
                    var propertyObject = require(ResourceItemProperties[name]);
                    result.push(new propertyObject(data[name]));
                } else {
                    console.error('Unknown resource item property requested: ' + name);
                }
            }
            return result;
        };

    };

});
define('build/Objects/Menu/resource',['build/Objects/Abstract/menu_item', 'build/Factories/resource_property_factory'], function (MenuItem, ResourceItemPropertyFactory) {

    var Resource = function (data) {

        //Call the parent constructor
        MenuItem.call(this, arguments);

        /**
         * Resource items
         * @type {Array}
         */
        this.items = [];

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'resource';

        /**
         * Target where to fetch the data from
         */
        this.target = data.target;

        /**
         * Paging options
         * @type {{}}
         */
        this.paging = {};

        /**
         * Special properties of a resource
         * @type {*|{}}
         */
        this.properties = data.properties ? ResourceItemPropertyFactory.createProperties(data.properties) : [];

        /**
         * Getter for the id
         * @returns string
         * @override
         */
        this.getId = function () {
            return this.target;
        };

        /**
         * Getter for the target
         * @returns String
         */
        this.getTarget = function () {
            return this.target;
        };

        /**
         * Get items in this resource
         * @returns {Array}
         */
        this.getItems = function () {
            return this.items;
        };

        /**
         * Get the current paging
         * @returns Object
         */
        this.getPaging = function () {
            return this.paging;
        };

        /**
         * Get the properties active on this resource
         * @returns {*|{}}
         */
        this.getProperties = function() {
            return this.properties;  
        };

        /**
         * Check if certain named property is present
         * @param name
         * @return boolean
         */
        this.hasProperty = function(name) {
            return this.getProperty(name) !== false;
        };

        /**
         * Get the property
         * @param name
         * @return Property
         */
        this.getProperty = function(name) {
            for(var i in this.properties) {
                if(this.properties[i].getName() == name) {
                    return this.properties[i];
                }
            }
            return false;
        };

        /**
         * Update with new data
         * @param data
         */
        this.extend = function (data) {

            //Initialize like this otherwise we have circular dependencies
            var MenuItemFactory = require('build/Factories/menu_item_factory');
            
            //Create actual items
            data.items = data.items.map(function (item) {
                return MenuItemFactory.createItem(item);
            }.bind(this));

            this.items = this.items.concat(data.items);
            this.paging = data.paging;
        };

        /**
         * Set the active item in our childs
         * @param item
         */
        this.setActiveItem = function (item) {
            for (var i in this.items) {
                this.items[i].setIsActive(this.items[i].getId() == item.getId());
            }
        };

        /**
         * Update with new data
         * @param data
         */
        this.update = function (data) {
            if (data.items && (data.items.length > 0 || this.items.length == 0)) {

                //Initialize like this otherwise we have circular dependencies
                var MenuItemFactory = require('build/Factories/menu_item_factory');
                
                //When items are passed as data directly write them as the content
                //Since we receive a Resource object here it will always have items, so we check if it already
                //contains items, or if originally there were no items (this.items.length == 0)
                this.items = data.items.map(function (item) {
                    return MenuItemFactory.createItem(item);
                }.bind(this));
            } else if (!this.paging.total) {
                //When no total paging is defined reset and let the paging commence all over again
                this.items = [];
            } else {
                //When we have a clue what to call to update this resource do that
                //setTimeout is to handle the "async" behavior of dispatching
                setTimeout(function () {
                    flux.actions.updateResource(this, this.paging.total);
                }.bind(this), 1);
            }
        };
    };

    // Inherit Panel
    Resource.prototype = MenuItem;

    // Fix constructor
    Resource.prototype.constructor = Resource;

    return Resource;
});
/**
 * Menu item factory will create menu item objects based on input
 */
var MenuItemObjects = {
    'link': 'build/Objects/Menu/link',
    'spacer': 'build/Objects/Menu/spacer',
    'resource': 'build/Objects/Menu/resource'
};

define('build/Factories/menu_item_factory',[
    'build/Objects/Menu/link',
    'build/Objects/Menu/spacer',
    'build/Objects/Menu/resource'
], function() {

    return new function() {

        /**
         * Create the panel, will do this based on the type passed in the data
         */
        this.createItem = function(data) {
            if(MenuItemObjects[data.type]) {
                var Item = require(MenuItemObjects[data.type]);
                return new Item(data[data.type]);
            } else {
                console.error('Unknown menu item type requested: ' + data.type);
            }
            return false;
        }

    };

});
/**
 * Menu panel type
 */
define('build/Objects/menu',['build/Objects/Abstract/panel', 'build/Factories/menu_item_factory'], function (Panel, MenuItemFactory) {

    var Menu = function () {

        //Call the parent constructor
        Panel.call(this);

        //Set the type
        this.setType('menu');

        //Show that we're updateable
        this.setIsUpdateable(true);

        /**
         * Menu items
         * @type {Array}
         */
        this.items = [];

        /**
         * Index used to generate ids for items
         * @type {number}
         * @private
         */
        this._lastIndex = 0;

        /**
         * Active item
         * @type MenuItem
         * @private
         */
        this._activeItem = false;

        /**
         * Generate a unique Id
         * @returns {*|string}
         */
        this.getNextId = function (item) {
            return '_' + String(++this._lastIndex);
        };

        /**
         * Setter for items
         * @param items
         */
        this.setItems = function (items) {
            this.items = items.map(function (item) {

                //Check if item already instantiated
                //TODO make checking of this more elegant
                if (item.getId) {
                    item.setId(this.getNextId(item));
                    return item;
                }

                var result = MenuItemFactory.createItem(item);

                //Arrange a panel id or transfer the passed id
                result.setId(this.getNextId(item));

                return result;
            }.bind(this));
        };

        /**
         * Getter for items
         * @returns {Array}
         */
        this.getItems = function () {
            return this.items;
        };

        /**
         * Check if this menu contains an item
         * @param item
         * @returns {boolean}
         */
        this.hasItem = function (item) {
            for (var i in this.items) {
                if (this.items[i] == item) {
                    return true;
                }
            }
            return false;
        };

        /**
         * Extend an item
         * @param item
         * @param data
         */
        this.extendItem = function (item, data) {
            for (var i in this.items) {
                if (this.items[i].getId() == item.getId()) {
                    if (this.items[i].extend) {
                        this.items[i].extend(data);
                    } else {
                        console.error('Extend requested on menu item without update method implemented');
                    }
                    break;
                }
            }
        };

        /**
         * Update an item
         * @param item
         * @param data
         */
        this.updateItem = function (item, data) {
            for (var i in this.items) {
                if (this.items[i] == item) {
                    this.items[i].update(data);
                    return;
                }
            }
        };

        /**
         * Setter for the active item
         * @param item
         */
        this.setActiveItem = function(item) {
            for(var i in this.items) {
                this.items[i].setIsActive(this.items[i].getId() == item.getId());
                
                //When the item has childs that might be active pass the item that is active
                if(this.items[i].setActiveItem) {
                    this.items[i].setActiveItem(item);
                }
            }
        };

    };

    // Inherit Panel
    Menu.prototype = Panel;

    // Fix constructor
    Menu.prototype.constructor = Menu;
    
    return Menu;
});
/**
 * Menu factory will create menu objects based on input
 *
 * @todo implement sorting
 */
define('build/Factories/menu_factory',['build/Objects/menu'], function (Menu) {

    return new function () {

        /**
         * Create the menu
         */
        this.createMenu = function (data) {
            var menu = new Menu();
            menu.setItems(data.menu);
            return menu;
        };

        /**
         * Update contents of a menu
         * @param menu
         * @param data
         */
        this.updateMenu = function (menu, data) {
            //Use a mock menu to be able to match id's and see which have disappeared
            var oldItems = menu.getItems();
            var items = this.createMenu(data).getItems().map(function(item) {
                for(var i in oldItems) {
                    //If item implements update method call it otherwise create the newly created item
                    if(oldItems[i].getId() == item.getId()) {
                        if(!oldItems[i].update) {
                            console.error('Menu item does not implement update method');
                            return item;
                        } else {
                            oldItems[i].update(item);
                            return oldItems[i];
                        }
                    }
                }
                return item;
            });
            
            menu.setItems(items);
            return menu;
        }

    };

});

define('build/Objects/Page/header',['build/Objects/Abstract/page_item'], function(PageItem) {

    var Header = function(data) {

        //Call the parent constructor
        PageItem.call(this, arguments);

        /**
         * Our custom type
         * @type {string}
         */
        this.type = 'header';

        /**
         * Text
         * @type {string}
         */
        this.text = data.text || '';

        /**
         * Buttons
         * @type {array}
         */
        this.buttons = data.buttons || [];

        /**
         * Setter for text
         * @param text
         */
        this.setText = function(text) {
            this.text = text;
        };

        /**
         * Getter for text
         * @returns {string}
         */
        this.getText = function() {
            return this.text;
        };

        /**
         * Setter for buttons
         * @param buttons
         */
        this.setButtons = function(buttons) {
            this.buttons = buttons;
        };

        /**
         * Getter for buttons
         * @returns {array}
         */
        this.getButtons = function() {
            return this.buttons;
        };

    };

    // Inherit Panel
    Header.prototype = PageItem;

    // Fix constructor
    Header.prototype.constructor = Header;
    
    return Header;
});
/**
 * Menu item factory will create menu item objects based on input
 */
var PageItemObjects = {
    'header': 'build/Objects/Page/header',
    'form': 'build/Objects/Page/form'
};

define('build/Factories/page_item_factory',[
    'build/Objects/Page/header',
    'build/Objects/Page/form'
], function() {

    return new function() {

        /**
         * Create the panel, will do this based on the type passed in the data
         */
        this.createItem = function(data) {
            if(PageItemObjects[data.type]) {
                var Item = require(PageItemObjects[data.type]);
                return new Item(data[data.type]);
            }
            return false;
        }

    };

});
/**
 * Page panel type
 * 
 * @todo implement sorting
 */
define('build/Objects/page',['build/Objects/Abstract/panel', 'build/Factories/page_item_factory'], function(Panel, PageItemFactory) {

    var Page = function() {
        
        //Call the parent constructor
        Panel.call(this);
        
        //Set the type
        this.setType('page');
        
        /**
         * Content of a page
         * @type {Array}
         */
        this.content = [];

        /**
         * Set the content of a page
         */
        this.setContent = function(content) {
            this.content = content.map(function(item) {
                return PageItemFactory.createItem(item);
            });
        };

        /**
         * Getter for the content
         * @returns {Array}
         */
        this.getContent = function() {
            return this.content;
        };

    };

    // Inherit Panel
    Page.prototype = Panel;

    // Fix constructor
    Page.prototype.constructor = Page;

    return Page;
});
/**
 * Page factory will create page objects based on input
 */
define('build/Factories/page_factory',['build/Objects/page'], function(Page) {

    return new function() {

        /**
         * Create the page
         */
        this.createPage = function(data) {
            var page = new Page();
            page.setContent(data.page);
            return page;
        }

    };

});
/**
 * Panel factory will create panel objects based on input
 */
define('build/Factories/panel_factory',['build/Factories/menu_factory', 'build/Factories/page_factory'], function (MenuFactory, PageFactory) {  
    
    return new function () {

        /**
         * Create the panel, will do this based on the type passed in the data
         * @param data
         */
        this.createPanel = function (data) {
            var panel = null;
            switch (data.type) {
                case 'menu':
                    panel = MenuFactory.createMenu(data);
                    break;
                case 'page':
                    panel = PageFactory.createPage(data);
                    break;
            }

            //Pass the origin
            panel.setOrigin(data.origin);
            panel.setUrl(data.url);

            return panel;
        };
        
        /**
         * Update contents of a panel
         * @param panel
         * @param data
         */
        this.updatePanel = function (panel, data) {
            if(panel.getType() != data.type) {
                console.err('Panel type does not correspond to data type during update');
                return;
            }
            
            switch (panel.getType()) {
                case 'menu':
                    panel = MenuFactory.updateMenu(panel, data);
                    break;
            }
            
            return panel;
        }

    };

});
define('build/Stores/panel',['fluxxor', 'build/Factories/panel_factory'], function(Fluxxor, PanelFactory) {

    /**
     * The main Auja store
     */
    return Fluxxor.createStore({

        /**
         * All panels currently in view
         */
        panels: [],

        /**
         * Height of the panels, changed on resize
         */
        height: 0,

        /**
         * Index of current panel as a reference
         * Starts at -1 since adding will be done using ++index
         */
        index: -1,

        /**
         * On initialization and on system update we will update the state
         * @param url
         */
        initialize: function(url) {
            this.bindActions(
                'panel-scroll', this.scroll,
                'resize', this.resize,
                'activate-item', this.activateItem,
                
                //Update panels
                'update', this.update,
                
                //Different types of panels
                'menu', this.addPanel,
                'page', this.addPanel,
                
                //Menu specific actions
                'extend-resource', this.extendResource,
                'update-resource', this.updateResource
            )
        },

        /**
         * Getter for the state
         * @returns {*}
         */
        getState: function() {
            return {
                'height': this.height,
                'panels': this.panels
            };
        },

        /**
         * On window resize also set the panel height
         */
        resize: function() {
            var oldHeight = this.height;
            this.height = $('#panels').height();
            if(this.height != oldHeight) {
                this.emit('change');
            }
        },
        
        /**
         * When somebody scrolls a panel
         */
        scroll: function(panel) {
            this.emit('change');
        },

        /**
         * Update content of all panels
         * @todo group same origin requests (or do something in request object with ongoing requests)
         */
        update: function() {
            this.panels.map(function(panel) {
                if(panel.isUpdateable()) {
                    var request = new Request(panel.getUrl());
                    request.get().done(function (response) {
                        panel = PanelFactory.updatePanel(panel, response);
                        this.emit('change');
                    }.bind(this));
                }
            }.bind(this));
        },

        /**
         * Add a panel
         * @param p
         */
        addPanel: function(p) {
            var panel = PanelFactory.createPanel(p);
            
            if(!panel) {
                console.error('Requested to dispatch unknown panel');
                return;
            }
            
            //Set the index, since adding will always be on the end
            panel.setIndex(++this.index);
            panel.setId('panel-' + panel.getIndex());
            
            //If the panel from which this panel is added does not originate from the latest
            //we need to remove trailing panels
            var panels = [];
            for(var i in this.panels) {
                if(panel.getOrigin() && this.panels[i].getIndex() <= panel.getOrigin().getIndex()) {
                    panels.push(this.panels[i]);
                }
            }      
            this.panels = panels;
                
            //Put the panel in the view
            this.panels[panel.getIndex()] = panel;
            
            this.emit('change');
        },

        /**
         * Activate an item within a panel
         * @todo add spec test
         * @todo move to panel
         * @param item
         */
        activateItem: function(item) {
            for(var i in this.panels) {
                if(this.panels[i].getId() == item.panel.getId()) {
                    this.panels[i].setActiveItem(item.item);
                    break;
                }
            }
            
            this.emit('change');
        },

        /**
         * Extend a resource
         * @param data
         */
        extendResource: function(data) {
            var panel = data.panel,
                response = data.data,
                item = data.item;
            
            //Find the panel
            for(var i in this.panels) {
                if(this.panels[i].getId() == panel.getId()) {
                    
                    if(this.panels[i].getType() != 'menu') {
                        console.error('Update of menu item requested on a non menu');
                        return;
                    }
                    this.panels[i].extendItem(item, response);
                    this.emit('change');                    
                    return;
                }
            }
        },

        /**
         * Update a resource
         * @param data
         */
        updateResource: function(data) {
            var response = data.data,
                item = data.item;

            //Find the panel
            for(var i in this.panels) {
                if(this.panels[i].hasItem(item)) {
                    this.panels[i].updateItem(item, response);
                    this.emit('change');
                    return;
                }
            }
        }
        
    })

});
define('build/Stores/message',['fluxxor'], function(Fluxxor) {

    /**
     * The pages store
     */
    return Fluxxor.createStore({

        /**
         * All pages currently in view
         */
        message: {},

        /**
         * On initialization and on system update we will update the state
         * @param url
         */
        initialize: function(url) {
            this.bindActions(
                'message', this.dispatch
            )
        },

        /**
         * Getter for the latest message
         * @returns {*}
         */
        getMessage: function() {
            return this.message;
        },

        /**
         * Reset
         */
        reset: function() {
            this.message = {
                message: null
            };
            this.emit('change');
        },

        /**
         * Dispatching of a message
         * @param message
         */
        dispatch: function(message) {
            this.message = message;
            this.emit('change');
        }

    })

});
var FluxStores = {
    'AujaStore': 'build/Stores/auja', 
    'PanelStore': 'build/Stores/panel', 
    'MessageStore': 'build/Stores/message'
}

//Map as an array to load store dependencies
define('build/Stores/flux',[
    'fluxxor',
    'build/Stores/auja',
    'build/Stores/panel',
    'build/Stores/message'
], function(Fluxxor) {
    
    //Fill object with stores
    var stores = {};
    for(var name in FluxStores) {
        var store = require(FluxStores[name]);
        stores[name] = new store;
    }

    /**
     * All actions that can be dispatched
     * @type {{}}
     */
    var actions = {
        /**
         * Dispatch all initializing events
         */
        initialize: function() {
            this.dispatch('initialize');
        },

        /**
         * Dispatched on window resize
         */
        resize: function() {
            this.dispatch('resize');
        },

        /**
         * Process a click on a panel
         *
         * @todo Fix async version of passing the panel to the response handler
         * @param url
         * @param panel (optional)
         * @param item (optional) if isset will dispatch an activate-item event
         */
        click: function(url) {
            var panel = null;
            if(arguments[1]) {
                panel = arguments[1];
            }
            
            var item = null;
            if(panel != null && arguments[2]) {
                this.dispatch('activate-item', {panel: panel, item: arguments[2]});                
            }
            
            var request = new Request(url);
            request.get().done(function(response) {
                response.url = url;
                flux.actions.handle(response.type, response, panel); 
            });
        },

        /**
         * Submitting a form
         * @param url
         * @param data
         */
        submit: function(url, method, data) {
            var panel = null;
            if(arguments[3]) {
                panel = arguments[3];
            }
            
            var request = new Request(url);
            
            switch(method) {
                case 'get':
                    request.get(data).done(function(response) {
                        response.url = url;
                        flux.actions.handle(response.type, response, panel);
                    });                    
                    break;
                default:
                    request.post(data).done(function(response) {
                        response.url = url;
                        flux.actions.handle(response.type, response, panel);
                    });
            }          
        },

        /**
         * Will dispatch according to type, so if you listen on handling of type "menu"
         * you'll get your data
         * @param type
         * @param data
         * @param origin the location the event originated from
         */
        handle: function(type, data, origin) {
            data.origin = origin;
            this.dispatch(type, data);
            
            switch(type) {
                case 'message':
                    //You can set weither or not to update the system
                    if(data.message.update == undefined || data.message.update) {
                        this.dispatch('update');
                    }
                    break;
            }
        },

        /**
         * Trigger scrolling of a panel
         * @param panel
         */
        onPanelScroll: function(panel) {
            this.dispatch('panel-scroll', panel);            
        },

        /**
         * Extend the items in a panel 
         * @todo fix async
         * @param panel
         * @param item
         */
        extendResource: function(panel, item) {
            var request = new Request(item.getTarget());
            request.get().done(function(data) {
                this.dispatch('extend-resource', {
                    panel: panel,
                    item: item,
                    data: data
                });
            }.bind(this));
        },

        /**
         * Update a single item with the response of an url
         * @param item
         * @param url
         */
        updateResource: function(item, url) {
            var request = new Request(url);
            request.get().done(function(data) {
                this.dispatch('update-resource', {
                    item: item,
                    data: data
                });
            }.bind(this));            
        }
    };
    
    return new Fluxxor.Flux(stores, actions); 
});
/**
 * Message
 *
 * @jsx React.DOM
 */
define('build/Components/Scaffolding/message.react',[], function() {
    
    var Info = React.createClass({displayName: 'Info',
        render: function() {
            return (
                React.DOM.div({className: "animated zoomIn message message-info auja-bg-main", onClick: this.props.handleOnClick}, 
                    this.props.message.contents
                )
                );
        }
    });

    /**
     * Main content with all panels
     */
    return React.createClass({
        mixins: [Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('MessageStore')],
        getStateFromFlux: function() {
            return { 
                message: flux.store('MessageStore').getMessage()
            };
        },

        /**
         * Handle click on message
         */
        handleOnClick: function() {
            flux.store('MessageStore').reset();  
        },

        /**
         * Bind click on escape to reset the message
         */
        componentDidMount: function() {
            $(document).bind('keyup', function(e) {
                if(e.keyCode == 27) {
                    flux.store('MessageStore').reset();
                }  
            });
        },
        
        /**
         * Render the div with all panels
         * @returns {XML}
         */
        render: function() {            
            //No state nothing to show
            if(this.state.message.message && this.state.message.message.state) {
                switch(this.state.message.message.state) {
                    case 'info':
                        return (Info({handleOnClick: this.handleOnClick, message: this.state.message.message}));
                        break;
                    default:
                        console.error(this.state.message.message.state.upperCaseChars + ' message not implemented');
                }
            }
            return (React.DOM.span(null));
        }
    });

});
/**
 * A button
 *
 * - text
 * - target
 * - confirm
 *
 * @jsx React.DOM
 */

define('build/Components/Panels/Page/button.react',[], function() {
    return React.createClass({
        getInitialState: function() {
            return {
                confirming: false  
            };  
        },
        handleClick: function() {
            if(this.props.button.confirm && !this.state.confirming) {
                this.state.confirming = true;
                this.setState(this.state);
                setTimeout(function() {
                    this.state.confirming = false;
                    this.setState(this.state);
                }.bind(this), 1000);
            } else {
                flux.actions.click(this.props.button.target, this.props.panel);   
            }            
        },
        render: function() {
            var className = "button ";
            className += this.props.button.confirm ? "auja-bg-alert" : "auja-bg-main";
            
            if(this.state.confirming) {
                return (
                    React.DOM.a({className: className, onClick: this.handleClick}, this.props.button.confirm)
                    );
            }
            
            return (
                React.DOM.a({className: className, onClick: this.handleClick}, this.props.button.text)
                );
        }
    });

});
/**
 * A page header
 *
 * - contents
 *
 * @jsx React.DOM
 */

define('build/Components/Panels/Page/header.react',['build/Components/Panels/Page/button.react'], function (Button) {
    return React.createClass({
        render: function () {
            var buttons = this.props.item.getButtons().map(function (button) {
                return (
                    Button({panel: this.props.panel, button: button})
                );
            }.bind(this));

            return (
                React.DOM.h2(null, this.props.item.text, " ", buttons)
            );
        }
    });

});
/**
 * A label as in <label>, properties:
 *
 * - name
 * - item
 *
 * @todo Add validation
 *
 * @jsx React.DOM
 */

define('build/Components/Panels/Page/Form/label.react',[], function () {
    return React.createClass({
        render: function () {
            
            //Extract the validation message
            var validation = '';
            if(this.props.item.validationMessage != null) {
                validation = (
                    React.DOM.span({className: "validation-message auja-color-alert"}, this.props.item.validationMessage)
                    );
            }
            
            return (
                React.DOM.label(null, 
                React.DOM.span(null, this.props.name), 
                validation
                )
                );
        }
    });

});
/**
 * A text field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define('build/Components/Panels/Page/Form/text.react',['build/Components/Panels/Page/Form/label.react'], function (Label) {
    return React.createClass({
        getInitialState: function () {
            return {value: this.props.item.getValue()};
        },
        handleChange: function (event) {
            this.setState({value: event.target.value});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;

            return (
                React.DOM.div(null, 
                    Label({item: this.props.item, name: this.props.item.getLabel()}), 
                React.DOM.input(attributes)
                )
            );
        }
    });
});
/**
 * A password field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define('build/Components/Panels/Page/Form/password.react',['build/Components/Panels/Page/Form/label.react'], function (Label) {
    return React.createClass({
        getInitialState: function () {
            return {value: this.props.item.getValue()};
        },
        handleChange: function (event) {
            this.setState({value: event.target.value});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;

            return (
                React.DOM.div(null, 
                    Label({item: this.props.item, name: this.props.item.getLabel()}), 
                React.DOM.input(attributes)
                )
            );
        }
    });

});
/**
 * A textarea, properties:
 *
 * - label
 * - name
 * - value will be entered as value
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define('build/Components/Panels/Page/Form/textarea.react',['build/Components/Panels/Page/Form/label.react'], function (Label) {
    return React.createClass({
        getInitialState: function () {
            return {value: this.props.item.getValue()};
        },
        handleChange: function (event) {
            this.setState({value: event.target.value});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;

            return (
                React.DOM.div(null, 
                    Label({item: this.props.item, name: this.props.item.getLabel()}), 
                React.DOM.textarea(attributes)
                )
            );
        }
    });
});
/**
 * A trumbowyg RTE, properties:
 *
 * - label
 * - name
 * - value will be entered as value
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define('build/Components/Panels/Page/Form/trumbowyg.react',['build/Components/Panels/Page/Form/label.react', 'trumbowyg'], function(Label) {
    return React.createClass({
        componentDidMount: function() {
            var btnsGrps = {
                design: this.props.item.getButtons()
            };            
            
            $(this.refs.textarea.getDOMNode()).trumbowyg({
                btns: this.props.item.getButtons(),
                btnsGrps: btnsGrps
            });
        },
        render: function() {
            var attributes = this.props.item.getAttributes();
            
            Object.merge(attributes, {
                id: this.props.itemId,
                type: 'textarea',
                ref: 'textarea'
            });
            
            return (
                React.DOM.div(null, 
                    Label({item: this.props.item, name: this.props.item.getLabel()}), 
                    React.DOM.textarea(attributes, this.props.item.getValue())
                )
                );
        }
    });

});
/**
 * A number field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define('build/Components/Panels/Page/Form/number.react',['build/Components/Panels/Page/Form/label.react'], function (Label) {
    return React.createClass({
        getInitialState: function () {
            return {value: this.props.item.getValue()};
        },
        handleChange: function (event) {
            this.setState({value: event.target.value});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;

            return (
                React.DOM.div(null, 
                    Label({item: this.props.item, name: this.props.item.getLabel()}), 
                React.DOM.input(attributes)
                )
            );
        }
    });
});
/**
 * A url field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define('build/Components/Panels/Page/Form/url.react',['build/Components/Panels/Page/Form/label.react'], function (Label) {
    return React.createClass({
        getInitialState: function () {
            return {value: this.props.item.getValue()};
        },
        handleChange: function (event) {
            this.setState({value: event.target.value});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;

            return (
                React.DOM.div(null, 
                    Label({item: this.props.item, name: this.props.item.getLabel()}), 
                React.DOM.input(attributes)
                )
            );
        }
    });
});
/**
 * A phone number field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define('build/Components/Panels/Page/Form/tel.react',['build/Components/Panels/Page/Form/label.react'], function (Label) {
    return React.createClass({
        getInitialState: function () {
            return {value: this.props.item.getValue()};
        },
        handleChange: function (event) {
            this.setState({value: event.target.value});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;

            return (
                React.DOM.div(null, 
                    Label({item: this.props.item, name: this.props.item.getLabel()}), 
                React.DOM.input(attributes)
                )
            );
        }
    });
});
/**
 * A checkbox field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 * @jsx React.DOM
 */
 define('build/Components/Panels/Page/Form/checkbox.react',['build/Components/Panels/Page/Form/label.react'], function(Label) {
    return React.createClass({
        getInitialState: function() {
            return {checked: this.props.item.isChecked()}   
        },
        handleChange: function(event) {
            this.setState({checked: event.target.checked});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.checked = this.state.checked;
            attributes.onChange = this.handleChange;

            return (
                React.DOM.div(null, 
                    Label({item: this.props.item, name: this.props.item.getLabel()}), 
                React.DOM.input(attributes)
                )
            );
        }
    });
});
/**
 * A email field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define('build/Components/Panels/Page/Form/email.react',['build/Components/Panels/Page/Form/label.react'], function (Label) {
    return React.createClass({
        getInitialState: function () {
            return {value: this.props.item.getValue()};
        },
        handleChange: function (event) {
            this.setState({value: event.target.value});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;

            return (
                React.DOM.div(null, 
                    Label({item: this.props.item, name: this.props.item.getLabel()}), 
                React.DOM.input(attributes)
                )
            );
        }
    });
});
/**
 * A select field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 * @jsx React.DOM
 */
 define('build/Components/Panels/Page/Form/select.react',['build/Components/Panels/Page/Form/label.react'], function(Label) {
    return React.createClass({

        getInitialState: function() {
            return {options: this.props.item.getOptions(),
                value: this.props.item.getValue()}   
        },
        handleChange: function(event) {
            this.setState({value: event.target.value});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();

            var options = this.props.item.getOptions().map(function(option) {
            return (React.DOM.option(option, option.label)
                );
            }.bind(this));

            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;
            
            return (
                React.DOM.div(null, 
                Label({item: this.props.item, name: this.props.item.getLabel()}), 
                React.DOM.select(attributes,
                    options
                    )
                )
            );
        }
    });
});
/**
 * A date field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define('build/Components/Panels/Page/Form/date.react',['build/Components/Panels/Page/Form/label.react'], function (Label) {
    return React.createClass({
        getInitialState: function () {
            return {value: this.props.item.getValue()};
        },
        handleChange: function (event) {
            this.setState({value: event.target.value});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;

            return (
                React.DOM.div(null, 
                    Label({item: this.props.item, name: this.props.item.getLabel()}), 
                React.DOM.input(attributes)
                )
            );
        }
    });
});
/**
 * A range input, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define('build/Components/Panels/Page/Form/range.react',['build/Components/Panels/Page/Form/label.react'], function (Label) {
    return React.createClass({
        getInitialState: function () {
            return {value: this.props.item.getValue()};
        },
        handleChange: function (event) {
            this.setState({value: event.target.value});
        },
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.value = this.state.value;
            attributes.onChange = this.handleChange;

            return (
                React.DOM.div(null, 
                    Label({item: this.props.item, name: this.props.item.getLabel()}), 
                React.DOM.input(attributes)
                )
            );
        }
    });
});
/**
 * A submit button, properties:
 *
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define('build/Components/Panels/Page/Form/submit.react',[], function () {

    return React.createClass({
        render: function () {
            var attributes = this.props.item.getAttributes();
            attributes.className = 'button auja-bg-main';
            
            return (
                React.DOM.div(null, 
                React.DOM.input(attributes)
                )
            );
        }
    });
});
/**
 * A form, attributes of the form are passed directly
 *
 * @jsx React.DOM
 */

//Listing of all supported page items
var FormItems = {
    'header': 'build/Components/Panels/Page/header.react',
    'text': 'build/Components/Panels/Page/Form/text.react',
    'password': 'build/Components/Panels/Page/Form/password.react',
    'textarea': 'build/Components/Panels/Page/Form/textarea.react',
    'trumbowyg': 'build/Components/Panels/Page/Form/trumbowyg.react',
    'number': 'build/Components/Panels/Page/Form/number.react',
    'url': 'build/Components/Panels/Page/Form/url.react',
    'tel': 'build/Components/Panels/Page/Form/tel.react',
    'checkbox': 'build/Components/Panels/Page/Form/checkbox.react',
    'email': 'build/Components/Panels/Page/Form/email.react',
    'select': 'build/Components/Panels/Page/Form/select.react',
    'date': 'build/Components/Panels/Page/Form/date.react',
    'range': 'build/Components/Panels/Page/Form/range.react',
    'submit': 'build/Components/Panels/Page/Form/submit.react'
};

define('build/Components/Panels/Page/form.react',[
    'build/Components/Panels/Page/header.react',
    'build/Components/Panels/Page/Form/text.react',
    'build/Components/Panels/Page/Form/password.react',
    'build/Components/Panels/Page/Form/textarea.react',
    'build/Components/Panels/Page/Form/trumbowyg.react',
    'build/Components/Panels/Page/Form/number.react',
    'build/Components/Panels/Page/Form/url.react',
    'build/Components/Panels/Page/Form/tel.react',
    'build/Components/Panels/Page/Form/checkbox.react',
    'build/Components/Panels/Page/Form/email.react',
    'build/Components/Panels/Page/Form/select.react',
    'build/Components/Panels/Page/Form/date.react',
    'build/Components/Panels/Page/Form/range.react',
    'build/Components/Panels/Page/Form/submit.react'
], function () {
    return React.createClass({

        /**
         * Focus first element after form load
         */
        componentDidMount: function() {
            $(this.refs.form.getDOMNode()).find('input:visible:first').focus();
        },

        /**
         * Handles form submission
         */
        handleSubmit: function (e) {
            flux.actions.submit(
                this.props.item.getAction(),
                event.target.getAttribute('method'),
                $(event.target).serializeArray(),
                this.props.panel
            );
            return false;
        },

        /**
         * Generate an ID for an item
         * @param item
         */
        getFormItemId: function (item) {
            if (!this.formItemIds) {
                this.formItemIds = [];
            }

            var i = 1;
            var available = false;
            while (!available) {
                var id = 'input.{panel}.{type}.{index}'.assign({
                    panel: this.props.panel.id,
                    type: item.getType(),
                    index: i
                });

                if (!this.formItemIds[name]) {
                    available = true;
                }
            }

            return id;
        },

        render: function () {

            var items = this.props.item.getItems().map(function (item) {
                                
                if (!FormItems[item.getType()]) {
                    console.error("Unsupported form item type requested: " + item.getType());
                    return;
                }

                //Fetch the item from the corresponding file
                var Item = require(FormItems[item.getType()]);

                //Extract the validation message from the item
                item.validationMessage = null;
                if (item.getName() && this.props.message.validation && this.props.message.validation[item.getName()]) {
                    item.validationMessage = this.props.message.validation[item.getName()];
                }

                var className = 'row form-item form-item-{type}'.assign({type: item.getType()});
                return (
                    React.DOM.div({className: className}, 
                        Item({itemId: this.getFormItemId(item), item: item})
                    )
                );
            }.bind(this));

            return (
                React.DOM.form({ref: "form", onSubmit: this.handleSubmit, action: this.props.item.getAction(), method: this.props.item.getMethod()}, items)  
            );
        }
    });

});
/**
 * @jsx React.DOM
 */
define('build/Components/Scaffolding/authentication.react',['build/Components/Panels/Page/form.react'], function (Form) {

    return React.createClass({

        /**
         * Stores if the user was authenticated once
         */
        wasAuthenticated: false,

        /**
         * Definition of the authentication panel
         * @todo use an object definition for this
         */
        panel: {
            id: 'authentication'
        },

        render: function () {

            /**
             * Empty overlay when no authentication available
             */
            if(!this.props.auja.authentication) {
                return (
                    React.DOM.span({className: "authentication-missing"})
                    );
            }

            var className = "authentication-overlay authentication-overlay-hugeinc";

            //Set weither or not the user has already been authenticated before
            if (this.wasAuthenticated) {
                className += " transparent";
            } else if(this.props.auja.authenticated) {
                this.wasAuthenticated = true;
            }
            
            //Set open/closed
            className += this.props.auja.authenticated ? " closed" : " open";

            //Get a message from this form
            var message = flux.store('MessageStore').getMessage();
            
            return (
                React.DOM.div({className: className}, 
                    Form({message: message, panel: this.panel, item: this.props.auja.authentication})
                )
                );
        }
    });

});
/**
 * @jsx React.DOM
 */
define('build/Components/Scaffolding/header.react',[], function () {

    return React.createClass({
        render: function () {
            //Name of the user
            var user = '';
            if (this.props.auja.user) {
                user = (
                    React.DOM.div({className: "auja-color-main", id: "user"}, this.props.auja.user.name)
                    );
            }

            //Buttons, e.g. logout
            var buttons = '';
            if (this.props.auja.buttons) {
                buttons = this.props.auja.buttons.map(function (button) {
                    return (
                        React.DOM.a({className: "auja-bg-main button", key: button.target, href: button.target}, button.text)
                        );
                });
            }
            return (
                React.DOM.header(null, 
                    React.DOM.h1({className: "auja-color-main"}, this.props.auja.title), 
                    React.DOM.div({id: "buttons"}, buttons), 
                    user
                )
                );

        }
    });

});
                        
/**
 * The main menu on the left
 * 
 * @jsx React.DOM
 * @todo new name!
 */
define('build/Components/Scaffolding/menu.react',[], function() {
    
    var Item = React.createClass({displayName: 'Item',
        handleClick: function() {
            flux.actions.click(this.props.item.target);
        },
        render: function() {            
            var className = "auja-bg-main";
            
            if(this.props.item.icon) {
                className += " icon ion-" + this.props.item.icon;
            }
            
            return (
                React.DOM.li({className: className, title: this.props.item.title, onClick: this.handleClick}, 
                    React.DOM.span(null, this.props.item.title)
                )
                );
        }
    });

    return React.createClass({
        render: function() {
            var menu = this.props.auja.menu.map(function(item) {
                return (
                    Item({key: item.target, auja: this.props.auja, item: item})
                    );
            }.bind(this));
            
            return (
                React.DOM.ul({id: "main-menu"}, 
                    menu
                )
                );
        }
    });

});
/**
 * A link menu item, properties:
 *
 * - name
 * - href
 * - icon
 *
 * @jsx React.DOM
 */

define('build/Components/Panels/Menu/link.react',[], function() {
    return React.createClass({
        handleClick: function() {
            flux.actions.click(this.props.item.getTarget(), this.props.panel, this.props.item);
        },
        render: function() {
            
            var className = 'menu-item-link auja-border-secondary ';
            
            //Create the icon class
            var icon = "fallback";
            if(this.props.item.getIcon()) {
                icon = this.props.item.getIcon();    
            }
            className += "icon ion-" + icon;
            
            //Check if we match the active item
            if(this.props.item.isActive()) {
                className += " auja-color-main";
            }
            
            return (
                React.DOM.li({className: className, onClick: this.handleClick}, 
                    React.DOM.span(null, this.props.item.getText())
                )
                );
        }
    });

});
/**
 * A spacer menu item, properties:
 * 
 * - name
 *
 * @jsx React.DOM
 */

define('build/Components/Panels/Menu/spacer.react',[], function() {
    return React.createClass({
        render: function() {
            return (
                React.DOM.li({className: "menu-item-spacer auja-color-main auja-border-secondary"}, this.props.item.getText())
                );
        }
    });

});
/**
 * A mixin that enables the resource to paginate, expects:
 * 
 * - Property item, with method `getPaging`
 * - Property panel
 *
 * @jsx React.DOM
 */
define('build/Components/Panels/Menu/Mixins/paging.mixin',[], function () {

    return {
        pagingThreshHold: 300,
        componentDidMount: function() {
            flux.actions.extendResource(this.props.panel, this.props.item);
        },
        componentDidUpdate: function () {
            if (this.props.item.getPaging().next && this.needsExtending()) {
                flux.actions.extendResource(this.props.panel, this.props.item);
            }
        },
        needsExtending: function () {
            var node = $('#' + this.props.panel.getId()).find('div:first');
            var ch = node.height(),
                st = node.scrollTop(),
                sh = node[0].scrollHeight;

            return sh - st - ch < this.pagingThreshHold;
        }
    }

});
/**
 * @jsx React.DOM
 */

define('build/Components/Panels/Menu/Mixins/searchable.mixin',[], function() {
   
    return {
        /**
         * Current query
         */
        query: '',

        /**
         * Original source of the menu
         */
        originalSource: null,

        /**
         * Reference to the searchable property
         */
        searchableProperty: null,

        /**
         * Store the original source just before mounting
         */
        componentWillMount: function() {
            this.originalSource = this.props.item.getTarget();  
            this.searchableProperty = this.props.item.getProperty('searchable');
        },

        /**
         * Handle searching
         * @param e
         */
        handleSearch: function(e) {
            this.query = e.target.value;
            
            var target = this.originalSource;
            if(this.query != '') {
                //Get target, replace %s with query and escape it so we have a nice url
                target = this.searchableProperty.getTarget().replace('%s', this.query.escapeURL(true));
            }

            flux.actions.updateResource(this.props.item, target);
        },
        
        /**
         * Fetch the form used for searching, when the property was not attached it will return an empty string
         * @return {*}
         */
        getSearchableForm: function() {
            if(!this.props.item.hasProperty('searchable')) {
                return '';
            }
            return (
                React.DOM.input({type: "text", onChange: this.handleSearch, placeholder: "Search.."})  
            );
        }
    }
    
});
/**
 * A resource menu item, properties:
 *
 * - target
 *
 * @jsx React.DOM
 */

define('build/Components/Panels/Menu/resource.react',['build/Components/Panels/Menu/Mixins/paging.mixin', 'build/Components/Panels/Menu/Mixins/searchable.mixin', 'build/Objects/menu'], function (Paging, Searchable, Menu) {

    return React.createClass({
        mixins: [Paging, Searchable],
        render: function () {
            var MenuPanel = require('build/Components/Panels/menu.react');

            //Transfer different props to mock Menu
            var panel = new Menu();
            panel.setOrigin(this.props.panel.getOrigin());
            panel.setItems(this.props.item.getItems());

            return (
                React.DOM.li({className: "menu-item-resource"}, 
                    this.getSearchableForm(), 
                    MenuPanel({panel: panel, originPanel: this.props.panel})
                )
            );
        }
    });

});
/**
 * A menu panel
 *
 * @jsx React.DOM
 */

//Listing of all supported menu items
var MenuItems = {
    'link': 'build/Components/Panels/Menu/link.react',
    'spacer': 'build/Components/Panels/Menu/spacer.react',
    'resource': 'build/Components/Panels/Menu/resource.react'
};

//Map as an array to load panel dependencies
define('build/Components/Panels/menu.react',[
    'build/Components/Panels/Menu/link.react',
    'build/Components/Panels/Menu/spacer.react',
    'build/Components/Panels/Menu/resource.react'
], function() {
    return React.createClass({
        render: function() {
            
            //Create the possibility to set a custom "origin panel", to use as reference
            var originPanel = this.props.originPanel || this.props.panel;
            
            //Combine menu items together to form a single list
            var menu = this.props.panel.getItems().map(function(item) {
                if(!MenuItems[item.getType()]) {
                    console.error("Unsupported menu item type requested: " + item.getType());
                    return;
                }
                
                var Item = require(MenuItems[item.getType()]);
                return ( Item({key: item.key, scrollContainer: this.props.scrollContainer, flux: this.props.flux, panel: originPanel, item: item}) );
            }.bind(this));
            
            return (
                React.DOM.ul(null, 
                    menu
                )
                );
        }
    });

});
/**
 * A page panel
 *
 * @jsx React.DOM
 */

//Listing of all supported page items
var PageItems = {
    'header': 'build/Components/Panels/Page/header.react',
    'form': 'build/Components/Panels/Page/form.react'
};

//Map as an array to load panel dependencies
define('build/Components/Panels/page.react',[
    'build/Components/Panels/Page/header.react',
    'build/Components/Panels/Page/form.react'
], function () {

    return React.createClass({
        render: function () {

            //Combine page items together to form a single list
            var page = this.props.panel.getContent().map(function (item) {
                if (!item) {
                    console.error('Undefined item passed, did you create an object for it?');
                    return;
                } else if (!PageItems[item.getType()]) {
                    console.error("Unsupported page item type requested: " + item.getType());
                    return;
                }
                var Item = require(PageItems[item.getType()]);
                return (
                    React.DOM.div({class: "row"}, 
                        Item({message: this.props.message, panel: this.props.panel, item: item})
                    )
                );
            }.bind(this));

            return (
                React.DOM.div(null, 
                    page
                )
            );
        }
    });

});
/**
 * Panels
 *
 * @jsx React.DOM
 */

//Listing of all supported panels
var PanelTypes = {
    'menu': 'build/Components/Panels/menu.react',
    'page': 'build/Components/Panels/page.react'
};

//Map as an array to load panel dependencies
define('build/Components/Scaffolding/panels.react',[
    'build/Components/Panels/menu.react',
    'build/Components/Panels/page.react'
], function () {
    
    var PanelSection = React.createClass({displayName: 'PanelSection',
        handleScroll: function () {
            flux.actions.onPanelScroll(this.props.panel);
        },
        render: function () {
            var Panel = require(PanelTypes[this.props.panel.getType()]);
            
            return (
                React.DOM.section({id: this.props.panel.getId(), key: this.props.panel.getId(), ref: "panel", className: "animated fadeInLeft panel panel-" + this.props.panel.getType()}, 
                    React.DOM.div({onScroll: this.handleScroll, style: this.props.style}, 
                        Panel({flux: this.props.flux, message: this.props.message, panel: this.props.panel})
                    )
                )
            );
        }
    });

    /**
     * Main content with all panels
     */
    return React.createClass({
        mixins: [Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('PanelStore', 'MessageStore')],
        getStateFromFlux: function () {
            return flux.store('PanelStore').getState();
        },

        /**
         * After addition/removal will animate scrollLeft, this is done by listening to DOMNode events
         * instead of componentDidUpdate since it triggers too late
         */        
        componentDidMount: function() {
            $(this.refs.panels.getDOMNode()).bind('DOMNodeInserted DOMNodeRemoved', function() {
                var b = $('body');
                if(b[0].scrollLeft != (b[0].scrollWidth - window.innerWidth)) {
                    b.animate({
                        scrollLeft: b[0].scrollWidth - window.innerWidth
                    }, 300);
                }
            });
        },

        /**
         * Render the div with all panels
         * @returns {XML}
         */
        render: function () {

            var message = flux.store('MessageStore').getMessage();
            
            //Fetch and wrap all panels in a section having the class "panel panel-{type}"
            var panels = this.state.panels.map(function (panel) {
                var style = {
                    height: this.state.height
                };

                //When the current message is destined for this panel pass it, otherwise just an empty panel
                var m = {};
                if (message.origin && message.origin.id == panel.id) {
                    m = message.message;
                }
                
                return (PanelSection({key: panel.getIndex(), flux: this.props.flux, panel: panel, message: m, style: style}));
            }.bind(this));
            
            return (
                React.DOM.div({id: "panels", ref: "panels"}, 
                    React.DOM.div(null, 
                        panels
                    )
                )
            );
        }
    });

});
/**
 * @jsx React.DOM
 */
define('build/Components/Scaffolding/body.react',[
    'build/Components/Scaffolding/menu.react',
    'build/Components/Scaffolding/panels.react'
], function(Menu, Panels) {

    return React.createClass({
        render: function() {
            return (
                React.DOM.section({id: "content"}, 
                    Menu({auja: this.props.auja}), 
                    Panels({flux: this.props.flux})
                )
                );
        }
    });

});
/**
 * @jsx React.DOM
 */
define('build/scaffolding.react',[
    'build/Stores/auja',
    'build/Components/Scaffolding/message.react',
    'build/Components/Scaffolding/authentication.react',
    'build/Components/Scaffolding/header.react',
    'build/Components/Scaffolding/body.react'
], function (Store, Message, Authentication, Header, Body) {

    var Style = React.createClass({displayName: 'Style',
        /**
         * Combine items into a neatly formatted string
         * @param name
         * @param property_name the CSS property to be styled
         * @param value the value it should take
         * @returns {string}
         */
        entry: function (name, property_name, value) {
            var result = "";
            result += name + " {\n";
            result += "\t" + property_name + ": " + value + "!important;\n";
            result += "}\n\n";
            return result;
        },
        parse: function (colors) {
            var result = "\n";
            for (var name in colors) {
                result += this.entry('.auja-bg-' + name, 'background-color', colors[name]);
                result += this.entry('.auja-color-' + name, 'color', colors[name]);
                result += this.entry('.auja-border-' + name, 'border-color', colors[name]);
            }
            return result;
        },
        render: function () {
            var style = this.parse(this.props.auja.colors);
            
            //Force the main auja color to be put into triangle on top
            style += this.entry('ul#main-menu li:after', 'border-color', 'transparent ' + this.props.auja.colors.main + ' transparent transparent');

            return (
                React.DOM.style(null, 
                    style
                )
                );
        }
    });

    return React.createClass({
        mixins: [Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin('AujaStore')],
        getStateFromFlux: function () {
            return flux.store('AujaStore').getState();
        },
        componentWillMount: function () {
            flux.actions.initialize();
        },
        componentDidMount: function() {
            flux.actions.resize();  
        },
        render: function () {
            document.title = this.state.title;

            return (
                React.DOM.div({id: "auja"}, 
                    Message({flux: this.props.flux}), 
                    Authentication({auja: this.state}), 
                    Header({auja: this.state}), 
                    Body({flux: this.props.flux, auja: this.state}), 
                    Style({auja: this.state})
                )
                );
        }
    });

});
/*jslint onevar:true, undef:true, newcap:true, regexp:true, bitwise:true, maxerr:50, indent:4, white:false, nomen:false, plusplus:false */
/*global define:false, require:false, exports:false, module:false, signals:false */

/** @license
 * JS Signals <http://millermedeiros.github.com/js-signals/>
 * Released under the MIT license
 * Author: Miller Medeiros
 * Version: 1.0.0 - Build: 268 (2012/11/29 05:48 PM)
 */

(function(global){

    // SignalBinding -------------------------------------------------
    //================================================================

    /**
     * Object that represents a binding between a Signal and a listener function.
     * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
     * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
     * @author Miller Medeiros
     * @constructor
     * @internal
     * @name SignalBinding
     * @param {Signal} signal Reference to Signal object that listener is currently bound to.
     * @param {Function} listener Handler function bound to the signal.
     * @param {boolean} isOnce If binding should be executed just once.
     * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
     * @param {Number} [priority] The priority level of the event listener. (default = 0).
     */
    function SignalBinding(signal, listener, isOnce, listenerContext, priority) {

        /**
         * Handler function bound to the signal.
         * @type Function
         * @private
         */
        this._listener = listener;

        /**
         * If binding should be executed just once.
         * @type boolean
         * @private
         */
        this._isOnce = isOnce;

        /**
         * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @memberOf SignalBinding.prototype
         * @name context
         * @type Object|undefined|null
         */
        this.context = listenerContext;

        /**
         * Reference to Signal object that listener is currently bound to.
         * @type Signal
         * @private
         */
        this._signal = signal;

        /**
         * Listener priority
         * @type Number
         * @private
         */
        this._priority = priority || 0;
    }

    SignalBinding.prototype = {

        /**
         * If binding is active and should be executed.
         * @type boolean
         */
        active : true,

        /**
         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
         * @type Array|null
         */
        params : null,

        /**
         * Call listener passing arbitrary parameters.
         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
         * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
         * @return {*} Value returned by the listener.
         */
        execute : function (paramsArr) {
            var handlerReturn, params;
            if (this.active && !!this._listener) {
                params = this.params? this.params.concat(paramsArr) : paramsArr;
                handlerReturn = this._listener.apply(this.context, params);
                if (this._isOnce) {
                    this.detach();
                }
            }
            return handlerReturn;
        },

        /**
         * Detach binding from signal.
         * - alias to: mySignal.remove(myBinding.getListener());
         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
         */
        detach : function () {
            return this.isBound()? this._signal.remove(this._listener, this.context) : null;
        },

        /**
         * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
         */
        isBound : function () {
            return (!!this._signal && !!this._listener);
        },

        /**
         * @return {boolean} If SignalBinding will only be executed once.
         */
        isOnce : function () {
            return this._isOnce;
        },

        /**
         * @return {Function} Handler function bound to the signal.
         */
        getListener : function () {
            return this._listener;
        },

        /**
         * @return {Signal} Signal that listener is currently bound to.
         */
        getSignal : function () {
            return this._signal;
        },

        /**
         * Delete instance properties
         * @private
         */
        _destroy : function () {
            delete this._signal;
            delete this._listener;
            delete this.context;
        },

        /**
         * @return {string} String representation of the object.
         */
        toString : function () {
            return '[SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
        }

    };


/*global SignalBinding:false*/

    // Signal --------------------------------------------------------
    //================================================================

    function validateListener(listener, fnName) {
        if (typeof listener !== 'function') {
            throw new Error( 'listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName) );
        }
    }

    /**
     * Custom event broadcaster
     * <br />- inspired by Robert Penner's AS3 Signals.
     * @name Signal
     * @author Miller Medeiros
     * @constructor
     */
    function Signal() {
        /**
         * @type Array.<SignalBinding>
         * @private
         */
        this._bindings = [];
        this._prevParams = null;

        // enforce dispatch to aways work on same context (#47)
        var self = this;
        this.dispatch = function(){
            Signal.prototype.dispatch.apply(self, arguments);
        };
    }

    Signal.prototype = {

        /**
         * Signals Version Number
         * @type String
         * @const
         */
        VERSION : '1.0.0',

        /**
         * If Signal should keep record of previously dispatched parameters and
         * automatically execute listener during `add()`/`addOnce()` if Signal was
         * already dispatched before.
         * @type boolean
         */
        memorize : false,

        /**
         * @type boolean
         * @private
         */
        _shouldPropagate : true,

        /**
         * If Signal is active and should broadcast events.
         * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
         * @type boolean
         */
        active : true,

        /**
         * @param {Function} listener
         * @param {boolean} isOnce
         * @param {Object} [listenerContext]
         * @param {Number} [priority]
         * @return {SignalBinding}
         * @private
         */
        _registerListener : function (listener, isOnce, listenerContext, priority) {

            var prevIndex = this._indexOfListener(listener, listenerContext),
                binding;

            if (prevIndex !== -1) {
                binding = this._bindings[prevIndex];
                if (binding.isOnce() !== isOnce) {
                    throw new Error('You cannot add'+ (isOnce? '' : 'Once') +'() then add'+ (!isOnce? '' : 'Once') +'() the same listener without removing the relationship first.');
                }
            } else {
                binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
                this._addBinding(binding);
            }

            if(this.memorize && this._prevParams){
                binding.execute(this._prevParams);
            }

            return binding;
        },

        /**
         * @param {SignalBinding} binding
         * @private
         */
        _addBinding : function (binding) {
            //simplified insertion sort
            var n = this._bindings.length;
            do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
            this._bindings.splice(n + 1, 0, binding);
        },

        /**
         * @param {Function} listener
         * @return {number}
         * @private
         */
        _indexOfListener : function (listener, context) {
            var n = this._bindings.length,
                cur;
            while (n--) {
                cur = this._bindings[n];
                if (cur._listener === listener && cur.context === context) {
                    return n;
                }
            }
            return -1;
        },

        /**
         * Check if listener was attached to Signal.
         * @param {Function} listener
         * @param {Object} [context]
         * @return {boolean} if Signal has the specified listener.
         */
        has : function (listener, context) {
            return this._indexOfListener(listener, context) !== -1;
        },

        /**
         * Add a listener to the signal.
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        add : function (listener, listenerContext, priority) {
            validateListener(listener, 'add');
            return this._registerListener(listener, false, listenerContext, priority);
        },

        /**
         * Add listener to the signal that should be removed after first execution (will be executed only once).
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        addOnce : function (listener, listenerContext, priority) {
            validateListener(listener, 'addOnce');
            return this._registerListener(listener, true, listenerContext, priority);
        },

        /**
         * Remove a single listener from the dispatch queue.
         * @param {Function} listener Handler function that should be removed.
         * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
         * @return {Function} Listener handler function.
         */
        remove : function (listener, context) {
            validateListener(listener, 'remove');

            var i = this._indexOfListener(listener, context);
            if (i !== -1) {
                this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
                this._bindings.splice(i, 1);
            }
            return listener;
        },

        /**
         * Remove all listeners from the Signal.
         */
        removeAll : function () {
            var n = this._bindings.length;
            while (n--) {
                this._bindings[n]._destroy();
            }
            this._bindings.length = 0;
        },

        /**
         * @return {number} Number of listeners attached to the Signal.
         */
        getNumListeners : function () {
            return this._bindings.length;
        },

        /**
         * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
         * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
         * @see Signal.prototype.disable
         */
        halt : function () {
            this._shouldPropagate = false;
        },

        /**
         * Dispatch/Broadcast Signal to all listeners added to the queue.
         * @param {...*} [params] Parameters that should be passed to each handler.
         */
        dispatch : function (params) {
            if (! this.active) {
                return;
            }

            var paramsArr = Array.prototype.slice.call(arguments),
                n = this._bindings.length,
                bindings;

            if (this.memorize) {
                this._prevParams = paramsArr;
            }

            if (! n) {
                //should come after memorize
                return;
            }

            bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
            this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

            //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
            //reverse loop since listeners with higher priority will be added at the end of the list
            do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
        },

        /**
         * Forget memorized arguments.
         * @see Signal.memorize
         */
        forget : function(){
            this._prevParams = null;
        },

        /**
         * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
         * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
         */
        dispose : function () {
            this.removeAll();
            delete this._bindings;
            delete this._prevParams;
        },

        /**
         * @return {string} String representation of the object.
         */
        toString : function () {
            return '[Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';
        }

    };


    // Namespace -----------------------------------------------------
    //================================================================

    /**
     * Signals namespace
     * @namespace
     * @name signals
     */
    var signals = Signal;

    /**
     * Custom event broadcaster
     * @see Signal
     */
    // alias for backwards compatibility (see #gh-44)
    signals.Signal = Signal;



    //exports to multiple environments
    if(typeof define === 'function' && define.amd){ //AMD
        define('signals',[],function () { return signals; });
    } else if (typeof module !== 'undefined' && module.exports){ //node
        module.exports = signals;
    } else { //browser
        //use string because of Google closure compiler ADVANCED_MODE
        /*jslint sub:true */
        global['signals'] = signals;
    }

}(this));

/** @license
 * crossroads <http://millermedeiros.github.com/crossroads.js/>
 * Author: Miller Medeiros | MIT License
 * v0.12.0 (2013/01/21 13:47)
 */

(function () {
var factory = function (signals) {

    var crossroads,
        _hasOptionalGroupBug,
        UNDEF;

    // Helpers -----------
    //====================

    // IE 7-8 capture optional groups as empty strings while other browsers
    // capture as `undefined`
    _hasOptionalGroupBug = (/t(.+)?/).exec('t')[1] === '';

    function arrayIndexOf(arr, val) {
        if (arr.indexOf) {
            return arr.indexOf(val);
        } else {
            //Array.indexOf doesn't work on IE 6-7
            var n = arr.length;
            while (n--) {
                if (arr[n] === val) {
                    return n;
                }
            }
            return -1;
        }
    }

    function arrayRemove(arr, item) {
        var i = arrayIndexOf(arr, item);
        if (i !== -1) {
            arr.splice(i, 1);
        }
    }

    function isKind(val, kind) {
        return '[object '+ kind +']' === Object.prototype.toString.call(val);
    }

    function isRegExp(val) {
        return isKind(val, 'RegExp');
    }

    function isArray(val) {
        return isKind(val, 'Array');
    }

    function isFunction(val) {
        return typeof val === 'function';
    }

    //borrowed from AMD-utils
    function typecastValue(val) {
        var r;
        if (val === null || val === 'null') {
            r = null;
        } else if (val === 'true') {
            r = true;
        } else if (val === 'false') {
            r = false;
        } else if (val === UNDEF || val === 'undefined') {
            r = UNDEF;
        } else if (val === '' || isNaN(val)) {
            //isNaN('') returns false
            r = val;
        } else {
            //parseFloat(null || '') returns NaN
            r = parseFloat(val);
        }
        return r;
    }

    function typecastArrayValues(values) {
        var n = values.length,
            result = [];
        while (n--) {
            result[n] = typecastValue(values[n]);
        }
        return result;
    }

    //borrowed from AMD-Utils
    function decodeQueryString(str, shouldTypecast) {
        var queryArr = (str || '').replace('?', '').split('&'),
            n = queryArr.length,
            obj = {},
            item, val;
        while (n--) {
            item = queryArr[n].split('=');
            val = shouldTypecast ? typecastValue(item[1]) : item[1];
            obj[item[0]] = (typeof val === 'string')? decodeURIComponent(val) : val;
        }
        return obj;
    }


    // Crossroads --------
    //====================

    /**
     * @constructor
     */
    function Crossroads() {
        this.bypassed = new signals.Signal();
        this.routed = new signals.Signal();
        this._routes = [];
        this._prevRoutes = [];
        this._piped = [];
        this.resetState();
    }

    Crossroads.prototype = {

        greedy : false,

        greedyEnabled : true,

        ignoreCase : true,

        ignoreState : false,

        shouldTypecast : false,

        normalizeFn : null,

        resetState : function(){
            this._prevRoutes.length = 0;
            this._prevMatchedRequest = null;
            this._prevBypassedRequest = null;
        },

        create : function () {
            return new Crossroads();
        },

        addRoute : function (pattern, callback, priority) {
            var route = new Route(pattern, callback, priority, this);
            this._sortedInsert(route);
            return route;
        },

        removeRoute : function (route) {
            arrayRemove(this._routes, route);
            route._destroy();
        },

        removeAllRoutes : function () {
            var n = this.getNumRoutes();
            while (n--) {
                this._routes[n]._destroy();
            }
            this._routes.length = 0;
        },

        parse : function (request, defaultArgs) {
            request = request || '';
            defaultArgs = defaultArgs || [];

            // should only care about different requests if ignoreState isn't true
            if ( !this.ignoreState &&
                (request === this._prevMatchedRequest ||
                 request === this._prevBypassedRequest) ) {
                return;
            }

            var routes = this._getMatchedRoutes(request),
                i = 0,
                n = routes.length,
                cur;

            if (n) {
                this._prevMatchedRequest = request;

                this._notifyPrevRoutes(routes, request);
                this._prevRoutes = routes;
                //should be incremental loop, execute routes in order
                while (i < n) {
                    cur = routes[i];
                    cur.route.matched.dispatch.apply(cur.route.matched, defaultArgs.concat(cur.params));
                    cur.isFirst = !i;
                    this.routed.dispatch.apply(this.routed, defaultArgs.concat([request, cur]));
                    i += 1;
                }
            } else {
                this._prevBypassedRequest = request;
                this.bypassed.dispatch.apply(this.bypassed, defaultArgs.concat([request]));
            }

            this._pipeParse(request, defaultArgs);
        },

        _notifyPrevRoutes : function(matchedRoutes, request) {
            var i = 0, prev;
            while (prev = this._prevRoutes[i++]) {
                //check if switched exist since route may be disposed
                if(prev.route.switched && this._didSwitch(prev.route, matchedRoutes)) {
                    prev.route.switched.dispatch(request);
                }
            }
        },

        _didSwitch : function (route, matchedRoutes){
            var matched,
                i = 0;
            while (matched = matchedRoutes[i++]) {
                // only dispatch switched if it is going to a different route
                if (matched.route === route) {
                    return false;
                }
            }
            return true;
        },

        _pipeParse : function(request, defaultArgs) {
            var i = 0, route;
            while (route = this._piped[i++]) {
                route.parse(request, defaultArgs);
            }
        },

        getNumRoutes : function () {
            return this._routes.length;
        },

        _sortedInsert : function (route) {
            //simplified insertion sort
            var routes = this._routes,
                n = routes.length;
            do { --n; } while (routes[n] && route._priority <= routes[n]._priority);
            routes.splice(n+1, 0, route);
        },

        _getMatchedRoutes : function (request) {
            var res = [],
                routes = this._routes,
                n = routes.length,
                route;
            //should be decrement loop since higher priorities are added at the end of array
            while (route = routes[--n]) {
                if ((!res.length || this.greedy || route.greedy) && route.match(request)) {
                    res.push({
                        route : route,
                        params : route._getParamsArray(request)
                    });
                }
                if (!this.greedyEnabled && res.length) {
                    break;
                }
            }
            return res;
        },

        pipe : function (otherRouter) {
            this._piped.push(otherRouter);
        },

        unpipe : function (otherRouter) {
            arrayRemove(this._piped, otherRouter);
        },

        toString : function () {
            return '[crossroads numRoutes:'+ this.getNumRoutes() +']';
        }
    };

    //"static" instance
    crossroads = new Crossroads();
    crossroads.VERSION = '0.12.0';

    crossroads.NORM_AS_ARRAY = function (req, vals) {
        return [vals.vals_];
    };

    crossroads.NORM_AS_OBJECT = function (req, vals) {
        return [vals];
    };


    // Route --------------
    //=====================

    /**
     * @constructor
     */
    function Route(pattern, callback, priority, router) {
        var isRegexPattern = isRegExp(pattern),
            patternLexer = router.patternLexer;
        this._router = router;
        this._pattern = pattern;
        this._paramsIds = isRegexPattern? null : patternLexer.getParamIds(pattern);
        this._optionalParamsIds = isRegexPattern? null : patternLexer.getOptionalParamsIds(pattern);
        this._matchRegexp = isRegexPattern? pattern : patternLexer.compilePattern(pattern, router.ignoreCase);
        this.matched = new signals.Signal();
        this.switched = new signals.Signal();
        if (callback) {
            this.matched.add(callback);
        }
        this._priority = priority || 0;
    }

    Route.prototype = {

        greedy : false,

        rules : void(0),

        match : function (request) {
            request = request || '';
            return this._matchRegexp.test(request) && this._validateParams(request); //validate params even if regexp because of `request_` rule.
        },

        _validateParams : function (request) {
            var rules = this.rules,
                values = this._getParamsObject(request),
                key;
            for (key in rules) {
                // normalize_ isn't a validation rule... (#39)
                if(key !== 'normalize_' && rules.hasOwnProperty(key) && ! this._isValidParam(request, key, values)){
                    return false;
                }
            }
            return true;
        },

        _isValidParam : function (request, prop, values) {
            var validationRule = this.rules[prop],
                val = values[prop],
                isValid = false,
                isQuery = (prop.indexOf('?') === 0);

            if (val == null && this._optionalParamsIds && arrayIndexOf(this._optionalParamsIds, prop) !== -1) {
                isValid = true;
            }
            else if (isRegExp(validationRule)) {
                if (isQuery) {
                    val = values[prop +'_']; //use raw string
                }
                isValid = validationRule.test(val);
            }
            else if (isArray(validationRule)) {
                if (isQuery) {
                    val = values[prop +'_']; //use raw string
                }
                isValid = this._isValidArrayRule(validationRule, val);
            }
            else if (isFunction(validationRule)) {
                isValid = validationRule(val, request, values);
            }

            return isValid; //fail silently if validationRule is from an unsupported type
        },

        _isValidArrayRule : function (arr, val) {
            if (! this._router.ignoreCase) {
                return arrayIndexOf(arr, val) !== -1;
            }

            if (typeof val === 'string') {
                val = val.toLowerCase();
            }

            var n = arr.length,
                item,
                compareVal;

            while (n--) {
                item = arr[n];
                compareVal = (typeof item === 'string')? item.toLowerCase() : item;
                if (compareVal === val) {
                    return true;
                }
            }
            return false;
        },

        _getParamsObject : function (request) {
            var shouldTypecast = this._router.shouldTypecast,
                values = this._router.patternLexer.getParamValues(request, this._matchRegexp, shouldTypecast),
                o = {},
                n = values.length,
                param, val;
            while (n--) {
                val = values[n];
                if (this._paramsIds) {
                    param = this._paramsIds[n];
                    if (param.indexOf('?') === 0 && val) {
                        //make a copy of the original string so array and
                        //RegExp validation can be applied properly
                        o[param +'_'] = val;
                        //update vals_ array as well since it will be used
                        //during dispatch
                        val = decodeQueryString(val, shouldTypecast);
                        values[n] = val;
                    }
                    // IE will capture optional groups as empty strings while other
                    // browsers will capture `undefined` so normalize behavior.
                    // see: #gh-58, #gh-59, #gh-60
                    if ( _hasOptionalGroupBug && val === '' && arrayIndexOf(this._optionalParamsIds, param) !== -1 ) {
                        val = void(0);
                        values[n] = val;
                    }
                    o[param] = val;
                }
                //alias to paths and for RegExp pattern
                o[n] = val;
            }
            o.request_ = shouldTypecast? typecastValue(request) : request;
            o.vals_ = values;
            return o;
        },

        _getParamsArray : function (request) {
            var norm = this.rules? this.rules.normalize_ : null,
                params;
            norm = norm || this._router.normalizeFn; // default normalize
            if (norm && isFunction(norm)) {
                params = norm(request, this._getParamsObject(request));
            } else {
                params = this._getParamsObject(request).vals_;
            }
            return params;
        },

        interpolate : function(replacements) {
            var str = this._router.patternLexer.interpolate(this._pattern, replacements);
            if (! this._validateParams(str) ) {
                throw new Error('Generated string doesn\'t validate against `Route.rules`.');
            }
            return str;
        },

        dispose : function () {
            this._router.removeRoute(this);
        },

        _destroy : function () {
            this.matched.dispose();
            this.switched.dispose();
            this.matched = this.switched = this._pattern = this._matchRegexp = null;
        },

        toString : function () {
            return '[Route pattern:"'+ this._pattern +'", numListeners:'+ this.matched.getNumListeners() +']';
        }

    };



    // Pattern Lexer ------
    //=====================

    Crossroads.prototype.patternLexer = (function () {

        var
            //match chars that should be escaped on string regexp
            ESCAPE_CHARS_REGEXP = /[\\.+*?\^$\[\](){}\/'#]/g,

            //trailing slashes (begin/end of string)
            LOOSE_SLASHES_REGEXP = /^\/|\/$/g,
            LEGACY_SLASHES_REGEXP = /\/$/g,

            //params - everything between `{ }` or `: :`
            PARAMS_REGEXP = /(?:\{|:)([^}:]+)(?:\}|:)/g,

            //used to save params during compile (avoid escaping things that
            //shouldn't be escaped).
            TOKENS = {
                'OS' : {
                    //optional slashes
                    //slash between `::` or `}:` or `\w:` or `:{?` or `}{?` or `\w{?`
                    rgx : /([:}]|\w(?=\/))\/?(:|(?:\{\?))/g,
                    save : '$1{{id}}$2',
                    res : '\\/?'
                },
                'RS' : {
                    //required slashes
                    //used to insert slash between `:{` and `}{`
                    rgx : /([:}])\/?(\{)/g,
                    save : '$1{{id}}$2',
                    res : '\\/'
                },
                'RQ' : {
                    //required query string - everything in between `{? }`
                    rgx : /\{\?([^}]+)\}/g,
                    //everything from `?` till `#` or end of string
                    res : '\\?([^#]+)'
                },
                'OQ' : {
                    //optional query string - everything in between `:? :`
                    rgx : /:\?([^:]+):/g,
                    //everything from `?` till `#` or end of string
                    res : '(?:\\?([^#]*))?'
                },
                'OR' : {
                    //optional rest - everything in between `: *:`
                    rgx : /:([^:]+)\*:/g,
                    res : '(.*)?' // optional group to avoid passing empty string as captured
                },
                'RR' : {
                    //rest param - everything in between `{ *}`
                    rgx : /\{([^}]+)\*\}/g,
                    res : '(.+)'
                },
                // required/optional params should come after rest segments
                'RP' : {
                    //required params - everything between `{ }`
                    rgx : /\{([^}]+)\}/g,
                    res : '([^\\/?]+)'
                },
                'OP' : {
                    //optional params - everything between `: :`
                    rgx : /:([^:]+):/g,
                    res : '([^\\/?]+)?\/?'
                }
            },

            LOOSE_SLASH = 1,
            STRICT_SLASH = 2,
            LEGACY_SLASH = 3,

            _slashMode = LOOSE_SLASH;


        function precompileTokens(){
            var key, cur;
            for (key in TOKENS) {
                if (TOKENS.hasOwnProperty(key)) {
                    cur = TOKENS[key];
                    cur.id = '__CR_'+ key +'__';
                    cur.save = ('save' in cur)? cur.save.replace('{{id}}', cur.id) : cur.id;
                    cur.rRestore = new RegExp(cur.id, 'g');
                }
            }
        }
        precompileTokens();


        function captureVals(regex, pattern) {
            var vals = [], match;
            // very important to reset lastIndex since RegExp can have "g" flag
            // and multiple runs might affect the result, specially if matching
            // same string multiple times on IE 7-8
            regex.lastIndex = 0;
            while (match = regex.exec(pattern)) {
                vals.push(match[1]);
            }
            return vals;
        }

        function getParamIds(pattern) {
            return captureVals(PARAMS_REGEXP, pattern);
        }

        function getOptionalParamsIds(pattern) {
            return captureVals(TOKENS.OP.rgx, pattern);
        }

        function compilePattern(pattern, ignoreCase) {
            pattern = pattern || '';

            if(pattern){
                if (_slashMode === LOOSE_SLASH) {
                    pattern = pattern.replace(LOOSE_SLASHES_REGEXP, '');
                }
                else if (_slashMode === LEGACY_SLASH) {
                    pattern = pattern.replace(LEGACY_SLASHES_REGEXP, '');
                }

                //save tokens
                pattern = replaceTokens(pattern, 'rgx', 'save');
                //regexp escape
                pattern = pattern.replace(ESCAPE_CHARS_REGEXP, '\\$&');
                //restore tokens
                pattern = replaceTokens(pattern, 'rRestore', 'res');

                if (_slashMode === LOOSE_SLASH) {
                    pattern = '\\/?'+ pattern;
                }
            }

            if (_slashMode !== STRICT_SLASH) {
                //single slash is treated as empty and end slash is optional
                pattern += '\\/?';
            }
            return new RegExp('^'+ pattern + '$', ignoreCase? 'i' : '');
        }

        function replaceTokens(pattern, regexpName, replaceName) {
            var cur, key;
            for (key in TOKENS) {
                if (TOKENS.hasOwnProperty(key)) {
                    cur = TOKENS[key];
                    pattern = pattern.replace(cur[regexpName], cur[replaceName]);
                }
            }
            return pattern;
        }

        function getParamValues(request, regexp, shouldTypecast) {
            var vals = regexp.exec(request);
            if (vals) {
                vals.shift();
                if (shouldTypecast) {
                    vals = typecastArrayValues(vals);
                }
            }
            return vals;
        }

        function interpolate(pattern, replacements) {
            if (typeof pattern !== 'string') {
                throw new Error('Route pattern should be a string.');
            }

            var replaceFn = function(match, prop){
                    var val;
                    prop = (prop.substr(0, 1) === '?')? prop.substr(1) : prop;
                    if (replacements[prop] != null) {
                        if (typeof replacements[prop] === 'object') {
                            var queryParts = [];
                            for(var key in replacements[prop]) {
                                queryParts.push(encodeURI(key + '=' + replacements[prop][key]));
                            }
                            val = '?' + queryParts.join('&');
                        } else {
                            // make sure value is a string see #gh-54
                            val = String(replacements[prop]);
                        }

                        if (match.indexOf('*') === -1 && val.indexOf('/') !== -1) {
                            throw new Error('Invalid value "'+ val +'" for segment "'+ match +'".');
                        }
                    }
                    else if (match.indexOf('{') !== -1) {
                        throw new Error('The segment '+ match +' is required.');
                    }
                    else {
                        val = '';
                    }
                    return val;
                };

            if (! TOKENS.OS.trail) {
                TOKENS.OS.trail = new RegExp('(?:'+ TOKENS.OS.id +')+$');
            }

            return pattern
                        .replace(TOKENS.OS.rgx, TOKENS.OS.save)
                        .replace(PARAMS_REGEXP, replaceFn)
                        .replace(TOKENS.OS.trail, '') // remove trailing
                        .replace(TOKENS.OS.rRestore, '/'); // add slash between segments
        }

        //API
        return {
            strict : function(){
                _slashMode = STRICT_SLASH;
            },
            loose : function(){
                _slashMode = LOOSE_SLASH;
            },
            legacy : function(){
                _slashMode = LEGACY_SLASH;
            },
            getParamIds : getParamIds,
            getOptionalParamsIds : getOptionalParamsIds,
            getParamValues : getParamValues,
            compilePattern : compilePattern,
            interpolate : interpolate
        };

    }());


    return crossroads;
};

if (typeof define === 'function' && define.amd) {
    define('crossroads',['signals'], factory);
} else if (typeof module !== 'undefined' && module.exports) { //Node
    module.exports = factory(require('signals'));
} else {
    /*jshint sub:true */
    window['crossroads'] = factory(window['signals']);
}

}());


/**
 * Helper to do Http requests
 * 
 * @param url
 */
define('build/Requests/Handlers/http',[], function() {
    window.HttpRequest = function (url, route) {

        /**
         * The url to do the request to
         * @type String
         */
        this.url = route.action ? route.action : url;

        /**
         * Default request
         * @type Object
         */
        this.settings = {
            'data': {},
            'dataType': 'json',
            'cache': false,
            'isFile': false
        };

        /**
         * Setter for data to requests
         * @param data
         */
        this.setData = function (data) {
            this.settings.data = data;
        };

        /**
         * Get request
         * @return Deferred
         */
        this.get = function () {
            if(arguments[0]) {
                this.setData(arguments[0]);
            }
            this.settings.type = 'GET';
            return this._doAjax();
        };

        /**
         * Post request
         * @param data
         * @return Deferred
         */
        this.post = function (data) {
            this.setData(data);
            this.settings.type = 'POST';
            return this._doAjax();
        };

        /**
         * Put request
         * @param data
         * @return Deferred
         */
        this.put = function (data) {
            this.setData(data);
            this.settings.data._method = 'PUT';
            return this.post();
        };

        /**
         * Actual executor
         * @return Deferred
         */
        this._doAjax = function () {
            return $.ajax(this.url, this.settings);
        }
    };
});
/**
 * REST router, will add rest routes to crossroads
 */
define('build/Requests/Routers/http',['build/Requests/Handlers/http'], function() {

    return {

        /**
         * Add a route
         * @param route
         */
        addRoute: function(route) {
            crossroads.addRoute(route.target).matched.add(function (url, setHandler) {
                setHandler(HttpRequest, route);
            });
        }
    };
});
/**
 * Routing factory, will put all routes in place and ables request object
 * to pass request to correct handler
 */
var routers = {
    'http': 'build/Requests/Routers/http'
};

define('build/Requests/route_factory',[
    'signals', 
    'crossroads',
    'build/Requests/Routers/http'
], function (signals, crossroads) {

    //Register as a global
    window.crossroads = crossroads;

    /**
     * Setup listening to the AujaStore to update routes in crossroads
     */
    flux.store('AujaStore').on('change', function () {
        crossroads.removeAllRoutes();

        this.getState().routes.map(function (route) {
            require(routers[route.type]).addRoute(route);
        }.bind(this));

        //Add fallback route to http router 
        require(routers['http']).addRoute({
            target: /(.*)/
        });
    });

    //Add fallback route to http router 
    //TODO use bypassed for this
    require(routers['http']).addRoute({
        target: /(.*)/
    });

    return new function () {
        /**
         * Getter for the handler
         * @param url
         * @return handler
         */
        this.handler = function (url) {
            var handler = false;
            var route = false;

            //Return same handler as last time when same url is requested
            //crossroads will not parse same route twice in a row
            if (this.last && this.last.url == url) {
                handler = this.last.handler;
                route = this.last.route;
            } else {
                //Parse the url to fetch the corresponding handler
                crossroads.parse(url, [url, function (h, r) {
                    handler = h;
                    route = r;
                }.bind(this)]);

                if (handler) {
                    this.last = {
                        url: url,
                        handler: handler,
                        route: route
                    }
                }
            }
            
            //Log an error
            if(!handler) {
                console.error('No corresponding handler found for: ' + url);
            }

            //Instantiate the collected handler otherwise return false
            return handler ? new handler(url, route) : false;
        }
    };
});
/**
 * Currently a helper function to do nice ajax requests however
 * the goal is to add routing, options for factories to generate responses etc.etc.
 * @param string url
 */
define('build/Requests/cache',[], function () {

    window.RequestCache = new function() {

        /**
         * All ongoing requests
         * @type {Array}
         * @private
         */
        this._ongoing = {};

        /**
         * Add url as
         * @param url       to where the request was
         * @param request   the request itself
         */
        this.add = function(url, request) {
            this._ongoing[url] = request;
            request.always(function() {
                delete this._ongoing[url];
            }.bind(this));
        };

        /**
         * Get ongoing request to an url
         * @param url
         * @return jQuery.Deferred|boolean
         */
        this.getOngoing = function(url) {
            return this._ongoing[url];
        }
        
    };
    
});
/**
 * Currently a helper function to do nice ajax requests however
 * the goal is to add routing, options for factories to generate responses etc.etc.
 * @param string url
 */
define('request',['build/Requests/route_factory', 'build/Requests/cache'], function (RouteFactory) {


    /**
     * Register as a global initializer for a request
     * @constructor
     */
    window.Request = function(url) {
        
        /**
         * Do a GET request
         * @return jQuery.Deferred
         */
        this.get = function () {
            var ongoing = RequestCache.getOngoing(url);
            if(ongoing) {
                return ongoing;
            }
            
            var request = RouteFactory.handler(url).get(arguments[0] ? arguments[0] : null);
            RequestCache.add(url, request);
            return request;
        };

        /**
         * Do a POST request
         * @return jQuery.Deferred
         */
        this.post = function(data) {
            return RouteFactory.handler(url).post(data);
        };

        /**
         * Do a PUT request
         * @return jQuery.Deferred
         */
        this.put = function(data) {
            return RouteFactory.handler(url).put(data);
        }

    }
    
});
/**
 * @jsx React.DOM
 */
//RequireJS config
require.config({

    /**
     * Use document base url
     */
    baseUrl: '',

    /**
     * When debug is true add a bust to prevent caching
     */
    urlArgs: (new Date()).getTime(), 

    /**
     * Location of dependencies
     */
    paths: {
        react: 'bower_components/react/react',
        jquery: 'bower_components/jquery/dist/jquery.min',
        fluxxor: 'bower_components/fluxxor/build/fluxxor',
        signals: 'bower_components/js-signals/dist/signals',
        crossroads: 'bower_components/crossroads.js/dist/crossroads',
        sugar: 'bower_components/sugar/release/sugar-full.min',
        trumbowyg: 'bower_components/trumbowyg/dist/trumbowyg.min',
        request: 'build/Requests/request',
        stores: 'build/Stores/flux'
    }
});

/**
 * Load initial dependencies:
 *
 * react - The ReactJS library from Facebook
 * jquery - Used as a toolkit to make life easier
 * fluxxor - To be able to implement the Flux architecture
 * sugar - A toolkit extending native objects
 */
require(['react', 'jquery', 'fluxxor', 'sugar'], function (react) {

    //Register as a global since we'll be using it everywhere
    window.React = react;

    //Register as global
    window.Fluxxor = require('fluxxor');

    //Setup data layer
    require(['build/Stores/flux'], function (flux) {
        
        //Register as global
        window.flux = flux;
        
        //Setup building block and its utilities
        require(['build/scaffolding.react', 'request'], function(Scaffolding) {
            
            //Bind resize
            $(window).bind('resize', flux.actions.resize);

            //Render the main structure
            React.renderComponent(Scaffolding({flux: flux}), document.body);
        });
    });

});

    
define("build/auja.react.js", function(){});

