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
        <div>
          <el-form
            label-position="right"
            label-width="90px"
            ref="form"
            :model="formDevice"
            :rules="rules"
            class="device-form"
          >
            <el-form-item
              v-for="(item,index) in deviceData"
              :key="index"
              :label="`${item.title}${index+1}`"
            >
              <el-select v-model="item.type" placeholder="请选择一个报表" >
                <el-option
                  v-for="(list,index) in item.optionsType"
                  :key="index"
                  :label="list.label"
                  :value="list"
                ></el-option>
              </el-select>
              
            </el-form-item>
            <el-form-item
              v-for="(item1,index) in deviceData1"
              :key="index"
              :label="`${item1.title}${index+1}`"
            >
              <el-select v-model="item1.model" placeholder="请选择一个部门" >
                <el-option
                  v-for="(list, index) in item1.optionsModel"
                  :key="index"
                  :label="list.label"
                  :value="list"
                ></el-option>
              </el-select>
              <el-select v-model="item1.model" placeholder="请选择一个员工" >
                <el-option
                  v-for="(list, index) in item1.optionsStaff"
                  :key="index"
                  :label="list.label"
                  :value="list"
                ></el-option>
              </el-select>
              <el-button v-if="index!==0" type="text" class="delete" @click="deleteDevice(index)">删除</el-button>
            </el-form-item>
            
          </el-form>
          
          <el-button class="addDevice" @click="addDevice" icon="el-icon-plus" style="margin-bottom:20px">添加</el-button>
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
      
      radio: "1",
      rules1: {},
      rules: {},
      workerData: {
        region: ""
      },
      dynamicValidateForm: {
        domains: [
          {
            value: ""
          }
        ],
        email: ""
      },
      deviceData: [
        {
          title: "发送内容",
          propType: "type",
          optionsType: [
            { label: "类型一", value: 1 },
            { label: "类型二", value: 2 }
          ],
        },
      ],
      deviceData1: [
        {
          title: "接收人",
          optionsModel: "model",
          optionsStaff:"staff",
          optionsModel: [
            { label: "型号一", value: 1 },
            { label: "型号二", value: 2 }
          ],
          optionsStaff:[
            { label: "张三", value: 1 },
            { label: "李四", value: 2 }
          ]
        },
      ]
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
    addDevice() {
      let cloneData = JSON.parse(JSON.stringify(this.deviceData[0]));
      cloneData.propType = `${cloneData.propType}${this.deviceData.length}`;
      this.$set(this.deviceData, this.deviceData.length, cloneData);

      let cloneData1 = JSON.parse(JSON.stringify(this.deviceData1[0]));
      cloneData1.propModel = `${cloneData1.propModel}${this.deviceData1.length}`;
      cloneData1.propStaff=`${cloneData1.propStaff}${this.deviceData1.length}`;
      this.$set(this.deviceData1, this.deviceData1.length, cloneData1);
    },
    deleteDevice(index) {
      this.deviceData.splice(index, 1);
      this.deviceData1.splice(index, 1);
      console.log("删除", this.deviceData);
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




