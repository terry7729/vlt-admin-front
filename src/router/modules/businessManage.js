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
const channelCreate = () => import('@/views/businessManage/channelBusinessManage/channelCreate')
const channelDeal = () => import('@/views/businessManage/channelBusinessManage/channelDeal')
const channelSalesPermission = () => import('@/views/businessManage/channelBusinessManage/channelSalesPermission')
const channelFundsPermission = () => import('@/views/businessManage/channelBusinessManage/channelFundsPermission')
const developmentPlan = () => import('@/views/businessManage/channelBusinessManage/developmentPlan')
const developmentPlanCreate = () => import('@/views/businessManage/channelBusinessManage/developmentPlanCreate')
const developmentPlanList = () => import('@/views/businessManage/channelBusinessManage/developmentPlanList')
const developmentPlanProvince = () => import('@/views/businessManage/channelBusinessManage/developmentPlanProvince')
const developmentPlanCity = () => import('@/views/businessManage/channelBusinessManage/developmentPlanCity')
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
const modification  = () => import('@/views/businessManage/channelResourceManage/basicInfoManage/modification')
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
const alreadyPutDetail =  () => import('@/views/businessManage/channelResourceManage/outPutManage/alreadyPutDetail')
//出库
const outStore = () => import('@/views/businessManage/channelResourceManage/outPutManage/outStore')
//仓库管理新增仓库
const addStore = () => import('@/views/businessManage/channelResourceManage/storeManage/addStore')
const detail = () => import('@/views/businessManage/channelResourceManage/storeManage/detail')



// 渠道终端管理
const channelTerminal = () => import('@/views/businessManage/channelTerminalManagement')
const configuration = () => import('@/views/businessManage/channelTerminalManagement/configuration')
const knowledgeBase = () => import('@/views/businessManage/channelTerminalManagement/knowledgeBase')
const reportStatistics = () => import('@/views/businessManage/channelTerminalManagement/reportStatistics')

// 渠道终端管理 - 服务分析
const serviceAnalysis = () => import('@/views/businessManage/channelTerminalManagement/serviceAnalysis/serviceAnalysis')
const maintenanceEfficiency = () => import('@/views/businessManage/channelTerminalManagement/serviceAnalysis/maintenanceEfficiency')
const accessoryFault = () => import('../../views/businessManage/channelTerminalManagement/serviceAnalysis/accessoryFault')
const equipmentFailure = () => import('@/views/businessManage/channelTerminalManagement/serviceAnalysis/equipmentFailure')
const maintenanceStaff = () => import('@/views/businessManage/channelTerminalManagement/serviceAnalysis/maintenanceStaff')

// 渠道终端管理 - 维修管理
const maintenance = () => import('@/views/businessManage/channelTerminalManagement/maintenance/maintenance')
const repairWork = () => import('@/views/businessManage/channelTerminalManagement/maintenance/repairWork')
const replacementWork = () => import('@/views/businessManage/channelTerminalManagement/maintenance/replacementWork')

// 渠道终端管理 - 设备管理 
const equipment = () => import('@/views/businessManage/channelTerminalManagement/equipment/equipment')
const accessoriesList = () => import('@/views/businessManage/channelTerminalManagement/equipment/accessoriesList')
const equipmentList = () => import('@/views/businessManage/channelTerminalManagement/equipment/equipmentList')
const equipmentDesc = () => import('@/views/businessManage/channelTerminalManagement/equipment/equipmentDetail')
const equipmentResume = () => import('@/views/businessManage/channelTerminalManagement/equipment/equipmentResume')

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


// 合作伙伴管理
const cooperatorList = () => import('@/views/businessManage/cooperatorManage/cooperatorList')
const cooperatorBrokerageSet = () => import('@/views/businessManage/cooperatorManage/cooperatorBrokerageSet')
const cooperatorQuotaSet = () => import('@/views/businessManage/cooperatorManage/cooperatorQuotaSet')
const verifyReconciliation = () => import('@/views/businessManage/cooperatorManage/verifyReconciliation')


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
    path: 'businessManage/overview',
    name: 'overview',
    meta: {
      title: '首页',
    },
    component: overview
  }, {
    path: 'businessManage/myToDo',
    name: 'myToDo',
    meta: {
      title: '我的待办',
    },
    component: myToDo
  }, {
    path: 'businessManage/myApplication',
    name: 'myApplication',
    meta: {
      title: '我的申请',
    },
    component: myApplication
  }, {
    path: 'businessManage/myDone',
    name: 'myDone',
    meta: {
      title: '我的已办',
    },
    component: myDone
  }, {
    path: 'businessManage/myKnowledge',
    name: 'myKnowledge',
    meta: {
      title: '我的知会',
    },
    component: myKnowledge
  },
  {
    path: 'businessManage/messages/:type',
    name: 'messages',
    meta: {
      title: '更多消息',
    },
    component: messages
  },
  {
    path: 'businessManage/messagesDetail',
    name: 'messagesDetail',
    meta: {
      title: '查看消息',
    },
    component: messagesDetail
  },
  {
    path: 'businessManage/sendMessage',
    name: 'sendMessage',
    meta: {
      title: '发布消息',
    },
    component: sendMessage
  },
  {
    path: 'businessManage/pendingReview',
    name: 'pendingReview',
    meta: {
      title: '待审核',
    },
    component: pendingReview
  },
  {
    path: 'businessManage/pendingReviewEdit',
    name: 'pendingReviewEdit',
    meta: {
      title: '待审核-处理',
    },
    component: pendingReviewEdit
  },
  {
    path: 'businessManage/pendingReviewTransfer',
    name: 'pendingReviewTransfer',
    meta: {
      title: '待审核-移交',
    },
    component: pendingReviewTransfer
  },
  {
    path: 'businessManage/audited',
    name: 'audited',
    meta: {
      title: '已审核',
    },
    component: audited
  },
  {
    path: 'businessManage/alreadyApplied',
    name: 'alreadyApplied',
    meta: {
      title: '已申请',
    },
    component: alreadyApplied
  },
  {
    path: 'businessManage/pendingReading',
    name: 'audipendingReadingted',
    meta: {
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
    },
    component: gameCreate
  },
  {
    path: 'businessManage/gameDetail',
    name: 'gameDetail',
    meta: {
      title: '游戏详情',
    },
    component: gameDetail
  },
  {
    path: 'businessManage/gameEdit',
    name: 'gameEdit',
    meta: {
      title: '游戏编辑',
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
    },
    component: trialPlanCreate
  },
  {
    path: 'businessManage/trialPlanDetail',
    name: 'trialPlanDetail',
    meta: {
      title: '试玩详情',
    },
    component: trialPlanDetail
  },
  {
    path: 'businessManage/trialPlanEdit',
    name: 'trialPlanEdit',
    meta: {
      title: '试玩计划编辑',
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
    },
    component: gameMarketPlanCreate
  },
  {
    path: 'businessManage/gameMarketPlanDetail',
    name: 'gameMarketPlanDetail',
    meta: {
      title: '上市计划详情',
    },
    component: gameMarketPlanDetail
  },
  {
    path: 'businessManage/gameMarketPlanEdit',
    name: 'gameMarketPlanEdit',
    meta: {
      title: '上市计划编辑',
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
    },
    component: gameChangePlanCreate
  },
  {
    path: 'businessManage/gameChangePlanDetail',
    name: 'gameChangePlanDetail',
    meta: {
      title: '变更计划详情',
    },
    component: gameChangePlanDetail
  },
  {
    path: 'businessManage/gameChangePlanEdit',
    name: 'gameChangePlanEdit',
    meta: {
      title: '变更计划编辑',
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
    },
    component: gameDelistingPlanCreate
  },
  {
    path: 'businessManage/gameDelistingPlanDetail',
    name: 'gameDelistingPlanDetail',
    meta: {
      title: '退市计划详情',
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
      title: '渠道业务管理',
    },
    component: channelList
  },
  {
    path: 'businessManage/channelCreate',
    name: 'channelCreate',
    meta: {
      title: '新建渠道',
    },
    component: channelCreate
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
      title: '设备查看',
    },
    component: equipmentDetail
  },
  {
    path: 'businessManage/channelResourceManage/facilityDetail',
    name: 'facilityDetail',
    meta: {
      title: '设施查看',
    },
    component: facilityDetail
  },
  {
    path: 'businessManage/channelResourceManage/consumableDetail',
    name: 'consumableDetail',
    meta: {
      title: '耗材查看',
    },
    component: consumableDetail
  },
  {
    path: 'businessManage/channelResourceManage/mountingsDetail',
    name: 'mountingsDetail',
    meta: {
      title: '配件查看',
    },
    component: mountingsDetail
  },
  {
    path: 'businessManage/channelResourceManage/mountRecordCheck',
    name: 'mountRecordCheck',
    meta: {
      title: '配件履历',
    },
    component: mountRecordCheck
  },
  {
    path: 'businessManage/channelResourceManage/equRecordCheck',
    name: 'equRecordCheck',
    meta: {
      title: '设备履历',
    },
    component: equRecordCheck
  },
  {
    path: 'businessManage/channelResourceManage/inventoryStatistics',
    name: 'inventoryStatistics',
    meta: {
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
      title: '入库',
    },
    component: putStore
  },
  {
    path: 'businessManage/channelResourceManage/alreadyPutDetail',
    name: 'alreadyPutDetail',
    meta: {
      title: '已入库详情',
    },
    component: alreadyPutDetail
  },
  {
    path: 'businessManage/channelResourceManage/outStore',
    name: 'outStore',
    meta: {
      title: '出库',
    },
    component: outStore
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
      title: '台账明细',
    },
    component: detailLedger
  },
  {
    path: 'businessManage/channelResourceManage/detailFlow',
    name: 'detailFlow',
    meta: {
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
      title: '仓库查看',
    },
    component: detail
  },
  {
    path: 'businessManage/channelResourceManage/addStore',
    name: 'addStore',
    meta: {
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
      title: '基本信息类型管理新增',
    },
    component: addEquipment
  },
  {
    path: 'businessManage/channelResourceManage/modification',
    name: 'modification',
    meta: {
      title: '基本信息类型管理修改',
    },
    component: modification
  },
  
  {
    path: 'businessManage/channelResourceManage/equipmentCheck',
    name: 'equipmentCheck',
    meta: {
      title: '基本信息类型管理设备查看',
    },
    component: equipmentCheck
},
  {
    path: 'businessManage/channelResourceManage/facilityCheck',
    name: 'facilityCheck',
    meta: {
      title: '基本信息类型管理设施查看',
    },
    component: facilityCheck
  },
  {
    path: 'businessManage/channelResourceManage/consumableCheck',
    name: 'consumableCheck',
    meta: {
      title: '基本信息类型管理耗材查看',
    },
    component: consumableCheck
  },
  {
    path: 'businessManage/channelResourceManage/mountingsCheck',
    name: 'mountingsCheck',
    meta: {
      title: '基本信息类型管理耗材查看',
    },
    component: mountingsCheck
  },
  {
    path: 'businessManage/channelResourceManage/modelCheck',
    name: 'modelCheck',
    meta: {
      title: '基本信息型号管理查看',
    },
    component: modelCheck
  },
  {
    path: 'businessManage/channelResourceManage/modelAdd',
    name: 'modelAdd',
    meta: {
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
    component: serviceAnalysis,
    children: [{
        path: '',
        redirect: {
          name: 'maintenanceEfficiency'
        },
        component: maintenanceEfficiency,
      },
      {
        path: 'maintenanceEfficiency',
        name: 'maintenanceEfficiency',
        meta: {
          title: '维修率分析',
        },
        component: maintenanceEfficiency,
      }, {
        path: 'accessoryFault',
        name: 'accessoryFault',
        meta: {
          title: '维修员排行',
        },
        component: accessoryFault,
      }, {
        path: 'equipmentFailure',
        name: 'equipmentFailure',
        meta: {
          title: '设备故障排行',
        },
        component: equipmentFailure,
      }, {
        path: 'maintenanceStaff',
        name: 'maintenanceStaff',
        meta: {
          title: '配件故障排行',
        },
        component: maintenanceStaff,
      }
    ]
  }, {
    path: 'businessManage/channelTerminal/maintenance',
    name: 'maintenance',
    meta: {
      title: '维修管理',
    },
    component: maintenance,
    children: [{
        path: 'repairWork',
        name: 'repairWork',
        meta: {
          title: '维修工单',
        },
        component: repairWork,
      },
      {
        path: 'replacementWork',
        name: 'replacementWork',
        meta: {
          title: '置换工单',
        },
        component: replacementWork,
      }
    ]
  }, {
    path: 'businessManage/channelTerminal/reportStatistics',
    name: 'reportStatistics',
    meta: {
      title: '报表统计',
    },
    component: reportStatistics
  }, {
    path: 'businessManage/channelTerminal/equipment',
    name: 'equipment',
    meta: {
      title: '设备管理',
    },
    component: equipment,
    children: [{
      path: 'equipmentList',
      name: 'equipmentList',
      meta: {
        title: '设备列表',
      },
      component: equipmentList,
      
    },{
      path: 'accessoriesList',
      name: 'accessoriesList',
      meta: {
        title: '配件列表',
      },
      component: accessoriesList,
    }]
  }, {
    path: 'businessManage/channelTerminal/equipmentDesc',
    name: 'equipmentDesc',
    meta: {
      title: '配件详情',
    },
    component: equipmentDesc,
  }, {
    path: 'businessManage/channelTerminal/equipmentResume',
    name: 'equipmentResume',
    meta: {
      title: '配件详情',
    },
    component: equipmentResume,
  },{
    path: 'businessManage/channelTerminal/knowledgeBase',
    name: 'knowledgeBase',
    meta: {
      title: '维护知识库',
    },
    component: knowledgeBase
  }, {
    path: 'businessManage/channelTerminal/configuration',
    name: 'configuration',
    meta: {
      title: '配置管理',
    },
    component: configuration
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
    path: 'businessManage/channelSalesPermission',
    name: 'channelSalesPermission',
    meta: {
      title: '销售权限',
    },
    component: channelSalesPermission
  },
  {
    path: 'businessManage/channelFundsPermission',
    name: 'channelFundsPermission',
    meta: {
      title: '资金权限',
    },
    component: channelFundsPermission
  },
  {
    path: 'businessManage/resourcePurchase',
    name: 'resourcePurchase',
    meta: {
      title: '资源采购',
    },
    component: resourcePurchase
  },
  {
    path: 'businessManage/resourceApply',
    name: 'resourceApply',
    meta: {
      title: '资源申请',
    },
    component: resourceApply
  },
  {
    path: 'businessManage/resourceProvide',
    name: 'resourceProvide',
    meta: {
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
    redirect: 'businessManage/developmentPlan/developmentPlanList',
    component: developmentPlan,
    children: [{
        path: 'developmentPlanList',
        name: 'developmentPlanList',
        meta: {
          title: '计划列表',
        },
        component: developmentPlanList,
      },
      {
        path: 'developmentPlanProvince',
        name: 'developmentPlanProvince',
        meta: {
          title: '计划汇总（省）',
        },
        component: developmentPlanProvince,
      },
      {
        path: 'developmentPlanCity',
        name: 'developmentPlanCity',
        meta: {
          title: '计划汇总（地市）',
        },
        component: developmentPlanCity,
      }
    ]
  },
  {
    path: 'businessManage/developmentPlanCreate',
    name: 'developmentPlanCreate',
    meta: {
      title: '新建年度发展计划',
    },
    component: developmentPlanCreate
  },
  {
    path: 'businessManage/fundParameter',
    name: 'fundParameter',
    meta: {
      title: '资金参数管理',
    },
    component: fundParameter
  },
  {
    path: 'businessManage/fundParameterDetail',
    name: 'fundParameterDetail',
    meta: {
      title: '资金参数管理详情',
    },
    component: fundParameterDetail
  },
  {
    path: 'businessManage/fundParameterEdit',
    name: 'fundParameterEdit',
    meta: {
      title: '资金参数管理编辑',
    },
    component: fundParameterEdit
  },
  {
    path: 'businessManage/globalParameterEdit',
    name: 'globalParameterEdit',
    meta: {
      title: '全局参数管理编辑',
    },
    component: globalParameterEdit
  },
  {
    path: 'businessManage/newfundParameter',
    name: 'newfundParameter',
    meta: {
      title: '新增全局参数管理',
    },
    component: newfundParameter
  },
  
  {
    path: 'businessManage/fundSettlement/globalParameter',
    name: 'globalParameter',
    meta: {
      title: '资金参数全局参数',
    },
    component: globalParameter
  },
  {
    path: 'businessManage/cardBalance',
    name: 'cardBalance',
    meta: {
      title: '投注卡余额',
    },
    component: cardBalance
  }, {
    path: 'businessManage/cardGeneration',
    name: 'cardGeneration',
    meta: {
      title: '投注卡生成',
    },
    component: cardGeneration
  }, {
    path: 'businessManage/refillRules',
    name: 'refillRules',
    meta: {
      title: '投注卡充值规则',
    },
    component: refillRules
  }, {
    path: 'businessManage/winningRecord',
    name: 'winningRecord',
    meta: {
      title: '投注卡中奖记录',
    },
    component: winningRecord
  }, {
    path: 'businessManage/withdrawalRecord',
    name: 'withdrawalRecord',
    meta: {
      title: '投注卡提现记录',
    },
    component: withdrawalRecord
  }, {
    path: 'businessManage/cardInformation',
    name: 'cardInformation',
    meta: {
      title: '投注卡信息',
    },
    component: cardInformation
  },
  {
    path: 'businessManage/dossierManage',
    name: 'dossierManage',
    meta: {
      title: '档案管理',
    },
    component: dossierManage
  },
  {
    path: 'businessManage/cardDetail',
    name: 'cardDetail',
    meta: {
      title: '投注卡明细',
    },
    component: cardDetail
  },
  {
    path: 'businessManage/balanceDetail',
    name: 'balanceDetail',
    meta: {
      title: '投注卡明细',
    },
    component: balanceDetail
  },
  {
    path: 'businessManage/infoDetail',
    name: 'infoDetail',
    meta: {
      title: '详情信息',
    },
    component: infoDetail
  }, 
  {
    path: 'businessManage/newCard',
    name: 'newCard',
    meta: {
      title: '新建卡片'
    },
    component: newCard
  },
  {
    path: 'businessManage/newRule',
    name: 'newRule',
    meta: {
      title: '新建规则'
    },
    component: newRule
  }, 
  {
    path: 'businessManage/exportCard',
    name: 'exportCard',
    meta: {
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
]