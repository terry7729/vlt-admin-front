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
        <control-bar slot="extend-bar" :options="controlOptions"></control-bar>
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
        <el-table-column align="center" fixed label="序号" width="65">
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
        <el-table-column label="操作" fixed="right" width="120px" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click.native="detail(scope.row.id)" size="mini">详情</el-button>
            <el-button type="primary" @click.native="edit(scope.row.id)" size="mini">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <section class="comp-item" style="text-align:right;margin-top:30px">
        <table-paging></table-paging>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "warningWatch",
  data() {
    return {
      searchOptions: [
        {
          type: "datetime-range",
          prop: "date4",
          value: "",
          title: "日期时间",
          placeholder: ["开始时间", "结束时间"]
        },
        {
          type: "select",
          prop: "selectName",
          value: "",
          title: "告警类别",
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
          prop: "selectName1",
          value: "",
          title: "时间范围",
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
    //查看页面跳转
    detail(id) {
      this.$router.push({
        name: "warningWatchDetail",
        query: { id }
      });
    },
    edit(id) {
      this.$router.push({
        name: "warningWatchEdit",
        query: { id }
      });
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
      //   this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      //   this.getList();
    }
  },
  mounted() {}
};
</script>

<style  lang="less" scoped>
.control-bar-comp {
  text-align: right;
}
</style>
