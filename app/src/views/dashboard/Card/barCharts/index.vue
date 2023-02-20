<template>
    <div class="box" ref="box"></div>
</template>

<script>
import * as echarts from 'echarts'
import { Tooltip } from 'element-ui';
export default {
    name: '',

    data() {
        return {
            
        };
    },

    mounted() {
        //初始化echarts
        let myCharts=echarts.init(this.$refs.box)
        myCharts.setOption({
            xAxis:{
               //隐藏x轴
               show:false,
               type:'category'
            },
            yAxis:{
                show:false
            },
            series:[
                {
                    type:'bar',
                    data:[10,20,30,40,14,29,30,45,32,9,36],
                    //布局条数
                    grid:{
                    left:0,
                    right:0,
                    top:0,
                    bottom:0
                    }
                }
            ],
            tooltip:{
                     
                    }

        })
    },

    methods: {
        
    },
};
</script>

<style  scoped>
.box{
    height: 100%;
    width: 100%;
}
</style>