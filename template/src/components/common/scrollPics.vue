<template>
    <div class="banner">
    	<div class="carousel slide" data-ride="carousel">
    		<ol class="carousel-indicators">
    			<li v-for="pic in pics" :class="{\'active\': $index == 0}" :data-slide-to="$index" data-target="#carousel-example-generic"></li>
    		</ol>
    		<div class="carousel-inner" role="listbox">
    			<div v-for="pic in pics" :class="{\'active\': $index == 0}" class="item">
    				<div class="con">
    					<div class="bd"><img :src="pic" alt="yao2o"></div>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
</template>

<script>
export default {
	props: {
        pics: {
            type: Array,
            default: ['/assets/817e6006/img/index-btin-qrcode.png', '/assets/817e6006/img/error-icon.png']
        }
    },

    ready: function () {
        $.startScrollPicsTouch()
    }
}
</script>
