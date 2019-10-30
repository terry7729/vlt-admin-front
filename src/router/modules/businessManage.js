import {
  S_IROTH
} from 'constants'

// 业务管理系统路由配置

// 首页概况
const overview = () => import('@/views/businessManage/home/overview')
// 我的待办
const myToDo = () => import('@/views/businessManage/home/myToDo')
// 我的申请
const myApplication = () => import('@/views/businessManage/home/myApplication')
// 我的已办
const myDone = () => import('@/views/businessManage/home/myDone')
// 我的知会
const myKnowledge = () => import('@/views/businessManage/home/myKnowledge')
// 消息列表
const messages = () => import('@/views/businessManage/home/messages')
// 发布消息
const sendMessage = () => import('@/views/businessManage/home/sendMessage')
// 查看消息
const messagesDetail = () => import('@/views/businessManage/home/messagesDetail');
// 待审核
const pendingReview = () => import('@/views/businessManage/home/pendingReview')
// 处理待审核
const pendingReviewEdit = () => import('@/views/businessManage/home/pendingReviewEdit')
// 移交待审核
const pendingReviewTransfer = () => import('@/views/businessManage/home/pendingReviewTransfer');
// 已审核
const audited = () => import('@/views/businessManage/home/audited');
// 已申请
const alreadyApplied = () => import('@/views/businessManage/home/alreadyApplied');
// 待阅读
const pendingReading = () => import('@/views/businessManage/home/pendingReading');


// 游戏储备列表
const gameList = () => import('@/views/businessManage/gameStoreManage/gameList')
const gameDetail = () => import('@/views/businessManage/gameStoreManage/gameDetail')
const gameEdit = () => import('@/views/businessManage/gameStoreManage/gameEdit')
const gameCreate = () => import('@/views/businessManage/gameStoreManage/gameCreate')
const gameTypeList = () => import('@/views/businessManage/gameStoreManage/gameTypeList')
// 游戏试玩计划列表
const trialPlanList = () => import('@/views/businessManage/gameStoreManage/trialPlanList')
const trialPlanDetail = () => import('@/views/businessManage/gameStoreManage/trialPlanDetail')
const trialPlanEdit = () => import('@/views/businessManage/gameStoreManage/trialPlanEdit')
const trialPlanCreate = () => import('@/views/businessManage/gameStoreManage/trialPlanCreate')
// 游戏上市计划列表
const gameMarketPlanList = () => import('@/views/businessManage/gameMarketManage/gameMarketPlanList')
const gameMarketPlanDetail = () => import('@/views/businessManage/gameMarketManage/gameMarketPlanDetail')
const gameMarketPlanEdit = () => import('@/views/businessManage/gameMarketManage/gameMarketPlanEdit')
const gameMarketPlanCreate = () => import('@/views/businessManage/gameMarketManage/gameMarketPlanCreate')
// 游戏配置管理
const gameMarketList = () => import('@/views/businessManage/gameChangeManage/gameMarketList')
const gameMarketDetail = () => import('@/views/businessManage/gameChangeManage/gameMarketDetail')
const gameChangePlanList = () => import('@/views/businessManage/gameChangeManage/gameChangePlanList')
const gameChangePlanDetail = () => import('@/views/businessManage/gameChangeManage/gameChangePlanDetail')
const gameChangePlanEdit = () => import('@/views/businessManage/gameChangeManage/gameChangePlanEdit')
const gameChangePlanCreate = () => import('@/views/businessManage/gameChangeManage/gameChangePlanCreate')
//退市计划
const gameDelistingPlanList = () => import('@/views/businessManage/gameDelistingManage/gameDelistingPlanList')
const gameDelistingPlanCreate = () => import('@/views/businessManage/gameDelistingManage/gameDelistingPlanCreate')
const gameDelistingPlanDetail = () => import('@/views/businessManage/gameDelistingManage/gameDelistingPlanDetail')
const riskReportList = () => import('@/views/businessManage/gameDelistingManage/riskReportList')




// 渠道业务管理
const channelList = () => import('@/views/businessManage/channelBusinessManage/channelList')
const channelDetail = () => import('@/views/businessManage/channelBusinessManage/channelDetail')
const channelCreate = () => import('@/views/businessManage/channelBusinessManage/channelCreate')
const channelDeal = () => import('@/views/businessManage/channelBusinessManage/channelDeal')
const channelSalesPermission = () => import('@/views/businessManage/channelBusinessManage/channelSalesPermission')
const channelFundsPermission = () => import('@/views/businessManage/channelBusinessManage/channelFundsPermission')
const developmentPlan = () => import('@/views/businessManage/channelBusinessManage/developmentPlan')
const developmentPlanCreate = () => import('@/views/businessManage/channelBusinessManage/developmentPlanCreate')
const developmentPlanDetail = () => import('@/views/businessManage/channelBusinessManage/developmentPlanDetail')
const developmentPlanEdit = () => import('@/views/businessManage/channelBusinessManage/developmentPlanEdit')
const developmentPlanList = () => import('@/views/businessManage/channelBusinessManage/developmentPlanList')
const developmentPlanProvince = () => import('@/views/businessManage/channelBusinessManage/developmentPlanProvince')
const developmentPlanCity = () => import('@/views/businessManage/channelBusinessManage/developmentPlanCity')
const developmentPlanProvinceDetail = () =>import('@/views/businessManage/channelBusinessManage/developmentPlanProvinceDetail')
const developmentPlanCityDetail = () => import('@/views/businessManage/channelBusinessManage/developmentPlanCityDetail');
const dossierManage = () => import('@/views/businessManage/channelBusinessManage/dossierManage')
const resourceApply = () => import('@/views/businessManage/channelBusinessManage/resourceApply')
const resourceProvide = () => import('@/views/businessManage/channelBusinessManage/resourceProvide')
const resourcePurchase = () => import('@/views/businessManage/channelBusinessManage/resourcePurchase')


//渠道资源管理
const inventoryManage = () => import('@/views/businessManage/channelResourceManage/inventoryManage/inventoryManage')
const outPutManage = () => import('@/views/businessManage/channelResourceManage/outPutManage/outPutManage')
const ledgerManage = () => import('@/views/businessManage/channelResourceManage/ledgerManage/ledgerManage')
const storeManage = () => import('@/views/businessManage/channelResourceManage/storeManage/storeManage')
const basicInfoManage = () => import('@/views/businessManage/channelResourceManage/basicInfoManage/basicInfoManage')
//库存管理库存查询
//设备查看
const equipmentDetail = () => import('@/views/businessManage/channelResourceManage/inventoryManage/equipmentDetail')
//设备履历
const equRecordCheck = () => import('@/views/businessManage/channelResourceManage/inventoryManage/equRecordCheck')
//设施查看
const facilityDetail = () => import('@/views/businessManage/channelResourceManage/inventoryManage/facilityDetail')
//耗材查看
const consumableDetail = () => import('@/views/businessManage/channelResourceManage/inventoryManage/consumableDetail')
// 配件查看
const mountingsDetail = () => import('@/views/businessManage/channelResourceManage/inventoryManage/mountingsDetail')
//配件履历
const mountRecordCheck = () => import('@/views/businessManage/channelResourceManage/inventoryManage/mountRecordCheck')
//盘点统计
const inventoryStatistics = () => import('@/views/businessManage/channelResourceManage/inventoryManage/inventoryStatistics')
//台账明细
const detailLedger = () => import('@/views/businessManage/channelResourceManage/ledgerManage/detailLedger')
//相关流程查看
const detailFlow = () => import('@/views/businessManage/channelResourceManage/ledgerManage/detailFlow')
//基础信息类型管理新增
const addEquipment = () => import('@/views/businessManage/channelResourceManage/basicInfoManage/addEquipment')
//类型管理修改
const modification = () => import('@/views/businessManage/channelResourceManage/basicInfoManage/modification')
// 类型管理设备查看
const equipmentCheck = () => import('@/views/businessManage/channelResourceManage/basicInfoManage/equipmentCheck')
//设施查看
const facilityCheck = () => import('@/views/businessManage/channelResourceManage/basicInfoManage/facilityCheck')
//耗材查看
const consumableCheck = () => import('@/views/businessManage/channelResourceManage/basicInfoManage/consumableCheck')
//配件查看
const mountingsCheck = () => import('@/views/businessManage/channelResourceManage/basicInfoManage/mountingsCheck')



//型号管理查看
const modelCheck = () => import('@/views/businessManage/channelResourceManage/basicInfoManage/modelCheck')
//类型管理新增
const modelAdd = () => import('@/views/businessManage/channelResourceManage/basicInfoManage/modelAdd')
//入库
const putStore = () => import('@/views/businessManage/channelResourceManage/outPutManage/putStore')
//入库详情
const alreadyPutDetail = () => import('@/views/businessManage/channelResourceManage/outPutManage/alreadyPutDetail')
//出库
const outStore = () => import('@/views/businessManage/channelResourceManage/outPutManage/outStore')
//已出库详情
const alreadyOutDetail = () => import('@/views/businessManage/channelResourceManage/outPutManage/alreadyOutDetail')
//仓库管理新增仓库
const addStore = () => import('@/views/businessManage/channelResourceManage/storeManage/addStore')
const detail = () => import('@/views/businessManage/channelResourceManage/storeManage/detail')



// 渠道终端管理
const channelTerminal = () => import('@/views/businessManage/channelTerminalManagement')

// 渠道终端管理 - 服务分析
const serviceAnalysis = () => import('@/views/businessManage/channelTerminalManagement/serviceAnalysis/serviceAnalysis')

// 渠道终端管理 - 维修管理
const maintenance = () => import('@/views/businessManage/channelTerminalManagement/maintenance/maintenance')
const repairOrderDetails = () =>import('@/views/businessManage/channelTerminalManagement/maintenance/repairOrderDetails')
// 渠道终端管理 - 设备管理 
const equipment = () => import('@/views/businessManage/channelTerminalManagement/equipment/equipment')
const equipmentDesc = () => import('@/views/businessManage/channelTerminalManagement/equipment/equipmentDetail')
const equipmentResume = () => import('@/views/businessManage/channelTerminalManagement/equipment/equipmentResume')
const accessoriesDesc = () => import('@/views/businessManage/channelTerminalManagement/equipment/accessoriesDetail')
const accessoriesResume = () => import('@/views/businessManage/channelTerminalManagement/equipment/accessoriesResume')

// 渠道终端管理 - 报表统计
const reportStatistics = () => import('@/views/businessManage/channelTerminalManagement/reportStatistics/reportStatistics')

// 渠道终端管理 - 维护知识库
const knowledgeBaseIndex = () => import('@/views/businessManage/channelTerminalManagement/knowledgeBase/index')
const knowledgeBaseInfo = () => import('@/views/businessManage/channelTerminalManagement/knowledgeBase/knowledgeBaseInfo')
const baseAuditDetails = () => import('@/views/businessManage/channelTerminalManagement/knowledgeBase/baseAuditDetails')

// 配置管理
const configurationManagement = () => import('@/views/businessManage/channelTerminalManagement/configurationManagement/index')
const addFaultType = () => import('@/views/businessManage/channelTerminalManagement/configurationManagement/addFaultType')
const editFaultType = () => import('@/views/businessManage/channelTerminalManagement/configurationManagement/editFaultType')



// 资金结算管理
const fundParameter = () => import('@/views/businessManage/fundSettlement/fundParameter')
// 资金参数管理 详情
const fundParameterDetail = () => import('@/views/businessManage/fundSettlement/fundParameterDetail')
// 资金参数管理 编辑
const fundParameterEdit = () => import('@/views/businessManage/fundSettlement/fundParameterEdit')
// 全局参数编辑
const globalParameterEdit = () => import('@/views/businessManage/fundSettlement/globalParameterEdit')
// 创建
const newfundParameter = () => import('@/views/businessManage/fundSettlement/newfundParameter')
// 资金参数管理 全局参数
const globalParameter = () => import('@/views/businessManage/fundSettlement/globalParameter')



// 投注卡管理
const cardBalance = () => import('@/views/businessManage/bettingCardManage/cardBalance')
const cardGeneration = () => import('@/views/businessManage/bettingCardManage/cardGeneration')
const refillRules = () => import('@/views/businessManage/bettingCardManage/refillRules')
const winningRecord = () => import('@/views/businessManage/bettingCardManage/winningRecord')
const withdrawalRecord = () => import('@/views/businessManage/bettingCardManage/withdrawalRecord')
const cardInformation = () => import('@/views/businessManage/bettingCardManage/cardInformation')
const bettingCardRules = () =>import('@/views/businessManage/bettingCardManage/bettingCardRules')

// 投注卡基本信息
const cardDetail = () => import('@/views/businessManage/bettingCardManage/cardDetail')
// 投注卡详细信息
const infoDetail = () => import('@/views/businessManage/bettingCardManage/infoDetail')
// 余额明细
const balanceDetail = () => import('@/views/businessManage/bettingCardManage/balanceDetail')
// 新建规则
const newRule = () => import('@/views/businessManage/bettingCardManage/newRule')
// 新建卡片
const newCard = () => import('@/views/businessManage/bettingCardManage/newCard')
// 导出卡片
const exportCard = () => import('@/views/businessManage/bettingCardManage/exportCard')
// 新建投注卡规则
const newbettingRule = () => import('@/views/businessManage/bettingCardManage/newbettingRule')
// 合作伙伴管理
const cooperatorList = () => import('@/views/businessManage/cooperatorManage/cooperatorList')
const cooperatorCreate = () => import('@/views/businessManage/cooperatorManage/cooperatorCreate')
const cooperatorBrokerageSet = () => import('@/views/businessManage/cooperatorManage/cooperatorBrokerageSet')
const cooperatorQuotaSet = () => import('@/views/businessManage/cooperatorManage/cooperatorQuotaSet')
const verifyReconciliation = () => import('@/views/businessManage/cooperatorManage/verifyReconciliation')

// 在线培训管理
const assessManage = () => import('@/views/businessManage/onlineTraining/assessManage/index')
const courseManage = () => import('@/views/businessManage/onlineTraining/courseManage/index')
const trainingManage = () => import('@/views/businessManage/onlineTraining/trainingManage/index')


export default [
  // {
  //   path: 'demo',
  //   name: 'demo',
  //   component: demo,
  //   meta: {
  //     parentName: '', // 当左侧菜单匹配不到当前路由时(菜单无对应激活状态),请设置该属性值(菜单可激活的父级路由名称)
  //     title: '路由说明'
  //   }
  // },
  {
    path: 'businessManage/overview/index',
    name: 'overview',
    meta: {
      title: '首页',
    },
    component: overview
  }, {
    path: 'businessManage/overview/myToDo',
    name: 'myToDo',
    meta: {
      title: '我的待办',
    },
    component: myToDo
  }, {
    path: 'businessManage/overview/myApplication',
    name: 'myApplication',
    meta: {
      title: '我的申请',
    },
    component: myApplication
  }, {
    path: 'businessManage/overview/myDone',
    name: 'myDone',
    meta: {
      title: '我的已办',
    },
    component: myDone
  }, {
    path: 'businessManage/overview/myKnowledge',
    name: 'myKnowledge',
    meta: {
      title: '我的知会',
    },
    component: myKnowledge
  },
  {
    path: 'businessManage/overview/messages/:type',
    name: 'messages',
    meta: {
      parentName: 'overview',
      title: '更多消息',
    },
    component: messages
  },
  {
    path: 'businessManage/overview/messagesDetail',
    name: 'messagesDetail',
    meta: {
      title: '查看消息',
    },
    component: messagesDetail
  },
  {
    path: 'businessManage/overview/sendMessage',
    name: 'sendMessage',
    meta: {
      parentName: 'overview',
      title: '发布消息',
    },
    component: sendMessage
  },
  {
    path: 'businessManage/overview/pendingReview',
    name: 'pendingReview',
    meta: {
      parentName: 'myToDo',
      title: '待审核',
    },
    component: pendingReview
  },
  {
    path: 'businessManage/overview/pendingReviewEdit',
    name: 'pendingReviewEdit',
    meta: {
      parentName: 'myToDo',
      title: '待审核-处理',
    },
    component: pendingReviewEdit
  },
  {
    path: 'businessManage/overview/pendingReviewTransfer',
    name: 'pendingReviewTransfer',
    meta: {
      parentName: 'myToDo',
      title: '待审核-移交',
    },
    component: pendingReviewTransfer
  },
  {
    path: 'businessManage/overview/audited',
    name: 'audited',
    meta: {
      parentName: 'myDone',
      title: '已审核',
    },
    component: audited
  },
  {
    path: 'businessManage/overview/alreadyApplied',
    name: 'alreadyApplied',
    meta: {
      parentName: 'myApplication',
      title: '已申请',
    },
    component: alreadyApplied
  },
  {
    path: 'businessManage/overview/pendingReading',
    name: 'audipendingReadingted',
    meta: {
      parentName: 'myKnowledge',
      title: '待阅读',
    },
    component: pendingReading
  },
  {
    path: 'businessManage/gameList',
    name: 'gameList',
    meta: {
      title: '游戏储备列表',
    },
    component: gameList
  },
  {
    path: 'businessManage/gameCreate',
    name: 'gameCreate',
    meta: {
      title: '新建游戏',
      parentName: 'gameList',
    },
    component: gameCreate
  },
  {
    path: 'businessManage/gameDetail',
    name: 'gameDetail',
    meta: {
      title: '游戏详情',
      parentName: 'gameList',
    },
    component: gameDetail
  },
  {
    path: 'businessManage/gameEdit',
    name: 'gameEdit',
    meta: {
      title: '游戏编辑',
      parentName: 'gameList',
    },
    component: gameEdit
  },
  {
    path: 'businessManage/gameTypeList',
    name: 'gameTypeList',
    meta: {
      title: '游戏类型管理',
    },
    component: gameTypeList
  },
  {
    path: 'businessManage/trialPlanList',
    name: 'trialPlanList',
    meta: {
      title: '游戏试玩计划列表',
    },
    component: trialPlanList
  },
  {
    path: 'businessManage/trialPlanCreate',
    name: 'trialPlanCreate',
    meta: {
      title: '新建试玩计划',
      parentName: 'trialPlanList',
    },
    component: trialPlanCreate
  },
  {
    path: 'businessManage/trialPlanDetail',
    name: 'trialPlanDetail',
    meta: {
      title: '试玩计划详情',
      parentName: 'trialPlanList',
    },
    component: trialPlanDetail
  },
  {
    path: 'businessManage/trialPlanEdit',
    name: 'trialPlanEdit',
    meta: {
      title: '试玩计划编辑',
      parentName: 'trialPlanList',
    },
    component: trialPlanEdit
  },
  {
    path: 'businessManage/gameMarketPlanList',
    name: 'gameMarketPlanList',
    meta: {
      title: '游戏上市计划',
    },
    component: gameMarketPlanList
  },
  {
    path: 'businessManage/gameMarketPlanCreate',
    name: 'gameMarketPlanCreate',
    meta: {
      title: '新建上市计划',
      parentName: 'gameMarketPlanList',
    },
    component: gameMarketPlanCreate
  },
  {
    path: 'businessManage/gameMarketPlanDetail',
    name: 'gameMarketPlanDetail',
    meta: {
      title: '上市计划详情',
      parentName: 'gameMarketPlanList',
    },
    component: gameMarketPlanDetail
  },
  {
    path: 'businessManage/gameMarketPlanEdit',
    name: 'gameMarketPlanEdit',
    meta: {
      title: '上市计划编辑',
      parentName: 'gameMarketPlanList',
    },
    component: gameMarketPlanEdit
  },
  {
    path: 'businessManage/gameMarketList',
    name: 'gameMarketList',
    meta: {
      title: '上市游戏列表',
    },
    component: gameMarketList
  },
  {
    path: 'businessManage/gameMarketDetail',
    name: 'gameMarketDetail',
    meta: {
      title: '上市游戏详情',
      parentName: 'gameMarketList',
    },
    component: gameMarketDetail
  },
  {
    path: 'businessManage/gameChangePlanList',
    name: 'gameChangePlanList',
    meta: {
      title: '游戏变更计划',
    },
    component: gameChangePlanList
  },
  {
    path: 'businessManage/gameChangePlanCreate',
    name: 'gameChangePlanCreate',
    meta: {
      title: '新建变更计划',
      parentName: 'gameChangePlanList',
    },
    component: gameChangePlanCreate
  },
  {
    path: 'businessManage/gameChangePlanDetail',
    name: 'gameChangePlanDetail',
    meta: {
      title: '变更计划详情',
      parentName: 'gameChangePlanList',
    },
    component: gameChangePlanDetail
  },
  {
    path: 'businessManage/gameChangePlanEdit',
    name: 'gameChangePlanEdit',
    meta: {
      title: '变更计划编辑',
      parentName: 'gameChangePlanList',
    },
    component: gameChangePlanEdit
  },
  {
    path: 'businessManage/gameDelistingPlanList',
    name: 'gameDelistingPlanList',
    meta: {
      title: '退市计划列表',
    },
    component: gameDelistingPlanList
  },
  {
    path: 'businessManage/gameDelistingPlanCreate',
    name: 'gameDelistingPlanCreate',
    meta: {
      title: '新建退市计划',
      parentName: 'gameDelistingPlanList',
    },
    component: gameDelistingPlanCreate
  },
  {
    path: 'businessManage/gameDelistingPlanDetail',
    name: 'gameDelistingPlanDetail',
    meta: {
      title: '退市计划详情',
      parentName: 'gameDelistingPlanList',
    },
    component: gameDelistingPlanDetail
  },
  {
    path: 'businessManage/riskReportList',
    name: 'riskReportList',
    meta: {
      title: '风险报告',
    },
    component: riskReportList
  },
  {
    path: 'businessManage/channelList',
    name: 'channelList',
    meta: {
      title: '渠道列表',
    },
    component: channelList
  },
  {
    path: 'businessManage/channelDetail',
    name: 'channelDetail',
    meta: {
      title: '渠道详情',
      parentName: 'channelList',
    },
    component: channelDetail
  },
  {
    path: 'businessManage/channelDeal',
    name: 'channelDeal',
    meta: {
      title: '业务办理',
    },
    component: channelDeal
  },
  {
    path: 'businessManage/channelCreate',
    name: 'channelCreate',
    meta: {
      title: '新建渠道',
      parentName: 'channelDeal',
    },
    component: channelCreate
  },
  {
    path: 'businessManage/channelSalesPermission',
    name: 'channelSalesPermission',
    meta: {
      parentName: 'channelDeal',
      title: '销售权限',
    },
    component: channelSalesPermission
  },
  {
    path: 'businessManage/channelFundsPermission',
    name: 'channelFundsPermission',
    meta: {
      parentName: 'channelDeal',
      title: '资金权限',
    },
    component: channelFundsPermission
  },
  {
    path: 'businessManage/resourcePurchase',
    name: 'resourcePurchase',
    meta: {
      parentName: 'channelDeal',
      title: '资源采购',
    },
    component: resourcePurchase
  },
  {
    path: 'businessManage/resourceApply',
    name: 'resourceApply',
    meta: {
      parentName: 'channelDeal',
      title: '资源申请',
    },
    component: resourceApply
  },
  {
    path: 'businessManage/resourceProvide',
    name: 'resourceProvide',
    meta: {
      parentName: 'channelDeal',
      title: '资源发放',
    },
    component: resourceProvide
  },
  {
    path: 'businessManage/developmentPlan',
    name: 'developmentPlan',
    meta: {
      title: '年度发展计划',
    },
    component: developmentPlan,
    children: []
  },
  {
    path: 'businessManage/developmentPlanDetail',
    name: 'developmentPlanDetail',
    meta: {
      title: '年度发展计划详情',
    },
    component: developmentPlanDetail,
    children: []
    
  },{
    
    path: 'businessManage/developmentPlanEdit',
    name: 'developmentPlanEdit',
    meta: {
      title: '编辑年度发展计划',
    },
    component: developmentPlanEdit,
    children: []
  },
  {
    path: 'businessManage/developmentPlanCreate',
    name: 'developmentPlanCreate',
    meta: {
      parentName: 'developmentPlan',
      title: '新建年度发展计划',
    },
    component: developmentPlanCreate
  },{
    path: 'businessManage/developmentPlanProvinceDetail',
    name: 'developmentPlanProvinceDetail',
    meta: {
      title: '年度发展计划汇总省级详情',
    },
    component: developmentPlanProvinceDetail,
    children: []
  },{
    path: 'businessManage/developmentPlanCityDetail',
    name: 'developmentPlanCityDetail',
    meta: {
      title: '年度发展计划汇总市级详情',
    },
    component: developmentPlanCityDetail,
    children: []
  },
  {
    path: 'businessManage/channelResourceManage/inventoryManage',
    name: 'inventoryManage',
    meta: {
      title: '库存管理',
    },
    component: inventoryManage
  },
  {
    path: 'businessManage/channelResourceManage/equipmentDetail',
    name: 'equipmentDetail',
    meta: {
      parentName:'inventoryManage',
      title: '设备查看',
    },
    component: equipmentDetail
  },
  {
    path: 'businessManage/channelResourceManage/facilityDetail',
    name: 'facilityDetail',
    meta: {
      parentName:'inventoryManage',
      title: '设施查看',
    },
    component: facilityDetail
  },
  {
    path: 'businessManage/channelResourceManage/consumableDetail',
    name: 'consumableDetail',
    meta: {
      parentName:'inventoryManage',
      title: '耗材查看',
    },
    component: consumableDetail
  },
  {
    path: 'businessManage/channelResourceManage/mountingsDetail',
    name: 'mountingsDetail',
    meta: {
      parentName:'inventoryManage',
      title: '配件查看',
    },
    component: mountingsDetail
  },
  {
    path: 'businessManage/channelResourceManage/mountRecordCheck',
    name: 'mountRecordCheck',
    meta: {
      parentName:'inventoryManage',
      title: '配件履历',
    },
    component: mountRecordCheck
  },
  {
    path: 'businessManage/channelResourceManage/equRecordCheck',
    name: 'equRecordCheck',
    meta: {
      parentName:'inventoryManage',
      title: '设备履历',
    },
    component: equRecordCheck
  },
  {
    path: 'businessManage/channelResourceManage/inventoryStatistics',
    name: 'inventoryStatistics',
    meta: {
      parentName:'inventoryManage',
      title: '盘点统计',
    },
    component: inventoryStatistics
  },

  {
    path: 'businessManage/channelResourceManage/outPutManage',
    name: 'outPutManage',
    meta: {
      title: '出入库管理',
    },
    component: outPutManage
  },
  {
    path: 'businessManage/channelResourceManage/putStore',
    name: 'putStore',
    meta: {
      parentName:'outPutManage',
      title: '入库',
    },
    component: putStore
  },
  {
    path: 'businessManage/channelResourceManage/alreadyPutDetail',
    name: 'alreadyPutDetail',
    meta: {
      parentName:'outPutManage',
      title: '已入库详情',
    },
    component: alreadyPutDetail
  },
  {
    path: 'businessManage/channelResourceManage/outStore',
    name: 'outStore',
    meta: {
      parentName:'outPutManage',
      title: '出库',
    },
    component: outStore
  },
  {
    path: 'businessManage/channelResourceManage/alreadyOutDetail',
    name: 'alreadyOutDetail',
    meta: {
      parentName:'outPutManage',
      title: '已出库详情',
    },
    component: alreadyOutDetail
  },

  {
    path: 'businessManage/channelResourceManage/ledgerManage',
    name: 'ledgerManage',
    meta: {
      title: '台账管理',
    },
    component: ledgerManage
  },
  {
    path: 'businessManage/channelResourceManage/detailLedger',
    name: 'detailLedger',
    meta: {
      parentName:'ledgerManage',
      title: '台账明细',
    },
    component: detailLedger
  },
  {
    path: 'businessManage/channelResourceManage/detailFlow',
    name: 'detailFlow',
    meta: {
      parentName:'ledgerManage',
      title: '相关流程',
    },
    component: detailFlow
  },
  {
    path: 'businessManage/channelResourceManage/storeManage',
    name: 'storeManage',
    meta: {
      title: '仓库管理',
    },
    component: storeManage
  },
  {
    path: 'businessManage/channelResourceManage/detail',
    name: 'detail',
    meta: {
      parentName:'storeManage',
      title: '仓库查看',
    },
    component: detail
  },
  {
    path: 'businessManage/channelResourceManage/addStore',
    name: 'addStore',
    meta: {
      parentName:'storeManage',
      title: '新建仓库',
    },
    component: addStore
  },
  {
    path: 'businessManage/channelResourceManage/basicInfoManage',
    name: 'basicInfoManage',
    meta: {
      title: '基本信息管理',
    },
    component: basicInfoManage
  },
  {
    path: 'businessManage/channelResourceManage/addEquipment',
    name: 'addEquipment',
    meta: {
      parentName:'basicInfoManage',
      title: '基本信息类型管理新增',
    },
    component: addEquipment
  },
  {
    path: 'businessManage/channelResourceManage/modification',
    name: 'modification',
    meta: {
      parentName:'basicInfoManage',
      title: '基本信息类型管理修改',
    },
    component: modification
  },

  {
    path: 'businessManage/channelResourceManage/equipmentCheck',
    name: 'equipmentCheck',
    meta: {
      parentName:'basicInfoManage',
      title: '基本信息类型管理设备查看',
    },
    component: equipmentCheck
  },
  {
    path: 'businessManage/channelResourceManage/facilityCheck',
    name: 'facilityCheck',
    meta: {
      parentName:'basicInfoManage',      
      title: '基本信息类型管理设施查看',
    },
    component: facilityCheck
  },
  {
    path: 'businessManage/channelResourceManage/consumableCheck',
    name: 'consumableCheck',
    meta: {
      parentName:'basicInfoManage',
      title: '基本信息类型管理耗材查看',
    },
    component: consumableCheck
  },
  {
    path: 'businessManage/channelResourceManage/mountingsCheck',
    name: 'mountingsCheck',
    meta: {
      parentName:'basicInfoManage',
      title: '基本信息类型管理耗材查看',
    },
    component: mountingsCheck
  },
  {
    path: 'businessManage/channelResourceManage/modelCheck',
    name: 'modelCheck',
    meta: {
      parentName:'basicInfoManage',
      title: '基本信息型号管理查看',
    },
    component: modelCheck
  },
  {
    path: 'businessManage/channelResourceManage/modelAdd',
    name: 'modelAdd',
    meta: {
      parentName:'basicInfoManage',
      title: '基本信息型号管理新增',
    },
    component: modelAdd
  },
  {
    path: 'businessManage/channelTerminal/serviceAnalysis',
    name: 'serviceAnalysis',
    meta: {
      title: '服务分析',
    },
    component: serviceAnalysis
  }, {
    path: 'businessManage/channelTerminal/maintenance',
    name: 'maintenance',
    meta: {
      title: '维修管理',
    },
    component: maintenance
  },{
    path: 'businessManage/channelTerminal/repairOrderDetails',
    name: 'repairOrderDetails',
    meta: {
      parentName: 'maintenance',
      title: '维修工单详情',
    },
    component: repairOrderDetails
  }, {
    path: 'businessManage/channelTerminal/reportStatistics',
    name: 'reportStatistics',
    meta: {
      parentName: 'reportStatistics',
      title: '报表统计',
    },
    component: reportStatistics
  },
  {
    path: 'businessManage/channelTerminal/equipment',
    name: 'equipment',
    meta: {
      parentName: 'equipment',
      title: '设备管理',
    },
    component: equipment
  },
  {
    path: 'businessManage/channelTerminal/equipment/equipmentDesc',
    name: 'equipmentDesc',
    meta: {
      parentName: 'equipment',
      title: '查看设备详情',
    },
    component: equipmentDesc
  },
  {
    path: 'businessManage/channelTerminal/equipment/equipmentResume',
    name: 'equipmentResume',
    meta: {
      parentName: 'equipment',
      title: '设备履历',
    },
    component: equipmentResume
  },
  {
    path: 'businessManage/channelTerminal/equipment/accessoriesDesc',
    name: 'accessoriesDesc',
    meta: {
      parentName: 'equipment',
      title: '查看配件详情',
    },
    component: accessoriesDesc
  },
  {
    path: 'businessManage/channelTerminal/equipment/accessoriesResume',
    name: 'accessoriesResume',
    meta: {
      parentName: 'equipment',
      title: '配件履历',
    },
    component: accessoriesResume
  },
  {
    path: 'businessManage/channelTerminal/knowledgeBase',
    name: 'knowledgeBase',
    meta: {
      title: '维修知识库',
    },
    component: knowledgeBaseIndex,
  },
  {
    path: 'businessManage/channelTerminal/knowledgeBaseInfo',
    name: 'knowledgeBaseInfo',
    meta: {
      parentName: 'knowledgeBase',
      title: '知识库审核',
    },
    component: knowledgeBaseInfo,
  },{
    path: 'businessManage/channelTerminal/baseAuditDetails',
    name: 'baseAuditDetails',
    meta: {
      title: '知识库审核详情',
    },
    component: baseAuditDetails
  }, {
    path: 'businessManage/channelTerminal/configurationManagement',
    name: 'configurationManagement',
    meta: {
      title: '配置管理',
    },
    component: configurationManagement
  },
  {
    path: 'businessManage/channelTerminal/addFaultType',
    name: 'addFaultType',
    meta: {
      parentName: 'configurationManagement',
      title: '新增故障类型 ',
    },
    component: addFaultType,
  },
  {
    path: 'businessManage/channelTerminal/editFaultType',
    name: 'editFaultType',
    meta: {
      title: '修改故障类型',
    },
    component: editFaultType,
  },
  {
    path: 'businessManage/fundSettlement/fundParameter',
    name: 'fundParameter',
    meta: {
      title: '资金参数管理',
    },
    component: fundParameter
  },
  {
    path: 'businessManage/fundSettlement/fundParameterDetail',
    name: 'fundParameterDetail',
    meta: {
      parentName: 'fundParameter',
      title: '资金参数管理详情',
    },
    component: fundParameterDetail
  },
  {
    path: 'businessManage/fundSettlement/fundParameterEdit',
    name: 'fundParameterEdit',
    meta: {
      parentName: 'fundParameter',
      title: '资金参数管理编辑',
    },
    component: fundParameterEdit
  },
  {
    path: 'businessManage/fundSettlement/globalParameterEdit',
    name: 'globalParameterEdit',
    meta: {
      parentName: 'fundParameter',
      title: '全局参数管理编辑',
    },
    component: globalParameterEdit
  },
  {
    path: 'businessManage/fundSettlement/newfundParameter',
    name: 'newfundParameter',
    meta: {
      parentName: 'fundParameter',
      title: '新增全局参数管理',
    },
    component: newfundParameter
  },

  {
    path: 'businessManage/fundSettlement/globalParameter',
    name: 'globalParameter',
    meta: {
      parentName: 'fundParameter',
      title: '资金参数全局参数',
    },
    component: globalParameter
  },
  {
    path: 'businessManage/cardBalance/cardBalance',
    name: 'cardBalance',
    meta: {
      title: '投注卡余额',
    },
    component: cardBalance
  }, {
    path: 'businessManage/cardBalance/cardGeneration',
    name: 'cardGeneration',
    meta: {
      title: '投注卡生成',
    },
    component: cardGeneration
  },{
    
    path: 'businessManage/cardBalance/bettingCardRules',
    name: 'bettingCardRules',
    meta: {
      title: '投注卡规则',
    },
    component: bettingCardRules
  }, {
    path: 'businessManage/cardBalance/refillRules',
    name: 'refillRules',
    meta: {
      title: '投注卡充值规则',
    },
    component: refillRules
  }, {
    path: 'businessManage/cardBalance/winningRecord',
    name: 'winningRecord',
    meta: {
      title: '投注卡中奖记录',
    },
    component: winningRecord
  }, {
    path: 'businessManage/cardBalance/withdrawalRecord',
    name: 'withdrawalRecord',
    meta: {
      title: '投注卡提现记录',
    },
    component: withdrawalRecord
  }, {
    path: 'businessManage/cardBalance/cardInformation',
    name: 'cardInformation',
    meta: {
      title: '投注卡信息',
    },
    component: cardInformation
  },
  {
    path: 'businessManage/cardBalance/cardDetail',
    name: 'cardDetail',
    meta: {
      parentName: 'cardGeneration',
      title: '投注卡明细',
    },
    component: cardDetail
  },
  {
    path: 'businessManage/cardBalance/balanceDetail',
    name: 'balanceDetail',
    meta: {
      parentName: 'cardBalance',
      title: '投注卡明细',
    },
    component: balanceDetail
  },
  {
    path: 'businessManage/cardBalance/infoDetail',
    name: 'infoDetail',
    meta: {
      parentName: 'cardInformation',
      title: '详情信息',
    },
    component: infoDetail
  },
  {
    path: 'businessManage/cardBalance/newCard',
    name: 'newCard',
    meta: {
      parentName: 'cardGeneration',
      title: '新建卡片'
    },
    component: newCard
  },{
    path: 'businessManage/cardBalance/newbettingRule',
    name: 'newbettingRule',
    meta: {
      parentName: 'bettingCardRules',
      title: '新增规则'
    },
    component: newbettingRule
    
  },
  
  {
    path: 'businessManage/cardBalance/newRule',
    name: 'newRule',
    meta: {
      parentName: 'refillRules',
      title: '新建规则'
    },
    component: newRule
  },
  {
    path: 'businessManage/cardBalance/exportCard',
    name: 'exportCard',
    meta: {
      parentName: 'cardGeneration',
      title: '导出卡片',
    },
    component: exportCard
  },
  {
    path: 'businessManage/cooperatorManage/cooperatorList',
    name: 'cooperatorList',
    meta: {
      title: '合作伙伴列表',
    },
    component: cooperatorList
  },
  {
    path: 'businessManage/cooperatorManage/cooperatorCreate',
    name: 'cooperatorCreate',
    meta: {
      parentName: 'cooperatorList',
      title: '新建合作伙伴',
    },
    component: cooperatorCreate
  },
  {
    path: 'businessManage/cooperatorManage/cooperatorBrokerageSet',
    name: 'cooperatorBrokerageSet',
    meta: {
      title: '合作佣金设置',
    },
    component: cooperatorBrokerageSet
  },
  {
    path: 'businessManage/cooperatorManage/cooperatorQuotaSet',
    name: 'cooperatorQuotaSet',
    meta: {
      title: '合作额度设置',
    },
    component: cooperatorQuotaSet
  },
  {
    path: 'businessManage/cooperatorManage/verifyReconciliation',
    name: 'verifyReconciliation',
    meta: {
      title: '结算与对账',
    },
    component: verifyReconciliation
  },
  {
    path: 'businessManage/onlineTraining/trainingManage',
    name: 'trainingManage',
    meta: {
      title: '培训管理',
    },
    component: trainingManage
  },
  {
    path: 'businessManage/onlineTraining/courseManage',
    name: 'courseManage',
    meta: {
      title: '课程管理',
    },
    component: courseManage
  },
  {
    path: 'businessManage/onlineTraining/assessManage',
    name: 'assessManage',
    meta: {
      title: '考核管理',
    },
    component: assessManage
  },
]