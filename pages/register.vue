<template>
  <div class="container">
    <form @submit.prevent="handleSubmit()">
      <card class="card-register card-white">
        <slide-y-down-transition>
          <div v-show="loading">
            <loading-chasing :loading="true"></loading-chasing>
          </div>
        </slide-y-down-transition>
        <template slot="header">
          <img
            class="card-img"
            src="@/assets/img/login-panel.jpeg"
            alt="Register-panel"
          />
          <h4 class="card-title">Register</h4>
        </template>
        <base-input
          :label="$t('FirstName')"
          required
          v-model="user.first_name"
          :placeholder="$t('FirstName')"
          addon-left-icon="tim-icons icon-single-02"
          type="text"
        >
        </base-input>
        <validation-error :errors="apiErrors.first_name" />
        <base-input
          :label="$t('LastName')"
          v-model="user.last_name"
          :placeholder="$t('LastName')"
          addon-left-icon="tim-icons icon-single-02"
          type="text"
        >
        </base-input>
        <base-input
          label="Email"
          required
          v-model="user.email"
          placeholder="Email"
          addon-left-icon="tim-icons icon-email-85"
          type="email"
        >
        </base-input>
        <validation-error :errors="apiErrors.email" />

        <base-input
          :label="$t('Password')"
          required
          v-model="user.password"
          :placeholder="$t('Password')"
          addon-left-icon="tim-icons icon-lock-circle"
          type="password"
        >
        </base-input>
        <validation-error :errors="apiErrors.password" />

        <base-input
          :label="$t('Confirm Password')"
          required
          :placeholder="$t('Confirm Password')"
          type="password"
          name="Password confirmation"
          v-model="user.password_confirmation"
          addon-left-icon="tim-icons icon-lock-circle"
        >
        </base-input>
        <validation-error :errors="apiErrors.password_confirmation" />
        <base-checkbox v-model="user.term" class="text-left">
          {{ $t('I agree to the') }}
          <a href="#">{{ $t('terms and conditions') }}</a
          >.
        </base-checkbox>

        <div slot="footer">
          <base-button
            native-type="submit"
            slot="footer"
            type="primary"
            round
            block
            size="lg"
          >
            {{ $t('Register') }}
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
</template>
<script>
export default {
  layout: 'guest',
  data() {
    return {
      name: null,
      boolean: false,
      email: null,
      password: null,
      password_confirmation: null,
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        term: false
      },
      loading: false,
      apiErrors: {}
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.user.term) {
        await this.$notify({
          type: 'danger',
          message: this.$t('You need to agree with our terms and conditions.'),
          icon: 'tim-icons icon-bell-55'
        })
        return
      }
      this.loading = true
      try {
        await this.$axios.$post('/auth/register', this.user)
        this.$notify({
          type: 'success',
          message: this.$t('Successfully registered!'),
          icon: 'tim-icons icon-bell-55'
        })
        this.$router.push(
          this.localePath({
            name: 'login'
          })
        )
      } catch (error) {
        this.$notify({
          type: 'danger',
          message: this.$t('Oops, something went wrong!'),
          icon: 'tim-icons icon-bell-55'
        })
        this.apiErrors = error.response.data.errors
      }
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.card-register {
  position: relative;
  padding-top: 200px;
  width: 100%;
  max-width: 500px;
  min-width: 400px;
  img {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 200px;
  }
  .card-title {
    font-weight: bold;
    text-align: center;
  }
}
</style>
