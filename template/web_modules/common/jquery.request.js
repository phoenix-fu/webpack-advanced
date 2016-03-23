// extend jQuery
import common from 'web/common/common'
import appConfig from 'web/config'

$.extend({
    defaultOptions: {
        type: 'get',
        third: false
    },

    mainRequest: function (url, data, options) {
        if (options.type === 'post') {
            data = { data: data }
            data = JSON.stringify(data)
        }

        return $.ajax({
            type: options.type,
            url: url,
            data: data
            //contentType: 'application/json'
        })
    },

    request: function (url, data, options) {
        data = data === undefined ? null : data
        options = typeof options === 'object' ? $.extend({}, $.defaultOptions, options)
            : $.defaultOptions
        // url = options.isHostUrl === true ? common.addHost(url) : common.addPathName(url)
        url = appConfig.apiDomain + '/' + url

        var deferred = $.Deferred()

        $.when($.mainRequest(url, data, options), $.extendAssetPath()).done(function (result, assetResult) {
            result = result[0]
            result = options.third ? { data: result } : result
            assetResult = Array.isArray(assetResult) ? assetResult[0] : assetResult

            result = $.addFormRandom(result)

            appConfig.asset = assetResult.data
            var extendData = $.extend({}, result, {assets: appConfig.asset})

            if ((!$.requestOK(extendData) || options.type === 'get') && !options.third) {
                appConfig.checkVersion(extendData.global.version)
            }

            deferred.resolve(extendData)
        }).fail(function () {
            appConfig.ajaxCheckVersion()
            deferred.reject()
        })

        return deferred.promise()
    },

    requestOK: function (result) {
        if (result !== null && typeof result === 'object' &&
                result.status !== null && typeof result.status === 'object') {
            return result.status.code === 0
        }
        return true
    },

    getRequestStatus: function (result) {
        if (result !== null && typeof result === 'object') {
            return result.status
        }
        return {}
    },

    load: function (data) {
        return $.ajax({
            type: 'post',
            url: common.addPathName('api/v1/file/upload'),
            data: $.getFormData(data),
            cache: false,
            processData: false,
            contentType: false
        })
    },

    getFormData: function (data) {
        var formData = new FormData()
        for (key in data) {
            formData.append(key, data[key])
        }
        return formData
    },

    addFormRandom: function (result) {
        if (result.data != null && typeof result.data === 'object') {
            result.data.formRandom = common.getTimestamp()
        }
        return result
    },

    extendAssetPath: function () {
        // 资源改为从新前端工程拿，所以这里返回空对象
        return {data: {}}
        // if (appConfig.appType === appConfig.appTypeEnum.web && appConfig.asset.baseAssetPath === '') {
        //     return $.ajax({
        //         type: 'get',
        //         url: appConfig.apiDomain + '/api/v1/asset/get' // common.addPathName('api/v1/asset/get')
        //     })
        // } else {
        //     var deferred = $.Deferred()
        //     deferred.resolve({ data: appConfig.asset })
        //     return deferred.promise()
        // }
    },

    // 先做个封装，日后有什么扩展可以在这里写
    getRequest: function (url, data, options) {
        return $.request(url, data, options)
    },

    postRequest: function (url, data, options) {
        return $.request(url, data, $.extend({}, options, {type: 'post'}))
    },

    getThirdRequest: function (url, data, options) {
        return $.request(url, data, $.extend({}, options, {third: true}))
    },

    postThirdRequest: function (url, data, options) {
        return $.request(url, data, $.extend({}, options, {type: 'post', third: true}))
    }
})

define("$api", [], function() {
    return $;
});