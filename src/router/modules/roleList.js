//角色管理
const roleList = () => import('@/views/systemManage/roleManagement/roleList')


export default[
    {
        path: 'systemManage/roleList',
        name: 'roleList',
        meta: {
          title: '角色列表',
        },
        component: roleList
    }
]