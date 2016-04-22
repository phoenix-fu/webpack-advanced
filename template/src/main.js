import Vue from 'vue'
import Router from 'vue-router'
import Hello from './App'
import init from './init'
import common from 'web/common/common'
import homeRouter from 'routers/home'
// 加载css
import './assets/css/vue.css'
import './assets/css/skin/base.css'
import './assets/css/skin/element.css'

// install router
Vue.use(Router)
Vue.config.debug = true

init()

// routing
var router = new Router()

router.map({
    '/': homeRouter()
})

router.beforeEach(function () {
    document.appTitle = undefined
    window.scrollTo(0, 0)
})

router.afterEach(function (transition) {
    // console.log(document.appTitle)
    common.setDocTitle()
    // console.log('成功浏览到: ' + transition.to.path)
})

router.redirect({
  '*': '/'
})

var App = Vue.extend({})

router.start(App, '#app')

/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })
