export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Snest',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css'
      }
    ],
    bodyAttrs: {
      class: 'white-content'
    }
  },
  router: {
    linkExactActiveClass: 'active',
    middleware: 'fetchUser'
  },

  loading: { color: 'blue' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'assets/css/demo.css',
    'assets/css/nucleo-icons.css',
    'assets/sass/black-dashboard.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/dashboard-plugin',
    '~/plugins/axios',
    {
      src: '~/plugins/facebook',
      ssr: false
    },
    {
      src: '~/plugins/google',
      ssr: false
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-i18n', '@nuxtjs/axios', 'cookie-universal-nuxt'],

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js'
      },
      {
        code: 'vi',
        file: 'vi.js'
      },
      {
        code: 'ja',
        file: 'ja.js'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'vi'
  },
  axios: {
    baseURL: process.env.NUXT_ENV_API_URL // Used as fallback if no runtime config is provided
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  loadingIndicator: {
    name: 'circle',
    color: 'purple'
  }
}
