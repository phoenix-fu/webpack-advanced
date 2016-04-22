// extend jQuery
import common from 'web/common/common'
import appConfig from 'web/config'
import {Base64} from 'js-base64'

$.extend({
    defaultOptions: {
        type: 'get',
        third: false
    },

    autoLogining: false,

    mainRequest: function (url, data, options) {
        if (options.type === 'post') {
            data = { data: data }
            data = JSON.stringify(data)
        }

        return $.ajax({
            type: options.type,
            url: url,
            data: data,
            contentType: 'application/json',
            dataType: 'json'
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
                // appConfig.checkVersion(extendData.global.version)
            }

            $.setCsrf(extendData)

            deferred.resolve(extendData)
        }).fail(function (result) {
            if ($.autoLogining) {
                return
            }

            console.log(result)
            if ($.autoLogin(result)) {
                return
            }
            // appConfig.ajaxCheckVersion()
            deferred.reject(result.responseJSON.status)
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

    load: function (data, { filename } = {}) {
        return $.ajax({
            type: 'post',
            url: common.addPathName('api/v1/file/upload'),
            data: $.getFormData(data, filename),
            cache: false,
            processData: false,
            contentType: false
        })
    },

    getFormData: function (data, filename) {
        var formData = new FormData()
        for (var key in data) {
            if (typeof filename === 'string') {
                formData.append(key, data[key], filename)
            } else {
                formData.append(key, data[key])
            }
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
    },

    autoLogin (result) {
        if (result.status === 403) {
            $.autoLogining = true
            console.log(window.location.href)
            let encodeUrl = Base64.encode(window.location.href)
            let scope = window.location.hash.indexOf('scope=1') >= 0
            if (scope) {
                window.location.href = `/site?url=${encodeUrl}&scope=1`
            } else {
                window.location.href = `/site?url=${encodeUrl}`
            }

            return true
        }
        return false
    },

    setCsrf (result) {
        if(result !== undefined && result.global !== undefined &&
                result.global.csrfParam !== undefined && result.global.csrfToken !== undefined) {
            $('meta[name=csrf-param]').attr('content', result.global.csrfParam)
            $('meta[name=csrf-token]').attr('content', result.global.csrfToken)
        }
    }
})

define("$api", [], function() {
    return $;
});
