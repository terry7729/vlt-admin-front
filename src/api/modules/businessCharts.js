// 业务监控
import ajax from '@/utils/ajax.js'
export default {
  /*
  *@param {json} options: {} || {data: json}
  */
  /* 请务必注释每个接口所属名称 */
  // 例
  getTest: (options = {}) => ajax.post('/test', options),
  // 中央交易数据列表
  getCenterDeal:(options={})=>ajax.post('monitor/deal/central',options)
}