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
          url: 'gameList'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "游戏试玩计划",
          url: 'trialPlanList'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "游戏类型管理",
          url: 'gameTypeList'
        }
      ]
    },
    {
      icon: "el-icon-menu",
      name: "游戏发行管理",
      url: 'gameMarketManage',
      childResources: [
        {
          icon: "el-icon-menu",
          name: "游戏上市计划",
          url: 'gameMarketPlanList',
          childResources: [],
        },
        {
          icon: "el-icon-menu",
          name: "上市游戏列表",
          url: 'gameMarketList',
          childResources: [],
        },
        {
          icon: "el-icon-menu",
          name: "游戏变更计划",
          url: 'gameChangePlanList',
          childResources: [],
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "游戏退市计划",
          url: 'gameDelistingPlanList'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "风险处理报告",
          url: 'riskReportList'
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
      name: "渠道资源管理",
      url: 'channelResourceManage',
      childResources: [
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "库存管理",
          url: 'inventoryManage'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "出入库管理",
          url: 'outPutManage'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "台账管理",
          url: 'ledgerManage'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "仓库管理",
          url: 'storeManage'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "基本信息管理",
          url: 'basicInfoManage'
        },
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
          name: "设备管理",
          url: 'equipment'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "报表统计",
          url: 'reportStatistics'
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
          url: 'configurationManagement'
        }
      ]
    },
    {
      icon: "el-icon-menu",
      name: "资金结算管理",
      url: 'fundSettlement',
      childResources: [
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "资金参数管理",
          url: 'fundParameter'
        }
      ]
    },
    {
      icon: "el-icon-menu",
      name: "投注卡管理",
      url: 'bettingCardManage',
      childResources: [
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "投注卡生成",
          url: 'cardGeneration'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "投注卡信息",
          url: 'cardInformation'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "投注卡规则",
          url: 'bettingCardRules'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "投注卡余额",
          url: 'cardBalance'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "投注卡中奖记录",
          url: 'winningRecord'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "投注卡提现记录",
          url: 'withdrawalRecord'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "投注卡充值规则",
          url: 'refillRules'
        }
      ]
    },
    {
      icon: "el-icon-menu",
      name: "合作伙伴管理",
      url: 'cooperatorManage',
      childResources: [
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "合作伙伴列表",
          url: 'cooperatorList'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "合作额度设置",
          url: 'cooperatorQuotaSet'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "合作佣金设置",
          url: 'cooperatorBrokerageSet'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "结算与对账",
          url: 'verifyReconciliation'
        },
      ]
    },
    {
      icon: "el-icon-menu",
      name: "在线培训",
      url: 'trainingManage',
      childResources: [
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "培训管理",
          url: 'trainingManage'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "课程管理",
          url: 'courseManage'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "考核管理",
          url: 'assessManage'
        }
      ]
    }
  ]
}]

