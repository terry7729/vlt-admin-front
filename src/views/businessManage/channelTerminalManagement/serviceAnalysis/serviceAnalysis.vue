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
        title: '服务分析',
        icon: '',
        list: [{
          id: 0,
          name: '维修效率分析',
          active: true,
          url: 'maintenanceEfficiency',
        },{
          id: 1,
          name: '维修员排行',
          active: false,
          url: 'maintenanceStaff',
        },{
          id: 2,
          name: '设备故障排行',
          active: false,
          url: 'equipmentFailure',
        },{
          id: 3,
          name: '配件故障排行',
          active: false,
          url: 'accessoryFault',
        }]
      }
    };
    
  },
  components: {
    "terminal-sideMenu": terminalSideMenu
  },
  watch: {
    $route (val) {
      // console.log(val);
      if (val.name == "serviceAnalysis") {
        this.$router.push({
          name: 'maintenanceEfficiency'
        })
      }
    }
  },
  beforeCreate () {
    if (this.$router.history.current.name ==  "serviceAnalysis") {
        this.$router.push({
        name: 'maintenanceEfficiency'
      })
    }
    // console.log(this.$router);
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
