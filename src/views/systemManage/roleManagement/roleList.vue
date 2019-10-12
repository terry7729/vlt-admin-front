<template>
  <div class="vlt-card">
    <div class="role-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :border="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="用户状态" show-overflow-tooltip>
          <template>
            <div>
              <el-button type="text">启用</el-button>
              <span>|</span>
              <el-button type="text">冻结</el-button>
              <span>|</span>
              <el-button type="text">注销</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" show-overflow-tooltip>
          <el-button type="text" @click="handelskip()">查看</el-button>
          <span>|</span>
          <el-button type="text">编缉</el-button>
          <span>|</span>
          <el-button type="text">重置密码</el-button>
        </el-table-column>
      </el-table>
      <div class="pagintion">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper,slot"
          :total="400"
        >
          <span style="color:#606266;font-weight: 400;">第 1 / 80 页</span>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "name",
  data() {
    return {
      currentPage4: 4,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },
  computed: {},
  created() {},
  mounted() {},
  components: {},
  methods: {

    handleSelectionChange(val) { //当前选择项目
      console.log(val)
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handelskip() {
      this.$router.push("roleList/roleDestails");
    }
  }
};
</script>


<style lang="less">
@import "./less/index.less";
.pagintion {
  margin: 20px;
  .el-pagination {
    position: relative;
    .el-pagination__jump {
      position: absolute;
      right: 0;
    }
    .el-pagination__sizes {
      position: absolute;
      right: 94px;
    }
    .btn-prev {
      position: absolute;
      right: 599px;
    }
    .el-pager {
      position: absolute;
      right: 269px;
    }
    .btn-next {
      position: absolute;
      right: 220px;
    }
  }
}

.el-table th {
  background: #f8f8f9;
  padding: 8px 0;
  text-align: center;
}
.el-table td {
  padding: 10px 0;
  text-align: center;
}
</style>
