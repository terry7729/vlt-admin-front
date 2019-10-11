<template>
  <div>
    <span class="box-spacing" style="margin:10px 20px 5px">
      告警时间：
      <el-date-picker
        v-model="value"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        class="timer"
        size='small'
      ></el-date-picker>
      告警类别:
      <el-select v-model="poundage" size="small" placeholder="请选择告警类别">
        <el-option
          v-for="item in poundagefee"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      时间范围：
      <el-select v-model="poundage" size="small" placeholder="请选择时间范围">
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
        <el-table-column align="center" prop="date" label="告警源"></el-table-column>
        <el-table-column align="center" prop="date" label="描述"></el-table-column>
        <el-table-column align="center" prop="name" label="警报等级"></el-table-column>
        <el-table-column align="center" prop="address" label="告警次数"></el-table-column>
        <el-table-column align="center" prop="address" label="最新时间"></el-table-column>
        <el-table-column align="center" prop="address" label="告警历时"></el-table-column>
        <el-table-column align="center" prop="address" label="通知状态"></el-table-column>
        <el-table-column align="center" prop="address" label="处理状态"></el-table-column>
         <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary"  @click size='mini'>详情</el-button>
          <el-button type="primary"  @click size='mini'>编辑</el-button>
          </template>
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
export default {
  name: "Page401",
  data() {
    return {
      value: "",
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
  },
  mounted() {
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
//   display: block;
  margin-left: 20px;
  float: left;
//   width: 100%;
}
.timer {
//   display: inline-block;
  margin-right: 20px;
}
</style>
