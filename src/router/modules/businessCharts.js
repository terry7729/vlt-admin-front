// 业务监控系统路由配置
// 中心监控
const centerWatch = () => import('@/views/businessCharts/screenWatch/centerWatch')
// 省级监控
const provinceWatch = () => import('@/views/businessCharts/screenWatch/provinceWatch')

const centerDeal = () => import('@/views/businessCharts/dealData/centerDeal')
const provinceDeal = () => import('@/views/businessCharts/dealData/provinceDeal')
const cityDeal = () => import('@/views/businessCharts/dealData/cityDeal')
const areaDeal = () => import('@/views/businessCharts/dealData/areaDeal')
const gameDeal = () => import('@/views/businessCharts/dealData/gameDeal')
const accountWatch = () => import('@/views/businessCharts/saleshallAccountWatch/saleshallAccountWatch')
const equipmentWatch = () => import('@/views/businessCharts/saleshallEquipmentWatch/saleshallEquipmentWatch')
const warningWatch = () => import('@/views/businessCharts/warningWatch')
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
  },  {
    path: 'businessCharts/areaDeal',
    name: 'areaDeal',
    meta: {
      title: '区域交易数据',
    },
    component: areaDeal
  },  {
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
    path: 'businessCharts/equipmentWatch',
    name: 'equipmentWatch',
    meta: {
      title: '销售厅设备监控',
    },
    component: equipmentWatch
  },{
    path: 'businessCharts/warningWatch',
    name: 'warningWatch',
    meta: {
      title: '告警监控',
    },
    component: warningWatch
  }

]