<template>
  <div class="vlt-card">
    <div class="roleManage">
      <searchBar :options="roleManageoptions" :total="999">
        <controlBar slot="extend-bar" @select="roleManageAddclick" :options="roleManageAddbtn"></controlBar>
      </searchBar>
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
            <el-switch v-model="accounttype" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="detail(scope.row.id)">详情</el-button>
            <el-button type="primary" size="mini" @click="detail(scope.row.id)">详情</el-button>
            <el-button type="primary" size="mini" @click="detail(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      roleManageoptions: [
        {
          type: "select",
          prop: "roleManageUsername",
          value: "",
          title: "用户角色",
          placeholder: "请输入",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        {
          type: "input",
          prop: "roleManageCreater",
          value: "",
          title: "创建人",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "roleManageStatus",
          value: "",
          title: "用户状态",
          placeholder: "请输入",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        {
          type: "datetime-range",
          prop: "roleManageCreateDate",
          value: "",
          title: "创建时间",
          placeholder: ["开始时间", "结束时间"]
        }
      ],
      roleManageAddbtn: [{ name: "新增", type: "primary", icon: "plus" }]
    };
  },
  components: {},
  methods: {
    roleManageAddclick() {
      this.$router.push("roleManageAdd");
    }
  }
};
</script>

<style lang="less" scoped>
</style>
