<template>
  <div class="vlt-card">
    <section class="comp-item">
      <search-bar
        class="search-bar-demo"
        @search="search"
        :options="searchOptions"
        :total="999"
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
        <el-table-column align="center" prop="date" label="省份"></el-table-column>
        <el-table-column align="center" prop="date" label="城市"></el-table-column>
        <el-table-column align="center" prop="date" label="最高销量"></el-table-column>
        <el-table-column align="center" prop="name" label="最低销量"></el-table-column>
        <el-table-column align="center" prop="name" label="最低在线数量"></el-table-column>
        <el-table-column align="center" prop="name" label="最低开机律"></el-table-column>
        <el-table-column align="center" prop="name" label="最低单厅销量"></el-table-column>
        <el-table-column align="center" prop="address" label="状态"></el-table-column>
        <el-table-column label="操作" fixed="right" width="220px" fit align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click size="small">审核</el-button>
            <el-button type="primary" @click size="small">修改</el-button>
            <el-button type="primary" @click size="small">删除</el-button>
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
      searchOptions: [
        {
          type: "select",
          prop: "province",
          value: "",
          title: "区域",
          placeholder: "请选择省份",
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
          prop: "province",
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
        }
      ],
      controlOptions: [
        { name: "新增", type: "primary", icon: "plus" }, // type为按钮的五种颜色， icon为具体的图标
        { name: "批量删除", type: "", icon: "delete" },
        { name: "批量修改", type: "", icon: "edit" }
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
        page: 1,
        limit: 10
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
    pageSizeChange(pageSize) {
      console.log("每页条数：", pageSize);
    },
    pageCurrentChange(currentPage) {
      console.log("当前页：", currentPage);
    },
    search(form) {
      console.log("search", form);
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
      // this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      // this.getList();
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
    }
  },
  mounted() {
    // this.showcity();
  }
};
</script>

<style  lang="less" scoped>
.control-bar-comp {
  text-align: right;
}
</style>
