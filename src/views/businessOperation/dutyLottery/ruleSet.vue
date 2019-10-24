<template>
  <div class="vlt-card rule-set">
    <h3 class="rule-title">责任设置</h3>

    <el-form ref="form" :model="form" label-width="112px" class="duty-type">
      <el-form-item label="责任限制类型">
        <el-select v-model="value" size="small" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="vlt-edit-double">
      <div class="vlt-edit-wrap">
        <el-form label-position="top" label-width="90px" :model="form" ref="form">
          <base-form
            :formData="formData"
            ref="baseForm"
            labelWidth="140px"
            direction="top"
            :rules="rule"
            @change="changeForm"
          ></base-form>
          <el-row class="el-form-item vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
            <el-button size="medium" @click="cancel">取消</el-button>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      form: {},
      rule: { rule: "" },
      formData: [
        {
          type: "select",
          title: "限制周期",
          prop: "period",
          options: [
            { label: "一天", value: "0" },
            { label: "一周", value: "1" },
            { label: "一个月", value: "2" }
          ]
        },
        { type: "input", title: "最大输额", prop: "name" },
        { type: "input", title: "最大投注", prop: "name" },
        { type: "input", title: "最大充值额", prop: "name" },
        { type: "input", title: "游戏时长提醒", prop: "name" },
        { type: "input", title: "投注总额提醒", prop: "name" },
        { type: "input", title: "游戏次数提醒", prop: "name" },
        { type: "textarea", title: "规则说明", prop: "remark" }
      ],
      options: [
        {
          value: "选项1",
          label: "全局限时限制"
        },
        {
          value: "选项2",
          label: "全局投注限额"
        },
        {
          value: "选项3",
          label: "全局最大输额"
        },
        {
          value: "选项4",
          label: "全局最大充值"
        },
        {
          value: "选项5",
          label: "全局信用卡充值限制"
        },
        {
          value: "选项6",
          label: "全局未成年购彩"
        }
      ],
      value: ""
    };
  },
  components: {},
  methods: {
    submit() {
      this.$router.push({ path: "dutyLottery" });
    },
    cancel() {
      this.$router.push({ path: "dutyLottery" });
    },
    changeForm() {}
  }
};
</script>

<style lang="less" scoped>
.rule-set {
  .rule-title {
    margin-left: 20px;
  }
  .duty-type {
    margin-top: 20px;
  }
}
</style>
