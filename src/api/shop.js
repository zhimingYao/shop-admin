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

// 提交 添加品牌
export function addBrand(name, image, letter){
  console.log({name, image, letter});
  return http({
      url:'/wares/addBrand',
      method:'post',
      data:{name, image, letter}
  })
}

// 提交 添加品牌
export function addSpu(data){
  console.log(data);
  return http({
      url:'/store/addSpu',
      method:'post',
      data,
  })
}

// 获取所有商品 商品列表
export function getShopList(data){
  // console.log(!store_id);
  return http({
      url:'/store/getShopList',
      method:'post',
      data,
  })
}

// 获取库存
export function getStock(data){
  // console.log(!store_id);
  return http({
      url:'/wares/getStock',
      method:'post',
      data,
  })
}

// 删除商品
export function deleteSpu(data){
  // console.log(!store_id);
  return http({
      url:'/store/deleteSpu',
      method:'post',
      data,
  })
}

/* 查询产品 */
export function getSpu(data) {
  return http({
    url:"/store/getSpu",
    method:"post",
    data,
  })
}

/* 修改产品价格 */
export function updataSpu(data) {
  return http({
    url:"/store/updataSpu",
    method:"post",
    data,
  })
}