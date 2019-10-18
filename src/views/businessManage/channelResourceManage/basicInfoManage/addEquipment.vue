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
 name: "addEquipment",
 data() {
 return {
   params:{},
   data2:[
     {title:"物品类别",type:'select',prop:'goodsCategory',options:[{label:'设备',value:'sb'},{label:'设施',value:'ss'}]},
     {title:'设备名称',type:'input',prop:'equipmentName',value:''},
     {title:'设备单位',type:'select',prop:'equipmentUnit',options:[{label:'',value:'1'},{label:'',value:'2'}]},
     {title:'是否标配',type:'radio',prop:'isStandard',value:'',options:[{key:1,value:'是'},{key:2,value:'否'}]},
     {title:'是否回收',type:'radio',prop:'isRecycle',value:'',options:[{key:1,value:'是'},{key:2,value:'否'}]},
     {title:'备注',type:'textarea',prop:'remark',value:''},
   ],
   rules2: {
        goodsCategory: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentName: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentUnit: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        isStandard: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        isRecycle: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
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
