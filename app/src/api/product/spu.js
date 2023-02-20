import request from '@/utils/request'
 

//获取spu列表接口的数据 /admin/product/{page}/{limit}
export const reqSpuList=(page,limit,category3Id)=>request({url:`list/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})

//获取spu信息  /admin/product/getSpuById/{spuId}
export const reqSpu=(spuId)=>request({url:`list/admin/product/getSpuById/${spuId}`,method:'get'})

//获取品牌的信息
//admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList=()=>request({url:'list/admin/product/baseTrademark/getTrademarkList',method:'get'})

//获取sku图片的接口 /admin/product/spuImageList/{spuId}
export const reqSpuImageList=(spuId)=>request({url:`list/admin/product/spuImageList/${spuId}`,method:'get'})

//获取平台的销售属性 GET /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList=()=>request({url:'list/admin/product/baseSaleAttrList',method:'get'})

//修改spu|添加spu: 对于修改或者添加，携带给服务器的参数大致是一样的，唯一的区别就是携带的参数是否带有id
export const reqAddOrUpdateSpu=(spuInfo)=>{
    //携带的参数带id 修改spu POST /admin/product/updateSpuInfo
    if(spuInfo.id){
        return request({url:'list/admin/product/updateSpuInfo',method:'post',data:spuInfo})
    }
    //携带的参数不带id 添加spu
    else{
       return request({url:'list/admin/product/saveSpuInfo',method:'post',data:spuInfo})
    }
}

//删除spu /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu=(spuId)=>request({url:`list/admin/product/deleteSpu/${spuId}`,method:'delete'})

//获取销售属性的数据
///admin/product/spuSaleAttrList/{spuId}  get
export const reqSpuSaleAttrList = (spuId)=>request({url:`list/admin/product/spuSaleAttrList/${spuId}`,method:'get'});


//获取平台属性的数据
//GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} 
export const reqAttrInfoList = (category1Id,category2Id,category3Id)=>request({url:`list/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'});


//添加SKU
///admin/product/saveSkuInfo  post
export const reqAddSku = (skuInfo)=>request({url:'list/admin/product/saveSkuInfo',method:'post',data:skuInfo});

//获取sku数据的接口 /admin/product/findBySpuId/{spuId}
export const reqSkuList=(spuId)=>request({url:`list/admin/product/findBySpuId/${spuId}`,method:'get'})


