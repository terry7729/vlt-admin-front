// 左侧导航mock数据
import businessManage from './businessManage'
import businessOperation from './businessOperation'
import businessCharts from './businessCharts'
import systemManage from './systemManage'
export default {
  
 "code": "0",
  /*
      @id: 1=>业务管理，2=>业务运营，3=>业务监控 4=>系统管理
    */
  // 业务管理系统
  '1': {
    "content": businessManage
  },

  // 业务运营系统
  '2': {
    "content": businessOperation
  },
  // 业务监控系统
  '3': {
    "content": businessCharts
  },
  // 系统管理系统
  '4': {
    "content": systemManage
  },
  
  // 大数据分析系统

  // 外部监控系统

  // 技术运行监控系统

  // 业务报表系统

  

}