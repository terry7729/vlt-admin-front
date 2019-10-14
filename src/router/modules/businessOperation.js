// 业务运营系统路由配置
// 渠道账户列表
const accountList = () => import('@/views/businessOperation/channelAccount/account')
//渠道账户列表详情
const accountListDetail = () => import('@/views/businessOperation/channelAccount/accountListDetail')
//拥有渠道列表详情
const haveListDetail = () => import('@/views/businessOperation/channelAccount/haveListDetail')
// 账户资金管理
const accountManage = () => import('@/views/businessOperation/channelAccount/accountManage')
//账户资金管理银行新增
const bankadd = () => import('@/views/businessOperation/channelAccount/bankadd')
//账户资金管理银行修改
const bankrevise = () => import('@/views/businessOperation/channelAccount/bankrevise')
//账户资金管理银行余额
const bankbalance = () => import('@/views/businessOperation/channelAccount/bankbalance')
//账户资金管理银行明细
const bankdetail = () => import('@/views/businessOperation/channelAccount/bankdetail')
//账户资金管理第三方支付新增
const externaladd = () => import('@/views/businessOperation/channelAccount/externaladd')
//账户资金管理第三方支付修改
const externalrevise = () => import('@/views/businessOperation/channelAccount/externalrevise')
//账户资金管理第三方支付余额
const externalbalance = () => import('@/views/businessOperation/channelAccount/externalbalance')
//账户资金管理第三方支付明细
const externaldetail = () => import('@/views/businessOperation/channelAccount/externaldetail')
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
  {
    path: 'businessOperation/accountManage/bankadd',
    name: 'bankadd',
    meta: {
      title: '银行新增',
    },
    component: bankadd
  },
  {
    path: 'businessOperation/accountManage/bankrevise',
    name: 'bankrevise',
    meta: {
      title: '银行修改',
    },
    component: bankrevise
  },

  {
    path: 'businessOperation/accountManage/bankbalance',
    name: 'bankbalance',
    meta: {
      title: '银行余额',
    },
    component: bankbalance
  },
  {
    path: 'businessOperation/accountManage/bankdetail',
    name: 'bankdetail',
    meta: {
      title: '银行明细',
    },
    component: bankdetail
  },
  {
    path: 'businessOperation/accountManage/externaladd',
    name: 'externaladd',
    meta: {
      title: '第三方支付新增',
    },
    component: externaladd
  },
  {
    path: 'businessOperation/accountManage/externalrevise',
    name: 'externalrevise',
    meta: {
      title: '第三方支付修改',
    },
    component: externalrevise
  },
  {
    path: 'businessOperation/accountManage/externalbalance',
    name: 'externalbalance',
    meta: {
      title: '第三方支付余额',
    },
    component: externalbalance
  },
  {
    path: 'businessOperation/accountManage/externaldetail',
    name: 'externaldetail',
    meta: {
      title: '第三方支付明细',
    },
    component: externaldetail
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