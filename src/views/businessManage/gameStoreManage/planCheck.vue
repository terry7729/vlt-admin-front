<template>
 <div class="vlt-card plan-check">
  <panel title="试玩计划" :show="true">
      <base-info :infoList="planList"></base-info>
  </panel>
  <panel title="游戏信息" :show="true">
    <base-info :infoList="gameInfoList"></base-info>
  </panel>
 </div>
</template>

<script type="text/javascript">
export default {
 name: "planCheck",
 data() {
 return {
   planList:[
     {title:'计划名称',value:'',prop:'planName'},
     {title:'计划编号',value:'',prop:'planCode'},
     {title:'计划状态',value:'',prop:'planState'},
     {title:'计划状态',value:'',prop:'planState'},
     {title:'试玩开始时间',value:'',prop:'startTime'}


   ],
   gameInfoList:[
     {title:'游戏ID',value:'',prop:'gameID'}
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
.plan-check{
  background: white;
  margin:20px 20px;
  border-radius: 8px;
  padding: 25px
}

</style>
