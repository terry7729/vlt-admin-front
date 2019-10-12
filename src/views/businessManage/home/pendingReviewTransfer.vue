<!-- 首页 - 概况 - 移交 -->

<template>
  <div class="vlt-card pading-review-transfer">
    <h3>移交[中心出库]步骤</h3>
      <el-row >
        <el-col :span="8" :offset="2">
          <el-form ref="form" :model="form" label-position="right" label-width="120px" size="small">
            <el-form-item label="步骤移交人：">
              <el-input v-model="form.name" placeholder="请输入步骤移交人"></el-input>
            </el-form-item>
            <el-form-item label="填写处理意见：">
              <el-input type="textarea"  v-model="form.content" placeholder="请输入处理意见"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="onSubmit" :loading="submitLoad">提交</el-button>
              <el-button size="small">取消</el-button>
            </el-form-item>
           </el-form>

        </el-col>
      </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        submitLoad: false,
        form: {
          name: '',
          content: ''
        }
      }
    },
    methods: {
      onSubmit () {
        this.submitLoad = true;
        console.log(this.form);
      }
    }
  }
</script>

<style lang="less">
.pading-review-transfer {
  .el-row {
    margin-top: 40px;
  }
}
</style>