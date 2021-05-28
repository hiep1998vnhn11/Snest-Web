import Vue from 'vue'
import { Input, InputNumber, Tooltip, Popover, Dialog } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */
Vue.component(Input.name, Input)
Vue.component(InputNumber.name, InputNumber)
Vue.use(Dialog)
Vue.use(Tooltip)
Vue.use(Popover)
