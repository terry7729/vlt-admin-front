<!-- 维修工单 -->

<template>
  <div class="vlt-card-child">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    >
    <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
  </search-bar>
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
          title: "维修人员：",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "selectName",
          value: "",
          title: "设备名称：",
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
        // 维修日期：
        {
          type: "select",
          prop: "selectName2",
          value: "",
          title: "工单状态：",
          placeholder: "请选择",
          options: [
            {
              label: "状态1",
              value: 1
            },
            {
              label: "状态2",
              value: 2
            },
            {
              label: "状态3",
              value: 3
            }
          ]
        }
      ],
      controlOptions: [
        { name: "一键提醒", type: "primary", icon: "message-solid" }, // type为按钮的五种颜色， icon为具体的图标
      ]
   }
  },
 components: {
 },
 methods: {
    search(form) {
      console.log("search", form);
    },

    selectBtn(val) {
      console.log(val);
    },
 },
}
</script>

<style lang="less" scoped>
</style>
