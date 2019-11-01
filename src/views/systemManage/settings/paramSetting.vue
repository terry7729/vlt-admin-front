<template>
  <div class="vlt-card">
    <!-- 参数设置 -->
    <div class="vlt-edit-single">
      <div class="vlt-edit-wrap">
        <h2 class="title">消息提醒</h2>
        <base-form
          :formData="message"
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
          :formData="tax"
          ref="baseForm"
          labelWidth="120px"
          :rules="rules1"
          direction="right"
          @change="changeForm4"
        ></base-form>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import rules from "../../../utils/rules";
import { async } from "q";
import storage from "@/utils/storage";
export default {
  name: "",
  data() {
    return {
      message: [
        {
          title: "发送提醒",
          type: "radio",
          prop: "sendReminder",
          value: "",
          options: [
            { label: "开启", value: 1 },
            { label: "关闭", value: 2 }
          ]
        },
        {
          title: "选择提醒方式",
          type: "select",
          prop: "warnWay",
          value: "",
          options: [
            { label: "邮件通知", value: 1 },
            { label: "短信通知", value: 2 }
          ]
        },
        {
          title: "过期预警(提前天数)",
          type: "input",
          prop: "pastWarn",
          value:"" ,
          placeholder: "30天"
        }
      ],
      payWay: [
        {
          title: "是否实扣",
          type: "radio",
          prop: "realBuckle",
          value: "",
          options: [{ label: "是", value: 1 }, { label: "否", value: 2}]
        },
        {
          title: "选择非实扣方式",
          type: "select",
          prop: "norealBuckle",
          value: "",
          options: [
            { label: "周扣", value:1 },
            { label: "月扣", value:2 }
          ]
        }
      ],
      finance: [
        {
          title: "是否自动转账",
          type: "radio",
          prop: "autoTransfer",
          value: "",
          options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
        },
        {
          title: "转账日期",
          type: "radio",
          prop: "transferDate",
          value: "",
          options: [
            { label: "每日", value: 1 },
            { label: "每周", value: 2 },
            { label: "每月", value: 3 },
            { label: "指定日期", value:4 }
          ]
        },
        {
          title: "转账时间",
          type: "datetime",
          prop: "transferTime",
          value: ""
        }
      ],
      tax: [
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
          prop: "dutyParagraph",
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
      params1: {},
      params2: {},
      params3: {},
      params4: {},
      formall: { sysConfigVoList: [] }
      // form1:{},
      // form2:{},
      // form3:{},
      // form4:{},
    };
  },
  components: {},
  created() {
    let data = {
      sysConfigKeyList: [0, 1, 2, 3]
    };
    this.configCat(data);
  },
  methods: {
    async configCat(data) {
      console.log(222, data);
      let res = await this.$api.configCat({ data });
      console.log("查看成功", res);
      let val1=JSON.parse(res.data[0].value)
      // let arr1 = Object.keys(val1)
      let val2=JSON.parse(res.data[1].value)
      let val3=JSON.parse(res.data[2].value)
      let val4=JSON.parse(res.data[3].value)
      console.log(321,val4)
      
      this.message[0].value=val1.sendReminder
      this.message[1].value=val1.warnWay
      this.message[2].value=val1.pastWarn
      this.payWay[0].value=val2.realBuckle
      this.payWay[1].value=val2.norealBuckle
      this.finance[0].value=val3.autoTransfer
      this.finance[1].value=val3.transferDate
      this.finance[2].value=val3.transferTime
      this.tax[0].value=val4.companyName
      this.tax[1].value=val4.dutyParagraph
      this.tax[2].value=val4.taxRate
      // this.damessageReminding.forEach((item)=>{
      //       // item.value = damessageReminding.prop
      //       // item.value=val1.sendReminder
      //       arr1.forEach(i=>{
      //     if(item.prop === i){
      //       item.value= val1.i 
      //     } 
      //     
      //   })
      // })
      
          
    },
    changeForm1(val) {
      // this.params1 = val;
      Object.assign(this.params1, val);
      // this.form1[0]=this.params1
      // this.formall.=this.params1
    },
    changeForm2(val) {
      // this.params2 = val;
      // this.formall[1]=this.params2
      Object.assign(this.params2, val);
    },
    changeForm3(val) {
      //  this.params3 = val;
      // this.formall[2]=this.params3
      Object.assign(this.params3, val);
    },
    changeForm4(val) {
      //  this.params4 = val;
      // this.formall[3]=this.params4
      Object.assign(this.params4, val);
    },
    async submit() {
      // this.formall.list1=this.form1
      // this.formall.list2=this.form2
      // this.formall.list3=this.form3
      // this.formall.list4=this.form4
      let params1 = this.params1;
      //console.log(123, params1);

      let form1 = {
        key: 0,
        value: JSON.stringify(this.params1)
      };

      // console.log(999, form1);
      let form2 = {
        key: 1,
        value: JSON.stringify(this.params2)
      };
      let form3 = {
        key: 2,
        value: JSON.stringify(this.params3)
      };
      let form4 = {
        key: 3,
        value: JSON.stringify(this.params4)
      };
      this.formall.sysConfigVoList.push(form1, form2, form3, form4);
      // this.formall.sysConfigVoList.push(form2)
      // this.formall.sysConfigVoList.push(form3)
      // this.formall.sysConfigVoList.push(form4)
      // let formall={}
      // Object.assign(formall,this.params)
      //console.log(321, this.formall);
      let data = this.formall;
      console.log(666, data);
      
      //  console.log(this.formall)
      // console.log(val);
      // let data = JSON.parse(JSON.stringify(this.formall));
      // let data= {...this.formall}
      let reslt = await this.$api.configSet({ data });
      // let val=JSON.parse(data.sysConfigVoList.value)
      // console.log(321,val)
    //  storage.set('pastWarn',JSON.parse(data.sysConfigVoList[0].value).pastWarn)
     
      console.log("提交成功",reslt);
    },
    cancel() {
      // this.$refs.baseForm.resetForm();
    }
  }
};
// data={ sysConfigVoList: [
//     {
//       key:0,
//       value:{
//         sendReminder:1,
//         warnWay:0
//       },
//     },
//     {
//       key:1,
//       value:{
//         realBuckle:"",
//         norealBuckle:""
//       }
//     }
//   ] 
// }
</script>

<style lang="less" scoped>
.vlt-edit-single .title {
  border-color: #fff;
}
</style>

