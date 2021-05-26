<template>
  <card class="card-user">
    <loading-chasing :loading="loading"></loading-chasing>
    <p class="card-text"></p>
    <div class="author">
      <div>
        <img
          :src="user.info.profile_background_path"
          class="user-cover-photo"
        />
      </div>
      <a href="javascript:void(0)">
        <img class="avatar" :src="user.info.profile_photo_path" alt="Avatar" />
        <h5 class="title">{{ user.first_name }} {{ user.last_name }}</h5>
      </a>
      <p class="description" v-if="user.info.story">
        {{ user.info.story }}
      </p>
      <div v-if="currentUser.id === user.id">
        <a href="javascript:void(0)" @click="onSelectStory" v-if="!editStory">
          {{ user.info.story ? $t('EditStory') : $t('AddStory') }}
        </a>
        <div v-if="editStory">
          <div class="form-floating">
            <textarea
              class="form-control"
              v-model="story"
              :placeholder="$t('TellPeopleYourStory')"
              style="height: 100px"
            ></textarea>
            <label>{{ storyMessage }}</label>

            <div>
              <base-button> Save</base-button>
              <base-button> Cancel</base-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="button-container">
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <nuxt-link
          :to="localePath({ name: 'index-user-url' })"
          class="nav-link active"
          data-toggle="tab"
          role="tab"
          aria-controls="nav-home"
          aria-selected="true"
        >
          {{ $t('Posts') }}
        </nuxt-link>
        <nuxt-link
          class="nav-link"
          :to="
            localePath({ name: 'index-user-url-about', params: $route.params })
          "
          data-toggle="tab"
          role="tab"
          aria-controls="nav-profile"
          aria-selected="false"
        >
          {{ $t('About') }}
        </nuxt-link>
        <nuxt-link
          class="nav-link"
          data-toggle="tab"
          :to="
            localePath({
              name: 'index-user-url-friends',
              params: $route.params
            })
          "
          role="tab"
          aria-controls="nav-contact"
          aria-selected="false"
        >
          {{ $t('Friends') }}
        </nuxt-link>
      </div>
    </div>
  </card>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tabIndex: 1,
      editStory: false,
      story: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
    storyMessage() {
      if (this.story === null) return '101 ' + this.$t('CharacterRemaining')
      return `${101 - this.story.length} ${this.$t('CharacterRemaining')}`
    }
  },
  methods: {
    onSelectStory() {
      this.story = this.user.info.story
      this.editStory = true
    },
    onCancelStory() {
      this.story = ''
      this.editStory = false
    },
    async handleChangeStory() {
      this.loading = true
      try {
        const url = '/v1/user/update_profile'
        await axios.post(url, {
          story: this.story,
          story_privacy: 'public'
        })
        this.$store.commit('user/SET_STORY', this.story)
        this.$notify({
          message: this.$t('SuccessChangeStoryMessage'),
          timeout: 3000,
          icon: 'tim-icons icon-bell-55',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      } catch (err) {
        this.$notify({
          message: this.$t('ErrorChangeStoryMessage'),
          timeout: 3000,
          icon: 'tim-icons icon-bell-55',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      }
      this.story = ''
      this.loading = this.editStory = false
    },
    test() {
      this.$notify({
        message:
          'Welcome to <b>Vue Black Dashboard Pro</b> - a beautiful resource for every web developer',
        timeout: 3000,
        icon: 'tim-icons icon-bell-55',
        horizontalAlign: 'right',
        verticalAlign: 'top',
        type: 'danger'
      })
    }
  }
}
</script>
<style lang="scss">
.user-cover-photo {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
