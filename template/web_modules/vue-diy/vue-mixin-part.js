var mixin = {
    apiData: {
        data: function () {
            return {
                data: {},
                debug: [],
                global: {},
                session: {},
                status: {},
                assets: {}
            }
        }
    },

    apiFormData: {
        data: function () {
            return $.extend({}, mixin.apiData.data(), {
                data: {
                    formRandom: common.getTimestamp()
                }
            })
        }
    },

    timeFormat: {
        data: function () {
            return {
                chineseTimeFormat: common.timeFormatType.chinese
            }
        }
    },

    scrollLoad: {
        ready: function () {
            var self = this
            scrollLoad.init(function () {
                if (self.$children !== null) {
                    self.$broadcast('scroll')
                }
            })
        }
    },

    fileValidation: {
        data: function () {
            return {
                filesAttrName: {}
            }
        },

        methods: {

            validateFile: function (attrName, options) {
                this.filesAttrName[attrName] = attrName
                if (this[attrName] === '') {
                    return true
                }
                return common.validateFile(attrName, options) === true
            },

            getFileErrMsg: function (attrName, options) {
                if (this[attrName] === '') {
                    return ''
                }
                var result = common.validateFile(attrName, options)
                return result === true ? '' : result
            },

            pauseValidateFile: function () {
                for (key in this.filesAttrName) {
                    this[key] = ''
                }
            }

        }
    }
}

define("mixin", [], function() {
    return mixin;
});