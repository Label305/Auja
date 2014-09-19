define([], function () {
    return {
        /**
         * Check if required keys are present
         * @param keys
         * @returns {boolean}
         */
        toHaveKeys: function (keys) {
            
            //Check missing keys
            for (var i in keys) {
                var flag = false;

                for (var key in this.actual) {
                    if (key == keys[i]) {
                        flag = true;
                    }
                }

                if (!flag) {
                    this.message = function() {
                        return 'Key missing: ' + key;  
                    };
                    return false;
                }
            }
            
            //Check not specified keys
            for (var key in this.actual) {
                var flag = false;

                for (var i in keys) {
                    if (key == keys[i]) {
                        flag = true;
                    }
                }

                if (!flag) {
                    this.message = function () {
                        return 'Key not defined in spec: ' + key;
                    };
                    return false;
                }
            }
            

            return true;
        },

        /**
         * Match if type is object
         */
        toBeAnObject: function() {
            return typeof this.actual == 'object';
        }
    }
});
