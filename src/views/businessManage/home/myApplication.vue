<!-- 首页 - 我的申请 -->
<template>
  <div class="vlt-card pending-review">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    >
      <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions" position="left"></control-bar></search-bar>
    <el-table :data="tableData" style="width: 100%" border class="table-box">
      <el-table-column prop="id" label="序号" width="60"></el-table-column>
      <el-table-column prop="title" label="业务标题" ></el-table-column>
      <el-table-column prop="type" label="业务类型" ></el-table-column>
      <el-table-column prop="date" label="申请时间" width="150"></el-table-column>
      <el-table-column prop="date2" label="完成时间" width="150"></el-table-column>
      <el-table-column prop="process" label="当前步骤"></el-table-column>
      <el-table-column prop="name" label="当前处理人" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="toView(scope.row)">查看</el-button>

            <el-button v-for="(item, index) in scope.row.operating" :key="index" v-show="item.isShow" size="mini" @click="operat(item.operat,scope.row)">{{item.name}}</el-button>
          
          
           <!-- v-if="scope.row.operating.cEdit"
           v-if="scope.row.operating.cDelete" -->
          <!-- <el-button size="mini" @click="toEdit(scope.row)">修改</el-button>
          <el-button size="mini"  @click="toDelete(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <table-paging
      position="right"
      :total="999"
      :currentPage="1"
      :pageSize="10"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></table-paging>
  </div>
</template>
<script>
export default {
  name:'myApplication',
  data() {
    return {
      // 搜索组件配置
      searchOptions: [
        {
          type: "input",
          prop: "inputName",
          value: "",
          title: "业务标题：",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "selectName",
          value: "",
          title: "业务类型：",
          placeholder: "请选择",
          options: [
            {
              label: "类型1",
              value: 1
            },
            {
              label: "类型2",
              value: 2
            }
          ]
        },
        {
          type: "datepicker-range",
          prop: "date2",
          value: "",
          title: "申请日期：",
          placeholder: ["开始日期", "结束日期"]
        }
      ],
      controlOptions: [
        { name: "打印", type: "primary", icon: "printer" },
        { name: "导出", type: "danger", icon: "download" },
      ],
      tableData: [
        {
          id: 0,
          title: "【6000000】建厅申请",
          date: "2016-05-02",
          date2: '2016-05-20',
          name: "王小虎",
          process: "地市审批",
          type: "建厅申请",
          operating:[
             {
              name: '修改',
              isShow: true,
              operat: 'toEdit'
            },
             {
              name: '删除',
              isShow: true,
              operat: 'toDelete'
            }
          ]
        },
        {
          id: 1,
          date: "2016-05-04",
          date2: '2016-05-20',
          title: "【6000000】建厅申请",
          name: "王小虎",
          process: "地市审批",
          type: "建厅申请",
          operating: [
             {
              name: '修改',
              isShow: false,
              operat: 'toEdit'
            },
             {
              name: '删除',
              isShow: false,
              operat: 'toDelete'
            }
          ]
        },
        {
          id: 2,
          date: "2016-05-01",
          date2: '2016-05-20',
          title: "【6000000】建厅申请",
          name: "王小虎",
          process: "地市审批",
          type: "建厅申请",
          operating: [
             {
              name: '修改',
              isShow: false,
              operat: 'toEdit'
            },
             {
              name: '删除',
              isShow: false,
              operat: 'toDelete'
            }
          ]
        },
        {
          id: 3,
          date: "2016-05-03",
          date2: '2016-05-20',
          title: "【6000000】建厅申请",
          name: "王小虎",
          process: "地市审批",
          type: "建厅申请",
          operating: [
             {
              name: '修改',
              isShow: false,
              operat: 'toEdit'
            },
             {
              name: '删除',
              isShow: false,
              operat: 'toDelete'
            }
          ]
        },
        {
          id: 4,
          title: "【6000000】建厅申请",
          date: "2016-05-02",
          date2: '2016-05-20',
          name: "王小虎",
          process: "地市审批",
          type: "建厅申请",
          operating: [
             {
              name: '修改',
              isShow: false,
              operat: 'toEdit'
            },
             {
              name: '删除',
              isShow: false,
              operat: 'toDelete'
            }
          ]
        }
      ],
      // currentPage: 1
    };
  },
  methods: {
    search(form) {
      console.log("search", form);
    },
    selectBtn() {
      console.log('selectBtn');
    },
    toView(row) {
      const self = this;
      console.log('查看',row);
      this.$router.push({
        name:'pendingReviewEdit',
        query: {id: row.id}
      })
    },
    operat (el, row) {
      if (el === 'toEdit') {
        console.log('编辑', row);
      } else if (el === 'toDelete'){
        console.log('删除', row);
      } 
    },

    // toEdit(row) {
    //   console.log('修改',row);
    // },
    // toDelete(row) {
    //   console.log('删除', row);
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  components: {
  }
};
</script>

<style lang="less">
.pending-review {
  .el-table--border,
  .el-table--group {
    border-color: #e0e0e0;
  }
  .table-box {
    margin-top: 20px;
  }

  // .el-pagination.is-background{
  //   margin-top: 40px;
  //   text-align: right;
  //   li {
  //     margin: 0 6px;
  //     padding: 0;
  //     box-sizing: border-box;
  //     border: 1px solid #d9d9d9;
  //     background-color: #fff;
  //     &.active {
  //       border-color: #409EFF;
  //     }
  //   }
  //   .btn-prev,.btn-next {
  //     border: 1px solid #d9d9d9;
  //     background-color: #fff;
  //   }
  // }
}
</style>
