<template>
  <div class="login-container vlt-card">
    <div class="mid">
      <img src="./../../assets/img/companyLogo.png" class="companyLogo" />
      <img src="./../../assets/img/title.png" class="title" />
      <div class="vlt-edit-single">
        <div class="inputAll">
          <base-form
            :formData="data1"
            labelWidth="140px"
            ref="baseForm"
            :rules="rules"
            direction="top"
            @change="changeForm"
          ></base-form>
        </div>
        <div class="registerPwd">
          <!-- <span class="register">注册</span> -->
          <el-link :underline="false" class="register">注册</el-link>
          <!-- <span class="forgetPwd">忘记密码</span> -->
          <el-link :underline="false" class="forgetPwd" @click="handleForgetPwd">忘记密码</el-link>
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
              :formData="formData"
              labelWidth="120px"
              ref="baseForm"
              :rules="rules"
              direction="right"
              @change="changeForm"
            ></base-form>
            <el-row class="vlt-edit-btn">
              <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
              <el-button size="medium" @click="cancel">取消</el-button>
            </el-row>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import rules from "../../utils/rules";
export default {
  name: "login",
  data() {
    return {
      dialogFormVisible: false,
      changeForm: "",
      input1: "",
      input2: "",
      data1: [
        {
          type: "input-icon",
          title: "",
          prop: "username",
          value: "",
          placeholder: "请输入用户账号",
          icon:"user",
        },
        {
          type: "password",
          title: "",
          prop: "pwd",
          value: "",
          placeholder: "请输入用户密码",
          icon:"lock",
        }
      ],
      formData: [
        {
          title: "请选择你的操作",
          type: "radio",
          prop: "emailSend",
          value: "",
          options: [
            { label: "操作密码", value: "1" },
            { label: "登录密码", value: "0" }
          ]
        },
        { title: "请输入原始登录密码", type: "password", prop: "serverSite", value: "",placeholder: "请输入" },
        { title: "请输入新登录密码", type: "password", prop: "portNumber", value: "",placeholder: "请输入" },
        { title: "请重复新登录密码", type: "password", prop: "userName", value: "",placeholder: "请输入"}
      ],
      rules: {
        username: [
          { required: true, validator: rules.checkAccount,  trigger: "blur" }
        ],
        pwd: [
          { required: true, validator: rules.checkPwd,  trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    login() {
      this.$router.push({
        path: "entry"
      });
    },
    handleForgetPwd() {
      this.dialogFormVisible = true;
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    submit() {
      this.$refs.baseForm.validate((val)=>{
        console.log(val)
      });
    },
  },
  components: {}
};
</script>


<style lang="less" scoped>
@import "./less/login.less";
.login-container.vlt-card {
  background-image: url(./../../assets/img/backgroundImage.png);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

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
      width:170px;
      height:170px;
    }
    .title {
      position: absolute;
      top: 136px;
      left: 46px;
      width:359px;
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