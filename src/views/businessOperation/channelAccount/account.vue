<template>
  <div class="vlt-card el_box">
    <search-bar :options="options" :total="999"></search-bar>

    <div class="el_table">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="accountName" label="账户名称"></el-table-column>
        <el-table-column prop="accountNum" label="账号"></el-table-column>
        <el-table-column prop="accountType" label="账户类型"></el-table-column>
        <el-table-column prop="principalName" label="负责人姓名"></el-table-column>
        <el-table-column prop="telephoneNum" label="手机号码"></el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>
        <el-table-column label="账户状态">
          <template>
            <div>
              <el-button type="primary" size="mini">启动</el-button>

              <el-button type="danger" size="mini">禁止</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="detail(scope.row.id)">详情</el-button>
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
import { mapState } from "vuex";
export default {
  name: "name",
  data() {
    return {
      options: [
        {
          type: "input",
          prop: "channelName",
          value: "",
          title: "渠道名称",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "telephoneNum",
          value: "",
          title: "手机号码",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "telephoneNum",
          value: "",
          title: "手机号码",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "accountStatus",
          value: "",
          title: "账户状态",
          placeholder: "请输入",
          options: [
            {
              label: "启用",
              value: 1
            },
            {
              label: "冻结",
              value: 2
            }
          ]
        }
      ],
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      tableData: [
        {
          id: 1,
          accountName: "广东省",
          accountNum: "上海市普陀区金沙江路 1518 弄",
          accountNum: "赵",
          accountType: "自营",
          principalName: "赵",
          telephoneNum: "13800131358",
          createDate: "2019-02-25 01:50:06",

          operation: "详情"
        },
        {
          id: 2,
          accountName: "广东省",
          accountNum: "上海市普陀区金沙江路 1518 弄",
          accountNum: "赵",
          accountType: "自营",
          principalName: "赵",
          telephoneNum: "13800131358",
          createDate: "2019-02-25 01:50:06",

          operation: "详情"
        },
        {
          id: 3,
          accountName: "广东省",
          accountNum: "上海市普陀区金沙江路 1518 弄",
          accountNum: "赵",
          accountType: "自营",
          principalName: "赵",
          telephoneNum: "13800131358",
          createDate: "2019-02-25 01:50:06",

          operation: "详情"
        },
        {
          id: 4,
          accountName: "广东省",
          accountNum: "上海市普陀区金沙江路 1518 弄",
          accountNum: "赵",
          accountType: "自营",
          principalName: "赵",
          telephoneNum: "13800131358",
          createDate: "2019-02-25 01:50:06",

          operation: "详情"
        },
        {
          id: 5,
          accountName: "广东省",
          accountNum: "上海市普陀区金沙江路 1518 弄",
          accountNum: "赵",
          accountType: "自营",
          principalName: "赵",
          telephoneNum: "13800131358",
          createDate: "2019-02-25 01:50:06",

          operation: "详情"
        }
      ]
    };
  },
  computed: {
    ...mapState(["data"])
  },
  created() {},
  mounted() {},
  components: {  },
  methods: {
    changeSize() {},
    changeCurrent() {},
    detail(id) {
      this.$router.push({
        path: "accountList/accountListDetail",
        query: { id }
      });
    }
  }
};
</script>


<style lang="less" scoped>
@import "./less/index.less";
</style>
