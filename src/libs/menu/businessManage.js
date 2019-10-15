// 业务管理-左侧导航数据

export default [{
  icon: "el-icon-menu",
  name: "业务管理",
  url: '', // 前端路由名称
  childResources: [
    {
      icon: "el-icon-menu",
      name: "首页",
      url: 'overview',
      childResources: [{
        childResources: [],
        icon: "el-icon-menu",
        name: "概况",
        url: 'overview'
      },{
        childResources: [],
        icon: "el-icon-menu",
        name: "我的待办",
        url: 'myToDo'
      },{
        childResources: [],
        icon: "el-icon-menu",
        name: "我的申请",
        url: 'myApplication'
      },{
        childResources: [],
        icon: "el-icon-menu",
        name: "我的已办",
        url: 'myDone'
      },{
        childResources: [],
        icon: "el-icon-menu",
        name: "我的知会",
        url: 'myKnowledge'
      }]
    },
    {
      icon: "el-icon-menu",
      name: "游戏储备管理",
      url: 'gameStoreManage',
      childResources: [{
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
        name: "游戏发行管理",
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
        name: "渠道业务管理",
        url: 'channelBusinessManage',
        childResources: [
          {
            icon: "el-icon-menu",
            name: "渠道列表",
            url: 'channelList',
            childResources: []
          },
          {
            icon: "el-icon-menu",
            name: "业务办理",
            url: 'channelDeal',
            childResources: []
          },
          {
            icon: "el-icon-menu",
            name: "年度发展计划",
            url: 'developmentPlan',
            childResources: []
          },
          {
            icon: "el-icon-menu",
            name: "档案管理",
            url: 'dossierManage',
            childResources: []
          }
        ],
      },

      {
        icon: "el-icon-menu",
        name: "渠道终端管理",
        url: 'channelTerminalManagement',
        childResources: [
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "服务分析",
            url: 'serviceAnalysis'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "维修管理",
            url: 'maintenance'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "报表统计",
            url: 'equipment'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "维护知识库",
            url: 'knowledgeBase'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "配置管理",
            url: 'configuration'
          }
        ]
      }
    ]
  }
]

