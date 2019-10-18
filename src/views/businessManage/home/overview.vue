<!-- 首页 - 概况 -->

<template>
  <div class="vlt-card module-overview">
    <overList></overList>
    <calendarSelect></calendarSelect>
    <message></message>
  </div>
</template>

<script>
import OverList from "@/views/businessManage/home/components/overviewList";
import message from "@/views/businessManage/home/components/messages";
import calendarSelect from "@/views/businessManage/home/components/calendarSelect";
export default {
  name: "overview",
  components: {
    overList: OverList,
    message: message,
    calendarSelect: calendarSelect
  }
};
</script>

<style lang="less">
</style>