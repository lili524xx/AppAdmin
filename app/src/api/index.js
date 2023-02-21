//将四个模块请求的接口函数统一暴露
import * as tradeMark from './product/tradeMark'
import * as sku from './product/sku'
import * as spu from './product/spu'
import * as attr from './product/attr'
//引入权限相关文件
import  permission from './acl/permission'
import  role from './acl/role'
import * as user from './acl/user'

//对外暴露
export default{
    tradeMark,
    sku,
    spu,
    attr,
    permission,
    role,
    user
}
