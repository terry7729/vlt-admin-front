<template>
  <div class="vlt-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="报告模板" name="first">
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
            <el-table-column align="center" prop="date" label="名称"></el-table-column>
            <el-table-column align="center" prop="name" label="业务名称"></el-table-column>
            <el-table-column align="center" prop="name" label="警报等级"></el-table-column>
            <el-table-column label="操作" fixed="right" width="620px" align="center">
              <template slot-scope="scope">
                <el-button type="primary" @click size="medium ">生成报告</el-button>
                <el-button type="primary" @click size="medium ">编辑</el-button>
                <el-button type="primary" @click size="medium ">删除</el-button>
              </template>
            </el-table-column>
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
      </el-tab-pane>
      <el-tab-pane label="已生成报告" name="second">
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
          <el-table-column align="center" prop="date" label="文件名称"></el-table-column>
          <el-table-column align="center" prop="name" label="创建人"></el-table-column>
          <el-table-column label="操作" fixed="right" width="620px" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click size="medium ">导出</el-button>
              <el-button type="primary" @click size="medium ">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <table-paging
          style="margin-top:30px"
          :current-page="1"
          :page-size="10"
          :total="totalCount"
          @handleSizeChange="pageSizeChange"
          @handleCurrentChange="pageCurrentChange"
        ></table-paging>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      controlOptions: [{ name: "新增", type: "primary", icon: "plus" }],
      activeName: "first",
      totalCount: 100,
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
      console.log("每页条数：", pageSize);
    },
    pageCurrentChange(currentPage) {
      console.log("当前页：", currentPage);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      // this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      // this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
</style>
