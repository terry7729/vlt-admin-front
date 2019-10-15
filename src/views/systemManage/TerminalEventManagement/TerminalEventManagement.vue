<template>
  <div class="vlt-card">
    <div class="TerminSearch">
      <search-bar
        class="search-bar-demo"
        @search="search"
        :options="searchOptions"
        :total="999"
        labelWidth="80px"
      >
        <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
      </search-bar>
    </div>
    <div class="TerminTabel">
      <el-table :data="tableData" border style="width: 100%; margin-top: 10px;">
        <el-table-column type="index" prop="date" label="序号"></el-table-column>
        <el-table-column prop="province" label="省名"></el-table-column>
        <el-table-column prop="salesNumbers" label="销售厅编号"></el-table-column>
        <el-table-column prop="salesName" label="销售厅名称"></el-table-column>
        <el-table-column prop="terminalType" label="终端类型"></el-table-column>
        <el-table-column prop="terminalNumbers" label="终端编号"></el-table-column>
        <el-table-column prop="occurTime" label="发生时间"></el-table-column>
        <el-table-column prop="incidentType" label="事件类型"></el-table-column>
        <el-table-column prop="executeResult" label="执行结果"></el-table-column>
      </el-table>
      <div class="pagintion">
        <table-paging
          :current-page="1"
          :page-size="10"
          :total="100"
          @handleSizeChange="pageSizeChange"
          @handleCurrentChange="pageCurrentChange"
        ></table-paging>
      </div>
    </div>

    <!--弹出框-->
    <div class="termina">
      <el-dialog title :visible.sync="dialogFormVisible" custom-class="TerminaDialog">
        <div class="vlt-edit-single">
          <h2 class="title">编辑</h2>
          <div class="vlt-edit-wrap">
            <base-form
              :formData="data2"
              labelWidth="140px"
              ref="baseForm"
              :rules="rules2"
              direction="right"
              @change="changeForm"
            ></base-form>

            <el-row class="vlt-edit-btn">
              <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
              <el-button size="medium" @click="cancel">取消</el-button>
            </el-row>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      parms: {},
      dialogFormVisible: false,
      data2: [
        {
          type: "select",
          title: "终端类型",
          prop: "terminalType",
          value: "",
          options: [{ label: "男", value: "0" }, { label: "女", value: "1" }]
        },
        {
          type: "select",
          title: "所属渠道",
          prop: "subtoChannel",
          value: "",
          options: [{ label: "男", value: "0" }, { label: "女", value: "1" }]
        },
        {
          type: "select",
          title: "设备型号",
          prop: "unitType",
          value: "",
          options: [{ label: "男", value: "0" }, { label: "女", value: "1" }]
        },

        {
          type: "select",
          title: "所属省份",
          prop: "subtoProvince",
          value: "",
          options: [{ label: "男", value: "0" }, { label: "女", value: "1" }]
        },
        {
          type: "select",
          title: "所属地市",
          prop: "subtoCity",
          value: "",
          options: [{ label: "男", value: "0" }, { label: "女", value: "1" }]
        },
        {
          type: "select",
          title: "所属大厅",
          prop: "subtoSales",
          value: "",
          options: [{ label: "男", value: "0" }, { label: "女", value: "1" }]
        },
        {
          type: "input",
          title: "终端编号",
          prop: "terminalNumbers",
          value: ""
        },
        {
          type: "select",
          title: "事件类型",
          prop: "incidentType",
          value: "",
          options: [{ label: "男", value: "0" }, { label: "女", value: "1" }]
        }
      ],
      tableData: [
        {
          province: "河北",
          salesNumbers: 114110,
          salesName: "西四胡同",
          terminalType: "游戏机",
          terminalNumbers: "1151330",
          occurTime: "2012-03-05 14:21:00",
          incidentType: "注销账户",
          executeResult: "成功"
        },
        {
          province: "河北",
          salesNumbers: 114110,
          salesName: "西四胡同",
          terminalType: "游戏机",
          terminalNumbers: "1151330",
          occurTime: "2012-03-05 14:21:00",
          incidentType: "注销账户",
          executeResult: "成功"
        },
        {
          province: "河北",
          salesNumbers: 114110,
          salesName: "西四胡同",
          terminalType: "游戏机",
          terminalNumbers: "1151330",
          occurTime: "2012-03-05 14:21:00",
          incidentType: "注销账户",
          executeResult: "成功"
        },
        {
          province: "河北",
          salesNumbers: 114110,
          salesName: "西四胡同",
          terminalType: "游戏机",
          terminalNumbers: "1151330",
          occurTime: "2012-03-05 14:21:00",
          incidentType: "注销账户",
          executeResult: "成功"
        },
        {
          province: "河北",
          salesNumbers: 114110,
          salesName: "西四胡同",
          terminalType: "游戏机",
          terminalNumbers: "1151330",
          occurTime: "2012-03-05 14:21:00",
          incidentType: "注销账户",
          executeResult: "成功"
        },
        {
          province: "河北",
          salesNumbers: 114110,
          salesName: "西四胡同",
          terminalType: "游戏机",
          terminalNumbers: "1151330",
          occurTime: "2012-03-05 14:21:00",
          incidentType: "注销账户",
          executeResult: "成功"
        },
        {
          province: "河北",
          salesNumbers: 114110,
          salesName: "西四胡同",
          terminalType: "游戏机",
          terminalNumbers: "1151330",
          occurTime: "2012-03-05 14:21:00",
          incidentType: "注销账户",
          executeResult: "成功"
        },
        {
          province: "河北",
          salesNumbers: 114110,
          salesName: "西四胡同",
          terminalType: "游戏机",
          terminalNumbers: "1151330",
          occurTime: "2012-03-05 14:21:00",
          incidentType: "注销账户",
          executeResult: "成功"
        },
        {
          province: "河北",
          salesNumbers: 114110,
          salesName: "西四胡同",
          terminalType: "游戏机",
          terminalNumbers: "1151330",
          occurTime: "2012-03-05 14:21:00",
          incidentType: "注销账户",
          executeResult: "成功"
        },
        {
          province: "河北",
          salesNumbers: 114110,
          salesName: "西四胡同",
          terminalType: "游戏机",
          terminalNumbers: "1151330",
          occurTime: "2012-03-05 14:21:00",
          incidentType: "注销账户",
          executeResult: "成功"
        }
      ],
      controlOptions: [
        { name: "发送", type: "primary", icon: "s-promotion" },
        { name: "导出", type: "primary", icon: "download" },
        { name: "打印", type: "primary", icon: "printer" }
      ],
      searchOptions: [
        {
          title: "终端类型",
          type: "select",
          prop: "terminalType",
          value: "",
          options: [
            {
              label: "选项1",
              value: 1
            },
            {
              label: "选项2",
              value: 2
            }
          ]
        },
        {
          title: "所属渠道",
          type: "select",
          prop: "subtoChannel",
          value: "",
          options: [
            {
              label: "选项1",
              value: 1
            },
            {
              label: "选项2",
              value: 2
            }
          ]
        },
        {
          title: "设备型号",
          type: "select",
          prop: "unitType",
          value: "",
          options: [
            {
              label: "选项1",
              value: 1
            },
            {
              label: "选项2",
              value: 2
            }
          ]
        },
        {
          title: "所属省份",
          type: "select",
          prop: "subtoProvince",
          value: "",
          options: [
            {
              label: "选项1",
              value: 1
            },
            {
              label: "选项2",
              value: 2
            }
          ]
        },
        {
          title: "所属地市",
          type: "select",
          prop: "subtoCity",
          value: "",
          options: [
            {
              label: "选项1",
              value: 1
            },
            {
              label: "选项2",
              value: 2
            }
          ]
        },
        {
          title: "所属大厅",
          type: "select",
          prop: "subtoSales",
          value: "",
          options: [
            {
              label: "选项1",
              value: 1
            },
            {
              label: "选项2",
              value: 2
            }
          ]
        },
        {
          title: "终端编号",
          type: "input",
          prop: "terminalNumbers",
          value: ""
        },
        {
          title: "事件类型",
          type: "select",
          prop: "incidentType",
          value: "",
          options: [
            {
              label: "选项1",
              value: 1
            },
            {
              label: "选项2",
              value: 2
            }
          ]
        }
      ],
      rules2: {
        test: [{ required: true, message: "请选择" }],
        status: [{ required: true, message: "请选择" }],
        all: [{ required: true, message: "请选择" }]
      }
    };
  },
  components: {},

  methods: {
    search() {}, //搜索按钮
    submit() {
      //确认提交
      console.log(this.parms);
    },
    selectBtn(val) {
      //点击按钮类型
      if (val.name === "发送") {
        this.dialogFormVisible = true;
      }

      console.log(val);
    },
    cancel() {
      //取消弹框
      this.dialogFormVisible = false;
    },
    pageSizeChange(val) {
      //每页显示条数
      console.log(val);
    },
    pageCurrentChange(val) {
      //当前显示页数
      console.log(val);
    },
    changeForm(val) {
      console.log(val);

      this.parms = val;
      console.log("派发出来的参数", this.parms);
    }
  }
};
</script>

<style lang="less" >
.TerminaDialog {
  width: 700px;
  border-radius: 20px;
  .el-dialog__header {
    padding: 0;
  }
}
</style>
