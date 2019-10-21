<template>
  <el-dialog title="预览表单" :visible.sync="show" @close="emitClose">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="80px"
      label-position="top"
      class="preview-container"
    >
      <h2>{{config.formInfo.title}}</h2>
      <div
        class="form-box"
        v-for="index in config.col * config.row"
        :key="index"
        :data-index="index"
        :style="boxStyle"
      >
        <form-component
          v-if="config.list[index - 1].type"
          :config="config.list[index - 1]"
          :draggable="false"
          :form="form"
          :rule="true"
        ></form-component>
      </div>

      <!-- <div class="vlt-edit-wrap">
        <base-form
          :formData="formDatas"
          labelWidth="140px"
          ref="baseForm"
          :rules="rule"
          direction="right"
          @change="changeForm"
        ></base-form>
      </div> -->
      <p v-if="config.formInfo.remarks !=''">* {{config.formInfo.remarks}}</p>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="emitClose">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
import storage from "@/utils/storage";
import formComponent from "@/views/systemManage/businessProcess/components/dragForm/formComponent";
import rules from "@/views/systemManage/businessProcess/components/dragForm/config/rules";
export default {
  name: "",
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: this.dialogFormVisible,
      form: {},
      rules: {},
      config: storage.get("previewConfig") || {},
      boxStyle: {},
      formDatas: [
        {
          type: "select",
          title: "投注卡类型",
          prop: "cardType",
          options: [
            { label: "类型1", value: "0" },
            { label: "类型2", value: "1" }
          ]
        },
        {
          type: "select",
          title: "发卡数量",
          prop: "number",
          options: [{ label: "1", value: "0" }, { label: "2", value: "1" }]
        },
        {
          type: "datepicker-range",
          prop: "dates",
          value: "",
          title: "有效日期",
          options: ["start", "end"]
        },
        { type: "textarea", title: "备注", prop: "remarks" }
      ],
      rule: {
        // address: [{required: true,trigger: "blur" }],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    dialogFormVisible(value) {
      this.show = value;
      this.config = storage.get("previewConfig") || {};
      this.init(this.config);
    },
    config(newVal, oldVal) {
      console.log("changed", newVal);
    }
  },
 
  mounted() {
    const self = this;
    this.init(this.config);
  },
  components: {
    formComponent
  },
  methods: {
    
    // 初始化
    init(config) {
      // console.log(config);
      let len = config.row * config.col;
      this.boxList = [];
      for (let i = 0; i < len; i++) {
        this.boxList.push({
          index: i
        });
      }
      const marginX = 1;
      Object.assign(this.boxStyle, {
        margin: "10px 1%",
        width: (100 - 1 * config.col * 2) / config.col + "%"
      });

      // 初始化表单数据与验证规则
      config.list.forEach(item => {
        if (item.field) {
          this.$set(this.form, item.field, "");
          this.$set(this.rules, item.field, rules[item.field]);
        }
      });
      console.log("this.form", this.form, this.rules);
    },
    emitClose() {
      // this.show = false;
      this.$emit("emitClose");
    },

    changeForm(val) {
      Object.assign(this.params, val);
      // console.log("change", this.params);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
