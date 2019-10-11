// 业务监控-左侧导航数据

export default [
  {
    childResources: [
      {
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
        icon: "el-icon-menu",
        name: "大屏监控",
        url: 'screenWatch'
      }
    ],
    icon: "el-icon-menu",
    name: "业务监控",
    url: '' // 前端路由名称
  }
]