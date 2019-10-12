//用户列表
const userList = () => import('@/views/systemManage/userControl/userList')
//用户详情
const userDestails = () => import('@/views/systemManage/userControl/userDetails')
export default [
  {

    path: 'systemManage/userList',
    name: 'userList',
    meta: {
      title: '用户列表',
    },
    component: userList,


  }, {

    path: 'systemManage/userList/userDestails',
    name: 'userDestails',
    meta: {
      title: '用户信息',
    },
    component: userDestails,

  }
]