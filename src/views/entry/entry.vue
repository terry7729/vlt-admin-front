<template>
  <div class="entry-container">
    <div class="entry-hd">
      <div class="hd-logo">
        <span class="ct">
          <span class="logo-box">
            <i class="iconfont icon-B-fulicaipiao"></i>
          </span>
          <strong class="name">{{title}}</strong>
        </span>
      </div>
      <admin-info></admin-info>
    </div>
    <div class="entry-bd">
      <ul class="entry-list">
        <li @click="toHome('业务管理', 1)">
          <dl>
            <dt class="icon"></dt>
            <dd>业务管理</dd>
          </dl>
        </li>
        <li @click="toHome('业务运营', 2)">
          <dl>
            <dt class="icon"></dt>
            <dd>业务运营</dd>
          </dl>
        </li>
        <li @click="toHome('业务监控', 3)">
          <dl>
            <dt class="icon"></dt>
            <dd>业务监控</dd>
          </dl>
        </li>
        <li @click="toHome('系统管理', 4)">
          <dl>
            <dt class="icon"></dt>
            <dd>系统管理</dd>
          </dl>
        </li>
      </ul>
      <el-row class="msg-con">
        <el-col :span="12" class="msg-bd">
          <div class="grid-content">
            <div class="heading">
              <p class="msg-tips">
                您有 <em class="red">3</em> 条 需处理待办
                <span class="el-icon-refresh refresh"></span>
              </p>
              <span class="title">我的待办</span>
            </div>
            
            <ul class="msg-list">
              <li class="list-dot dot-red"><router-link tag="p" to="home">[通知公告-F100908JKK]流程结束</router-link></li>
              <li class="list-dot dot-red"><router-link tag="p" to="home">[通知公告-F100908JKK]流程结束</router-link></li>
              <li class="list-dot dot-red"><router-link tag="p" to="home">[通知公告-F100908JKK]流程结束</router-link></li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12" class="msg-bd">
          <div class="grid-content">
            <div class="heading">
              <p class="msg-tips">
                您有 <em class="orange">2</em> 条 需处理待办
                <span class="el-icon-refresh refresh"></span>
              </p>
              <span class="title">我的知会</span>
            </div>
            <ul class="msg-list">
              <li class="list-dot dot-orange"><router-link tag="p" to="home">[通知公告-F100908JKK]流程结束</router-link></li>
              <li class="list-dot dot-orange"><router-link tag="p" to="home">[通知公告-F100908JKK]流程结束</router-link></li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <lock-mask></lock-mask>
  </div>
</template>

<script>
import adminInfo from '@/components/main/adminInfo'
import lockMask from '@/components/main/lockMask'
import {mapActions} from 'vuex'
import menuList from '@/libs/menu/'

export default {
  name: 'entry',
  data() {
    return {
      title: '视频彩票运营管理平台'
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
    adminInfo,
    lockMask
  }
}
</script>


<style lang="less">
@import './less/entry.less';
</style>
