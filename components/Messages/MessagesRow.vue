<template>
  <div class="message-row" :class="{ 'is-current': isCurrent }">
    <div>
      <base-avatar outlined :size="25" alt="avt" v-if="!isCurrent">
      </base-avatar>
    </div>
    <div class="message-row-content-cover">
      <div class="message-row-content-container">
        <div class="message-row-content" :class="{ 'is-current': isCurrent }">
          <div
            v-html="message.content"
            class="message-row-content__pre-line"
          ></div>
          <div v-if="message.media">
            <img
              v-if="types[message.media_type]"
              v-lazy="message.media"
              :class="{ 'is-card': isCard }"
            />
            <a :href="message.media" target="_blank" v-else>
              {{ message.media_name }}
            </a>
          </div>
          <div
            class="message-row-content-button"
            :class="{
              'is-current': isCurrent
            }"
          >
            <base-button icon round type="success" size="sm">
              <i class="tim-icons icon-sound-wave"></i>
            </base-button>
          </div>
        </div>

        <div class="spacer"></div>
      </div>
      <div class="message-row-content-time">
        {{ message.updated_at | relativeTime }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: Object,
      default() {
        return {
          content: ''
        }
      }
    },
    isCurrent: {
      type: Boolean,
      default: false
    },
    isCard: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      types: {
        png: 1,
        gif: 1,
        jpg: 1,
        jpeg: 1,
        svg: 1
      }
    }
  },
  methods: {},
  created() {},
  computed: {},
  mounted() {}
}
</script>
<style lang="scss">
.message-row {
  display: flex;
  width: 100%;
  height: 100%;
  word-wrap: break-word;
  &.is-current {
    flex-direction: row-reverse;
  }

  .message-row-content-cover {
    overflow-x: hidden;
    .message-row-content-container {
      flex: 1;
      display: flex;
      max-width: 100%;
      padding: 3px 8px 3px 8px;

      .message-row-content {
        border-radius: 10px;
        border: solid 1px rgba(0, 0, 0, 0.1);
        background: whitesmoke;
        padding: 7px 15px 7px 15px;
        word-wrap: break-word;
        max-width: 100%;
        position: relative;

        .message-row-content__pre-line {
          white-space: pre-line;
        }

        img {
          border-radius: 5px;
          max-width: 300px;
          margin-top: 10px;
          border: solid 1px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          &.is-card {
            max-width: 100%;
          }
        }

        &.is-current {
          background: #2a8fff !important;
          color: #d4eaff !important;
          text-align: right;
        }
        .message-row-content-button {
          position: absolute;
          top: 50%;
          right: -10px;
          transform: translateY(-50%);
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          z-index: 1113;
          &.is-current {
            right: auto;
            left: -10px;
          }
        }

        &:hover {
          .message-row-content-button {
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
          }
        }
      }
      .spacer {
        flex: 1;
      }
    }
    .message-row-content-time {
      transition: opacity 0.5s ease-in-out;
      display: none;
      opacity: 0;
    }

    &:hover {
      .message-row-content-time {
        transition: opacity 0.5s ease-in-out;
        display: block;
        opacity: 1;
      }
    }
  }
}
</style>
