<template>
  <div class="vlt-card check-echarts">
    <div class="echart" v-if="isShow">
      <h2>XX仓库设备盘点</h2>
      <div class="charts" :style="{width: '500px', height: '500px'}" ref="echarts"></div>
    </div>
    <div class="list" v-else>
        <h2>XX仓库设备盘点</h2>
        <el-table
        class="list-table"
        :data="tableData"
        border
        style="width: 100%">
          <el-table-column prop="date" label="序号"></el-table-column>
          <el-table-column prop="goodsName" label="物品名称"></el-table-column>
          <el-table-column prop="goodsModel" label="物品型号"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column prop="inventoryNum" label="库存数量"></el-table-column>
          <el-table-column prop="iossNum" label="损耗数量"></el-table-column>
      </el-table>
    </div>
    <el-row class="checkBtn">
      <el-button type="primary" @click="changeBtn" v-text="isShow?'查看列表':'查看图表'"></el-button>
    </el-row>
</div>
</template>

<script type="text/javascript">
import echarts from "echarts";
export default {
  name: "inventoryStatistics",
  data() {
    return {
      isShow:true,
      tableData:[
        {
          id:1,
          goodsName:'hsajf ',
          goodsModel:'1315',
          unit:'个',
          inventoryNum:1000,
          iossNum:5
        }
      ]
    };
  },
  mounted() {
    this.initCharts();
    //   this.$nextTick(() => {
    //     this.initCharts();
    //   });
  },

  methods: {
    
    initCharts() {
      let myChart = echarts.init(this.$refs.echarts);
      // console.log(this.$refs.echarts);
      myChart.setOption({
        color: ['#3398DB'],
        // title: { text: "XX仓库设备盘点" },
        tooltip: {},
        grid:{
          bottom:'8%'
        },
        xAxis: {
          // type : 'category', 
          data: ["类别1", "类别2", "类别3", "类别4"]
        },

        yAxis: [{
          min:0,
          max:5,
          interval:0.5,
        }],
        series: [
          {
            // name: "销量",
            type: "bar",
            barWidth: '40%',
            data: [2,1,3,4]
          }
        ]
      });
    },
    changeBtn() {
      console.log(this);
      this.isShow = !this.isShow;
    },
  }
};
</script>

<style lang="less" sc-oped>
.check-echarts{
  position: relative;
  h2{
  margin-bottom: 20px;
}
.charts{
  border:1px solid rgb(218, 218, 218);
}
.checkBtn{
  position: absolute;
  top: 16px;left: 800px;
}
.list-table{
  margin-top: 38px;
}
}

</style>
