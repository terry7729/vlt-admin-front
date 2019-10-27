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
      >
        <el-table-column align="center" fixed label="序号" width="65">
          <template slot-scope="scope">
            <div style="text-align:center;">{{scope.$index+1}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="source" label="告警源"></el-table-column>
        <el-table-column align="center" prop="describe" label="描述"></el-table-column>
        <el-table-column align="center" prop="alarmLevel" label="警报等级">
          <template slot-scope="scope">
            <span v-if="scope.row.alarmLevel==0">普通</span>
            <span v-if="scope.row.alarmLevel==1">严重</span>
            <span v-if="scope.row.alarmLevel==2">重大</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="alarmCount" label="告警次数"></el-table-column>
        <el-table-column align="center" prop="lastAlarmTime" label="最新时间"></el-table-column>
        <el-table-column align="center" prop="alarmDuration" label="告警历时"></el-table-column>
        <el-table-column align="center" prop="notificationStatus" label="通知状态">
          <template slot-scope="scope">
            <span v-if="scope.row.notificationStatus==0">未通知</span>
            <span v-if="scope.row.notificationStatus==1">已通知</span>
            <span v-if="scope.row.notificationStatus==2">通知失败</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="processingStatus" label="处理状态">
          <template slot-scope="scope">
            <span v-if="scope.row.processingStatus==0">未处理</span>
            <span v-if="scope.row.processingStatus==1">处理中</span>
            <span v-if="scope.row.processingStatus==2">已处理</span>
          </template>

        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120px" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click.native="detail(scope.row.id)" size="mini">详情</el-button>
            <el-button type="primary" @click.native="edit(scope.row.id)" size="mini">编辑</el-button>
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
import moment  from 'moment'
export default {
  name: "warningWatch",
  data() {
    return {
      totalCount:0,
      searchOptions: [
        {
          type: "datetime-range",
          prop: "timeList",
          value: "",
          title: "日期时间",
          placeholder: ["开始时间", "结束时间"]
        },
        {
          type: "select",
          prop: "alarmLevel",
          value: "",
          title: "告警类别",
          placeholder: "请选择",
          options: [
            {
              label: "普通",
              value: 0
            },
            {
              label: "严重",
              value: 1
            },
            {
              label: "重大",
              value: 2
            }
          ]
        },
        {
          type: "select",
          prop: "timeRange",
          value: "",
          title: "时间范围",
          placeholder: "请选择",
          options: [
            {
              label: "1天",
              value: 1
            },
            {
              label: "2天",
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
        limit: 10,
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
    async getWarniingList(options) {
      let data = JSON.parse(JSON.stringify(options));
      let res = await this.$api.getWarniingList({
        data
      });
      // console.log("data", result);
      if(res && res.code==0){
        console.log(res)
        this.tableData=res.data.records
        this.totalCount=res.data.total;
      }
    },
    pageSizeChange(pageSize) {
      this.listQuery.limit=pageSize
      this.getWarniingList(this.listQuery)
    },
    pageCurrentChange(currentPage) {
      this.listQuery.page=currentPage
      this.getWarniingList(this.listQuery)
    },
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
      // console.log("search", form);
      this.listQuery.param = {
        alarmLevel: form.alarmLevel,
        timeRange: form.timeRange,
        warningTimeStart:form.timeList? moment(form.timeList[0]).format("YYYY-MM-DD HH:mm:ss"):'',
        warningTimeEnd:form.timeList? moment(form.timeList[1]).format("YYYY-MM-DD HH:mm:ss"):''
      };
      this.getWarniingList(this.listQuery);
    },
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/dashboard" });
      } else {
        this.$router.go(-1);
      }
    },
  },
  mounted() {
    this.getWarniingList(this.listQuery)
  }
};
</script>

<style  lang="less" scoped>
</style>
