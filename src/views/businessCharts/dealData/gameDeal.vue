<template>
  <div class="vlt-card">
     <section class="comp-item">
      <search-bar
        class="search-bar-demo"
        @search="search"
        :options="searchOptions"
        :total="totalCount"
        labelWidth="40px"
      >
      <control-bar slot="extend-bar" :options="controlOptions" position="right"></control-bar>
      </search-bar>
    </section>
    <div class="tab-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{background:'rgba(240,240,240,.5)'}"
        :cell-style="{align:'center'}"
      >
        <el-table-column align="center" label="序号" width="65">
          <template slot-scope="scope">
            <div style="text-align:center;">{{scope.$index+1}}</div>
          </template>
        </el-table-column>
         <el-table-column align="center" prop="gameName" label="游戏"></el-table-column>
        <el-table-column align="center" prop="terminalName" label="终端"></el-table-column>
        <el-table-column align="center" prop="city" label="城市"></el-table-column>
        <el-table-column align="center" prop="province" label="省份"></el-table-column>
        <el-table-column align="center" prop="hallName" label="销售厅"></el-table-column>
        <el-table-column align="center" prop="saleAmount" label="销售额"></el-table-column>
        <el-table-column align="center" prop="winningAmount" label="中奖金额"></el-table-column>
        <el-table-column align="center" prop="smallAwardAmount" label="小奖中奖"></el-table-column>
        <el-table-column align="center" prop="bigAwardAmount" label="大奖中奖"></el-table-column>
        <el-table-column align="center" prop="grandPrize" label="大奖兑奖"></el-table-column>
      </el-table>
       <table-paging
        style="margin-top:30px"
        :current-page="1"
        :page-size="10"
        :total="totalCount"
        @handleSizeChange="pageSizeChange"
        @handleCurrentChange="pageCurrentChange"
      ></table-paging>
    </div>
  </div>
</template>

<script>
import city from "@/libs/map/city.json";
export default {
  name: "gameDeal",
  data() {
    return {
      totalCount:0,
       searchOptions: [
        {
          type: "select",
          prop: "provinceId",
          value: "",
          title: "区域",
          placeholder: "请选择省",
          options: [
            {
              label: "选项1",
              value: 1
            },
            {
              label: "选项2",
              value: 2
            }
          ]
        },
        {
          type: "select",
          prop: "cityId",
          value: "",
          title: "",
          placeholder: "请选择市",
          options: [
            {
              label: "选项1",
              value: 1
            },
            {
              label: "选项2",
              value: 2
            }
          ]
        },
        {
          type: "select",
          prop: "hallNo",
          value: "",
          title: "",
          placeholder: "请选择销售厅",
          options: [
            {
              label: "选项1",
              value: 1
            },
            {
              label: "选项2",
              value: 2
            }
          ]
        },
        {
          type: "select",
          prop: "terminalId",
          value: "",
          title: "",
          placeholder: "请选择终端",
          options: [
            {
              label: "选项1",
              value: 1
            },
            {
              label: "选项2",
              value: 2
            }
          ]
        },
        {
          type: "select",
          prop: "gameId",
          value: "",
          title: "游戏",
          placeholder: "请选择游戏",
          options: [
            {
              label: "选项1",
              value: 1
            },
            {
              label: "选项2",
              value: 2
            }
          ]
        }
      ],  controlOptions: [
       
        { name: "导出", type: "primary", icon: "download" },
        
      ],
      //记录省市县
      provinceList: [],
      dataprovinceList: [],
      provinceCode: "",

      poundage:[],
      poundagefee:[],
      cityList: [],
      datacityList: [],
      cityCode: "",

      countryList: [],
      datacountryList: [],
      countryCode: "",
      total: null,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        param: {}
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "  1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "  1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "  1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "  1516 弄"
        }
      ]
    };
  },
  methods: {
    //获取中央交易数据列表
    async getGameDeal(options) {
      const self = this;
      const res = await self.$api.getGameDeal({
        data: options,
        baseURL:'http://10.7.0.90:8080/api'
      });
      if (res && res.code == 0) {
        self.tableData = res.data.dataList;
        self.totalCount = res.data.totalRecord;
      }
    },
    pageSizeChange(pageSize) {
      this.listQuery.pageSize=pageSize
      this.getGameDeal(this.listQuery)
    },
    pageCurrentChange(currentPage) {
      this.listQuery.pageNum=currentPage
      this.getGameDeal(this.listQuery)
    },
     search(form) {
      console.log('search', form)
      this.listQuery.param={
        provinceId:form.provinceId,
        cityId:form.cityId,
        hallNo:form.hallNo,
        gameId:form.gameId,
        terminalId:form.terminalId
      }
      this.getGameDeal(this.listQuery)
    },
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/dashboard" });
      } else {
        this.$router.go(-1);
      }
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
    //   this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
    //   this.getList();
    },
    showcity() {
      //let cityArr=JSON.parse(city);
      //console.log(city);
      let _this = this;
      var provinceArr = [];
      var cityArr = [];
      var countryArr = [];
      for (let i = 0; city.length > i; i++) {
        //循环获取省级单位
        for (var key in city[i]) {
          let provinceCode = city[i].areaId;
          let areaName = city[i].areaName;
          var cities = city[i].cities;
          var pro = { provinceCode, areaName };
        }
        //循环获取市级单位
        for (var j = 0; cities.length > j; j++) {
          let cityName = cities[j].areaName;
          let cityCode = cities[j].areaId;
          var counties = cities[j].counties;
          var citiesres = { cityName, cityCode };
          cityArr.push(citiesres);
          //循环获取县级单位
          for (var n = 0; counties.length > n; n++) {
            let countryName = counties[n].areaName;
            let countryCode = counties[n].areaId;
            var countiesres = { countryName, countryCode };
            countryArr.push(countiesres);
          }
          //console.log(countiesres);
        }

        provinceArr.push(pro);
      }
      this.provinceList = provinceArr;
      this.cityList = cityArr;
      this.countryList = countryArr;
      this.dataprovinceList = provinceArr;
      this.datacityList = cityArr;
      this.datacountryList = countryArr;
      //console.log(this.cityList);
      //console.log(this.cityArr);
      //console.log(this.countryList);
    },
    //省和市的联动,根据市/100的整数商进行遍历
    getProvince() {
      let _this = this;
      //console.log(this.provinceCode)
      this.cityList = this.datacityList;
      if (this.provinceCode != 0) {
        let cArray = this.cityList;
        let cArrres = [];
        console.log(cArray);
        for (var i = 0; cArray.length > i; i++) {
          if (parseInt(cArray[i].cityCode / 100) == this.provinceCode) {
            cArrres.push(cArray[i]);
          } else {
          }
        }
        this.cityList = cArrres;
        this.cityCode = this.cityList[0].cityCode;
        //回调自动获取当前选择的县区
       
      }
      console.log(
        "省：" +
          this.provinceCode +
          "市：" +
          this.cityCode +
          "县：" +
          this.countryCode
      );
    }
  },
  mounted() {
    // this.showcity();
  },
  created() {
    this.getGameDeal(this.listQuery);
  },
};
</script>

<style  lang="less" scoped>
</style>
