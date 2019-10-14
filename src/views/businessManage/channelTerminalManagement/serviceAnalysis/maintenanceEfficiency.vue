<!-- 渠道终端管理 - 服务分析 - 维修率分析 -->
<template>
  <div class="vlt-card-child">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    ></search-bar>
    <div class="chart">
      <h4>工单处理时长</h4>
      <div></div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
   return {

      // 搜索组件配置
      searchOptions: [
        {
          type: "input",
          prop: "inputName",
          value: "",
          title: "设备名称：",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "selectName",
          value: "",
          title: "设备型号：",
          placeholder: "请选择",
          options: [
            {
              label: "类型1",
              value: 1
            },
            {
              label: "类型2",
              value: 2
            }
          ]
        },
        {
          type: "datepicker-range",
          prop: "date2",
          value: "",
          title: "维修日期：",
          placeholder: ["开始日期", "结束日期"]
        },
        {
          type: "select",
          prop: "selectName2",
          value: "",
          title: "选择机构：",
          placeholder: "请选择",
          options: [
            {
              label: "类型1",
              value: 1
            },
            {
              label: "类型2",
              value: 2
            }
          ]
        }
      ],
   }
  },
 components: {
 },
 methods: {
    search(form) {
      console.log("search", form);
    },
 },
}
</script>

<style lang="less" scoped>
</style>
