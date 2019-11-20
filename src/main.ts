import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import axios from './plugins/axios'
import App from './App.vue'
import router from './router'
import './bus.js'
import VueI18n from 'vue-i18n'
import './filters/currency.js'
import './filters/date.js'
import VeeValidate, { validate } from 'vee-validate'
import 'vee-validate/dist/locale/zh_TW.json'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zhTW'
})

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
