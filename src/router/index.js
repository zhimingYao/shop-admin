import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
 * constantRoutes : 常量路由; 这个数组中存放的路由，是每一个角色都可以访问的。
 * 
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
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: { title: '订单', icon: 'order' },
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/oms/order/index'),
        meta: { title: '订单列表', icon: 'product-list' }
      },
      {
        path: 'orderDetail/:order_id/:status',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: { title: '订单详情' },
        props: true,
        hidden: true
      },
      {
        path: 'deliverOrderList/:order_id',
        name: 'deliverOrderList',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: { title: '发货列表' },
        hidden: true,
        props: true
      },
      {
        path: 'returnApply',
        name: 'returnApply',
        component: () => import('@/views/oms/returnApply/index'),
        meta: { title: '退货申请处理', icon: 'order-return' }
      },
      // {
      //   path: 'returnApplyDetail/:id/:order_id',
      //   name: 'returnApplyDetail',
      //   component: () => import('@/views/oms/apply/applyDetail'),
      //   meta: { title: '退货原因详情' },
      //   hidden: true,
      //   props: true
      // }
    ]
  },

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles;
 * 
 * asyncRoutes:异步路由;这个数组中存放的路由，需要依据用户的角色动态加载。
 * 给路由的meta属性中添加roles(角色)字段,这个字段的取值可以是一个数组，数组中会一一列举哪些角色可以访问这个路由。
 */

// 默认admin 可以显示所有的
// asyncRoutes 每个路由配置对象中，都应该需要添加 roles。
// 如果没有roles 默认，改路由为公共路由，每个人都可以访问
export const asyncRoutes = [
  // {
  //   path: '/shop',
  //   name: "Shop",
  //   redirect: "/shop/shoplist",
  //   component: Layout,
  //   meta: {
  //     title: "商品",
  //     icon: 'el-icon-s-grid',
  //     roles:['admin']
  //   },
  //   children: [
  //     {
  //       path: 'shoplist',
  //       name: 'ShopList',
  //       component: () => import('@/views/shopList/index'),
  //       meta: { title: '商品列表', icon: 'el-icon-s-shop' }
  //     }, {
  //       path: 'addShop',
  //       name: 'AddShop',
  //       component: () => import('@/views/addShop/index'),
  //       meta: { title: '添加商品', icon: 'el-icon-circle-plus' }
  //     },
  //   ]
  // },
  // {
  //   path: '/shopcar',
  //   name: 'ShopCar',
  //   component: Layout,
  //   meta:{
  //     roles:['editor']
  //   },
  //   children: [
  //     {
  //       path: 'index', name: 'shopcar', component: () => import('@/views/shopCarList/index'),
  //       meta: { title: '购物列表', icon: 'el-icon-shopping-cart-2' }

  //     }
  //   ]

  // },
  // {
  //   path: '/user',
  //   name: 'User',
  //   redirect: "/user/userList",
  //   component: Layout,
  //   meta:{
  //     roles:['admin']
  //   },
  //   children: [
  //     {
  //       path: 'userList',
  //       name: 'UserList',
  //       component: () => import('@/views/userList/index'),
  //       meta: {
  //         title: '用户列表',
  //         icon: "el-icon-user"
  //       }
  //     }
  //   ]
  // },
  {
    path: '/shop',
    name: "Shop",
    redirect: "/shop/shoplist",
    component: Layout,
    meta: {
      title: "商品",
      icon: 'el-icon-s-grid',
      roles:['admin']
    },
    children: [
      {
        path: 'shoplist',
        name: 'ShopList',
        component: () => import('@/views/shop/add-shop/index'),
        meta: { title: '商品列表', icon: 'el-icon-s-shop' }
      }, {
        path: 'addShop',
        name: 'AddShop',
        component: () => import('@/views/shop/add-shop/index'),
        meta: { title: '添加商品', icon: 'el-icon-circle-plus' }
      },{
        path: 'shopCategories',
        name: 'ShopCategories',
        component: () => import('@/views/addShop/index'),
        meta: { title: '商品分类', icon: 'el-icon-circle-plus' }
      },{
        path: 'brandManagement',
        name: 'BrandManagement',
        component: () => import('@/views/addShop/index'),
        meta: { title: '品牌管理', icon: 'el-icon-circle-plus' }
      },
    ]
  },
  {
    path: '/marketing',
    name: 'Marketing',
    redirect: "/marketing/coupon",
    component: Layout,
    meta:{
      title: "营销",
      icon: 'el-icon-collection-tag',
      roles:['admin']
    },
    children: [
      {
        path: 'coupon', 
        name: 'Coupon', 
        component: () => import('@/views/coupon/index.vue'),
        meta: { title: '优惠劵列表', icon: 'el-icon-shopping-cart-2' }
      },
      {
        path: 'secondaction', 
        name: 'SecondAction', 
        component: () => import('@/views/secondAction/index.vue'),
        meta: { title: '秒杀活动列表', icon: 'el-icon-alarm-clock' }
      },
      {
        path: 'voucherdetail', 
        name: 'VoucherDetail', 
        component: () => import('@/views/coupon/voucherDetail')
      },
      {
        path: 'addvoucher', 
        name: 'AddVoucher', 
        component: () => import('@/views/coupon/addVoucher')
      },
      {
        path: 'editVoucher', 
        name: 'EditVoucher', 
        component: () => import('@/views/coupon/editVoucher')
      },

    ]

  },
  {
    path: '/user',
    name: 'User',
    redirect: "/user/userList",
    component: Layout,
    meta:{
      roles:['admin']
    },
    children: [
      {
        path: 'userList',
        name: 'UserList',
        component: () => import('@/views/userList/index'),
        meta: {
          title: '用户列表',
          icon: "el-icon-user"
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

// 创建路由对象，路由配置只使用constantRoutes,等待用户登录成功后，获取用户的角色,
// 然后根据角色，生成基于这个角色的路由配置，通过addRoutes的方法添加到router对象上。
const router = createRouter()


// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router


// export const asyncRoutes = [
//   {
//     path: '/form',
//     name:"form",
//     component: Layout,
//     meta:{
//       roles:["editor"]
//     },
//     children: [
//       {
//         path: 'index',
//         name: 'Form',
//         component: () => import('@/views/form/index'),
//         meta: { title: '表单', icon: 'el-icon-mobile' }
//       }
//     ]
//   },
//   {
//     path: '/nested',
//     component: Layout,
//     redirect: '/nested/menu1',
//     name: 'Nested',
//     meta: {
//       title: 'Nested',
//       icon: 'nested',
//       roles:["developer"]
//     },
//     children: [
//       {
//         path: 'menu1',
//         component: () => import('@/views/nested/menu1/index'), // Parent router-view
//         name: 'Menu1',
//         meta: { title: 'Menu1' },
//         children: [
//           {
//             path: 'menu1-1',
//             component: () => import('@/views/nested/menu1/menu1-1'),
//             name: 'Menu1-1',
//             meta: { title: 'Menu1-1',roles:["editor"] }
//           },
//           {
//             path: 'menu1-2',
//             component: () => import('@/views/nested/menu1/menu1-2'),
//             name: 'Menu1-2',
//             meta: { title: 'Menu1-2',roles:["developer"] },
//             children: [
//               {
//                 path: 'menu1-2-1',
//                 component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
//                 name: 'Menu1-2-1',
//                 meta: { title: 'Menu1-2-1' }
//               },
//               {
//                 path: 'menu1-2-2',
//                 component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
//                 name: 'Menu1-2-2',
//                 meta: { title: 'Menu1-2-2' }
//               }
//             ]
//           },
//           {
//             path: 'menu1-3',
//             component: () => import('@/views/nested/menu1/menu1-3'),
//             name: 'Menu1-3',
//             meta: { title: 'Menu1-3' }
//           }
//         ]
//       },
//       {
//         path: 'menu2',
//         component: () => import('@/views/nested/menu2/index'),
//         meta: { title: 'menu2' }
//       }
//     ]
//   },

//   {
//     path: 'external-link',
//     component: Layout,
//     children: [
//       {
//         path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
//         meta: { title: 'External Link', icon: 'link' }
//       }
//     ]
//   },

//   // 404 page must be placed at the end !!!
//   { path: '*', redirect: '/404', hidden: true }
// ]

