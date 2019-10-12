// 系统管理-左侧导航数据

export default [{
  childResources: [{
      icon: "el-icon-menu",
      name: "系统设置",
      url: 'settings',
      childResources: [{
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
    },
    {
      icon: "el-icon-menu",
      name: "数据字典",
      url: 'dataDictionary',
      childResources: [{
        childResources: [],
        icon: "el-icon-menu",
        name: "数据字典",
        url: 'dataDictionary'
      }]
    },
    {
      icon: "el-icon-menu",
      name: "业务流程",
      url: 'businessProcess',
      childResources: [

        {
          childResources: [],
          icon: "el-icon-menu",
          name: "表单管理",
          url: 'formManage'
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
    },
    {
      icon: "el-icon-menu",
      name: "组织架构",
      url: 'organization',
      childResources: [{
        icon: "",
        name: "组织架构",
        url: 'organizationChild',
      }]
    },
    {
      icon: 'el-icon-menu',
      name: '用户管理',
      url: 'userContorl',
      childResources: [{
        icon: '',
        name: '用户列表',
        url: 'userList',

      }]
    },
    {
      icon: 'el-icon-menu',
      name: '角色管理',
      url: 'roleManagement',
      childResources: [{
        icon: '',
        name: '角色列表',
        url: 'roleList'
      }]
    },
    {
      icon: 'el-icon-menu',
      name: '菜单管理',
      url: 'menuManagement',
      childResources: [{
        icon: '',
        name: '菜单管理',
        url: 'menuManageMent'
      }]
    }
  ],
  icon: "el-icon-menu",
  name: "系统管理",
  url: '' // 前端路由名称
}]