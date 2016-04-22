<template>
    <div>
    	<modal-div :show="show" :auto-height="autoHeight" :show-close-btn="showCloseBtn" content-height="100" :show-modal="showModal">
    		<div class="modal-header">
    			<button @click="show = false" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
    			<h4 class="modal-title" id="gridSystemModalLabel">选择城市</h4>
    		</div>
    		<div class="modal-body modal-skin">
    			<div class="container-fluid">
    				<div class="select-address">
    					<div class="form-group">
    						<div class="col-xs-12">
    							<region :selected-province.sync="province" :selected-city.sync="city" :show-items="showItems" default-province-name="全部"></region>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    		<div class="modal-footer">
    			<button @click="show = false" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
    			<button @click="ok" v-disabled="!isSelected" :class="[isSelected ? 'btn-primary' : 'btn-default']" type="button" class="btn">确定</button>
    		</div>
    	</modal-div>
    </div>
</template>

<script>
export default {
	props: {
        show: {
            type: Boolean,
            default: false
        },

        province: {
            type: String,
            default: ''
        },

        city: {
            type: String,
            default: ''
        }
    },

    data: function () {
        return {
            autoHeight: false,
            showCloseBtn: false,
            showModal: true,
            showItems: ['provinces', 'citys']
        }
    },

    computed: {
        isSelected: function () {
            return (this.province == '' && this.city == '') || this.city != ''
        }
    },

    methods: {
        ok: function () {
            this.$emit('ok-click')
            this.show = false
        }
    }
}
</script>
