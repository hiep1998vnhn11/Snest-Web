<template>
  <div>
    <v-app-bar absolute flat height="64" outlined>
      <span>{{ $t('To:') }}</span>
      <div
        v-click-outside="{
          handler: onClickOutsideWithConditional,
          closeConditional
        }"
      >
        <v-text-field
          v-model="search"
          rounded
          single-line
          hide-details
          autocomplete="off"
          large
          @click="focus = true"
          @focus="focus = true"
          autofocus
        >
          <template v-slot:prepend-inner> </template>
        </v-text-field>
        <v-expand-transition>
          <v-card
            v-show="focus"
            height="25rem"
            width="20rem"
            class="expand-transition-result rounded-lg elevation-10"
          >
            <div v-if="loading" class="text-center">
              <v-progress-circular
                :size="30"
                :width="2"
                color="purple"
                indeterminate
                class="mt-10"
              ></v-progress-circular>
            </div>
            <div v-else-if="search && result.length" class="mx-2 mt-2">
              <v-btn
                v-for="friend in result"
                :key="`btn-friend-${friend.id}`"
                block
                height="3rem"
                text
                active-class="primary--text"
                class="text-none mt-1 rounded-lg text-body-1"
              >
                <v-avatar class="avatar-outlined ml-n2 mr-2" size="35">
                  <img :src="friend.user_friend.profile_photo_path" />
                </v-avatar>
                {{ friend.user_friend.name }}
                <v-spacer />
              </v-btn>
            </div>
            <v-container
              v-else-if="search && !result.length"
              class="text-center text--secondary"
            >
              {{ $t('NotAnyResultForSearchKey') }} {{ search }}
            </v-container>
          </v-card>
        </v-expand-transition>
      </div>
    </v-app-bar>
    <v-expand-transition v-if="model">
      <v-list v-if="model" class="red lighten-3">
        <v-list-item v-for="(field, i) in fields" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="field.value"></v-list-item-title>
            <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
    <v-card> </v-card>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      descriptionLimit: 60,
      result: [],
      loading: false,
      model: null,
      search: null,
      text: '',
      focus: false,
      error: null
    }
  },
  methods: {
    onClickOutsideWithConditional() {
      this.focus = false
    },
    closeConditional(e) {
      return this.focus
    }
  },
  mounted() {},
  middleware: 'auth',
  watch: {
    async search(val) {
      if (!val || this.loading) return
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('/v1/user/friend/get', {
          search_key: val.toLowerCase()
        })
        this.result = response.data.data
      } catch (err) {
        this.error = err.response.data.messasge
      }
      this.loading = false
    }
  }
}
</script>
<style scoped>
.expand-transition-result {
  position: absolute;
  top: 4rem;
  overflow: hidden;
}

.expand-transition-result:hover {
  overflow: auto;
}

.expand-transition-result::-webkit-scrollbar {
  width: 0.35rem;
  margin-right: 5px;
}

.expand-transition-result::-webkit-scrollbar-track {
  background: white;
  -webkit-border-radius: 10px;
  border-radius: 25px;
  padding: 10px;
}

.expand-transition-result::-webkit-scrollbar-thumb {
  background: #9e9e9e;
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

.expand-transition-result::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}
.expand-transition-result::-webkit-scrollbar-corner {
  background-color: transparent;
}
</style>
