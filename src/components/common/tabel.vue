<template>
  <div>
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
                  <el-link :underline="false">启用<span>|</span></el-link>
                  <el-link :underline="false">冻结<span>|</span></el-link>
                  <el-link :underline="false">注销</el-link>
              </div>
          </template>
      </el-table-column>
            <el-table-column prop="address" label="操作" show-overflow-tooltip>
                     <el-link type="primary"  href="http://localhost:8082/#/home/systemManage/userList/userDestails">查看<span>|</span></el-link>
                      <el-link type="primary">编缉<span>|</span></el-link>
                       <el-link type="primary">重置密码</el-link>
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
      :total="400">
      <span style="color:#606266;font-weight: 400;">第 1 / 80 页</span>
    </el-pagination>
    </div>
   
  </div>
</template>

<script>
export default {
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

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  }
};
</script>

<style lang="less" >
.pagintion{
    margin :20px;
    .el-pagination{
        position: relative;
        .el-pagination__jump{
            position: absolute;
            right: 0;

        }
        .el-pagination__sizes{
            position: absolute;
            right: 94px;
        }
        .btn-prev{
            position: absolute;
            right: 599px;
        }
        .el-pager{
            position: absolute;
            right: 269px;
        }
        .btn-next{
            position: absolute;
            right:220px;
        }
    }
}

  .el-table th{
        background: #f8f8f9;
        padding: 8px 0;
        text-align: center;
    }
.el-table td{
    padding: 10px 0;
    text-align: center
}

</style>