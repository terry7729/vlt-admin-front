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
      },
      {
        childResources: [
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "活动计划模板",
            url: 'planTemplate'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "活动计划管理",
            url: 'planManage'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "活动执行管理",
            url: 'executionManage'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "活动效果评估",
            url: 'activityResult'
          }
        ],
        icon: "el-icon-menu",
        name: "品牌与营销推广",
        url: ''
      },
    ],
      icon: "el-icon-menu",
      name: "业务运营",
      url: '' // 前端路由名称
   
  },
  

]