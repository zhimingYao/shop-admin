import http from "@/utils/http.js";

// 获取商品分类 参数store_id
export function getMenu(data) {
  return http({
    url: "/wares/getMenu",
    method: "post",
    data,
  });
}

/* 获取二级分类 */
export function getSecond(data) {
  return http({
    url:"/wares/getSecond",
    method:"post",
    data,
  })
}

// 添加品类
// 参数category_id, store_id
export function addParent(data) {
  return http({
    url: "/type/addParent",
    method: "post",
    data: data,
  });
}

// 获取一级分类名称
// 参数上级分类名称 parent_name
export function selectParentNameNUll(data) {
  return http({
    url: "/wares/selectParentNameNUll",
    method: "post",
    data: data,
  });
}

// 删除一级分类
export function deleteProduct(data) {
  return http({
    url: "/wares/deleteMenu",
    method: "post",
    data,
  });
}

//
export function selectParentNotNull(data) {
  return http({
    url: "/wares/selectParentNotNull",
    method: "post",
    data: data,
  });
}

//
export function getSecondList(data) {
  return http({
    url: "/wares/getSecondList",
    method: "post",
    data: data,
  });
}

//

export function deleteSubmenu(data) {
  return http({
    url: "/wares/deleteSubmenu",
    method: "post",
    data,
  });
}
