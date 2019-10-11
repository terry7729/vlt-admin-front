<template>
  <div class="vlt-card module-overview">
    <overList></overList>
    <message></message>
  </div>
</template>

<script>
import OverList from '@/components/main/overviewList'
import message from '@/components/main/messages'
  export default {
    components: {
      "overList": OverList,
      "message": message
    }
  }
</script>

<style lang="less">
@import './less/index.less';
</style>