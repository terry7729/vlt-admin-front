// 业务运营系统路由配置
// 渠道账户列表
const accountList = () => import('@/views/businessOperation/channelAccount/account')
//渠道账户列表详情
const accountListDetail = () => import('@/views/businessOperation/channelAccount/accountListDetail')
//拥有渠道列表详情
const haveListDetail = () => import('@/views/businessOperation/channelAccount/haveListDetail')
// 账户资金
const accountManage = () => import('@/views/businessOperation/channelAccount/accountManage')
//活动计划模板
const planTemplate = () => import('@/views/businessOperation/brandMarketing/planTemplate')
//活动计划管理
const planManage = () => import('@/views/businessOperation/brandMarketing/planManage')
//活动执行管理
const executionManage = () => import('@/views/businessOperation/brandMarketing/executionManage')
//活动效果评估
const activityResult = () => import('@/views/businessOperation/brandMarketing/activityResult')
//模板预览
const previewTemplate = () => import('@/views/businessOperation/brandMarketing/previewTemplate')
//活动执行管理详情
const activityDetail = () => import('@/views/businessOperation/brandMarketing/activityDetail')
//计划详情
const planDetail = () => import('@/views/businessOperation/brandMarketing/planDetail')
//新建活动
const createActivity = () => import('@/views/businessOperation/brandMarketing/createActivity')
//分配任务
const allotTask = () => import('@/views/businessOperation/brandMarketing/allotTask')
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
  //渠道账户列表

  //渠道账户
  {
    path: 'businessOperation/accountList',
    name: 'accountList',
    meta: {
      title: '渠道账户列表',
    },
    component: accountList
  },
  {
    path: 'businessOperation/accountList/accountListDetail',
    name: 'accountListDetail',
    meta: {
      title: '渠道账户列表详情',
    },
    component: accountListDetail
  },
  {
    path: 'businessOperation/accountList/haveListDetail',
    name: 'haveListDetail',
    meta: {
      title: '拥有渠道列表详情',
    },
    component: haveListDetail
  },
  {
    path: 'businessOperation/accountManage',
    name: 'accountManage',
    meta: {
      title: '账户资金管理',
    },
    component: accountManage
  },
  //品牌与营销推广
  {
    path: 'brandMarketing/planTemplate',
    name: 'planTemplate',
    meta: {
      title: '活动计划模板',
    },
    component: planTemplate,
  },
  {
    path: 'brandMarketing/planManage',
    name: 'planManage',
    meta: {
      title: '活动计划管理',
    },
    component: planManage
  },
  {
    path: 'brandMarketing/executionManage',
    name: 'executionManage',
    meta: {
      title: '活动执行管理',
    },
    component: executionManage
  },
  {
    path: 'brandMarketing/activityResult',
    name: 'activityResult',
    meta: {
      title: '活动效果评估',
    },
    component: activityResult
  },
  {
    path: 'brandMarketing/previewTemplate',
    name: 'previewTemplate',
    meta: {
      title: '预览模板',
    },
    component: previewTemplate,
  },
  {
    path: 'brandMarketing/activityDetail',
    name: 'activityDetail',
    meta: {
      title: '活动执行详情',
    },
    component: activityDetail,
  },
  {
    path: 'brandMarketing/planDetail',
    name: 'planDetail',
    meta: {
      title: '计划详情',
    },
    component: planDetail,
  },
  {
    path: 'brandMarketing/createActivity',
    name: 'createActivity',
    meta: {
      title: '新建活动',
    },
    component: createActivity,
  },
  {
    path: 'brandMarketing/allotTask',
    name: 'allotTask',
    meta: {
      title: '分配任务',
    },
    component: allotTask,
  },



  



  
]