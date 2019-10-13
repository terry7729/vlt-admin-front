<template>
  <div class="vlt-card">
    <search-bar :options="options"></search-bar>
    <div class="create-btn">
      <el-button type="primary" size="small" @click="allotTask">评估</el-button>
      <el-button type="primary" size="small" @click="allotTask">下载</el-button>
    </div>

    <div class="el_table">
      <el-table :data="tableData" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" width="55"></el-table-column>
        <el-table-column prop="activeNum" label="活动编号"></el-table-column>
        <el-table-column prop="activeName" label="活动名称"></el-table-column>
        <el-table-column prop="reportName" label="报告名称"></el-table-column>
        <el-table-column prop="reportType" label="定性报告"></el-table-column>
        <el-table-column prop="Vdoing" label="所选维度"></el-table-column>
        <el-table-column prop="target" label="所选指标"></el-table-column>
        <el-table-column prop="retionReport" label="定量报告"></el-table-column>
        <el-table-column prop="createPerson" label="创建人"></el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>

     
      </el-table>
    </div>
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
          prop: "channelName",
          value: "",
          title: "活动编码",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "telephoneNum",
          value: "",
          title: "活动名称",
          placeholder: "请输入"
        }
      ],
      tableData: [
        {
          id: 1,
          activeNum: "007",
          activeName: "促销",
          reportName: "报告老板",
          reportType: "下载",
          Vdoing: "省市区",
          target: "充值总额",
          retionReport: "预览",
          createPerson: "王二",
          createDate: "2019-01-25 01:50:06"
        }
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  components: {}
};
</script>


<style lang="less">
@import "./less/index.less";
</style>