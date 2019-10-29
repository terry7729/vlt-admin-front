// 系统管理-左侧导航数据

export default [{
  childResources: [{
      icon: "icon-xitongshezhi",
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
          url: 'paramSetting'
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
      icon: "icon-shujuzidian",
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
      icon: "icon-chanpindaohang_yewuliucheng",
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
      icon: "icon-zuzhijiagou",
      name: "组织架构",
      url: 'organization',
      childResources: [{
        icon: "",
        name: "组织架构",
        url: 'organizationChild',
      }]
    },
    {
      icon: 'icon-yonghuguanli',
      name: '用户管理',
      url: 'userContorl',
      childResources: [{
        icon: '',
        name: '用户列表',
        url: 'userList',
      }, {
        icon: '',
        name: '用户设置',
        url: 'userSetting',
      }]
    },
    {
      icon: 'icon-hezuohuoban1',
      name: '角色管理',
      url: 'roleManagement',
      childResources: [{
        icon: '',
        name: '角色列表',
        url: 'roleList'
      }]
    },
    {
      icon: 'icon-caidanguanli',
      name: '菜单管理',
      url: 'menuManagement',
      childResources: [{
        icon: '',
        name: '菜单管理',
        url: 'menuManageMent'
      }]
    },
    {
      icon: 'icon-xitongrizhi',
      name: '系统日志',
      url: 'systemLog',
      childResources: [{
        icon: '',
        name: '系统操作日志',
        url: 'systemOperationLog'
      }]
    },
    {
      icon: 'icon-xitongkaiguan',
      name: '系统开关',
      url: 'systemSwitch',
      childResources: [{
        icon: '',
        name: '系统开关',
        url: 'systemSwitch'
      }]
    },
    {
      icon: 'icon-rili',
      name: '假日参数管理',
      url: 'holidayParametersManagement',
      childResources: [{
        icon: '',
        name: '假日参数管理',
        url: 'holidayParametersManagement'
      }]
    },
    {
      icon: 'icon-zhongduanguanli',
      name: '终端事件管理',
      url: 'TerminalEventManagement',
      childResources: [{
        icon: '',
        name: '终端事件控制',
        url: 'TerminalEventControl'
      },
      {
        icon: '',
        name: '终端事件日志',
        url: 'TerminalEventLog'
      }]
    }
  ],
  },
  {
  icon: "el-icon-menu",
  name: "系统管理",
  url: '' // 前端路由名称
}]
