<template>
  <div class="login-body">
    <div class="login-card" :loading="loading">
      <v-container>
        <v-alert
          :value="registerSuccess"
          transition="scale-transition"
          type="success"
          height="50"
        >
          Register Successfully! Please login
        </v-alert>
        <v-alert
          v-if="error"
          :value="loginError"
          transition="scale-transition"
          type="error"
          height="50"
        >
          {{ error.data.message }}
        </v-alert>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            class="login-input"
            v-model="email"
            :rules="emailRules"
            autocomplete="off"
            :label="$t('Email')"
            required
            color="rgba(255,255,255,0.5)"
            @keyup.enter="onLogin"
          ></v-text-field>
          <v-text-field
            v-model="password"
            autocomplete="off"
            type="password"
            :rules="passwordRules"
            :label="$t('Password')"
            required
            @keyup.enter="onLogin"
          ></v-text-field>
        </v-form>
      </v-container>
      <v-row class="mx-auto">
        <v-col cols="6">
          <v-btn
            color="primary"
            class="text-h6 text-capitalize"
            block
            large
            @click="onLogin"
          >
            {{ $t('common.login') }}
          </v-btn>
        </v-col>
        <v-col cols="6">
          <auth-register @success="registerSuccess = true" class="mx-auto" />
        </v-col>
        <v-col no-gutters>
          {{ $t('common.forgotPassword') }}
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    const _this = this
    return {
      valid: true,
      email: null,
      password: null,
      emailRules: [
        v => !!v || _this.$t('Rule.EmailRequired'),
        v => /.+@.+/.test(v) || _this.$t('Rule.EmailNotValid')
      ],
      passwordRules: [v => !!v || _this.$t('Rule.PasswordRequired')],
      registerSuccess: false,
      loading: false,
      error: null,
      loginError: false
    }
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn'])
  },
  middleware: 'guest',
  layout: 'login',
  methods: {
    async onLogin() {
      if (!this.password || !this.email) {
        this.$refs.form.validate()
        return
      }
      if (!this.valid) return
      this.loading = true
      this.error = null
      try {
        await this.$store.dispatch(
          'user/login',
          {
            email: this.email,
            password: this.password
          },
          { root: true }
        )
        this.$router.push('/')
      } catch (err) {
        this.error = err.response
        this.loginError = true
      }
      this.loading = false
    }
  },
  watch: {
    registerSuccess: function() {
      if (this.registerSuccess === true) {
        const vm = this
        setTimeout(function() {
          vm.registerSuccess = false
        }, 2000)
      }
    },
    loginError: function() {
      if (this.loginError === true) {
        const vm = this
        setTimeout(function() {
          vm.registerSuccess = false
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss">
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #1f1f1f;

  .login-card {
    position: relative;
    width: 400px;
    height: 300px;
    border-radius: 15px;
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    // backdrop-filter: blur(5px);
  }
}
</style>
