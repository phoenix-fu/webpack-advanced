import Vue from 'vue'

export default function () {
    Vue.mixin({
        data () {
            return {
                docTitle: ''
            }
        },

        methods: {

            handleRequest: function (deferred) {
                var self = this
                return deferred.then(function (...resultArray) {
                    // var resultArray = [result, result2, result3]
                    for (var key in resultArray) {
                        var itemResult = resultArray[key]
                        if (itemResult !== undefined && !$.requestOK(itemResult)) {
                            // self.$broadcast('pop-up-error', $.getRequestStatus(itemResult).message);
                            return $.Deferred().reject($.getRequestStatus(itemResult))
                        }
                    }
                    return $.when(...resultArray)
                }).fail(function (status) {
                    self.$loadingRouteData = false
                    self.$broadcast('pop-up-error', status.message)
                }).always(() => {
                    this.$broadcast('show-loading', false)
                })
            },

            request (apis, { loadingText } = {}) {
                if (typeof apis === 'object' && apis !== null && !Array.isArray(apis)) {
                    apis = [apis]
                }

                this.$broadcast('show-loading', true, loadingText)
                let requestApis = []
                for (let api of apis) {
                    // console.log(api)
                    let requestApi = $api.getRequest(api.api, api.params, api.config)
                    requestApis.push(requestApi)
                }
                return this.handleRequest($.when(...requestApis))
            },

            handlePromise (deferred, { loadingText } = {}) {
                this.$broadcast('show-loading', true, loadingText)
                return this.handleRequest(deferred)
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
