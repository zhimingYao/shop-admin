/** 
 * 1:请求根路径配置
 * 2：兼容运行环境
 * 3：请求拦截器
 * ---拦截请求报文，统一更改头部或请求体设置
 * 4：相应拦截器
 * ---拦截服务器返回状态码，对状态码进行验证，统一处理
 * ---统一
 */
/* axios 是比ajax更加强大，支持浏览器node.js实现网络通信的js库，
使用promiss语法 */
import axios from 'axios'
// import { loading } from "element-ui";

const serve = axios.create({
    /**process 进程对象
     * process.env 读取环境变量文件。运行命令不同，读取环境变量也不同
     * VUE_APP_BASE_API_MANAGER  环境变量文件中声明的变量名
     */
    baseURL: process.env.VUE_APP_BASE_API_YZM,
    timeout:5000,//多长时间没连接成功响应请求失败
})

/* 请求拦截器 */
serve.interceptors.request.use((config)=>{
    console.log('%c请求数据','background-color:yellow;padding:10px:',);

    return config
},(err)=>{
    console.log(err);
    return Promise.reject(err)
});
/* 相应拦截其 */
serve.interceptors.response.use((res)=>{
    console.log('%c响应数据','background-color:yellow;padding:10px:',res.data);
    return res.data
},(err)=>{
    console.log(err);
    return Promise.reject(err)
})

export default serve