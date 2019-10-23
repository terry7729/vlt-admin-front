<template>
  <div class="vlt-card">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    ></search-bar>

      <el-table :data="tableData" border style="width: 100%; margin-top: 10px;">
        <el-table-column prop="num" label="序号"></el-table-column>
        <el-table-column prop="orderNum" label="积分编号"></el-table-column>
        <el-table-column prop="accountName" label="账户名称"></el-table-column>
        <el-table-column prop="phoneNum" label="手机号码"></el-table-column>
        <el-table-column prop="type" label="积分类型"></el-table-column>
        <el-table-column prop="area" label="所在区域"></el-table-column>
        <el-table-column prop="money" label="原积分"></el-table-column>
        <el-table-column label="现积分">
          <template slot-scope="scope">{{scope.row.money+scope.row.change}}</template>
        </el-table-column>
        <el-table-column prop="change" label="变动积分">
          <template slot-scope="scope">{{'+'+scope.row.change}}</template>
        </el-table-column>
        <el-table-column prop="time" label="变更时间"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="integralDetail(scope.row.account)">详情</el-button>
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

  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      searchOptions: [
        { title: "手机号", type: "input", prop: "date1", value: "" },
        {
          title: "积分时间",
          type: "datetime-range",
          prop: "date2",
          value: 1
        },
        {
          title: "所在区域",
          type: "select",
          prop: "area",
          value: "",
          options: [
            {
              label: "深圳",
              value: 2
            },
            {
              label: "广州",
              value: 3
            }
          ]
        }
      ],
      tableData: [
        {
          num: 1,
          orderNum: "8008208820",
          type: "充值赠送",
          account: "10086",
          accountName: "匿名",
          phoneNum: "17620465151",
          area: "深圳",
          money: 80,
          balance: "",
          change: 20,
          way: "微信",
          time: "2019-10-14"
        }
      ]
    };
  },
  components: {},
  methods: {
    integralDetail(account) {
      this.$router.push({ path: "integralDetail", query: account });
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
