import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import axios from 'axios'
import Vuelidate from 'vuelidate'
import Toasted from 'vue-toasted'
Vue.use(Vuelidate)
Vue.use(Toasted)

axios.defaults.baseURL = 'https://api.spracto.net:443'
axios.defaults.headers.get['Accepts'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
