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
            icon: "el-icon-menu",
            name: "会员等级管理",
            url: 'MemberGradeManagement'
          },
          {
            icon: "el-icon-menu",
            name: "会员权益管理",
            url: 'MemberEquityManagement'
          },
          {
            icon: "el-icon-menu",
            name: "会员积分管理",
            url: 'MemberIntegralManagement'
          },
        ],
        icon: "el-icon-menu",
        name: "会员管理",
        url: 'MemberManagement'
      },

      {
        childResources: [{
            icon: "el-icon-menu",
            name: "资金日结算报表",
            url: 'financialStatementDaySettle'
          },
          {
            icon: "el-icon-menu",
            name: "资金日分配报表",
            url: 'financialStatementDayAllocation'
          },
          {
            icon: "el-icon-menu",
            name: "资金日流向报表",
            url: 'financialStatementDayFlow'
          },
          {
            icon: "el-icon-menu",
            name: "资金月结算报表",
            url: 'financialStatementMonthSettle'
          },
          {
            icon: "el-icon-menu",
            name: "资金月分配报表",
            url: 'financialStatementMonthAllocation'
          },
          {
            icon: "el-icon-menu",
            name: "资金月流向报表",
            url: 'financialStatementMonthFlow'
          },
          {
            icon: "el-icon-menu",
            name: "资金年结算报表",
            url: 'financialStatementYearSettle'
          },
          {
            icon: "el-icon-menu",
            name: "资金年分配报表",
            url: 'financialStatementYearAllocation'
          },
          {
            icon: "el-icon-menu",
            name: "资金年流向报表",
            url: 'financialStatementYearFlow'
          },
        ],
        icon: "el-icon-menu",
        name: "财务报表",
        url: 'financialStatement'
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
      {
        childResources: [{
          childResources: [],
          icon: "el-icon-menu",
          name: "客户账户列表",
          url: 'customerAccount'
        }],
        icon: "el-icon-menu",
        name: "客户账户",
        url: ''
      },
      {
        childResources: [{
            childResources: [],
            icon: "el-icon-menu",
            name: "充值记录",
            url: 'rechargeRecord'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "投注记录",
            url: 'BettingRecord'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "兑奖记录",
            url: 'cashRecord'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "提现记录",
            url: 'withdrawalRecord'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "积分记录",
            url: 'integralRecord'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "资金流水",
            url: 'fundsStatement'
          }
        ],
        icon: "el-icon-menu",
        name: "账户记录",
        url: ''
      },

      //责任彩票
      {
        childResources: [{
          childResources: [],
          icon: "el-icon-menu",
          name: "责任彩票列表",
          url: 'dutyLottery'
        }],
        icon: "el-icon-menu",
        name: "责任彩票",
        url: ''
      },

      //公告信息发布
      {
        childResources: [{
            childResources: [],
            icon: "el-icon-menu",
            name: "素材管理",
            url: 'materialManage'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "公告信息发布",
            url: 'bulletinList'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "公告模板",
            url: 'bulletinTemplate'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "消息推送",
            url: 'infoPush'
          }
        ],
        icon: "el-icon-menu",
        name: "公告信息发布",
        url: ''
      },


    ],
    icon: "el-icon-menu",
    name: "业务运营",
    url: '' // 前端路由名称

  },


]