import Vue from 'vue'
import Router from 'vue-router'
import Hello from './App'
import init from './init'
// 加载css
import './assets/css/vue.css'
import './assets/css/skin/default/base.css'
import './assets/css/skin/default/element.css'

// install router
Vue.use(Router)

init()

// routing
var router = new Router()

router.map({
    '/': {
        component: Hello // 只作演示用
    },
    '/home': {
        component: Vue.buildComponent('home-index', 'home/index')
    }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
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
