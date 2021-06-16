<template>
  <div>
    <div class="container">
      <form @submit.prevent="handleSubmit()">
        <card class="card-login card-white">
          <slide-y-up-transition>
            <div v-show="loading">
              <loading-chasing :loading="true"></loading-chasing>
            </div>
          </slide-y-up-transition>
          <template slot="header">
            <img src="@/assets/img/login-panel.jpeg" alt="login-panel" />
            <h1 class="card-title">
              {{ $t('common.Login') }}
            </h1>
          </template>
          <div>
            <a @click="onLoginFacebook" class="btn btn-block btn-success">
              <span v-if="!facebook.loggingIn">
                <i class="fa fa-facebook"></i>
                Đăng nhập bằng Facebook
              </span>
              <div v-else data-loader="circle-side"></div>
            </a>
            <validation-error :errors="errors" />
            <base-input
              required
              :label="$t('EmailOrUsername')"
              v-model="user.email"
              type="email"
              :placeholder="$t('common.EmailOrUsername')"
              addon-left-icon="tim-icons icon-email-85"
            >
            </base-input>
            <base-input
              required
              :label="$t('Password')"
              v-model="user.password"
              :placeholder="$t('common.Password')"
              addon-left-icon="tim-icons icon-lock-circle"
              type="password"
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
      subscribe: true,
      loading: false,
      errors: [],
      facebook: {
        loggingIn: false,
        loading: false,
        user: false,
        accessToken: null,
        picture: null
      }
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    async handleSubmit() {
      this.loading = true
      this.errors = []
      try {
        await this.login(this.user)
        this.$router.push(this.localePath({ name: 'index' }))
      } catch (e) {
        this.$notify({
          message: this.$t('Invalid credentials!'),
          icon: 'tim-icons icon-bell-55',
          type: 'danger'
        })
        this.errors = [e.response.data.message]
      }
      this.loading = false
    },
    async onLoginFacebook() {
      this.facebook.loggingIn = true
      this.loading = true

      const _this = this
      FB.getLoginStatus(async function(response) {
        if (response.status === 'connected') {
          FB.api('/me', { fields: 'picture,name' }, function(response) {
            _this.facebook.user = response.name
            _this.facebook.picture = response.picture.data.url
          })
          _this.facebook.accessToken = response.authResponse.accessToken
        } else {
          FB.login(
            async function(response) {
              if (response.authResponse) {
                FB.api('/me', { fields: 'picture,name' }, function(response) {
                  _this.facebook.user = response.name
                  _this.facebook.picture = response.picture.data.url
                  _this.onContinueFacebook()
                })
                _this.facebook.accessToken = response.authResponse.accessToken
              }
            },
            {
              scope:
                'public_profile,email,user_gender,user_link,user_location,user_birthday',
              return_scopes: true
            }
          )
        }
      })
      this.facebook.loggingIn = false
      this.loading = false
    },
    async onContinueFacebook() {
      if (!this.facebook.accessToken) return
      this.$nuxt.$loading.start()
      try {
        await this.$store.dispatch(
          'user/loginFacebook',
          this.facebook.accessToken
        )
        this.$router.push({ name: 'index' })
      } catch (err) {
        this.$nuxt.error(err)
      }
      this.$nuxt.$loading.finish()
    },
    statusChangeCallback(response) {
      // Called with the results from FB.getLoginStatus().
      // The current login status of the person.
      if (response.status === 'connected') {
        // Logged into your webpage and Facebook.
        console.log(response)
      } else {
        // Not logged into your webpage or we are unable to tell.
        console.log(response)
        console.log('failed!')
      }
    },
    startFacebookInit() {
      if (typeof FB != 'undefined' && FB != null) {
        FB.init({
          appId: process.env.NUXT_ENV_FACEBOOK_APP_ID,
          autoLogAppEvents: true,
          xfbml: true,
          version: process.env.NUXT_ENV_FACEBOOK_APP_VERSION
        })
      }
    }
  },
  mounted() {
    if (window.localStorage.getItem('email'))
      this.user.email = window.localStorage.getItem('email')
    if (window.localStorage.getItem('password'))
      this.user.password = window.localStorage.getItem('password')
    this.startFacebookInit()
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
