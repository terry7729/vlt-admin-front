<!-- 首页 - 概况 - 待审核 -->

<template>
  <div class="vlt-card pending-review">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    >
      <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions" position="left"></control-bar>
    </search-bar>
    <el-table :data="tableData" style="width: 100%" border class="table-box">
      <el-table-column prop="id" label="序号" width="60"></el-table-column>
      <el-table-column prop="title" label="业务标题" ></el-table-column>
      <el-table-column prop="type" label="业务类型" ></el-table-column>
      <el-table-column prop="date" label="申请时间" ></el-table-column>
      <el-table-column prop="date" label="截止时间"></el-table-column>
      <el-table-column prop="name" label="申请人"></el-table-column>
      <el-table-column prop="process" label="当前步骤"></el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row)">处理</el-button>
          <el-button size="mini" @click="moveRow(scope.row)">移交</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-paging
      position="right"
      :total="999"
      :currentPage="1"
      :pageSize="10"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></table-paging>
  </div>
</template>
<script>
export default {
  name: "pendingReview",
  data() {
    return {
      // 搜索组件配置
      searchOptions: [
        {
          type: "input",
          prop: "inputName",
          value: "",
          title: "业务标题：",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "selectName",
          value: "",
          title: "业务类型：",
          placeholder: "请选择",
          options: [
            {
              label: "类型1",
              value: 1
            },
            {
              label: "类型2",
              value: 2
            }
          ]
        },
        {
          type: "datepicker-range",
          prop: "date2",
          value: "",
          title: "申请日期：",
          placeholder: ["开始日期", "结束日期"]
        }
      ],
      controlOptions: [
        { name: "打印", type: "primary", icon: "printer" },
        { name: "导出", type: "danger", icon: "download" }
      ],
      tableData: [
        {
          id: 0,
          title: "【6000000】建厅申请",
          date: "2016-05-02",
          name: "王小虎",
          process: "地市审批",
          type: "建厅申请"
        },
        {
          id: 1,
          date: "2016-05-04",
          title: "【6000000】建厅申请",
          name: "王小虎",
          process: "地市审批",
          type: "建厅申请"
        },
        {
          id: 2,
          date: "2016-05-01",
          title: "【6000000】建厅申请",
          name: "王小虎",
          process: "地市审批",
          type: "建厅申请"
        },
        {
          id: 3,
          date: "2016-05-03",
          title: "【6000000】建厅申请",
          name: "王小虎",
          process: "地市审批",
          type: "建厅申请"
        },
        {
          id: 4,
          title: "【6000000】建厅申请",
          date: "2016-05-02",
          name: "王小虎",
          process: "地市审批",
          type: "建厅申请"
        },
        {
          id: 5,
          date: "2016-05-04",
          title: "【6000000】建厅申请",
          name: "王小虎",
          process: "地市审批",
          type: "建厅申请"
        },
        {
          id: 6,
          date: "2016-05-01",
          title: "【6000000】建厅申请",
          name: "王小虎",
          process: "地市审批",
          type: "建厅申请"
        },
        {
          id: 7,
          date: "2016-05-03",
          title: "【6000000】建厅申请",
          name: "王小虎",
          process: "地市审批",
          type: "建厅申请"
        },
        {
          id: 8,
          title: "【6000000】建厅申请",
          date: "2016-05-02",
          name: "王小虎",
          process: "地市审批",
          type: "建厅申请"
        },
        {
          id: 9,
          date: "2016-05-04",
          title: "【6000000】建厅申请",
          name: "王小虎",
          process: "地市审批",
          type: "建厅申请"
        }
      ]
      // currentPage: 1
    };
  },
  methods: {
    search(form) {
      console.log("search", form);
    },
    selectBtn() {
      console.log("selectBtn");
    },
    edit(row) {
      const self = this;
      console.log(row);
      this.$router.push({
        name: "pendingReviewEdit",
        query: { id: row.id }
      });
    },
    moveRow(row) {
      const self = this;
      this.$router.push({
        name: "pendingReviewTransfer"
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  components: {}
};
</script>

<style lang="less">
.pending-review {
  .el-table--border,
  .el-table--group {
    border-color: #e0e0e0;
  }
  .table-box {
    margin-top: 20px;
  }
}
</style>
