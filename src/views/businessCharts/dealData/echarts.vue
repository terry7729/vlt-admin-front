<template>
  <div>
    <div class="content row-flex-start" style="min-width:1500px;ovorflow-x:auto">
      <div class="left_map" id="left_map" @click="showChinaMap"></div>
      <div class="right_opetate row-center" id="right_opetate"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import china from "@/libs/map/json/china.json";
import axios from "axios";
import city  from '@/libs/map/city.json'
axios.defaults.baseURL='http://10.7.0.37'
echarts.registerMap("china", china);
var provinces = [
  "shanghai",
  "hebei",
  "shanxi",
  "neimenggu",
  "liaoning",
  "jilin",
  "heilongjiang",
  "jiangsu",
  "zhejiang",
  "anhui",
  "fujian",
  "jiangxi",
  "shandong",
  "henan",
  "hubei",
  "hunan",
  "guangdong",
  "guangxi",
  "hainan",
  "sichuan",
  "guizhou",
  "yunnan",
  "xizang",
  "shanxi1",
  "gansu",
  "qinghai",
  "ningxia",
  "xinjiang",
  "beijing",
  "tianjin",
  "chongqing",
  "xianggang",
  "aomen",
  "taiwan"
];
var provincesText = [
  "上海",
  "河北",
  "山西",
  "内蒙古自治区",
  "辽宁",
  "吉林",
  "黑龙江",
  "江苏",
  "浙江",
  "安徽",
  "福建",
  "江西",
  "山东",
  "河南",
  "湖北",
  "湖南",
  "广东",
  "广西壮族自治区",
  "海南",
  "四川",
  "贵州",
  "云南",
  "西藏自治区",
  "陕西",
  "甘肃",
  "青海",
  "宁夏回族自治区",
  "新疆维吾尔自治区",
  "北京",
  "天津",
  "重庆",
  "香港特别行政区",
  "澳门特别行政区",
  "台湾"
];

export default {
  data() {
    return {
      allCity:[],
      map: {},
      cityOpt: [],
      mapForm: {},
      mapData: [{ name: "海门", value: 100 }],
      mapOpt: []
    };
  },
  created() {
    // this.cityOpt = cityName;
    this.getAllCity();
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },

  props: {},
  methods: {
    getAllCity() {
      for (let i = 0; city.length > i; i++) {
        for (var key in city[i]) {           
          var cities = city[i].cities;         
        }
         for (var j = 0; cities.length > j; j++) {
            let cityName = cities[j].areaName; 
            this.allCity.push(cityName);
        }
      }
      console.log(this.allCity);
    },
    getMapOpt(place) {
      let option = (option = {
        backgroundColor: "#404a59",
        title: {
          text: "mapDemo",
          subtext: "data from map",
          left: "center"
        },
        geo: {
          map: place ? place : "china",
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#111"
            },
            emphasis: {
              areaColor: "#2a333d"
            }
          }
        }
      });
      return option;
    },
    //显示中国地图
    showChinaMap() {
      let option = this.getMapOpt();
      this.map.setOption(option, true);
    },
    //显示各省地图
    getProvinceMapOpt(provinceAlphabet) {
      console.log(provinceAlphabet)
      axios.get("/statics/" + provinceAlphabet + ".json").then(s => {
        echarts.registerMap(provinceAlphabet, s.data);
        let option = this.getMapOpt(provinceAlphabet);
        this.map.setOption(option, true);
      });
    },
    initMap() {
      var dom = document.getElementById("left_map");
      this.map = echarts.init(dom);
      // console.log(this.map)
      let option = this.getMapOpt();
      // console.log(option)
      if (option && typeof option === "object") {
        this.map.setOption(option, true);
      }
      this.map.on("click", param => {
        
        event.stopPropagation(); // 阻止冒泡
        // 找到省份名
        let provinceIndex = provincesText.findIndex(x => {
          console.log(param.name)
          return param.name === x;
        });
        // console.log(provinceIndex)
        if (provinceIndex === -1) return;
        let provinceAlphabet = provinces[provinceIndex];
        // 重新渲染各省份地图
        this.getProvinceMapOpt(provinceAlphabet);
      });
    }
  },
  computed: {}
};
</script>

<style>
.left_map {
  width: 1200px;
  height: 100%;
}
.right_opetate {
  flex: 1;
  height: 100%;
  background: #404a59;
}
.map_form {
}
.content{
  height: 1000px;
}
.row-flex-start{
  height: 1200px;
  display: flex;
}
</style>
