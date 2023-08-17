import Layout from '@/layout'
export default {

    path: '/employee',
    name:"employee",
    component: Layout,
    children: [{
        path: '',
        // name: 'employee',
        component: () => import('@/views/employee/index'),
        meta: { title: '员工', icon: 'example' }
    }, {
        path: 'dateil/:id?',
        // name: 'dateil',
        hidden: true,
        component: () => import('@/views/employee/dateil'),
        meta: { title: '员工详情', icon: 'example' }
    }
    ]
}
