<template>
  <div>
    <div class="messages-card-container">
      <zoom-center-transition :duration="200" mode="out-in">
        <div class="messages-card new" v-if="showNew">
          <div class="messages-card-title">
            <h5 class="title">
              {{ $t('Search for new Message') }}
            </h5>
            <base-button
              class="btn-danger"
              icon
              size="sm"
              round
              @click="showNew = !showNew"
            >
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </div>
          <div class="messages-card-footer new">
            {{ $t('To:') }}
            <div class="messages-card-textarea-container">
              <base-input v-model="search"> </base-input>
            </div>
          </div>
          <perfect-scrollbar>
            <div class="messages-card-content">
              <loading-chasing :loading="true"></loading-chasing>
            </div>
          </perfect-scrollbar>
        </div>
      </zoom-center-transition>

      <zoom-center-transition :duration="200" mode="out-in">
        <div class="messages-card" v-if="showCard">
          <div class="messages-card-title">
            <div class="title">
              <base-avatar
                :src="currentUser.profile_photo_path"
                outlined
                alt="avatar"
                status
                :online="currentUser.online_status.status"
              >
              </base-avatar>
              <div class="name ml-2">
                {{ currentUser.full_name }}
                <div class="time" v-if="currentUser.online_status.status">
                  {{ $t('Active') }}
                </div>
                <div class="time" v-else>
                  {{ $t('Actived') }}
                  {{ currentUser.online_status.time | offlineTime }}
                </div>
              </div>
            </div>
            <div>
              <base-button
                class="btn-primary"
                icon
                size="sm"
                round
                @click="showCard = !showCard"
              >
                <i class="tim-icons icon-video-66"></i>
              </base-button>
              <base-button
                class="btn-success"
                size="sm"
                icon
                round
                @click="showCard = !showCard"
              >
                <i class="fas fa-phone"></i>
              </base-button>
              <base-button
                class="btn-danger"
                icon
                size="sm"
                round
                @click="showCard = !showCard"
              >
                <i class="tim-icons icon-simple-remove"></i>
              </base-button>
            </div>
          </div>
          <perfect-scrollbar>
            <div class="messages-card-content">
              <div
                v-for="message in messagesList"
                :key="`message-row-card-${message.id}`"
              >
                <messages-row
                  :message="message"
                  :isCurrent="true"
                  :isCard="true"
                ></messages-row>
              </div>
            </div>
          </perfect-scrollbar>

          <div class="messages-card-footer">
            <base-button
              class="btn-primary"
              icon
              size="sm"
              round
              @click="showNew = !showNew"
            >
              <i class="fas fa-edit"></i>
            </base-button>
            <base-button
              class="btn-info"
              size="sm"
              icon
              round
              @click="showNew = !showNew"
            >
              <i class="fas fa-edit"></i>
            </base-button>
            <base-button
              class="btn-success"
              icon
              size="sm"
              round
              @click="showNew = !showNew"
            >
              <i class="fas fa-edit"></i>
            </base-button>
            <div class="messages-card-textarea-container">
              <span
                class="messages-card-textarea"
                role="textbox"
                contenteditable
                :v-model="message"
              ></span>
            </div>
            <base-button size="sm" icon round class="btn-info">
              <i class="fas fa-paper-plane"></i>
            </base-button>
          </div>
        </div>
      </zoom-center-transition>
    </div>
    <base-button
      class="btn-facebook"
      icon
      round
      id="messages-button-create"
      @click="showNew = !showNew"
    >
      <i class="fas fa-edit"></i>
    </base-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showNew: true,
      showCard: true,
      search: '',
      message: '',
      suggested: [],
      messagesList: [
        {
          id: 1,
          user_id: 1,
          full_name: 'Hiep',
          profile_photo_path:
            'http://localhost:8000/storage/user/default-user-avatar.jpeg',
          online_status: {
            status: true
          },
          content: 'Hello'
        },
        {
          id: 2,
          user_id: 1,
          full_name: 'Hiep',
          profile_photo_path:
            'http://localhost:8000/storage/user/default-user-avatar.jpeg',
          online_status: {
            status: true
          },
          content: 'Hello 11'
        },
        {
          id: 6,
          full_name: 'Hiep',
          profile_photo_path:
            'http://localhost:8000/storage/user/default-user-avatar.jpeg',
          online_status: {
            status: true
          },
          content: 'Hello'
        },
        {
          id: 3,
          full_name: 'Hiep',
          profile_photo_path:
            'http://localhost:8000/storage/user/default-user-avatar.jpeg',
          online_status: {
            status: true
          },
          content: 'Hello 11'
        },
        {
          id: 5,
          user_id: 1,

          full_name: 'Hiep',
          profile_photo_path:
            'http://localhost:8000/storage/user/default-user-avatar.jpeg',
          online_status: {
            status: true
          },
          content: 'Hello'
        },
        {
          id: 4,
          user_id: 1,

          full_name: 'Hiep',
          profile_photo_path:
            'http://localhost:8000/storage/user/default-user-avatar.jpeg',
          online_status: {
            status: true
          },
          content: 'Hello 11'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('thresh', ['thresh']),
    ...mapGetters('user', ['currentUser'])
  },
  methods: {
    onSendMessage() {
      console.log(this.message)
    }
  }
}
</script>

<style lang="scss">
.messages-card-container {
  position: fixed;
  z-index: 1040;
  display: flex;
  bottom: 20px;
  right: 60px;
  height: 500px;

  .messages-card {
    width: 330px;
    height: 500px;
    margin-right: 10px;
    position: relative;
    border: 1px solid;
    border-color: rgba(1, 1, 1, 0.1);
    border-radius: 10px;
    position: relative;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.5s ease-in-out;
    background: #fff;
    & > .ps {
      height: 400px;
      margin-top: 50px;
    }
    &.new {
      & > .ps {
        height: 400px;
        margin-top: 100px;
      }
    }
    &:hover {
      transition: 0.5s ease-in-out;
      transform: translateY(-10px);
    }

    .messages-card-title {
      position: absolute;
      top: 0;
      width: 100%;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      padding: 5px 10px 5px;
      width: 100%;
      border-bottom: solid 1px rgba(1, 1, 1, 0.1);
      z-index: 1050;
      .title {
        display: flex;
        font-weight: bold;
        .time {
          font-weight: 100;
          font-size: 0.8rem;
        }
      }
    }

    .messages-card-content {
      padding: 5px 5px 5px 5px;
    }

    .messages-card-footer {
      position: absolute;
      bottom: 0px;
      width: 100%;
      left: 0px;
      height: 50px;
      display: flex;
      padding: 5px 10px 5px;
      justify-content: flex-end;
      border-top: solid 1px rgba(0, 0, 0, 0.1);
      &.new {
        bottom: auto;
        top: 50px;
        border: none;
      }
      .messages-card-textarea-container {
        position: relative;
        flex: 1;
        margin-left: 10px;
        .messages-card-textarea {
          border: 1px solid #ccc;
          font-family: inherit;
          font-size: 1rem;
          padding: 5px 10px;
          display: block;
          overflow: hidden;
          resize: both;
          min-height: calc(1rem + 10px);
          line-height: calc(1rem + 5px);
        }
        .messages-card-textarea[contenteditable]:empty::before {
          content: 'Aa...';
          // color: gray;
        }
      }
    }
  }

  .messages-search {
  }
}

#messages-button-create {
  position: fixed;
  z-index: 1040;
  bottom: 20px;
  right: 20px;
}
</style>
