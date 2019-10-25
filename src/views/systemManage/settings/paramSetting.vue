<template>
  <div class="vlt-card">
    <!-- 参数设置 -->
    <div class="vlt-edit-single">
      <div class="vlt-edit-wrap">
        <h2 class="title">消息提醒</h2>
        <base-form
          :formData="data1"
          ref="baseForm"
          labelWidth="120px"
          :rules="rules1"
          direction="right"
          @change="changeForm"
          style="border-bottom: 1px solid #e8eaec"
        ></base-form>
        <h2 class="title">上缴方式</h2>
        <base-form
          :formData="data2"
          ref="baseForm"
          labelWidth="120px"
          :rules="rules1"
          direction="right"
          @change="changeForm"
          style="border-bottom: 1px solid #e8eaec"
        ></base-form>
        <h2 class="title">财务参数</h2>
        <base-form
          :formData="data3"
          ref="baseForm"
          labelWidth="120px"
          :rules="rules1"
          direction="right"
          @change="changeForm"
          style="border-bottom: 1px solid #e8eaec"
        ></base-form>
        <h2 class="title">税务参数</h2>
        <base-form
          :formData="data4"
          ref="baseForm"
          labelWidth="120px"
          :rules="rules1"
          direction="right"
          @change="changeForm"
        ></base-form>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交</el-button>
          <el-button size="medium" @click="editShow = !editShow">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import rules from "../../../utils/rules";
export default {
  name: "",
  data() {
    return {
      params: {},
      data1: [
        {
          title: "发送提醒",
          type: "radio",
          prop: "sendWarn",
          value: "",
          options: [{ label:"开启", value: "1" }, { label: "关闭", value: "0" }]
        },
        {
          title: "选择提醒方式",
          type: "select",
          prop: "warnWay",
          value: ""
        },
        {
          title: "过期预警(提前天数)",
          type: "input",
          prop: "pastWarn",
          value: ""
        }
      ],
      data2: [
        {
          title: "是否实扣",
          type: "radio",
          prop: "realBuckle",
          value: "",
          options:  [{ label:"是", value: "1" }, { label: "否", value: "0" }]
        },
        {
          title: "选择非实扣方式",
          type: "select",
          prop: "norealBuckle",
          value: ""
        }
      ],
      data3: [
        {
          title: "是否自动转账",
          type: "radio",
          prop: "autoTransfer",
          value: "",
          options:  [{ label:"是", value: "1" }, { label: "否", value: "0" }]
        },
        {
          title: "转账日期",
          type: "radio",
          prop: "transferDate",
          value: "",
          options: [
            { label:"每日", value: "0" },
            { label: "每周", value: "1" },
            { label: "每月", value: "2" },
            { label: "指定日期", value: "3" }
          ]
        },
        {
          title: "转账时间",
          type: "datetime",
          prop: "transferTime",
          value: ""
        }
      ],
      data4: [
        {
          title: "单位名称",
          type: "input",
          prop: "companyName",
          value: ""
        },
        {
          title: "税号",
          type: "input",
          prop: " dutyParagraph",
          value: ""
        },
        {
          title: "税率",
          type: "input",
          prop: "taxRate",
          value: ""
        }
      ],
      radio: "1",
      rules1: {}
    };
  },
  components: {},
  async created() {
   
    let reslt = await this.$api.config();
    console.log(reslt)
  },
  methods: {
    changeForm(val) {
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
    },
    submit() {
      this.$refs.baseForm.validate(val => {
        console.log(val);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.vlt-edit-single .title {
  border-color: #fff;
}

</style>
