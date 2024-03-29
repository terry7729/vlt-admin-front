// 业务监控系统路由配置
// 中心监控
const centerWatch = () => import('@/views/businessCharts/screenWatch/centerWatch')
//中央交易数据
const centerDeal = () => import('@/views/businessCharts/dealData/centerDeal')
//省级交易数据
const provinceDeal = () => import('@/views/businessCharts/dealData/provinceDeal')
//城市交易数据
const cityDeal = () => import('@/views/businessCharts/dealData/cityDeal')
//区域交易数据
const areaDeal = () => import('@/views/businessCharts/dealData/areaDeal')
//游戏交易监控
const gameDeal = () => import('@/views/businessCharts/dealData/gameDeal')
//销售厅账户监控
const accountWatch = () => import('@/views/businessCharts/saleshallAccountWatch')
//销售厅设备数据监控
const equipmentDataWatch = () => import('@/views/businessCharts/saleshallEquipmentWatch/equipmentDataWatch')
//销售厅设备硬件监控
const equipmentHardwareWatch = () => import('@/views/businessCharts/saleshallEquipmentWatch/equipmentHardwareWatch')
//告警监控
const warningWatch = () => import('@/views/businessCharts/warningWatch')
//报表管理
const warningReport = () => import('@/views/businessCharts/warningReport')

//奖池风险
const pondRisk = () => import('@/views/businessCharts/warningRule/pondRisk')

//城市风险
const cityRisk = () => import('@/views/businessCharts/warningRule/cityRisk')

//城市游戏风险
const cityGameRisk = () => import('@/views/businessCharts/warningRule/cityGameRisk')
//告警通知
// const warningNotice = () => import('@/views/businessCharts/warningRule/warningNotice')

//用户风险
const userRisk = () => import('@/views/businessCharts/warningRule/userRisk')
//告警监控详情
const warningWatchDetail = () => import('@/views/businessCharts/warningWatch/modules/warningWatchDetail')
//告警监控编辑
const warningWatchEdit = () => import('@/views/businessCharts/warningWatch/modules/warningWatchEdit')
//demo
const componentDemo = () => import('@/views/componentDemo')

//城市风险指标新增
const cityRiskAdd = () => import('@/views/businessCharts/warningRule/cityRiskAdd')
//奖池风险指标新增
const pondRiskAdd = () => import('@/views/businessCharts/warningRule/pondRiskAdd')

//城市游戏风险指标新增
const gameRiskAdd = () => import('@/views/businessCharts/warningRule/gameRiskAdd')
//城市游戏风险指标详情
const gameRiskDetail = () => import('@/views/businessCharts/warningRule/gameRiskDetail')
//奖池风险指标详情
const pondRiskDetail = () => import('@/views/businessCharts/warningRule/pondRiskDetail')
//城市风险指标详情
const cityRiskDetail = () => import('@/views/businessCharts/warningRule/cityRiskDetail')
//城市游戏风险指标编辑
const gameRiskEdit = () => import('@/views/businessCharts/warningRule/gameRiskEdit')
//城市风险指标编辑
const cityRiskEdit = () => import('@/views/businessCharts/warningRule/cityRiskEdit')
//奖池风险指标编辑
const pondRiskEdit = () => import('@/views/businessCharts/warningRule/pondRiskEdit')
//用户风险指标编辑
const userRiskAdd = () => import('@/views/businessCharts/warningRule/userRiskAdd')
//userRiskEdit
const userRiskEdit = () => import('@/views/businessCharts/warningRule/userRiskEdit')
export default [
  {
    path: 'businessCharts/componentDemo',
    name: 'componentDemo',
    meta: {
      title: '组件demo',
    },
    component: componentDemo
  },
  // {
  //   path: 'businessCharts/echarts',
  //   name: 'echarts',
  //   meta: {
  //     title: '省市区地图',
  //   },
  //   component: echarts
  // },
  // {
  //   path: '/',
  //   name: 'businessCharts',
  //   redirect: {
  //     path: 'businessCharts/centerWatch'
  //   }
  // },
  {
    path: 'businessCharts/centerWatch',
    name: 'centerWatch',
    meta: {
      title: '大屏监控',
    },
    component: centerWatch
  },

  {
    path: 'businessCharts/centerDeal',
    name: 'centerDeal',
    meta: {
      title: '中央交易数据',
    },
    component: centerDeal
  },
  {
    path: 'businessCharts/provinceDeal',
    name: 'provinceDeal',
    meta: {
      title: '省级交易数据',
    },
    component: provinceDeal
  },
  {
    path: 'businessCharts/cityDeal',
    name: 'cityDeal',
    meta: {
      title: '市级交易数据',
    },
    component: cityDeal
  }, {
    path: 'businessCharts/areaDeal',
    name: 'areaDeal',
    meta: {
      title: '区域交易数据',
    },
    component: areaDeal
  }, {
    path: 'businessCharts/gameDeal',
    name: 'gameDeal',
    meta: {
      title: '游戏交易数据',
    },
    component: gameDeal
  },
  {
    path: 'businessCharts/accountWatch',
    name: 'accountWatch',
    meta: {
      title: '销售厅账户监控',
    },
    component: accountWatch
  },
  {
    path: 'businessCharts/equipmentDataWatch',
    name: 'equipmentDataWatch',
    meta: {
      title: '销售厅设备数据监控',
    },
    component: equipmentDataWatch
  }, {
    path: 'businessCharts/equipmentHardwareWatch',
    name: 'equipmentHardwareWatch',
    meta: {
      title: '销售厅设备硬件监控',
    },
    component: equipmentHardwareWatch
  },
  {
    path: 'businessCharts/warningReport',
    name: 'warningReport',
    meta: {
      title: '告警报告',
    },
    component: warningReport
  },
  {
    path: 'businessCharts/warningWatch',
    name: 'warningWatch',
    meta: {
      title: '告警监控',
    },
    component: warningWatch
  },
  {
    path: 'businessCharts/pondRisk',
    name: 'pondRisk',
    meta: {
      title: '奖池风险指标',
    },
    component: pondRisk
  },
  {
    path: 'businessCharts/cityRisk',
    name: 'cityRisk',
    meta: {
      title: '城市风险指标',
    },
    component: cityRisk
  },
  {
    path: 'businessCharts/cityGameRisk',
    name: 'cityGameRisk',
    meta: {
      title: '城市游戏风险指标',
    },
    component: cityGameRisk
  },
  /// {
  //   path: 'businessCharts/warningNotice',
  //   name: 'warningNotice',
  //   meta: {
  //     title: '城市游戏风险指标',
  //   },
  //   component: warningNotice
  // },
  {
    path: 'businessCharts/userRisk',
    name: 'userRisk',
    meta: {
      title: '用户风险指标',
    },
    component: userRisk
  },
  {
    path: 'businessCharts/warningWatchDetail',
    name: 'warningWatchDetail',
    meta: {
      title: '告警监控详情',
      parentName:'warningWatch'
    },
    component: warningWatchDetail
  },
  {
    path: 'businessCharts/warningWatchEdit',
    name: 'warningWatchEdit',
    meta: {
      title: '告警监控编辑',
      parentName:'warningWatch'
    },
    component: warningWatchEdit
  },
  {
    path: 'businessCharts/cityRiskAdd',
    name: 'cityRiskAdd',
    meta: {
      title: '城市风险指标新增',
      parentName:'cityRisk'
    },
    component: cityRiskAdd
  },
  {
    path: 'businessCharts/pondRiskAdd',
    name: 'pondRiskAdd',
    meta: {
      title: '奖池风险指标新增',
      parentName:'pondRisk'
    },
    component: pondRiskAdd
  },
  {
    path: 'businessCharts/gameRiskAdd',
    name: 'gameRiskAdd',
    meta: {
      title: '城市游戏风险指标新增',
      parentName:'cityGameRisk'
    },
    component: gameRiskAdd
  }, {
    path: 'businessCharts/gameRiskDetail',
    name: 'gameRiskDetail',
    meta: {
      title: '城市游戏风险指标详情',
      parentName:'cityGameRisk'
    },
    component: gameRiskDetail
  },{
    path: 'businessCharts/pondRiskDetail',
    name: 'pondRiskDetail',
    meta: {
      title: '奖池风险指标详情',
      parentName:'pondRisk'
    },
    component: pondRiskDetail
  }, {
    path: 'businessCharts/cityRiskDetail',
    name: 'cityRiskDetail',
    meta: {
      title: '奖池风险指标详情',
      parentName:'cityRisk'
    },
    component: cityRiskDetail
  },
  {
    path: 'businessCharts/gameRiskEdit',
    name: 'gameRiskEdit',
    meta: {
      title: '奖池风险指标编辑',
      parentName:'cityGameRisk'
    },
    component: gameRiskEdit
  },
  {
    path: 'businessCharts/cityRiskEdit',
    name: 'cityRiskEdit',
    meta: {
      title: '城市风险指标编辑',
      parentName:'cityRisk'
    },
    component: cityRiskEdit
  },
  {
    path: 'businessCharts/pondRiskEdit',
    name: 'pondRiskEdit',
    meta: {
      title: '城市风险指标编辑',
      parentName:'pondRisk'
    },
    component: pondRiskEdit
  },
  {
    path: 'businessCharts/userRiskAdd',
    name: 'userRiskAdd',
    meta: {
      title: '用户风险指标新增',
      parentName:'userRisk'
    },
    component: userRiskAdd
  },
  {
    path: 'businessCharts/userRiskEdit',
    name: 'userRiskEdit',
    meta: {
      title: '用户风险指标编辑',
      parentName:'userRisk'
    },
    component: userRiskEdit
  },
   
   
  

]