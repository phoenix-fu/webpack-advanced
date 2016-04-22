<template>
	<div>
		<loaded-div>
			<style>body{background-color:#f2626e;}</style>
			<div class="wapper">
				<div class="index-bg"><img :src="img.indexBg" /></div>
				<div class="index-shop">
				    <div class="content">
					    <div class="hd">
					        <div class="logo"><img :src="img.logo" alt="OK药店" /></div>
					    </div>
					    <div class="bd">
					        <div class="btn-qrcode">
						        <div @click="scan" class="con">
							        <div class="circular radius1"></div>
							        <div class="circular radius2"></div>
							        <div class="circular radius3"></div>
							        <div class="circular radius4"></div>
							        <div class="circular radius5"><img :src="img.indexBtinQrcode" /></div>
							        <div class="box"><div class="line animated fadeOut time"><img :src="img.qrcodeLine" class="animated slideOutDown time" /></div></div>
							    </div>
					        </div>
					        <dl>
						        <dt>点击扫一扫</dt>
						        <dd>点击扫一扫按钮，对着药品的二维码进行扫描即可查看详细信息</dd>
					        </dl>
					    </div>
				    </div>
				</div>
			</div>
		</loaded-div>
	</div>
</template>

<script>
import indexBg from 'img/index-bg.jpg'
import logo from 'img/logo.png'
import indexBtinQrcode from 'img/index-btin-qrcode.png'
import qrcodeLine from 'img/qrcode-line.png'

export default {
	mixins: [mixin.apiData],

	data () {
		return {
			img: {
				indexBg: indexBg,
				logo: logo,
				indexBtinQrcode: indexBtinQrcode,
				qrcodeLine: qrcodeLine
			}
		}
	},

    methods: {
        scan: function () {
            console.log('scan...')
            console.log(okPic1)
            var self = this
            // wxApi.scanQRCode(wxApi.scanHandle.wx).done(function(result){
                // alert(result)
            // })
        }
    },

	route: {
		data: function (transition) {
            // wxApi.config()

            var self = this
            // wxApi.ready(function () {
            //     self.scan()
            // })
            // transition.next({})
            // console.log($r)
            // 由于获取图片已改成import方式，此处只作模拟拿数据
			// this.handleRequest($api.getRequest(apis.asset.get)).done(function (result) {
   //              transition.next(result)
   //          })
            transition.next(result)
		}
	}
}
</script>