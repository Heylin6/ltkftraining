import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './bus.js'
import VueI18n from 'vue-i18n'
import axios from './plugins/axios'
import '@babel/polyfill'
import 'mutationobserver-shim'
import './filters/date.js'
import * as VeeValidate from 'vee-validate'
import 'vee-validate/dist/locale/zh_TW.json'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import './plugins/bootstrap-vue'
import 'vue-axios'

Vue.config.productionTip = false

const _axios = require('axios')
Vue.prototype.$http = _axios

const _vueaxios = require('vue-axios')
Vue.use(_vueaxios, _axios)

const _loading = require('vue-loading-overlay')
Vue.component('Loading', _loading)

const _currencyFilter = require('./filters/currency.js')
Vue.filter('currency', _currencyFilter)

const _dateConvert = require('./filters/date.js')
Vue.filter('date', _dateConvert)

const _zhTWVeeValidate = require('vee-validate/dist/locale/zh_TW')

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zhTW'
})

/* Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    _zhTWVeeValidate
  }
}) 這段寫法也會出錯 */

VeeValidate.localize('zh-TW', _zhTWVeeValidate)

new Vue({
  i18n,
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = 'https://vue-course-api.hexschool.io/api/user/check'
    axios.post(api).then((response: { data: { success: any; }; }) => {
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
