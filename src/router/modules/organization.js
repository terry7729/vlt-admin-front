const organizationChild = () => import('@/views/systemManage/organization/organization')



export default[
    {
        path: 'systemManage/organizationChild',
        name: 'organizationChild',
        meta: {
          title: '组织架构',
        },
        component: organizationChild
      },
]