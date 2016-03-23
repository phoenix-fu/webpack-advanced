import config from 'web/config'

export default {
    order (itemId, code, fee) {
        var data = {
            itemId: itemId,
            code: code,
            fee: fee
        }
        return $.mainRequest(config.apiDomain + "/payment/api/order", data,
            { type: "post", isHostUrl: true  })
    },

    refund (itemId, code) {
        var data = {
            itemId: itemId,
            code: code
        }
        return $.mainRequest(config.apiDomain + "/payment/api/refund", data,
            { type: "post", isHostUrl: true })
    }
}
