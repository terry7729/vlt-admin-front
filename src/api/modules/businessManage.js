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
  getStoreList: (options = {}) => ajax.post('/channelResManage/warehouse/page', options),
  //仓库详情查看
  detailStore: (options = {}) => ajax.get('/channelResManage/warehouse/detailWare', options),
  //获取所属机构列表
  getInsList: (options = {}) => ajax.post('/ins/queryInsAndRegionTree', options),
  // 获取管理员列表
  getAdminList: (options = {}) => ajax.post('/dept/findDeptUserByInsId', options),
  // 新增仓库
  createWare: (options = {}) => ajax.post('/channelResManage/warehouse/createWare', options),

  // 仓库管理详情查看
  detailStore: (options = {}) => ajax.get('/channelResManage/warehouse/detailWare', options),
  //获取基本信息类型管理列表
  getGoosType: (options = {}) => ajax.post('/goodsType/pageList', options),
  // 获取下拉选择框物品名称-型号树
  getModelTrees: (options = {}) => ajax.get('/goodsModel/goodsNameTree', options),
  // 获取类型管理查看详情
  getDetail: (options = {}) => ajax.get('/goodsType/details', options),

  //类型管理状态修改
  statusUpdate: (options = {}) => ajax.post('/goodsType/statusUpdate', options),
  //类型管理类型新增
  typeCreate: (options = {}) => ajax.post('/goodsType/create', options),
  //类型管理-图片上传
  uploadGoodsType: (options = {}) => ajax.upload('/goodsType/imgFileUpload', options),
  // 类型管理修改
  modification: (options = {}) => ajax.post('/goodsType/update', options),
  // 获取型号管理列表
  getModelList: (options = {}) => ajax.post('/goodsModel/pageList', options),
  // 型号管理状态修改
  ModelstatusUpdate: (options = {}) => ajax.post('/goodsModel/statusUpdate', options),
  // 型号管理新增
  modelCreate: (options = {}) => ajax.post('/goodsModel/create', options),
  //获取型号管理详情
  modelDetail: (options = {}) => ajax.post('/goodsModel/details', options),
  //型号管理修改
  modelWrite: (options = {}) => ajax.post('/goodsModel/update', options),
  //出入库管理列表获取
  getOutPutList: (options = {}) => ajax.post('/warehouseRecording/page', options),

  //出入库详情
  getOutPutDetail: (options = {}) => ajax.post('/warehouseRecording/detail', options),
  //出入库
  entryAndOut: (options = {}) => ajax.post('/warehouseRecording/entryAndOut', options),
  //出入库导出
  outExport: (options = {}) => ajax.post('/warehouseRecording/exportExcel', options),

  // 设备管理
  // 设备分页查询列表
  equipmentListPage: (options = {}) => ajax.post('/equipment/equipmentPage', options),
  // 设备详情查询
  equipmentInfoDetail: (options = {}) => ajax.post('/equipment/equipmentInfo', options),
  // 设备履历
  equipmentRecord: (options = {}) => ajax.post('/equipment/equipmentRecord', options),
  // 配件详情查询
  accessoriesInfoDetail: (options = {}) => ajax.post('/accessories/accessoriesInfo', options),
  // 配件分页查询列表
  accessoriesListPage: (options = {}) => ajax.post('/accessories/accessoriesPage', options),
  // 配件履历
  accessoriesRecord: (options = {}) => ajax.post('/accessories/accessoriesRecord', options),

  // 投注卡生成
  createCardGeneration: (options = {}) => ajax.post('/bettingCardGeneration/create', options),
  //  投注卡生成注销
  deleteCardGeneration: (options = {}) => ajax.post('/bettingCardGeneration/delete', options),
  // 投注卡生成详情查询
  cardGenerationDetail: (options = {}) => ajax.post('/bettingCardGeneration/detail', options),
  // 投注卡生成列表分页查询
  cardGenerationList: (options = {}) => ajax.post('/bettingCardGeneration/list', options),
  // 根据投注卡生成ID查询投注卡信息列表
  bettingCardList: (options = {}) => ajax.post('/bettingCardGeneration/bettingCardList', options),

  // 投注卡信息列表分页查询
  bettingCardInfoList: (options = {}) => ajax.post('/bettingCardInfo/list', options),
  // 投注卡信息详情查询
  bettingCardInfoDetail: (options = {}) => ajax.post('/bettingCardInfo/detail', options),
  // 投注卡信息注销
  deleteBettingCardInfo: (options = {}) => ajax.post('/bettingCardInfo/delete', options),
  // 投注卡信息导出Excel 
  bettingCardExportExcel: (options = {}) => ajax.post('/bettingCardGeneration/exportExcel', options),

  // 投注卡管理
  getBettingRulesList: (options = {}) => ajax.post('/bettingCardRechargeRules/list', options),
  // 新增投注卡规则
  createBettingRulesList: (options = {}) => ajax.post('/bettingCardRechargeRules/create', options),
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
  // 查询当前用户的机构信息
  getUserInsInfoList: (options = {}) => ajax.post('/developPlan/queryUserInsInfoList', options),
  // 查询年度开展计划详情
  getDevelopPlanInfo: (options = {}) => ajax.post('/developPlan/queryDevelopPlanInfo', options),
  // 查询年度开展计划汇总省级列表
  getProvincePlanList: (options = {}) => ajax.post('/developPlan/queryProvinceDevelopPlanList', options),
  // 查询年度开展计划汇总省级信息
  getProvincePlanInfo: (options = {}) => ajax.post('/developPlan/queryProvinceDevelopPlanInfo', options),
  //  修改年度发展计划审批信息
  updateDevelopPlanApproval: (options = {}) => ajax.post('/developPlan/updateDevelopPlanApproval', options),
  // 导出年度发展计划列表信息 
  exportDevelopPlanList: (options = {}) => ajax.post('/developPlan/exportDevelopPlanList', options),
  // 导出年度发展计划汇总省级列表信息
  exportProvinceDevelopPlanList: (options = {}) => ajax.post('/developPlan/exportProvinceDevelopPlanList', options),
  // 导出年度发展计划汇总市级列表信息
  exportCityDevelopPlanList: (options = {}) => ajax.post('/developPlan/exportCityDevelopPlanList', options),

  // 查询当前登录用户的机构信息

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
  // 游戏储备详情
  getGameStoreInfo: (options = {}) => ajax.post('/game/queryGameInfoById', options),
  // 导出游戏列表
  exportGameExcel: (options = {}) => ajax.post('/game/exportExcel', options),
  // 下载游戏附件
  downGameLoad: (options = {}) => ajax.post('/game/downloading', options),
  // 所有游戏列表
  getAllGameList: (options = {}) => ajax.post('/game/queryAllGameInfo', options),
  // 上市游戏列表
  queryGameListPlanPage: (options = {}) => ajax.post('/gameListPlan/queryGameListPlanPage', options),
  // 上市记录查询列表
  queryPlanByGameId: (options = {}) => ajax.post('/gameListPlan/queryPlanByGameId', options),

  // 查询上市计划列表
  getMarketPlanList: (options = {}) => ajax.post('/gameListPlan/queryListPlanByPage', options),
  // 新增上市计划
  createMarketPlan: (options = {}) => ajax.post('/gameListPlan/insertGameListPlan', options),
  // 上市计划详情
  getMarketPlanDetail: (options = {}) => ajax.post('/gameListPlan/queryListPlanById', options),

  // 编辑上市计划
  editMarketPlan: (options = {}) => ajax.post('/gameListPlan/updateGameListPlan', options),


  // 查询变更计划列表
  getChangePlanList: (options = {}) => ajax.post('/gameChangePlan/queryChangePlanPage', options),
  // 查询上市计划列表-下拉框
  getAllPlanList: (options = {}) => ajax.post('/gameListPlan/queryAllGameListPlan', options),
  // 变更计划详情
  getChangePlanDetail: (options = {}) => ajax.post('/gameChangePlan/queryGameChangePlanById', options),
  // 编辑变更计划
  editChangePlan: (options = {}) => ajax.post('/gameChangePlan/updateGameChangePlan', options),
  // 新增变更计划
  createChangePlan: (options = {}) => ajax.post('/gameChangePlan/insertGameChangePlan', options),


  // 新建渠道
  createChannel: (options = {}) => ajax.post('/create/save', options),
  // 新建渠道--销售游戏列表
  getChannelGameList: (options = {}) => ajax.post('/create/selectGameList', options),
  // 渠道列表
  getChannelList: (options = {}) => ajax.post('/channel/queryListByPage', options),
  // 渠道详情
  getChannelDetail: (options = {}) => ajax.post('/channel/queryDetailById', options),
  // 渠道附件上传
  uploadChannelFiles: (options = {}) => ajax.upload('/fileUpload/upload', options),
  // 渠道列表导出
  exportChannelExcel: (options = {}) => ajax.post('/channel/exportExcel', options),

  getChannelTerminalMenu: (options = {}) => ajax.post('/getChannelTerminalMenu', options),
  // 根据资源类型获取资源名称
  getModelTree: (options = {}) => ajax.get('/goodsModel/goodsModel/queryModelTree', options),


  getChannelTerminalMenu: (options = {}) => ajax.post('/getChannelTerminalMenu', options),
  //资金参数列表分页查询
  getFundsParameter: (options = {}) => ajax.post('/tFundParameter/list', options),
  //资金参数详情查询
  getParameterDetail: (options = {}) => ajax.post('/tFundParameter/detail', options),
  //资金参数修改
  editFundsParameter: (options = {}) => ajax.post('/tFundParameter/update', options),

  //渠道业务管理模块
  //业务办理 
  //保存资金权限信息  
  addFundRight: (options = {}) => ajax.put('/fund/addFundRight', options),
  //游戏销售权限
  queryGameRight: (options = {}) => ajax.post('/sales/queryGameRight', options),
  //游戏销售权限更改
  updateGameRight: (options = {}) => ajax.put('/sales/update', options),


  //资源发放
  channelResProvide: (options = {}) => ajax.post('/channelResProvide/channelResProvide/provide', options),
  //资源发放分页查询
  channelResProvidePageList: (options = {}) => ajax.post('/channelResProvide/channelResProvide/pageList', options),
  //资源采购申请
  channelResPurcApply: (options = {}) => ajax.post('/channelResPurc/channelResPurc/apply', options),
  //资源采购分页查询
  channelResPurcPageList: (options = {}) => ajax.post('/channelResPurc/channelResPurc/pageList', options),
  //资源申请
  channelResApply: (options = {}) => ajax.post('/channelResApply/channelRes/apply', options),
  //资源申请分页查询
  channelResApplyPageList: (options = {}) => ajax.post('/channelResApply/channelResApply/pageList', options),

}