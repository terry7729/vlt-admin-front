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
        <control-bar
          slot="extend-bar"
          :options="controlOptions"
          @select="select"
          @click.native
          position="right"
        ></control-bar>
      </search-bar>
    </section>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{background:'rgba(240,240,240,.5)'}"
        :cell-style="{align:'center'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="provinceName" label="省份"></el-table-column>
        <el-table-column align="center" prop="cityName" label="城市"></el-table-column>
        <el-table-column align="center" prop="highestSalesMoneyOrdinary" label="最高销量"></el-table-column>
        <el-table-column align="center" prop="minimumSalesMoneyOrdinary" label="最低销量"></el-table-column>
        <el-table-column align="center" prop="minimumOnlineCountsOrdinary" label="最低在线数量"></el-table-column>
        <el-table-column align="center" prop="minimumOperatingRateOrdinary" label="最低开机律"></el-table-column>
        <el-table-column align="center" prop="minimumHallSaleMoneyOrdinary" label="最低单厅销量"></el-table-column>
        <el-table-column align="center" prop="updatedTime" label="更新时间"></el-table-column>
        <el-table-column align="center" prop="collectStatus" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.collectStatus===0">生效</span>
            <span v-if="scope.row.collectStatus===1">停止</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="240px">
          <template slot-scope="scope">
            <el-button type="primary" @click.native="detail(scope.row)" size="mini">详情</el-button>
            <el-button type="primary" @click.native="update(scope.row)" size="mini">修改</el-button>
            <el-button type="primary" @click.native="deleteInfo(scope.row)" size="mini">删除</el-button>
          </template>
        </el-table-column>
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
              label: "广东",
              value: 1
            },
            {
              label: "广西",
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
              label: "深圳",
              value: 3
            },
            {
              label: "广州",
              value: 4
            }
          ]
        }
      ],
      controlOptions: [
        { name: "新增", type: "primary", icon: "plus" } // type为按钮的五种颜色， icon为具体的图标
      ],
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
    async getCityRiskList(options) {
      let res = await this.$api.getCityRiskList({
        data:options,        
      });
      if (res && res.code == 0) {
        this.tableData = res.data.records;
        this.totalCount = res.total;
      }
    },
    pageSizeChange(pageSize) {
      this.listQuery.limit = pageSize;
      this.getCityRiskList(this.listQuery);
    },
    pageCurrentChange(currentPage) {
      this.listQuery.pageNum = currentPage;
      this.getCityRiskList(this.listQuery);
    },
    search(form) {
      console.log("search", form);
      this.listQuery.param = {
        provinceId: form.provinceId,
        cityId: form.cityId
      };
      this.getCityRiskList(this.listQuery)
    },
    deleteInfo(row) {
      this.$confirm(`确定要删除这条数据吗? `, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.cityRiskDelete(row.businessKey);
        })
        .catch(() => {});
    },

    async cityRiskDelete(id) {
      const res = await this.$api.cityRiskDelete({
        data: {
          businessKey: id
        }
      });
      if (res && res.code == 0) {        
        this.getCityRiskList(this.listQuery);
      } 
    },
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/dashboard" });
      } else {
        this.$router.go(-1);
      }
    },
    detail(row) {
      this.$router.push({
        name: "cityRiskDetail",
        query: {
          id: row.businessKey
        }
      });
    },
    showcity() {
      //let cityArr=JSON.parse(city);
      //console.log(city);
      let _this = this;
      var provinceArr = [];
      var cityArr = [];
      var countryArr = [];
      // console.log(city)
      for (let i = 0; city.length > i; i++) {
        //循环获取省级单位
        for (var key in city[i]) {
          let value = city[i].areaId;
          let label = city[i].areaName;
          var cities = city[i].cities;
          var pro = { label, value };
        }
        //循环获取市级单位
        if (cities.length) {
          for (var j = 0; cities.length > j; j++) {
            let cityName = cities[j].areaName;
            let cityCode = cities[j].areaId;
            var counties = cities[j].counties;
            var citiesres = { cityName, cityCode };
            cityArr.push(citiesres);
          }

          //循环获取县级单位
          // for (var n = 0; counties.length > n; n++) {
          //   let countryName = counties[n].areaName;
          //   let countryCode = counties[n].areaId;
          //   var countiesres = { countryName, countryCode };
          //   countryArr.push(countiesres);
          // }
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
      //console.log(this.cityList);
      //console.log(this.cityArr);
      //console.log(this.countryList);
    },
    //省和市的联动,根据市/100的整数商进行遍历
    // getProvince() {
    //   let _this = this;
    //   //console.log(this.provinceCode)
    //   this.cityList = this.datacityList;
    //   if (this.provinceCode != 0) {
    //     let cArray = this.cityList;
    //     let cArrres = [];
    //     console.log(cArray);
    //     for (var i = 0; cArray.length > i; i++) {
    //       if (parseInt(cArray[i].cityCode / 100) == this.provinceCode) {
    //         cArrres.push(cArray[i]);
    //       } else {
    //       }
    //     }
    //     this.cityList = cArrres;
    //     this.cityCode = this.cityList[0].cityCode;
    //     //回调自动获取当前选择的县区
    //   }
    //   console.log(
    //     "省：" +
    //       this.provinceCode +
    //       "市：" +
    //       this.cityCode +
    //       "县：" +
    //       this.countryCode
    //   );
    // },
    select(val) {
      console.log(val);
      if (val.name == "新增") {
        this.goToAdd();
      }
    },
    goToAdd() {
      this.$router.push({
        name: "cityRiskAdd"
      });
    },
    update(row) {
      this.$router.push({
        name: "cityRiskEdit",
        query: {
          id: row.businessKey
        }
      });
    }
  },
  created() {
    this.getCityRiskList(this.listQuery);
  },
  mounted() {}
};
</script>

<style  lang="less" scoped>
</style>
