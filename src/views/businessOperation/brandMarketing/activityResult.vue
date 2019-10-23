<template>
  <div class="vlt-card active-result">
    <search-bar :options="options" @search="search"></search-bar>
    <el-button type="primary" size="small" @click="assess">评估</el-button>
    <el-button type="primary" size="small">下载</el-button>
    <el-table :data="assessList" border class="assess-list">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column prop="activeNum" label="活动编号"></el-table-column>
      <el-table-column prop="activeName" label="活动名称"></el-table-column>
      <el-table-column prop="reportName" label="报告名称"></el-table-column>
      <el-table-column prop="report" label="定性报告">
        <el-button type="primary" size="mini">下载</el-button>
      </el-table-column>
      <el-table-column prop="dimension" label="所选维度"></el-table-column>
      <el-table-column prop="target" label="所选指标"></el-table-column>
      <el-table-column prop="retionReport" label="定量报告">
        <el-button type="primary" size="mini">预览</el-button>
      </el-table-column>
      <el-table-column prop="createPerson" label="创建人"></el-table-column>
      <el-table-column prop="createDate" label="创建时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "name",
  data() {
    return {
      options: [
        {
          type: "input",
          prop: "activeNum",
          value: "",
          title: "活动编码"
        },
        {
          type: "input",
          prop: "reportName",
          value: "",
          title: "报告名称"
        }
      ],
      assessList: [
        {
          activeNum: "007",
          activeName: "促销",
          reportName: "报告老板",
          report: "",
          dimension: "省市区",
          target: "充值总额",
          retionReport: "",
          createPerson: "王二",
          createDate: "2019-01-25 01:50:06"
        }
      ]
    };
  },
  methods: {
    assess() {
      this.$router.push({ path: "resultAssess" });
    },
    search(params) {
      console.info('search', params)
    }
  },
  computed: {},
  created() {},
  mounted() {},
  components: {}
};
</script>


<style lang="less">
.active-result {
  .assess-list {
    margin-top: 15px;
  }
}
</style>