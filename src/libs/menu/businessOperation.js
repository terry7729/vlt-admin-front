// 业务运营-左侧导航数据

export default [
  {
    childResources: [
      {
        childResources: [
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "渠道账户列表",
            url: 'accountList'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "账户管理",
            url: 'accountManage'
          }
        ],
        icon: "el-icon-menu",
        name: "渠道账户",
        url: 'screenWatch'
      }
    ],
    icon: "el-icon-menu",
    name: "业务运营",
    url: '' // 前端路由名称
  }
]