<template>
  <div class="main centerWatch">
    <main>
      <section class="left">
        <div class="one">
          <div class="title">全国销量概况</div>
          <span class="salesTitle">目前年任务完成率(%)</span>
          <div class="topSales" id="topSales"></div>
          <div class="salesNumber">
            <div>
              <section>
                <p>今年任务</p>
                <p>232424242</p>
              </section>
              <section>
                <p>今年销售量</p>
                <p>232424242</p>
              </section>
              <section>
                <p>7月销售量</p>
                <p>232424242</p>
              </section>
            </div>
          </div>
        </div>

        <div class="bottomGameMachine">
          <div class="title">全国大厅游戏机情况</div>
          <div class="bottomMachine" id="bottomMachine"></div>
        </div>
      </section>
      <section class="center">
        <div class="mianMap" id="mianMap"></div>
      </section>
      <section class="right">
        <div class="salesRanking">
          <div class="title">全国大厅销量排名</div>
          <div class="tableData" id="tableData">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{prop: 'date', order: 'descending'}"
              :cell-style="tableRowStyle"
              :header-cell-style="tableHeaderColor"
            >
              >
              <el-table-column align="center" prop="date" label="大厅编号"></el-table-column>
              <el-table-column align="center" prop="name" label="所属省份"></el-table-column>
              <el-table-column align="center" prop="name" label="销售金额" sortable width="120"></el-table-column>
              <el-table-column align="center" prop="name" label="中奖金额" sortable width="120"></el-table-column>
              <el-table-column align="center" prop="name" label="兑奖金额" sortable width="120"></el-table-column>
              <el-table-column align="center" prop="name" label="状态"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="marketShares">
          <div class="title">全国游戏市场份额</div>
          <div class="sharesMap" id="sharesMap"></div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "name",
  data() {
    return {
      tableData: [
        {
          date: "232323",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "232323",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "232323",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "232323",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.salesMap();
    this.machineMap();
    this.sharesMap();
    this.dailySalesMap();
  },
  components: {},
  methods: {
    // 修改table tr行的背景色
    tableRowStyle({ row, column, rowIndex, columnIndex }) {
      return "color:red;align:center;background-color: #02142c;";
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #02142c;color:#c5d6ea;font-weight: 500;align:center;";
      }
    },
    formatter(row, column) {
      return row.address;
    },
    //销量概况仪表盘
    salesMap() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("topSales"));
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        // toolbox: {
        //   feature: {
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 50, name: "ddd" }],
            axisLine: {
              show: true,
              lineStyle: {
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0.1,
                        color: "#FFC600"
                      },
                      {
                        offset: 0.6,
                        color: "#30D27C"
                      },
                      {
                        offset: 1,
                        color: "#0B95FF"
                      }
                    ])
                  ]
                ]
              }
            },
            title: {
              // 仪表盘标题。
              show: false, // 是否显示标题,默认 true。
              offsetCenter: [0, "20%"], //相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              color: "#33d27a", // 文字的颜色,默认 #333。
              fontSize: 15 // 文字的字体大小,默认 15。
            },
            detail: {
              // 仪表盘详情，用于显示数据。
              show: true, // 是否显示详情,默认 true。
              offsetCenter: [0, "50%"], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              color: "#fff", // 文字的颜色,默认 auto。
              fontSize: 20, // 文字的字体大小,默认 15。
              formatter: "{value}%" // 格式化函数或者字符串
            },
            axisLabel: {
              // 刻度标签。
              show: true, // 是否显示标签,默认 true。
              distance: 5, // 标签与刻度线的距离,默认 5。
              color: "#fff", // 文字的颜色,默认 #fff。
              fontSize: 12, // 文字的字体大小,默认 5。
              formatter: "{value}" // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。 示例:// 使用字符串模板，模板变量为刻度默认标签 {value},如:formatter: '{value} kg'; // 使用函数模板，函数参数分别为刻度数值,如formatter: function (value) {return value + 'km/h';}
            }
          }
        ]
      };
      myChart.setOption(option);

      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });

      setInterval(function() {
        option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        myChart.setOption(option, true);
      }, 2000);
    },
    //游戏机情况折线图
    machineMap() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("bottomMachine"));
      let option = {
        // title: {
        //   text: "堆叠区域图"
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        color: ["#1f9cc5", "#e77e63", "#f2d107"],
        legend: {
          textStyle: {
            fontSize: 12, //字体大小
            color: "#ffffff" //字体颜色
          },
          right: "0",

          data: ["游戏总机", "今年新增", "在线"]
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
            axisLabel: {
              textStyle: {
                color: "#25b098"
              }
            },
            /*改变x轴颜色*/
            axisLine: {
              lineStyle: {
                color: "#333",
                width: 1 //这里是为了突出显示加上的
              }
            }
          }
        ],
        yAxis: [
          {
            name: "游戏机数量(个)",
            axisLine: {
              lineStyle: {
                color: "#0e4866",
                width: 1 //这里是为了突出显示加上的
              }
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            },
            type: "value",
            splitLine: {
              //网格线
              lineStyle: {
                type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
              },
              show: true //隐藏或显示
            }
          }
        ],
        series: [
          {
            name: "游戏总机",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "在线",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "今年新增",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [250, 232, 201, 154, 190, 330, 410]
          }
        ]
      };

      myChart.setOption(option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    //游戏市场份额散点图
    sharesMap() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("sharesMap"));
      // app.title = "单轴散点图";

      var hours = [
        "12a",
        "1a",
        "2a",
        "3a",
        "4a",
        "5a",
        "6a",
        "7a",
        "8a",
        "9a",
        "10a",
        "11a",
        "12p",
        "1p",
        "2p",
        "3p",
        "4p",
        "5p",
        "6p",
        "7p",
        "8p",
        "9p",
        "10p",
        "11p"
      ];
      var days = [
        "Saturday",
        "Friday",
        "Thursday",
        "Wednesday",
        "Tuesday",
        "Monday",
        "Sunday"
      ];

      var data = [
        [0, 0, 5],
        [0, 1, 1],
        [0, 2, 0],
        [0, 3, 0],
        [0, 4, 0],
        [0, 5, 0],
        [0, 6, 0],
        [0, 7, 0],
        [0, 8, 0],
        [0, 9, 0],
        [0, 10, 0],
        [0, 11, 2],
        [0, 12, 4],
        [0, 13, 1],
        [0, 14, 1],
        [0, 15, 3],
        [0, 16, 4],
        [0, 17, 6],
        [0, 18, 4],
        [0, 19, 4],
        [0, 20, 3],
        [0, 21, 3],
        [0, 22, 2],
        [0, 23, 5],
        [1, 0, 7],
        [1, 1, 0],
        [1, 2, 0],
        [1, 3, 0],
        [1, 4, 0],
        [1, 5, 0],
        [1, 6, 0],
        [1, 7, 0],
        [1, 8, 0],
        [1, 9, 0],
        [1, 10, 5],
        [1, 11, 2],
        [1, 12, 2],
        [1, 13, 6],
        [1, 14, 9],
        [1, 15, 11],
        [1, 16, 6],
        [1, 17, 7],
        [1, 18, 8],
        [1, 19, 12],
        [1, 20, 5],
        [1, 21, 5],
        [1, 22, 7],
        [1, 23, 2],
        [2, 0, 1],
        [2, 1, 1],
        [2, 2, 0],
        [2, 3, 0],
        [2, 4, 0],
        [2, 5, 0],
        [2, 6, 0],
        [2, 7, 0],
        [2, 8, 0],
        [2, 9, 0],
        [2, 10, 3],
        [2, 11, 2],
        [2, 12, 1],
        [2, 13, 9],
        [2, 14, 8],
        [2, 15, 10],
        [2, 16, 6],
        [2, 17, 5],
        [2, 18, 5],
        [2, 19, 5],
        [2, 20, 7],
        [2, 21, 4],
        [2, 22, 2],
        [2, 23, 4],
        [3, 0, 7],
        [3, 1, 3],
        [3, 2, 0],
        [3, 3, 0],
        [3, 4, 0],
        [3, 5, 0],
        [3, 6, 0],
        [3, 7, 0],
        [3, 8, 1],
        [3, 9, 0],
        [3, 10, 5],
        [3, 11, 4],
        [3, 12, 7],
        [3, 13, 14],
        [3, 14, 13],
        [3, 15, 12],
        [3, 16, 9],
        [3, 17, 5],
        [3, 18, 5],
        [3, 19, 10],
        [3, 20, 6],
        [3, 21, 4],
        [3, 22, 4],
        [3, 23, 1],
        [4, 0, 1],
        [4, 1, 3],
        [4, 2, 0],
        [4, 3, 0],
        [4, 4, 0],
        [4, 5, 1],
        [4, 6, 0],
        [4, 7, 0],
        [4, 8, 0],
        [4, 9, 2],
        [4, 10, 4],
        [4, 11, 4],
        [4, 12, 2],
        [4, 13, 4],
        [4, 14, 4],
        [4, 15, 14],
        [4, 16, 12],
        [4, 17, 1],
        [4, 18, 8],
        [4, 19, 5],
        [4, 20, 3],
        [4, 21, 7],
        [4, 22, 3],
        [4, 23, 0],
        [5, 0, 2],
        [5, 1, 1],
        [5, 2, 0],
        [5, 3, 3],
        [5, 4, 0],
        [5, 5, 0],
        [5, 6, 0],
        [5, 7, 0],
        [5, 8, 2],
        [5, 9, 0],
        [5, 10, 4],
        [5, 11, 1],
        [5, 12, 5],
        [5, 13, 10],
        [5, 14, 5],
        [5, 15, 7],
        [5, 16, 11],
        [5, 17, 6],
        [5, 18, 0],
        [5, 19, 5],
        [5, 20, 3],
        [5, 21, 4],
        [5, 22, 2],
        [5, 23, 0],
        [6, 0, 1],
        [6, 1, 0],
        [6, 2, 0],
        [6, 3, 0],
        [6, 4, 0],
        [6, 5, 0],
        [6, 6, 0],
        [6, 7, 0],
        [6, 8, 0],
        [6, 9, 0],
        [6, 10, 1],
        [6, 11, 0],
        [6, 12, 2],
        [6, 13, 1],
        [6, 14, 3],
        [6, 15, 4],
        [6, 16, 0],
        [6, 17, 0],
        [6, 18, 0],
        [6, 19, 0],
        [6, 20, 1],
        [6, 21, 2],
        [6, 22, 2],
        [6, 23, 6]
      ];

      let option = {
        tooltip: {
          position: "top"
        },
        title: [],
        singleAxis: [],
        series: []
      };

      echarts.util.each(days, function(day, idx) {
        option.title.push({
          textBaseline: "middle",
          top: ((idx + 0.5) * 100) / 7 + "%",
          text: day
        });
        option.singleAxis.push({
          left: 150,
          type: "category",
          boundaryGap: false,
          data: hours,
          top: (idx * 100) / 7 + 5 + "%",
          height: 100 / 7 - 10 + "%",
          axisLabel: {
            interval: 2
          }
        });
        option.series.push({
          singleAxisIndex: idx,
          coordinateSystem: "singleAxis",
          type: "scatter",
          data: [],
          symbolSize: function(dataItem) {
            return dataItem[1] * 4;
          }
        });
      });

      echarts.util.each(data, function(dataItem) {
        option.series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
      });
      myChart.setOption(option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    //省市日销量监控地图
    dailySalesMap(){
       let this_ = this;
      let myChart = echarts.init(document.getElementById("mianMap"));
      let option ={}
        myChart.setOption(option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });

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
  .title {
    height: 40px;
    color: #fff;
    line-height: 40px;
    background: linear-gradient(to right, #1868a9, #010c1b);
    padding-left: 5px;
  }
  > .left {
    flex: 20%;
    .one {
      border: 1px solid #267ca6;
      border-radius: 3px;
      height: 40%;
      position: relative;
      display: flex;
      flex-direction: column;

      .salesTitle {
        flex: 10%;
        margin-top: 20px;
        color: #1e98df;
        font-size: 18px;
        text-align: center;
      }
      .topSales {
        flex: 60%;
        width: 100%;
      }
      .salesNumber {
        margin-bottom: 50px;
        > div {
          display: flex;
          section {
            font-size: 14px;
            flex: 33.3%;
            text-align: center;
            > p:first-child {
              margin: 10px 10px 10px;
            }
            &:first-child {
              > p:first-child {
                color: #d8777f;
              }
            }
            &:nth-child(2) {
              > p:first-child {
                color: #267ca6;
              }
            }
            &:nth-child(3) {
              > p:first-child {
                color: #25b098;
              }
            }

            > p:last-child {
              color: #fff;
            }
          }
        }
      }
    }
    .bottomGameMachine {
      margin-top: 20px;
      border: 1px solid #267ca6;
      border-radius: 3px;
      height: 40%;
      position: relative;
      display: flex;
      flex-direction: column;

      > .bottomMachine {
        flex: 90%;
      }
    }
  }
  > .center {
    flex: 45%;
    border: 1px solid #267ca6;
    border-radius: 3px;
    margin: 0 20px;
    height: 81.5%;
  }
  > .right {
    flex: 35%;
    .salesRanking {
      width: 100%;
      border: 1px solid #267ca6;
      border-radius: 3px;
      height: 40%;
      position: relative;
      display: flex;
      flex-direction: column;
      .tableData {
        flex: 90%;
      }
    }
    .marketShares {
      margin-top: 20px;
      border: 1px solid #267ca6;
      border-radius: 3px;
      height: 40%;
      position: relative;
      display: flex;
      flex-direction: column;
      .sharesMap {
        flex: 90%;
        background-color: transparent;
      }
    }
  }
}
/deep/ .main-body .el-table td > .cell {
  color: #fff !important;
}
</style>
