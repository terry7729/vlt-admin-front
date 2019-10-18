<!-- 渠道终端管理 - 设备管理 -->
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
        title: '设备管理',
        icon: '',
        list: [{
          id: 0,
          name: '设备列表',
          active: true,
          url: 'equipmentList',
        },{
          id: 1,
          name: '配件列表',
          active: false,
          url: 'accessoriesList',
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
      if (val.name == "equipment") {
        this.$router.push({
          name: 'equipmentList'
        })
      }
    }
  },
  beforeCreate () {
    if (this.$router.history.current.name ==  "equipment") {
        this.$router.push({
        name: 'equipmentList'
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
          border-left: 1px solid #e6e6e6;
    }
  }
</style>
