<template>
    <div>
      <el-card style="margin: 20px 0">
        <!-- 三级联动已经是全局组件 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="scene!=0"></CategorySelect>
      </el-card>
      
      <el-card>
      <!-- 底部这里将来是由三部分进行切换的 -->
      <div v-show="scene==0">
        <!-- 显示spu列表的结构 -->
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <el-table style="width: 100%;" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)"></hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表" @click="handler(row)"></hint-button>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除sku" slot="reference"></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--  @current-change="getPageList"
      @size-change="handleSizeChange" -->
        <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3, 5, 10]"
      @current-change="getSpuList"
      @size-change="handleSizeChange"
      layout="prev, pager, next, jumper,->,sizes,total"
    >
    </el-pagination>
      </div>
       <Spuform v-show="scene==1" @changeScene="changeScene" ref="spu"></Spuform>
       <Skuform v-show="scene==2" @changeScene="changeScene" ref="sku"></Skuform>
      </el-card>
      <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
        <!-- table展示sku列表 -->
      <el-table :data="skuList" style="width: 100%;" border v-loading="loading">
      <el-table-column prop="skuName" label="名称" width="150"></el-table-column>
      <el-table-column property="price" label="价格" width="200"></el-table-column>
      <el-table-column property="weight" label="重量"></el-table-column>
      <el-table-column  label="默认图片">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;"/>

        </template>
      </el-table-column>
      </el-table>
      </el-dialog>
    </div>
</template>

<script>
//引入子组件
import Spuform from './Spuform'
import Skuform from './Skuform'
import { done } from 'nprogress';
export default {
    name: 'Spu',
    
    data() {
        return {
            category1Id:'',
            category2Id:'',
            category3Id:'',
            page:1,  //分页器的当前页
            limit:3, //分页器每页展示的数据量
            records:[], //spu列表数据
            total:0,     //分页器一共需要展示数据的条数
            scene:0,  //0代表展示spu列表数据   1  添加spu|修改spu  2添加sku
            //控制对话框的显示与隐藏
            dialogTableVisible: false,
            spu:{},
            //存储的是sku列表的数据
            skuList:[],
            //加载属性
            loading:true
        };
    },
    components:{
        Spuform,
        Skuform
    },

    mounted() {
        
    },

    methods: {
        //三级联动的自定义事件，可以把子组件的相应的id传递给父组件
        getCategoryId({categoryId,level}){
        //categoryId:获取一二三级id，level区分几级id
        if(level==1){
            this.category1Id=categoryId
            //清除数据
            this.category2Id='',
            this.category3Id=''
        }else if(level==2){
            this.category2Id=categoryId
            this.category3Id=''
        }else{
            this.category3Id=categoryId
            //获取spu类列表数据
            this.getSpuList()
        }
        },
        //获取spu列表数据的方法  点击分页器的第几页按钮的回调
        async getSpuList(pages = 1){
            this.page=pages
            //解构参数
            const {page,limit,category3Id}=this
         //携带三个参数:page 第几页  limit 每一页需要展示多少条数据  三级分类id
        let result=await this.$API.spu.reqSpuList(page,limit,category3Id)
        if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
        },
        //当每一页数据条数改变时
        handleSizeChange(limit){
            //修改参数
        this.limit=limit,
        this.getSpuList()
        },
        //添加SPU按钮的回调
        addSpu(){
        this.scene=1
        //通知子组件spu发请求
        this.$refs.spu.addSpuData(this.category3Id)
        },
        //修改某一个spu
        updateSpu(row){
        this.scene=1
        //在父组件当中可以通过$ref获取子组件等等
        this.$refs.spu.initSpuData(row)
        },
        //自定义事件回调 （Spuform)
        //flag:为了区分保存按钮是修改还是添加
        changeScene({scene,flag}){
        this.scene=scene
        if(flag=="修改"){
        this.getSpuList(this.page)
        }
        else{
        this.getSpuList()
        }
        },
        //删除spu按钮的回调
       async deleteSpu(row){
       let result= await this.$API.spu.reqDeleteSpu(row.id)
       if(result.code==200){
        this.$message({type:'success',message:"删除成功"})
        //如果当前页的数据个数大于1，停留在当前页，小于1，停留在第一页
        this.getSpuList(this.records.length>1 ?this.page:this.page-1)
       }
        },
        //添加sku按钮的回调
        addSku(row){
        //切换场景为2
        this.scene=2
        //父组件调用子组件的方法，让子组件发送请求   ---三个请求
        this.$refs.sku.getData(this.category1Id,this.category2Id,row)
        
        },
        //查看sku按钮的回调
        async handler(spu){
        //当点击按钮时，对话框可见
        this.dialogTableVisible=true
        this.spu=spu
        //获取sku列表的数据进行展示
        let result=await this.$API.spu.reqSkuList(spu.id)
        if(result.code==200){
          this.skuList=result.data
          //loading隐藏
          this.loading=false

        }
        },
        //关闭对话框的回调
        close(done){
          //loading效果为真
          this.loading=true
          //清除数据
          this.skuList=[]
          //关闭对话框
          done()
        }
    },
};
</script>

<style lang="scss" scoped>

</style>