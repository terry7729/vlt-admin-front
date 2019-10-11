// 业务监控系统路由配置
// 中心监控
const centerWatch = () => import('@/views/businessCharts/screenWatch/centerWatch')
// 省级监控
const provinceWatch = () => import('@/views/businessCharts/screenWatch/provinceWatch')

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
      title: '中心监控',
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
  }
]