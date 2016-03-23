<template>
    <div v-show="show" class="modal-mask" :transition="trans">
    	<div class="modal fade in" role="dialog" aria-labelledby="gridSystemModalLabel" style="top: 5%;display: block;">
    		<div class="modal-dialog modal-sm" role="document">
    			<div class="modal-container modal-content modal-skin">
    				<div v-if="showCloseBtn" class="modal-close"><span @click="show = false" class="fa fa-times-circle"></span></div>
					<div :style="{height: contentHeight + \'px\'}" style="overflow-y: auto">
    					<slot></slot>
    				</div>
    			</div>
    		</div>
    	</div>
    	<div v-if="showModal" class="modal-backdrop fade in"></div>
    </div>
</template>

<script>
export default {
	props: {
        show: {
            type: Boolean,
            default: false
        },

        trans: {
            type: String,
            default: 'modal'
        },

        contentHeight: {
            type: Number,
            default: 300
        },

        autoHeight: {
            type: Boolean,
            default: true
        },

        showCloseBtn: {
            type: Boolean,
            default: true
        },

        showModal: {
            type: Boolean,
            default: false
        }
    },

    ready: function () {
        // this.contentHeight = window.screen.height * 75 / 100
        if (this.autoHeight) {
            this.contentHeight = window.innerHeight * 80 / 100
        }
    }
}
</script>