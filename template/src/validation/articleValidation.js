import common from 'web/common/common'

export default {
    data () {
        return {
            vldEnable: {
                title: false,
                contentSelf: false
            },
            vldPromises: []
        }
    },

    computed: {
        vldTitle () {
            let msg = '请填写文章标题'
            return this.vldEnable.title && this.data.title == '' ? msg : true
        },

        vldContentSelf () {
            if (!this.vldEnable.contentSelf) {
                return true
            }

            let msg = '请填写文章内容'
            if (this.data.content_self.length > 0) {
                for (let item of this.data.content_self) {
                    if (typeof item.content === 'string' && item.content !== '') {
                        return true
                    }
                }
            }
            return msg
        },

        vldAllNormal () {
            for (let key in this.vldEnable) {
                let upperKey = common.toFirstUpper(key)
                if (this[`vld${upperKey}`] !== true) {
                    return this[`vld${upperKey}`]
                }
            }
            return true
        },

        vldAllPromise () {
            let promises = []
            for (let vldPromise of this.vldPromises) {
                promises.push(this[vldPromise])
            }
            return $.when(...promises)
        },

        vldAll () {
            this.enableAllVLD()

            let deferred = $.Deferred()

            if (this.vldAllNormal !== true) {
                deferred.reject(this.vldAllNormal)
                return deferred
            }

            this.vldAllPromise.done(function () {
                deferred.resolve()
            }).fail(function () {
                deferred.reject()
            })

            return deferred
        }
    },

    methods: {
        enableVLD (key) {
            this.vldEnable[key] = true
        },

        enableAllVLD () {
            for (let key in this.vldEnable) {
                this.vldEnable[key] = true
            }
        }
    }
}
