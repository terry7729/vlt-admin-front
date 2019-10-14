<template>
  <div class="vlt-card">
    <div class="searchBar">
      <search-Bar :options="option" :total="999"></search-Bar>
      <el-button type="primary" icon="el-icon-plus" @click="add()">新建表单</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :border="true"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="id" label="序号" width="120"></el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip width="200"></el-table-column>
      <el-table-column prop="address" label="用户状态" show-overflow-tooltip width="200">
        <template>
          <div>
            <el-button type="text">启用</el-button>
            <span>|</span>
            <el-button type="text">禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" show-overflow-tooltip width="200">
        <el-button type="primary" size="mini" @click="compile()">编缉</el-button>
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
</template>

<script>
export default {
  data() {
    return {
      currentPage4: 4,
      tableData: [
        {
          id: 1,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 "
        },
        {
          id: 2,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 "
        },
        {
          id: 3,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 "
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 "
        },
        {
          id: 5,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 "
        },
        {
          id: 6,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 "
        },
        {
          id: 7,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 "
        },
        {
          id: 8,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 "
        }
      ],

      option: [
        {
          title: "表单名称",
          prop: "set",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          title: "状态",
          prop: "select",
          type: "select",
          options: [
            {
              value: "beijing",
              label: "北京"
            },
            {
              value: "shanghai",
              label: "上海"
            }
          ],

          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        }
      ]
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
    add () {
      this.$router.push("formManage/formCompile");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    compile() {
      this.$router.push("formManage/formCompile");
    }
  }
};
</script>

<style lang="less" >
</style>