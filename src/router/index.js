import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import approval from './modules/approval'
import attendance from './modules/attendance'
import department from './modules/department'
import permission from './modules/permission'
import employee from './modules/employee'
import role from './modules/role'
import salary from './modules/salary'
import social from './modules/social'
export const Myrouter = [
  approval,
  attendance,
  department,
  permission,
  employee,
  role,
  salary,
  social
]
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  // ...Myrouter,
  // {
  //   path: '/approval',
  //   component: Layout,
  //   redirect: '/approval',
  //   children: [{
  //     path: 'approval',
  //     name: 'approval',
  //     component: () => import('@/views/approval/index'),
  //     meta: { title: 'approval', icon: 'approval' }
  //   }]
  // },
  // {
  //   path: '/attendance',
  //   component: Layout,
  //   redirect: '/attendance',
  //   children: [{
  //     path: 'attendance',
  //     name: 'attendance',
  //     component: () => import('@/views/attendance/index'),
  //     meta: { title: 'attendance', icon: 'attendance' }
  //   }]
  // },
  // {
  //   path: '/department',
  //   component: Layout,
  //   redirect: '/department',
  //   children: [{
  //     path: 'department',
  //     name: 'department',
  //     component: () => import('@/views/department/index'),
  //     meta: { title: 'department', icon: 'department' }
  //   }]
  // },
  // {
  //   path: '/employee',
  //   component: Layout,
  //   redirect: '/employee',
  //   children: [{
  //     path: 'employee',
  //     name: 'employee',
  //     component: () => import('@/views/employee/index'),
  //     meta: { title: 'employee', icon: 'employee' }
  //   }]
  // },
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission',
  //   children: [{
  //     path: 'permission',
  //     name: 'permission',
  //     component: () => import('@/views/permission/index'),
  //     meta: { title: 'permission', icon: 'permission' }
  //   }]
  // },
  // {
  //   path: '/role',
  //   component: Layout,
  //   redirect: '/role',
  //   children: [{
  //     path: 'role',
  //     name: 'role',
  //     component: () => import('@/views/role/index'),
  //     meta: { title: 'role', icon: 'role' }
  //   }]
  // },
  // {
  //   path: '/salary',
  //   component: Layout,
  //   redirect: '/salary',
  //   children: [{
  //     path: 'salary',
  //     name: 'salary',
  //     component: () => import('@/views/salary/index'),
  //     meta: { title: 'salary', icon: 'salary' }
  //   }]
  // },
  // {
  //   path: '/social',
  //   component: Layout,
  //   redirect: '/social',
  //   children: [{
  //     path: 'social',
  //     name: 'social',
  //     component: () => import('@/views/social/index'),
  //     meta: { title: 'social', icon: 'social' }
  //   }]
  // },


  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()


// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}



export default router
