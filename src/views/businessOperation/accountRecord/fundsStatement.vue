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
        <el-table-column prop="accountName" label="用户姓名"></el-table-column>
        <el-table-column prop="phoneNum" label="手机号码"></el-table-column>
        <el-table-column prop="type" label="流水类型"></el-table-column>
        <el-table-column prop="change" label="交易/结算金额"></el-table-column>
        <el-table-column prop="money" label="账户余额"></el-table-column>
        <el-table-column prop="way" label="交易/结算单位"></el-table-column>
        <el-table-column prop="area" label="交易描述"></el-table-column>
        <el-table-column prop="time" label="操作时间"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="fundsDetail(scope.row.account)">详情</el-button>
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
        { title: "投注卡号", type: "input", prop: "date1", value: "" },
        { title: "手机号", type: "input", prop: "date2", value: "" },
        {
          title: "流水类型",
          type: "select",
          prop: "type",
          value: "",
          options: [
            {
              label: "充值",
              value: 1
            },
            {
              label: "投注",
              value: 2
            },
            {
              label: "兑奖",
              value: 3
            },
            {
              label: "提现",
              value: 4
            }
          ]
        },
        {
          title: "投注时间",
          type: "datetime-range",
          prop: "date3",
          value: 3
        }
      ],
      tableData: [
        {
          num: 1,
          orderNum: "8008208820",
          type: "兑奖",
          account: "10086",
          accountName: "匿名",
          phoneNum: "17620465151",
          area: "银联->个人账户",
          money: 1200,
          balance: "",
          change: "+200",
          way: "CNY",
          time: "2019-10-14"
        }
      ]
    };
  },
  components: {},
  methods: {
    fundsDetail(account) {
      this.$router.push({ path: "fundsDetail", query: account });
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
