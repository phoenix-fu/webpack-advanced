<template>
    <span class="value \{{ starCss }}">
	    <span @click="setStarCount(1)" class="glyphicon glyphicon-star"></span>
	    <span @click="setStarCount(2)" class="glyphicon glyphicon-star"></span>
	    <span @click="setStarCount(3)" class="glyphicon glyphicon-star"></span>
	    <span @click="setStarCount(4)" class="glyphicon glyphicon-star"></span>
	    <span @click="setStarCount(5)" class="glyphicon glyphicon-star"></span>
    </span>
</template>

<script>
export default {
	props: {
        starCount: {
            type: Number,
            default: 1
        },

        isCanClick: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        starCss: function () {
            return 'star' + this.starCount
        }
    },

    methods: {
        setStarCount: function (count) {
            if (this.isCanClick) {
                this.starCount = count
            }
        }
    }
}
</script>
