<template>
  <div class="vlt-card account_detail">
    <div class="account_detail_box">
      <panel-static title="基础信息" :show="true">
        <base-Info :infoList="accountData"></base-Info>
      </panel-static>
      <panel-static title="任务进度" :show="true">
        <base-Info :infoList="moneyAccount"></base-Info>
      </panel-static>
      <div class="last_bottom_list">
        <h4>进度更新明细</h4>
        <el-table :data="tableData" border>
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="accountName" label="任务进度"></el-table-column>
          <el-table-column prop="accountNum" label="任务说明"></el-table-column>
          <el-table-column prop="accountType" label="使用终端"></el-table-column>
          <el-table-column prop="principalName" label="更新人"></el-table-column>
          <el-table-column prop="createDate" label="更新时间"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enter: 0,
      accountData: [
        { title: "活动编号", value: "", prop: "accountID" },
        { title: "活动名称", value: "", prop: "accountName" },
        { title: "执行编号", value: "", prop: "principal" },
        { title: "执行计划名称", value: "", prop: "telephoneNum" },
        { title: "责任人", value: "", prop: "accountStatus" },
        { title: "执行人", value: "", prop: "accountType" },
        { title: "任务名称", value: "", prop: "area" },
        { title: "任务描述", value: "", prop: "detailAdress" },
        { title: "执行时间", value: "", prop: "createDate" },
        { title: "截止时间", value: "", prop: "pullDate" },
        { title: "状态", value: "", prop: "pullDate" }
      ],
      moneyAccount: [
        { title: "任务进度", value: "", prop: "moneyAccountID" },
        { title: "任务说明", value: "", prop: "accountTotal" },
        { title: "完成时间", value: "", prop: "totalDeposit" }
      ],
      tableData: [
        {
          id: 1,
          accountName: "广东省",
          accountNum: "赵",
          accountType: "自营",
          principalName: "赵",
          createDate: "2019-02-25 01:50:06"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>

</style>