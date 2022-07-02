import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  //获取token;基于token是否存在，判断用户是否登录；
  const hasToken = getToken()

  if (hasToken) {
    // 说明用户已经登录;
    if (to.path === '/login') {
      //已经登录了，想去登录页，重定向到首页。
      next({ path: '/' })
      NProgress.done()
    } else {
      // 已经登录，且访问非登录页面
      // determine whether the user has obtained his permission roles through getInfo
      // 判断这个用户的角色是否存在;
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next();
      } else {
        // 角色信息数组为空；说明刚登录成功；
        try {
          // 获取用户的角色信息；
          // es6的解构赋值、async\await；store的模块化，命名空间。
          const { roles } = await store.dispatch('user/getInfo');
          console.log(roles);

          //基于角色生成可访问的路由映射。
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles);
          console.log(accessRoutes);

          //动态添加可访问路由
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1)
     {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
