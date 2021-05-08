import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins'
import '@/common/public.scss'
import moment from 'moment'
import Vconsole from 'vconsole'
// eslint-disable-next-line no-new
new Vconsole()
Vue.config.productionTip = false
Vue.filter('date', function (input, fmtstring = 'YYYY-MM-DD HH:mm:ss') { // 当input为时间戳，需转为Number类型
  if (input) {
    return moment(input).format(fmtstring)
  } else {
    return ''
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
