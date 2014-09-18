define([], function () {
    return {
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
        }
    }
});
