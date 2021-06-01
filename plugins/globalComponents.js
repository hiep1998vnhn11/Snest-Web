import Vue from 'vue'
import {
  Input,
  InputNumber,
  Tooltip,
  Popover,
  Dialog,
  Tabs,
  TabPane
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {
  SlideYDownTransition,
  ZoomCenterTransition,
  SlideYUpTransition
} from 'vue2-transitions'
import VueLazyload from 'vue-lazyload'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

Vue.use(PerfectScrollbar)
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */
Vue.component('slide-y-down-transition', SlideYDownTransition)
Vue.component('zoom-center-transition', ZoomCenterTransition)
Vue.component('slide-y-up-transition', SlideYUpTransition)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})
Vue.component(Input.name, Input)
Vue.component(InputNumber.name, InputNumber)
Vue.use(Dialog)
Vue.use(Popover)
Vue.use(Tabs)
Vue.use(Tooltip)
Vue.use(TabPane)
