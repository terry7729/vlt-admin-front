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
import Print from "@/utils/print";


Vue.use(commonComponents)
Vue.use(ElementUI)
Vue.use(Print); // 注册

Vue.directive('prevent', {
    inserted(el, binding) {
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
Vue.prototype.timestampToTime = function (timestamp) {
  var date = new Date(timestamp * 1000);   //timestamp 为10位需*1000，timestamp 为13位的话不需乘1000
  var Y = date.getFullYear();
  var M = (date.getMonth()+1 < 10 ? (date.getMonth()+1) : date.getMonth()+1) ;
  var D = (date.getDate() < 10 ? '0'+ date.getDate() : date.getDate()) ;
  var h = (date.getHours() < 10 ? '0'+ date.getHours() : date.getHours()) ;
  var m = (date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes());
  var s = (date.getSeconds() < 10 ? '0'+ date.getSeconds() : date.getSeconds());
  return {Y,M,D,h,m,s};
};

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')