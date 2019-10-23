<template>
  <div class="home-container">
    <side-menu></side-menu>
    <div class="right-container">
      <admin-header></admin-header>
      <div class="main" ref="main">
        <div class="main-body">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <lock-mask></lock-mask>
  </div>
</template>

<script>
import storage from '@/utils/storage'
import sideMenu from '@/components/main/sideMenu'
import adminHeader from '@/components/main/adminHeader'
import lockMask from '@/components/main/lockMask'
import {mapActions} from 'vuex'

export default {
  name: 'home',
  data() {
    return {
      
    }
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.main.scrollTop = 0;
    });
  },
  created () {},
  mounted() {
    const self = this;
    self.resizeTimer = null;
    self.resize();
    window.addEventListener('resize', () => {
      self.resizeTimer && clearTimeout(self.resizeTimer)
      self.resizeTimer = setTimeout(self.resize, 500);
    })
  },
  methods: {
    // 窗口变化设置相关区域高度
    resize() {
      try {
        const header = document.querySelector('.header-container');
        const headHeight = header.offsetHeight;
        this.$refs.main.style.height = `${document.documentElement.clientHeight - headHeight}px`;
      } catch (error) {
        // 未能获取 .header-container
      }
    },
    ...mapActions(['clearRouterTags'])
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'entry' || to.name === 'login') {
      this.clearRouterTags();
    }
    next();
  },
  components: {
    sideMenu,
    adminHeader,
    lockMask
  }
}
</script>

<style lang="less" scoped>
@import './less/home.less';
</style>
