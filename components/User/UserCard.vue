<template>
  <card class="card-user">
    <loading-chasing :loading="loading"></loading-chasing>
    <p class="card-text"></p>
    <div class="author">
      <div>
        <img :src="user.profile_background_path" class="user-cover-photo" />
      </div>
      <a href="javascript:void(0)">
        <img :src="user.profile_photo_path" />
        <img class="avatar" :src="user.profile_photo_path" alt="Avatar" />
        <h5 class="title">{{ user.first_name }} {{ user.last_name }}</h5>
      </a>
      <slide-y-down-transition>
        <p class="description" v-if="user.info.story" v-show="!editStory">
          {{ user.info.story }}
        </p>
      </slide-y-down-transition>
      <slide-y-down-transition>
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
    <div slot="footer" class="button-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('Profile.Posts')" name="Posts"></el-tab-pane>
        <el-tab-pane :label="$t('Profile.About')" name="About"></el-tab-pane>
        <el-tab-pane
          :label="$t('Profile.Friends')"
          name="Friends"
        ></el-tab-pane>
        <el-tab-pane :label="$t('Profile.More')" name="More"></el-tab-pane>
      </el-tabs>
    </div>
  </card>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import { SlideYDownTransition } from 'vue2-transitions'
export default {
  components: {
    SlideYDownTransition
  },
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
      displayStory: '',
      story: '',
      loading: false,
      activeName: 'Posts'
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
