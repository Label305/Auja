define([], function () {
    return {
        /**
         * Check if required keys are present
         * @param keys
         * @returns {boolean}
         */
        toHaveKeys: function (keys) {
            for (var i in keys) {
                var flag = false;

                for (var key in this.actual) {
                    if (key == keys[i]) {
                        flag = true;
                    }
                }

                if (!flag) {
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
