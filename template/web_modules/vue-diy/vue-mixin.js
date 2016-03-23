import Vue from 'vue'

export default function () {
    Vue.mixin({
        methods: {

            handleRequest: function (deferred) {
                var self = this
                return deferred.then(function (result, result2, result3) {
                    var resultArray = [result, result2, result3]
                    for (var key in resultArray) {
                        var itemResult = resultArray[key]
                        if (itemResult !== undefined && !$.requestOK(itemResult)) {
                            // self.$broadcast('pop-up-error', $.getRequestStatus(itemResult).message);
                            return $.Deferred().reject($.getRequestStatus(itemResult).message)
                        }
                    }
                    return $.when(result, result2, result3)
                }).fail(function (message) {
                    self.$loadingRouteData = false
                    self.$broadcast('pop-up-error', typeof message !== 'string' ? '系统开小差，请稍后再试' : message)
                })
            },

            go: function (param) {
                if (typeof param === 'string') {
                    this.$route.router.go({name: param})
                } else {
                    this.$route.router.go(param)
                }
            }

        }
    })
}
