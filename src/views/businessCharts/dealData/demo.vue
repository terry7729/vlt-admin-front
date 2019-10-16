<template>
  <div class="vlt-card">
    <el-table :data="tabledatas" border>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="指标配置">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab1"></el-input>
          <span v-show="!scope.row.show">{{scope.row.tab1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="tab2">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab2"></el-input>
          <span v-show="!scope.row.show">{{scope.row.tab2}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="scope.row.show =true">编辑</el-button>
          <el-button @click="dd(scope.row)">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabledatas: []
    };
  },
  created() {
    let list = [
      { tab1: "tast2", tab2: "tast333" },
      { tab1: "aaa", tab2: "bbb" }
    ];
    list.forEach(element => {
      element["show"] = false;
    });
    this.tabledatas = list;
  },
  methods: {
      dd(row){
          row.show=false;
      },
    handleEdit: function(row) {
      this.tableData.forEach(v => {
        v.editeFlage;
      });
    },
    handleSave: function(row) {
      //保存数据，向后台取数据
    },
    handleMouseEnter: function(row, column, cell, event) {
      cell.children[0].children[1].style.color = "black";
    },
    handleMouseOut: function(row, column, cell, event) {
      cell.children[0].children[1].style.color = "#ffffff";
    }
  }
};
</script>

<style>
.cell-edit-input .el-input,
.el-input__inner {
   width: 100px;
}
.cell-icon {
   cursor: pointer;
   color: #fff;
}
</style>
