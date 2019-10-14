<template>
  <div class="vlt-card">
    <search-bar :options="options" :total="999"></search-bar>
    <div class="create-btn">
      <el-button type="primary" size="mini" @click="createActive">新建活动</el-button>
      <el-button size="mini">批量撤销</el-button>
    </div>
    <div class="el_table">
      <el-table :data="tableData" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" width="55"></el-table-column>
        <el-table-column prop="activeNum" label="活动编号"></el-table-column>
        <el-table-column prop="activeName" label="活动名称"></el-table-column>
        <el-table-column prop="State" label="状态"></el-table-column>
        <el-table-column prop="activeStart" label="活动开始时间"></el-table-column>
        <el-table-column prop="activeEnd" label="活动结束时间"></el-table-column>
        <el-table-column prop="createPerson" label="创建人"></el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="detail(scope.row.id)">查看</el-button>
            <el-button type="primary" size="mini" @click="detail(scope.row.id)">复用</el-button>
            <el-button type="primary" size="mini" @click="detail(scope.row.id)">撤销</el-button>
          </template>
        </el-table-column>
      </el-table>
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
        },
        {
          type: "datetime",
          prop: "telephoneNum",
          value: "",
          title: "开始时间",
          placeholder: "请选择"
        },
        {
          type: "datetime",
          prop: "accountStatus",
          value: "",
          title: "结束时间",
          placeholder: "请选择",
        
        }
      ]
    };
  },
  methods: {
    createActive() {
      this.$router.push({ path: "createActivity" });
    },
    detail(){
      this.$router.push({ path: "planDetail" })
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