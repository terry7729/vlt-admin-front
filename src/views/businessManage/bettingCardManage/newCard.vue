<template>
  <div class="vlt-card betting-new-card">
    <div class="vlt-edit-single">
      <h2 class="title">投注卡生成 - 新建卡片</h2>
      <div class="vlt-edit-wrap">
        <base-form
          :formData="formDatas"
          labelWidth="140px"
          ref="baseForm"
          :rules="rule"
          direction="right"
          @change="changeForm"
        ></base-form>
        <el-row class="vlt-edit-btn">
          <el-button
            type="primary"
            v-prevent="1000"
            size="medium"
            @click="submit"
            :loading="showLoading"
          >生成并导出</el-button>
          <el-button size="medium" @click="close">取 消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "CreateCard",
  data() {
    return {
      showLoading: false,
      show: this.showForm,
      params: {
        batch: "",
        bettingCardId: 0,
        bettingCardType: 0,
        cardMakingQuantity: 0,
        createBy: "",
        createTime: "",
        insId: 0,
        insName: "",
        remark: "",
        status: 0,
        updateBy: "",
        updateTime: ""
      },
      formDatas: [
        {
          type: "cascader",
          prop: "insId",
          value: "",
          title: "所属机构",
          placeholder: "请选择",
          options: [{ label: "中福彩", value: "1" }]
        },
        {
          type: "select",
          title: "投注卡类型：",
          prop: "bettingCardType",
          options: [
            { label: "普通卡", value: 1 },
            { label: "会员卡", value: 2 },
            { label: "试玩卡", value: 3 }
          ]
        },
        { type: "input", title: "发卡数量：", prop: "cardMakingQuantity", value: '' },
        { type: "textarea", title: "备注", prop: "remark" }
      ],
      rule: {
        insId: [{ required: true, trigger: "blur" }],
        bettingCardType: [{ required: true, trigger: "blur" }],
        cardMakingQuantity: [{ required: false, validator: rules.numberVal, trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    changeForm(val) {
      Object.assign(this.params, val);
    },
    handleClose() {
      console.log("close");
    },
    close() {
      this.$router.back();
    },
    async submit() {
      const _this = this;
      _this.showLoading = true;
      let data = _this.params;
      console.log("提交的数据", data);
      // data.status = data.status ? 1 : 2;
      let result = await _this.$api.createCardGeneration({ data });
      if (result.code == 0) {
        _this.showLoading = false;
        _this.$message({
          message: result.msg,
          type: "success"
        });
        setTimeout(() => {
          _this.$router.back();
        }, 1000);
      }
    },
    onSubmit() {
      console.log("formData", this.params);
      this.close();
    }
  }
};
</script>

<style lang="less">
// .betting-new-card {
//   .el-form-item {
//     &:nth-of-type(7),
//     &:nth-of-type(8) {
//       display: inline-block;
//       width: 200px;
//     }
//     &:nth-of-type(8) {
//       margin-left: 40px;
//     }
//   }
//   .el-input.cycle {
//     width: 50% !important;
//   }
//   .el-select.cycle-selection {
//     width: 40% !important;
//   }
// }
</style>

