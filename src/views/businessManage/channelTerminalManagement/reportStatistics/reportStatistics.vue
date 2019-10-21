<!-- 渠道终端管理 - 报表统计 -->
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
        title: '报表统计',
        icon: '',
        list: [{
          id: 0,
          name: '设备故障报表',
          active: true,
          url: 'reportEquipmentFailure',
        },{
          id: 1,
          name: '设备管理损耗报表',
          active: false,
          url: 'deviceLoss',
        },{
          id: 2,
          name: '配件损耗报表',
          active: false,
          url: 'accessoryLoss',
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
      if (val.name == "reportStatistics") {
        this.$router.push({
          name: 'reportEquipmentFailure'
        })
      }
    }
  },
  beforeCreate () {
    if (this.$router.history.current.name ==  "reportStatistics") {
        this.$router.push({
        name: 'reportEquipmentFailure'
      })
    }
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
        padding: 0;
        border-left: 1px solid #e6e6e6;
    }
  }
</style>
