<template>
  <div>
    <div class="container">
      <form @submit.prevent="handleSubmit()">
        <card class="card-login card-white">
          <template slot="header">
            <img src="@/assets/img/login-panel.jpeg" alt="login-panel" />
            <h1 class="card-title">
              {{ $t('PasswordReset') }}
            </h1>
          </template>
          <div>
            <base-input
              required
              :label="$t('YourEmail')"
              v-model="user.email"
              type="email"
              :placeholder="$t('common.EmailOrUsername')"
              addon-left-icon="tim-icons icon-email-85"
            >
            </base-input>
            <validation-error :errors="null" />
          </div>
          <div slot="footer">
            <base-button
              native-type="submit"
              type="primary"
              class="mb-3"
              size="lg"
              block
            >
              {{ $t('SendMeAnEmail') }}
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
import { mapActions } from 'vuex'
export default {
  layout: 'guest',
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      email: 'admin@jsonapi.com',
      password: 'secret',
      subscribe: true
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    async handleSubmit() {
      this.$nuxt.$loading.start()
      try {
        await this.login(this.user)
        this.$router.push(this.localePath({ name: 'index' }))
      } catch (e) {
        await this.$notify({
          message: 'Invalid credentials!',
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        })
      }
      this.$nuxt.$loading.finish()
    }
  },
  mounted() {
    if (window.localStorage.getItem('email'))
      this.user.email = window.localStorage.getItem('email')
    if (window.localStorage.getItem('password'))
      this.user.password = window.localStorage.getItem('password')
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
