<template>
  <div class="user-admin" v-if="userInfo">
    <el-tooltip effect="dark" content="全屏" placement="bottom" v-if="!isFull">
      <span class="iconfont icon-fullscreen" @click="fullScreen"></span>
    </el-tooltip>
    <el-tooltip effect="dark" content="退出全屏" placement="bottom" v-else>
      <span class="iconfont icon-exitfullscreen" @click="exitFullScreen"></span>
    </el-tooltip>
    <el-tooltip effect="dark" content="锁屏" placement="bottom">
      <span class="el-icon-lock" @click="lock"></span>
    </el-tooltip>
    <span class="el-icon-bell"></span>
    <span class="logout iconfont icon-tuichu" @click="openConfirm"></span>
    <span class="el-dropdown-link">
      <span class="user-info">
        <el-popover
          placement="bottom"
          width="320"
          trigger="click"
        >
          <span slot="reference">
            <span class="avatar">
              <img v-if="userInfo.avatar" :src="userInfo.avatar" @error="userInfo.avatar = ''">
              <i v-else class="iconfont icon-touxiang"></i>
            </span>
            <span class="user-name">{{userInfo.userName}}</span>
          </span>
          <el-card class="box-card user-info-content">
            <div slot="header" class="clearfix">
              <span>用户信息</span>
              <el-button style="float: right; padding: 0;" type="text" @click="$router.push({name: 'userSetting'})">用户设置</el-button>
            </div>
            <div class="info-item">
              <span class="title">用户账号：</span>
              {{userInfo.account}}
            </div>
            <div class="info-item">
              <span class="title">手机号码：</span>
              {{userInfo.mobile}}
            </div>
            <div class="info-item">
              <span class="title">本次登录：</span>
              {{userInfo.lastLoginTime}}
            </div>
            <div class="info-item">
              <span class="title">登录IP：</span>
              {{userInfo.loginIp}}
            </div>
          </el-card>
        </el-popover>
      </span>
    </span>
  </div>
</template>

<script>

import storage from '@/utils/storage'
import windowScreen from '@/utils/windowScreen'
import moment from 'moment'

export default {
  name: 'adminHeader',
  data() {
    return {
      isFull: false,
      userInfo: storage.get('userInfo')
    }
  },
  
  created () {
    this.watchScreen(() => {
      this.isFull = true;
    }, () => {
      this.isFull = false;
    })
    if (this.userInfo) {
      this.$set(
        this.userInfo, 
        'lastLoginTime', 
        moment(this.userInfo.lastLoginTime).format("YYYY-MM-DD HH:mm:ss")
      );
    }
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
    async loginOut() {
      const self = this;
      const res = await self.$api.getLogOut({
        message: '退出成功'
      });
      if (res && res.code == 0) {
        storage.remove('token');
        storage.remove('userInfo');
        this.$router.push({
          path: '/login'
        })
        return;
      }
    },
    lock() {
      this.eventBus.$emit('lock', true);
    },
    fullScreen: windowScreen.fullScreen,
    exitFullScreen: windowScreen.exitFullScreen,
    watchScreen: windowScreen.watchScreen
  }
}
</script>

<style lang="less" scoped>
  .user-admin{
    position: absolute;
    right: 10px;
    top: 15px;
    color: #666;
    .msg-tips{
      color: #2d8cf0;
      font-size: 12px;
      margin-right: 15px;
      cursor: pointer;
      .icon{
        font-size: 20px;
        color: #333333;
        font-weight: bold;
      }
    }
    .user-info{
      line-height: 32px;
      cursor: pointer;
    }
    .user-name{
      font-size: 14px;
    }
    .avatar{
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin: 0 5px;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
      .iconfont{
        font-size: 32px;
        color: #bdbdbd;
      }
    }
    .el-icon-lock,
    .el-icon-bell,
    .icon-fullscreen,
    .icon-exitfullscreen,
    .logout{
      font-size: 20px;
      color: #666;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      cursor: pointer;
    }
    .logout{
      margin-right: 30px;
    }
  }
</style>
<style lang="less">
  .user-info-content{
    &.el-card{
      background-color: transparent;
      border: none;
      box-shadow: none;
      margin: -10px;
      font-size: 13px;
      color: #999;
    }
    .el-button--text{
      font-size: 12px;
    }
    .el-card__header{
      padding: 10px 15px;
    }
    .el-card__body{
      padding: 10px 15px;
    }
    .info-item{
      line-height: 2;
      font-size: 12px;
      .title{
        color: #999;
        display: inline-block;
        vertical-align: top;
        width: 5.5em;
      }
      color: #333;
    }
    
  }
  
</style>

