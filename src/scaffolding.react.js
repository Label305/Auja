/**
 * @jsx React.DOM
 */
define([
    'build/Stores/auja',
    'build/Components/Scaffolding/message.react',
    'build/Components/Scaffolding/authentication.react',
    'build/Components/Scaffolding/header.react',
    'build/Components/Scaffolding/body.react'
], function (Store, Message, Authentication, Header, Body) {

    var Style = React.createClass({
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
                result += this.entry('.active.auja-active-border-' + name, 'border-color', colors[name]);

                //Dependency specific CSS
                switch(name) {
                    case 'main':
                        result += this.entry('.trumbowyg-modal-submit', 'background-color', colors[name]);
                        result += this.entry('.trumbowyg-fullscreen .trumbowyg-fullscreen-button', 'background-color', colors[name]);
                        result += this.entry('input:focus', 'border-color', colors[name]);
                        result += this.entry('select:focus', 'border-color', colors[name]);
                        break;
                }
            }

            return result;
        },
        render: function () {
            var style = this.parse(this.props.auja.colors);
            
            //Force the main auja color to be put into triangle on top
            style += this.entry('ul#main-menu li:after', 'border-color', 'transparent ' + this.props.auja.colors.main + ' transparent transparent');

            return (
                <style>
                    {style}
                </style>
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
                <div id="auja">
                    <Message flux={this.props.flux} />
                    <Authentication auja={this.state} />
                    <Header auja={this.state} />
                    <Body flux={this.props.flux} auja={this.state} />
                    <Style auja={this.state} />
                </div>
                );
        }
    });

});