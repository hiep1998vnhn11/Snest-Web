<template>
  <div class="message-navbar">
    <nav :class="{ 'is-sticky': isSticky }">
      <div class="navigation">
        <base-avatar
          :src="currentUser.profile_photo_path"
          online
          status
          outlined
        ></base-avatar>
        <div class="title">
          <user-name
            :user_name="currentUser.full_name"
            :user_url="currentUser.url"
          ></user-name>
          <span v-if="!currentUser.status">
            {{ $t('Actived') }} {{ currentUser.online_status | offlineTime }}
          </span>
          <span v-else>
            {{ $t('Active') }}
          </span>
        </div>
      </div>
      <div class="left">
        <base-button icon round @click="showThemeModal = !showThemeModal">
          <i class="fas fa-phone"></i>
        </base-button>
        <base-button round icon style="font-size: 1.2rem">
          <i class="fas fa-video"></i>
        </base-button>
        <base-button icon round style="font-size: 1.2rem">
          <i class="tim-icons icon-alert-circle-exc"></i>
        </base-button>
        <div class="profile-action profile">
          <img
            src="https://s120-ava-talk.zadn.vn/2/4/9/3/21/120/58a03ada3f14043029fe8b521af00648.jpg"
            alt="logo"
            width="45"
          />
          <i class="ic-svg-vip-label icon"></i>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isSticky: true
    }
  },
  methods: {},
  created() {},
  computed: {
    ...mapGetters('user', ['currentUser'])
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
$top-height: 70px;
.message-navbar {
  nav {
    padding: 0 20px;
    height: $top-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    position: absolute;
    width: 100%;
    z-index: 1112;
    background: whitesmoke;
    &.is-sticky {
      background: var(--background);
      box-shadow: 0 3px 5px var(--sticky-header-box-shadow);
    }
    .navigation {
      display: flex;
      align-items: center;
      justify-content: center;

      .title {
        margin-left: 10px;
        font-size: 1.2rem;
        span {
          font-size: 0.8rem;
          font-weight: 100;
        }
      }
    }
    &.is-sticky {
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.08);
    }
    .left {
      margin-right: 15px;
      display: flex;
      align-items: center;
      .profile-action {
        display: inline-block;
        margin-left: 10px;
        img {
          border-radius: 50%;
          border: 2px solid #fccc2e;
        }
        &.profile {
          position: relative;
          padding: 5px 0;
          .icon {
            position: absolute;
            bottom: 5px;
            left: 0;
            right: 0;
            margin: auto;
            height: 10px;
            width: 22px;
            background-repeat: no-repeat;
            background-size: cover;
          }
        }
      }
    }
    .btn {
      padding: 10px;
      i {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
