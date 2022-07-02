import request from '@/utils/request'
// import http from '@/utils/http'

// export function login(data) {
//   return http({
//     url: '/login',
//     method: 'get',
//     data
//   })
// }

export function login(data){
  return request({
    url:'/vue-admin-template/user/login',
    method:'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
