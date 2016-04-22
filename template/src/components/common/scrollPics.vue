<template>
    <div class="banner">
        <div class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li v-for="pic in pics" :class="{'active': $index == 0}" :data-slide-to="$index" data-target="#carousel-example-generic"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
                <div v-for="pic in pics" :class="{'active': $index == 0}" class="item">
                    <div class="con">
                        <div class="bd"><img :src="pic" alt="yao2o"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ext from 'web/common/jquery.ext'
import iconManSmall from 'img/icon-man-small.png'
import iconWomanSmall from 'img/icon-woman-small.png'

export default {
    props: {
        pics: {
            type: Array,
            default () {
                return [iconManSmall, iconWomanSmall]
            }
        }
    },

    ready: function () {
        $ext.startScrollPicsTouch()
    }
}
</script>
