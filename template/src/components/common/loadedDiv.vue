<template>
	<div v-if="!loadingRouteData" :transition="trans"><slot></slot></div>
    <loading :is-show="loadingRouteData"></loading>
    <pop-up-error :message.sync="popUpErrMsg"></pop-up-error>
</template>

<script>
export default {
	props: {
		loading: {
			type: Boolean,
			default: false
		},

		trans: {
			type: String,
			default: 'fade'
		}
	},

	data: function () {
		return {
			popUpErrMsg: ''
		}
	},

	computed: {
        loadingRouteData: function () {
            return typeof this.$parent.$loadingRouteData === 'boolean' ? this.$parent.$loadingRouteData : false
        }
    },

	ready: function () {
        this.$on('pop-up-error', this.showPopUpError)
    },

    methods: {
		showPopUpError: function (message) {
			this.popUpErrMsg = message
		}
	}
}
</script>
