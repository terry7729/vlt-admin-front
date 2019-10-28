<template>
  <div class="login-container vlt-card">
    <div class="mid">
      <img :src="logoImg" class="companyLogo" />
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
          <!-- <span class="register">注册</span> -->
          <el-link :underline="false" class="forgetPwd" @click="handleForgetPwd">修改密码</el-link>
          <el-row>
            <el-button class="btn" @click="login">登录</el-button>
          </el-row>
        </div>
      </div>
    </div>
    <div class="role-dialog">
      <el-dialog :visible.sync="dialogFormVisible" width="600px" custom-class="roleDialog">
        <div class="vlt-edit-single">
          <h2 class="title">修改密码</h2>
          <div class="vlt-edit-wrap">
            <base-form
              :formData="forgetForm"
              labelWidth="120px"
              ref="baseForm"
              :rules="rules"
              direction="right"
              @change="changeForm"
            ></base-form>
            <el-row class="vlt-edit-btn">
              <el-button type="primary" v-prevent="1000" size="medium" @ciclk="submit">提交并保存</el-button>
              <el-button size="medium" @click="cancel">取消</el-button>
            </el-row>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import rules from "@/utils/rules"
import storage from "@/utils/storage"

export default {
  name: "login",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      logoImg: require('@/assets/img/companyLogo.png'),
      titleImg: require('@/assets/img/title.png'),
      dialogFormVisible: false,
      newPassword: '',
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
      forgetForm: [
        {
          title: "请选择你的操作",
          type: "radio",
          prop: "passwordType",
          value: 1,
          options: [
            { label: "操作密码", value: 1 },
            { label: "登录密码", value: 2 }
          ]
        },
        {
          title: "请输入原始密码",
          type: "password",
          prop: "oldPassword",
          value: "",
          placeholder: "请输入",
          icon: "lock"
        },
        {
          title: "请输入新密码",
          type: "password",
          prop: "newPassword",
          value: "",
          placeholder: "请输入",
          icon: "lock"
        },
        {
          title: "请重复新密码",
          type: "password",
          prop: "rePassword",
          value: "",
          placeholder: "请输入",
          icon: "lock"
        }
      ],
      rules: {
        account: [
          { required: true, validator: rules.checkAccount, trigger: "blur"}
        ],
        password: [
          { required: true, validator: rules.checkPwd, trigger: "blur" }
        ],
        oldPassword: [
          { required: true, validator: rules.checkPwd, trigger: "blur" }
        ],
        newPassword: [
          { required: true, validator: rules.checkPwd, trigger: "blur" }
        ],
        rePassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        
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
            const token = res.data.token;
            storage.set("token", token);
            this.$router.push({
              name: "entry"
            });
          }
        }
      })
    },
    //表单change事件
    changeForm(val) {
      this.param = val;
      this.newPassword = val.newPassword;
      console.log(this.param);
    },
    //点击忘记密码
    handleForgetPwd() {
      this.dialogFormVisible = true;
    },
    // 弹框取消
    cancel() {
      this.dialogFormVisible = false;
    },
    // 弹框提交
    submit() {
      this.$refs.baseForm.validate(val => {
        console.log(val);
      });
    }
  },
  components: {}
};
</script>


<style lang="less" scoped>
@import "./less/login.less";
.login-container{
  background-image: url(./../../assets/img/backgroundImage.png);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px;
  .mid {
    width: 450px;
    height: 480px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    position: relative;
    .companyLogo {
      position: absolute;
      top: -85px;
      left: 140px;
      width: 170px;
      height: 170px;
    }
    .title {
      position: absolute;
      top: 136px;
      left: 46px;
      width: 359px;
    }
    .vlt-edit-single {
      position: absolute;
      top: 232px;
      left: 46px;
      .inputAll {
        margin-bottom: 70px;
      }
      .registerPwd {
        .btn {
          width: 359px;
          height: 46px;
          background: rgba(0, 29, 65, 1);
          border-radius: 4px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 255, 255, 1);
          line-height: 16px;
          margin-bottom: 48px;
        }
        .register {
          position: absolute;
          top: 120px;
          left: 260px;
          font-size: 12px;
          font-family: MicrosoftYaHei;
          color: rgba(43, 43, 43, 1);
          line-height: 14px;
        }
        .forgetPwd {
          position: absolute;
          top: 120px;
          left: 310px;
          font-size: 12px;
          font-family: MicrosoftYaHei;
          color: rgba(43, 43, 43, 1);
          line-height: 14px;
        }
      }
    }
  }
}
</style>