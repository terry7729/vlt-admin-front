import searchBar from './searchBar.vue'; // 搜索框
import tablePaging from './tablePaging.vue'; // 分页
import controlBar from './controlBar.vue'; // 页面操作
import baseInfo from './baseInfo.vue'; // 详情列表
import panel from './panel.vue'; // 展开框
import panelEdit from './panelEdit.vue'; // 展开框-编辑

const commonComponents = {
  install:function(Vue) {
    Vue.component('searchBar', searchBar)
    Vue.component('tablePaging', tablePaging)
    Vue.component('controlBar', controlBar)
    Vue.component('baseInfo', baseInfo)
    Vue.component('panel', panel)
    Vue.component('panelEdit', panelEdit)
  }
}

export default commonComponents;