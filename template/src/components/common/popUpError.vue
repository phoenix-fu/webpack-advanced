<template>
	<div v-show="show" @click="hide" :transition="trans" class="has-error-tips-box">
    	<div class="has-error-tips-con">\{{message}}</div>
    </div>
</template>

<script>
export default {
	props: {
        message: {
            type: String,
            default: ''
        },

        hideTime: {
            type: Number,
            default: 3000
        },

        trans: {
            type: String,
            default: 'bounce'
        }
    },

    data: function () {
        return {
            tHash: ''
        }
    },

    computed: {
        show: function () {
            clearTimeout(this.tHash)

            var self = this
            if (this.message != '') {
                this.tHash = setTimeout(function () {
                    self.message = ''
                }, this.hideTime)
            }
            return this.message != ''
        }
    },

    methods: {
        hide: function () {
            clearTimeout(this.tHash)
            this.message = ''
        }
    }
}
</script>
