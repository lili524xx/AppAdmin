<template>
  <div>
    <el-form ref="form" label-width="90px">
      <el-form-item label="SPU的名称">{{spu.spuName}}</el-form-item>
      <el-form-item label="SKU的名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" placeholder="规格描述" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性" >
        <el-form ref="form" label-width="90px" :inline="true">
          <el-form-item :label="attr.attrName" v-for="(attr,index) in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择"  v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="(attrValue,index) in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form ref="form" label-width="90px" :inline="true"> 
          <el-form-item :label="sale.saleAttrName" v-for="(sale,index) in spuSaleAttrList" :key="sale.id2">
            <el-select placeholder="请选择" v-model="sale.saleAndValueId">
              <el-option :label="saleValue.saleAttrValueName" :value="`${sale.id}:${saleValue.id}`" v-for="(saleValue,index) in sale.spuSaleAttrValueList" :key="saleValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%;" border  :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column
            label=""
            width="80px"
            prop="prop"
            type="selection"
          ></el-table-column>
          <el-table-column label="图片">
            <template slot-scope="{row,$index}">
             <img :src="row.imgUrl" style="width: 100px; height: 100px;"/>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
             <el-button type="primary" v-if="row.isDefault==0" @click="changeDefault(row)">设置默认</el-button>
             <el-button type="primary" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="label">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item> </el-form
    >>
  </div>
</template>

<script>
export default {
  name: "",

  data() {
    return {
     //存储图片的信息
     spuImageList: [],
      //存储销售是属性
      spuSaleAttrList: [],
      //存储平台属性的数据
      attrInfoList: [],
      //收集sku数据的字段
      skuInfo: {
        //第一类收集的数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //第二类：需要通过数据双向绑定v-model收集
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",
        //第三类：需要自己书写代码
        //默认图片
        skuDefaultImg: "",
        //收集图片的字段
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        //平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        //销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],


      },
      spu:{},
      //收集图片的数据字段:但是需要注意，收集的数据目前缺少isDefault字段，将来提交给服务器数据的时候，需要整理参数
      imageList:[]
    };
  },

  mounted() {},

  methods: {
    //获取skuForm数据
    async getData(category1Id, category2Id, spu) {
        //收集父组件给予的数组
        this.skuInfo.category3Id=spu.category3Id
        this.skuInfo.tmId=spu.tmId
        this.skuInfo.spuId=spu.spuId
        this.spu = spu;
      //获取图片的数据
      let result = await this.$API.spu.reqSpuImageList(spu.id);
      if (result.code == 200) {
        let list=result.data
        list.forEach(item => {
            item.isDefault=0
        });
        this.spuImageList = list
      }
      //获取销售属性
      let SaleResult = await this.$API.spu.reqSpuSaleAttrList(spu.id);
      if (SaleResult.code == 200) {
        this.spuSaleAttrList = SaleResult.data;
      }
      //获取平台属性
      let ArrResult = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (ArrResult.code == 200) {
        this.attrInfoList = ArrResult.data;
      }
    },
    //table复选框按钮事件
    handleSelectionChange(params){
    //获取到用户选中的图片的信息数据，但是需要注意，当前收集的数据当中，缺少isDefault字段
    this.imageList=params
    },
    //排他的操作
    changeDefault(row){
    //图片列表的数据的isDefault字段变为0
    this.spuImageList.forEach(item=>{
        item.isDefault=0
    })
    //点击的图片的数据为1
    row.isDefault=1
    //收集以下默认图片的信息
    this.skuInfo.skuDefaultImg=row.imgUrl
    },
    //保存按钮的事件
    async save(){
    //收集平台属性参数
    const {attrInfoList,skuInfo,spuSaleAttrList,imageList}=this
    //整理平台属性的数据
    skuInfo.skuAttrValueList = attrInfoList.reduce((prev,item) => {
      if(item.attrIdAndValueId){
        const [attrId,valueId]=item.attrIdAndValueId.split(":")
          prev.push({attrId,valueId})
      }
        return prev     
      },[]);
     //整理销售属性的数据
    skuInfo.skuSaleAttrValueList=spuSaleAttrList.reduce((prev,item)=>{
      if(item.saleAndValueId){
        const [saleId,valueId]=item.saleAndValueId.split(":")
        prev.push({saleId,valueId})
      }
      return prev
     },[])
    //整理数据
    skuInfo.skuImageList=imageList.map((item)=>{
      return {
           imgName:item.imgName,
           imgUrl:item.imgUrl,
           isDefault:item.isDefault,
           spuImgId:item.id,
         }
    })
    //发请求
    let result=await this.$API.spu.reqAddSku(skuInfo)
    if(result.code==200){
      this.$message({type:'success',message:'添加SKU成功'})
      this.$emit('changeScene',{scene:0,flag:''})
    }
      //清除数据
      Object.assign(this._data,this.$options.data())
  },
  
    //取消按钮
    cancel(){
    this.$emit('changeScene', {scene:0,flag:''});
    Object.assign(this._data,this.$options.data())
    }
  },
};
</script>

<style lang="scss" scoped>
</style>