// 导入所有模块路由
import businessManage from './businessManage'
import businessOperation from './businessOperation'
import businessCharts from './businessCharts'
import systemManage from './systemManage'


export default [
  ...businessManage,
  ...businessOperation,
  ...businessCharts,
  ...systemManage
];

