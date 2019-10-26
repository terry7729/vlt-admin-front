<template>
 <div class="vlt-card">
   <div class="vlt-edit-single">
        <h2 class="title">基本信息</h2>
        <div class="vlt-edit-wrap">
            <base-form :formData="formData" labelWidth="140px" ref="baseForm" :rules="rules2" 
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
  insData:[],    //  所属机构数据
  formData:[
    {title:"仓库名称",type:'input',prop:'nameX',value:'',},
    {title: '所属机构', type: 'cascader', prop: 'insId', value: '', options: [],
      setProps: {
      label: "text",
      value: "id",
      children: "children",
      // multiple: true, // 多选
      checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
      }
      },
    {title:'仓库类型',type:'select',prop:'typeX',options:[{label:'',value:'1'},{label:'',value:'2'}]},
    {title:'仓库管理员',type:'select',prop:'adminId',options:[{label:'',value:'1'},{label:'',value:'2'}]},
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
created(){
  this.getInsData()
},
methods: {
   // 获取所属机构列表
  getInsData() {
    const data = {};
    (async (data)=>{
      let res = await this.$api.getInsList({data})
      console.log(res)
     if(res && res.code == 0) {
      this.$set(this.formData[1], 'options', res.data)
      this.insData = res.data[0];
      console.log(this.insData)
      } else {
        // self.$message.warning(res.msg)
      }
      })(data)
    },
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
