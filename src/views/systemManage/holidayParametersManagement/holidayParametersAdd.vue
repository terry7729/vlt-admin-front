<template>
  <div class="vlt-card">
    <div class="AccountAdd">
      <div class="vlt-edit-single">
        <h2 class="title">新增</h2>
        <div class="vlt-edit-wrap">
          <base-form
            :formData="AddData"
            ref="baseForm"
            labelWidth="140px"
            direction="right"
            @change="AddChangeForm"
          ></base-form>
          <el-row class="el-form-item vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="AddSubmit">提交并保存</el-button>
            <el-button size="medium" @click="AddCancel">取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import moment from "moment";
export default {
  name: "",
  data() {
    return {
      // formData: [],
      // 新增表单类型

      AddData: [
        {
          type: "select",
          title: "假日名称",
          value: "",
          prop: "holidayName",
          options: [
            { label: "春节", value: 0 },
            { label: "清明节", value: 1 },
            { label: "中秋节", value: 2 },
            { label: "国庆节", value: 3 }
          ]
        },
        {
          type: "datetime",
          title: "开始时间",
          value: "",
          prop: "beginTime"
        },
        {
          type: "datetime",
          title: "结束时间",
          value: "",
          prop: "endTime"
        },

        {
          type: "datetime",
          title: "弃奖开始日期",
          prop: "discardBeginTime",
          value: "",
          options: []
        },
        {
          type: "datetime",
          title: "弃奖结束日期",
          value: "",
          prop: "discardEndTime"
        },
        {
          type: "switch",
          title: "是否停销",
          value: "",
          prop: "marketStatus",
          options: [{ label: "是", value: "0" }, { label: "否", value: "1" }]
        },
        {
          type: "switch",
          title: "是否停用",
          value: "",
          prop: "holidayStatus",
          options: [{ label: "是", value: "0" }, { label: "否", value: "1" }]
        }
      ],
      // 新增表单验证

      // operationManageLimit: [
      //   {
      //     type: "array",
      //     required: true,
      //     message: "请选择账号权限",
      //     trigger: "change"
      //   }
      // ]

      param: null,
      holidayType: "",
      holidayName: "",
      time: {
        discardBeginTime: "",
        discardEndTime: "",
        beginTime: "",
        endTime: ""
      }
    };
  },
  created() {
    //this.init();
  },

  components: {},
  methods: {
    //获得账户角色数据
    // async init() {
    //   let resul = await this.$api.addHolInfo();
    //   console.log(resul);
    //   this.AddData= resul.data;
    // },
    // 新增表单change事件
    AddChangeForm(form) {
      this.param = form;
      let options = {
        0: "春节",
        1: "清明节",
        2: "中秋节",
        3: "国庆"
      };
      this.holidayType = this.param.holidayName;
      this.holidayName = options[this.param.holidayName];
      console.log(this.param);

      // this.param.holidayType = this.param.holidayName
      // this.param.holidayName = options[this.param.holidayType];
      // console.log("param:", this.param);
      console.log(this.holidayType, this.holidayName);
    },
    // 提交按钮
    async AddSubmit() {
      // console.log(this.formData);
      let data = this.param;
      data.holidayType = this.holidayType;
      data.holidayName = this.holidayName;
      if (data) {
        data.beginTime = Date.parse(data.beginTime);
        data.endTime = Date.parse(data.endTime);
        data.discardBeginTime = Date.parse(data.discardBeginTime);
        data.discardEndTime = Date.parse(data.discardEndTime);
        console.log(data);
      }

      let result = await this.$api.addHolInfo({ data: data });
      //this.$router.push("operationAccountManage");
      this.$router.go(-1);
      console.log(result);
      //console.log(this.$refs.baseForm.form);
      //console.log(formdata);
    },
    // 取消按钮
    AddCancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
