<template >
  <div class="vlt-card">
    <span class="box-spacing">
      <el-button type="primary" style="margin:0px 0px 5px;float:right" @click>导出</el-button>
    </span>
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
        <el-table-column align="center" prop="date" label="城市"></el-table-column>
        <el-table-column align="center" prop="name" label="省份"></el-table-column>
        <el-table-column align="center" prop="address" label="销售额"></el-table-column>
        <el-table-column align="center" prop="address" label="中奖金额"></el-table-column>
        <el-table-column align="center" prop="address" label="小奖中奖"></el-table-column>
        <el-table-column align="center" prop="address" label="大奖中奖"></el-table-column>
        <el-table-column align="center" prop="address" label="大奖兑奖"></el-table-column>
      </el-table>
      <!-- :page-size="[10,20,30, 50]" -->
      <div class="pagination-container" style="text-align:right;margin-top:30px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.limit"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
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
export default {
  name: "provinceDeal",
  data() {
    return {
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
      console.log('search', form)
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
    }
  }
};
</script>

<style rel="less" lang="less" scoped>
</style>
