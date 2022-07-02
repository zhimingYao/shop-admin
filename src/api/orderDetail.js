import request from '@/utils/http'

export function getOrder(data) {
    console.log(data);
    //store_id 店铺id  count 请求的件数  page 请求的页数
    return request({
        url: '/getOrder',
        method: 'post',
        data
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