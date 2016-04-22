<template>
    <span class="value \{{ starCss }}">
        <span @click="setStarCount(1)" class="fa fa-star"></span>
        <span @click="setStarCount(2)" class="fa fa-star"></span>
        <span @click="setStarCount(3)" class="fa fa-star"></span>
        <span @click="setStarCount(4)" class="fa fa-star"></span>
        <span @click="setStarCount(5)" class="fa fa-star"></span>
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
