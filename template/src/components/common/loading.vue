<template>
	<div v-show="isShow" :transition="trans" :transition-mode="transMode" :class="isNoMsgCss" class="weui_loading_toast">
		<div class="weui_toast">
			<div class="weui_loading">
				<div class="weui_loading_leaf weui_loading_leaf_0"></div>
				<div class="weui_loading_leaf weui_loading_leaf_1"></div>
				<div class="weui_loading_leaf weui_loading_leaf_2"></div>
				<div class="weui_loading_leaf weui_loading_leaf_3"></div>
				<div class="weui_loading_leaf weui_loading_leaf_4"></div>
				<div class="weui_loading_leaf weui_loading_leaf_5"></div>
				<div class="weui_loading_leaf weui_loading_leaf_6"></div>
				<div class="weui_loading_leaf weui_loading_leaf_7"></div>
				<div class="weui_loading_leaf weui_loading_leaf_8"></div>
				<div class="weui_loading_leaf weui_loading_leaf_9"></div>
				<div class="weui_loading_leaf weui_loading_leaf_10"></div>
				<div class="weui_loading_leaf weui_loading_leaf_11"></div>
			</div>
			<p v-if="isShowMsg" class="weui_toast_content">\{{message}}</p>
		</div>
	</div>
</template>

<script>
export default {
	props: {
        isShow: {
            type: Boolean,
            default: false
        },

        message: {
            type: String,
            default: '加载中...'
        },

        trans: {
            type: String,
            default: 'fade'
        }
    },

    computed: {
        isShowMsg: function () {
            return this.message != ''
        },

        isNoMsgCss: function () {
            return {
                'loading-no-font': !this.isShowMsg
            }
        }
    },

    created: function () {
        this.$on('show-loading', this.show)
    },

    methods: {
        show: function (isShow, message) {
            this.isShow = isShow
            this.message = typeof message === 'string' ? message : this.message
        }
    }
}
</script>
