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
        <el-form :inline="true" :model="Form" label-width="90px" class="demo-form-inline" ref="Form">
          <el-form-item label="发送内容">
            <el-select v-model="Form.region" placeholder="请选择一个报表">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接收人">
            <el-select v-model="Form.region" placeholder="请选择一个部门">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="Form.region" placeholder="请选择一个员工">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="add">增加</el-button>
          </el-form-item>
          <el-form
            v-for="(domain, index) in Form.domains"
            :label="'域名' + index"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
          >
            <el-form-item>
            <el-select v-model="Form.region" placeholder="请选择一个员工">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
          </el-form>
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
      Form: {
        region: ""
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
        var index = this.Form.domains.indexOf(item)
        if (index !== -1) {
          this.Form.domains.splice(index, 1)
        }
      },
      add() {
        this.Form.domains.push({
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
