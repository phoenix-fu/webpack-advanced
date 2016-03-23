import Vue from 'vue'
import VueBuilder from 'web/vue-diy/vue-build'
import addFilters from 'web/vue-diy/vue-filters'
import addDirectives from 'web/vue-diy/vue-directive'
import addMixins from 'web/vue-diy/vue-mixin'
import addPrototypes from 'web/common/prototype'
import commonCompManager from 'components/common/manager'

export default function () {
    Vue.use(VueBuilder)

    // 加载自定义过滤器
    addFilters()

    // 加载自定义混合
    addMixins()

    // 加载自定义指令
    addDirectives()

    // 加载自定义prototype
    addPrototypes()

    // 公共组件注册
    commonCompManager.register()
}
