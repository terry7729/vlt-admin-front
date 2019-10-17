<!-- 首页 - 概况 - 发布消息 -->
<template>
  <div class="vlt-card">
    <h3 class="title">基本信息</h3>
    <el-row class="form-box">
      <el-col :span="8" :offset="3">
        <el-form ref="form" :model="form" label-position="left" label-width="100px" size="small">
          <el-form-item label="标题*：">
            <el-input v-model="form.name" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="收件人*：">
            <el-row :span="24">
              <el-col>
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="张三" value="张三"></el-option>
              <el-option label="李四" value="李四"></el-option>
            </el-select>
            </el-col>
          </el-row>
          </el-form-item>
          <el-form-item label="消息内容：">
            <el-input type="textarea"  v-model="form.desc" placeholder="请输入参与活动的规则、要求等"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit" :loading="submitLoad">发布</el-button>
            <el-button size="small">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'sendMessage',
  data() {
    return {
      submitLoad: false,
      form: {
        name: "",
        region: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.submitLoad = true;
      console.log(this.form);
    }
  }
};
</script>

<style lang="less" scoped>
.form-box {
  margin-top: 40px;
  .el-select {
    width: 100%;
  }
}
</style>