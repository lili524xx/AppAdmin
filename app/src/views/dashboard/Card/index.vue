<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="￥126560">
            <template slot="charts">
             <span>周同比 &nbsp;&nbsp;56.67%
                <svg t="1673081603158" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1601" width="16" height="16"><path d="M905.216 895.488H119.808c-11.264 0-22.016-6.144-27.648-15.872-5.632-9.728-5.632-22.016 0-31.744L484.864 167.424c5.632-9.728 16.384-15.872 27.648-15.872s22.016 6.144 27.648 15.872l392.704 679.936c5.632 9.728 5.632 22.016 0 31.744s-16.384 16.384-27.648 16.384z" fill="#d81e06" p-id="1602"></path></svg>
            </span>
             <span>日同比&nbsp;&nbsp;
                <svg t="1673081518340" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1358" width="16" height="16"><path d="M535.466667 812.8l450.133333-563.2c14.933333-19.2 2.133333-49.066667-23.466667-49.066667H61.866667c-25.6 0-38.4 29.866667-23.466667 49.066667l450.133333 563.2c12.8 14.933333 34.133333 14.933333 46.933334 0z" fill="#d81e06" p-id="1359"></path></svg>
             </span>
            </template>
            <template slot="footer">
            <span>
                日销售额￥ 12423
            </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="￥88460">
            <template slot="charts">
                <linCharts></linCharts>
            </template>
            <template slot="footer">
            <span>
                日访问量 1234
            </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="￥88460">
            <template slot="charts">
             <barCharts></barCharts>
            </template>
            <template slot="footer">
            <span>
                转化率 64%
            </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
                <progressCharts></progressCharts>
            </template>
            <template slot="footer">
             <span>周同比 &nbsp;&nbsp;56.67%
                <svg t="1673081603158" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1601" width="16" height="16"><path d="M905.216 895.488H119.808c-11.264 0-22.016-6.144-27.648-15.872-5.632-9.728-5.632-22.016 0-31.744L484.864 167.424c5.632-9.728 16.384-15.872 27.648-15.872s22.016 6.144 27.648 15.872l392.704 679.936c5.632 9.728 5.632 22.016 0 31.744s-16.384 16.384-27.648 16.384z" fill="#d81e06" p-id="1602"></path></svg>
            </span>
             <span>日同比&nbsp;&nbsp;
                <svg t="1673081518340" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1358" width="16" height="16"><path d="M535.466667 812.8l450.133333-563.2c14.933333-19.2 2.133333-49.066667-23.466667-49.066667H61.866667c-25.6 0-38.4 29.866667-23.466667 49.066667l450.133333 563.2c12.8 14.933333 34.133333 14.933333 46.933334 0z" fill="#d81e06" p-id="1359"></path></svg>
             </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import linCharts from "./lineCharts"
import barCharts from './barCharts';
import progressCharts from './progressCharts'
export default {
  name: "",
  components: {
    Detail,
    linCharts,
    barCharts,
    progressCharts
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style  scoped>
span{
    margin-right: 5px;
}
</style>