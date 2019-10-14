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
import terminalSideMenu from "@/components/main/terminalSideMenu";
export default {
  name: "",
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
          url: 'accessoryFault',
        },{
          id: 2,
          name: '设备故障排行',
          active: false,
          url: 'equipmentFailure',
        },{
          id: 3,
          name: '配件故障排行',
          active: false,
          url: 'maintenanceStaff',
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
</style>
