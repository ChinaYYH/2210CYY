import Layout from '@/layout'
export default {

    path: '/department',
    name: "department",
    component: Layout,
    children: [{
        path: '',
        // name: 'department',
        component: () => import('@/views/department/index'),
        meta: { title: '组织结构', icon: 'example' }
    }]
}
