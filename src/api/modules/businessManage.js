// 业务管理
import ajax from '@/utils/ajax.js'
export default {
  /*
  *@param {json} options: {} || {data: json}
  */
  /* 请务必注释每个接口所属名称 */
  // 例
  getTest: (options = {}) => ajax.post('/test', options),
  getChannelTerminalMenu: (options = {}) => ajax.post('/getChannelTerminalMenu', options),
  //渠道资源管理模块
  //仓库管理列表
  getStoreList: (options = {}) => ajax.post('/channelResManage/warehouse/page',options),
  //仓库详情查看
  detailStore: (options = {}) => ajax.post('channelResManage/warehouse/detailWare',options),
}