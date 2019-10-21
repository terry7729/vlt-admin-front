<!-- 渠道终端管理 - 服务分析 -->
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
  name: "serviceAnalysis",
  data() {
    return {
      menuData: {
        id: 0,
        title: '年度发展计划',
        icon: '',
        list: [{
          id: 0,
          name: '计划列表',
          active: true,
          url: 'developmentPlanList',
        },{
          id: 1,
          name: '计划汇总（省）',
          active: false,
          url: 'developmentPlanProvince',
        },{
          id: 2,
          name: '计划汇总（地市）',
          active: false,
          url: 'developmentPlanCity',
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
      padding: 0;
    }
  }
</style>
