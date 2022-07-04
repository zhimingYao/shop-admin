// 用来封装网络请求 和 响应拦截 
import axios from "axios";
import Vue from "vue";


const serve=axios.create({
    baseURL:process.env.VUE_APP_BASE_URL,
    timeout:5000,
})
// 请求拦截器
serve.interceptors.request.use(config=>{

    return config
})
//响应拦截器
serve.interceptors.response.use(res=>{

    return res.data
})
export default serve