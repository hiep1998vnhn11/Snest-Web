<template>
  <v-card :loading="loading">
    <v-card-title class="font-weight-bold">
      Setting your account
    </v-card-title>
    <v-divider />
    <v-alert
      v-if="success"
      :value="successAlert"
      transition="scale-transition"
      type="success"
      height="50"
    >
      {{ success }}
    </v-alert>
    <v-simple-table v-if="!!currentUser">
      <template v-slot:default>
        <tbody>
          <v-hover v-slot="{ hover }">
            <tr :class="select === 'name' ? 'grey lighten-2' : null">
              <td width="25%" class="font-weight-bold">Name</td>
              <td>
                <div v-if="select === 'name'">
                  <v-text-field
                    label="Name"
                    placeholder="Enter name"
                    outlined
                    class="mt-3"
                    autocomplete="off"
                    dense
                    width="40%"
                    v-model="name"
                  ></v-text-field>
                  <v-card class="grey lighten-1 mb-3">
                    <v-container>
                      <a class="font-weight-bold">Notice:</a>
                      If you change your name, you can't have changed it for 60
                      days later. Please check your name carefully!
                    </v-container>
                  </v-card>
                  <v-divider />
                  <v-btn
                    class="primary text-capitalize mt-3"
                    @click="changeName"
                    x-small
                  >
                    Save
                  </v-btn>
                  <v-btn
                    class="text-capitalize mt-3"
                    x-small
                    outlined
                    @click="select = name = null"
                  >
                    Cancel
                  </v-btn>
                </div>
                <div v-else>
                  {{ currentUser.name }}
                </div>
              </td>
              <td width="20%" class="text-right">
                <v-icon class="mb-3" v-show="hover" size="10" color="primary">
                  mdi-pencil
                </v-icon>
                <a
                  @click="
                    select = 'name'
                    name = currentUser.name
                  "
                >
                  Edit
                </a>
              </td>
            </tr>
          </v-hover>

          <v-hover v-slot="{ hover }">
            <tr :class="select === 'url' ? 'grey lighten-2' : null">
              <td width="25%" class="font-weight-bold">Your url</td>
              <td>
                <div v-if="select === 'url'">
                  <v-text-field
                    label="Your url"
                    placeholder="Enter url"
                    outlined
                    class="mt-3"
                    autocomplete="off"
                    dense
                    v-model="url"
                  ></v-text-field>
                  <v-card class="grey lighten-1 mb-3">
                    <v-container>
                      <a class="font-weight-bold">Notice:</a>
                      Url is public address of your personal page. Make it
                      simple and easy to remember
                    </v-container>
                  </v-card>
                  <v-divider />
                  <v-btn
                    class="primary text-capitalize mt-3"
                    @click="changeUrl"
                    x-small
                  >
                    Save
                  </v-btn>
                  <v-btn
                    class="text-capitalize mt-3"
                    x-small
                    outlined
                    @click="select = url = null"
                  >
                    Cancel
                  </v-btn>
                </div>
                <div v-else>
                  {{ `/user/${currentUser.url}` }}
                </div>
              </td>
              <td width="20%" class="text-right">
                <v-icon class="mb-3" v-show="hover" size="10" color="primary">
                  mdi-pencil
                </v-icon>
                <a
                  @click="
                    select = 'url'
                    url = currentUser.url
                  "
                >
                  Edit
                </a>
              </td>
            </tr>
          </v-hover>

          <v-hover v-slot="{ hover }">
            <tr
              @click="select = 'email'"
              :class="select === 'email' ? 'grey lighten-2' : null"
            >
              <td width="25%" class="font-weight-bold">Email</td>
              <td>{{ currentUser.email }}</td>
              <td width="20%" class="text-right">
                <v-icon class="mb-3" v-show="hover" size="10" color="primary">
                  mdi-pencil
                </v-icon>
                <a>Edit</a>
              </td>
            </tr>
          </v-hover>

          <v-hover v-slot="{ hover }">
            <tr
              @click="select = 'phone'"
              :class="select === 'phone' ? 'grey lighten-2' : null"
            >
              <td width="25%" class="font-weight-bold">Password</td>
              <td>******</td>
              <td width="20%" class="text-right">
                <v-icon class="mb-3" v-show="hover" size="10" color="primary">
                  mdi-pencil
                </v-icon>
                <a>Edit</a>
              </td>
            </tr>
          </v-hover>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: mapGetters('user', ['currentUser']),
  mounted() {
    console.log(this.$route.name)
  },
  methods: {
    ...mapActions('user', ['changeInfo', 'getUser']),
    async changeName() {
      if (this.name !== this.currentUser.name) {
        this.loading = true
        this.error = null
        const param = {
          name: this.name
        }
        try {
          const response = await this.changeInfo(param)
          await this.getUser()
          this.success = response.message
        } catch (err) {
          this.error = err.toString()
        }
        this.loading = false
        this.select = null
        this.successAlert = true
      } else {
        this.select = null
      }
    },
    async changeUrl() {
      if (this.url !== this.currentUser.url) {
        this.loading = true
        this.error = null
        const param = {
          url: this.url
        }
        try {
          const response = await this.changeInfo(param)
          await this.getUser()
          this.success = response.message
        } catch (err) {
          this.error = err.toString()
        }
        this.loading = false
        this.select = null
        this.successAlert = true
      } else {
        this.select = null
      }
    }
  },
  data() {
    return {
      select: null,
      name: null,
      url: null,
      phoneNumber: null,
      loading: false,
      error: null,
      success: null,
      successAlert: false,
      errorAlert: false
    }
  },
  watch: {
    successAlert: function() {
      if (this.successAlert === true) {
        const vm = this
        setTimeout(function() {
          vm.successAlert = false
        }, 3000)
      }
    },
    errorAlert: function() {
      if (this.errorAlert === true) {
        const vm = this
        setTimeout(function() {
          vm.errorAlert = false
        }, 3000)
      }
    }
  }
}
</script>

<style></style>
