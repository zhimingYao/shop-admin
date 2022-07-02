import http from '@/utils/http'

export function getShopList (data){
    return http({
        url:"/goodList",
        method:'get',
        params:{...data}
    })
}