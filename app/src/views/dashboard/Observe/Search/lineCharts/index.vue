<template>
    <div>
        <div class="header">
            <span class="search-header">搜索用户数</span>
            <span><i class="el-icon-info"></i></span>
        </div>
        <div class="main">
            <span class="main-title">12321</span>
            <span class="main-content">17.1</span>
            <svg t="1673081603158" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1601" width="16" height="16"><path d="M905.216 895.488H119.808c-11.264 0-22.016-6.144-27.648-15.872-5.632-9.728-5.632-22.016 0-31.744L484.864 167.424c5.632-9.728 16.384-15.872 27.648-15.872s22.016 6.144 27.648 15.872l392.704 679.936c5.632 9.728 5.632 22.016 0 31.744s-16.384 16.384-27.648 16.384z" fill="#d81e06" p-id="1602"></path></svg>
            <svg t="1673081518340" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1358" width="16" height="16"><path d="M535.466667 812.8l450.133333-563.2c14.933333-19.2 2.133333-49.066667-23.466667-49.066667H61.866667c-25.6 0-38.4 29.866667-23.466667 49.066667l450.133333 563.2c12.8 14.933333 34.133333 14.933333 46.933334 0z" fill="#d81e06" p-id="1359"></path></svg>
             
        </div>
        <div class="footer">
            <div class="charts" ref="charts"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: '',

    data() {
        return {
            
        };
    },

    mounted() {
    //初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    //配置数据
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [7, 33, 12, 48, 9,29,10,44],
          //拐点的样式
          itemStyle: {
            opacity: 0,
          },
          //线条的样式
          lineStyle: {
            color: "blue",
          },
          //填充颜色的设置
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "blue", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          smooth:true
         
        },
      ],
      //布局的调试
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    });
  },

    methods: {
        
    },
};
</script>

<style  scoped>
.el-icon-info{
    color:grey ;
}
.header{
    display: flex;
    align-items: center;
}
.search-header{
    margin-right: 20px;
}
.main{
    margin: 10px 0;
}
.main-title{
    margin-right: 30px;
}
.main-content{
    margin-right: 10px;
}
.charts{
    width: 100%;
    height: 50px;
}
</style>