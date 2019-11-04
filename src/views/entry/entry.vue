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
        <li @click="toHome(item.name, item.extendAttach)" v-for="(item, index) in entryList" :key="index">
          <dl>
            <dt class="iconfont" :class="[item.icon]"></dt>
            <dd>{{item.name}}</dd>
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
      title: '视频彩票运营管理平台',
      // 静态本地菜单关联配置
      entryList: [
        {
          name: '业务管理',
          extendAttach: 1,
          icon: 'icon-yewuguanli'
        },
        {
          name: '业务运营',
          extendAttach: 2,
          icon: 'icon-yewuyunying'
        },
        {
          name: '业务监控',
          extendAttach: 3,
          icon: 'icon-yewujiankong'
        },
        {
          name: '系统管理',
          extendAttach: 4,
          icon: 'icon-xitongguanli'
        },
      ],
      // 动态接口配置
      // entryList: [],
      menuData: [],
    }
  },
  computed: {

  },
  created() {
    // this.getMenuList();
  },
  mounted() {
    
  },
  methods: {
    async getMenuList() {
      let res = await this.$api.QueryModuleTree();
      if(res && res.code === 0){
        this.menuData = res.data;
        if (!this.menuData) {
          return;
        }
        this.menuData[0].children.forEach(item => {
          if (item.extendAttach) {
            this.entryList.push({
              name: item.text,
              extendAttach: item.extendAttach,
              icon: item.iconCls || 'el-icon-menu'
            })
          }
        })

      }
    },
    toHome(title, extendAttach) {
      this.setEntry({
        title,
        extendAttach
      })
      // 跳转到子模块首页
      // 静态本地菜单资源关联配置
      const list = menuList[extendAttach].children;
      let name = list[0].code;
      if (list[0].children && list[0].children.length) {
        name = list[0].children[0].code
      }
      // 动态接口配置
      // let list;
      // this.menuData[0].children.forEach(item => {
      //   if (item.extendAttach === extendAttach) {
      //     list = item.children[0].children;
      //   }
      // })
      // let name = list[0].code;

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
