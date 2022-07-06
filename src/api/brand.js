import http from "@/utils/http";

// getBrands 获取品牌 参数store_id
export function getBrands(data) {
  return http({ url: "/wares/getBrands",
  method: "post", 
  data, 
});
}
// 删除品牌 参数store_id
export function deleteBrand(data) {
  return http({ url: "/wares/deleteBrand",
  method: "post", 
  data, 
});
}
