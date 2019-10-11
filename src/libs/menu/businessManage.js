// 业务管理-左侧导航数据

export default [
  {
    childResources: [{
      childResources: [
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "概况",
          url: 'overview'
        }
      ],
      icon: "el-icon-menu",
      name: "首页",
      url: 'overview'
    },
      {
        icon: "el-icon-menu",
        name: "游戏储备管理",
        url: 'gameStoreManage',
        childResources: [
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "储备列表",
            url: 'gameStoreList'
          }
        ]
      },
      {
        icon: "el-icon-menu",
        name: "游戏试玩计划管理",
        url: 'gamePlanManage',
        childResources: [
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "计划列表",
            url: 'gamePlanList'
          }
        ]
      },
      {
        icon: "el-icon-menu",
        name: "渠道业务管理",
        url: 'channelBusinessManage',
        childResources: [
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "渠道列表",
            url: 'channelList'
          }
        ],
      }
    ],
    icon: "el-icon-menu",
    name: "业务管理",
    url: '' // 前端路由名称
  }
]