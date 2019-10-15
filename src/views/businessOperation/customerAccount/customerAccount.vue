<template>
  <div class="vlt-card">
    <div class="Customeraccountlist">
      <search-bar :options="Customeraccountsearch" :total="999"></search-bar>
      <el-table :data="CustomeraccounttableData" border>
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="accountName" label="账户昵称"></el-table-column>
        <el-table-column prop="accountNum" label="账户类型"></el-table-column>
        <el-table-column prop="accountType" label="手机号码"></el-table-column>
        <el-table-column prop="principalName" label="账户余额"></el-table-column>
        <el-table-column prop="telephoneNum" label="注册区域"></el-table-column>
        <el-table-column prop="createDate" label="注册时间"></el-table-column>
        <el-table-column label="账户状态">
          <template slot-scope="scope">
            <el-switch
              v-model="CustomeraccounttableData[scope.$index].Customeraccounttype"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="Customeraccountdetail(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table_paging">
      <tablePaging class="table_paging_right"></tablePaging>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      Customeraccountsearch: [
        {
          type: "input",
          prop: "channelName",
          value: "",
          title: "账户昵称",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "channelName",
          value: "",
          title: "手机号",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "channelName",
          value: "",
          title: "账户类型",
          placeholder: "请输入",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        }
      ],
      CustomeraccounttableData: [
        {
          id: 1,
          accountName: "广东省",
          accountNum: "赵",
          accountType: "自营",
          principalName: "赵",
          telephoneNum: "13800131358",
          createDate: "2019-02-25 01:50:06",
          Customeraccounttype: true,
          operation: "详情"
        }
      ]
    };
  },
  components: {},
  methods: {
    Customeraccountdetail(id) {
      console.log(this.CustomeraccounttableData);
      this.$router.push({ path: "customerAccountListdetail", query: { id } });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
