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
import { async } from 'q';
export default {
 name: "detail",
 data() {
 return {
    infoList: [
      { title: "设备名称", value: "", prop: "storeName" },
      { title: "设备单位", value: "", prop: "organization" },
      { title: "仓库类型", value: "", prop: "storeType" },
      { title: "仓库管理员", value: "", prop: "storeAdmin" },
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
   getDetail() {
     const data = {
       id:this.$route.query.id
     };
     console.log(data)
     (async (data) =>{
       let res = await this.$api.detailStore(data.id)
      //  console.log(res)
     })
   }
 },
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
