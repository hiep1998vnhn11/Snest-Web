<template>
  <div class="message-navbar">
    <header :class="{ 'is-sticky': isSticky }">
      <div class="navigation" v-if="room.type === 3">
        <base-avatar
          :src="participant.profile_photo_path"
          online
          status
          outlined
        ></base-avatar>
        <div class="title">
          <user-name
            :user_name="participant.full_name"
            :user_url="participant.url"
          ></user-name>
          <span v-if="!participant.status">
            {{ $t('Actived') }} {{ participant.online_status | offlineTime }}
          </span>
          <span v-else>
            {{ $t('Active') }}
          </span>
        </div>
      </div>
      <div class="navigation" v-else>
        <base-avatar
          :src="participant.profile_photo_path"
          online
          status
          outlined
        ></base-avatar>
        <div class="title">
          <user-name
            :user_name="participant.full_name"
            :user_url="participant.url"
          ></user-name>
          <span v-if="!participant.status">
            {{ $t('Actived') }} {{ participant.online_status | offlineTime }}
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
      </div>
    </header>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    isSticky: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  methods: {},
  created() {},
  computed: {
    ...mapGetters('user', ['currentUser']),
    ...mapGetters('thresh', ['room', 'participant'])
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.message-navbar {
  header {
    padding: 0 20px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1112;
    background: whitesmoke;
    border-bottom: solid 1px rgba(0, 0, 0, 0.08);
    &.is-sticky {
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
    }
  }
}
</style>
