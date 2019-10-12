<template>
  <div class="vlt-card account_detail">
    <div class="account_detail_box">
      <panel-Edit title="基础信息" :show="true">
        <base-Info :infoList="accountData" slot="info-content"></base-Info>
      </panel-Edit>
      <panel title="任务进度" :show="true">
        <base-Info :infoList="moneyAccount"></base-Info>
      </panel>
      <div class="last_bottom_list">
        <h3>拥有渠道列表</h3>
        <el-table :data="tableData" border>
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="accountName" label="账户名称"></el-table-column>
          <el-table-column prop="accountNum" label="账号"></el-table-column>
          <el-table-column prop="accountType" label="账户类型"></el-table-column>
          <el-table-column prop="principalName" label="负责人姓名"></el-table-column>
          <el-table-column prop="telephoneNum" label="手机号码"></el-table-column>
          <el-table-column prop="createDate" label="创建时间"></el-table-column>
          <el-table-column label="账户状态" prop="createDate"></el-table-column>
          <el-table-column prop="createDate" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handelListDetail(scope.row.id)">详情</el-button>
            </template>
          </el-table-column>
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
        { title: "账户ID", value: "", prop: "accountID" },
        { title: "账户名称", value: "", prop: "accountName" },
        { title: "负责人", value: "", prop: "principal" },
        { title: "手机号码", value: "", prop: "telephoneNum" },
        { title: "账户状态", value: "", prop: "accountStatus" },
        { title: "账户类型", value: "", prop: "accountType" },
        { title: "所属区域", value: "", prop: "area" },
        { title: "详细地址", value: "", prop: "detailAdress" },
        { title: "创建时间", value: "", prop: "createDate" },
        { title: "更新时间", value: "", prop: "pullDate" }
      ],
      moneyAccount: [
        { title: "资金账户ID", value: "", prop: "moneyAccountID" },
        { title: "账户总额", value: "", prop: "accountTotal" },
        { title: "总预交款", value: "", prop: "totalDeposit" },
        { title: "授信总额度", value: "", prop: "totalMoney" },
        { title: "创建时间", value: "", prop: "createDate" },
        { title: "更新时间", value: "", prop: "pullDate" }
      ],
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
          operation: "详情"
        }
      ]
    };
  },
  methods: {
    enterNum() {
      this.enter = 1;
    },
    enterSave() {},
    handelListDetail(id) {
    //   this.$router.push({ path: "haveListDetail", query: { id } });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./less/index.less";
</style>