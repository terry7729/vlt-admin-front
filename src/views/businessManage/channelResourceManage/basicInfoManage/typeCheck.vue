<template>
 <div class="vlt-card">
   <panel-static title="基本信息">
      <base-info :infoList="infoList"></base-info>
   </panel-static>
 </div>
</template>

<script type="text/javascript">
export default {
 name: "typeCheck",
 data() {
 return {
   infoList: [
      { title: "仓库名称", value: "", prop: "storeName" },
      { title: "所属机构", value: "", prop: "organization" },
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
