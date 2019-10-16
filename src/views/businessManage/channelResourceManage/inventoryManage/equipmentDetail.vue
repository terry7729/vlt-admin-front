<template>
 <div class="vlt-card">
   <div class="vlt-edit-single">
        <h2 class="title">基础信息</h2>
        <div class="vlt-edit-wrap">
            <base-form
              :formData="data2"
              labelWidth="140px"
              ref="baseForm"
              :rules="rules2"
              direction="right"
              @change="changeForm"
            ></base-form>
          <el-row class="vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="submit('form')">确定</el-button>
            <el-button size="medium" @click="cancel('form')">取消</el-button>
          </el-row>
        </div>
      </div>
 </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
 name: "equipmentDetail",
 data() {
 return {
   params: {},
   data2:[
     {title:'设备名称',type:'input',prop:'equipmentName',value:''},
     {title:'设备型号',type:'input',prop:'equipmentType',value:''},
     {title:'设备编号',type:'input',prop:'equipmentCode',value:''},
     {title:'存放位置',type:'input',prop:'depositLocation',value:''},
     {title:'使用状态',type:'input',prop:'useState',value:''},
     {title:'设备状态',type:'input',prop:'equipmentState',value:''},
     {title:'入库时间',type:'input',prop:'putTime',value:''},
   ],
   rules2: {
        equipmentName: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentType: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentCode: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        depositLocation: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        useState: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentState: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        putTime: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
      },
 }
 },
 components: {
 },
 methods: {
   submit() {

   },
   cancel() {
     this.$router.back();
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
