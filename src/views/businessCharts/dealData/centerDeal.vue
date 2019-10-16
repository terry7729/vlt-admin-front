<template>
  <div class="vlt-card">
    <section class="comp-item">
      <control-bar :options="controlOptions"></control-bar>
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
        <el-table-column align="center" prop="date" label="省份"></el-table-column>
        <el-table-column align="center" prop="name" label="销售额"></el-table-column>
        <el-table-column align="center" prop="address" label="中奖金额"></el-table-column>
        <el-table-column align="center" prop="address" label="小奖中奖"></el-table-column>
        <el-table-column align="center" prop="address" label="大奖中奖"></el-table-column>
        <el-table-column align="center" prop="address" label="大奖兑奖"></el-table-column>
      </el-table>
      <div class="pagination-container" style="text-align:right;margin-top:30px">
        <section class="comp-item">
          <table-paging
            :current-page="1"
            :page-size="10"
            :total="100"
            @handleSizeChange="pageSizeChange"
            @handleCurrentChange="pageCurrentChange"
          ></table-paging>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "centerDeal",
  data() {
    return {
      controlOptions: [{ name: "导出", type: "primary", icon: "download" }],
      exportLoading: false,
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
  computed: {},
  created() {
    this.getCenterDeal();
  },
  mounted() {},
  components: {},
  methods: {
     async getCenterDeal() {
       alert(1)
      const self = this;
      const res = await self.$api.getCenterDeal({
        data: {
          'pageNum': self.listQuery.page,
          'pageSize':self.listQuery.limit
        }
      });
      if (res && res.code == 0) {       
        console.log(res)
      }
   
    },
    pageSizeChange(pageSize) {
      console.log('每页条数：', pageSize);
    },
    pageCurrentChange(currentPage) {
      console.log('当前页：', currentPage);
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      // this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      // this.getList();
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


<style lang="less">
.control-bar-comp {
  text-align: right;
}
</style>
