import Vue from 'vue'
import { Input, InputNumber, Tooltip, Popover } from 'element-ui'
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */
Vue.component(Input.name, Input)
Vue.component(InputNumber.name, InputNumber)
Vue.use(Tooltip)
Vue.use(Popover)
