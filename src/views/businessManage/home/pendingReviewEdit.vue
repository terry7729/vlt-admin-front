<!-- 首页 - 概况 - 审核处理 -->

<template>
  <div class="vlt-card module-edit-pending-review">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="XXX业务信息" name="first">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="基本信息" name="1">
            <div>基本信息内容</div>
            <div></div>
          </el-collapse-item>
          <el-collapse-item title="处理记录" name="2">
            <el-form ref="form" :model="form" label-width="80px">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column label="处理记录：鼠标点击处理记录可查看详情">
                <el-table-column prop="date" label="序号" width="180"></el-table-column>
                <el-table-column prop="name" label="步骤名" width="180"></el-table-column>
                <el-table-column prop="address" label="处理人"></el-table-column>
                <el-table-column prop="address" label="下一步"></el-table-column>
                <el-table-column prop="address" label="处理意见"></el-table-column>
                <el-table-column prop="address" label="处理时间"></el-table-column>
              </el-table-column>
            </el-table>
            <el-form-item label="活动形式" class="mt20">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item class="btn-list">
              <el-row>
                <el-button size="small" type="primary">提交到-XXX</el-button>
                <el-button size="small" type="warning">退回到-XXX</el-button>
                <el-button size="small" type="warning">强制归档</el-button>
                <el-button size="small" type="info">导出档案</el-button>
                <el-button size="small" type="info">打印预览</el-button>
              </el-row>
            </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="流程步骤设置" name="second">
        流程步骤 
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "editPendingReview",
  data() {
    return {
      rowData: {},
      activeName: "first",
      activeNames: ["1"],

      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ],
      form: {
        desc: ''
      }
    };
  },
  created() {
    const id = this.$route.query.id;
    this.getRow(id);
  },
  methods: {
    getRow(id) {
      if (id) {
        console.log(id);
        // get request

        // const self = this;
        // self.eventBus.$on('pendingReviewInfo', (row) => {
        //   console.log('row', row)
        //   self.rowData = row;
        // });
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="less">
.module-edit-pending-review {
  padding: 20px;
  .el-tabs__item {
    font-size: 16px;
  }
  .el-tabs__content {
    .el-collapse {
      border: 0;
    }

    .el-form {
      padding: 20px 30px;
      // .el-table__header-wrapper {
      //   table {
      //     tr {
      //       td,th {
      //         padding: 3px 0;
      //         font-size: 12px;
      //       }
      //     }
      //     thead {
      //       tr {
      //         th {
      //           background-color: #fff;
      //           div {
      //             color: #333333;
      //             font-weight: 400;
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      // .el-table td {
      //   padding: 3px 0;
      //   font-size: 12px;
      // }
    }

    .el-collapse-item__header {
      justify-content: flex-start;
      font-size: 16px;
      color: #666666;
      font-weight: 600px;
      border-color: #c9c9c9;
      .el-collapse-item__arrow {
        margin-left: 20px;
        transform: rotate(90deg);
        color: #1890ff;
        &.el-collapse-item__arrow.is-active {
          transform: rotate(-90deg);
        }
      }
    }
    .el-textarea__inner {
      width: 30%;
      min-width: 300px;
    }
    .btn-list {
      .el-form-item__content {
        margin-left: 0;
        text-align: center;
      }
    }
  }
}
</style>