<template>
  <div class="user-admin" v-if="user">
    <span class="el-dropdown-link">
      <span class="user-info">
        <el-popover
          placement="bottom"
          width="320"
          trigger="click"
        >
          <span slot="reference">
            <span class="avatar">
              <img v-if="user.avatar" :src="user.avatar" @error="user.avatar = ''">
              <i v-else class="iconfont icon-touxiang"></i>
            </span>
            <span class="user-name">{{user.name}}</span>
          </span>
          <el-card class="box-card user-info-content">
            <div slot="header" class="clearfix">
              <span>用户信息</span>
              <el-button style="float: right; padding: 0;" type="text" @click="$router.push({name: 'information'})">用户设置</el-button>
            </div>
            <div class="info-item">
              <span class="title">所属机构：</span>
              {{user.institutionName || '管理员'}}
            </div>
            <div class="info-item">
              <span class="title">本次登录：</span>
              {{user.lastLoginTime}}
            </div>
            <div class="info-item">
              <span class="title">登录地址：</span>
              {{user.loginAddress}}
            </div>
            <div class="info-item">
              <span class="title">登录IP：</span>
              {{user.loginIp}}
            </div>
          </el-card>
        </el-popover>
      </span>
    </span>
    <span class="logout iconfont icon-tuichu" @click="openConfirm"></span>
  </div>
</template>

<script>

import storage from '@/utils/storage'


export default {
  name: 'adminHeader',
  data() {
    return {
      user: {
        avatar: require('@/assets/img/avatar.jpg'),
        institutionName: '',
        lastLoginTime: '2019-10-07',
        loginAddress: '深圳市',
        loginIp: '10.9.0.110',
        name: 'admin'
      }
    }
  },
  
  created () {
    const self = this;

  },
  methods: {
    openConfirm(){
      this.$router.push({
        path:'/login'
      })
    },
    // openConfirm() {
    //   this.$confirm('是否退出登录?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.loginOut();
    //   }).catch(() => {
    //     // 取消         
    //   });
    // },
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
  }
}
</script>

<style lang="less" scoped>
  .user-admin{
    position: absolute;
    right: 30px;
    top: 18px;
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
    .logout{
      font-size: 20px;
      color: #333333;
      display: inline-block;
      vertical-align: middle;
      margin-left: 20px;
      font-weight: bold;
      cursor: pointer;
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

