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
  getCenterDeal: (options = {}) => ajax.post('/monitor/deal/central', options),
  // 省级交易数据列表
  getProvinceDeal: (options = {}) => ajax.post('/monitor/deal/province', options),
  // 市级交易数据列表
  getCityDeal: (options = {}) => ajax.post('/monitor/deal/city', options),
  //区域交易数据列表
  getAreaDeal: (options = {}) => ajax.post('/monitor/deal/area', options),
  // 游戏交易数据列表
  getGameDeal: (options = {}) => ajax.post('/monitor/deal/game', options),
  // 销售厅账户监控列表
  getHallAccount: (options = {}) => ajax.post('/monitor/hall/account', options),
  // 销售厅设备统计数据监控列表
  getHallEqData: (options = {}) => ajax.post('/monitor/hall/terminal/count', options),
  // 销售厅设备硬件监控列表
  getHallEqHardware: (options = {}) => ajax.post('/monitor/hall/terminal/hardware', options),
  // 城市游戏风险指标列表
  getGameRiskList: (options = {}) => ajax.post('/game/risk/list', options),
  // 城市游戏风险指标详情
  getGameRiskDetail: (options = {}) => ajax.post('/game/risk/detail', options),
  //城市游戏风险指标删除
  gameRiskDelete: (options = {}) => ajax.post('/game/risk/delete', options),
  //城市游戏风险指标新增   
  gameRiskInsert: (options = {}) => ajax.post('/game/risk/insert', options),
  //城市游戏风险指标新增   
  gameRiskUpdate: (options = {}) => ajax.post('/game/risk/update', options),

  // 奖池风险指标风险指标新增
  pondRiskInsert: (options = {}) => ajax.post('/jackpot/risk/insert', options),
  //奖池风险指标列表
  getPondRiskList: (options = {}) => ajax.post('/jackpot/risk/list', options),
  // 奖池风险指标详情
  getPondRiskDetail: (options = {}) => ajax.post('/jackpot/risk/detail', options),
  //删除奖池风险指标
  pondRiskDelete: (options = {}) => ajax.post('/jackpot/risk/delete', options),
  //删除奖池风险指标
  pondRiskUpdate: (options = {}) => ajax.post('/jackpot/risk/update', options),


  //城市风险指标新增
  cityRiskInsert: (options = {}) => ajax.post('/city/risk/insert', options),
  //城市风险指标删除
  cityRiskDelete: (options = {}) => ajax.post('/city/risk/delete', options),
  //城市风险指标列表
  getCityRiskList: (options = {}) => ajax.post('/city/risk/list', options),
  //城市风险指标详情
  getCityRiskDetail: (options = {}) => ajax.post('/city/risk/detail', options),
  //城市风险指标修改
  cityRiskUpdate: (options = {}) => ajax.post('/city/risk/update', options),
}