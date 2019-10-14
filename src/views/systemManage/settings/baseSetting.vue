<template>
  <div class="vlt-card">
    <!-- 基础设置 -->
    <div class="vlt-edit-single">
      <div class="vlt-edit-wrap">
        <h2 class="title">用户登录</h2>
        <el-form label-position="right" label-width="130px" :model="form" ref="form">
          <el-form-item label="是否记住用户名">
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="2">否</el-radio>
          </el-form-item>
          <el-form-item label="是否保存密码">
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="2">否</el-radio>
          </el-form-item>
        </el-form>
        <h2 class="title">记账本位币</h2>
        <el-form label-position="right" label-width="130px" :model="form" ref="form">
          <el-form-item label="代码">
              <el-input v-model="form.singleAmount" placeholder="RMB"></el-input>
            </el-form-item>
            <el-form-item label="小数位" prop="bet" class="decimalplace">
              <el-select v-model="form.bet" placeholder="2">
                <el-option
                  v-for="item in betOption"
                  @click.native="changeBet(item)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="form.minMultiple" placeholder="人民币"></el-input>
            </el-form-item>
        </el-form>
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
