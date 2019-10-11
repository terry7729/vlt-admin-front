import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.eventBus = new Vue();


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
