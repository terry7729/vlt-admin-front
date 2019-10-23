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
  getCenterDeal:(options={})=>ajax.post('monitor/deal/central',options),
  // 省级交易数据列表
  getProvinceDeal:(options={})=>ajax.post('monitor/deal/province',options),
  // 市级交易数据列表
  getCityDeal:(options={})=>ajax.post('monitor/deal/city',options),
  //区域交易数据列表
  getAreaDeal: (options = {}) => ajax.post('monitor/deal/area', options),
  // 游戏交易数据列表
  getGameDeal:(options={})=>ajax.post('monitor/deal/game',options),
  // 销售厅账户监控列表
  getHallAccount:(options={})=>ajax.post('monitor/hall/account',options),
  // 销售厅设备统计数据监控列表
  getHallEqData:(options={})=>ajax.post('monitor/hall/terminal/count',options),
   // 销售厅设备硬件监控列表
   getHallEqHardware:(options={})=>ajax.post('monitor/hall/terminal/hardware',options),
   // 城市游戏风险指标详情
   getGameRiskDetail:(options={})=>ajax.post('game/risk/detail',options)
}