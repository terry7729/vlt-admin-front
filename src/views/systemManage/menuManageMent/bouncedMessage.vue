<template>
  <div style>
    <div class="vlt-edit-single">
        <h2 class="title" v-if="title?true:false">{{title}}</h2>
    <div class="vlt-edit-wrap">
        <base-form
        v-if="data"
          :formData="data"
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
     
    </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
import { createSocket } from 'dgram';
export default {
  name: "bouncedMessage",
  // props: ["title", "obj"],
  props:{

    title:{
      type:String,
      default:''
    },
    data:{
      type:Array,
      default:''
    }
  },
  data() {
    return {
      params: {},
      obj:{title: "上极节点", type: "input", prop: "type", value: "" },
      falg:false,
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
  updated() {

    
  },
  created(){
    console.log(this) 
   
  
    
  },
  components: {},
  methods: {
    resestFrom(formName) {
      this.$emit('closediaog',false)
    },
    changeForm(val) {
      Object.assign(this.params, val);
      console.log(val)
      console.log("派发出来的参数", this.params);
    },
    submit() {

      this.$refs.baseForm.validate(val => {
          //添加
        console.log(this.params);
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
