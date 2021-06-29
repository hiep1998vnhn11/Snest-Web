<template>
  <div>
    <div class="container">
      <form @submit.prevent="handleSubmit()">
        <card class="card-login card-white">
          <template slot="header">
            <img src="@/assets/img/login-panel.jpeg" alt="login-panel" />
            <h1 class="card-title">
              {{ $t('ConfirmRegister') }}
            </h1>
          </template>
          <div>
            <base-input
              required
              :label="$t('YourEmail')"
              v-model="user.email"
              type="email"
              :placeholder="$t('Email')"
              addon-left-icon="tim-icons icon-email-85"
            >
            </base-input>
            <base-input
              required
              :label="$t('Code')"
              v-model="user.code"
              type="text"
              :placeholder="$t('code')"
              addon-left-icon="tim-icons icon-check-2"
            >
            </base-input>
          </div>
          <div slot="footer">
            <base-button
              native-type="submit"
              type="primary"
              class="mb-3"
              size="lg"
              block
              :disabled="inValid"
            >
              {{ $t('Verify') }}
            </base-button>
            <div class="pull-left">
              <h6>
                <nuxt-link
                  class="link footer-link"
                  :to="localePath({ name: 'login' })"
                >
                  {{ $t('common.Login') }}
                </nuxt-link>
              </h6>
            </div>
            <div class="pull-right">
              <h6>
                <nuxt-link
                  :to="localePath({ name: 'register' })"
                  class="link footer-link"
                >
                  {{ $t('common.register') }}
                </nuxt-link>
              </h6>
            </div>
          </div>
        </card>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'guest',
  data() {
    return {
      user: {
        email: '',
        code: ''
      }
    }
  },
  methods: {
    async handleSubmit() {
      if (this.inValid) return
      this.$nuxt.$loading.start()
      try {
        await this.$axios.post('/auth/confirm-register', this.user)
        this.toastSuccess('Register success! Please login')
        this.$router.push(this.localePath({ name: 'login' }))
      } catch (e) {
        this.toastError('InvalidCode')
      }
      this.$nuxt.$loading.finish()
    }
  },
  mounted() {
    this.user.email =
      this.$route.query.email || window.localStorage.getItem('email') || ''
    this.user.code = this.$route.query.code || ''
  },
  computed: {
    inValid() {
      return !this.user.email || !this.user.code
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
.card-login {
  width: 100%;
  padding-top: 230px;
  position: relative;
  img {
    width: 100%;
    top: 0;
    left: 0;
    height: 230px;
    position: absolute;
  }
  .card-title {
    text-align: center;
    font-weight: bold;
    margin-top: 15px;
  }
}
</style>
