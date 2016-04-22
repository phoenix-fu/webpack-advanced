import Vue from 'vue'
import common from 'web/common/common'

export default function () {
    Vue.filter('toTime', {

        read: function (val, type) {
            type = type === undefined ? common.timeFormatType.standard : type
            var timeArray = common.getTimeArray(val)
            return timeArray[0] + type[0] + timeArray[1] + type[1] + timeArray[2] + type[2] +
                timeArray[3] + type[3] + timeArray[4] + type[4] + timeArray[5] + type[5]
        },

        write: function (val, oldVal) {
            return (new Date(val)).getTime() / 1000
        }

    })

    Vue.filter('toDate', {

        read: function (val, type) {
            type = type === undefined ? common.timeFormatType.standard : type
            var timeArray = common.getTimeArray(val)
            return (timeArray[0] + type[0] + timeArray[1] + type[1] + timeArray[2] + type[2]).trim()
        },

        write: function (val, oldVal) {
            return (new Date(val)).getTime() / 1000
        }

    })

    Vue.filter('toShortTime', {

        read: function (val, type) {
            type = type === undefined ? common.timeFormatType.standard : type
            var timeArray = common.getTimeArray(val)
            return timeArray[3] + type[3] + timeArray[4]
        },

        write: function (val, oldVal) {
            return (new Date(val)).getTime() / 1000
        }

    })

    Vue.filter('toMoney', function (val) {
        return common.formatIntMoney(val)
    })

    Vue.filter('toDateStandard', {

        read: function (val) {
            var date = new Date(parseInt(val) * 1000)
            Y = date.getFullYear() + '-'
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
            D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
            return Y + M + D
        },

        write: function (val, oldVal) {
            return (new Date(val)).getTime() / 1000
        }

    })

    Vue.filter('toDateShort', {

        read: function (val) {
            var date = new Date(parseInt(val) * 1000)
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
            D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + '日'
            return M + D
        },

        write: function (val, oldVal) {
            return (new Date(val)).getTime() / 1000
        }

    })

    Vue.filter('fromNow', function (value){
        return common.fromNow(value)
    })
}
