import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import  Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://www.youbian.link/api/v2';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios//替代了vue.use
Vue.use(VueAwesomeSwiper)
Vue.use(Mint)
//Vue.use(axios)
new Vue({
  router,
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
