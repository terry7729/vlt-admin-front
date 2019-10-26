<template>
  <div class="vlt-card">
    <!-- 参数设置 -->
    <div class="vlt-edit-single">
      <div class="vlt-edit-wrap">
        <h2 class="title">消息提醒</h2>
        <base-form
          :formData="damessageReminding"
          ref="baseForm"
          labelWidth="120px"
          :rules="rules1"
          direction="right"
          @change="changeForm1"
          style="border-bottom: 1px solid #e8eaec"
        ></base-form>
        <h2 class="title">上缴方式</h2>
        <base-form
          :formData="payWay"
          ref="baseForm"
          labelWidth="120px"
          :rules="rules1"
          direction="right"
          @change="changeForm2"
          style="border-bottom: 1px solid #e8eaec"
        ></base-form>
        <h2 class="title">财务参数</h2>
        <base-form
          :formData="finance"
          ref="baseForm"
          labelWidth="120px"
          :rules="rules1"
          direction="right"
          @change="changeForm3"
          style="border-bottom: 1px solid #e8eaec"
        ></base-form>
        <h2 class="title">税务参数</h2>
        <base-form
          :formData="taxParameters"
          ref="baseForm"
          labelWidth="120px"
          :rules="rules1"
          direction="right"
          @change="changeForm4"
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
      params1:{},
      params2:{},
      params3:{},
      params4:{},
      damessageReminding: [
        {
          title: "发送提醒",
          type: "radio",
          prop: "keyType",
          value: "",
          options: [
            { label: "开启", value: "1" },
            { label: "关闭", value: "0" }
          ]
        },
        {
          title: "选择提醒方式",
          type: "select",
          prop: "warnWay",
          value: "",
          options: [
            { label: "邮件通知", value: "1" },
            { label: "短信通知", value: "0" }
          ]
        },
        {
          title: "过期预警(提前天数)",
          type: "input",
          prop: "pastWarn",
          value: "",
          placeholder: "30天"
        }
      ],
      payWay: [
        {
          title: "是否实扣",
          type: "radio",
          prop: "realBuckle",
          value: "",
          options: [{ label: "是", value: "1" }, { label: "否", value: "0" }]
        },
        {
          title: "选择非实扣方式",
          type: "select",
          prop: "norealBuckle",
          value: "",
          options: [
            { label: "周扣", value: "1" },
            { label: "月扣", value: "0" }
          ]
        }
      ],
      finance: [
        {
          title: "是否自动转账",
          type: "radio",
          prop: "autoTransfer",
          value: "",
          options: [{ label: "是", value: "1" }, { label: "否", value: "0" }]
        },
        {
          title: "转账日期",
          type: "radio",
          prop: "transferDate",
          value: "",
          options: [
            { label: "每日", value: "0" },
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
      taxParameters: [
        {
          title: "单位名称",
          type: "input",
          prop: "companyName",
          value: "",
          placeholder: "中国福彩中心小组"
        },
        {
          title: "税号",
          type: "input",
          prop: " dutyParagraph",
          value: "",
          placeholder: "20190007123"
        },
        {
          title: "税率",
          type: "input",
          prop: "taxRate",
          value: "",
          placeholder: "20%"
        }
      ],
      radio: "1",
      rules1: {},
      formall: {},
    };
  },
  components: {},
  created() {
    // let reslt = await this.$api.config();
    // console.log(reslt)
    // this.init();
  },
  methods: {
    changeForm1(val) {
        Object.assign(this.params1, val);
        
    },
    changeForm2(val) {
        Object.assign(this.params2, val);

    },
    changeForm3(val) {
        Object.assign(this.params3, val);

    },
    changeForm4(val) {
        Object.assign(this.params4, val);

    },

    async submit() {
      let data={...this.params1,...this.params2,...this.params3,...this.params4}
      console.log(data)
      //  console.log(this.formall)
        // console.log(val);
        // let data = JSON.parse(JSON.stringify(this.formall));
        // let data= {...this.formall}

        let reslt = await this.$api.config({data});
        //console.log(reslt);
      
    }
  }
};
</script>

<style lang="less" scoped>
.vlt-edit-single .title {
  border-color: #fff;
}
</style>
