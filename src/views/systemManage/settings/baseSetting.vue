<template>
  <div class="vlt-card">
    <!-- 基础设置 -->
    <div class="vlt-edit-single">
      <div class="vlt-edit-wrap">
        <h2 class="title">用户登录</h2>
        <base-form></base-form>
          
        <h2 class="title">记账本位币</h2>
        <base-form ></base-form>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="save">提交</el-button>
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
        bet:"",
      },
      radio: "1"
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
  .vlt-edit-single .title{
    border-color: #fff;
  }
  .el-form.el-form--label-right{
    margin:0;
    padding:0;
  }
  .el-input{
    width:100px;
  }
 
</style>
