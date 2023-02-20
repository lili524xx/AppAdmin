import request from '@/utils/request'

//获取sku列表数据 /admin/product/list/{page}/{limit}
export const reqSkuArrList=(page,limit)=>request({url:`list/admin/product/list/${page}/${limit}`,method:'get'})

//上架 /admin/product/onSale/{skuId}
export const reqSale=(skuId)=>request({url:`list/admin/product/onSale/${skuId}`,method:'get'})
//下架 GET /admin/product/cancelSale/{skuId}
export const reqSaleCancel=(skuId)=>request({url:`list/admin/product/cancelSale/${skuId}`,method:'get'})

//获取sku详情的接口 GET /admin/product/getSkuById/{skuId}
export const reqSkuById=(skuId)=>request({url:`list/admin/product/getSkuById/${skuId}`,method:'get'})

//删除sku接口
export const reqSkuDelete=(skuId)=>request({url:`list/admin/product/deleteSku/${skuId}`,method:'delete'})
