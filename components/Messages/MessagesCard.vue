<template>
  <div>
    <div class="messages-card-container">
      <zoom-center-transition :duration="200" mode="out-in">
        <card class="messages-card" v-if="showNew">
          <div class="flex-sb">
            <h5 slot="card-header" class="title">
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
        <card class="messages-card">
          <div class="flex-sb">
            <h5 slot="card-header" class="title">
              Hiệp Tran
            </h5>
            <i
              class="fas fa-times"
              style="cursor:pointer"
              @click="showNew = false"
            ></i>
          </div>
          <hr />
          <div class="messages-card-content">
            te
          </div>
          <div class="messages-card-footer">
            Footer
          </div>
        </card>
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
import { ZoomCenterTransition } from 'vue2-transitions'

export default {
  components: {
    ZoomCenterTransition
  },
  data() {
    return {
      showNew: false,
      search: '',
      suggested: []
    }
  },
  computed: {
    ...mapGetters('thresh', ['thresh'])
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

  .messages-card {
    width: 350px;
    height: 500px;
    margin-right: 10px;
    position: relative;
    .messages-card-content {
      position: absolute;
      left: 0;
      width: 100%;
      background: red;
    }

    .messages-card-footer {
      position: relative;
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
