<template>
    <div class="modal-mask" v-show="show" transition="modal">
    	<div class="modal fade in" role="dialog" aria-labelledby="gridSystemModalLabel" style="top: 25%;display: block; padding-right: 17px;">
    		<div class="modal-dialog modal-sm" role="document">
    			<div class="modal-container modal-content modal-skin">
    				<div class="modal-header">
    					<button @click="close" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
    					<h4 class="modal-title" >\{{ title }}</h4>
    				</div>
    				<div class="modal-body modal-skin">
    					<div class="container-fluid">
    						<div class="text">\{{ content }}</div>
    					</div>
    				</div>
    				<div class="modal-footer">
    					<button @click="close" type="button" class="btn btn-default" data-dismiss="modal">\{{ cancelWord }}</button>
    					<button @click="ok" type="button" class="btn btn-primary">\{{ okWord }}</button>
    				</div>
    			</div>
    		</div>
    	</div>
    	<div class="modal-backdrop fade in"></div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },

        title: {
            type: String,
            default: '提示'
        },

        content: {
            type: String,
            default: ''
        },

        okWord: {
            type: String,
            default: '确定'
        },

        cancelWord: {
            type: String,
            default: '返回'
        }
    },
    methods: {
        ok: function () {
            this.show = false
            this.$emit('ok-click')
        },

        close: function () {
            this.show = false
            this.$emit('fail-click')
        }
    }
}
</script>
