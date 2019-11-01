// 业务运营-左侧导航数据

export default [{
  children: [{
      children: [{
          children: [],
          iconCls: "el-icon-menu",
          text: "渠道账户列表",
          code: 'accountList'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "资金账户管理",
          code: 'accountMoneyManage'
        }
      ],
      iconCls: "icon-chanpinfahang1",
      text: "渠道账户",
      code: 'screenWatch'
    },

    {
      children: [{
          iconCls: "el-icon-menu",
          text: "角色管理",
          code: 'roleManage'
        },
        {
          iconCls: "el-icon-menu",
          text: "账户管理",
          code: 'operationAccountManage'
        }
      ],
      iconCls: "icon-houtaiweihu",
      text: "渠道角色权限维护",
      code: 'PermissionMaintain'
    },

    {
      children: [{
          iconCls: "el-icon-menu",
          text: "彩票兑奖",
          code: 'lotteryTicket'
        },
        {
          iconCls: "el-icon-menu",
          text: "兑奖设置",
          code: 'expirySetting'
        },
        {
          iconCls: "el-icon-menu",
          text: "兑奖处管理",
          code: 'ticketOfficeManage'
        },
        {
          iconCls: "el-icon-menu",
          text: "中奖查询",
          code: 'winningCheck'
        }
      ],
      iconCls: "icon-daiduijiang",
      text: "彩票兑奖管理",
      code: 'LotteryManagement'
    },

    {
      children: [{
          iconCls: "el-icon-menu",
          text: "会员等级管理",
          code: 'MemberGradeManagement'
        },
        {
          iconCls: "el-icon-menu",
          text: "会员权益管理",
          code: 'MemberEquityManagement'
        },
        {
          iconCls: "el-icon-menu",
          text: "会员积分管理",
          code: 'MemberIntegralManagement'
        },
      ],
      iconCls: "icon-huiyuanguanli",
      text: "会员管理",
      code: 'MemberManagement'
    },

    // {
    //   children: [{
    //       iconCls: "el-icon-menu",
    //       text: "资金日结算报表",
    //       code: 'financialStatementDaySettle'
    //     },
    //     {
    //       iconCls: "el-icon-menu",
    //       text: "资金日分配报表",
    //       code: 'financialStatementDayAllocation'
    //     },
    //     {
    //       iconCls: "el-icon-menu",
    //       text: "资金日流向报表",
    //       code: 'financialStatementDayFlow'
    //     },
    //     {
    //       iconCls: "el-icon-menu",
    //       text: "资金月结算报表",
    //       code: 'financialStatementMonthSettle'
    //     },
    //     {
    //       iconCls: "el-icon-menu",
    //       text: "资金月分配报表",
    //       code: 'financialStatementMonthAllocation'
    //     },
    //     {
    //       iconCls: "el-icon-menu",
    //       text: "资金月流向报表",
    //       code: 'financialStatementMonthFlow'
    //     },
    //     {
    //       iconCls: "el-icon-menu",
    //       text: "资金年结算报表",
    //       code: 'financialStatementYearSettle'
    //     },
    //     {
    //       iconCls: "el-icon-menu",
    //       text: "资金年分配报表",
    //       code: 'financialStatementYearAllocation'
    //     },
    //     {
    //       iconCls: "el-icon-menu",
    //       text: "资金年流向报表",
    //       code: 'financialStatementYearFlow'
    //     },
    //   ],
    //   iconCls: "icon-caiwubaobiao",
    //   text: "财务报表",
    //   code: 'financialStatement'
    // },


    {
      children: [{
          children: [],
          iconCls: "el-icon-menu",
          text: "活动计划模板",
          code: 'planTemplate'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "活动计划管理",
          code: 'planManage'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "活动执行管理",
          code: 'executionManage'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "活动效果评估",
          code: 'activityResult'
        }
      ],
      iconCls: "icon-yingxiaotuiguang",
      text: "品牌与营销推广",
      code: ''
    },
    {
      children: [{
        children: [],
        iconCls: "el-icon-menu",
        text: "客户账户列表",
        code: 'customerAccount'
      }],
      iconCls: "icon-zhanghu1",
      text: "客户账户",
      code: 'customerAccount'
    },
    {
      children: [{
          children: [],
          iconCls: "el-icon-menu",
          text: "充值记录",
          code: 'rechargeRecord'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "投注记录",
          code: 'BettingRecord'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "兑奖记录",
          code: 'cashRecord'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "提现记录",
          code: 'withdrawalRecords'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "积分记录",
          code: 'integralRecord'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "资金流水",
          code: 'fundsStatement'
        }
      ],
      iconCls: "icon-gongsizhanghujilu",
      text: "账户记录",
      code: ''
    },

    //责任彩票
    {
      children: [{
        children: [],
        iconCls: "el-icon-menu",
        text: "责任彩票列表",
        code: 'dutyLottery'
      }],
      iconCls: "icon-zeren",
      text: "责任彩票",
      code: ''
    },

    //公告信息发布
    {
      children: [{
          children: [],
          iconCls: "el-icon-menu",
          text: "素材管理",
          code: 'materialManage'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "公告信息发布",
          code: 'bulletinList'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "公告模板",
          code: 'bulletinTemplate'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "消息推送",
          code: 'infoPush'
        }
      ],
      iconCls: "icon-xinxifabu-OA",
      text: "公告信息发布",
      code: 'bulletinList'
    },


  ],
  iconCls: "el-icon-menu",
  text: "业务运营",
  code: 'businessOperation' // 前端路由名称

}, ]