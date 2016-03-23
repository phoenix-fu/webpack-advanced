export default {
    install (Vue, options) {
        Vue.buildComponent = function (name, path) {
            return Vue.component(name, function (resolve) {
                require(['components/' + path], resolve)
            })
        }
    }
}
