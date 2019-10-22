<template>
  <div class="vlt-card inputWidth">
    <!-- 基础设置 -->
    <div class="vlt-edit-single">
      <div class="vlt-edit-wrap">
        <h2 class="title">用户登录</h2>
        <base-form
          :formData="data1"
          ref="baseForm"
          labelWidth="110px"
          :rules="rules1"
          direction="right"
          @change="changeForm"
          style="border-bottom: 1px solid #e8eaec"
        ></base-form>

        <h2 class="title">记账本位币</h2>
        <base-form
          :formData="data2"
          ref="baseForm"
          :rules="rules1"
          direction="right"
          @change="changeForm"
          
        ></base-form>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交</el-button>
          <el-button size="medium" @click="editShow = !editShow">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "../../../utils/rules";
export default {
  name: "",
  data() {
    return {
      params: {},
      data1: [
        {
          title: "是否记住用户名",
          type: "radio",
          prop: "userName",
          value: "",
          options: [{ label:"是", value: "1" }, { label: "否", value: "0" }]
        },
        {
          title: "是否保存密码",
          type: "radio",
          prop: "savepwd",
          value: "",
          options:  [{ label:"是", value: "1" }, { label: "否", value: "0" }]
        }
      ],
      data2: [
        {
          title: "代码",
          type: "input",
          prop: "code",
          value: ""
        },
        {
          title: "小数位",
          type: "select",
          prop: "decimalPlace",
          value: ""
        },
        {
          title: "名称",
          type: "input",
          prop: "name",
          value: ""
        }
      ],
      radio: "1",
      rules1: {}
    };
  },
  components: {},
  methods: {
    changeForm(val) {
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
    },
    submit() {
      this.$refs.baseForm.validate(val => {
        console.log(val);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.vlt-edit-single .title {
  border-color: #fff;
}
 

</style>
