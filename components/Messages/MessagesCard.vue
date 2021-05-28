<template>
  <div>
    <div class="messages-card-container">
      <zoom-center-transition :duration="200" mode="out-in">
        <card class="messages-card" v-if="showNew">
          <div class="messages-card-title">
            <h5 class="title">
              Card header
            </h5>
            <i
              class="fas fa-times"
              style="cursor:pointer"
              @click="showNew = false"
            ></i>
          </div>
          {{ $t('To:') }}
          <base-input v-model="search"> </base-input>
          <hr />
          <div class="messages-card-content">
            te
          </div>
        </card>
      </zoom-center-transition>

      <zoom-center-transition :duration="200" mode="out-in">
        <card class="messages-card" v-show="false">
          <div class="messages-card-title">
            <div class="title">
              <base-avatar
                :src="currentUser.profile_photo_path"
                outlined
                alt="avatar"
              >
              </base-avatar>
              {{ currentUser.firstName }} {{ currentUser.lastName }}
            </div>
            <i
              class="fas fa-times"
              style="cursor:pointer"
              @click="showNew = false"
            ></i>
          </div>
          <div class="messages-card-content">
            te
          </div>
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
        </card>
      </zoom-center-transition>
    </div>
    <base-button
      class="btn-facebook"
      icon
      round
      id="messages-button-create"
      @click="onSendMessage"
    >
      <i class="fas fa-edit"></i>
    </base-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ZoomCenterTransition } from 'vue2-transitions'

export default {
  components: {
    ZoomCenterTransition
  },
  data() {
    return {
      showNew: false,
      search: '',
      message: '',
      suggested: []
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
  background: green;
  height: 500px;

  .messages-card {
    width: 330px;
    height: 500px;
    margin-right: 10px;
    position: relative;
    border: 1px solid;
    border-color: rgba(1, 1, 1, 0.1);
    border-radius: 10px;
    background: orange;
    position: relative;

    .messages-card-title {
      position: absolute;
      top: 0;
      width: 100%;
      left: 0;
      display: flex;
      justify-content: space-between;
      height: 50px;
      padding: 5px 10px 5px;

      .title {
        font-size: 1.1rem;
      }
    }
    .messages-card-content {
      position: absolute;
      overflow-y: hidden;
      left: 0;
      top: 50px;
      width: 100%;
      height: 400px;
      background: red;
      padding: 5px;

      &:hover {
        overflow-y: auto;
      }
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
      .messages-card-textarea-container {
        position: relative;
        width: 200px;
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
