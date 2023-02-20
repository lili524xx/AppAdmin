<template>
  <div class="box" ref="box"></div>
</template>

<script>
import * as echarts from "echarts";
import { Tooltip } from "element-ui";
export default {
  name: "",

  data() {
    return {};
  },

  mounted() {
    //初始化echarts
    let myCharts = echarts.init(this.$refs.box);
    myCharts.setOption({
      xAxis: {
        //隐藏x轴
        show: false,
        //最小值和最大值的设置
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        //均分
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
          color: "yellowgreen",
          //柱状图的宽度
          barWidth: 10,
          //背景颜色的设置
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          //文本
          label: {
            show: true,
            //改变文本内容
            formatter: "|",
            //文本标签位置调试
            position: "right",
            
          },
        },
      ],
      tooltip: {},
    });
  },

  methods: {},
};
</script>

<style  scoped>
.box {
  height: 100%;
  width: 100%;
}
</style>