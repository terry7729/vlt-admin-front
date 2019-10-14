// 业务监控-左侧导航数据
//no message
export default [{
  icon: "el-icon-menu",
  name: "业务监控",
  url: '', // 前端路由名称
  childResources: [{
      icon: "el-icon-menu",
      name: "大屏监控",
      url: 'screenWatch',
      childResources: [{
          childResources: [],
          icon: "el-icon-menu",
          name: "中心监控",
          url: 'centerWatch'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "省级监控",
          url: 'provinceWatch'
        }
      ],

    },
    {
      icon: "el-icon-menu",
      name: "交易数据监控",
      url: 'dealData',
      childResources: [{
          childResources: [],
          icon: "el-icon-menu",
          name: "中央交易数据",
          url: 'centerDeal'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "省级交易数据",
          url: 'provinceDeal'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "市级交易数据",
          url: 'cityDeal'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "区域交易数据",
          url: 'areaDeal'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "游戏交易数据",
          url: 'gameDeal'
        }
      ],

    }, {
      icon: "el-icon-menu",
      name: "销售厅账户监控",
      url: 'accountWatch',
      childResources: [

      ],

    }, {
      icon: "el-icon-menu",
      name: "销售厅设备监控",
      url: 'equipmentWatch',
      childResources: [
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "设备数据监控",
          url: 'equipmentDataWatch'
        },
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "设备硬件监控",
          url: 'equipmentHardwareWatch'
        }
      ],

    }, 
    {
      icon: "el-icon-menu",
      name: "告警管理",
      url: 'warningManager',
      childResources: [{
          childResources: [],
          icon: "el-icon-menu",
          name: "告警监控",
          url: 'warningWatch'
        },
        {
          childResources: [
            {
              childResources: [],
              icon: "el-icon-menu",
              name: "奖池风险指标",
              url: 'pondRisk'
            },
            {
              childResources: [],
              icon: "el-icon-menu",
              name: "城市风险指标",
              url: 'cityRisk'
            },
            {
              childResources: [],
              icon: "el-icon-menu",
              name: "城市游戏风险指标",
              url: 'cityGameRisk'
            },{
              childResources: [],
              icon: "el-icon-menu",
              name: "告警通知",
              url: 'warningNotice'
            },{
              childResources: [],
              icon: "el-icon-menu",
              name: "用户风险指标",
              url: 'userRisk'
            }
          ],
          icon: "el-icon-menu",
          name: "告警规则",
          url: 'provinceWatch'
        }
      ],

    },{
      icon: "el-icon-menu",
      name: "报表管理",
      url: 'reportManage',
      childResources: [
        {
          childResources: [],
          icon: "el-icon-menu",
          name: "告警报告",
          url: 'warningReport'
        },{
          childResources: [],
          icon: "el-icon-menu",
          name: "demo",
          url: 'demo'
        },
      ],

    },

  ],

}]