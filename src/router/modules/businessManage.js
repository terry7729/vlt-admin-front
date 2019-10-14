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
const gameStoreList = () => import('@/views/businessManage/gameStoreManage/gameStoreList')
// 游戏试玩计划列表
const gamePlanList = () => import('@/views/businessManage/gameStoreManage/gamePlanList')
// 游戏上市计划列表
const gameLaunchPlan = () => import('@/views/businessManage/gameReleaseManage/gameLaunchPlan')
// 游戏配置管理
const gameConfigManage = () => import('@/views/businessManage/gameReleaseManage/gameConfigManage')
//退市计划
const gameDelistPlan = () => import('@/views/businessManage/gameReleaseManage/gameDelistPlan')
const storeCheck = () => import('@/views/businessManage/gameStoreManage/storeCheck')
const storeEdit = () => import('@/views/businessManage/gameStoreManage/storeEdit')
const planCheck = () => import('@/views/businessManage/gameStoreManage/planCheck')
const planEdit = () => import('@/views/businessManage/gameStoreManage/planEdit')
const addGame = () => import('@/views/businessManage/gameStoreManage/addGame')



// 渠道业务管理
const channelList = () => import('@/views/businessManage/channelBusinessManage/channelList')
const channelAdd = () => import('@/views/businessManage/channelBusinessManage/channelAdd')

// 渠道终端管理
const channelTerminal = () => import('@/views/businessManage/channelTerminalManagement')
const configuration = () => import('@/views/businessManage/channelTerminalManagement/configuration')
const equipment = () => import('@/views/businessManage/channelTerminalManagement/equipment')
const maintenance = () => import('@/views/businessManage/channelTerminalManagement/maintenance')
const knowledgeBase = () => import('@/views/businessManage/channelTerminalManagement/knowledgeBase')
const reportStatistics = () => import('@/views/businessManage/channelTerminalManagement/reportStatistics')
const serviceAnalysis = () => import('@/views/businessManage/channelTerminalManagement/serviceAnalysis')
const channelDeal = () => import('@/views/businessManage/channelBusinessManage/channelDeal')
const developmentPlan = () => import('@/views/businessManage/channelBusinessManage/developmentPlan')
const createDevelopmentPlan = () => import('@/views/businessManage/channelBusinessManage/createDevelopmentPlan')

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
    path: 'businessManage/gameStoreList',
    name: 'gameStoreList',
    meta: {
      title: '游戏储备',
    },
    component: gameStoreList
  },
  {
    path: 'businessManage/addGame',
    name: 'addGame',
    meta: {
      title: '新建游戏',
    },
    component: addGame
  },
  {
    path: 'businessManage/gamePlanList',
    name: 'gamePlanList',
    meta: {
      title: '游戏试玩计划',
    },
    component: gamePlanList
  },
  {
    path: 'businessManage/gameLaunchPlan',
    name: 'gameLaunchPlan',
    meta: {
      title: '游戏上市计划',
    },
    component: gameLaunchPlan
  },
  {
    path: 'businessManage/gameConfigManage',
    name: 'gameConfigManage',
    meta: {
      title: '游戏配置管理',
    },
    component: gameConfigManage
  },
  {
    path: 'businessManage/gameDelistPlan',
    name: 'gameDelistPlan',
    meta: {
      title: '游戏退市计划',
    },
    component: gameDelistPlan
  },
  {
    path: 'businessManage/storeCheck',
    name: 'storeCheck',
    meta: {
      title: '查看',
    },
    component: storeCheck
  },
  {
    path: 'businessManage/storeEdit',
    name: 'storeEdit',
    meta: {
      title: '编辑',
    },
    component: storeEdit
  },
  {
    path: 'businessManage/planCheck',
    name: 'planCheck',
    meta: {
      title: '试玩查看',
    },
    component: planCheck
  },
  {
    path: 'businessManage/planEdit',
    name: 'planEdit',
    meta: {
      title: '试玩编辑',
    },
    component: planEdit
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
    path: 'businessManage/channelAdd',
    name: 'channelAdd',
    meta: {
      title: '新建渠道',
    },
    component: channelAdd
  },  {
    path: 'businessManage/channelTerminal',
    name: 'channelTerminal',
    meta: {
      title: '服务分析',
    },
    component: channelTerminal,
    children: [
      {
        path: 'serviceAnalysis',
        name: 'serviceAnalysis',
        meta: {
          title: '服务分析',
        },
        component: serviceAnalysis
      }, {
        path: 'maintenance',
        name: 'maintenance',
        meta: {
          title: '维修管理',
        },
        component: maintenance
      }, {
        path: 'reportStatistics',
        name: 'reportStatistics',
        meta: {
          title: '报表统计',
        },
        component: reportStatistics
      }, {
        path: 'equipment',
        name: 'equipment',
        meta: {
          title: '设备管理',
        },
        component: equipment
      }, {
        path: 'knowledgeBase',
        name: 'knowledgeBase',
        meta: {
          title: '维护知识库',
        },
        component: knowledgeBase
      }, {
        path: 'configuration',
        name: 'configuration',
        meta: {
          title: '配置管理',
        },
        component: configuration
      }
    ]
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
    path: 'businessManage/developmentPlan',
    name: 'developmentPlan',
    meta: {
      title: '年度发展计划',
    },
    component: developmentPlan
  },
  {
    path: 'businessManage/createDevelopmentPlan',
    name: 'createDevelopmentPlan',
    meta: {
      title: '年度发展计划',
    },
    component: createDevelopmentPlan
  }

]