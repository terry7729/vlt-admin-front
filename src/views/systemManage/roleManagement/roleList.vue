<template>
  <div  class="vlt-card">
    <div class="role-title">
        <elTag :title="title"/>
    </div>
    <div class="role-table">
        <Tabel/>
    </div>
  </div>
</template>

<script>

import elTag from '../../../components/common/tag'
import Tabel from '../../../components/common/tabel'
export default {
  name: 'name',
  data() {
    return {
      title:{
        title:'用户角色状态搜索“启用”',
        num:10
        },
    }
  },
  computed: {

  },
  created() {
  
  },
  mounted() {
    
  },
  components: {
    elTag,
    Tabel
  }
}
</script>


<style lang="less">
@import './less/index.less';
</style>
