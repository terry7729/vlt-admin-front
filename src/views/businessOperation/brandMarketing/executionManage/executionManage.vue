<template>
  <div class="vlt-card execu-manage">
    <search-bar :options="options" :total="999" @search="search"></search-bar>
    <el-button type="primary" size="small" @click="allotTask">分配任务</el-button>
    <el-table :data="executionData" border style="margin-top:15px;">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column prop="activeNum" label="活动编号"></el-table-column>
      <el-table-column prop="activeName" label="活动名称"></el-table-column>
      <el-table-column prop="planName" label="执行计划名称"></el-table-column>
      <el-table-column prop="person" label="责任人"></el-table-column>
      <el-table-column prop="activePerson" label="执行人"></el-table-column>
      <el-table-column prop="taskName" label="任务名称"></el-table-column>
      <el-table-column prop="taskState" label="任务状态"></el-table-column>
      <el-table-column prop="user" label="使用终端"></el-table-column>
      <el-table-column prop="taskProgress" label="任务进度"></el-table-column>
      <el-table-column prop="updataTime" label="更新时间"></el-table-column>
      <el-table-column prop="overTime" label="完成时间"></el-table-column>
      <el-table-column label="操作" width="176">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="detail(scope.row.id)">查看</el-button>
          <el-button type="primary" size="mini" @click="progressUpdate(scope.row.id)">进度更新</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="任务进度" :visible.sync="progressDialog">
      <panel-static title="基础信息">
        <base-info :infoList="baseInfo"></base-info>
      </panel-static>
      <panel-static title="任务进度">
        <el-form :model="progressForm" ref="allotForm">
          <base-form
            :formData="progressData"
            labelWidth="70px"
            :rules="rules1"
            direction="left"
            @change="changeForm"
            class="task-progress"
          ></base-form>
        </el-form>
      </panel-static>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveProgress">保存</el-button>
        <el-button @click="progressDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "name",
  data() {
    return {
      options: [
        {
          type: "input",
          prop: "activeNum",
          value: "",
          title: "活动编码"
        },
        {
          type: "input",
          prop: "activeName",
          value: "",
          title: "活动名称"
        }
      ],
      executionData: [
        {
          activeNum: "007",
          activeName: "促销",
          planName: "A计划",
          person: "赵四",
          activePerson: "王五",
          taskName: "六六",
          taskState: "进行中",
          user: "柜员机",
          taskProgress: "80%",
          updataTime: "2019-01-25 01:50:06",
          overTime: "2019-05-25 01:50:06"
        }
      ],
      rules1: { rule: "" },
      progressDialog: false,
      baseInfo: [
        { title: "活动编号", value: "1", prop: "accountID" },
        { title: "活动名称", value: "", prop: "accountName" },
        { title: "执行编号", value: "", prop: "principal" },
        { title: "执行计划名称", value: "", prop: "telephoneNum" },
        { title: "责任人", value: "", prop: "accountStatus" },
        { title: "执行人", value: "", prop: "accountType" },
        { title: "任务名称", value: "", prop: "area" },
        { title: "任务描述", value: "", prop: "detailAdress" },
        { title: "执行时间", value: "", prop: "createDate" },
        { title: "截止时间", value: "", prop: "pullDate" },
        { title: "状态", value: "", prop: "pullDate" }
      ],
      progressForm: {},
      progressData: [
        { title: "任务进度", type: "input", prop: "name", value: "" },
        { title: "任务说明", type: "textarea", prop: "all", value: "" }
      ]
    };
  },
  methods: {
    search(params) {
      console.info(params);
    },
    allotTask() {
      this.$router.push({ path: "allotTask" });
    },
    detail(id) {
      this.$router.push({ path: "executionDetail", query: { id } });
    },
    progressUpdate(id) {
      this.progressDialog = true;
    },
    saveProgress() {
      this.progressDialog = false;
    },
    changeForm() {}
  },
  computed: {},
  created() {},
  mounted() {},
  components: {}
};
</script>


<style lang="less" scoped>
.execu-manage {
  .task-progress {
    width: 500px;
    margin-top: 20px;
    margin-left: 50px;
  }
}
</style>