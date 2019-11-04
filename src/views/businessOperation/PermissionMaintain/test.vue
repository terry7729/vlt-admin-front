<template>
  <div>
    <div @click="btn">点击弹窗</div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <div class="vlt-edit-single">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="formName"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户角色" prop="roleName">
            <el-input v-model="ruleForm.roleName" placeholder="请选择用户角色"></el-input>
          </el-form-item>
          <el-form-item label="是否为负责人" prop="isManager">
            <el-radio v-model="ruleForm.radio" label="1">是</el-radio>
            <el-radio v-model="ruleForm.radio" label="2">否</el-radio>
          </el-form-item>
          <el-form-item label="角色权限" prop="sysCode">
            <el-cascader
              :options="options"
              placeholder="请选择角色权限"
              :props="{ multiple: true, checkStrictly: true ,label: 'moduleName', value: 'id',children: 'childModules'}"
              v-model="ruleForm.sysCode"
              @change="change"
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="描述" prop="remark">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="HandelSave('ruleForm')">保 存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules";
export default {
  data() {
    return {
      title: "编辑角色",
      options: [],
      dialogFormVisible: false,
      ruleForm: {
        roleName: "",
        radio: "1",
        sysCode: "",
        desc: ""
      },
      rules: {
        roleName: [
          {
            required: true,
            message: "请选择用户角色",
            trigger: "blur"
          }
        ],
        sysCode: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色权限",
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    btn() {
      this.dialogFormVisible = true;
      this.getRoleTypes();
    },
    async getRoleTypes() {
      let res = await this.$api.channelLimit();
      //console.log(res);
      this.options = res.data;
    },
    // HandelSave() {
    //   console.log(this.ruleForm);
    // },
    change(val) {
      console.log(val);
    },
    HandelSave(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
};
</script>

<style lang="less" scoped>
</style>
