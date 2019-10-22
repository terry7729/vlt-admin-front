<template>
<!-- 设施查看页面 -->
 <div class="vlt-card facility-page">
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
 name: "facilityCheck",
 data() {
 return {
   url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
   infoList:[
     {title:'设施名称',value:'',prop:'facilityName'},
     {title:'设施编号',value:'',prop:'facilityCode'},
     {title:'设施单价',value:'',prop:'facilityUnitPrice'},
     {title:'设施大单位',value:'',prop:'facilityBigUnit'},
     {title:'设施小单位',value:'',prop:'facilitySmallUnit'},
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
.facility-page{
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
