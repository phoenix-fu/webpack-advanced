<template>
    <div v-if="!loadingRouteData" :transition="trans"><slot></slot></div>
    <loading :is-show="loadingRouteData || isLoading"></loading>
    <pop-up-error :message.sync="popUpErrMsg"></pop-up-error>
</template>

<script>
export default {
    props: {
        trans: {
            type: String,
            default: 'fade'
        }
    },

    data: function () {
        return {
            popUpErrMsg: '',
            isLoading: false
        }
    },

    computed: {
        loadingRouteData: function () {
            return typeof this.$parent.$loadingRouteData === 'boolean' ? this.$parent.$loadingRouteData : false
        }
    },

    ready: function () {
        this.$on('pop-up-error', this.showPopUpError)
        this.$on('show-loading', this.showLoading)
    },

    methods: {
        showPopUpError: function (message) {
            this.popUpErrMsg = message
        },

        showLoading (isLoading, message) {
            // console.log('loading...')
            // this.isLoading = isLoading
            this.$broadcast('show-loading', isLoading, message)
        }
    }
}
</script>
