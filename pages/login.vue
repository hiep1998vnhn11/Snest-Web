<template>
  <div>
    <div class="container">
      <div class="col-lg-4 col-md-6 mt-3 ml-auto mr-auto">
        <form @submit.prevent="handleSubmit()">
          <card class="card-login card-white">
            <template slot="header">
              <img src="/img/card-primary.png" alt="" />
              <h1 class="card-title">
                {{ $t('common.Login') }}
              </h1>
            </template>

            <div>
              <base-input
                required
                :label="$t('EmailOrUsername')"
                v-model="user.email"
                type="email"
                :placeholder="$t('common.EmailOrUsername')"
                addon-left-icon="tim-icons icon-email-85"
              >
              </base-input>
              <validation-error :errors="123" />

              <base-input
                required
                :label="$t('Password')"
                v-model="user.password"
                :placeholder="$t('common.Password')"
                addon-left-icon="tim-icons icon-lock-circle"
                type="password"
              >
              </base-input>
              <validation-error :errors="123" />
            </div>

            <div slot="footer">
              <base-button
                native-type="submit"
                type="primary"
                class="mb-3"
                size="lg"
                block
              >
                {{ $t('Login') }}
              </base-button>
              <div class="pull-left">
                <h6>
                  <nuxt-link
                    class="link footer-link"
                    :to="localePath({ name: 'register' })"
                  >
                    {{ $t('common.register') }}
                  </nuxt-link>
                </h6>
              </div>

              <div class="pull-right">
                <h6>
                  <nuxt-link
                    :to="localePath({ name: 'password-reset' })"
                    class="link footer-link"
                  >
                    {{ $t('common.ForgotPassword') }} ?
                  </nuxt-link>
                </h6>
              </div>
            </div>
          </card>
        </form>
      </div>
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
        password: window.localStorage.getItem('password') || ''
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
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
</style>
