<template>
  <div class="header-container">
    <div class="top-bd">
      <i class="menu-collapse iconfont icon-caidan" :class="{isCollapse: isCollapse}" @click="menuCollapse"></i>
      <span class="headling">{{entry.title}}</span>
      &nbsp;
      <el-button type="text" size="small" @click="$router.push({name: 'entry'})">切换</el-button>
      <admin-info></admin-info>
    </div>
    <page-tags></page-tags>
  </div>
</template>

<script>

import storage from '@/utils/storage'
import pageTags from './pageTags'
import adminInfo from './adminInfo'
import {mapGetters} from 'vuex'

export default {
  name: 'adminHeader',
  data() {
    return {
      isCollapse: false,
    }
  },
  computed: {
    ...mapGetters(['entry'])
  },
  created () {
    const self = this;

  },
  methods: {
    openConfirm() {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loginOut();
      }).catch(() => {
        // 取消         
      });
    },
    menuCollapse() {
      const self = this;
      if (self.isCollapse) {
        self.eventBus.$emit('menuCollapse', false);
        self.isCollapse = false;
        return;
      }
      self.eventBus.$emit('menuCollapse', true);
      self.isCollapse = true;
    },
    async loginOut() {
      const self = this;
      const res = await self.$api.getLoginOut({
        data: {
          userId: self.user.id
        }
      });
      if (res && res.code == 0) {
        self.$message({
          message: '退出成功',
          type: 'success'
        });
        self.eventBus.$emit('loginOut', '手动登出');
        return;
      }
      self.$message.error('退出登录失败');
    },
    
  },
  components: {
    adminInfo,
    pageTags
  }
}
</script>

<style lang="less" scoped>
  .header-container{
    box-shadow:0 0 12px -2px rgba(61,77,89,0.2);
    position: relative;
    z-index: 9;
    text-align: left;
    .top-bd{
      background-color: #fff;
      height: 60px;
    }
    .headling{
      font-size: 18px;
    }
    .menu-collapse{
      cursor: pointer;
      line-height: 60px;
      padding: 0 20px;
      font-size: 24px;
      transition: all 0.2s ease 0s;
      display: inline-block;
      color: #666;
      &:hover{
        color: #1082E6;
      }
      &.isCollapse{
        transform: rotate(90deg);
      }
    }
  }
</style>

