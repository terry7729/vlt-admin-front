<template>
 <div class="vlt-card">
   <div class="vlt-edit-single">
        <h2 class="title">基本信息</h2>
        <div class="vlt-edit-wrap">
            <base-form :formData="data2" labelWidth="140px" ref="baseForm" :rules="rules2" 
            direction="right" @change="changeForm"></base-form>
          <el-row class="vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
            <el-button size="medium" @click="cancel">取消</el-button>
          </el-row>
        </div>
   </div>
 </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
 name: "addStore",
 data() {
 return {
   params:{},
   data2:[
     {title:"仓库名称",type:'input',prop:'storeName',value:'',},
     {title:'所属机构',type:'select',prop:'organization',options:[{label:'',value:'1'},{label:'',value:'2'}]},
     {title:'仓库类型',type:'select',prop:'storeType',options:[{label:'',value:'1'},{label:'',value:'2'}]},
     {title:'仓库管理员',type:'select',prop:'storeAdmin',options:[{label:'',value:'1'},{label:'',value:'2'}]},
     {title:'备注',type:'textarea',prop:'remark',value:''},
   ],
   rules2: {
        storeName: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        organization: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        storeType: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        storeAdmin: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        remark: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
      },
   

 }
 },
 components: {
 },
 methods: {
   submit(){
     console.log(this.params )
   },
   cancel(){
     this.$router.back()
   },
   changeForm(val) {
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
    },
 },
}
</script>

<style lang="less" scoped>
</style>
