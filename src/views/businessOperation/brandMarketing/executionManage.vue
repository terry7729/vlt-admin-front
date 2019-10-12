<template>
  <div class="vlt-card">
    <search-bar :options="options" :total="999"></search-bar>
    <div class="create-btn">
      <el-button type="primary" size="mini" @click="createActive">分配任务</el-button>
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
            <el-button type="primary" size="mini" @click="detail(scope.row.id)">进度更新</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table_paging">
      <pagination class="table_paging_right"></pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "name",
  data() {
    return {
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
      ]
    };
  },
  methods: {
    createActive() {},
    detail(id) {
      this.$router.push({ path: "activityDetail", query: { id } });
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