// 业务监控-左侧导航数据
//no message
export default [
  {
    icon: "el-icon-menu",
    name: "业务监控",
    url: '', // 前端路由名称
    childResources: [
      {
        icon: "el-icon-menu",
        name: "大屏监控",
        url: 'screenWatch',
        childResources: [
          {
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
        childResources: [
          {
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
       
      },{
        icon: "el-icon-menu",
        name: "销售厅账户监控",
        url: 'accountWatch',
        childResources: [
         
        ],
       
      },{
        icon: "el-icon-menu",
        name: "销售厅设备监控",
        url: 'equipmentWatch',
        childResources: [
         
        ],
       
      },
      {
        icon: "el-icon-menu",
        name: "告警管理",
        url: 'warningManager',
        childResources: [
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "告警监控",
            url: 'warningWatch'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "告警规则",
            url: 'provinceWatch'
          }
        ],
       
      },
      
    ],
   
  }
]