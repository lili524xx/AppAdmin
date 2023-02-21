<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- 上传图片：action图片上传的地址  list-type: 文件列表的类型 on-preview:图片预览的时候会出发  on-remove:当删除图片的时候会出发 
         file-list：照片墙需要展示的数据【数组：数组里面的元素务必要有name、url属性】
         on-preview：图片预览功能
         on-remove:删除图片的时候会触发
        -->
        <el-upload
          action="/list/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="SpuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          v-model="attrIdAndAttrName"
        >
          <el-option
            :label="unselect.name"
            :value="`${unselect.id}:${unselect.name}`"
            v-for="(unselect, index) in unSelectSaleAttr"
            :key="unselect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
        >
          添加销售属性</el-button
        >
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            label="序号"
            type="index"
            prop="prop"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性名"
            prop="saleAttrName"
            width="80"
          ></el-table-column>
          <el-table-column label="属性值名称列表" prop="prop" width="width">
            <!-- @close="handleClose(tag)" -->
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!--以下结构可以当作span和input切换 
            @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
                <!-- @click="showInput" -->
              </el-input>
              <el-button
                class="button-new-tag"
                v-else
                size="small"
                @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="prop" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",

  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      //spu属性初始化的时候是一个空的对象,在修改SPU的时候，会向服务器发请求，返回SPU信息（对象），在修改的时候可以利用服务器返回的这个对象收集最新的数据提交给服务器
      //存储SPU信息属性 初始化的时候是一个空的对象
      spu: {
        //三级分类的id
        category3Id: 0,
        //收集SPU图片的信息
        description: "",
        //spu的名称
        spuName: "",
        //品牌的id
        tmId: "",
        id: 0,
        //收集Spu图片信息
        spuImageList: [
          {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            spuId: 0,
          },
        ],
        //平台属性与属性值收集
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "string",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "string",
                saleAttrName: "string",
                saleAttrValueName: "string",
                spuId: 0,
              },
            ],
          },
        ],
      },
      tradeMarkList: [], //存储品牌信息
      SpuImageList: [], //存储spu图片的数据
      SaleAttrList: [], //销售属性的数组
      attrIdAndAttrName: "", //收集未选择的销售属性id和名字
    };
  },

  mounted() {},
  computed: {
    //计算出还未选择的销售属性
    unSelectSaleAttr() {
      //整个平台的销售属性一个三个，颜色，尺寸，版本 SaleAttrList
      //当前spu拥有的属于自己的销售属性 spuSaleAttrList
      //数组过滤的方法 可以从已有的数组当中过滤出用户需要的元素，并且返回一个新的数组
      let result = this.SaleAttrList.filter((item) => {
        //every是数组的方法，会返回一个真，一个假
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },

  methods: {
    //对于已有的图片【照片墙中显示的图片：有name、url字段的】，因为照片墙显示数据务必要有这两个属性
    //对于服务器而言，不需要name、url字段，将来对于有的图片的数据在提交给服务器的时候，需要处理的
    handleRemove(file, fileList) {
      //file:代表删除的那张图
      //fileList:照片墙剩下的图片
      console.log(file, fileList);
      //收集照片墙图片的数组
      //对于已有的图片【照片墙
    },
    handlePictureCardPreview(file) {
      //将图片地址赋值给这个属性
      this.dialogImageUrl = file.url;
      //对话框显示
      this.dialogVisible = true;
    },
    //初始化Spuform数据
    async initSpuData(spu) {
      //获取spu信息的数据
      let SpuResult = await this.$API.spu.reqSpu(spu.id);
      //在修改spu的时候,需要向服务器发请求的，把服务器返回的数据（对象），赋值给spu属性
      if (SpuResult.code == 200) {
        this.spu = SpuResult.data;
        //获取品牌的信息
        let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
        if (tradeMarkResult.code == 200) {
          this.tradeMarkList = tradeMarkResult.data;
        }
        //获取spu图片的数据
        let SpuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
        if (SpuImageResult.code == 200) {
          let listArr = SpuImageResult.data;
          listArr.forEach((item) => {
            item.name = item.imgName;
            item.url = item.imgUrl;
          });
          //把整理好的数据赋值给spuImageList
          this.SpuImageList = listArr;
        }
        //获取平台全部的销售属性
        let SaleResult = await this.$API.spu.reqBaseSaleAttrList();
        if (SaleResult.code == 200) {
          this.SaleAttrList = SaleResult.data;
        }
      }
    },
    //照片墙图片上传成功的回调
    handlerSuccess(response, file, fileList) {
      //收集图片信息
      this.spuImageList = fileList;
    },
    //添加新的销售属性
    addSaleAttr() {
      //已经收集需要添加的销售属性的信息
      //把收集到的销售属性数据进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      //向spu对象的spuSaleAttrList属性里面添加新的销售属性
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
    },
    //添加按钮的回调
    addSaleAttrValue(row) {
      //点击销售属性值当中添加按钮的时候，需要有button变为input,通过当前销售属性的inputVisible控制
      //挂载在销售属性身上的响应式数据inputVisible，控制button与input切换
      this.$set(row, "inputVisible", true);
      //通过响应式数据inputValue字段收集新增的销售属性值
      this.$set(row, "inputValue", "");
    },
    //el-input失去焦点的事件
    handleInputConfirm(row) {
      //解构出销售属性中收集的数据
      const { baseSaleAttrId, inputValue } = row;
      //新增的销售属性值不能为空
      if (inputValue.trim() == "") {
        this.$message("属性值名称不能为空！");
        return;
      }
      //属性值不能重复
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      if (!result) return;
      //新增的销售属性值
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      //新增
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      //修改字段的值，显示button
      row.inputVisible = false;
    },
    //保存按钮的回调
    async addOrUpdateSpu() {
      //整理参数 照片墙参数：携带imgname,imgurl
      this.spu.spuImageList = this.spuImageList?.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
        
      });

      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      console.log(result);
      if (result.code == 200) {
        this.$message({ type: "success", message: "保存成功" });
        //通知父组件回到scene为0的场景
        this.$emit("changeScene", {scene:0,flag:this.spu.id ?"修改":"添加"});
      }
      //清除数据
      Object.assign(this._data,this.$options.data())
    },
    //点击添加SPU按钮的时候，发请求的函数
    async addSpuData(category3Id) {
      //添加spu的时候收集三级分类的id
      this.spu.category3Id=category3Id
      //获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      //获取平台全部的销售属性
      let SaleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (SaleResult.code == 200) {
        this.SaleAttrList = SaleResult.data;
      }
    },
    //取消按钮
    cancel(){
      //Object.assign:es6中新增的方法可以合并对象
      //组件实例this._data,可以操作data当中响应式数据
      //this.$options可以获取配置对象，配置对象的data函数执行,返回的响应式数据为空的
      this.$emit('changeScene', {scene:0,flag:''})
      //清除数据
      Object.assign(this._data,this.$options.data())
    }
  },
};
</script>

<style >
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>