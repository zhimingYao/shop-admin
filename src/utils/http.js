import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

const service = axios.create({
<<<<<<< HEAD
    // baseURL: process.env.VUE_APP_BASE_API_BIYAO,
    baseURL: process.env.VUE_APP_BASE_API_YS,
    timeout: 50000
=======
    baseURL: process.env.VUE_APP_BASE_API_YZM,
    timeout: 5000
>>>>>>> master
})


service.interceptors.request.use(
    config => {
        return config
    },
    error => {// 拦截器调用出现错我时候执行
        console.log(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data

        // 拦截服务器返回的状态
        // 1: 表示出错误异常的状态码
        // 2: token 无效过期等状态
        return res

    }
)

export default service