<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 展示平台属性 -->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column
            type="index"
            prop="prop"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150"
          ></el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="80"
          ></el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里的结构需要用到input和span来回切换 -->
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
               <!-- 气泡确认框 -->
               <el-popconfirm :title="`确定删除${row.valueName}?`" @onConfirm="deleteAttrValue($index)">
                  <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
                </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="AddOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//按需引入lodash当中的深拷贝
import cloneDeep from "lodash/cloneDeep";
import { type } from "os";

export default {
  name: "Attr",

  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //接收平台属性字段
      attrList: [],
      //控制表格的显示与隐藏
      isShowTable: true,
      //收集新增属性|将来修改属性使用的
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值，有多个数据，所以用数组
        ],
        categoryId: 0, //三级分类的id
        categoryLevel: 0, //三级分类的level，服务器也需要区分是几级id
        id: 0,
      },
    };
  },

  mounted() {},

  methods: {
    //自定义事件的回调
    getCategoryId({ categoryId, level }) {
      //区分三级分类相应的id
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getAttrList();
      }
    },
    //发请求获取品牌属性
    //当用户确定三级分类的数据时，可以向服务器发请求获取平台属性进行展示
    async getAttrList() {
      //解构分类的ID
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    //添加属性值回调
    addAttrValue() {
      //向属性值数组里添加元素
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, //对于修改某个属性值的时候，可以在已有的属性值基础上新增新的属性值（新增属性值时，需把已有的id带上
        ValueName: "",
        flag: true, //给每一个属性值添加一个标记flag,用户切换查看和编辑模式，好处：每一个属性值可以控制自己的模式切换，flag:响应式数据，数据变化，视图跟着变
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //添加属性的回调
    addAttr() {
      //切换table的显示与隐藏
      this.isShowTable = false;
      //清除数据
      //收集三级分类id
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [
          //属性值，有多个数据，所以用数组
        ],
        categoryId: this.category3Id, //三级分类的id
        categoryLevel: 0, //三级分类的level，服务器也需要区分是几级id
        id: 0,
      };
    },
    //修改属性的回调
    updateAttr(row) {
      //切换table的显示与隐藏
      this.isShowTable = false;
      //将选中的属性赋值给attrInfo
      //由于数据结构中存在对象里面套数组，数组里面套对象，因此使用深拷贝解决
      this.attrInfo = cloneDeep(row);
      //修改某一个属性时，将相应的属性值元素加上flag标记
      this.attrInfo.attrValueList.forEach((item) => {
        //这样书写也可以给属性值添加flag自动，但是会发现视图不会跟着变化（因为flag不是响应式数据）
        //因为Vue无法探测普通的新增 property,这样书写的属性并非响应式属性（数据变化视图跟这边）
        //item.flag=false
        //第一个参数:对象  第二个参数:添加新的响应式属性  第三参数：新的属性的属性值
        this.$set(item, "flag", false);
      });
    },
    //失去焦点的事件，切换为查看模式
    toLook(row) {
      //如果属性值为空不能作为新的属性值，需要用户提示，让它输入一个其他属性值
      if (row.valueName.trim() =='') {
        this.$message("请你输入一个正常的属性值");
        return;
      }
      //新增的属性值不能与已有的属性值相同
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        //需要将row从数组里面判断的时候去除
        //row，新增的最新属性值
        //判断时，去除自身属性
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepat) return;
      //row:形参是当前用户添加的最新的属性值
      //当前编辑模式变为查看模式[让input消失，显示span]
      row.flag = false;
    },
    //点击span的回调 切换为编辑模式
    toEdit(row, index) {
      row.flag = true;
      //获取input节点，实现自动聚焦
      //需要注意，点击span时，切换为编辑模式input，但是注意对于浏览器而言，页面的重绘与重排是需要花时间的
      //$nextTick,当节点渲染完毕了，会执行一次
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    //气泡确认框的确认按钮回调
    deleteAttrValue(index){
      //当前删除属性值的操作是不需要发请求的
    this.attrInfo.attrValueList.splice(index,1)
    },
    //保存按钮 将数据提交给服务器
   async AddOrUpdateAttr(){
       //整理参数 如果用户添加了许多属性值，且属性值为空，不应该提交给服务器
       //提交给服务器数据当中不应该出现flag字段
      this.attrInfo.attrValueList= this.attrInfo.attrValueList.filter(item=>{
        //如果属性值不为空
        if(item.valueName!=''){
          //删除flag属性
          delete item.flag
          return true
        }
       })
       //发请求
       try{
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        //展示平台属性的信号量进行切换
        this.isShowTable = true;
        this.$message({type:'success',message:'保存成功'})
        //保存成功以后再次获取平台属性
        this.getAttrList()
       }catch(error){
     
       }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>