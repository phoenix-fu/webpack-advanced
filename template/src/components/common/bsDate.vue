<template>
    <input :id="id" v-model="value" data-date-format="YYYY-MM-DD" type="text" class="form-control"/>
</template>

<script>
import 'web/lib/bootstrap-datetimepicker.min'
import common from 'web/common/common'

export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },

    data: function () {
        return {
            id: common.random()
        }
    },

    ready: function () {
        $('#' + this.id).datetimepicker()
    }
}
</script>
