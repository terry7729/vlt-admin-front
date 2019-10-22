<template>
<!-- 型号管理查看页面 -->
 <div class="vlt-card basic-info">
   <panel-static title="设备类型查看" style="margin-bottom:20px">
      <base-info :infoList="typeInfoList"></base-info>
   </panel-static>
   <panel-static title="设备型号信息">
      <base-info :infoList="modelInfoList"></base-info>
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
 name: "modelCheck",
 data() {
 return {
   url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
   typeInfoList: [
      { title: "设备名称", value: "", prop: "equipmentName" },
      { title: "设备单位", value: "", prop: "equipmentUnit" },
      { title: "是否标配", value: "", prop: "isStandard" },
      { title: "是否回收", value: "", prop: "isRecycle" },
      { title: "备注", value: "", prop: "remark" }
    ],
  modelInfoList:[
      { title: "设备型号", value: "", prop: "equipmentModel" },
      { title: "设备单价", value: "", prop: "equipmentPrice" },
      { title: "供应商", value: "", prop: "supplier" },
      { title: "厂家信息", value: "", prop: "factoryInfo" },
      { title: "预警上限", value: "", prop: "upperLimit" },
      { title: "预警下限", value: "", prop: "lowerLimit" },
      { title: "备注", value: "", prop: "remark" }
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
.basic-info{
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
