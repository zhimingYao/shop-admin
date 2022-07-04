<<<<<<< HEAD
import request from '@/utils/request';
// import http from '@/utils/http'
=======
// import request from '@/utils/request'
// // import http from '@/utils/http'
>>>>>>> master

// // export function login(data) {
// //   return http({
// //     url: '/login',
// //     method: 'get',
// //     data
// //   })
// // }

// export function login(data){
//   return request({
//     url:'/vue-admin-template/user/login',
//     method:'post',
//     data
//   })
// }

<<<<<<< HEAD
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
=======
// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }

import serve from '@/utils/request'
import request from '@/utils/ajax.js'

export function login(data){
  return request({
    url:'/store/login',
    method:'post',
>>>>>>> master
    data
  });
}

export function getInfo(data) {
  return request({
<<<<<<< HEAD
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: {
      token,
    }
  });
=======
    url: '/store/getInfo',
    method: 'post',
    data
  })
>>>>>>> master
}

export function logout() {
  return serve({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  });
}