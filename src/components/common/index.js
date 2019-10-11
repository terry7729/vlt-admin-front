import searchBar from './searchBar.vue'; // 搜索框
import pagination from './pagination.vue'; // 分页

const commonComponents = {
  install:function(Vue) {
    Vue.component('searchBar', searchBar)
    Vue.component('pagination', pagination)
  }
}

export default commonComponents;