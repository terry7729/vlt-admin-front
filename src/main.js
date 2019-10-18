import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import commonComponents from './components/common/' // 通用组件引入
import echarts from 'echarts'


Vue.use(commonComponents)
Vue.use(ElementUI)

Vue.directive('prevent', {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 1000)
      }
    })
  }
}),

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
Vue.prototype.$api = api
Vue.prototype.eventBus = new Vue();


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
