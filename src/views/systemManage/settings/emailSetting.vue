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
    <div>
      <div>
        <div >  
          <el-form
            :model="dynamicValidateForm"
            ref="dynamicValidateForm"
            label-width="100px"
            class="demo-dynamic"
          >
            <el-form-item
              prop="email"
              label="邮箱"
              :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
            >
              <el-input v-model="dynamicValidateForm.email"></el-input>
            </el-form-item>
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :label="'域名' + index"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
              :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
            >
              <el-input v-model="domain.value"></el-input>
              <el-button @click.prevent="removeDomain(domain)">删除</el-button>
            </el-form-item>
            <el-form-item>
              
              <el-button @click="addDomain">新增域名</el-button>
            
            </el-form-item>
          </el-form>
        </div>
        

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
          prop: "emailSend",
          value: "",
          options: [{ key: 1, value: "开启" }, { key: 0, value: "关闭" }]
        },
        {
          title: "SMTP服务器地址",
          type: "input",
          prop: "serverSite",
          value: ""
        },
        { title: "SMTP端口号", type: "input", prop: "portNumber", value: "" },
        { title: "SMTP用户名", type: "input", prop: "userName", value: "" },
        { title: "SMTP密码", type: "input", prop: "pwd", value: "" },
        { title: "发信人地址", type: "input", prop: "senderSite", value: "" },
        { title: "发信人名称", type: "input", prop: "senderName", value: "" }
      ],
      data2: [
        { title: "发送内容", type: "select", prop: "sendContent", value: "" },
        {
          title: "接收人",
          type: "select",
          prop: "recipientDepartment",
          value: ""
        },
        { title: "", type: "select", prop: "recipientStaff", value: "" }
      ],
      data3: [
        { title: "", type: "select", prop: "sendContent", value: "" },
        {
          title: "接收人",
          type: "select",
          prop: "recipientDepartment",
          value: ""
        },
        { title: "", type: "select", prop: "recipientStaff", value: "" }
      ],
      radio: "1",
      rules1: {},
      workerData: {
        region: ""
      },
       dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        }
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
    },
      
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      }
   
  }
};
</script>

<style lang="less" scoped>
.vlt-edit-single .title {
  border-color: #fff;
}
.el-form-item {
  width: 300px;
}
</style>
