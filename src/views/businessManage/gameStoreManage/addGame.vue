<template>
 <div class="vlt-card">
   <div class="vlt-edit-single">
        <h2 class="title">编辑</h2>
        <div class="vlt-edit-wrap">
          <el-form
            label-position="right"
            label-width="90px"
            :model="form"
            ref="form"
          >
            <base-form :formData="data2" ref="baseForm" :rules="rules2" direction="right" @change="changeForm"></base-form>
            
          </el-form>
          <el-row class="vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
            <el-button size="medium" @click="cancel">取消</el-button>
          </el-row>
        </div>
    </div>
 </div>
</template>

<script type="text/javascript">
import rules from '@/utils/rules.js';

export default {
 name: "addGame",
 data() {
 return {
   form: {
        singleAmount: "",
        minMultiple: "",
        mixBet: "",
        bet: "",
        logOff: "",
        textarea: ""
      },
    data2:[
     {type: 'input', title: '测试', prop: 'test'},
   ],
   rules2: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: 'blur' }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: 'blur' }
        ],
        all: [
          { required: true, validator: rules.checkEmail, trigger: 'blur' }
        ]
      },
   
 }
 },
 components: {
 },
 methods: {
   changeForm(val) {
        Object.assign(this.params, val)
        console.log('派发出来的参数', this.params)
    },
    submit(formName){
        const self = this;
        this.$refs.baseForm.validate((val)=>{
          console.log(val)
        });
    }
 },
}
</script>

<style lang="less" scoped>
</style>
