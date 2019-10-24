// 业务管理
import ajax from '@/utils/ajax.js'
export default {
  /*
  *@param {json} options: {} || {data: json}
  */
  /* 
    请务必注释每个接口所属名称 
  */
  // 新增年度开展计划
  createDevelopPlan: (options = {}) => ajax.post('/developPlan/addDevelopPlanInfo', options),
  // 编辑年度开展计划
  editDevelopPlan: (options = {}) => ajax.post('/developPlan/updateDevelopPlanInfo', options),
  // 查询年度开展计划列表
  getDevelopPlanList: (options = {}) => ajax.post('/developPlan/queryDevelopPlanList', options),
  // 查询年度开展计划详情
  getDevelopPlanInfo: (options = {}) => ajax.post('/developPlan/queryDevelopPlanInfo', options),
  // 查询年度开展计划汇总省级列表
  getProvincePlanList: (options = {}) => ajax.post('/developPlan/queryProvinceDevelopPlanList', options),
  // 查询年度开展计划汇总省级信息
  getProvincePlanInfo: (options = {}) => ajax.post('/developPlan/queryProvinceDevelopPlanInfo', options),
  // 查询年度开展计划汇总市级列表
  getCityPlanList: (options = {}) => ajax.post('/developPlan/queryCityDevelopPlanList', options),
  // 查询年度开展计划汇总市级信息
  getCityPlanInfo: (options = {}) => ajax.post('/developPlan/queryCityDevelopPlanInfo', options),
  // 省级查询市级计划汇总信息
  getProvinceCityPlan: (options = {}) => ajax.post('/developPlan/queryProvinceCityDevelopPlan', options),
  // 游戏储备列表
  getGameStoreList: (options = {}) => ajax.post('/game/queryGameListByPage', options),
  // 新增游戏储备
  createGameStore: (options = {}) => ajax.post('/game/insertGameInfo', options),
  // 编辑游戏储备
  editGameStore: (options = {}) => ajax.post('/game/updateGameInfo', options),
  // 查看游戏储备详情
  getGameStoreInfo: (options = {}) => ajax.post('/game/queryGameInfoById', options),

  getChannelTerminalMenu: (options = {}) => ajax.post('/getChannelTerminalMenu', options)
}