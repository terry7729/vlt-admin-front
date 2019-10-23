<template>
  <div class="terminal-content">
    <el-row class="tac">
      <el-col class="menu-group">
        <!-- <el-menu
          ref="elMenu"
          :default-active="$route.meta.parentName || $route.name"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :unique-opened="true"
        > -->
          <div class="menu-logo">
            <span class="ct">
              <i class="iconfont el-icon-s-home"></i>
              <span class="name">{{menuList.title}}</span>
            </span>
          </div>
          <div class="menu-wrapper">
             <el-tabs tab-position="left" v-model="activeName" style="height: 700px">
                <el-tab-pane v-for="item in menuList.list" :key="item.id" :label="item.name" :name="item.name" ref="tablist">
                    <slot name="tabContent" :item="item"></slot>
                </el-tab-pane>
             </el-tabs>
          </div>
        <!-- </el-menu> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
// businessManageTrimimal
export default {
  name: "terminalSideMenu",
  props: {
    menuList: {
      type: Object
    }
  },
  data() {
    return {
      isCollapse: false,
      activeName: this.menuList.list[0].name
    };
  },
  computed: {},
  created() {},
  mounted() {
   
  },
  watch: {
    $route() {}
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
  components: {}
};
</script>

<style lang="less">
.terminal-content {
  width: 100%;
  color: #000;
  background: #fff;
  .el-tabs {
    .el-tabs__header {
      width: 200px;
      height: 100%;
      .el-tabs__nav {
         .el-tabs__item.is-left{
          text-align: left;   
          text-indent: 10px;
          &.is-active, &:hover {
             background: #e6f7ff;
          }
        }
      }
    }
    .el-tabs__content {
      height: 100%;
      overflow-y: scroll;
    }
  }
  .menu-logo {
    line-height: 40px;
    color: #000;
    font-weight: 600;
    .iconfont {
      margin-right: 10px;
      font-size: 20px;
      color: #333;
    }
  }
}
</style>