<template>
  <!-- 添加 - 配置管理 -->
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
        <p @click="addDesc" class="add-item"><i class="el-icon-plus"></i> 新增描述</p>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="onSubmit">提交</el-button>
          <el-button size="medium" @click="close">取 消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "addFaultType",
  data() {
    return {
      formDatas: [
        {
          type: "select",
          title: "物品类别：",
          prop: "auditResults",
          options: [
            { label: "配件", value: "0" },
            { label: "配件2", value: "1" }
          ]
        },
        { type: "input", prop: "itemName", title: "物品名称：", value: "" },
        {
          type: "input",
          prop: "faultDescription_1",
          title: "故障描述1：",
          value: ""
        }
      ],
      rule: {
        // address: [{required: true,trigger: "blur" }],
        auditResults: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        itemName: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        faultDescription_1: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    changeForm() {
      console.log("change");
    },
    onSubmit() {
      console.log("submit");
    },
    addDesc () {
      // let descIndex = this.formDatas
      const newDesc = {
        type: "input",
        prop: "faultDescription1",
        title: "故障描述2：",
        value: ""
      }
      console.log('add');
    },
    close() {
      console.log("close");
    }
  }
};
</script>

<style lang="less" scoped>
.vlt-card {
  padding: 20px;
  .add-item {
    width: 400px;
    margin: 20px 0 20px 140px;
    padding:  9px 0;
    font-size: 12px;
    text-align: center;
    color: #333;
    cursor: pointer;
    border: 1px dashed #dddddd;
  }
}
</style>
