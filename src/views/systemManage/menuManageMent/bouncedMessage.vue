<template>
  <div style>
    <div class="vlt-edit-single">
        <h2 class="title" v-if="title?true:false">{{title}}</h2>
    <div class="vlt-edit-wrap">
      
        <base-form
          :formData="data2"
          ref="baseForm"
          :rules="rules2"
          direction="right"
          @change="changeForm"
          labelWidth="110px"
        ></base-form>
     
      <el-row class="vlt-edit-btn">
        <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
        <el-button size="medium" @click="resestFrom('form')">取消</el-button>
      </el-row>
      <!-- {{params}} -->
    </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "bouncedMessage",
  props: ["title", "obj"],
  data() {
    return {
      params: {},
      data2: [
        { title: "类型", type: "input", prop: "type", value: "" },
        { type: "input", title: "名称", prop: "name" },
        { type: "input", title: "路径", prop: "path" },
        { type: "input", title: "路由英文名", prop: "english" },
        {
          type: "select",
          title: "图标",
          prop: "icon",
          options: [
            { label: "图标一", value: "0" },
            { label: "图标二", value: "1" }
          ]
        },
        { type: "input", prop: "sort", value: "", title: "排序值" },
        {
          type: "switch",
          prop: "date2",
          value: "",
          title: "是否敏感操作",
          option: ["start", "end"]
        },
        { type: "switch", prop: "date3", value: "", title: "是否启用" }
      ],
      rules2: {
        type: [{ required: true, message: "类型不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        english: [{ required: true, message: "请输入英文名" }],
        path: [{ required: true, message: "路径不能为空", trigger: "blur" }],
        icon: [{ required: true, message: "请选择icon图标" }],
        sort: [{ required: true, message: "请输入排序值" }]
      }
    };
  },
  updated(...res) {
 
  },
  components: {},
  methods: {
    resestFrom(formName) {
      this.$emit('closediaog',false)
    },
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
</style>
