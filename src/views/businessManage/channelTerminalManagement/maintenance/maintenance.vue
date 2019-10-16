<!-- 渠道终端管理 - 维修管理 -->
<template>
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
        title: '服务分析',
        icon: '',
        list: [{
          id: 0,
          name: '维修工单',
          active: true,
          url: 'repairWork',
        },{
          id: 1,
          name: '置换工单',
          active: false,
          url: 'replacementWork',
        }]
      }
    };
    
  },
  components: {
    "terminal-sideMenu": terminalSideMenu
  },
  created () {
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
          border-left: 1px solid #e6e6e6;
    }
  }
</style>