<template>
  <div class="user-name-container">
    <el-popover placement="top-start" width="350" trigger="hover">
      <nuxt-link
        :to="
          localePath({
            name: 'index-user-url',
            params: {
              url: user_url
            }
          })
        "
        class="user-name"
        slot="reference"
        @mouseenter.native="onHover"
      >
        {{ user_name }}
      </nuxt-link>
      <div class="user-name-popover">
        <loading-chasing :loading="loading"></loading-chasing>
        <div class="row">
          <div class="col-4">
            <img :src="info.profile_photo_path" alt="avt" />
          </div>
          <div class="col-8">
            <div class="user-name-popover-name">
              {{ info.full_name }}
            </div>
            <p>
              <i class="fa fa-users" aria-hidden="true"></i>
              {{ info.friends_count }} {{ $t('Friends') }}
            </p>
            <p>
              <i class="tim-icons icon-user-run"></i>
              {{ $t('Following') }}
              {{ info.follows_count }} {{ $t('Peoples') }}
            </p>
            <p>
              <i class="tim-icons icon-satisfied"></i>
              {{ info.follows_count }} {{ $t('Peoples') }}
              {{ $t('AreFollowed') }}
            </p>
          </div>
        </div>

        <div class="user-name-popover-actions">
          <base-button
            size="sm"
            type="neutral"
            v-if="!info.friend || info.friend.status == 0"
          >
            <i class="tim-icons icon-single-02"></i>
            {{ $t('AddFriend') }}
          </base-button>
          <base-button size="sm" type="success" v-else>
            <i class="tim-icons icon-single-02"></i>
            {{ $t('Friends') }}
          </base-button>
          <base-button size="sm" type="success">
            <i class="tim-icons icon-chat-33"></i>
            {{ $t('Chat') }}
          </base-button>
          <base-dropdown menu-on-right title-tag="a">
            <template slot="title">
              <base-button size="sm" type="neutral" icon>
                <i class="tim-icons icon-double-right"></i>
              </base-button>
            </template>
            <li class="mx-2">
              <base-button block size="sm" v-if="!info.follow">
                <i class="tim-icons icon-user-run"></i>
                {{ $t('Follow') }}
              </base-button>
              <base-button block size="sm" v-else>
                <i class="fas fa-low-vision"></i> {{ $t('UnFollow') }}
              </base-button>
            </li>
            <li class="mx-2">
              <base-button block size="sm">
                <i class="fa fa-user-times" aria-hidden="true"></i>
                {{ $t('Block') }}
              </base-button>
            </li>
          </base-dropdown>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    user_name: {
      type: String,
      default: ''
    },
    user_url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      hover: false,
      loading: false,
      info: {}
    }
  },
  methods: {
    async onHover() {
      if (this.info.url) return
      this.loading = true
      try {
        const response = await axios.get(`/v1/user/${this.user_url}/get_info`)
        this.info = response.data.data
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loading = false
    }
  },
  created() {},
  computed: {},
  mounted() {}
}
</script>
