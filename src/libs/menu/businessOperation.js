// 业务运营-左侧导航数据

export default [{
    childResources: [{
        childResources: [{
            childResources: [],
            icon: "el-icon-menu",
            name: "渠道账户列表",
            url: 'accountList'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "资金账户管理",
            url: 'accountMoneyManage'
          }
        ],
        icon: "el-icon-menu",
        name: "渠道账户",
        url: 'screenWatch'
      },

      {
        childResources: [{
            icon: "el-icon-menu",
            name: "角色管理",
            url: 'roleManage'
          },
          {
            icon: "el-icon-menu",
            name: "账户管理",
            url: 'operationAccountManage'
          }
        ],
        icon: "el-icon-menu",
        name: "渠道权限维护",
        url: 'PermissionMaintain'
      },

      {
        childResources: [{
            icon: "el-icon-menu",
            name: "彩票兑奖",
            url: 'lotteryTicket'
          },
          {
            icon: "el-icon-menu",
            name: "兑奖设置",
            url: 'expirySetting'
          },
          {
            icon: "el-icon-menu",
            name: "兑奖处管理",
            url: 'ticketOfficeManage'
          },
          {
            icon: "el-icon-menu",
            name: "中奖查询",
            url: 'winningCheck'
          }
        ],
        icon: "el-icon-menu",
        name: "彩票兑奖管理",
        url: 'LotteryManagement'
      },



      {
        childResources: [{
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