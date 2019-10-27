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
            <el-button
              type="primary"
              v-prevent="1000"
              size="medium"
              @click="AddSubmit"
            >提交并保存</el-button>
            <el-button size="medium" @click="AddCancel">取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "",
  data() {
    return {
      // formData: [],
      // 新增表单类型
      
      AddData: [
        {
          type: "input",
          title: "假日名称",
          value: "",
          prop: "holidayName"
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
          prop: "channelIdentity",
          options: [{ label:"是", value: "1" }, { label: "否", value: "0" }]
        },
        {
          type: "switch",
          title: "是否停用",
          value: "",
          prop: "address",
          options: [{ label:"是", value: "1" }, { label: "否", value: "0" }]
        },
    
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
    };
  },
  created() {
    this.init();
  },

  components: {},
  methods: {
    //获得账户角色数据
    async init() {
      let resul = await this.$api.addHolInfo();
      console.log(resul);
      this.AddData= resul.data;
    },
    // 新增表单change事件
    AddChangeForm(form) {
      this.param = form;
       console.log( 2222,this.param);
    },
    // 提交按钮
    async AddSubmit() {
      // console.log(this.formData);
      let data = this.param;
      let result = await this.$api.addHolInfo({ data });
      this.$router.push("holidayParametersManagement");
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
