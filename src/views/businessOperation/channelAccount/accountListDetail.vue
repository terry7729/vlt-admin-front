<template>
  <div class="vlt-card account_detail">
    <div class="account_detail_box">
      <div class="account_detail_data">
        <div class="first_row">
          <h3>账户资料</h3>
          <div class="compile_datum" v-if="enter===0" @click="enterNum">编辑</div>
          <div class="compile_datum" v-if="enter===1" @click="enterSave">保存</div>
        </div>
        <div class="account_detail_vessel">
          <div class="account_detail_classify" v-for="item in data" :key="item.id">
            <span>{{item.name}}:</span>
            <span></span>
          </div>
        </div>
      </div>
      <div class="account_detail_data">
        <h3>账户资料</h3>
        <div class="account_detail_vessel">
          <div class="account_detail_classify" v-for="item in data" :key="item.id">
            <span>{{item.name}}:</span>
            <span></span>
          </div>
        </div>
      </div>
      <div class="last_bottom_list">
        <h3>拥有渠道列表</h3>
        <el-table :data="tableData" border>
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="accountName" label="账户名称"></el-table-column>
          <el-table-column prop="accountNum" label="账号"></el-table-column>
          <el-table-column prop="accountType" label="账户类型"></el-table-column>
          <el-table-column prop="principalName" label="负责人姓名"></el-table-column>
          <el-table-column prop="telephoneNum" label="手机号码"></el-table-column>
          <el-table-column prop="createDate" label="创建时间"></el-table-column>
          <el-table-column label="账户状态" prop="createDate"></el-table-column>
          <el-table-column prop="createDate" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handelListDetail(scope.row.id)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enter: 0,
      data: [
        { id: 1, name: "账户ID" },
        { id: 2, name: "账户名称" },
        { id: 3, name: "负责人" },
        { id: 4, name: "手机号码" },
        { id: 5, name: "账户状态" },
        { id: 6, name: "账户类型" },
        { id: 7, name: "所属区域" },
        { id: 8, name: "详细地址" },
        { id: 9, name: "创建时间" },
        { id: 10, name: "更新时间" }
      ],
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
        }
      ]
    };
  },
  methods: {
    enterNum() {
      this.enter = 1;
    },
    enterSave() {},
    handelListDetail(id) {
      console.log(id);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./less/index.less";
</style>