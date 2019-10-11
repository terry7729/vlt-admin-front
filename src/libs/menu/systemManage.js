// 系统管理-左侧导航数据

export default [
  {
    childResources: [
      {
        childResources: [
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "基本设置",
            url: 'baseSetting'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "邮件设置",
            url: 'emailSetting'
          }
        ],
        icon: "el-icon-menu",
        name: "系统设置",
        url: 'settings'
      }
    ],
    icon: "el-icon-menu",
    name: "系统管理",
    url: '' // 前端路由名称
  }
]