<template>
  <div class="vlt-card">
    <div class="top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="表单名称">
          <el-input v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-switch v-model="value1" active-text="启动" inactive-text="禁用"></el-switch>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bottom">
      <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <h2>表单控件</h2>
         
        </div>
      </el-col>
      <el-col :span="11">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      value1: true
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang="less">

.el-switch {
  padding: 20px 40px;
}
.top {
  border: 1px solid #000;
  // display: flex;
  // justify-content: space-between;
  text-align: center;
  margin: -18px -16px;
}
.el-form.demo-form-inline.el-form--inline {
  margin: 20px auto 0;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 0px;
}
.bg-purple-dark {
  border: 1px solid #000;
}
.bg-purple {
  border: 1px solid #000;
}
.bg-purple-light {
  border: 1px solid #000;
}
.grid-content {
  min-height: 500px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.bottom{
  position: relative;
  top:30px;
  left:0px;
}
.grid-content.bg-purple{
  display:flex;
  justify-content: space-between;
}
</style>