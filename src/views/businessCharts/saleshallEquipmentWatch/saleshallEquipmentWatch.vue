<template>
  <div>
    <span class="box-spacing" style="margin:10px 20px 5px">
      区域：
      <el-select v-model="provinceCode" size="small" placeholder="请选择省" @change="getProvince()">
        <el-option
          v-for="item in provinceList"
          :key="item.provinceCode"
          :label="item.areaName"
          :value="item.provinceCode"
        ></el-option>
      </el-select>

      <el-select v-model="cityCode" size="small" placeholder="请选择市" >
        <el-option
          v-for="item in cityList"
          :key="item.cityCode"
          :label="item.cityName"
          :value="item.cityCode"
          @change="getCity()"
        ></el-option>
      </el-select>
      <el-select v-model="poundage" size="small" placeholder="请选择销售厅">
        <el-option
          v-for="item in poundagefee"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </span>
    <span>
      <el-button type="primary" style="margin:10px 20px 5px;float:right" @click>导出</el-button>
    </span>
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
        <el-table-column align="center" prop="date" label="销售厅"></el-table-column>
        <el-table-column align="center" prop="name" label="省份"></el-table-column>
        <el-table-column align="center" prop="date" label="城市"></el-table-column>
        <el-table-column align="center"  label="柜员机">
             <el-table-column prop="address" align="center" label="柜员机数量" ></el-table-column>
            <el-table-column prop="address" align="center" label="柜员机在线数量"></el-table-column>
        </el-table-column>
        <el-table-column align="center"  label="终端机">
             <el-table-column prop="address" align="center" label="终端机数量" ></el-table-column>
            <el-table-column prop="address" align="center" label="终端机在线数量"></el-table-column>
        </el-table-column>       
      </el-table>
      <!-- :page-size="[10,20,30, 50]" -->
      <div class="pagination-container" style="text-align:right;margin-top:30px">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.page"
          :page-sizes="[10,20,30, 50]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
        <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
        </el-pagination>-->
      </div>
    </div>
  </div>
</template>

<script>
import city from "@/libs/map/city.json";
export default {
  name: "Page401",
  data() {
    return {
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
        page: 1,
        limit: 10
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "100"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "100"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "100"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "100"
        },,
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "100"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "100"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "100"
        },,
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "100"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "100"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "100"
        },
      ]
    };
  },
  methods: {
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
    this.showcity();
  }
};
</script>

<style  lang="less" scoped>
.tab-container {
  padding: 20px;
  background-color: #fff;
  margin-top: 10px;
}


.el-select {
  margin-right: 20px; 
}
.box-spacing {
  display: block;
  margin-left: 20px;
  float: left;
}

</style>
