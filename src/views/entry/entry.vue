<template>
  <div class="entry-container">
    <div class="entry-hd">
      <div class="hd-logo">
        <span class="ct">
          <i class="iconfont icon-B-fulicaipiao"></i>
          <strong class="name">{{title}}</strong>
        </span>
      </div>
      <admin-info></admin-info>
    </div>
    <div class="entry-bd">
      <ul class="entry-list">
        <li @click="toHome('业务管理', 1)">
          <dl>
            <dt class="icon el-icon-menu"></dt>
            <dd>业务管理</dd>
          </dl>
        </li>
        <li @click="toHome('业务运营', 2)">
          <dl>
            <dt class="icon el-icon-menu"></dt>
            <dd>业务运营</dd>
          </dl>
        </li>
        <li @click="toHome('业务监控', 3)">
          <dl>
            <dt class="icon el-icon-menu"></dt>
            <dd>业务监控</dd>
          </dl>
        </li>
        <li @click="toHome('系统管理', 4)">
          <dl>
            <dt class="icon el-icon-menu"></dt>
            <dd>系统管理</dd>
          </dl>
        </li>
      </ul>
      <el-row class="msg-con">
        <el-col :span="12" class="msg-bd">
          <div class="grid-content">
            <div class="heading"><span class="title">我的待办</span></div>
            <div class="msg-tips">
              您有 <em>3</em> 条 需处理待办
            </div>
            <ul class="msg-list">
              <router-link to="home" tag="li">[通知公告-F100908JKK]流程结束</router-link>
              <router-link to="home" tag="li">[通知公告-F100908JKK]流程结束</router-link>
              <router-link to="home" tag="li">[通知公告-F100908JKK]流程结束</router-link>
              <router-link to="home" tag="li">[通知公告-F100908JKK]流程结束</router-link>
            </ul>
          </div>
        </el-col>
        <el-col :span="12" class="msg-bd">
          <div class="grid-content">
            <div class="heading"><span class="title">我的知会</span></div>
            <div class="msg-tips">
              您有 <em>3</em> 条 需处理待办
            </div>
            <ul class="msg-list">
              <router-link to="home" tag="li">[通知公告-F100908JKK]流程结束</router-link>
              <router-link to="home" tag="li">[通知公告-F100908JKK]流程结束</router-link>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import adminInfo from '@/components/main/adminInfo'
import {mapActions} from 'vuex'
import menuList from '@/libs/menu/'

export default {
  name: 'entry',
  data() {
    return {
      title: '中国福利彩票'
    }
  },
  computed: {

  },
  created() {

  },
  mounted() {
    
  },
  methods: {
    toHome(title, menuId) {
      this.setEntry({
        title,
        menuId
      })
      // 跳转到子模块首页
      const list = menuList[menuId].content[0].childResources;
      let name = list[0].url;
      if (list[0].childResources && list[0].childResources.length) {
        name = list[0].childResources[0].url
      }
      this.$router.push({
        name
      })
    },
    ...mapActions(['setEntry'])
  },
  components: {
    adminInfo
  }
}
</script>


<style lang="less">
@import './less/entry.less';
</style>
