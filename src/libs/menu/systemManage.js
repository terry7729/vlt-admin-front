// 系统管理-左侧导航数据

export default [
  {
    childResources: [
      {
        childResources: [
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "基本设置",
            url: 'baseSetting'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "邮件设置",
            url: 'emailSetting'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "参数设置",
            url: 'parameterSetting'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "短信设置",
            url: 'noteSetting'
          },
        ],
        icon: "el-icon-menu",
        name: "系统设置",
        url: 'settings'
      },
      {
        childResources: [
          {
            childResources: [],
        icon: "el-icon-menu",
        name: "数据字典",
        url: 'dataDictionary'
          }
        ],
        icon: "el-icon-menu",
        name: "数据字典",
        url: 'dataDictionary'
      },
      {
        childResources: [
          
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "表单管理",
            url: 'formManager'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "流程设置",
            url: 'processSet'
          },
          {
            childResources: [],
            icon: "el-icon-menu",
            name: "流程分类",
            url: 'processClassify'
          },
        ],
        icon: "el-icon-menu",
        name: "业务流程",
        url: 'businessProcess'
      },
    ],
    icon: "el-icon-menu",
    name: "系统管理",
    url: '' // 前端路由名称
  }
]