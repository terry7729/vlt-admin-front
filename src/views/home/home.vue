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
  </div>
</template>

<script>
import sideMenu from '@/components/main/sideMenu'
import adminHeader from '@/components/main/adminHeader'


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
  created () {
    
  },
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
      const self = this;
      const headHeight = document.querySelector('.header-container').offsetHeight;
      self.$refs.main.style.height = `${document.documentElement.clientHeight - headHeight}px`;
    },
  },
  components: {
    sideMenu,
    adminHeader
  }
}
</script>

<style lang="less" scoped>
@import './less/home.less';
</style>
