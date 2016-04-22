import Vue from 'vue'

export default {
    register: function () {
        Vue.buildComponent('loaded-div', 'common/loadedDiv')
        Vue.buildComponent('loading', 'common/loading')
        Vue.buildComponent('pop-up-error', 'common/popUpError')
        Vue.buildComponent('bs-date', 'common/bsDate')
        Vue.buildComponent('confirm', 'common/confirm')
        Vue.buildComponent('h5-date', 'common/h5Date')
        Vue.buildComponent('header-back', 'common/headerBack')
        Vue.buildComponent('modal-div', 'common/modalDiv')
        Vue.buildComponent('modal-select-city', 'common/modalSelectCity')
        Vue.buildComponent('multi-upload', 'common/multiUpload')
        Vue.buildComponent('no-data', 'common/noData')
        Vue.buildComponent('scroll-pics', 'common/scrollPics')
        Vue.buildComponent('region', 'common/region')
        Vue.buildComponent('star', 'common/star')
        Vue.buildComponent('tabs', 'common/tabs')
        Vue.buildComponent('upload', 'common/upload')
        Vue.buildComponent('alert', 'common/alert')
    }
}
