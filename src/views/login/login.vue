<template>
  <div class="login-container vlt-card">
    <div class="mid">
      <img src="./../../assets/img/companyLogo.png" class="companyLogo" />
      <img src="./../../assets/img/title.png" class="title" />
      <div class="vlt-edit-single">
        <div class="inputall">
          <base-form
              :formData="data1"
              labelWidth="140px"
              ref="baseForm"
              :rules="rules1"
              direction="top"
              @change="changeForm"
            ></base-form>
        </div>
        <div class="bottom">
          <span class="register">注册</span>
          <span class="forgetPwd">忘记密码</span>
          <el-row>
            <el-button class="btn" @click="login">登录</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      input1:"",
      input2:"",
      rules1: {},
      data1:[
        { type: "input", title: "", prop: "userName",value: "",placeholder:'请输入用户名' },
        { type: "input", title: "", prop: "pwd",value: "" ,placeholder:'请输入用户名'},
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    login(){
      this.$router.push({
        path:'entry'
      })
    }
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
  display:flex;
  justify-content: center;
  align-items: center;
 
  .mid {
    width: 490px;
    height: 520px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    position: relative;
    .companyLogo {
      position: absolute;
      top: -102px;
      left: 143px;
    }
    .title {
      position: absolute;
      top: 156px;
      left: 60px;
    }
    .vlt-edit-single {
      position: absolute;
      top: 242px;
      left: 60px;
      .inputall {
        margin-bottom: 90px;
      }
      .bottom {
        .btn {
          width: 368px;
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
          top: 150px;
          left: 240px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(43, 43, 43, 1);
          line-height: 14px;
        }
        .forgetPwd {
          position: absolute;
          top: 150px;
          left: 300px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(43, 43, 43, 1);
          line-height: 14px;
        }
      }
    }
  }
}
</style>