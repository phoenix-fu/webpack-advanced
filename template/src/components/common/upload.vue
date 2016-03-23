<template>
    <div class="id-file clearfix" style="text-align: center">
    	<div class="con" style="position: relative;width: 200px;height: 102px;display: table;margin: 0 auto;border-radius: 5px">
    		<div class="img"><img :src="showPic" style="width: 200px; height: 121px"></div>
			<div v-show="uploading" class="css-load-mask" style="background-color: rgba(0,0,0,.7);position: absolute;border-radius: 5px"></div>
    		<div v-show="uploading" class="weui_loading_toast loading-no-font">
    			<div class="weui_toast" style="position: absolute;top: 50%;left: 50%;margin-top: -1.8em;background: none;">  
    				<div class="weui_loading">  
					    <div class="weui_loading_leaf weui_loading_leaf_0"></div>  
					    <div class="weui_loading_leaf weui_loading_leaf_1"></div>  
					    <div class="weui_loading_leaf weui_loading_leaf_2"></div>  
					    <div class="weui_loading_leaf weui_loading_leaf_3"></div>  
					    <div class="weui_loading_leaf weui_loading_leaf_4"></div>  
					    <div class="weui_loading_leaf weui_loading_leaf_5"></div>  
					    <div class="weui_loading_leaf weui_loading_leaf_6"></div>  
					    <div class="weui_loading_leaf weui_loading_leaf_7"></div>  
					    <div class="weui_loading_leaf weui_loading_leaf_8"></div>  
					    <div class="weui_loading_leaf weui_loading_leaf_9"></div>  
					    <div class="weui_loading_leaf weui_loading_leaf_10"></div>  
					    <div class="weui_loading_leaf weui_loading_leaf_11"></div>  
    				</div>  
    			</div>  
    		</div>  
    	</div>
    	<div class="button" style="margin-top: 15px">
    		<div class="con">
    			<a v-disabled="uploading" href="javascript:void(0);" class="file_btn btn btn-warning-border">
    				<input :id="id" @change="upload(id, $event)" v-file="file" v-disabled="uploading" type="file" tabindex="3" size="0" name="" class="filePrew">\{{content}}
    			</a>
    		</div>
    	</div>
    </div>
</template>

<script>
export default {
	mixins: [mixin.fileValidation],
    props: {
        id: {
            type: String,
            default: 'uploadInput'
        },

        pic: {
            type: String,
            default: ''
        },

        defaultPic: {
            type: String,
            default: ''
        },

        assets: {
            type: Object,
            default: null
        },

        content: {
            type: String,
            default: '上传图片'
        }
    },

    data: function () {
        return {
            file: '',
            uploading: false
        }
    },

    computed: {
        showPic: function () {
            if (this.pic != '') {
                return this.pic
            } else if (this.defaultPic != '') {
                return this.defaultPic
            } else if (this.assets != null && this.assets.assetPath != undefined) {
                return this.assets.assetPath + '/img/id-front.png'
            }
            return ''
        }
    },

    methods: {
        upload: function (uploadInput, event) {
            if (event.target.value == '') {
                return
            }

            if (!this.validateFile(uploadInput)) {
                // this.$broadcast('pop-up-error', this.getFileErrMsg(uploadInput))
                this.$emit('vld-fail', this.getFileErrMsg(uploadInput))
                return
            }

            var uploadFile = $('#' + uploadInput)[0].files[0]
            var uploadFileData = { file: uploadFile }
            var self = this
            this.uploading = true

            this.handleRequest($.load(uploadFileData)).done(function (result) {
                self.pic = result.data.url
            }).fail(function () {
                self.file = ''
            }).always(function () {
                self.uploading = false
            })
        }
    }
}
</script>
