// 业务监控系统路由配置
// 中心监控
const centerWatch = () => import('@/views/businessCharts/screenWatch/centerWatch')
// 省级监控
const provinceWatch = () => import('@/views/businessCharts/screenWatch/provinceWatch')
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
const warningNotice = () => import('@/views/businessCharts/warningRule/warningNotice')

//用户风险
const userRisk = () => import('@/views/businessCharts/warningRule/userRisk')
//告警监控详情
const warningWatchDetail = () => import('@/views/businessCharts/warningWatch/modules/warningWatchDetail')
//告警监控编辑
const warningWatchEdit = () => import('@/views/businessCharts/warningWatch/modules/warningWatchEdit')
//demo
const demo = () => import('@/views/componentDemo')
//城市风险指标新增
const cityRiskAdd = () => import('@/views/businessCharts/warningRule/cityRiskAdd')
//奖池风险指标新增
const pondRiskAdd = () => import('@/views/businessCharts/warningRule/pondRiskAdd')

export default [{
    path: 'demo',
    name: 'demo',
    component: demo,
    meta: {
      parentName: '', // 当左侧菜单匹配不到当前路由时(菜单无对应激活状态),请设置该属性值(菜单可激活的父级路由名称)
      title: '路由说明'
    }
  },
  {
    path: '/',
    name: 'businessCharts',
    redirect: {
      path: 'businessCharts/centerWatch'
    }
  },
  {
    path: 'businessCharts/centerWatch',
    name: 'centerWatch',
    meta: {
      title: '大屏监控',
    },
    component: centerWatch
  },
  {
    path: 'businessCharts/provinceWatch',
    name: 'provinceWatch',
    meta: {
      title: '省级监控',
    },
    component: provinceWatch
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
  {
    path: 'businessCharts/warningNotice',
    name: 'warningNotice',
    meta: {
      title: '城市游戏风险指标',
    },
    component: warningNotice
  },
  {
    path: 'businessCharts/userRisk',
    name: 'userRisk',
    meta: {
      title: '城市游戏风险指标',
    },
    component: userRisk
  },
  {
    path: 'businessCharts/warningWatchDetail',
    name: 'warningWatchDetail',
    meta: {
      title: '告警监控详情',
    },
    component: warningWatchDetail
  },
  {
    path: 'businessCharts/warningWatchEdit',
    name: 'warningWatchEdit',
    meta: {
      title: '告警监控编辑',
    },
    component: warningWatchEdit
  },
  {
    path: 'businessCharts/cityRiskAdd',
    name: 'cityRiskAdd',
    meta: {
      title: '城市风险指标新增',
    },
    component: cityRiskAdd
  },
  {
    path: 'businessCharts/pondRiskAdd',
    name: 'pondRiskAdd',
    meta: {
      title: '奖池风险指标新增',
    },
    component: pondRiskAdd
  }

]