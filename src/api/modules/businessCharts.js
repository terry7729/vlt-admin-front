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
  getCenterDeal: (options = {}) => ajax.post('/monitor/deal/central', {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  // 省级交易数据列表
  getProvinceDeal: (options = {}) => ajax.post('/monitor/deal/province',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  // 市级交易数据列表
  getCityDeal: (options = {}) => ajax.post('/monitor/deal/city',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  //区域交易数据列表
  getAreaDeal: (options = {}) => ajax.post('/monitor/deal/area',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  // 游戏交易数据列表
  getGameDeal: (options = {}) => ajax.post('/monitor/deal/game',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  //导出中央交易数据
  dealExport: (options = {}) => ajax.post('/export/deal/central',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  // 销售厅账户监控列表
  getHallAccount: (options = {}) => ajax.post('/monitor/hall/account',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  // 销售厅设备统计数据监控列表
  getHallEqData: (options = {}) => ajax.post('/monitor/hall/terminal/count',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  // 销售厅设备硬件监控列表
  getHallEqHardware: (options = {}) => ajax.post('/monitor/hall/terminal/hardware',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  // 城市游戏风险指标列表
  getGameRiskList: (options = {}) => ajax.post('/game/risk/list',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  // 城市游戏风险指标详情
  getGameRiskDetail: (options = {}) => ajax.post('/game/risk/detail',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  //城市游戏风险指标删除
  gameRiskDelete: (options = {}) => ajax.post('/game/risk/delete',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  //城市游戏风险指标新增   
  gameRiskInsert: (options = {}) => ajax.post('/game/risk/insert',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  //城市游戏风险指标新增   
  gameRiskUpdate: (options = {}) => ajax.post('/game/risk/update',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),

  // 奖池风险指标风险指标新增
  pondRiskInsert: (options = {}) => ajax.post('/jackpot/risk/insert',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  //奖池风险指标列表
  getPondRiskList: (options = {}) => ajax.post('/jackpot/risk/list',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  // 奖池风险指标详情
  getPondRiskDetail: (options = {}) => ajax.post('/jackpot/risk/detail',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  //删除奖池风险指标
  pondRiskDelete: (options = {}) => ajax.post('/jackpot/risk/delete',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  //删除奖池风险指标
  pondRiskUpdate: (options = {}) => ajax.post('/jackpot/risk/update',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),


  //城市风险指标新增
  cityRiskInsert: (options = {}) => ajax.post('/city/risk/insert',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  //城市风险指标删除
  cityRiskDelete: (options = {}) => ajax.post('/city/risk/delete',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  //城市风险指标列表
  getCityRiskList: (options = {}) => ajax.post('/city/risk/list',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  //城市风险指标详情
  getCityRiskDetail: (options = {}) => ajax.post('/city/risk/detail',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
  //城市风险指标修改
  cityRiskUpdate: (options = {}) => ajax.post('/city/risk/update',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),

  //告警监控列表
  getWarniingList:(options = {}) => ajax.post('/warn/info/list',  {
    ...options,
    baseURL:'http://119.136.27.9:8086/api'
  }),
}