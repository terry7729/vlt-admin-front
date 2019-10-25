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
  detailStore: (options = {}) => ajax.get('/channelResManage/warehouse/detailWare',options),
  //获取基本信息类型管理列表
  getGoosType: (options = {}) => ajax.post('/goodsType/goodsType/page',options),
  // 获取下拉选择框物品名称-型号树
  getModelTree:(options = {}) => ajax.post('/goodsModel/goodsModel/queryModelTree',options),
  // 获取类型管理查看详情
  getDetail:(options = {}) => ajax.get('/goodsType/goodsType/details',options),
  //类型管理状态修改
  statusUpdate:(options = {}, param) => ajax.post(`/goodsType/goodsType/statusUpdate/${param.id}/${param.state}`,options),

  // 投注卡生成
  createCardGeneration: (options = {}) => ajax.post('/bettingCardGeneration/create', options),
  //  投注卡生成注销
  deleteCardGeneration: (options = {}) => ajax.post('/bettingCardGeneration/delete', options),
  // 投注卡生成详情查询
  cardGenerationDetail: (options = {}) => ajax.post('/bettingCardGeneration/detail', options),
  // 投注卡生成列表分页查询
  cardGenerationList: (options = {}) => ajax.post('/bettingCardGeneration/list', options),
  // 投注卡管理
  getBettingRulesList: (options = {}) => ajax.post('/bettingCardRechargeRules/list', options),
  // 新增投注卡规则
  createBettingRulesList: (options = {}) => ajax.post('/bettingCardRechargeRules/create', options),
  // 更新修改账户
  updateAccount: (options = {}) => ajax.post(`/tChannelFund/update/${id}`, options),
  // 删除投注卡规则
  deleteBettingCard: (options = {}) => ajax.post(`/bettingCardRechargeRules/delete`, options),
  // 修改投注卡规则
  updateBettingRules: (options = {}) => ajax.post('/bettingCardRechargeRules/update', options),
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
  // 新建渠道
  creatChannel: (options = {}) => ajax.post('/create/save', options),
  // 新建渠道--销售游戏列表
  getChannelGameList: (options = {}) => ajax.post('/create/selectGameList', options),
  // 渠道列表
  getChannelList: (options = {}) => ajax.post('/channel/queryListByPage', options),
  // 渠道详情
  getChannelDetail: (options = {}) => ajax.post('/channel/queryDetailById', options),
  
  getChannelTerminalMenu: (options = {}) => ajax.post('/getChannelTerminalMenu', options),

  getChannelTerminalMenu: (options = {}) => ajax.post('/getChannelTerminalMenu', options),
  //资金参数列表分页查询
  getFundsParameter: (options = {}) => ajax.post('/tFundParameter/list', options),
  //资金参数详情查询
  getParameterDetail: (options = {}) => ajax.post('/tFundParameter/detail', options),
}