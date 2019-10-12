// 业务管理系统路由配置
// 首页概况
const overview = () => import('@/views/businessManage/home/overview')
// 待审核
const pendingReview = () => import('@/views/businessManage/home/pendingReview')
// 处理待审核
const editPendingReview = () => import('@/views/businessManage/home/editPendingReview')
// 游戏储备列表
const gameStoreList = () => import('@/views/businessManage/gameStoreManage/gameStoreList')
// 游戏试玩计划列表
const gamePlanList = () => import('@/views/businessManage/gameStoreManage/gamePlanList')
// 游戏发行计划列表
const gameLaunchPlan = () => import('@/views/businessManage/gameReleaseManage/gameLaunchPlan')
// 游戏配置管理
const gameConfigManage = () => import('@/views/businessManage/gameReleaseManage/gameConfigManage')
const gameDelistPlan = () => import('@/views/businessManage/gameReleaseManage/gameDelistPlan')
const check = () => import('@/views/businessManage/gameStoreManage/check')
const edit = () => import('@/views/businessManage/gameStoreManage/edit')


// 渠道业务管理
const channelList = () => import('@/views/businessManage/channelBusinessManage/channelList')
const channelAdd = () => import('@/views/businessManage/channelBusinessManage/channelAdd')

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
    path: 'businessManage/editPendingReview',
    name: 'editPendingReview',
    meta: {
      title: '待审核-处理',
    },
    component: editPendingReview
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
    path: 'businessManage/check',
    name: 'check',
    meta: {
      title: '查看',
    },
    component: check
  },
  {
    path: 'businessManage/edit',
    name: 'edit',
    meta: {
      title: '编辑',
    },
    component: edit
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
  }
]