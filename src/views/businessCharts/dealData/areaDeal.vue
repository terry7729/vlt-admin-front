<template>
  <div class="vlt-card">
    <section class="comp-item">
      <search-bar
        class="search-bar-demo"
        @search="search"
        :options="searchOptions"
        :total="totalCount"
        labelWidth="80px"
      >
        <control-bar slot="extend-bar" :options="controlOptions" position="right"></control-bar>
      </search-bar>
    </section>
    <div class>
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
        <el-table-column align="center" prop="terminalName" label="终端"></el-table-column>
        <el-table-column align="center" prop="cityName" label="城市"></el-table-column>
        <el-table-column align="center" prop="provinceName" label="省份"></el-table-column>
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
  name: "areaDeal",
  data() {
    return {
      totalCount: 0,
      searchOptions: [
        {
          type: "select",
          prop: "provinceId",
          value: "",
          title: "省份",
          placeholder: "请选择",
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
          title: "城市",
          placeholder: "请选择",
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
          title: "销售厅",
          placeholder: "请选择",
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
      ],
      controlOptions: [{ name: "导出", type: "primary", icon: "download" }],
      //记录省市县
      provinceList: [],
      dataprovinceList: [],
      provinceCode: "",

      poundage: [],
      poundagefee: [],
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
    async getAreaDeal(options) {
      const self = this;
      const res = await self.$api.getAreaDeal({
        data:options,
        baseURL:'http://10.6.0.203:8086/api'
      });
      if (res && res.code == 0) {
        self.tableData = res.data.dataList;
        self.totalCount = res.data.totalRecord;
      }
    },
    pageSizeChange(pageSize) {
      this.listQuery.pageSize = pageSize;
      this.getAreaDeal(this.listQuery);
    },
    pageCurrentChange(currentPage) {
      this.listQuery.pageNum = currentPage;
      this.getAreaDeal(this.listQuery);
    },
    search(form) {
      console.log("search", form);
      this.listQuery.param={
        provinceId:form.provinceId,
        cityId:form.cityId,
        hallNo:form.hallNo
      }
      this.getAreaDeal(this.listQuery)
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
          let value = city[i].areaId;
          let label = city[i].areaName;
          var cities = city[i].cities;
          var pro = { label, value };
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
      console.log(provinceArr);
      this.searchOptions.forEach(v => {
        if (v.prop === "province") {
          v.options = provinceArr;
        }
      });
      this.cityList = cityArr;
      this.countryList = countryArr;
      this.dataprovinceList = provinceArr;
      this.datacityList = cityArr;
      this.datacountryList = countryArr;
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
    this.getAreaDeal(this.listQuery);
    // this.showcity();
  }
};
</script>

<style  lang="less" scoped>
</style>
