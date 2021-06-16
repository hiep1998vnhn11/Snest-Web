<template>
  <card class="card-user">
    <loading-chasing :loading="loading"></loading-chasing>
    <div class="user-cover-photo">
      <img v-lazy="user.profile_background_path" />
    </div>
    <p class="card-text"></p>
    <div class="author">
      <a href="javascript:void(0)">
        <img class="avatar" :src="user.profile_photo_path" alt="Avatar" />
        <h5 class="title">{{ user.first_name }} {{ user.last_name }}</h5>
      </a>
      <slide-y-down-transition>
        <p class="description" v-if="user.story" v-show="!editStory">
          {{ user.story }}
        </p>
      </slide-y-down-transition>
      <slide-y-down-transition>
        <div v-if="currentUser.id === user.id">
          <a href="javascript:void(0)" @click="onSelectStory" v-if="!editStory">
            {{ user.story ? $t('EditStory') : $t('AddStory') }}
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
                <base-button
                  size="sm"
                  type="primary"
                  @click="handleChangeStory"
                >
                  {{ $t('Save') }}
                </base-button>
                <base-button size="sm" type="info" @click="onCancelStory">
                  {{ $t('Cancel') }}
                </base-button>
              </div>
            </div>
          </div>
        </div>
      </slide-y-down-transition>
    </div>
    <div class="tab-container">
      <router-link
        :to="localePath({ name: tab.name, params: { url: $route.params.url } })"
        v-for="tab in tabs"
        :key="`user-tab-${tab.name}`"
      >
        <base-button v-if="!tab.require">
          {{ tab.label }}
        </base-button>
      </router-link>
    </div>
  </card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const vm = this
    return {
      tabIndex: 1,
      editStory: false,
      displayStory: '',
      story: '',
      loading: false,
      tabs: [
        { name: 'index-user-url', label: 'Posts' },
        { name: 'index-user-url-about', label: 'About' },
        { name: 'index-user-url-friends', label: 'Friends' },
        { name: 'index-user-url-edit', label: 'Edit', require: true }
      ]
    }
  },
  mounted() {},
  computed: {
    ...mapGetters('user', ['currentUser']),
    storyMessage() {
      if (this.story === null) return '101 ' + this.$t('CharacterRemaining')
      return `${101 - this.story.length} ${this.$t('CharacterRemaining')}`
    }
  },
  methods: {
    onSelectStory() {
      this.story = this.user.story
      this.editStory = true
    },
    onCancelStory() {
      this.story = ''
      this.editStory = false
    },
    handleClick() {},
    async handleChangeStory() {
      this.loading = true
      try {
        const url = '/v1/user/update_profile'
        await this.$axios.$post(url, {
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

  img {
    max-height: 200px;
    width: 100%;
  }
}

.tab-container {
  display: flex;
}
</style>
