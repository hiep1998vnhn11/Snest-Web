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
import { SlideYDownTransition, ZoomCenterTransition } from 'vue2-transitions'
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */
Vue.component('slide-y-down-transition', SlideYDownTransition)
Vue.component('zoom-center-transition', ZoomCenterTransition)
Vue.component(Input.name, Input)
Vue.component(InputNumber.name, InputNumber)
Vue.use(Dialog)
Vue.use(Popover)
Vue.use(Tabs)
Vue.use(Tooltip)
Vue.use(TabPane)
