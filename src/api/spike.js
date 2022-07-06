import request from "@/utils/ajax.js";

/* 获取秒杀活动列表 */
export function getspike(data) {
    return request({
        url:'/spike/getspike',
        method:"post",
        data
    })
}

/* 添加 */
export function addspike(data) {
    return request({
        url:"/spike/addspike",
        method:"post",
        data
    })
}

/* 删除 */
export function delspike(data) {
    return request({
        url:"/spike/delspike",
        method:"post",
        data
    })
}

/* 搜索 */
export function selectspike(data) {
    return request({
        url:"/spike/slectspike",
        method:"post",
        data
    })
}

/* 更新 */
export function updatespike(data) {
    return request({
        url:"/spike/updatespike",
        method:"post",
        data
    })
}

