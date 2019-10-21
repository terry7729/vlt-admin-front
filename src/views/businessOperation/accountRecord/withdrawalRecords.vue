<template>
  <div class="vlt-card">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    ></search-bar>

    <section class="comp-item">
      <el-table :data="tableData" border style="width: 100%; margin-top: 10px;">
        <el-table-column prop="num" label="序号"></el-table-column>
        <el-table-column prop="orderNum" label="订单编号"></el-table-column>
        <el-table-column prop="type" label="提现类型"></el-table-column>
        <el-table-column prop="account" label="提现卡号"></el-table-column>
        <el-table-column prop="accountName" label="账户名称"></el-table-column>
        <el-table-column prop="phoneNum" label="手机号码"></el-table-column>
        <el-table-column prop="area" label="所在区域"></el-table-column>
        <el-table-column prop="money" label="提现金额"></el-table-column>
        <el-table-column prop="way" label="提现方式"></el-table-column>
        <el-table-column prop="time" label="提现时间"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="withdrawalDetail(scope.row.account)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <table-paging
        :current-page="1"
        :page-size="10"
        :total="this.tableData.length"
        @handleSizeChange="pageSizeChange"
        @handleCurrentChange="pageCurrentChange"
      ></table-paging>
    </section>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      searchOptions: [
        { title: "提现账号", type: "input", prop: "inputName", value: "" },
        {
          title: "提现类型",
          type: "select",
          prop: "type",
          value: "",
          options: [
            {
              label: "会员卡",
              value: 1
            },
            {
              label: "投注卡",
              value: 2
            }
          ]
        },
        { title: "手机号", type: "input", prop: "date2", value: "" },
        { title: "订单编号", type: "input", prop: "date3", value: "" },
        {
          title: "所在区域",
          type: "select",
          prop: "area",
          value: "",
          options: [
            {
              label: "深圳",
              value: 3
            },
            {
              label: "广州",
              value: 4
            }
          ]
        },
        {
          title: "提现时间",
          type: "datetime-range",
          prop: "date5",
          value: 1
        }
      ],
      tableData: [
        {
          num: 1,
          orderNum: "8008208820",
          type: "会员卡",
          account: "10086",
          accountName: "匿名",
          phoneNum: "17620465151",
          area: "深圳",
          money: "8080",
          way: "微信",
          time: "2019-10-14"
        }
      ]
    };
  },
  components: {},
  methods: {
    withdrawalDetail(account) {
      this.$router.push({ path: "withdrawalDetail", query: account });
    },
    search() {},
    pageSizeChange(size) {
      this.PAGESIZE = size;
      this.$emit("handleSizeChange", size);
    },
    pageCurrentChange(page) {
      this.CURRENTPAGE = page;
      this.$emit("handleCurrentChange", page);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
