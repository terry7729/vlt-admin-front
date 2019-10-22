<template>
<!-- 耗材查看页面 -->
 <div class="vlt-card consumable-page">
   <panel-static title="基本信息">
      <base-info :infoList="infoList"></base-info>
      <div class="base-info">
        <span class="picture">图片:</span>
        <el-image class="image" style="width: 100px; height: 100px" :src="url" fit="contain"></el-image>
        <el-image class="image" style="width: 100px; height: 100px" :src="url" fit="contain"></el-image>
        <el-image class="image" style="width: 100px; height: 100px" :src="url" fit="contain"></el-image>
        <el-image class="image" style="width: 100px; height: 100px" :src="url" fit="contain"></el-image>
      </div>
   </panel-static>
 </div>
</template>

<script type="text/javascript">
export default {
 name: "consumableCheck",
 data() {
 return {
   url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
   infoList:[
     {title:'耗材名称',value:'',prop:'consumableName'},
     {title:'耗材编号',value:'',prop:'consumableCode'},
     {title:'耗材单价',value:'',prop:'consumableUnitPrice'},
     {title:'耗材大单位',value:'',prop:'consumableBigUnit'},
     {title:'耗材小单位',value:'',prop:'consumableSmallUnit'},
     {title:'大小单位转换值',value:'',prop:'transformValue'},
     {title:'供应商',value:'',prop:'supplier'},
     {title:'预警上限',value:'',prop:'upperLimit'},
     {title:'预警下限',value:'',prop:'lowerLimit'},
    //  {title:'图片',value:'',prop:'image'},
     {title:'备注',value:'',prop:'remark'},
   ]

 }
 },
 components: {
 },
 methods: {
 },
}
</script>

<style lang="less">
.consumable-page{
  .base-info{
    position: relative;
  .image{
    margin-left: 58px;
    margin-top: -24px
  }
  .picture{
    position: absolute;
  }
  }
}
</style>
