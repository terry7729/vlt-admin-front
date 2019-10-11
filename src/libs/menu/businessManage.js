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
            name: "游戏储备列表",
            url: 'gameStoreList'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "游戏试玩计划",
            url: 'gamePlanList'
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
            name: "游戏上市计划",
            url: 'gameLaunchPlan'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "游戏配置管理",
            url: 'gameConfigManage'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "游戏退市计划",
            url: 'gameDelistPlan'
          }
        ]
      },
      {
        icon: "el-icon-menu",
<<<<<<< HEAD
        name: "游戏发行管理",
        url: 'gameReleaseManage'
=======
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
>>>>>>> c8d81f83ea8dfdc50424363b921fe87984dcc5a4
      }
    ],
    icon: "el-icon-menu",
    name: "业务管理",
    url: '' // 前端路由名称
  }
]