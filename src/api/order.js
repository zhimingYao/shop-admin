import request from '@/utils/http'

// 获取订单商品
export function getOrder(data) {
    // console.log(data);
    //store_id 店铺id  count 请求的件数  page 请求的页数
    return request({
        method:"post",
        url:"/order/getOrder",
        data,
    })
}

// 获取订单详情
export function getOrderDetail(data) {
    return request({
        url:"/order/getOrderDetail",
        method:"post",
        data,
    })
}

// 修改订单信息
export const updateOrder=(data)=>{
    return service({
        method:"post",
        url:"/order/updateOrder",
        data,
    })
}

// 删除订单信息
export const deleteOrder=(data)=>{
    return service({
        method:"post",
        url:"/order/deleteOrder",
        data
    })
}

// 
export const getBackStock=(data)=>{
    return service({
        method:"post",
        url:"/order/getBackStock",
        data
    })
}
export const getBackStockDetail=(data)=>{
    return service({
        method:"post",
        url:"/order/getBackStockDetail",
        data
    })
}
export const updateBackStock=(data)=>{
    return service({
        method:'post',
        url:'order/updateBackStock',
        data,
    })
}