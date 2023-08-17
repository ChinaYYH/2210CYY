import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress, { start } from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { Myrouter } from '@/router/index'
import Layout from '@/layout'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
// 白名单
const whiteList = ['/login'] // no redirect whitelist
// 前置路由
router.beforeEach(async (to, from, next) => {
  // start progress bar
  // 开启进度条
  NProgress.start()

  // set page title
  // document.title = getPageTitle(to.meta.title)

  // // determine whether the user has logged in
  // const hasToken = getToken()

  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }

  // 判断是否有token
  if (store.getters.token) {
    // 如果有并且是登录页面
    if (to.path === '/login') {
      // 跳转首页
      next('/')
      // 如果不是登录页面
    } else {
      // 判断是否有userID
      if (!store.getters.userID) {
        // 如果没有执行
        let routeritem = await store.dispatch('users/getListss')
        // let res = routeritem.roles.menus
        // console.log(Myrouter, '123');
        let resetRouter = Myrouter.filter(i => {
          return routeritem.roles.menus.includes(i.name)
        })

        // console.log(resetRouter, '999');
        store.commit('users/setRoutes', resetRouter)
        router.addRoutes([...resetRouter, { path: '*', redirect: '/404', hidden: true }])

        // {manager.roles.menus}
      }
      if (to.path == '/department') {
        // if (store.state.appapp.data.length == 0) {
        //   // 如果是执行
        //   store.dispatch('appapp/appapp')

        // }

        if (store.state.appapp.nameguan.length == 0) {
          store.dispatch('appapp/nameList')
        }

      }
      // 判断数组长度是0，


      // 放行
      next()
    }
    // 如果没有token
  } else {
    // 判断是否写在白名单
    if (whiteList.includes(to.path)) {
      // 如果有放行
      next()
    } else {
      // 如果没有回到登陆页面
      next('/login')
    }
  }
})

// router.beforeEach((to, from, next) => {
//   // console.log(store.getters.token);
//   // if (store.getters.token) { }
//   // to and from are both route objects. must call `next`.
// })
// 后置路由
router.afterEach(() => {
  // 关闭进度条
  // finish progress bar
  NProgress.done()
})
