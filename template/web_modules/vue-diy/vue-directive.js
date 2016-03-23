import Vue from 'vue'

export default function () {
    Vue.directive('disabled', function (value) {
        if (value) {
            this.el.setAttribute('disabled', 'disabled')
        } else {
            this.el.removeAttribute('disabled')
        }
    })

    Vue.directive('file', {
        twoWay: true,

        update: function (value) {
            if (value === '') {
                this.el.value = value
            }
        },

        bind: function () {
            this.handler = function () {
                // 将数据写回 vm
                // 如果指令这样绑定 v-example="a.b.c"
                // 它将用给定值设置 `vm.a.b.c`
                this.set(this.el.value)
            }.bind(this)
            this.el.addEventListener('change', this.handler)
        },

        unbind: function () {
            this.el.removeEventListener('change', this.handler)
        }

    })
}
