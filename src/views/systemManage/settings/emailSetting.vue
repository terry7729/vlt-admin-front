<template>
  <div class="vlt-card">
    <!-- 邮件设置 -->
    <div class="vlt-edit-single">
      <div class="vlt-edit-wrap">
        <base-form
          :formData="data1"
          ref="baseForm"
          labelWidth="110px"
          :rules="rules1"
          direction="right"
          @change="changeForm"
        ></base-form>
      </div>
    </div>
    <div class="vlt-edit-over">
      <div class="vlt-edit-wrap">
        <el-form label-position="right" label-width="90px" :model="form" ref="form">
          <base-form
            :formData="data2"
            ref="baseForm"
            :rules="rules1"
            direction="right"
            @change="changeForm"
          ></base-form>
          <el-button
            type="primary"
            v-prevent="1000"
            size="medium"
            @click="add"
            style="margin:4px 0px 21px 30px"
          >增加</el-button>
          <base-form
            :formData="data3"
            ref="baseForm"
            :rules="rules1"
            direction="right"
            @change="changeForm"
          ></base-form>
          <el-button
            type="primary"
            v-prevent="1000"
            size="medium"
            @click="add"
            style="margin:4px 0px 21px 30px"
          >增加</el-button>
        </el-form>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交</el-button>
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
      params: {},
      data1: [
        {
          title: "邮件发送",
          type: "radio",
          prop: "userName",
          value: "",
          options: [{ key: 1, value: "开启" }, { key: 0, value: "关闭" }]
        },
        { title: "SMTP服务器地址", type: "input", prop: "code", value: "" },
        { title: "SMTP端口号", type: "input", prop: "code", value: "" },
        { title: "SMTP用户名", type: "input", prop: "code", value: "" },
        { title: "SMTP密码", type: "input", prop: "code", value: "" },
        { title: "发信人地址", type: "input", prop: "code", value: "" },
        { title: "发信人名称", type: "input", prop: "code", value: "" }
      ],
      data2: [
        { title: "发送内容", type: "select", prop: "code", value: "" },
        { title: "接收人", type: "select", prop: "code", value: "" },
        { title: "", type: "select", prop: "code", value: "" }
      ],
      data3: [
        { title: "", type: "select", prop: "code", value: "" },
        { title: "接收人", type: "select", prop: "code", value: "" },
        { title: "", type: "select", prop: "code", value: "" }
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
