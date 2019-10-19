<template>
  <div class="terminal-side">
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
              <i class="iconfont el-icon-s-home"></i>
              <span class="name">{{menuList.title}}</span>
            </span>
          </li>
          <li class="menu-wrapper">
            <menu-tree :menuData="menuList.list"></menu-tree>
          </li>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import menuTree from "@/components/main/menuTree";
import { sync } from "glob";
// businessManageTrimimal
export default {
  name: "accountMoneyMenu",
  props: {
    menuList: {
      type: Object
    }
  },
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {},
  created() {},
  mounted() {
    // console.log(this.menuList);
  },
  watch: {
    $route() {
      // console.log("router", this.$router);
    }
  },
  methods: {
    async getMenuList() {
      const self = this;
      let resp = await self.$api.getChannelTerminalMenu({
        data: {
          source: []
        }
      });
    },
    handleOpen() {
      console.log("handleOpen");
    },
    handleClose() {
      console.log("handleClose");
    }
  },
  components: {
    "menu-tree": menuTree
  }
};
</script>

<style lang="less">
.terminal-side {
  color: #000;
  background: #fff;
  .menu-logo {
    padding-left: 20px;
    line-height: 40px;
    color: #000;
    .iconfont {
      margin-right: 10px;
      font-size: 20px;
      color: #333;
    }
  }
  .el-menu {
    border-right: 0;
    .el-menu-item {
      height: 50px;
      line-height: 50px;
      padding-left: 50px !important;
      &.is-active {
        position: relative;
        background: #e6f7ff;
        &:after {
          position: absolute;
          right: 0;
          top: 0;
          display: block;
          content: "";
          width: 3px;
          height: 100%;
          background: #1890ff;
        }
      }
    }
  }
}
</style>