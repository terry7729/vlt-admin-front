<template>
  <div class="vlt-card">
    <div class="bankdetail">
      <searchBar
        class="search-bar-demo"
        @search="bankdetailbtn"
        :options="bankdetailsearch"
        :total="999"
        labelWidth="80px"
      >
        <controlBar :options="importdata" @select="importbtn" slot="extend-bar" position="left"></controlBar>
      </searchBar>
      <base-Info :infoList="accountallname"></base-Info>
      <el-table :data="tableData" border show-summary>
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
        <tablePaging class="table_paging_right" :total="99" :currentPage="1" :pageSize="10"></tablePaging>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      //按钮类型
      importdata: [
        { name: "打印", type: "primary", icon: "printer" },
        { name: "导出", type: "danger", icon: "download" }
      ],
      //
      accountallname: [
        { title: "户名全称", value: "", prop: "accountallname" },
        { title: "银行账号", value: "", prop: "bankaccount" }
      ],
      //搜索类型
      bankdetailsearch: [
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
      //表格数据
      tableData: [
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
    //查询
    bankdetailbtn(form) {
      console.log("param:", form);
    },
    //按钮类型
    importbtn() {}
  }
};
</script>

<style lang="less" scoped>
</style>
