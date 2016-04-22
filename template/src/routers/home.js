import Vue from 'vue'
import Hello from '../App'

export default () => {
    return {
        component: Vue.buildComponent('layout-default', 'layout/default'),
        subRoutes: {
            '/': {
                component: Hello // 只作演示用
            },
            '/home': {
                component: Vue.buildComponent('home-index', 'home/index')
            }
        }
    }
}

