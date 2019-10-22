<template >
  <div class="vlt-card">
    <section class="comp-item">
      <control-bar :options="controlOptions" position="right"></control-bar>
    </section>
    <div class="tab-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{background:'rgba(240,240,240,.5)'}"
        :cell-style="{align:'center'}"
      >
        <el-table-column align="center" label="序号" width="65">
          <template slot-scope="scope">
            <div style="text-align:center;">{{scope.$index+1}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="city" label="城市"></el-table-column>
        <el-table-column align="center" prop="province" label="省份"></el-table-column>
        <el-table-column align="center" prop="saleAmount" label="销售额"></el-table-column>
        <el-table-column align="center" prop="winningAmount" label="中奖金额"></el-table-column>
        <el-table-column align="center" prop="smallAwardAmount" label="小奖中奖"></el-table-column>
        <el-table-column align="center" prop="bigAwardAmount" label="大奖中奖"></el-table-column>
        <el-table-column align="center" prop="grandPrize" label="大奖兑奖"></el-table-column>
      </el-table>
       <table-paging
        style="margin-top:30px"
        :current-page="1"
        :page-size="10"
        :total="totalCount"
        @handleSizeChange="pageSizeChange"
        @handleCurrentChange="pageCurrentChange"
      ></table-paging>
    </div>
  </div>
</template>

<script>
export default {
  name: "provinceDeal",
  data() {
    return {
      totalCount: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      controlOptions: [{ name: "导出", type: "primary", icon: "download" }],
      total: null,
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "  1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "  1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "  1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "  1516 弄"
        }
      ]
    };
  },
  methods: {
    pageSizeChange(pageSize) {
      this.listQuery.limit=pageSize;
      this.getProvinceDeal();
    },
    pageCurrentChange(currentPage) {
      this.listQuery.page=currentPage;
      this.getProvinceDeal();
    },
    search(form) {
      console.log("search", form);
    },
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: "/dashboard" });
      } else {
        this.$router.go(-1);
      }
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
    },
    async getProvinceDeal() {
      const self = this;
      const res = await self.$api.getProvinceDeal({
        data: {
          pageNum: self.listQuery.page,
          pageSize: self.listQuery.limit
        }
      });
      if (res && res.code == 0) {
        console.log(res)
        self.tableData = res.data.data.dataList;
        self.totalCount = res.data.data.totalRecord;
        // console.log(self.totalCount);
      }
    }
  },created() {
    this.getProvinceDeal()
  },
};
</script>

<style  lang="less" scoped>
.vlt-card{
  padding: 5px;
}
</style>
