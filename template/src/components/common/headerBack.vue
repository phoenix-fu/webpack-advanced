<template>
    <header transition="fade" transition-mode="out-in" class="headroom sl-header slideDown headroom--top" id="header">
    	<div class="container">
    		<div class="row">
    			<div class="col-xs-1"><a @click="back" href="javascript:void(0);" class="button-back"><span class="fa fa-angle-left"></span></a></div>
    			<div class="col-xs-10"><h1>\{{title}}</h1></div>
    		</div>
    	</div>
    </header>
</template>

<script>
import 'web/lib/jquery.headroom'
import config from 'web/config'

export default {
	props: {
        title: {
            type: String,
            default: config.title
        },

        backRoute: {
            type: Object,
            default () {
                return null
            }
        }
    },

    ready: function () {
        $.startHeadRoom()
    },

    methods: {
        back: function () {
            if (this.backRoute === null) {
                history.back()
            } else {
                this.go(this.backRoute)
            }
        }
    }
}
</script>
