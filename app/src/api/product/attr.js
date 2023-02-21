//平台属性管理模块请求文件
import request from '@/utils/request'
 
//获取一级分类的数组
//GET /admin/product/get/category1/{id}
export const reqCategory1List=()=>request({url:`list/admin/product/getCategory1`,method:'get'})
//获取二级分类的数组
export const reqCategory2List=(category1Id)=>request({url:`list/admin/product/getCategory2/${category1Id}`,method:'get'})
//获取三级分类的数组
export const reqCategory3List=(category2Id)=>request({url:`list/admin/product/getCategory3/${category2Id}`,method:'get'})
//获取平台属性的接口 GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList=(category1Id,category2Id,category3Id)=>request({url:`list/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})
//获取商品属性和属性值接口 POST /admin/product/saveAttrInfo
export const reqAddOrUpdateAttr=(data)=>request({url:'list/admin/product/saveAttrInfo',method:'post',data})
