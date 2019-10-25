<template>
  <!-- 新增规则 -->
  <el-dialog
    :visible.sync="show"
    width="50%"
    title="修改规则"
    :before-close="close"
    class="dialog-form-list"
  >
    <div class="vlt-card">
      <!-- <h2 class="title">新增规则</h2> -->
      <div class="vlt-edit-wrap">
        <el-form label-position="right" label-width="90px" :model="form" ref="form">
          <base-form
            :formData="data2"
            labelWidth="100px"
            ref="baseForm"
            :rules="rules2"
            direction="right"
            @change="changeForm"
          ></base-form>
        </el-form>
        <el-row class="vlt-edit-btn" style="text-align: right">
          <el-button
            type="primary"
            v-prevent="1000"
            size="medium"
            @click="onSubmit"
            :loading="showLoading"
          >提交并保存</el-button>
          <el-button size="medium" @click="close">取消</el-button>
        </el-row>
      </div>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";

export default {
  name: "editBettingRule",
  props: {
    oData: {
      type: Object,
      default: 0
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showLoading: false,
      params: {
        channelId: "",
        channelName: "",
        circle: "",
        circleUnit: "",
        createBy: "",
        createTime: "",
        id: 0,
        insId: 0,
        insName: "",
        limitAmount: 0,
        limitNum: 0,
        limitPenNum: 0,
        status: 0,
        updateBy: "",
        updateTime: ""
      },
      data2: [
        {
          type: "select",
          title: "所属机构：",
          prop: "insId",
          options: [{ label: "中福彩", value: "1" }]
        },
        {
          type: "select",
          title: "所选渠道",
          prop: "channelId",
          options: [
            { label: "广东苏宁易购渠道", value: "1" },
            { label: "广东天猫商城渠道", value: "2" }
          ]
        },
        { type: "input", title: "周期", prop: "circle", class: "cycle" },
        {
          type: "select",
          title: "",
          prop: "circleUnit",
          class: "cycle-selection",
          options: [
            { label: "天", value: "day" },
            { label: "周", value: "week" },
            { label: "月", value: "month" },
            { label: "年", value: "year" }
          ]
        },
        { type: "input", title: "笔数", prop: "limitPenNum" },
        { type: "input", title: "限额", prop: "limitAmount" },
        { type: "input", title: "限制次数", prop: "limitNum" },
        { type: "switch", title: "是否启用", prop: "status" }
      ],

      rules2: {
        mixBet: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
      },
      form: {
        channelId: "1", //渠道id
        channelName: "张三", //渠道名称
        circle: "1", //周期
        circleUnit: "day", //周期单位
        createBy: "李四", // 创建人
        createTime: "", // 常见时间
        id: 0,
        insId: 0, //机构id
        insName: "中福彩", //机构名称
        limitAmount: 2580, //限额
        limitNum: 0, //限制次数
        limitPenNum: 0, //限制笔数
        status: 0, // 是否删除 1/是,2/否
        updateBy: "ss", // 更新人
        updateTime: "" // 更新时间
      },
      show: this.isShow,
      obData: this.oData
    };
  },
  watch: {
    isShow(value) {
      this.show = value;
      this.backfill(this.oData);
    },
    oData: {
      handler(newValue, oldValue) {
        this.backfill(newValue)
        
      },
      deep: true
    },
    obData: {
      handler (newVal, onlVal) {
        console.log('newVal', newVal);
        this.initParams();
      },
      deep: true
    }
  },
  components: {},
  methods: {
    initParams (data) {
      let arr = Object.keys(data);
      for (let i = 0; i < arr.length; i++) {
        console.log('------', arr[i]);
      }
    },
    backfill(newValue) {
      let arr = Object.keys(newValue);
      let aForm = this.data2;
      // console.log("this id", this.oData.id);
      for (let i = 0; i < aForm.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (aForm[i].prop == arr[j]) {
            aForm[i].value = this.oData[arr[j]];
          }
        }
      }
    },
    async submit() {
      const _this = this;
      this.showLoading = true;
      let data = _this.params;
      console.log('发送的数据', data);
      data.status = data.status ? 1 : 0;
      let result = await _this.$api.updateBettingRules({ data });
      if (result.code == 0) {
        _this.showLoading = false;
        _this.$message({
          message: result.msg,
          type: "success"
        });
        setTimeout(() => {
          _this.close();
        }, 1000);
      }
    },

    close() {
      this.$refs.baseForm.resetForm();
      this.$emit("closeDia");
    },
    onSubmit() {
      this.submit();
    },
    changeForm(val) {
      Object.assign(this.params, val);
      console.log(',,,',  this.params);
    },
    changeSelect(val) {
      console.log(this.form, val);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style lang="less">
.dialog-form-list {
  .el-select {
    width: 100%;
  }

  .el-form-item {
    &:nth-of-type(3),
    &:nth-of-type(4) {
      display: inline-block;
      // width: 200px;
      // .el-input {
      //   width: 100%;
      // }
    }
    &:nth-of-type(3) {
      width: 70%;
    }
    &:nth-of-type(4) {
      width: 30%;
      .el-form-item__content {
        margin-left: 40px !important;
      }
    }
  }
}
</style>
