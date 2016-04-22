import config from 'web/config'

export default {
    getWxCfg () {
        var data = {
            'url': window.location.href.replace(window.location.hash, '')
        }
        return $api.mainRequest(config.apiDomain + "/wechat/api/config", data,
            { isHostUrl: true  })
    }
}
