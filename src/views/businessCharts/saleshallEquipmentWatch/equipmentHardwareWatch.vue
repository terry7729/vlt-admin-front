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
        :cell-class-name="addClass"
        @cell-click="clicks"
      >
        <el-table-column align="center" label="序号" width="65">
          <template slot-scope="scope">
            <div style="text-align:center;">{{scope.$index+1}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="terminalName" label="终端"></el-table-column>
        <el-table-column align="center" prop="province" label="省份"></el-table-column>
        <el-table-column align="center" prop="city" label="城市"></el-table-column>
        <el-table-column align="center" prop="hallName" label="销售厅"></el-table-column>
        <el-table-column align="center" prop="disk" label="磁盘使用"></el-table-column>
        <el-table-column align="center" prop="cpu" label="CPU使用"></el-table-column>
        <el-table-column align="center" prop="memory" label="系统内存使用"></el-table-column>
        <el-table-column align="center" prop="networkFlux" label="网络流量"></el-table-column>
        <el-table-column align="center" prop="terminalStatus" label="终端状态">
          <template slot-scope="scope">
            <span v-if="scope.row.terminalStatus === 0">在线</span>
            <span v-if="scope.row.terminalStatus === 1">离线</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="peripheralStatus"
          label="外设状态"
          class-name="peripheralStatus"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.terminalStatus === 0">正常</span>
            <span v-if="scope.row.terminalStatus === 1">异常</span>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="外设状态" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="terminalName" label="终端机"></el-table-column>
          <el-table-column property="cardReaderStatus" label="读卡器">
            <template slot-scope="scope">
              <span v-if="scope.row.cardReaderStatus===0">正常</span>
              <span v-if="scope.row.cardReaderStatus===1">异常</span>
            </template>
          </el-table-column>
          <el-table-column property="keyboardStatus" label="键盘状态">
            <template slot-scope="scope">
              <span v-if="scope.row.keyboardStatus===0">正常</span>
              <span v-if="scope.row.keyboardStatus===1">异常</span>
            </template>
          </el-table-column>

          <el-table-column property="soundboxStatus" label="音响状态">
            <template slot-scope="scope">
              <span v-if="scope.row.soundboxStatus===0">正常</span>
              <span v-if="scope.row.soundboxStatus===1">异常</span>
            </template>
          </el-table-column>

          <el-table-column property="infraredStatus" label="红外设备状态">
            <template slot-scope="scope">
              <span v-if="scope.row.infraredStatus===0">正常</span>
              <span v-if="scope.row.infraredStatus===1">异常</span>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <div class="pagination-container" style="text-align:right;margin-top:30px">
        <section class="comp-item">
          <table-paging
            :current-page="1"
            :page-size="10"
            :total="totalCount"
            @handleSizeChange="pageSizeChange"
            @handleCurrentChange="pageCurrentChange"
          ></table-paging>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import city from "@/libs/map/city.json";
export default {
  name: "saleshallEquipmentWatch",
  data() {
    return {
      gridData: [],
      dialogTableVisible: false,
      totalCount: 0,
      searchOptions: [
        {
          type: "select",
          prop: "province",
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
          prop: "selectNam1",
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
          prop: "selectName2",
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
        },
        ,
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
        ,
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
        }
      ]
    };
  },
  methods: {
    clicks(row, column, cell, event) {
      this.gridData = [];
      if (column.label == "外设状态") {
        this.dialogTableVisible = true;
        this.gridData.push(row.allPeripheralStatus);
      }
    },
    addClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 10) {
        return "cell-blue";
      }
    },
    //销售厅设备硬件信息列表
    async getHallEqHardware() {
      const self = this;
      const res = await self.$api.getHallEqHardware({
        data: {
          pageNum: self.listQuery.page,
          pageSize: self.listQuery.limit
        }
      });
      if (res && res.code == 0) {
        self.tableData = res.data.data.dataList;
        self.totalCount = res.data.data.totalRecord;
      }
    },
    pageSizeChange(pageSize) {
      this.listQuery.limit = pageSize;
      this.getHallEqHardware();
    },
    pageCurrentChange(currentPage) {
      this.listQuery.page = currentPage;
      this.getHallEqHardware();
    },
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/dashboard" });
      } else {
        this.$router.go(-1);
      }
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
    },
    search(form) {
      console.log("search", form);
    }
  },

  mounted() {
    // this.showcity();
  },
  created() {
    this.getHallEqHardware();
  }
};
</script>

<style  lang="less" scoped>
.control-bar-comp {
  text-align: right;
}
.main-body .el-table {
  /deep/ td.peripheralStatus > .cell {
    color: blue;
    cursor: pointer;
  }
}
/deep/ .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}
/deep/ .el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
</style>
