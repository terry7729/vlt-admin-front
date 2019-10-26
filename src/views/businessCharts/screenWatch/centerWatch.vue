<template>
  <div class="centerWatch">
    <main>
      <section class="left">
        <div>
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
        </div>
      </section>
      <section class="center">
        <div>
          <div class="left_map" id="left_map" @click></div>
          <div class="top5">
            <span>全国销售top5</span>
            <p v-for="itme in 5">
              <span>浙江:</span>
              <span>13555元</span>
            </p>
          </div>
          <div class="salesNum">
            <div class="title">全国大厅数量</div>
            <div>全部大厅222</div>
            <div>合作厅111</div>
            <div>销售厅111</div>
          </div>
        </div>
      </section>
      <section class="right">
        <div>
          <div class="salesRanking">
            <div class="title">全国大厅销量排名</div>
            <div class="tableData" id="tableData">
              <el-table
                :data="tableData"
                :default-sort="{prop: 'date', order: 'descending'}"
                :cell-style="tableRowStyle"
                :header-cell-style="tableHeaderColor"
              >
                >
                <el-table-column align="center" prop="date" label="大厅编号" fit></el-table-column>
                <el-table-column align="center" prop="name" label="所属省份" fit></el-table-column>
                <el-table-column align="center" prop="name" label="销售金额" fit sortable></el-table-column>
                <el-table-column align="center" prop="name" label="中奖金额" fit sortable></el-table-column>
                <el-table-column align="center" prop="name" label="兑奖金额" fit sortable></el-table-column>
                <el-table-column align="center" prop="name" label="状态" fit></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="marketShares">
            <div class="title">全国游戏市场份额</div>
            <div class="sharesMap" id="sharesMap"></div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import echarts from "echarts";
import china from "@/libs/map/cnMapJson/china.json";
export default {
  name: "name",
  data() {
    return {
      chinaGeoCoordMap: {
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        吉林: [125.8154, 44.2584],
        北京市: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11, 29.97],
        四川: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        江苏: [118.8062, 31.9208],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        上海: [121.4648, 31.2891]
      },
      chinaDatas: [
        [
          {
            name: "黑龙江",
            value: 33
          }
        ],
        [
          {
            name: "内蒙古",
            value: 12222
          }
        ],
        [
          {
            name: "吉林",
            value: 0
          }
        ],
        [
          {
            name: "辽宁",
            value: 0
          }
        ],
        [
          {
            name: "河北",
            value: 0
          }
        ],
        [
          {
            name: "天津",
            value: 0
          }
        ],
        [
          {
            name: "山西",
            value: 0
          }
        ],
        [
          {
            name: "陕西",
            value: 0
          }
        ],
        [
          {
            name: "甘肃",
            value: 0
          }
        ],
        [
          {
            name: "宁夏",
            value: 0
          }
        ],
        [
          {
            name: "青海",
            value: 0
          }
        ],
        [
          {
            name: "新疆",
            value: 0
          }
        ],
        [
          {
            name: "西藏",
            value: 0
          }
        ],
        [
          {
            name: "四川",
            value: 0
          }
        ],
        [
          {
            name: "重庆",
            value: 0
          }
        ],
        [
          {
            name: "山东",
            value: 0
          }
        ],
        [
          {
            name: "河南",
            value: 0
          }
        ],
        [
          {
            name: "江苏",
            value: 0
          }
        ],
        [
          {
            name: "安徽",
            value: 0
          }
        ],
        [
          {
            name: "湖北",
            value: 0
          }
        ],
        [
          {
            name: "浙江",
            value: 0
          }
        ],
        [
          {
            name: "福建",
            value: 0
          }
        ],
        [
          {
            name: "江西",
            value: 0
          }
        ],
        [
          {
            name: "湖南",
            value: 0
          }
        ],
        [
          {
            name: "贵州",
            value: 0
          }
        ],
        [
          {
            name: "广西",
            value: 0
          }
        ],
        [
          {
            name: "海南",
            value: 0
          }
        ],
        [
          {
            name: "上海",
            value: 1
          }
        ]
      ],
      allCity: [],
      map: {},
      cityOpt: [],
      mapForm: {},
      mapData: [{ name: "海门", value: 100 }],
      mapOpt: [],
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
    echarts.registerMap("china", china);
    this.salesMap();
    this.machineMap();
    this.sharesMap();
    // // this.dailySalesMap();

    this.$nextTick(() => {
      this.initMap1();
      // this.initMap();
    });
    // this.ddd()
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
            // name: "业务指标",
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
        ],
        legend: {
          top: "0"
        }
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
          top: "0",
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
        "北京",
        "天津",
        "河北",
        "湖南",
        "湖北",
        "广东",
        "四川",
        "重庆",
        "江西",
        "江苏",
        "上海"
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
    dailySalesMap() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("mianMap"));
      let option = {};
      myChart.setOption(option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    getMapOpt(series, place) {
      if (!place) {
        var option = {
          tooltip: {
            trigger: "item",
            backgroundColor: "rgba(166, 200, 76, 0.82)",
            borderColor: "#FFFFCC",
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: "z-index:100",
            formatter: function(params, ticket, callback) {
              //根据业务自己拓展要显示的内容
              var res = "";
              var name = params.name;
              var value = params.value[params.seriesIndex + 1];
              res =
                "<span style='color:#fff;'>" +
                name +
                "</span><br/>数据：" +
                value;
              return res;
            }
          },
          backgroundColor: "#02142c",
          // visualMap: {
          //   //图例值控制
          //   min: 0,
          //   max: 1,
          //   calculable: true,
          //   show: true,
          //   color: ["#f44336", "#fc9700", "#ffde00", "#ffde00", "#00eaff"],
          //   textStyle: {
          //     color: "#fff"
          //   }
          // },
          geo: {
            map: "china",
            zoom: 1.2,
            label: {
              emphasis: {
                show: false
              }
            },
            roam: false, //是否允许缩放
            itemStyle: {
              normal: {
                color: "#02142c", //地图背景色
                borderColor: "#32b1d4", //省市边界线00fcff 516a89
                borderWidth: 1
              },
              emphasis: {
                color: "rgba(37, 43, 61, .5)" //悬浮背景
              }
            },
            top: "30%"
          },
          series: series
        };
      } else {
        var option = (option = {
          backgroundColor: "#02142c",
          title: {
            text: place ? place : "中国地图",
            // subtext: "data from map",
            left: "center",
            top: "50",
            textStyle: {
              //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              fontSize: 18,
              fontStyle: "normal",
              fontWeight: "normal",
              color: "#fff"
            }
          },
          geo: {
            map: place ? place : "china",
            label: {
              emphasis: {
                show: false
              }
            },
            roam: false,
            itemStyle: {
              normal: {
                areaColor: "#02142c",
                borderColor: "#32b1d4"
              },
              emphasis: {
                areaColor: "gold"
              }
            },
            top: "30%"
          }
        });
      }

      return option;
    },
    // getMapOpt1(series) {

    //   return option;
    // },
    //显示中国地图
    showChinaMap() {
      let option = this.getMapOpt();
      this.map.setOption(option, true);
    },
    //显示各省地图
    async getProvinceMapOpt(name) {
      const result = await import("@/libs/map/cnMapJson/" + name + ".json");
      // let geoJson = result.default
      // console.log(result.default);
      // axios.get("/statics/" + provinceAlphabet + ".json").then(s => {
      echarts.registerMap(name, result.default);
      let option = this.getMapOpt("", name);
      this.map.setOption(option, true);
      // });
    },

    initMap1() {
      var dom = document.getElementById("left_map");
      this.map = echarts.init(dom);
      // this.map.showLoading()
      var series = [];
      [["北京市", this.chinaDatas]].forEach((item, i) => {
        var res = this.convertData(item[1]);
        series.push(
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 3, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 5, //图标大小
              color: "#0ff"
            },
            lineStyle: {
              normal: {
                width: 1, //尾迹线条宽度
                opacity: 1, //尾迹线条透明度
                curveness: 0.3, //尾迹线条曲直度
                color: "#0ff"
              }
            },
            data: res
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: "stroke", //波纹绘制方式 stroke, fill
              scale: 4 //波纹圆环最大限制，值越大波纹越大
              // color:'#fff'
            },
            label: {
              normal: {
                show: true,
                position: "right", //显示位置
                offset: [5, 0], //偏移设置
                formatter: function(params) {
                  //圆环显示文字
                  return params.data.name;
                },
                fontSize: 13
              },
              emphasis: {
                show: true
              }
            },
            symbol: "circle",
            symbolSize: function(val) {
              return 5 + val[2] * 0.0005; //圆环大小
            },
            itemStyle: {
              normal: {
                show: false,
                color: "#0ff"
              }
            },
            data: item[1].map(dataItem => {
              return {
                name: dataItem[0].name,
                value: this.chinaGeoCoordMap[dataItem[0].name].concat([
                  dataItem[0].value
                ])
              };
            })
          },
          //被攻击点
          {
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              period: 4,
              brushType: "stroke",
              scale: 4
            },
            label: {
              normal: {
                show: true,
                position: "right",
                //offset:[5, 0],
                color: "#0f0",
                formatter: "{b}",
                textStyle: {
                  color: "#0ff"
                }
              },
              emphasis: {
                show: false,
                color: "#f60"
              }
            },
            symbol: "pin",
            symbolSize: 30,
            data: [
              {
                name: item[0],
                value: this.chinaGeoCoordMap[item[0]].concat([10])
              }
            ]
          }
        );
      });
      let option = this.getMapOpt(series);
      this.map.hideLoading();
      this.map.setOption(option, true);
      if (option && typeof option === "object") {
        this.map.setOption(option, true);
      }
      this.map.on("click", param => {
        event.stopPropagation(); // 阻止冒泡
        // 找到省份名
        // let provinceIndex = provincesText.findIndex(x => {

        //   return param.name === x;
        // });
        // if (provinceIndex === -1) return;
        // let provinceAlphabet = provinces[provinceIndex];
        // 重新渲染各省份地图
        this.getProvinceMapOpt(param.name);
      });
    },
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = this.chinaGeoCoordMap[dataItem[0].name];
        var toCoord = [116.4551, 40.2539];
        if (fromCoord && toCoord) {
          res.push([
            {
              coord: fromCoord,
              value: dataItem[0].value
            },
            {
              coord: toCoord
            }
          ]);
        }
      }
      console.log(res);
      return res;
    }
  },
  beforeDestroy() {
    //释放资源  清空图例数据，释放内存.
    this.map.clear();
  }
};
</script> 


<style lang="less" scoped>
@import './less/index.less';
</style>

