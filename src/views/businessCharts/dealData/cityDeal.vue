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
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.page"
          :page-sizes="[10,20,30, 50]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
        <!-- <pagination :total='100' ></pagination> -->
        <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
        </el-pagination>-->
      </div>
    </div>
  </div>
</template>

<script>
// import errGif from "@/assets/401_images/401.gif";
// import pagination from '@/components/common/pagination'
export default {
  name: "cityDeal",
  data() {
    return {
      controlOptions: [
        { name: "导出", type: "primary", icon: "download" },
      ],
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

<style  lang="less" scoped>
.control-bar-comp{
  text-align: right;
}
</style>
