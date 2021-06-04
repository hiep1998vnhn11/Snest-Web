<template>
  <div class="container">
    <div class="">
      <div class="">
        <form @submit.prevent="handleSubmit()">
          <card class="card-register card-white">
            <template slot="header">
              <img
                class="card-img"
                src="@/assets/img/login-panel.jpeg"
                alt="Register-panel"
              />
              <h4 class="card-title">Register</h4>
            </template>
            <base-input
              v-model="name"
              placeholder="Full Name"
              addon-left-icon="tim-icons icon-single-02"
              type="text"
            >
            </base-input>
            <validation-error :errors="apiValidationErrors.name" />
            <base-input
              v-model="email"
              placeholder="Email"
              addon-left-icon="tim-icons icon-email-85"
              type="email"
            >
            </base-input>
            <validation-error :errors="apiValidationErrors.email" />
            <base-input
              v-model="password"
              placeholder="Password"
              addon-left-icon="tim-icons icon-lock-circle"
              type="password"
            >
            </base-input>
            <validation-error :errors="apiValidationErrors.password" />
            <base-input
              placeholder="Confirm Password"
              type="password"
              name="Password confirmation"
              v-model="password_confirmation"
              addon-left-icon="tim-icons icon-lock-circle"
            >
            </base-input>
            <validation-error
              :errors="apiValidationErrors.password_confirmation"
            />
            <base-checkbox v-model="boolean" class="text-left">
              I agree to the <a href="#something">terms and conditions</a>.
            </base-checkbox>
            <base-button
              native-type="submit"
              slot="footer"
              type="primary"
              round
              block
              size="lg"
            >
              Get Started
            </base-button>
          </card>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import formMixin from '@/mixins/form-mixin'

export default {
  layout: 'guest',
  mixins: [formMixin],
  data() {
    return {
      name: null,
      boolean: false,
      email: null,
      password: null,
      password_confirmation: null
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.boolean) {
        await this.$notify({
          type: 'danger',
          message: 'You need to agree with our terms and conditions.',
          icon: 'tim-icons icon-bell-55'
        })
        return
      }

      const user = {
        data: {
          type: 'token',
          attributes: {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation
          }
        }
      }

      const requestOptions = {
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        }
      }

      try {
        await this.$store.dispatch('register', { user, requestOptions })
        this.$notify({
          type: 'succes',
          message: 'Successfully registered.',
          icon: 'tim-icons icon-bell-55'
        })
      } catch (error) {
        this.$notify({
          type: 'danger',
          message: 'Oops, something went wrong!',
          icon: 'tim-icons icon-bell-55'
        })
        this.setApiValidation(error.response.data.errors)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.card-register {
  position: relative;
  padding-top: 300px;
  width: 100%;
  max-width: 500px;
  min-width: 400px;
  img {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 300px;
  }
  .card-title {
    font-weight: bold;
    text-align: center;
  }
}
</style>
