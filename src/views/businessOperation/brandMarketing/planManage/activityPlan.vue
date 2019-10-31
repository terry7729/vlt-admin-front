<template>
  <div class="vlt-card active-plan">
    <test-form
      :options="formData"
      ref="baseForm"
      labelWidth="140px"
      :rules="rules"
      direction="right"
      @change="changeForm"
    >
      <!-- <el-select slot="slotA" placeholder="请选择会员等级"></el-select>
      <el-input slot="slotB" placeholder="请输入大厅编号"></el-input>
      <el-input slot="slotC" placeholder="请输入充值金额"></el-input>
      <el-input slot="slotD" v-model="pay" placeholder="请输入消费金额"></el-input>-->
    </test-form>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      pay: "",
      rules: {
        rule: ""
      },
      baseData: [
        {
          title: "活动名称",
          type: "input",
          prop: "name",
          value: "",
          disable: true
        },
        {
          title: "活动类型",
          type: "select",
          prop: "type",
          value: "",
          options: [
            { label: "充值赠送", value: "充值赠送" },
            { label: "消费赠送", value: "消费赠送" }
          ]
        },
        {
          title: "日期时间",
          type: "datetime-range",
          prop: "time",
          value: "",
          options: ["start", "end"]
        },
        { title: "活动简介", type: "textarea", prop: "intro", value: "" },
        {
          title: "活动管理方",
          type: "select",
          value: "",
          prop: "manage",
          options: [
            { label: "中彩", value: "中彩" },
            { label: "分中心", value: "分中心" }
          ]
        },
        {
          type: "select",
          title: "活动组织方",
          prop: "organ",
          value: "",
          options: [
            { label: "", value: "中彩" },
            { label: "", value: "广东分中心" }
          ]
        },
        {
          title: "适用群体",
          type: "checkbox",
          prop: "group",
          value: [],
          options: [
            { label: "游客", value: "游客" },
            { label: "新会员", value: "新会员" },
            { label: "老会员", value: "老会员" }
          ]
        },
        {
          type: "select",
          prop: "level",
          value: "",
          options: [
            { label: "", value: "lv1" },
            { label: "", value: "lv2" },
            { label: "", value: "lv3" }
          ]
        },
        {
          title: "活动区域",
          type: "cascader",
          prop: "area",
          value: [1, 60],
          options: [],
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            // multiple: true, // 多选
            checkStrictly: true
          }
        },

        {
          title: "活动大厅",
          type: "radio",
          prop: "lobby",
          value: "all",
          options: [
            { label: "区域内全部大厅", value: "all" },
            { label: "区域内指定大厅", value: "some" }
          ]
        },

        {
          type: "input",

          prop: "lobbyId",
          value: ""
        },
        {
          type: "checkbox",
          title: "活动目标",
          prop: "target",
          value: "",
          options: [{ label: "活动期间累计充值", value: "" }]
        },
        {
          type: "input",

          prop: "rechar",
          value: ""
        },

        {
          type: "checkbox",
          title: "",
          prop: "target",
          value: "",
          options: [{ label: "活动期间累计消费", value: "" }]
        },
        {
          type: "input",

          prop: "pay",
          value: ""
        },
        {
          title: "活动预算",
          type: "input",
          prop: "budget",
          value: ""
        },
        {
          type: "checkbox",
          title: "是否发布消息",
          prop: "info",
          value: [],
          options: [
            { label: "不发送", value: "不发送" },
            { label: "发送短信", value: "发送短信" },
            { label: "终端/APP发送", value: "终端/APP发送" },
            { label: "发送短信与终端/APP发送", value: "发送短信与终端/APP发送" }
          ]
        },
        {
          title: "消息内容",
          type: "textarea",
          prop: "remark",
          value: ""
        }
      ],
      formData: []
    };
  },
  created() {
    let form = {
      name: "",
      type: "",
      time: "",
      intro: "",
      manage: "",
      organ: "",
      group: "",
      level: "",
      area: "",
      lobby: "",
      lobbyId: "",
      target: "",
      rechar: "",
      pay: "",
      budget: "",
      info: "",
      remark: ""
    };
    this.formData = this.$formMethods.set(this.baseData, form);
    this.getInsData();
  },
  methods: {
    changeForm(val) {
      console.log("changeForm", val);
      let res = this.$formMethods.get(val); // 获取表单的值
      console.log("获取表单的值", res);
      // this.$formMethods.set(val, "c", 1); // 设置表单的值
    },
    // 获取机构数据
    getInsData() {
      const self = this;
      const data = {};
      (async data => {
        let res = await self.$api.QueryInsTree({ data });
        if (res && res.code == 0) {
          console.log("res", res.data);
          self.$set(self.baseData[8], "options", res.data);
          // self.formData[1].options = res.data;
          // self.cascaderOptions = res.data;
        } else {
          // self.$message.warning(res.msg)
        }
      })(data);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
