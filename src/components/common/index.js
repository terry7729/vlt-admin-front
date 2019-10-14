import searchBar from './searchBar.vue'; // 搜索框
import tablePaging from './tablePaging.vue'; // 分页
import controlBar from './controlBar.vue'; // 页面操作
import baseInfo from './baseInfo.vue'; // 详情列表
import cell from './cell.vue'; // 无伸缩框
import panel from './panel.vue'; // 展开框
import panelEdit from './panelEdit.vue'; // 展开框-编辑
import tipsLine from './tipsLine.vue'; // 提示条
import baseForm from './baseForm.vue'; // 基础表单
import tableRowStatus from './tableRowStatus.vue'; // 表格行状态

const commonComponents = {
  install:function(Vue) {
    Vue.component('searchBar', searchBar)
    Vue.component('tablePaging', tablePaging)
    Vue.component('controlBar', controlBar)
    Vue.component('baseInfo', baseInfo)
    Vue.component('cell', cell)
    Vue.component('panel', panel)
    Vue.component('panelEdit', panelEdit)
    Vue.component('tipsLine', tipsLine)
    Vue.component('baseForm', baseForm)
    Vue.component('tableRowStatus', tableRowStatus)
  }
}

export default commonComponents;