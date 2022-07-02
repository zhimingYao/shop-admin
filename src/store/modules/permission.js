import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route 
 * 
 * 判断角色是否可以访问路由；返回值true，说明可以访问
  */
function hasPermission(roles, route) {
  // 路由有meta属性，并且meta属性中包含roles字段
  if (route.meta && route.meta.roles) {
    // 数组some方法，判断数组中是否有元素满足条件，至少有一个满足条件，就返回true。路由的meta中roles中是否包含用户的某个角色;
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    // 路由有没有meta属性，或者meta属性中没有roles字段,认为是公共路由;一律返回true
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * 通过递归，过滤异步路由数组
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  // 定义数组存放过滤结果
  const res = []
  // forEach遍历数组，取出每一个路由
  routes.forEach(route => {
    const tmp = { ...route }
    // 判断这个角色是否可以访问这个路由
    if (hasPermission(roles, tmp)) {
      // 该角色可以访问这个路由
      if (tmp.children) {
        //路由有children时;递归调用，对children进行过滤
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      //将路由添加到结果数组中 
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    // addRoutes：基于角色，添加的路由数组
    state.addRoutes = routes
    //所有路由构成的数组
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 生成路由
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 
      let accessedRoutes
      if (roles.includes('admin')) {
        //角色中包含管理员;任意路由均可访问
        accessedRoutes = asyncRoutes || []
      } else {
        // 角色不包含管理员;基于角色过滤异步路由数组;
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles) // roles=['editor']
      }

      // 更新store;将结果路由数组保存在store中。
      commit('SET_ROUTES', accessedRoutes)
      // 修改任务状态为resolved,保存任务结果
      resolve(accessedRoutes);
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
