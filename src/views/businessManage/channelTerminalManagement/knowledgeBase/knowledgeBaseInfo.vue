<template>
  <!-- 查看维修知识库 -->
  <div class="vlt-card">
    <div class="vlt-edit-single">
      <h2 class="title">基本信息</h2>
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
          <el-button type="primary" v-prevent="1000" size="medium" @click="onSubmit">提交</el-button>
          <el-button type="primary" v-prevent="1000" size="medium" @click="onSubmit">保存</el-button>
          <el-button size="medium" @click="close">取 消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "ExportCard",
  data() {
    return {
      show: this.showForm,
      params: {},
      formDatas: [
        {type: 'input', prop:'itemCategory', title: '物品类别：',value: '', disabled: true},
        {type: 'input', prop:'itemName', title: '物品名称：',value: '', disabled: true},
        {type: 'input', prop:'faultType', title: '故障类型：',value: '', disabled: true},
        {type: 'input', prop:'faultDesc', title: '故障描述：',value: '', disabled: true},
        {type: 'input', prop:'processingTime', title: '处理时间：',value: '', disabled: true},
        {type: 'input', prop:'processingDesc', title: '处理描述：',value: '', disabled: true},
      ],
      rule: {
        // address: [{required: true,trigger: "blur" }],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
      },
      mockDate: {
        id: 0,
        itemCategory: '设备',
        itemName: '投注机',
        faultType: '投注机进水',
        faultDesc: '投注机进水',
        processingTime: '2018-08-09',
        processingDesc: '运行中',
      }
    };
  },
  created() {
    this.init();
  },
  components: {},
  methods: {
    init() {
      let _item = this.formDatas;
      let arr = Object.keys(this.mockDate);
      for (let i = 0; i < _item.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (_item[i].prop == arr[j]) {
            // console.log(_item[i]);
            _item[i].value = this.mockDate[arr[j]];
          }
        }
      }
      console.log(_item);
    },
    changeForm(val) {
      Object.assign(this.params, val);
      // console.log("change", this.params);
    },
    handleClose() {
      console.log("close");
    },
    close() {
      this.$router.back();
    },
    onSubmit() {
      console.log("formData", this.params);
      this.close();
    }
  }
};
</script>

<style lang="less" scoped>
</style>
