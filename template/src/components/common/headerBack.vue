<template>
    <header transition="fade" transition-mode="out-in" class="headroom sl-header slideDown headroom--top" id="header" :style="header_style">
    	<div class="container">
    		<div class="row">
    			<div class="col-xs-1"><a @click="back" href="javascript:void(0);" class="button-back"><span class="fa fa-angle-left"></span></a></div>
    			<div class="col-xs-10"><h1>\{{title}}</h1></div>
    		</div>
    	</div>
    </header>
</template>

<script>
export default {
	props: {
        title: {
            type: String,
            default: ''
        },

        header_style: {
            type: String,
            default: ''
        }
    },

    data: function () {
        return {
            assets: {}
        }
    },

    ready: function () {
        $.startHeadRoom()
    },

    activate: function (done) {
        var self = this
        $.extendAssetPath().done(function (result) {
            self.assets = result.data
            done()
        })
    },

    methods: {
        back: function () {
            history.back()
        }
    }
}
</script>
