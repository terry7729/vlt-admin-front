<template>
  <div class="vlt-card">
    <search-bar :options="options" :total="999" @search="search"></search-bar>
    <div style="margin-top:10px">
      <el-button type="primary" size="small" @click="createActive">
        <i class="el-icon-plus"></i> 新建活动
      </el-button>
      <el-button size="small">批量撤销</el-button>
    </div>

    <el-table :data="activeList" border>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column prop="activeNum" label="活动编号"></el-table-column>
      <el-table-column prop="activeName" label="活动名称"></el-table-column>
      <el-table-column prop="State" label="状态"></el-table-column>
      <el-table-column prop="activeStart" label="活动开始时间"></el-table-column>
      <el-table-column prop="activeEnd" label="活动结束时间"></el-table-column>
      <el-table-column prop="createPerson" label="创建人"></el-table-column>
      <el-table-column prop="createDate" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="planDetail(scope.row.id)">查看</el-button>
          <el-button type="primary" size="mini" @click="reuse(scope.row.id)">复用</el-button>
          <el-button type="danger" size="mini">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      activeList: [
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
          prop: "activeNum",
          value: "",
          title: "活动编码"
        },
        {
          type: "input",
          prop: "activeName",
          value: "",
          title: "活动名称"
        },
        {
          type: "datetime",
          prop: "startTime",
          value: "",
          title: "开始时间",
          placeholder: "请选择"
        },
        {
          type: "datetime",
          prop: "endTime",
          value: "",
          title: "结束时间"
        }
      ]
    };
  },
  methods: {
    search(params) {
      console.info("search", params);
    },
    createActive() {
      this.$router.push({ path: "createActivity" });
    },
    planDetail() {
      this.$router.push({ path: "planDetail" });
    },
    reuse() {
      this.$router.push({ path: "activityPlan" });
    }
  },
  computed: {},
  created() {},
  mounted() {},
  components: {}
};
</script>


<style lang="less" scoped>
</style>