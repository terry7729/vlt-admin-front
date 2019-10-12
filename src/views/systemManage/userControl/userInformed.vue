<template>
  <div class="vlt-card">
    <div class="vlt-edit-double">
      <h2 class="title">用户编辑</h2>
      <div class="vlt-edit-wrap">
        <el-form ref="form" :model="form" :label-position="labelPosition">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="手机号码">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>

          <el-form-item label="邮箱">
            <el-input v-model="form.emile"></el-input>
          </el-form-item>

          <el-form-item label="用户状态">
            <el-select v-model="form.status" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属机构">
            <el-select v-model="form.organization" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属部门">
            <el-select v-model="form.department" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属机构编号">
            <el-input v-model="form.agencynumber"></el-input>
          </el-form-item>

          <el-form-item label="用户账号">
            <el-input v-model="form.account"></el-input>
          </el-form-item>

          <el-form-item label="用户角色">
            <el-select v-model="form.role" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-row class="el-form-item vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="save(form)">提交并保存</el-button>
          <el-button size="medium" @click="editShow = !editShow">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      form: {
        name: "",
        phone: "",
        emile: "",
        status: "",
        organization: "",
        department: "",
        agencynumber: "",
        account: "",
        role: ""
      }
    };
  },
  methods: {
    //表单提交事件
    save(val) {
      console.log(val);
      console.log("submit!");
    }
  }
};
</script>



<style lang="less">
@import "./less/index.less";
</style>