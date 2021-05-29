import Vue from 'vue'

Vue.mixin({
  methods: {
    toastError(message = '', icon = 'tim-icons icon-bell-55', time = 3000) {
      this.$notify({
        message: this.$t(message),
        timeout: time,
        icon: icon,
        horizontalAlign: 'right',
        verticalAlign: 'top',
        type: 'danger'
      })
    },

    toastSuccess(message = '', icon = 'tim-icons icon-bell-55', time = 3000) {
      this.$notify({
        message: this.$t(message),
        timeout: time,
        icon: icon,
        horizontalAlign: 'right',
        verticalAlign: 'top',
        type: 'success'
      })
    }
  }
})
