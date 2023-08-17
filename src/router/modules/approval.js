import Layout from '@/layout'
export default {
    path: '/approval',
    name: 'approval',
    component: Layout,
    children: [{
        path: '',
        name: 'approval1',
        component: () => import('@/views/approval/index'),
        meta: { title: '审批', icon: 'example' }
    }]
}
