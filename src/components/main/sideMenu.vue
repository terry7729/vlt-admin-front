<template>
  <div class="sideMenu-container">
    <el-row class="tac">
      <el-col class="menu-group">
        <el-menu
          ref="elMenu"
          :default-active="$route.meta.parentName || $route.name"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :unique-opened="true"
          >
          <li class="menu-logo">
            <span class="ct">
              <i class="iconfont icon-B-fulicaipiao"></i>
              <span class="name">{{entry.title}}</span>
            </span>
          </li>
          <li class="menu-wrapper">
            <menu-tree :menuData="menuList"></menu-tree>
          </li>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import menuTree from './menuTree'
import storage from '@/utils/storage'
import {mapGetters} from 'vuex'

export default {
  name: 'sideMenu',
  data() {
    return {
      isCollapse: false,
      menuList: null,
      title: 'VLT管理系统'
    }
  },
  computed: {
    ...mapGetters(['entry'])
  },
  created () {
    this.getList();
  },
  mounted () {
    const self = this;
    self.eventBus.$on('menuCollapse', value => {
      self.isCollapse = value;
    });
  },
  watch: {
    // $route(to) {
    //   if (this.menuList.length > 0) {
    //     this.routerAuthorize();
    //   }
    // }
  },
  methods: {
    // 获取菜单列表
    async getList() {
      const self = this;
      const res = await self.$api.getMenu({
        data: {
          source: storage.get('source')
        }
      });
      if (res && res.code == 0) {
        console.log('menu-data', res[self.entry.menuId].content[0].childResources);
        let n = 0;
        self.menuList = res[self.entry.menuId].content[0].childResources;
        // 菜单过滤
        (function filter(treeData) {
          for (let i = 0, len = treeData.length; i < len; i++) {
            let children = treeData[i].childResources || [];
            if (!children && children.length == 0) {
              return;
            }
            // 最顶层菜单添加class
            if (n === 0) {
              treeData.map(item => {item.className = 'top-menu-item'});
            }
            n++;
            // 删除图标(最上级以下全部清除)
            if (n > 0) {
              children.map(item => {delete item.icon});
            }
            // 过滤按钮、已冻结菜单
            // treeData[i].childResources = children.filter(item => {
            //   if (item.type === 0 && item.status === 0) {
            //     return true;
            //   }
            // });
            filter(children);
          }
        })(self.menuList);
        // self.routerAuthorize();
      }
    },
    // 路由权限控制
    // routerAuthorize() {
    //   const self = this;
    //   let isFind = false;
    //   (function find(treeData) {
    //     for (let i = 0; i < treeData.length; i++) {
    //       let children = treeData[i].childResources || [];
    //       if (!children && children.length == 0) {
    //         return;
    //       }
    //       if (treeData[i].url === (self.$route.meta.parentName || self.$route.name)) {
    //         isFind = true;
    //         return;
    //       }
    //       find(children);
    //     }
    //   })(self.menuList);
    //   // 未找到匹配的路由跳转到默认路由
    //   if (!isFind) {
    //     let name = self.menuList[0].url;
    //     if (self.menuList[0].childResources && self.menuList[0].childResources.length) {
    //       name = self.menuList[0].childResources[0].url
    //     }
    //     self.$router.push({
    //       name
    //     });
    //   }
    // },
    handleOpen(key, keyPath) {
      // // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // // console.log(key, keyPath);
    },
    select(index, indexPath) {
      // // console.log(index, indexPath)
    }
  },
  components: {
    menuTree
  }
}
</script>

<style lang="less">
  .sideMenu-container{
    float: left;
    text-align: left;
    height: 100%;
    overflow: hidden;
    background-color: #1F263E;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently */
    .menu-wrapper{
      position: absolute;
      left: 0;
      top: 80px;
      bottom: 0;
      width: 100%;
      overflow: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background-color: rgba(0,0,0,0.6);
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
        background-color: transparent;
      }
    }
    .el-row,.menu-group,.el-menu{
      height: 100%;
    }
    .el-menu-item,.el-submenu__title{
      color: rgba(255,255,255,0.6);
      &:hover{
        background-color: #303750;
      }
    }
    .el-menu-item:focus{
      background-color: transparent;
    }
    .el-menu{
      border-right: none;
      width: 220px;
      background-color: transparent;
      .el-menu-item.is-active{
        color: rgba(255,255,255,1);
        font-size: 15px;
        &:focus{
          background-color: transparent;
        }
      }
      &.el-menu--collapse{
        width: 64px;
        .el-submenu__title{
          .el-submenu__icon-arrow{
            display: none;
          }
        }
        .submenu-title{
          .title{
            display: none;
          }
        }
        .menu-logo{
          .ct{
            width: auto;
          }
          .iconfont{
            font-size: 24px;
          }
          .name{
            display: none;
          }
        }
      }
      .is-opened{
        .el-menu{
          // background-color: #303750;
        }
      }
    }

    .menu-logo{
      color: #ffffff;
      line-height: 70px;
      font-size: 0;
      text-align: center;
      .ct{
        width: 200px;
        height: 70px;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        display: inline-block;
        vertical-align: top;
        border-bottom: 1px solid rgba(248,249,251,0.2);
      }
      .name{
        font-size: 20px;
        display: inline-block;
        vertical-align: top;
        word-break: keep-all;
        margin-left: 7px;
      }
      .iconfont{
        color: #E60012;
        font-size: 36px;
      }
    }

    .el-submenu__title {
      .iconfont{
        font-size: 18px;
        color: rgba(255,255,255,0.6);
        width: 24px;
        text-align: center;
        display: inline-block;
        margin-right: 3px;
      }
      .el-submenu__icon-arrow{
        font-size: 14px;
        color: rgba(255,255,255,0.6);
      }
    }
    .top-menu-item{
      &.is-opened{
        >.el-submenu__title{
          position: relative;
          color: rgba(255,255,255,1);
          background-color: #303750;
          .iconfont,.el-submenu__icon-arrow{
            color: rgba(255,255,255,1);
          }
        }
        >.el-submenu__title:before{
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 4px;
          height: 100%;
          background-color: #409EFF;
        }
      }
  }
  }
</style>