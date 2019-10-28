<template>
  <div class="login-container vlt-card">
    <div class="mid">
      <img :src="logoImg" class="companyLogo" />
      <div class="form-bd">
        <img :src="titleImg" class="title" />
        <div class="vlt-edit-single">
          <div class="inputAll">
            <base-form
              :formData="loginForm"
              labelWidth="140px"
              ref="loginForm"
              :rules="rules"
              direction="top"
              @change="changeForm"
            ></base-form>
          </div>
          <div class="registerPwd">
            <el-row>
              <el-button class="btn" @click="login">登录</el-button>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rules from "@/utils/rules"
import storage from "@/utils/storage"

export default {
  name: "login",
  data() {
    return {
      logoImg: require('@/assets/img/companyLogo.png'),
      titleImg: require('@/assets/img/title.png'),
      loginForm: [
        {
          type: "input-icon",
          title: "",
          prop: "account",
          value: "",
          placeholder: "请输入用户账号",
          icon: "user"
        },
        {
          type: "password",
          title: "",
          prop: "password",
          value: "",
          placeholder: "请输入用户密码",
          icon: "lock"
        }
      ],
      rules: {
        account: [
          { required: true, validator: rules.checkAccount, trigger: "blur"}
        ],
        password: [
          { required: true, validator: rules.checkPwd, trigger: "blur" }
        ]
      },
      param: null
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    login() {
      this.$refs.loginForm.validate(async val => {
        if (val === 'true') {
          const data = this.param;
          const res = await this.$api.getLogin({
            message: '登录成功',
            data
          });
          if (res && res.code === 0) {
            storage.set("token", res.data.token);
            storage.set("userInfo", res.data);
            this.$router.push({
              name: "entry"
            });
          }
        }
      })
    },
    changeForm(val) {
      this.param = val;
    },
  }
};
</script>


<style lang="less" scoped>
@import "./less/login.less";
</style>