<template>
  <div class="vlt-card">
    <search-bar :options="options" :total="999"></search-bar>

    <div class="create-btn">
      <el-button type="primary" size="mini" @click="allotTask">分配任务</el-button>
    </div>
    <div class="el_table">
      <el-table :data="tableData" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" width="55"></el-table-column>
        <el-table-column prop="activeNum" label="活动编号"></el-table-column>
        <el-table-column prop="activeName" label="活动名称"></el-table-column>
        <el-table-column prop="State" label="执行计划名称"></el-table-column>
        <el-table-column prop="activeStart" label="责任人"></el-table-column>
        <el-table-column prop="activeEnd" label="执行人"></el-table-column>
        <el-table-column prop="createPerson" label="任务名称"></el-table-column>
        <el-table-column prop="createDate" label="任务状态"></el-table-column>
        <el-table-column prop="createPerson" label="使用终端"></el-table-column>
        <el-table-column prop="createDate" label="任务进度"></el-table-column>
        <el-table-column prop="createPerson" label="更新时间"></el-table-column>
        <el-table-column prop="createDate" label="完成时间"></el-table-column>
        <el-table-column label="操作" width="176">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="detail(scope.row.id)">查看</el-button>
            <el-button type="primary" size="mini" @click="progressUpdate(scope.row.id)">进度更新</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="任务进度" :visible.sync="dialogFormVisible">
      <section class="comp-item">
        <cell title="基础信息">
          <base-info :infoList="infoList"></base-info>
        </cell>
      </section>
      <el-form :model="form">
        <el-form-item label="任务进度" :label-width="formLabelWidth">
          <el-input v-model="form.progress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="任务进度" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveProgress">保存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "name",
  data() {
    return {
      textarea: "",
      dialogFormVisible: false,
      formLabelWidth: '400',
      form: { progress: "", explain: "" },
      tableData: [
        {
          id: 1,
          activeNum: "007",
          activeName: "促销",
          State: "进行中",
          activeStart: "2019-02-25 01:50:06",
          activeEnd: "2019-05-25 01:50:06",
          createPerson: "王二",
          createDate: "2019-01-25 01:50:06"
        }
      ],
      options: [
        {
          type: "input",
          prop: "channelName",
          value: "",
          title: "活动编码",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "telephoneNum",
          value: "",
          title: "活动名称",
          placeholder: "请输入"
        }
      ],
      infoList: [
        { title: "活动编号", value: "", prop: "accountID" },
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
      ]
    };
  },
  methods: {
    allotTask() {
      this.$router.push({ path: "allotTask" });
    },
    detail(id) {
      this.$router.push({ path: "activityDetail", query: { id } });
    },
    progressUpdate(id) {
      this.dialogFormVisible = true;
    },
    saveProgress() {
      this.dialogFormVisible = false;
    }
  },
  computed: {},
  created() {},
  mounted() {},
  components: {}
};
</script>


<style lang="less" scoped>
.create-btn {
  margin-bottom: 10px;
}
</style>