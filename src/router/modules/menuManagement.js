

const menuManageMent = () => import('@/views/systemManage/menuManageMent/menuManageMent')

export default[
    {
        path: 'systemManage/menuManageMent',
        name: 'menuManageMent',
        meta: {
          title: '菜单管理',
        },
        component: menuManageMent
    }
]