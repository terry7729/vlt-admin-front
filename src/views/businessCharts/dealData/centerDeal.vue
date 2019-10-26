<template>
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
        <el-table-column align="center" prop="province" label="省份">
          <!-- <template slot-scope="scope">
              <span>{{scope.row.province}}</span>
          </template>-->
        </el-table-column>
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
  name: "centerDeal",
  data() {
    return {
      totalCount: 0,
      controlOptions: [{ name: "导出", type: "primary", icon: "download" }],
      exportLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: [
        {
          province: "2016-05-02",
          saleAmount: "王小虎",
          winningAmount: "  1518 弄",
          smallAwardAmount: "2016-05-02",
          bigAwardAmount: "王小虎",
          grandPrize: "  1518 弄"
        },
        {
           province: "2016-05-02",
          saleAmount: "王小虎",
          winningAmount: "  1518 弄",
          smallAwardAmount: "2016-05-02",
          bigAwardAmount: "王小虎",
          grandPrize: "  1518 弄"
        },
        {
           province: "2016-05-02",
          saleAmount: "王小虎",
          winningAmount: "  1518 弄",
          smallAwardAmount: "2016-05-02",
          bigAwardAmount: "王小虎",
          grandPrize: "  1518 弄"
        },
        {
           province: "2016-05-02",
          saleAmount: "王小虎",
          winningAmount: "  1518 弄",
          smallAwardAmount: "2016-05-02",
          bigAwardAmount: "王小虎",
          grandPrize: "  1518 弄"
        }
      ]
    };
  },
  computed: {},
  created() {
    this.getCenterDeal();
    // this.getlist();
  },
  mounted() {

  },
  components: {},
  methods: {
    //获取中央交易数据列表
    async getCenterDeal() {
      const self = this;
      const res = await self.$api.getCenterDeal({
        data: {
          pageNum: self.listQuery.page,
          pageSize: self.listQuery.limit
        }
      });
      if (res && res.code == 0) {
        self.tableData = res.data.dataList;
        self.totalCount = res.data.totalRecord;
      }
    },
    pageSizeChange(pageSize) {    
      this.listQuery.limit = pageSize;
      this.getCenterDeal();
    },
    pageCurrentChange(currentPage) {
      this.listQuery.page = currentPage;
      this.getCenterDeal();
    },  
    excleExporrt() {
      // 导出数据
      import("@/libs/map/Export2Excel.js").then(excel => {
        // 需要过滤一下，按照顺序对应表头才可以导出
        if (this.tableData == null || this.tableData.length == 0) {
          this.$message({
            message: "抱歉，当前没有数据可以导出"
          });
          this.exportLoading = false;
          return;
        } else {
          // 要导出的数据
          const excelHeader = [
            "日期",
            "收支",
            "类型",
            "对方账户",
            "金额（GAC）",
            "订单号",
            "备注/会员名"
          ];
          const relationField = [
            "bill_time",
            "payFlag",
            "billType",
            "peerNo",
            "quan",
            "orderNo",
            "remark"
          ];
          alert(1);
          const data = this.formatJson(relationField, this.tableData);
          // 导出
          excel.export_json_to_excel({
            header: excelHeader,
            data,
            filename: "我的账单",
            autoWidth: true,
            bookType: "xlsx"
          });
          this.exportLoading = false;
        }
      });
    }
  }
};
</script>


<style lang="less" scoped>

</style>
