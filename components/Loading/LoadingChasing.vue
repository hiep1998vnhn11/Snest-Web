<template>
  <slide-y-down-transition>
    <div class="chasing-loading-container" v-if="loading">
      <div class="chasing-spinner">
        <div class="dot1"></div>
        <div class="dot2"></div>
      </div>
    </div>
  </slide-y-down-transition>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.chasing-loading-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-clip: border-box;
  .chasing-spinner {
    width: 40px;
    height: 40px;
    position: relative;
    text-align: center;
    -webkit-animation: sk-rotate 2s infinite linear;
    animation: sk-rotate 2s infinite linear;

    .dot1,
    .dot2 {
      width: 60%;
      height: 60%;
      display: inline-block;
      position: absolute;
      top: 0;
      background-color: #d350d9;
      border-radius: 100%;

      -webkit-animation: sk-bounce 2s infinite ease-in-out;
      animation: sk-bounce 2s infinite ease-in-out;
    }

    .dot2 {
      top: auto;
      bottom: 0;
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }

    @-webkit-keyframes sk-rotate {
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes sk-rotate {
      100% {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
      }
    }

    @-webkit-keyframes sk-bounce {
      0%,
      100% {
        -webkit-transform: scale(0);
      }
      50% {
        -webkit-transform: scale(1);
      }
    }

    @keyframes sk-bounce {
      0%,
      100% {
        transform: scale(0);
        -webkit-transform: scale(0);
      }
      50% {
        transform: scale(1);
        -webkit-transform: scale(1);
      }
    }
  }
}
</style>
