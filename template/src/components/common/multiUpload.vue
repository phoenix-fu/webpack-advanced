<template>
<div class="data-entry no-bg">
	<loaded-div>
		<div class="data-entry-form upload-data"><div class="container"><div class="row"><div class="content">
			<div class="data noadded">
				<div v-if="title != ''" class="title"><span class="text">\{{title}}</span><span class="line"></span></div>
				<div v-for="pic in uploadedPics" class="col-xs-6">
					<div class="con"><div class="img"><img :src="pic"></div><div class="close" @click="del(pic)"><span class="fa fa-times-circle"></span></div></div>
				</div>       
				<div v-show="multiple || uploadedPics.length == 0" class="col-xs-6">
					<div class="con">
						<a href="javascript:void(0);"><input id="uploadInput" @change="upload('uploadInput', $event)" v-file="file" type="file" tabindex="3" size="0" name="" class="filePrew"><span class="icon"><span class="fa fa-plus"></span></span><span class="text">添加照片</span></a>
						<div v-show="uploading" class="css-load-mask"></div>
						<div v-show="uploading" class="weui_loading_toast loading-no-font">
							<div class="weui_toast">  
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
				</div>   
			</div>
		</div></div></div></div>
	</loaded-div>
</div>
</template>

<script>
export default {
	mixins: [mixin.fileValidation],
    props: {
        uploadedPics: {
            type: Array,
            default: []
        },

        multiple: {
            type: Boolean,
            default: true
        }
    },

    data: function () {
        return {
            title: '',
            file: '',
            uploading: false
        }
    },

    methods: {
        upload: function (uploadInput, event) {
            if (event.target.value == '') {
                return
            }

            if (!this.validateFile(uploadInput)) {
                this.$broadcast('pop-up-error', this.getFileErrMsg(uploadInput))
                return
            }

            var uploadFile = $('#' + uploadInput)[0].files[0]
            var uploadFileData = { file: uploadFile }
            var self = this
            this.uploading = true

            this.handleRequest($.load(uploadFileData)).done(function (result) {
                self.uploadedPics.push(result.data.url)
            }).always(function () {
                self.file = ''
                self.uploading = false
            })
        },

        del: function (pic) {
            for (var i = 0; i < this.uploadedPics.length; i++) {
                if (this.uploadedPics[i] == pic) {
                    this.uploadedPics.splice(i, 1)
                    break
                }
            }
        }
    }
}
</script>
