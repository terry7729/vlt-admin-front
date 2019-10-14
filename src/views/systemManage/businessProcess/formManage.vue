<template>
  <div class="vlt-card">
    <div class="searchBar">
      <search-Bar :options="option"></search-Bar>
    </div>
    <div class="addlist">
      <el-button type="primary" icon="el-icon-plus" @click="compile()">新建表单</el-button>
    </div>
    <div class="tipsline">
      <tips-line>共搜索到8项数据</tips-line>
    </div>
    <div class="el_table">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="序号" width="100"></el-table-column>
        <el-table-column prop="formname" label="表单名称 "></el-table-column>
        <el-table-column prop="creatdate" label="创建时间"></el-table-column>
        <el-table-column prop="note" label="备注描述" width="260"></el-table-column>

        <el-table-column label="状态">
          <template>
            <div>
              <el-button type="primary" size="mini">启动</el-button>

              <el-button type="danger" size="mini">禁止</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="compile(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>  
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
          formname: "视频游戏A发行申请流程表单",
          creatdate: "2019-10-12 10:0:0",
          note: "视频游戏A发行申请的表单",
        },
        {
          id: 2,
          formname: "视频游戏A发行申请流程表单",
          creatdate: "2019-10-12 10:0:0",
          note: "视频游戏A发行申请的表单",
        },
        {
          id: 3,
          formname: "视频游戏A发行申请流程表单",
          creatdate: "2019-10-12 10:0:0",
          note: "视频游戏A发行申请的表单",
        },
        {
          id: 4,
          formname: "视频游戏A发行申请流程表单",
          creatdate: "2019-10-12 10:0:0",
          note: "视频游戏A发行申请的表单",
        },
        {
          id: 5,
          formname: "视频游戏A发行申请流程表单",
          creatdate: "2019-10-12 10:0:0",
          note: "视频游戏A发行申请的表单",
        },
        {
          id: 6,
          formname: "视频游戏A发行申请流程表单",
          creatdate: "2019-10-12 10:0:0",
          note: "视频游戏A发行申请的表单",
        },
        {
          id: 7,
          formname: "视频游戏A发行申请流程表单",
          creatdate: "2019-10-12 10:0:0",
          note: "视频游戏A发行申请的表单",
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    compile(id) {
      this.$router.push({
        path:"formManage/formCompile",
        query:{id}
      });
      
    }
  }
};
</script>

<style lang="less" >
</style>