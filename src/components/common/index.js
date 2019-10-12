import searchBar from './searchBar.vue'; // 搜索框
import pagination from './pagination.vue'; // 分页
import controlBar from './controlBar.vue'; // 页面操作

const commonComponents = {
  install:function(Vue) {
    Vue.component('searchBar', searchBar)
    Vue.component('pagination', pagination)
    Vue.component('controlBar', controlBar)
  }
}

export default commonComponents;