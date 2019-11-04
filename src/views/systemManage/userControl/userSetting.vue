<template>
  <div class="user-setting-container">
    <div class="vlt-edit-single">
      <h2 class="title">用户设置</h2>
      <div class="vlt-edit-wrap">
        <el-upload
          class="avatar-upload"
          action
          accept="image/*"
          :show-file-list="false"
          :on-remove="handleRemove"
          :http-request="uploadImg"
        >
          <div class="avatar-box">
            <el-avatar class="avatar" :src="userInfo.avatar" v-if="userInfo.avatar"></el-avatar>
            <el-avatar icon="el-icon-user-solid" class="avatar" v-else></el-avatar>
            <div>
              <el-button type="text" size="small">上传头像</el-button>
            </div>
          </div>
        </el-upload>
        <base-form
          :formData="form"
          labelWidth="120px"
          ref="baseForm"
          :rules="rules"
          direction="right"
          @change="changeForm"
        ></base-form>
        <el-row class="btn-item">
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
          <el-button size="medium" @click="resetForm">重置</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import rules from "@/utils/rules";
import storage from "@/utils/storage";
export default {
  name: "userSetting",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      newPassword: "",
      userInfo: storage.get("userInfo") || {
        avatar: require("@/assets/img/avatar.jpg"),
        userName: "123",
        mobile: "123",
        account: "123",
        email: "123@qq.com"
      },
      form: [
        {
          title: "修改类型",
          type: "radio",
          prop: "type",
          value: "1",
          options: [
            // { label: "操作密码", value: "0" },
            { label: "登录密码", value: "1" }
          ]
        },
        {
          title: "用户账号",
          type: "input",
          prop: "account",
          value: "",
          disabled: true
        },
        {
          title: "用户姓名",
          type: "input",
          prop: "userName",
          value: "",
          disabled: true
        },
        {
          title: "手机号",
          type: "input",
          prop: "mobile",
          value: "",
          disabled: true
        },
        {
          title: "邮箱",
          type: "input",
          prop: "email",
          value: "",
          disabled: true
        },
        {
          title: "请输入旧密码",
          type: "password",
          prop: "password",
          value: "",
          placeholder: "请输入旧密码",
          icon: "lock"
        },
        {
          title: "请输入新密码",
          type: "password",
          prop: "newPassword",
          value: "",
          placeholder: "请输入新密码",
          icon: "lock"
        },
        {
          title: "请重复新密码",
          type: "password",
          prop: "rePassword",
          value: "",
          placeholder: "请重复新密码",
          icon: "lock"
        }
      ],
      rules: {
        password: [
          {
            required: true,
            validator: rules.checkPwd,
            trigger: ["blur", "change"]
          }
        ],
        newPassword: [
          {
            required: true,
            validator: rules.checkPwd,
            trigger: ["blur", "change"]
          }
        ],
        rePassword: [
          {
            required: true,
            validator: validatePass2,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  created() {
    this.form.forEach(item => {
      if (item.prop in this.userInfo) {
        item.value = this.userInfo[item.prop];
      }
    });
  },
  mounted() {},
  methods: {
    changeForm(val) {
      this.param = {
        ...val
      };
      delete this.param.rePassword;
      this.param.type = Number(val.type);
      this.newPassword = val.newPassword;
    },
    submit() {
      console.log("param", this.param);
      this.$refs.baseForm.validate(async val => {
        if (val === "true") {
          const res = await this.$api.updateUserPassword({
            message: "修改成功",
            data: this.param
          });
        }
      });
    },
    resetForm() {
      this.$refs.baseForm.resetForm();
    },
    // 文件上传
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    async uploadImg(files) {
      let formData = new FormData();
      formData.append("file", files.file);
      formData.append("refId", 1);
      formData.append("flag", true);
      formData.append("busType", 1);
      const res = await this.$api.uploadFile({
        data: formData,
        onUploadProgress(evt) {
          console.log("上传进度事件:", evt);
        }
      });
      if (res && res.code === 0) {
        console.log(res);
        this.param.userPath = res.data.filePath;
      }
    }
  }
};
</script>

<style lang="less">
@import "./less/index.less";
</style>