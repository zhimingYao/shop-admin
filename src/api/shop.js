import http from '@/utils/http.js'

// 传入parentname获取某一大类（数码）下的二级分类
// 传入category_id 获取name(二级分类)
export function getCateGory(data){
  return http({
      url:'/wares/getSubmenu',
      method:'post',
      data:data
  })
}