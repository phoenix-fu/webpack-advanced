<template>
    <div>
        <div class="goods-tabs">
            <ul class="nav nav-tabs nav-justified">
                <li v-for="id in ids" :class="{'active': $index == selectedTab}"><a @click="selectedTab = $index" href="javascript:void(0)"><span>\{{names[$index]}}</span></a></li>
            </ul>
        </div>
        <div class="tab-content">
            <div v-for="id in ids" v-show="selectedTab == $index" :transition="selectedTab == $index ? 'fade' : ''"><slot :name="id"></slot></div>
        </div>
    </div>
</template>

<script>
export default {
	props: {
        ids: {
            type: Array,
            default: ['tab1', 'tab2', 'tab3']
        },

        names: {
            type: Array,
            default: ['标签页一', '标签页二', '标签页三']
        },

        selectedTab: {
            type: Number,
            default: 0
        }
    }
}
</script>
