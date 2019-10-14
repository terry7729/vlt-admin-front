<template>
  <div class="vlt-card">
    <div class="vlt-edit-single">
      <el-form
        label-position="right"
        label-width="90px"
        :options="form"
        ref="form"
        class="device-add"
      >
        <!-- 基本信息 -->
        <!-- <div class="vlt-edit-wrap">
          <el-form-item label="户名全称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="银行接口类型">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="银行账号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="账户类别">
            <el-select v-model="form.environment" placeholder="请选择">
              <el-option value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账户属性">
            <el-select v-model="form.environment" placeholder="请选择">
              <el-option value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户行">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>-->
      </el-form>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      form: {
        type: "input",
        prop: "inputName",
        value: "",
        title: "输入框",
        placeholder: "请输入"
      }
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
