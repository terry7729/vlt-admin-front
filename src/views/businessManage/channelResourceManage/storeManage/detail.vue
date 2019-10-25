<template>
 <div class="vlt-card store-detail">
   <panel-static title="基本信息">
      <base-info :infoList="infoList"></base-info>
   </panel-static>
   <!-- <el-row>
     <el-button type="primary" v-prevent="2000" @click= "returnBtn">确 定</el-button>
   </el-row> -->
 </div>
</template>

<script type="text/javascript">
export default {
 name: "detail",
 data() {
 return {
    infoList: [
      { title: "仓库名称", value: "", prop: "nameX" },
      { title: "所属机构", value: "", prop: "organName" },
      { title: "仓库类型", value: "", prop: "typeX" },
      { title: "仓库管理员", value: "", prop: "adminName" },
      { title: "备注", value: "", prop: "remark" }
    ]

 }
 },
 components: {
 },
 created(){
   this.getDetail()
 },
 methods: {
   returnBtn(){
     this.$router.back();
   },
   getStoreType(val){
     let optino = {
       "1" : '中彩仓库',
       "2" : '省中心仓库',
       "3" : '地方仓库',
       "4" : '销售大厅'
     };
     return optino[val]
   },
   async getDetail() {
     const data = {
       id:this.$route.query.id
     };
     console.log(data)
      let res = await this.$api.detailStore(data.id)
      if(res && res.code == 0){
        this.infoList.forEach(item =>{
          item.value = res.data[item.prop] || '';
          if (item.prop == 'typeX'){
            item.value = this.getStoreType(res.data.typeX)
          }
        })
      }
       console.log(res)
     }
   }
 
}
</script>

<style lang="less" scop-ed>
// .store-detail{
//   .el-button{
//     margin-top:100px;
//     margin-bottom: 100px;
//     margin-left: 1400px
//   }
// }
</style>
