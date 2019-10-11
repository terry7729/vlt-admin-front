// 系统管理系统路由配置
// 基本设置
const baseSetting = () => import('@/views/systemManage/settings/baseSetting')
// 邮件设置
const emailSetting = () => import('@/views/systemManage/settings/emailSetting')
//数据字典
const dataDictionary = () => import('@/views/systemManage/dataDictionary/index')

//业务流程
const formManager = () => import('@/views/systemManage/businessProcess/formManager')
//流程设置
const processSet = () => import('@/views/systemManage/businessProcess/processSet')
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
    path: 'systemManage/baseSetting',
    name: 'baseSetting',
    meta: {
      title: '基本设置',
    },
    component: baseSetting
  },
  {
    path: 'systemManage/emailSetting',
    name: 'emailSetting',
    meta: {
      title: '邮件设置',
    },
    component: emailSetting
  },
  {
    path: 'systemManage/emailSetting',
    name: 'emailSetting',
    meta: {
      title: '邮件设置',
    },
    component: emailSetting
  },
  {
    path :'systemManage/formManager',
    name:'formManager',
    meta:{
      title:'表单管理',
    },
    component:formManager
  },
  {
    path :'systemManage/processSet',
    name:'processSet',
    meta:{
      title:'流程设置',
    },
    component:processSet
  },
]