import serve from '@/utils/request'
import request from '@/utils/ajax.js'

export function login(data) {
  return request({
    url: '/store/login',
    method: 'post',
    data
  });
}

export function getInfo(data) {
  return request({
    url: '/store/getInfo',
    method: 'post',
    data
  })

}

export function logout() {
    return serve({
      url: '/vue-admin-template/user/logout',
      method: 'post'
    })
  }



