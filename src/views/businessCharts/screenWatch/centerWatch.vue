<template>
  <div class="main">
    <main>
      <section class="left">
        <div class="topSales" id="topSales"></div>
        <div class="bottomGameMachine"></div>
      </section>
      <section class="center"></section>
      <section class="right"></section>
    </main>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "name",
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    this.ms1();
  },
  components: {},
  methods: {
    ms1() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("topSales"));
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 50, name: "完成率" }]
          }
        ]
      };
       myChart.setOption(option);
 
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {myChart.resize()});

      setInterval(function() {
        option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        myChart.setOption(option, true);
      }, 2000);
    }
  }
};
</script>


<style lang="less" scoped>
main {
  background-color: #02142c;
  height: 1200px;
  display: flex;
  padding: 20px;
  > .left {
    flex: 20%;
    // height: 600px;
    >.topSales{
      height: 45%;
      width: 100%;
      border: 1px solid #267ca6;
      border-radius: 3px;
    }
  }
  > .center {
    flex: 45%;
  }
  > .right {
    flex: 35%;
  }
}
</style>
