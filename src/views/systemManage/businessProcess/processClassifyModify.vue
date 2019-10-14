<template>
  <div class="vlt-card">
    <!-- 单列表单公共样式 -->
    <div class="vlt-edit-single">
      <h2 class="title">添加子类别</h2>
      <div class="vlt-edit-wrap">
        <el-form label-position="right" label-width="90px" :model="form" ref="form">
          <el-form-item label="上级类别">
            <el-input v-model="form.singleAmount"></el-input>
          </el-form-item>
          <el-form-item label="类别名称">
            <el-input v-model="form.minMultiple"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="form.organistatus"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
        </el-form>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="save">提交并保存</el-button>
          <el-button size="medium" @click="editShow = !editShow">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {

      form: {
        singleAmount: "",
        minMultiple: "",
        organistatus: true,
      }
    };
  },
  components: {},
  methods: {
     
  }
};
</script>

<style lang="less" scoped>
</style>
