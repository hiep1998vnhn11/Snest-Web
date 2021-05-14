<template>
  <div class="call-container">
    <v-btn
      v-if="removed"
      class="button-return-back"
      icon
      large
      text
      @click="onReturnBack"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <message-card v-if="chat" />
    <div ref="video-call" class="video-call">
      <!-- <video ref="video-me" class="my-video"></video> -->
      <video ref="video-me" autoplay playsinline class="my-video"></video>
      <!-- Calling temblade -->
      <div class="calling-container">
        <div class="calling-card text-center">
          <v-avatar size="120" class="avatar-outlined">
            <img :src="calling.user.profile_photo_path" />
          </v-avatar>
          <h2 v-if="calling">{{ calling.user.name }}</h2>
          <div class="calling-text-icon" v-if="isCalling">
            <span class="white--text">{{ $t('Calling') }}</span>
            <div class="spinner">
              <div class="double-bounce1"></div>
              <div class="double-bounce2"></div>
            </div>
          </div>
          <h2 v-else-if="removed">
            {{ $t('Call was canceled! Recall now!') }}
          </h2>
          <h2 v-else>
            {{ calling.user.name }} {{ $t('RefuseYourCallYouWantReCall') }}
          </h2>
        </div>
      </div>
      <video ref="video-guest" class="other-video" v-if="!removed"></video>
      <video ref="video-host" class="other-video" v-if="!removed"></video>
    </div>
    <div class="call-actions">
      <div class="call-action-chat">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="grey lighten-3"
              color="dark"
              icon
              x-large
              v-bind="attrs"
              v-on="on"
              @click="chat = !chat"
            >
              <v-icon>
                {{ chat ? 'mdi-chat-remove-outline' : 'mdi-chat-outline' }}
              </v-icon>
            </v-btn>
          </template>
          <span>{{ chat ? $t('CloseChat') : $t('OpenChat') }}</span>
        </v-tooltip>
      </div>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            text
            class="grey lighten-3"
            color="dark"
            x-large
            @click="changeVideo"
          >
            <v-icon>{{ video ? 'mdi-camcorder' : 'mdi-camcorder-off' }}</v-icon>
          </v-btn>
        </template>
        <span>{{ video ? $t('TurnOffCamera') : $t('TurnOnCamera') }}</span>
      </v-tooltip>

      <v-tooltip top v-if="isCalling">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            width="70"
            height="70"
            class="danger mx-3"
            @click="onTurnOffCall"
          >
            <v-icon>mdi-phone-cancel</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('EndCall') }}</span>
      </v-tooltip>
      <v-tooltip top v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            width="70"
            height="70"
            class="success mx-3"
            @click="onTurnOnBackCall"
          >
            <v-icon>mdi-phone</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('ReCall') }}</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="grey lighten-3"
            color="dark"
            v-bind="attrs"
            v-on="on"
            icon
            x-large
            @click="changeAudio"
          >
            <v-icon>
              {{ audio ? 'mdi-microphone' : 'mdi-microphone-off' }}
            </v-icon>
          </v-btn>
        </template>
        <span> {{ audio ? 'TurnOffMicro' : 'TurnOnMicro' }} </span>
      </v-tooltip>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import Peer from 'peerjs'
const Peer = {}
window.Peer = {}

export default {
  middleware: 'checkV4',
  data() {
    return {
      video: true,
      audio: true,
      myVideo: true,
      guestVideo: false,
      hostVideo: false,
      connections: [],
      remotePeer: [],
      peers: [],
      peer: null,
      myPeer: null,
      removed: false,
      isRefuse: false,
      isCalling: true,
      answer: false,
      video: true,
      audio: true,
      chat: false,
      stream: false
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.peer && !this.peer.disconnected) this.peer.destroy()
    if (this.stream) this.onCloseVideo()
    if (this.calling) this.$store.commit('message/SET_CALLING_USER', null)
    window.socket.emit('remove-call', this.$route.params.call_id)
    return next()
  },
  methods: {
    async connect() {
      window.socket.on('call_not_found', call_id => {
        this.$router.push(this.localePath({ name: 'index' }))
      })
      window.socket.on('user-leave', ({ user_id }) => {
        const peerLeave = this.peers.find(peer => peer.peer_id === user_id)
        if (peerLeave && peerLeave.call) {
          peerLeave.call.close()
          this.peers = this.peers.filter(
            peer => peer.peer_id !== peerLeave.peer_id
          )
        }
      })
      window.socket.on('remove-call', () => {
        // this.$router.push('/')
      })
      window.socket.on('people-refuse-call', ({ user_id, call_id }) => {
        this.$store.commit('message/SET_CALLING_STATUS', 'refused')
        if (call_id === this.$route.params.call_id) {
          this.isRefuse = true
          this.isCalling = false
        }
      })

      const myVideo = this.$refs['video-me']
      myVideo.muted = true
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      this.addVideoStream(myVideo, stream)
      this.peer.on('call', call => {
        call.answer(stream)
        const hostVideo = this.$refs['video-host']
        call.on('stream', userVideoStream => {
          this.addVideoStream(hostVideo, userVideoStream)
        })
      })
      window.socket.on('user-join', ({ user_id, peer_id }) => {
        console.log(`an user ${user_id} join this room with ${peer_id}`)
        this.connectToNewUser(peer_id, stream)
      })
    },
    addVideoStream(video, stream) {
      video.srcObject = stream
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
    },
    connectToNewUser(userPeerId, stream) {
      const vm = this
      const call = this.peer.call(userPeerId, stream)
      this.peers.push({ peer_id: userPeerId, call })
      const guestVideo = this.$refs['video-guest']
      call.on('stream', userVideoStream => {
        vm.addVideoStream(guestVideo, userVideoStream)
      })
      call.on('close', () => {
        guestVideo.remove()
        vm.guestVideo = false
      })
    },
    createPeer() {
      // tạo 1 peer với id đúng bằng user.id
      if (this.peer && this.peer.disconnected) {
        this.peer.reconnect()
        return
      }
      this.peer = new Peer(undefined, {
        host: process.env.NUXT_ENV_PEER_HOST,
        port: process.env.NUXT_ENV_PEER_PORT
      })
      //local peer id
      this.peer.on('open', id => {
        // Sau khi peer open, push id của peer vào remotePeer
        this.remotePeer.push(id)
        window.socket.emit('join-call', {
          peer_id: id,
          call_id: this.$route.params.call_id,
          user_id: this.currentUser.id
        })
      })
      this.peer.on('connection', conn => {
        console.log(conn)
      })
      this.peer.on('error', err => {
        this.$nuxt.error(err)
      })
    },
    changeVideo() {
      //change video is enable or not
      this.video = !this.video
      const myVideoTrack = this.$refs['video-me'].srcObject.getVideoTracks()
      myVideoTrack[0].enabled = this.video
    },
    changeAudio() {
      //change video is enable or not
      this.audio = !this.audio
      const myAudioTrack = this.$refs['video-me'].srcObject.getAudioTracks()
      myAudioTrack[0].enabled = this.audio
    },
    onCloseVideo() {
      this.stream.getTracks().forEach(track => {
        track.stop()
      })
    },

    onTurnOffCall() {
      this.peer.disconnect()
      window.socket.emit('end-call', {
        user_id: this.calling.user.id,
        call_id: this.$route.params.call_id,
        peer_id: this.myPeer
      })
      window.socket.emit('cancel-call', {
        user_id: this.calling.user.id,
        call_id: this.calling.call_id
      })
      this.$refs['video-host'].remove()
      this.isCalling = false
      this.removed = true
    },
    onTurnOnBackCall() {
      this.peer.reconnect()
      const user = {
        id: this.currentUser.id,
        profile_photo_path: this.currentUser.profile_photo_path,
        name: this.currentUser.name
      }
      window.socket.emit('calling', {
        user_id: this.calling.user.id,
        user,
        call_id: this.$route.params.call_id
      })
      this.$store.commit('message/SET_CALLING_STATUS', 'calling')
      this.removed = false
      this.isCalling = true
    },
    onReturnBack() {
      this.peer.destroy()
      this.onCloseVideo()
      this.$store.commit('message/SET_CALLING_USER', null)
      window.socket.emit('remove-call', this.$route.params.call_id)
      this.$router.push('/')
    }
  },
  mounted() {
    this.createPeer()
    this.connect()
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
    ...mapGetters('message', ['thresh', 'calling'])
  }
}
</script>
<style lang="scss" scoped>
.call-container {
  position: fixed;
  z-index: 9999;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: linear-gradient(60deg, #1a5cff, #f904fe);

  .button-return-back {
    position: absolute;
    top: 2%;
    left: 2%;
    z-index: 1002;
  }
  .video-call {
    position: relative;
    display: flex;
    padding: 20px;
    justify-content: center;
    align-items: center;
    height: 100%;
    .other-video {
      position: absolute;
      align-items: center;
      max-height: 100%;
      max-width: 100%;
      height: 100%;
      z-index: 2;
    }
    .my-video {
      position: absolute;
      top: 2%;
      right: 2%;
      width: 300px;
      border-radius: 15px;
      border: thin 1px;
      z-index: 100;
    }
    .calling-container {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      z-index: 1;

      .calling-card {
        .calling-avatar-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .calling-text-icon {
          display: flex;
          justify-content: center;
          align-items: center;
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
      h2 {
        color: white;
        font-size: 2rem;
      }
      .spinner {
        width: 40px;
        height: 40px;
        position: relative;
        margin: 20px;
      }
      .double-bounce1 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #333;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-animation: sk-bounce 2s infinite ease-in-out;
        animation: sk-bounce 2s infinite ease-in-out;
      }
      .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #333;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-animation: sk-bounce 2s infinite ease-in-out;
        animation: sk-bounce 2s infinite ease-in-out;
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
      }
    }
  }

  .call-actions {
    position: absolute;
    width: 100%;
    bottom: 0px;
    display: flex;
    padding: 40px;
    z-index: 99;
    justify-content: center;
    align-items: center;
    .call-action-chat {
      position: absolute;
      left: 40px;
    }
  }
}

video {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>
