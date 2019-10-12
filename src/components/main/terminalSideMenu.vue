<template>
  <div class="terminal-side sideMenu-container">
    <el-row class="tac">
      
    </el-row>
  </div>
</template>

<script>
import menuTree from './menuTree'
import storage from '@/utils/storage'
import {mapGetters} from 'vuex'

export default {
  name: 'terminalSideMenu',
  data() {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
  },
  components: {
    menuTree
  }
}
</script>

<style lang="less">
  .sideMenu-container{
    &.terminal-side {
      color: #000;
      background: #fff;
      .menu-logo {
        color: #000;
      }
    }
  }
</style>