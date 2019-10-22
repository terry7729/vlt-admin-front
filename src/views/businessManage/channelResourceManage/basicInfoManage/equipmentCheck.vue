<template>
<!-- 设备查看页面 -->
 <div class="vlt-card">
   <panel-static title="基本信息">
      <base-info :infoList="infoList"></base-info>
   </panel-static>
 </div>
</template>

<script type="text/javascript">
export default {
 name: "equipmentCheck",
 data() {
 return {
   infoList: [
      { title: "设备名称", value: "", prop: "equipmentName" },
      { title: "设备单位", value: "", prop: "equipmentUnit" },
      { title: "是否标配", value: "", prop: "isStandard" },
      { title: "是否回收", value: "", prop: "isRecycle" },
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

<style lang="less" scoped>
</style>
