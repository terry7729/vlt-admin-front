// 业务管理-左侧导航数据

export default {
  iconCls: "el-icon-menu",
  text: "业务管理",
  code: '', // 前端路由名称
  children: [
    {
      iconCls: "icon-shouye",
      text: "首页",
      code: 'overview',
      children: [{
        children: [],
        iconCls: "el-icon-menu",
        text: "概况",
        code: 'overview'
      },{
        children: [],
        iconCls: "el-icon-menu",
        text: "我的待办",
        code: 'myToDo'
      },{
        children: [],
        iconCls: "el-icon-menu",
        text: "我的申请",
        code: 'myApplication'
      },{
        children: [],
        iconCls: "el-icon-menu",
        text: "我的已办",
        code: 'myDone'
      },{
        children: [],
        iconCls: "el-icon-menu",
        text: "我的知会",
        code: 'myKnowledge'
      }]
    },
    {
      iconCls: "icon-chubeiku",
      text: "游戏储备管理",
      code: 'gameStoreManage',
      children: [{
          children: [],
          iconCls: "el-icon-menu",
          text: "游戏储备列表",
          code: 'gameList'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "游戏试玩计划",
          code: 'trialPlanList'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "游戏类型管理",
          code: 'gameTypeList'
        }
      ]
    },
    {
      iconCls: "icon-chanpinfahang1",
      text: "游戏发行管理",
      code: 'gameMarketManage',
      children: [
        {
          iconCls: "el-icon-menu",
          text: "上市游戏列表",
          code: 'gameMarketList',
          children: [],
        },
        {
          iconCls: "el-icon-menu",
          text: "游戏上市计划",
          code: 'gameMarketPlanList',
          children: [],
        },
        {
          iconCls: "el-icon-menu",
          text: "游戏变更计划",
          code: 'gameChangePlanList',
          children: [],
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "游戏退市计划",
          code: 'gameDelistingPlanList'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "风险处理报告",
          code: 'riskReportList'
        }
      ]
    },
    {
      iconCls: "icon-yewu",
      text: "渠道业务管理",
      code: 'channelBusinessManage',
      children: [
        {
          iconCls: "el-icon-menu",
          text: "渠道列表",
          code: 'channelList',
          children: []
        },
        {
          iconCls: "el-icon-menu",
          text: "业务办理",
          code: 'channelDeal',
          children: []
        },
        {
          iconCls: "el-icon-menu",
          text: "年度发展计划",
          code: 'developmentPlan',
          children: []
        },
        {
          iconCls: "el-icon-menu",
          text: "档案管理",
          code: 'dossierManage',
          children: []
        }
      ],
    },
    {
      iconCls: "icon-ziyuanguanli",
      text: "渠道资源管理",
      code: 'channelResourceManage',
      children: [
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "库存管理",
          code: 'inventoryManage'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "出入库管理",
          code: 'outPutManage'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "台账管理",
          code: 'ledgerManage'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "仓库管理",
          code: 'storeManage'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "基本信息管理",
          code: 'basicInfoManage'
        },
      ],
    },
    {
      iconCls: "icon-zhongduan",
      text: "渠道终端管理",
      code: 'channelTerminalManagement',
      children: [
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "服务分析",
          code: 'serviceAnalysis'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "维修管理",
          code: 'maintenance'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "设备管理",
          code: 'equipment'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "报表统计",
          code: 'reportStatistics'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "维护知识库",
          code: 'knowledgeBase'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "配置管理",
          code: 'configurationManagement'
        }
      ]
    },
    {
      iconCls: "icon--jiesuan",
      text: "资金结算管理",
      code: 'fundSettlement',
      children: [
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "资金参数管理",
          code: 'fundParameter'
        }
      ]
    },
    {
      iconCls: "icon-kaguanli",
      text: "投注卡管理",
      code: 'bettingCardManage',
      children: [
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "投注卡生成",
          code: 'cardGeneration'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "投注卡信息",
          code: 'cardInformation'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "投注卡规则",
          code: 'bettingCardRules'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "投注卡余额",
          code: 'cardBalance'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "投注卡中奖记录",
          code: 'winningRecord'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "投注卡提现记录",
          code: 'withdrawalRecord'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "投注卡充值规则",
          code: 'refillRules'
        }
      ]
    },
    {
      iconCls: "icon-hezuohuoban",
      text: "合作伙伴管理",
      code: 'cooperatorManage',
      children: [
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "合作伙伴列表",
          code: 'cooperatorList'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "合作额度设置",
          code: 'cooperatorQuotaSet'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "合作佣金设置",
          code: 'cooperatorBrokerageSet'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "结算与对账",
          code: 'verifyReconciliation'
        },
      ]
    },
    {
      iconCls: "icon-zaixianpeixun-",
      text: "在线培训",
      code: 'trainingManage',
      children: [
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "培训管理",
          code: 'trainingManage'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "课程管理",
          code: 'courseManage'
        },
        {
          children: [],
          iconCls: "el-icon-menu",
          text: "考核管理",
          code: 'assessManage'
        }
      ]
    }
  ]
}

