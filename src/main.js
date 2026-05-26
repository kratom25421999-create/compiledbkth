import Vue from 'vue'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import './icons'
import './permission'
import './utils/error-log'

import * as filters from './filters'

/**
 * Mock API
 * ใช้เฉพาะ production ตามค่าเดิมของ vue-element-admin
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

/**
 * Element UI
 * ใช้ Cookies.get('size') เพื่อให้ปุ่ม Tt / SizeSelect จำขนาดได้
 */
Vue.use(Element, {
  size: Cookies.get('size') || 'medium',
  locale: enLang
})

/**
 * Global Filters
 */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})