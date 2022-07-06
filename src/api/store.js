import request from "@/utils/ajax.js";

/* 获取店铺信息 */
export function getInfo(data) {
    return request({
        url:"/store/getInfo",
        method:"post",
        data
    })
}

/* 更改店铺信息 */
// export function getInfo(data) {
//     return request({
//         url:"/store/getInfo",
//         method:"post",
//         data
//     })
// }