import request from "@/utils/ajax.js";

/* 获取优惠劵信息 */
export function getVoucher(data) {
    return request({
        url:"/voucher/getVoucher",
        method:"post",
        data
    })
}

/* 添加优惠劵信息 */
export function addVoucher(data) {
    return request({
        url:"/voucher/addVoucher",
        method:"post",
        data
    })
}

/* 修改优惠劵信息 */
export function editVoucheer(data) {
    return request({
        url:"/voucher/editVoucheer",
        method:"post",
        data
    })
}

/* 添加优惠劵信息 */
export function deleteVoucher(data) {
    return request({
        url:"/voucher/deleteVoucher",
        method:"post",
        data
    })
}

/* 查看订单信息 */
export function seeVoucheer(data) {
    return request({
        url:"/voucher/seeVoucheer",
        method:"post",
        data
    })
}

/* 搜索订单信息 */
export function selectVoucher(data) {
    return request({
        url:"/voucher/selectVoucher",
        method:"post",
        data
    })
}