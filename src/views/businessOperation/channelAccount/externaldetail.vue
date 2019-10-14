<template>
  <div class="vlt-card">
    <div class="externaldetail">
      <searchBar
        class="search-bar-demo"
        @search="externaldetailsearchbtn"
        :options="externaldetailsearch"
        :total="999"
        labelWidth="80px"
      >
        <controlBar :options="externaldetaildata" @select="externaldetailbtn" slot="extend-bar"></controlBar>
      </searchBar>

      <base-Info :infoList="accountallname"></base-Info>
      <el-table :data="externaldetailtableData" border show-summary>
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="accountName" label="账户名称"></el-table-column>
        <el-table-column prop="accountNum" label="账号"></el-table-column>
        <el-table-column prop="accountType" label="账户类型"></el-table-column>
        <el-table-column prop="principalName" label="负责人姓名"></el-table-column>
        <el-table-column prop="telephoneNum" label="手机号码"></el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>
        <el-table-column label="账户状态" prop="createDate"></el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>
        <el-table-column label="操作" prop="principalName"></el-table-column>
      </el-table>
      <div class="table_paging">
        <tablePaging class="table_paging_right"></tablePaging>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      externaldetaildata: [
        { name: "打印", type: "success", icon: "upload2" },
        { name: "导出", type: "danger", icon: "download" }
      ],
      accountallname: [
        { title: "户名全称", value: "", prop: "accountallname" }
      ],
      externaldetailsearch: [
        {
          type: "datetime-range",
          prop: "selectiontime",
          value: "",
          title: "选择时间",
          placeholder: ["开始时间", "结束时间"]
        },
        {
          title: "交易类型",
          type: "select",
          prop: "tradetype",
          value: "",
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
      externaldetailtableData: [
        {
          id: 1,
          accountName: "广东省",
          accountNum: "上海市普陀区金沙江路 1518 弄",
          accountNum: "赵",
          accountType: "自营",
          principalName: "赵",
          telephoneNum: "13800131358",
          createDate: "2019-02-25 01:50:06",
          operation: "详情",
          principalName: "赵",
          principalName: "赵"
        }
      ]
    };
  },
  components: {},
  methods: {
    externaldetailsearchbtn() {},
    externaldetailbtn() {}
  }
};
</script>

<style lang="less" scoped>
</style>
