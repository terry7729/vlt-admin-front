<template>
  <div style="padding: 25px; background-color:#fff" class="el_box">
    <el-alert class="el_alert_info" :closable="false" v-for="(item,index) in data" :key="index">
      <i :class="item.icon" style="color:#2d8cf0" class="el_icon"></i>
      <span>{{item.info}}</span>搜索
      <span>"{{item.name}}"</span>共搜索到
      <span style="color:#2d8cf0">{{item.num}}</span>
      项条数据
    </el-alert>
    <div class="el_table">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="id" label="序号" width="104"></el-table-column>
        <el-table-column prop="accountName" label="账户名称" width="100"></el-table-column>
        <el-table-column prop="accountNum" label="账号" width="130"></el-table-column>
        <el-table-column prop="accountType" label="账户类型" width="150"></el-table-column>
        <el-table-column prop="principalName" label="负责人姓名" width="150"></el-table-column>
        <el-table-column prop="telephoneNum" label="手机号码" width="180"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="180"></el-table-column>
        <el-table-column label="账户状态" width="140" prop="terminalStatus"></el-table-column>
        <el-table-column label="操作" width="130" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detail(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        background
        @size-change="changeSize"
        @current-change="changeCurrent"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20]"
        :page-size="10"
        v-if="totalCount > pageSize"
        layout="prev, pager, next, sizes, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "name",
  data() {
    return {
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
          terminalStatus: "启用 | 禁用",
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
          terminalStatus: "启用 | 禁用",
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
          terminalStatus: "启用 | 禁用",
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
          terminalStatus: "启用 | 禁用",
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
          terminalStatus: "启用 | 禁用",
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
  components: {},
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
