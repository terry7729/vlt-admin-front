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
                <section class="setTask" @click="open">
                  <p>今年任务</p>
                  <p>{{taskNum}}</p>
                </section>
                <section>
                  <p>今年销售量</p>
                  <p>278242</p>
                </section>
                <section>
                  <p>7月销售量</p>
                  <p>92242</p>
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
                <el-table-column align="center" prop="name" label="销售金额" width="100" fit sortable></el-table-column>
                <el-table-column align="center" prop="name" label="中奖金额" width="100" fit sortable></el-table-column>
                <el-table-column align="center" prop="name" label="兑奖金额" width="100" fit sortable></el-table-column>
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
            value: 3
          }
        ],
        [
          {
            name: "内蒙古",
            value: 5.3
          }
        ],
        [
          {
            name: "吉林",
            value: 6.3
          }
        ],
        [
          {
            name: "辽宁",
            value: 7.3
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
      datas: [
        {
          name: "江苏省",
          value: 2000
        },
        {
          name: "北京市",
          value: 4000
        },
        {
          name: "上海市",
          value: 6000
        },
        {
          name: "重庆市",
          value: 10000
        },
        {
          name: "河北省",
          value: 12000
        },
        {
          name: "河南省",
          value: 13000
        },
        {
          name: "云南省",
          value: 1300
        },
        {
          name: "辽宁省",
          value: 19000
        },
        {
          name: "黑龙江省",
          value: 19000
        },
        {
          name: "湖南省",
          value: 19000
        },
        {
          name: "安徽省",
          value: 14000
        },
        {
          name: "山东省",
          value: 18000
        },
        {
          name: "新疆维吾尔自治区",
          value: 14000
        },
        {
          name: "江苏省",
          value: 18000
        },
        {
          name: "浙江省",
          value: 18000
        },
        {
          name: "江西省",
          value: 14000
        },
        {
          name: "湖北省",
          value: 14000
        },
        {
          name: "广西壮族自治区",
          value: 14000
        },
        {
          name: "甘肃省",
          value: 14000
        },
        {
          name: "山西省",
          value: 14000
        },
        {
          name: "内蒙古自治区",
          value: 14000
        },
        {
          name: "陕西省",
          value: 14000
        },
        {
          name: "吉林省",
          value: 1300
        },
        {
          name: "福建省",
          value: 13000.8
        },
        {
          name: "贵州省",
          value: 13000
        },
        {
          name: "广东省",
          value: 20000
        },
        {
          name: "青海省",
          value: 7000
        },
        {
          name: "西藏自治区",
          value: 4000
        },
        {
          name: "四川省",
          value: 7000
        },
        {
          name: "宁夏回族自治区",
          value: 5000
        },
        {
          name: "海南省",
          value: 12000
        },
        {
          name: "台湾省",
          value: 10000
        },
        {
          name: "香港",
          value: 14000
        },
        {
          name: "澳门",
          value: 14000
        }
      ],
      taskNum: 0,
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
        },
        {
          date: "232323",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "232323",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "232323",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "232323",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "232323",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        ,
        {
          date: "232323",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "232323",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
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
            // radius: "20%",
            detail: { formatter: "{value}%" },
            data: [{ value: 50, name: "ddd" }],
            axisLine: {
              show: true,
              lineStyle: {
                width: 10,
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
            splitLine: {
              length: 15
            },
            title: {
              // 仪表盘标题。
              show: false, // 是否显示标题,默认 true。
              offsetCenter: [0, "30%"], //相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              color: "#33d27a", // 文字的颜色,默认 #333。
              fontSize: 15 // 文字的字体大小,默认 15。
            },
            axisTick: {
              length: 8
            },
            detail: {
              // 仪表盘详情，用于显示数据。
              show: true, // 是否显示详情,默认 true。
              offsetCenter: ["0", "70%"], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              color: "#fff", // 文字的颜色,默认 auto。
              fontSize: 24, // 文字的字体大小,默认 15。
              formatter: "{value}%" // 格式化函数或者字符串
            },
            axisLabel: {
              // 刻度标签。
              show: true, // 是否显示标签,默认 true。
              distance: 5, // 标签与刻度线的距离,默认 5。
              color: "#fff", // 文字的颜色,默认 #fff。
              fontSize: 16, // 文字的字体大小,默认 5。
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
      var fontColor = "#30eee9";
      let option = {
        grid: {
          left: "0%",
          right: "5%",
          top: "20%",
          bottom: "0%",
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: "item"
        },
        legend: {
          show: true,
    
          top: "5%",
          y: "15",
          right:'0',
          icon: "stack",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#1bb4f6"
          },
          data: [ "游戏总机", "在线",  "今年新增"]
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              color: fontColor
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#397cbc"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#195384"
              }
            },
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
           
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "游戏机数量(个)",
            min: 0,
            max: 1000,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#2ad1d2"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#27b4c2"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#11366e"
              }
            }
          },
         
        ],
        series: [
         
          {
            name: "游戏总机",
            type: "line",
            symbol: "circle",
            symbolSize: 8,

            itemStyle: {
              normal: {
                color: "#00d4c7",
                lineStyle: {
                  color: "#00d4c7",
                  width: 1
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(7,44,90,0.3)"
                    },
                    {
                      offset: 1,
                      color: "rgba(0,212,199,0.9)"
                    }
                  ])
                }
              }
            },
            data: [620, 682, 691, 710, 730, 770, 770]
          },
          {
            name: "在线",
            type: "line",
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#aecb56",
                lineStyle: {
                  color: "#aecb56",
                  width: 1
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(7,44,90,0.3)"
                    },
                    {
                      offset: 1,
                      color: "rgba(114,144,89,0.9)"
                    }
                  ])
                }
              }
            },
            data: [550, 632, 601, 654, 690, 580, 610]
          },
      
          {
            name: "今年新增",
            type: "line",
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#6FE81A",
                lineStyle: {
                  color: "#6FE81A",
                  width: 1
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(7,44,90,0.3)"
                    },
                    {
                      offset: 1,
                      color: "rgba(0,212,199,0.9)"
                    }
                  ])
                }
              }
            },
            data: [150, 232, 201, 154, 190, 180, 210]
          },
       
        ]
      };

      myChart.setOption(option);
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    //游戏市场份额
    sharesMap() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById("sharesMap"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["幸运卡片", "侏罗寻宝", "玛雅消除", "美味挑战"],
          textStyle: {
            fontSize: 12, //字体大小
            color: "#ffffff" //字体颜色
          },
          right:'0',
          top:'5%'
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#25b098"
            }
          },
          /*改变x轴颜色*/
          axisLine: {
            lineStyle: {
              color: "#333",
              // width: 1 //这里是为了突出显示加上的
            }
          },
           splitLine: {
              show: true,
              lineStyle: {
                color: "#11366e"
              }
            }
        },
        yAxis: {
          type: "category",
          data: ["广东", "北京", "上海", "浙江", "福建", "台湾", "天津"],
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
          
        },
        series: [
          {
            name: "幸运卡片",
            type: "bar",
            stack: "总量",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#06d3cd",
                barBorderRadius: [20, 20, 20, 20]
              }
            },
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            z: 10,
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: "侏罗寻宝",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#34da62",
                shadowBlur: [0, 0, 0, 10],
                shadowColor: "#34da62",
                barBorderRadius: [20, 20, 20, 20],
                shadowOffsetX: -20
              }
            },
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            z: 6,
            data: [320, 132, 301, 434, 390, 230, 510]
          },
          {
            name: "美味挑战",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#ebe806",
                shadowBlur: [0, 0, 0, 10],
                shadowColor: "#ebe806",
                barBorderRadius: [20, 20, 20, 20],
                shadowOffsetX: -20
              }
            },
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            z: 5,
            data: [220, 132, 201, 134, 190, 230, 210]
          },
          {
            name: "玛雅消除",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                barBorderRadius: [20, 20, 20, 20],
                color: "#ff5624",
                shadowBlur: [0, 0, 0, 10],
                shadowColor: "#ff5624",
                shadowOffsetX: -20
              }
            },
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      };
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
      console.log(series);
      if (!place) {
        var option = {
          tooltip: {
            // trigger: "item",
            // backgroundColor: "rgba(166, 200, 76, 0.82)",
            // borderColor: "#FFFFCC",
            // showDelay: 0,
            // hideDelay: 0,
            // enterable: true,
            // transitionDuration: 0,
            // extraCssText: "z-index:100",
            // formatter: function(params, ticket, callback) {
            //   //根据业务自己拓展要显示的内容
            //   var res = "";
            //   var name = params.name;
            //   var value = params.value[params.seriesIndex + 1];
            //   res =
            //     "<span style='color:#fff;'>" +
            //     name +
            //     "</span><br/>数据：" +
            //     value;
            //   return res;
            // }
            formatter: function(params) {
              return params.name + "：" + params.data["value"];
            }
          },
          // backgroundColor: "#02142c",
          // visualMap: {
          //   type: "continuous",
          //   orient: "horizontal",
          //   itemWidth: 10,
          //   itemHeight: 80,
          //   text: ["高", "低"],
          //   showLabel: true,
          //   seriesIndex: [0],
          //   min: 1000,
          //   max: 20000,
          //   inRange: {
          //     color: ["#02142c", "#FFFD64", "#FF5000"]
          //   },
          //   textStyle: {
          //     color: "#7B93A7"
          //   },
          //   bottom: 30,
          //   left: "left"
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
                // color: "rgba(37, 43, 61, .5)" //悬浮背景
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
                areaColor: "#fff"
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
            name: "mapSer",
            type: "map",
            roam: false,
            geoIndex: 0,
            label: {
              show: false
            },
            data: this.datas
          },
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
      // this.map.hideLoading();
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
    },
    initMap2() {
      var dom = document.getElementById("left_map");
      this.map = echarts.init(dom);
      // this.map.showLoading()

      var option = {
        visualMap: {
          type: "continuous",
          orient: "horizontal",
          itemWidth: 10,
          itemHeight: 80,
          text: ["高", "低"],
          showLabel: true,
          seriesIndex: [0],
          min: 0,
          max: 2,
          inRange: {
            color: ["#6FCF6A", "#FFFD64", "#FF5000"]
          },
          textStyle: {
            color: "#7B93A7"
          },
          bottom: 30,
          left: "left"
        },

        geo: {
          // roam: true,
          map: "china",
          left: "left",
          right: "0",
          top: "20%"
        },
        series: [
          {
            name: "mapSer",
            type: "map",
            roam: false,
            geoIndex: 0,
            label: {
              show: false
            },
            data: this.datas
          }
        ]
      };
      this.map.setOption(option);
    },
    open() {
      this.$prompt("请输入要设置的今年任务数量", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /(^[1-9]\d*$)/,
        inputErrorMessage: "格式不正确"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "设置成功"
          });
          this.taskNum = value;
        })
        .catch(() => {});
    }
  },
  beforeDestroy() {
    //释放资源  清空图例数据，释放内存.
    this.map.clear();
  }
};
</script> 


<style lang="less" scoped>
@import "./less/index.less";
</style>

