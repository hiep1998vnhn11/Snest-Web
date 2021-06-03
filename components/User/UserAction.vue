<template>
  <card class="card-user-action">
    <loading-chasing :loading="loading"></loading-chasing>
    <h4 class="title">
      {{ $t('Actions') }}
    </h4>
    <div class="card-description"></div>
    <slide-y-up-transition>
      <base-button v-if="!followStatus.status" block @click="onFollow(true)">
        <i class="tim-icons icon-user-run"></i>
        {{ $t('Follow') }} {{ user.full_name }}
      </base-button>
      <base-button v-else type="success" block @click="onFollow(false)">
        <i class="fa fa-eye-slash" aria-hidden="true"></i>
        {{ $t('UnFollow') }} {{ user.full_name }}
      </base-button>
    </slide-y-up-transition>

    <base-button type="info" block>
      <i class="tim-icons icon-chat-33"></i>
      {{ $t('Messages') }}
    </base-button>
    <el-popover
      placement="bottom"
      width="300"
      trigger="click"
      popper-class="popover-default"
    >
      <base-button
        :type="buttonsType[friendStatus.status].type"
        block
        slot="reference"
      >
        <i
          :class="buttonsType[friendStatus.status].icon"
          aria-hidden="true"
        ></i>
        {{ buttonsType[friendStatus.status].text }}
      </base-button>
      <div>
        <base-button type="danger" block v-if="friendStatus.status !== 3">
          {{ $t('Favorite') }}
        </base-button>
        <base-button
          type="danger"
          block
          v-if="friendStatus.status === 1"
          @click="handleFriend(0)"
        >
          {{ $t('Unfriend') }}
        </base-button>
        <base-button
          type="success"
          block
          v-if="friendStatus.status === 0"
          @click="handleFriend(2)"
        >
          {{ $t('AddFriend') }}
        </base-button>
        <base-button
          type="primary"
          block
          v-if="friendStatus.status === 2"
          @click="handleFriend('cancel-request')"
        >
          {{ $t('CancelRequesting') }}
        </base-button>
        <base-button
          type="info"
          block
          v-if="friendStatus.status === 2"
          @click="handleFriend('accept')"
        >
          {{ $t('AcceptFriend') }}
        </base-button>
        <base-button
          type="neutral"
          block
          v-if="friendStatus.status === 2"
          @click="handleFriend('cancel-friend')"
        >
          {{ $t('RefuseFriend') }}
        </base-button>
        <base-button type="danger" block @click="handleFriend(3)">
          {{ $t('BlockThisUser') }}
        </base-button>
      </div>
    </el-popover>
  </card>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    friendStatus: {
      type: Object
    },
    followStatus: {
      type: Object
    }
  },
  data() {
    const vm = this
    return {
      tabIndex: 1,
      loading: false,
      friendPopover: false,
      buttonsType: {
        0: {
          type: 'neutral',
          text: vm.$t('AddFriend'),
          icon: 'fa fa-user-plus'
        },
        1: {
          type: 'success',
          text: vm.$t('Friends'),
          icon: 'fa fa-user-circle'
        },
        2: {
          type: 'danger',
          text: vm.$t('RequestingFriend'),
          icon: 'fa fa-paper-plane'
        },
        3: {
          type: 'primary',
          text: vm.$t('YouBlockedThisUser'),
          icon: 'fa fa-user-times'
        }
      }
    }
  },
  methods: {
    async onFollow(status) {
      this.followStatus.status = status
      this.loading = true
      try {
        const response = await this.$axios.post(
          `/v1/user/${this.$route.params.url}/handle-follow`,
          {
            status: status
          }
        )
        Object.keys(response.data.data).forEach(
          key => (this.followStatus[key] = response.data.data[key])
        )
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loading = false
    },

    async handleFriend(status) {
      let statusArray = {
        0: 'unfriend',
        2: 'add-friend',
        3: 'block-friend',
        cancel: 'cancel-friend',
        'cancel-request': 'cancel-friend-request',
        accept: 'accept-friend'
      }
      if (!statusArray[status]) return
      this.loading = true
      try {
        const { data } = await this.$axios.$post(
          `/v1/user/${this.$route.params.url}/${statusArray[status]}`
        )
        Object.keys(data).forEach(key => (this.friendStatus[key] = data[key]))
      } catch (err) {
        this.toastError(err.toString())
      }
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.card-user-action {
  position: relative;
}
</style>
