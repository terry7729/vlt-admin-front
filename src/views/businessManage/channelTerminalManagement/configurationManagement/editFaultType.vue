<template>
  <!-- 添加 - 配置管理 -->
  <el-dialog title :visible.sync="show" width="50%" :before-close="close" class="dialog-form-list">
    <div class="vlt-edit-single">
      <div class="vlt-edit-wrap">
        <base-form
          :formData="formDatas"
          labelWidth="140px"
          ref="baseForm"
          :rules="rule"
          direction="right"
          @change="changeForm"
        ></base-form>
        <p @click="addDesc" class="add-item">
          <i class="el-icon-plus"></i> 新增描述
        </p>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="onSubmit">提交</el-button>
          <el-button size="medium" @click="close">取 消</el-button>
        </el-row>
      </div>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
export default {
  name: "editFaultType",
  props: {
    showForm: {
      type: Boolean,
      default: false
    },
    diaTitle: {
      type: String,
      default: "基础信息"
    },
    formDatas: {
      type: Array
    },
    rule: {
      type: Object
    }
  },
  data() {
    return {
      show: this.showForm,
      params: {}
    };
  },
  watch: {
    showForm(value) {
      this.show = value;
    }
  },
  components: {},
  methods: {
    changeForm() {
      console.log("change");
    },
    addDesc() {
      // let descIndex = this.formDatas
      const newDesc = {
        type: "input",
        prop: "faultDescription1",
        title: "故障描述2：",
        value: ""
      };
      console.log("add");
    },
    close() {
      this.$emit("closeDia");
    },
    onSubmit() {
      console.log("formData", this.params);
      this.close();
    }
  }
};
</script>

<style lang="less">
.dialog-form-list {
  .el-dialog__header {
    padding-top: 0;
  }
  .add-item {
    width: 400px;
    margin: 20px 0 20px 140px;
    padding: 9px 0;
    font-size: 12px;
    text-align: center;
    color: #333;
    cursor: pointer;
    border: 1px dashed #dddddd;
  }
}
</style>
