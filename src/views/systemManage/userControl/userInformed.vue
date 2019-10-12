<template>
  <div class="vlt-card">
    <div class="informed">
      <span>用户编缉</span>
    </div>
    <div class="user-inform">
      <el-form ref="form" :model="form" :label-position="labelPosition" size="mini">
        <el-row :gutter="100">
          <el-col :span="18" :gutter="1">
            <el-col :span="10">
              <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="手机号码">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="邮箱">
                <el-input v-model="form.emile"></el-input>
              </el-form-item>
            </el-col>
             
            <el-col :span="10">
              <el-form-item label="用户状态">
                <el-select v-model="form.status" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
              <el-col :span="10">
              <el-form-item label="所属机构">
                  <el-select v-model="form.organization" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
  
            <el-col :span="10">
              <el-form-item label="所属部门">
                <el-select v-model="form.department" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所属机构编号">
                <el-input v-model="form.agencynumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="用户账号">
                <el-input v-model="form.account"></el-input>
              </el-form-item>
            </el-col>
         
            <el-col :span="10">
              <el-form-item label="用户角色">
                 <el-select v-model="form.role" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <div style="padding-left:50px">
          <el-form-item>
            <el-button type="primary" @click="onSubmit(form)" size="mini">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </div>
      </el-form>
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
        agencynumber:'',
        account:'',
        role:""

      }
    };
  },
  methods: {
    onSubmit(val) {
        console.log(val)
      console.log("submit!");
    }
  }
};
</script>



<style lang="less">
@import "./less/index.less";
</style>