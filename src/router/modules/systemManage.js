// 系统管理系统路由配置
// 基本设置
const baseSetting = () => import('@/views/systemManage/settings/baseSetting')
// 邮件设置
const emailSetting = () => import('@/views/systemManage/settings/emailSetting')
//参数设置
const paramSetting= () => import('@/views/systemManage/settings/paramSetting')
//短信设置
const noteSetting= () => import('@/views/systemManage/settings/noteSetting')

//数据字典
const dataDictionary = () => import('@/views/systemManage/dataDictionary/dataDictionary')
//数据字典编辑
const dataDictionaryEdit = () => import('@/views/systemManage/dataDictionary/dataDictionaryEdit')

//业务流程
const formManage = () => import('@/views/systemManage/businessProcess/formManage')
const formCompile = () => import('@/views/systemManage/businessProcess/formCompile')
//流程设置
const processSet = () => import('@/views/systemManage/businessProcess/processSet')
//流程设置详情
const processSetDetail = () => import('@/views/systemManage/businessProcess/processSetDetail')
//流程分类
const processClassify = () => import('@/views/systemManage/businessProcess/processClassify')
//流程分类修改
const processClassifyModify = () => import('@/views/systemManage/businessProcess/processClassifyModify')

//用户列表
const userList = () => import('@/views/systemManage/userControl/userList')
//用户详情
const userDestails = () => import('@/views/systemManage/userControl/userDetails')
//用户编缉
const userInformed = () =>import('@/views/systemManage/userControl/userInformed')
//角色管理
const roleList = () => import('@/views/systemManage/roleManagement/roleList')
//角色编缉
const roleDestails = () =>import('@/views/systemManage/roleManagement/roledestails')
//角色详情
const roleifometion = () =>import('@/views/systemManage/roleManagement/rolueifo')
//组织架构
const organizationChild = () => import('@/views/systemManage/organization/organization')
//组织架构编缉页
const organicompile = () =>import('@/views/systemManage/organization/organicompile')
//菜单管理

const menuManageMent = () => import('@/views/systemManage/menuManageMent/menuManageMent')
//系统日志
const systemOperationLog = () => import('@/views/systemManage/systemLog/systemLog')
//系统开关
const systemSwitch = () => import('@/views/systemManage/systemSwitch/systemSwitch')
//假日参数管理
const holidayParametersManagement = () => import('@/views/systemManage/holidayParametersManagement/holidayParametersManagement')
//终端事件管理
const TerminalEventControl = () => import('@/views/systemManage/TerminalEventManagement/TerminalEventManagement')
//终端事件日志
const TerminalEventLog = () => import('@/views/systemManage/TerminalEventManagement/TerminalEventLog')

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
    path: 'systemManage/paramSetting',
    name: 'paramSetting',
    meta: {
      title: '参数设置',
    },
    component: paramSetting
  },
  {
    path: 'systemManage/noteSetting',
    name: 'noteSetting',
    meta: {
      title: '短信设置',
    },
    component:noteSetting
  },
  {
    path :'systemManage/formManage',
    name:'formManage',
    meta:{
      title:'表单管理',
    },
    component:formManage
  },
  {
    path :'systemManage/formManage/formCompile',
    name:'formCompile',
    meta:{
      title:'表单管理编辑',
    },
    component:formCompile
  },
  {
    path :'systemManage/processSet',
    name:'processSet',
    meta:{
      title:'流程设置',
    },
    component:processSet
  },
  {
    path :'systemManage/processSet/processSetDetail',
    name:'processSetDetail',
    meta:{
      title:'流程设置编辑',
    },
    component:processSetDetail
  },
  {
    path :'systemManage/processClassify',
    name:'processClassify',
    meta:{
      title:'流程分类',
    },
    component:processClassify
  },
  {
    path :'systemManage/processClassify/processClassifyModify',
    name:'processClassifyModify',
    meta:{
      title:'流程分类修改',
    },
    component:processClassifyModify
  },
  {
    path :'systemManage/dataDictionary',
    name:'dataDictionary',
    meta:{
      title:'数据字典',
    },
    component:dataDictionary
  },
  {
    path :'systemManage/dataDictionary/dataDictionaryEdit',
    name:'dataDictionaryEdit',
    meta:{
      title:'数据字典编辑',
    },
    component:dataDictionaryEdit
  },
  {

    path: 'systemManage/userList',
    name: 'userList',
    meta: {
      title: '用户列表',
    },
    component: userList,


  }, {

    path: 'systemManage/userList/userDestails',
    name: 'userDestails',
    meta: {
      title: '用户信息',
    },
    component: userDestails,

  },
  {

    path: 'systemManage/userList/userInformed',
    name: 'userInformed',
    meta: {
      title: '用户编缉',
    },
    component: userInformed,

  },
  {
    path: 'systemManage/roleList',
    name: 'roleList',
    meta: {
      title: '角色列表',
    },
    component: roleList
},
{
  path: 'systemManage/roleList/roleDestails',
  name: 'roleDestails',
  meta: {
    title: '角色编缉',
  },
  component: roleDestails
},
{
  path: 'systemManage/roleList/roleifometion',
  name: 'roleifometion',
  meta: {
    title: '角色信息',
  },
  component: roleifometion
},
{
  path: 'systemManage/organizationChild',
  name: 'organizationChild',
  meta: {
    title: '组织架构',
  },
  component: organizationChild
},
{
  path:'systemManage/organizationChild/organicompile',
  name:"organicompile",
  meta: {
    title: '添加机构信息',
  },
  component: organicompile

},
{
  path: 'systemManage/menuManageMent',
  name: 'menuManageMent',
  meta: {
    title: '菜单管理',
  },
  component: menuManageMent
},
{
  path: 'systemManage/systemOperationLog',
  name: 'systemOperationLog',
  meta: {
    title: '系统操作日志',
  },
  component: systemOperationLog
},
{
  path: 'systemManage/systemSwitch',
  name: 'systemSwitch',
  meta: {
    title: '系统开关',
  },
  component: systemSwitch
},
{
  path: 'systemManage/holidayParametersManagement',
  name: 'holidayParametersManagement',
  meta: {
    title: '假日参数管理',
  },
  component: holidayParametersManagement
},
{
  path: 'systemManage/TerminalEventControl',
  name: 'TerminalEventControl',
  meta: {
    title: '终端事件控制',
  },
  component: TerminalEventControl
},
{
  path: 'systemManage/TerminalEventLog',
  name: 'TerminalEventLog',
  meta: {
    title: '终端事件控制',
  },
  component: TerminalEventLog
}
]