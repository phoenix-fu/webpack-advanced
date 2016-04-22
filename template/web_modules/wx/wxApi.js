import wx from 'weixin-js-sdk'
import payService from 'web/wx/payService'
import wxService from 'web/wx/wxService'

export default {
    config: function(){
        wxService.getWxCfg().done(function(configObj){
            var myConfig = $.extend({}, configObj.data);
            wx.config(myConfig);
            wx.error(function(res){
                console.error(res);
            });
        }).fail(function(){
            console.info('get config error');
        });
    },

    ready: function(callback){
        wx.ready(callback);
    },

    checkJsApi: function(apis){
        if(typeof apis === 'string'){
            apis = [apis];
        }

        var deferred = $.Deferred();

        wx.checkJsApi({
            jsApiList: apis,
            success: function(res){
                deferred.resolve(res);
            },
            fail: function(){
                deferred.reject();
            }
        });

        return deferred.promise();
    },

    shareTimeline: function(title, link, imgUrl){
        var deferred = $.Deferred();
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {

                console.info('success');
                deferred.resolve();
            },
            fail:function() {

                console.info('fail');

            },
            cancel: function () {
                deferred.reject();
            },

            complete: function(res) {

               console.info(res);
            }



        });

        return deferred.promise();
    },

    shareAppMessage: function(title, desc, link, imgUrl, type, dataUrl){
        type = type == undefined ? '' : type;
        dataUrl = dataUrl == undefined ? '' : dataUrl;

        var deferred = $.Deferred();

        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: type, // 分享类型,music、video或link，不填默认为link
            dataUrl: dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                deferred.resolve();
            },
            fail: function() {
                deferred.reject();
            },

            cancel: function () {
                deferred.reject();
            }
        });

        return deferred.promise();
    },



    wxPay: function(config) {
        var deferred = $.Deferred();
        var options = {
            timestamp: config.timeStamp,
            nonceStr: config.nonceStr,
            package: config.package,
            signType: config.signType,
            paySign: config.paySign
        };
        wx.chooseWXPay($.extend({}, {
            success: function (res) {
                deferred.resolve(res);
            },
            fail: function () {
                deferred.reject();
            },
            cancel: function () {
                deferred.reject();
            },

            complete: function(res) {
                console.info('complete');
                console.info(res);
            }
        }, options));

        return deferred.promise();
    },

    scanQRCode: function(needResult, scanType) {

        var needResult = arguments[0] ? arguments[0] : 1;
        var scanType = arguments[1] ? arguments[1] : ["qrCode",]
        var deferred = $.Deferred();
        wx.scanQRCode({
            needResult: needResult,
            scanType: scanType,
            success: function (res) {
                deferred.resolve(res);
            },
            fail: function () {
                deferred.reject();
            },
            cancel: function () {
                deferred.reject();
            },
            complete: function(res) {
                console.info('complete');
                console.info(res);
            }
        });

        return deferred.promise();
    }
}
