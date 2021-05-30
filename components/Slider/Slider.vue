<template>
  <div class="slider">
    <div
      class="slider-wrapper"
      @mouseover="handlePause"
      @mouseleave="handlePause"
    >
      <div class="prev" @click="handlePrev">
        <div class="carousel-ctrl">
          <button class="icon btn">
            <i class="ic-go-left"></i>
          </button>
        </div>
      </div>
      <slider-item
        v-for="(slider, index) in sliders"
        :key="'slider' + index"
        :slider="slider"
        :current-index="currentIndex"
        :index="index"
        :total="sliders.length"
      />
      <slider-item :slider="slider" hide />
      <div class="next" @click="handleNext">
        <div class="carousel-ctrl">
          <button class="icon btn">
            <i class="ic-go-right"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="carousel-nav">
      <div
        v-for="index in sliders.length"
        :key="'nav' + index"
        class="nav-item"
        :class="{ current: index - 1 === currentIndex }"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sliders: {
      type: Array,
      default() {
        return [
          {
            encodeId: '676OF6WA',
            title: '',
            thumbnail:
              'https://photo-resize-zmp3.zadn.vn/w165_r1x1_jpeg/cover/d/6/4/8/d6483c197df34e9e6bdb69d7808a51ce.jpg',
            isoffical: true,
            link: '/album/Dinh-Cao-COLLABS-Various-Artists/676OF6WA.html',
            isIndie: false,
            PR: false,
            playItemMode: 0,
            subType: 1,
            uid: 422,
            thumbnailM:
              'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/d/6/4/8/d6483c197df34e9e6bdb69d7808a51ce.jpg',
            isShuffle: true,
            isPrivate: false,
            userName: 'Zing MP3',
            isAlbum: false,
            textType: 'Playlist',
            isSingle: false,
            banner:
              'https://photo-zmp3.zadn.vn/banner/b/4/c/4/b4c492858069f9af2ea2e24395118b35.jpg',
            cover:
              'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/6/4/8/d6483c197df34e9e6bdb69d7808a51ce.jpg',
            target: '1',
            description: '',
            ispr: 0
          },
          {
            encodeId: 'S76780BA',
            title: '',
            thumbnail:
              'https://photo-resize-zmp3.zadn.vn/w165_r1x1_jpeg/cover/d/c/0/3/dc0326dae0d2332e5400135ef99477d2.jpg',
            isoffical: true,
            link:
              '/album/Cham-Series-Loi-Xin-Loi-Muon-Mang-Various-Artists/S76780BA.html',
            isIndie: false,
            PR: false,
            playItemMode: 2,
            subType: 1,
            uid: 435,
            thumbnailM:
              'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/d/c/0/3/dc0326dae0d2332e5400135ef99477d2.jpg',
            isShuffle: false,
            isPrivate: false,
            userName: 'Zing MP3',
            isAlbum: false,
            textType: 'Playlist',
            isSingle: false,
            banner:
              'https://photo-zmp3.zadn.vn/banner/7/2/b/f/72bf8fb038e4bc910023eb836e6b321c.jpg',
            cover:
              'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/c/0/3/dc0326dae0d2332e5400135ef99477d2.jpg',
            target: '1',
            description: '',
            ispr: 0
          },
          {
            encodeId: 'ZO9E6IA8',
            title: '',
            alias: 'Minh-Anh-Noi-Nay-NIT-Sing',
            isOffical: true,
            username: '',
            artistsNames: 'NIT, Sing',
            artists: [
              {
                id: 'IWZFEEUZ',
                name: 'NIT',
                link: '/nghe-si/NIT',
                spotlight: false,
                cover:
                  'https://photo-zmp3.zadn.vn/cover_artist/9/c/b/5/9cb5ad5836218a3eafc87c0ce43dbd53.jpg',
                thumbnail:
                  'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/6/8/68f228a937c00b644dd6a829afab98eb_1511237564.jpg',
                playlistId: 'Z6BODABE',
                totalFollow: 19045
              },
              {
                id: 'IW69BE7D',
                name: 'Sing',
                link: '/nghe-si/Nguyen-Minh-Thanh',
                spotlight: false,
                cover:
                  'https://zmp3-static.zadn.vn/skins/zmp3-v5.2/images/default_cover.png',
                thumbnail:
                  'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/f/5/4/e/f54e66c47920c24cfc157d2105bf5abf.jpg',
                totalFollow: 1
              }
            ],
            isWorldWide: true,
            thumbnailM:
              'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/3/4/0/8/3408f95533699c03b641ed6eacaeca88.jpg',
            link: '/bai-hat/Minh-Anh-Noi-Nay-NIT-Sing/ZO9E6IA8.html',
            thumbnail:
              'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/3/4/0/8/3408f95533699c03b641ed6eacaeca88.jpg',
            duration: 316,
            isZMA: false,
            zingChoise: false,
            isPrivate: false,
            preRelease: false,
            releaseDate: 1615381200,
            streamingStatus: 1,
            allowAudioAds: true,
            hasLyric: true,
            banner:
              'https://photo-zmp3.zadn.vn/banner/0/1/2/2/012284c470f1e692b6b89296a8aca79e.jpg',
            cover:
              'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/avatars/c/2/3/e/c23e4a6cd5a4e95628ef322de6d6a983.jpg',
            target: '1',
            description: '',
            ispr: 0
          },
          {
            encodeId: '67IZCZUC',
            title: '',
            thumbnail:
              'https://photo-resize-zmp3.zadn.vn/w165_r1x1_jpeg/cover/3/f/d/0/3fd0229f5cf4ef79e652b4821fd0f97b.jpg',
            isoffical: true,
            link: '/album/V-Pop-2021-Nghe-Gi-Various-Artists/67IZCZUC.html',
            isIndie: false,
            PR: false,
            playItemMode: 0,
            subType: 1,
            uid: 422,
            thumbnailM:
              'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/3/f/d/0/3fd0229f5cf4ef79e652b4821fd0f97b.jpg',
            isShuffle: true,
            isPrivate: false,
            userName: 'Zing MP3',
            isAlbum: false,
            textType: 'Playlist',
            isSingle: false,
            banner:
              'https://photo-zmp3.zadn.vn/banner/7/b/3/c/7b3cc839dd0ba23b59e0a21191d472df.jpg',
            cover:
              'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/6/f/2/4/6f24c25c8a4e4ac80af0a94bfcd2dfce.jpg',
            target: '1',
            description: '',
            ispr: 0
          },
          {
            encodeId: 'ZCFDU6D8',
            title: '',
            thumbnail:
              'https://photo-resize-zmp3.zadn.vn/w165_r1x1_jpeg/cover/8/a/5/b/8a5b1ed037d9a8f640b8491eafb9ebd2.jpg',
            isoffical: true,
            link:
              '/album/USUK-Nhung-Ban-Hits-Quoc-Dan-Various-Artists/ZCFDU6D8.html',
            isIndie: false,
            PR: false,
            playItemMode: 0,
            subType: 1,
            uid: 422,
            thumbnailM:
              'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/8/a/5/b/8a5b1ed037d9a8f640b8491eafb9ebd2.jpg',
            isShuffle: true,
            isPrivate: false,
            userName: 'Zing MP3',
            isAlbum: false,
            textType: 'Playlist',
            isSingle: false,
            banner:
              'https://photo-zmp3.zadn.vn/banner/3/b/a/8/3ba874571543d60125974c2672a1747c.jpg',
            cover:
              'https://photo-resize-zmp3.zadn.vn/w94_r1x1_jpeg/cover/d/e/f/9/def9d76db570e5ad28f2ba9b577fe84d.jpg',
            target: '1',
            description: '',
            ispr: 0
          }
        ]
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
      isPause: false,
      slider: this.sliders[0]
    }
  },
  methods: {
    handleNext() {
      if (this.currentIndex < this.sliders.length - 1) {
        this.currentIndex++
      } else {
        this.currentIndex = 0
      }
    },
    handlePrev() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      } else {
        this.currentIndex = this.sliders.length - 1
      }
    },
    autoPlayCarousel(duration) {
      setTimeout(() => {
        if (!this.isPause) {
          this.handleNext()
        }
        this.autoPlayCarousel(duration)
      }, duration)
    },
    handlePause(e) {
      if (e.type === 'mouseover') {
        this.isPause = true
      }
      if (e.type === 'mouseleave') {
        this.isPause = false
      }
    }
  },
  created() {},
  computed: {},
  mounted() {
    this.autoPlayCarousel(5000)
  }
}
</script>

<style lang="scss" scoped>
$cover-width: 41.4%;
$cover-width-m: 70%;
$not-current-cover-scale: 0.85;
$left-cover-transform: translateX(-77%) scale($not-current-cover-scale);
$right-cover-transform: translateX(77%) scale($not-current-cover-scale);
$left-cover-transform-m: translateX(-25%) scale($not-current-cover-scale);
$right-cover-transform-m: translateX(25%) scale($not-current-cover-scale);
.slider {
  background: red;
  .slider-wrapper {
    position: relative;
    user-select: none;
    .prev,
    .next {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: $cover-width;
      // @include media('<medium') {
      //   width: $cover-width-m !important;
      // }
      height: 100%;
      z-index: 7;
      cursor: pointer;
      &:hover {
        .carousel-ctrl .icon {
          opacity: 1 !important;
        }
      }
      .carousel-ctrl {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .icon {
          border-radius: 50%;
          padding: 13px 16px;
          background: #fff2;
          opacity: 0;
          margin: 13px;
          box-shadow: 0 2px 4px 0 rgb(0, 0, 0);
          &:hover {
            opacity: 0.8;
          }
          i {
            font-size: 30px;
            color: #fff;
          }
        }
      }
    }
    .next {
      // @include media('<medium') {
      //   transform: $right-cover-transform-m !important;
      // }
      transform: $right-cover-transform;
      .carousel-ctrl {
        flex-direction: row-reverse;
      }
    }
    .prev {
      transform: $left-cover-transform;
      // @include media('<medium') {
      //   width: $cover-width-m !important;
      // }
    }

    :deep(.item-wrapper) {
      width: $cover-width;
      // @include media('<medium') {
      //   width: $cover-width-m !important;
      // }
      transition: 0.7s;
      &:not(.hidden) {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        transform: translateX(0);
      }
      &.hidden {
        visibility: hidden;
      }
      &.prev {
        // @include media('<medium') {
        //   transform: $left-cover-transform-m !important;
        // }
        transform: $left-cover-transform !important;
        z-index: 5;
      }
      &.next {
        // @include media('<medium') {
        //   transform: $right-cover-transform-m !important;
        // }
        transform: $right-cover-transform !important;
        z-index: 5;
      }
      &.current {
        z-index: 10;
      }
      &:not(.next):not(.prev):not(.current) {
        opacity: 0;
        transform: translateX(0) scale(0.4) !important;
      }
      transform: translateX(0);
      height: auto;
      .slider-card {
        display: inline-block;
        .image > img {
          width: 100%;
          border-radius: 8px;
        }
      }
    }
  }
  .carousel-nav {
    text-align: center;
    margin-top: 14px;
    .nav-item {
      display: inline-block;
      margin: 5px;
      width: 6px;
      height: 6px;
      border-radius: 999px;
      transition: all 0.5s ease-in-out 0.3s;
      background: var(--banner-home-dot);
      &.current {
        width: 24px;
        background: linear-gradient(104deg, #3023ae, #c86dd7 102%);
      }
    }
  }
}
</style>
