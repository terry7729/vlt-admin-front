<!-- 首页 - 概况 -->

<template>
  <div class="vlt-card module-overview">
    <overList></overList>
    <calendarSelect></calendarSelect>
    <message></message>
  </div>
</template>

<script>
import OverList from '@/components/main/overviewList'
import message from '@/components/main/messages'
import calendarSelect from '@/components/main/calendarSelect'
  export default {
    components: {
      "overList": OverList,
      "message": message,
      "calendarSelect": calendarSelect
    }
  }
</script>

<style lang="less">
</style>