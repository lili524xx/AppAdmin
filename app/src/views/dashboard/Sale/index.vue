<template>
  <el-card class="box-card" style="margin: 10px 0px">
    <div slot="header" class="clearfix">
      <!-- v-model="activeName" @tab-click="handleClick" -->
      <!-- 头部左侧内容 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <!-- v-model="value1" -->

        <el-date-picker
          type="daterange"
          v-model="date"
          class="date"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 内容区 -->
    <div>
      <el-row>
        <el-col :span="16">
          <!-- 容器 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="8" class="right">
          <h3>门店{{ title }}排名</h3>
          <ul>
            <li>
              <span class="rindex">0</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="rindex">1</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="rindex">3</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="lindex">4</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="lindex">5</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="lindex">6</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="lindex">7</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
import { mapState } from "vuex";
import dayjs from 'dayjs'

export default {
  name: "",

  data() {
    return {
      activeName: "sale",
      myCharts:null,
      //收集日历的数组
      date:[]
    };
  },
  computed:{
   //计算属性-标题
   title(){
    return this.activeName=='sale'?'销售额':'访问量'
   },
   ...mapState({
    listState:state=>state.home.list
   })
   
  },

  mounted() {
    
    //初始化ecjarts
    this.myCharts = echarts.init(this.$refs.charts);
    //配置项
    this.myCharts.setOption({
        title:{
            text:this.title+"趋势"
        },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data:this.listState.orderFullYearAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.listState.orderFullYear,
          color:"yellowgreen"
        },
      ],
    });
    //顶部是mounted:第一次没有数据，不显示
  },

  methods: {
    //今日
    setDay(){
     const day=dayjs().format('YYYY-MM-DD')
     this.date=[day,day]
    },
    //本周
    setWeek(){
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
   //本月
   setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    //本年
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
   //监听
   watch:{
  title(){
  //重新修改图表配置的数组
  //图表配置的数据可以再次修改
  this.myCharts.setOption({
    title:{
        text:this.title
    },
    xAxis:{
      data:this.title=="销售额"?this.listState.orderFullYearAxis:this.listState.userFullYearAxis
    },
    series:{
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.title=="销售额"?this.listState.orderFullYear:this.listState.userFullYear,
          color:"yellowgreen"
        }

  })
  },
  listState(){
    //初始化ecjarts
    this.myCharts = echarts.init(this.$refs.charts);
    //配置项
    this.myCharts.setOption({
        title:{
            text:this.title+"趋势"
        },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data:this.listState.orderFullYearAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.listState.orderFullYear,
          color:"yellowgreen"
        },
      ],
    });
    
  }
},

};
</script>

<style  scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.right span {
  margin: 0 10px;
}
.date {
  width: 230px;
  max-width: 0px 20px;
}
.charts {
  width: 100%;
  height: 300px;
}
.right{
    margin: 0;
}
ul{
    list-style: none;
    width: 100%;
    height: 300px;
}
ul li{
    height: 8%;
}
.rindex{
    float: left;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: black;
    color:white;
    text-align:center;

}
.rvalue{
    float: right;
}
.lindex{
    float: left;
    width: 15px;
    height: 15px;
    text-align: center;
}
</style>