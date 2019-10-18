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





// 渠道业务管理
const channelList = () => import('@/views/businessManage/channelBusinessManage/channelList')
// const channelAdd = () => import('@/views/businessManage/channelBusinessManage/channelAdd')
//渠道资源管理
const inventoryManage = () => import('@/views/businessManage/channelResourceManage/inventoryManage/inventoryManage')
const outPutManage = () => import('@/views/businessManage/channelResourceManage/outPutManage/outPutManage')
const ledgerManage = () => import('@/views/businessManage/channelResourceManage/ledgerManage/ledgerManage')
const warehouseManage = () => import('@/views/businessManage/channelResourceManage/warehouseManage/warehouseManage')
const basicInfoManage = () => import('@/views/businessManage/channelResourceManage/basicInfoManage/basicInfoManage')
//设备查看
const equipmentDetail = () => import('@/views/businessManage/channelResourceManage/inventoryManage/equipmentDetail')
//盘点统计
const inventoryStatistics = () => import('@/views/businessManage/channelResourceManage/inventoryManage/inventoryStatistics')
//入库
const putStore = () => import('@/views/businessManage/channelResourceManage/outPutManage/putStore')
const channelCreate = () => import('@/views/businessManage/channelBusinessManage/channelCreate')
const channelDeal = () => import('@/views/businessManage/channelBusinessManage/channelDeal')
const channelSalesPermission = () => import('@/views/businessManage/channelBusinessManage/channelSalesPermission')
const developmentPlan = () => import('@/views/businessManage/channelBusinessManage/developmentPlan')
const developmentPlanCreate = () => import('@/views/businessManage/channelBusinessManage/developmentPlanCreate')
const dossierManage = () => import('@/views/businessManage/channelBusinessManage/dossierManage')

// 渠道终端管理
const channelTerminal = () => import('@/views/businessManage/channelTerminalManagement')
const configuration = () => import('@/views/businessManage/channelTerminalManagement/configuration')
const equipment = () => import('@/views/businessManage/channelTerminalManagement/equipment')
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

// 投注卡管理
const cardBalance = () => import('@/views/businessManage/bettingCardManage/cardBalance')
const cardGeneration = () => import('@/views/businessManage/bettingCardManage/cardGeneration')
const refillRules = () => import('@/views/businessManage/bettingCardManage/refillRules')
const winningRecord = () => import('@/views/businessManage/bettingCardManage/winningRecord')
const withdrawalRecord = () => import('@/views/businessManage/bettingCardManage/withdrawalRecord')
const cardInformation = () => import('@/views/businessManage/bettingCardManage/cardInformation')



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
      title: '创建游戏试玩计划',
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
      title: '创建上市计划',
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
      title: '创建变更计划',
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
    path: 'businessManage/channelResourceManage/ledgerManage',
    name: 'ledgerManage',
    meta: {
      title: '台账管理',
    },
    component: ledgerManage
  },
  {
    path: 'businessManage/channelResourceManage/warehouseManage',
    name: 'warehouseManage',
    meta: {
      title: '仓库管理',
    },
    component: warehouseManage
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
    component: equipment
  }, {
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
    path: 'businessManage/developmentPlan',
    name: 'developmentPlan',
    meta: {
      title: '年度发展计划',
    },
    component: developmentPlan
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
  }
]