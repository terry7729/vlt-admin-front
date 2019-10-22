import storage from '@/utils/storage'

const state = {
  loginInfo: storage.get('loginInfo') || null, // 用户已登录数据
  entry: storage.get('entry') || null, // 模块入口数据
  routerTags: storage.session.get('routerTags') || [], // 路由标签列表
  data: [{
    icon: "el-icon-info",
    info: "渠道名称",
    name: "中心管理部门",
    num: "85"
  }]
}
export default state;