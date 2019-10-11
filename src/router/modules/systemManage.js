// 系统管理系统路由配置
// 基本设置
const baseSetting = () => import('@/views/systemManage/settings/baseSetting')
// 邮件设置
const emailSetting = () => import('@/views/systemManage/settings/emailSetting')

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
  }
]