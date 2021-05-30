<template>
  <div class="">
    <h3 class="carousel-title">
      <span>{{ title }}</span>
      <div class="controls">
        <button @click="handlePrev" :class="0 === current ? 'disabled' : null">
          <i class="ic-go-left"></i>
        </button>
        <button
          @click="handleNext"
          :class="maxCount - 1 <= current ? 'disabled' : null"
        >
          <i class="ic-go-right"></i>
        </button>
      </div>
    </h3>
    <div class="carousel" ref="carousel">
      <card-carousel
        v-for="(item, index) in items"
        :key="'item' + index"
        :detail="item"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return [
          {
            encodeId: 'ZUOF8ZCU',
            title: 'Song Ca Bolero Hay Nhất',
            thumbnail:
              'https://photo-resize-zmp3.zadn.vn/w165_r1x1_jpeg/cover/9/e/a/7/9ea777f8ba91ef1b53ebb67eb0dec243.jpg',
            isoffical: true,
            link:
              '/album/Song-Ca-Bolero-Hay-Nhat-Various-Artists/ZUOF8ZCU.html',
            isIndie: false,
            PR: false,
            playItemMode: 0,
            subType: 1,
            uid: 133,
            thumbnailM:
              'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/9/e/a/7/9ea777f8ba91ef1b53ebb67eb0dec243.jpg',
            isShuffle: true,
            isPrivate: false,
            userName: 'Zing MP3',
            isAlbum: false,
            textType: 'Playlist',
            isSingle: false
          },
          {
            encodeId: 'ZOE8IUZ0',
            title: 'Tuyệt Phẩm Song Ca Bolero Trữ Tình',
            thumbnail:
              'https://photo-resize-zmp3.zadn.vn/w165_r1x1_jpeg/cover/1/e/9/b/1e9b2b1f463d000634e435927fe776b0.jpg',
            isoffical: true,
            link:
              '/album/Tuyet-Pham-Song-Ca-Bolero-Tru-Tinh-Various-Artists/ZOE8IUZ0.html',
            isIndie: false,
            PR: false,
            playItemMode: 0,
            subType: 1,
            uid: 133,
            thumbnailM:
              'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/1/e/9/b/1e9b2b1f463d000634e435927fe776b0.jpg',
            isShuffle: true,
            isPrivate: false,
            userName: 'Zing MP3',
            isAlbum: false,
            textType: 'Playlist',
            isSingle: false
          },
          {
            encodeId: 'ZWZAZEBC',
            title: 'Những Bản Nhạc Sàn Hay Nhất Mọi Thời Đại',
            thumbnail:
              'https://photo-resize-zmp3.zadn.vn/w165_r1x1_jpeg/cover/c/0/1/d/c01d890d35590f1a2c7dcfe3bf4a19e7.jpg',
            isoffical: true,
            link:
              '/album/Nhung-Ban-Nhac-San-Hay-Nhat-Moi-Thoi-Dai-Various-Artists/ZWZAZEBC.html',
            isIndie: false,
            PR: false,
            playItemMode: 0,
            subType: 1,
            uid: 0,
            thumbnailM:
              'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/c/0/1/d/c01d890d35590f1a2c7dcfe3bf4a19e7.jpg',
            isShuffle: true,
            isPrivate: false,
            userName: 'Zing MP3',
            isAlbum: false,
            textType: 'Playlist',
            isSingle: false,
            zoneid: '1258648553236426378',
            type: 'nativeAd'
          },
          {
            encodeId: 'ZOUODF0W',
            title: 'Trữ Tình Song Ca Hay Nhất',
            thumbnail:
              'https://photo-resize-zmp3.zadn.vn/w165_r1x1_jpeg/cover/a/6/f/1/a6f16bd1c30890f7e0a981bc9e26263a.jpg',
            isoffical: true,
            link:
              '/album/Tru-Tinh-Song-Ca-Hay-Nhat-Various-Artists/ZOUODF0W.html',
            isIndie: false,
            PR: false,
            playItemMode: 0,
            subType: 1,
            uid: 88,
            thumbnailM:
              'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/a/6/f/1/a6f16bd1c30890f7e0a981bc9e26263a.jpg',
            isShuffle: true,
            isPrivate: false,
            userName: 'Zing MP3',
            isAlbum: false,
            textType: 'Playlist',
            isSingle: false
          },
          {
            encodeId: 'ZWZCOZCF',
            title: 'Bolero Hay Nhất',
            thumbnail:
              'https://photo-resize-zmp3.zadn.vn/w165_r1x1_jpeg/cover/7/d/1/2/7d127bbea5281b83d9be485bdc99914e.jpg',
            isoffical: true,
            link: '/album/Bolero-Hay-Nhat-Various-Artists/ZWZCOZCF.html',
            isIndie: false,
            PR: false,
            playItemMode: 0,
            subType: 1,
            uid: 0,
            thumbnailM:
              'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/7/d/1/2/7d127bbea5281b83d9be485bdc99914e.jpg',
            isShuffle: true,
            isPrivate: false,
            userName: 'Zing MP3',
            isAlbum: false,
            textType: 'Playlist',
            isSingle: false
          },
          {
            encodeId: 'ZOE6F9I8',
            title: 'Tình Khúc Bolero Bất Hủ',
            thumbnail:
              'https://photo-resize-zmp3.zadn.vn/w165_r1x1_jpeg/cover/f/7/a/8/f7a86887d3a81dc57f411154cf52d745.jpg',
            isoffical: true,
            link:
              '/album/Tinh-Khuc-Bolero-Bat-Hu-Various-Artists/ZOE6F9I8.html',
            isIndie: false,
            PR: false,
            playItemMode: 0,
            subType: 1,
            uid: 133,
            thumbnailM:
              'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/f/7/a/8/f7a86887d3a81dc57f411154cf52d745.jpg',
            isShuffle: true,
            isPrivate: false,
            userName: 'Zing MP3',
            isAlbum: false,
            textType: 'Playlist',
            isSingle: false
          },
          {
            encodeId: 'ZOEB99OF',
            title: 'Thao Thức Vì Em - Tuyệt Phẩm Bolero',
            thumbnail:
              'https://photo-resize-zmp3.zadn.vn/w165_r1x1_jpeg/cover/2/a/8/6/2a868b94348574acdece7d3dab730ce1.jpg',
            isoffical: true,
            link:
              '/album/Thao-Thuc-Vi-Em-Tuyet-Pham-Bolero-Various-Artists/ZOEB99OF.html',
            isIndie: false,
            PR: false,
            playItemMode: 0,
            subType: 1,
            uid: 133,
            thumbnailM:
              'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/2/a/8/6/2a868b94348574acdece7d3dab730ce1.jpg',
            isShuffle: true,
            isPrivate: false,
            userName: 'Zing MP3',
            isAlbum: false,
            textType: 'Playlist',
            isSingle: false
          },
          {
            encodeId: 'ZUU97IAB',
            title: 'The Best Of Bolero',
            thumbnail:
              'https://photo-resize-zmp3.zadn.vn/w165_r1x1_jpeg/cover/d/3/3/1/d3310ad4b327ba7376372b27aceb84c0.jpg',
            isoffical: true,
            link: '/album/The-Best-Of-Bolero-Various-Artists/ZUU97IAB.html',
            isIndie: false,
            PR: false,
            playItemMode: 0,
            subType: 1,
            uid: 133,
            thumbnailM:
              'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/d/3/3/1/d3310ad4b327ba7376372b27aceb84c0.jpg',
            isShuffle: true,
            isPrivate: false,
            userName: 'Zing MP3',
            isAlbum: false,
            textType: 'Playlist',
            isSingle: false
          },
          {
            encodeId: '60CICBI7',
            title: 'Bolero 50: Zing Choice',
            thumbnail:
              'https://photo-resize-zmp3.zadn.vn/w165_r1x1_jpeg/cover/8/5/b/d/85bd6e33fd376483bc3d4e1e4b270cce.jpg',
            isoffical: true,
            link: '/album/Bolero-50-Zing-Choice-Various-Artists/60CICBI7.html',
            isIndie: false,
            PR: false,
            playItemMode: 0,
            subType: 1,
            uid: 435,
            thumbnailM:
              'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/8/5/b/d/85bd6e33fd376483bc3d4e1e4b270cce.jpg',
            isShuffle: true,
            isPrivate: false,
            userName: 'Zing MP3',
            isAlbum: false,
            textType: 'Playlist',
            isSingle: false
          },
          {
            encodeId: '67IZCUUF',
            title: 'Nhạc Việt Nghe Nhiều 2021',
            thumbnail:
              'https://photo-resize-zmp3.zadn.vn/w165_r1x1_jpeg/cover/4/8/7/7/48777810a5a68c5ffa2d95aa369f7a06.jpg',
            isoffical: true,
            link:
              '/album/Nhac-Viet-Nghe-Nhieu-2021-Various-Artists/67IZCUUF.html',
            isIndie: false,
            PR: false,
            playItemMode: 0,
            subType: 1,
            uid: 422,
            thumbnailM:
              'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/4/8/7/7/48777810a5a68c5ffa2d95aa369f7a06.jpg',
            isShuffle: true,
            isPrivate: false,
            userName: 'Zing MP3',
            isAlbum: false,
            textType: 'Playlist',
            isSingle: false
          }
        ]
      }
    },
    title: {
      type: String,
      default: 'Carousel'
    }
  },
  data() {
    return {
      carousel: {},
      current: 0,
      maxCount: Math.ceil(this.items.length / 5)
    }
  },
  methods: {
    handleNext() {
      if (this.maxCount > this.current.value + 1) this.current.value++
    },
    handlePrev() {
      if (this.current.value > 0) this.current.value--
    }
  },
  watch: {},
  created() {},
  computed: {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.carousel {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap !important;
  scroll-behavior: smooth;
  overflow: hidden;
  margin: 0 -15px;
  & > :deep(div) {
    width: calc(100% / 6);
    transition: width 0.3s;
    flex-shrink: 0;
    padding: 0 15px;
  }
}
.carousel-title {
  margin-top: 20px;
  display: flex;
  margin-bottom: 13px;
  font-weight: bold;
  font-size: 18px;
  .controls {
    margin-left: auto;
    button {
      background: transparent;
      outline: none;
      border: none;
      cursor: pointer;
      &.disabled {
        opacity: 0.1;
      }
      i {
        font-size: 17px;
      }
      &:last-child {
        margin-left: 12px;
      }
    }
  }
}
</style>
