<template>
  <v-container>
    <v-row justify="center" class="pa-16">
      <v-col cols="12" md="7" lg="7" sm="12" class="text-center">
        <v-card class="rounded-lg" :loading="loading">
          <v-card-title>
            {{ $t('ResetYourPassword') }}
          </v-card-title>
          <v-divider />
          <v-row class="ma-auto my-5">
            <v-col cols="8" class="font-weight-bold text-caption">
              {{ $t('ResetReceivePassword') }}
              <v-list flat>
                <v-list-item-group v-model="select" color="indigo">
                  <v-list-item v-for="(item, i) in items" :key="i">
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-divider vertical class="row-divider-vertical" />
            <v-col cols="4" class="text-center">
              <v-avatar size="60">
                <img :src="user.profile_photo_path" />
              </v-avatar>
              <div>
                {{ user.name }}
              </div>
            </v-col>
          </v-row>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn text class="text-none primary--text" outlined>
              {{ $t('Continue') }}
            </v-btn>
            <v-btn text class="text-none" outlined @click.stop="onNotYou">
              {{ $t('NotYou?') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-footer absolute>
      <auth-footer></auth-footer>
    </v-footer>
  </v-container>
</template>
<script>
import Cookie from 'js-cookie'

export default {
  data() {
    const _this = this
    return {
      user: null,
      select: null,
      loading: false,
      error: null,
      items: [
        {
          icon: 'mdi-email-multiple-outline',
          text: _this.$t('SendViaEmail')
        },
        {
          icon: 'mdi-cellphone',
          text: _this.$t('SendViaSMS')
        }
      ]
    }
  },
  methods: {
    onNotYou() {
      Cookie.remove('recover_user')
      this.$router.push({ name: 'login-identify' })
    }
  },
  created() {
    const userRecover = Cookie.get('recover_user')
    if (!userRecover) {
      this.$router.push({ name: 'login-identify' })
    } else {
      this.user = JSON.parse(userRecover)
    }
  }
}
</script>
