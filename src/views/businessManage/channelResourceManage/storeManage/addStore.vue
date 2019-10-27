<template>
<div class="vlt-card">
  <div class="vlt-edit-single">
        <h2 class="title">基本信息</h2>
        <div class="vlt-edit-wrap">
            <base-form :formData="formData" labelWidth="140px" ref="baseForm" :rules="rules2" 
            direction="right" @change="changeForm"></base-form>
            <el-form 
              label-position="right" 
              label-width="140px" 
              ref="form"
              class="soft-form">
              <el-form-item label="仓库类型">
                <el-input disabled v-model="typeName"></el-input>
                </el-select> 
              </el-form-item>
            </el-form>
            <base-form :formData="formData2" labelWidth="140px" ref="baseForm" :rules="rules2" 
            direction="right" @change="changeForm2"></base-form>
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
  typeX: '',
  formData:[
    {title:"仓库名称",type:'input',prop:'nameX',value:'',},
    {title: '所属机构', type: 'cascader', prop: 'organId', value: '', options: [],
      setProps: {
        label: "text",
        value: "id",
        children: "children",
        // multiple: true, // 多选
        checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
      }
      },
  ],
  formData2:[
    {title:'仓库管理员',type:'select',prop:'adminId',options:[]},
    {title:'备注',type:'textarea',prop:'remark',value:''},
  ],
  rules2: {
    nameX: [
      { required: true, validator: rules.checkEmpty, trigger: "blur" }
    ],
    organId: [
      { required: true, validator: rules.checkEmpty, trigger: "blur" }
    ],
    storeType: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
    ],
    adminId: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
    ],
    remark: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
    ]
  },
  typeX:'',
  typeName:'',
  param:'',
  param2:'',
}
},
components: {
},
created(){
  this.getInsData()
  // this.getAdminList()
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
  // 获取仓库管理员数据
  getAdminList(id){
    (async (id)=>{
      let res = await this.$api.getAdminList(id)
      console.log('admin', res.data[0].list)
      let array = []
      res.data[0].list.forEach((item)=>{
        let obj ={}
        obj.label=item.userName;
        obj.value = item.userId
        array.push(obj)
      })
      this.$set(this.formData2[0],'options',array);
    })(id)
  },

  submit(){
    let data = {
      typeX: this.typeX
    }
    Object.assign(data,this.param,this.param2)
    this.createWare(data)
    
  },
  createWare(data) {
    (async (data)=>{
      let res = await this.$api.createWare({data})
      if(res&&res.code==0) {
        this.$message.success('提交成功');
        this.$router.push({path:'storeManage'})
      }
    })(data)
  },
  cancel(){
    this.$router.back()
  },
  changeForm2(val) {
    this.param2 = val;
  },
  changeForm(val) {
    let type= {
      0: '中彩仓库',
      1: '省中心仓库',
      2: '地市仓库'
    }
    this.param = val;
    // Object.assign(this.params, val);
    console.log("派发出来的参数", this.params);
    // let data = {id:val.organId};
    if( typeof(val.organId)=='number') {
      this.getAdminList(val.organId)
    }
    let array = [];
    let typeValue = '';
    array.push(this.insData.id)
    if(val.organId&&val.organId!=this.insData.id) {
      this.insData.children.forEach((item)=>{
        if(item.id == val.organId) {
          array[1] = item.id
          typeValue = item.type;
          console.log('item',item.type)
          return
        }else{
          item.children&&item.children.forEach((list)=>{
            if(list.id==val.organId) {
              array[1] = item.id
              array[2] = list.id
              typeValue = list.type;
              console.log('list',list.type)
              return 
            }
          })
        }
      })
    }else{
      typeValue = this.insData.type;
    }
    console.log('array',array)
    // let typeid = ''
    // let index=0;
    // let aa = function(id,key,array){
    //   index++
    //   console.log('index',index)
    //   array&&array.forEach(item=>{
    //     // debugger;
    //     if(item[key]==id) {
    //       console.log(item.type)
    //       typeid = item.type
    //       return item.type
    //     }else{
    //       aa(id,key,item.children)
    //     }
    //   })
    // }
    // if(val.organId==this.insData.id) {
    //   console.log(this.insData.type)
    // }else{
    //   aa(val.organId, 'id', this.insData.children);
    // }
    // console.log(type[typeid])
    // this.$refs.baseForm.resetForm()
    this.typeX = typeValue
    this.typeName = type[typeValue]
    console.log(this.typeX)
    // this.$set(this.formData[1], 'value', array)
    // this.$set(this.formData2[2], 'value', name)
  },
},
}
</script>

<style lang="less" scoped>
</style>
