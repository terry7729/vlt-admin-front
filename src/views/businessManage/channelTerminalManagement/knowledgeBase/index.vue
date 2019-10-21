<template>
  <!-- 维护知识库 -->
  <div class="vlt-card vc-plr0">
    <el-container>
      <el-aside width="200px">
        <terminal-sideMenu :menuList="menuData"></terminal-sideMenu>
      </el-aside>
      <el-main>
        <div class="main-body">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script type="text/javascript">
import terminalSideMenu from "@/views/businessManage/channelTerminalManagement/components/terminalSideMenu";
export default {
  name: "maintenance",
  data() {
    return {
      menuData: {
        id: 0,
        title: "维修知识库",
        icon: "",
        list: [
          {
            id: 0,
            name: "维修知识库",
            active: true,
            url: "knowledgeBase"
          },
          {
            id: 1,
            name: "知识库审核",
            active: false,
            url: "baseReview"
          },
        ]
      }
    };
  },
  components: {
    "terminal-sideMenu": terminalSideMenu
  },
  watch: {
    $route(val) {
      // console.log(val);
      if (val.name == "knowledgeBaseIndex") {
        this.$router.push({
          name: "knowledgeBase"
        });
      }
    }
  },
  beforeCreate() {
    if (this.$router.history.current.name == "knowledgeBaseIndex") {
      this.$router.push({
        name: "knowledgeBase"
      });
    }
  },
  created() {
    // this.$router.push({
    //   name: 'maintenanceEfficiency'
    // })
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.vlt-card {
  .el-main {
    padding: 0;
    border-left: 1px solid #e6e6e6;
  }
}
</style>
