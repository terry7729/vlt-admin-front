<template>
  <div class="vlt-card">
    <el-tabs tab-position="left" v-model="active">
      <el-tab-pane label="计划列表" name="1">
        <plan-list v-if="active=='1'"></plan-list>
      </el-tab-pane>
      <el-tab-pane label="计划汇总（省）" name="2">
        <plan-city v-if="active=='2'"></plan-city>
      </el-tab-pane>
      <el-tab-pane label="计划汇总（地市）" name="3">
        <plan-province v-if="active=='3'"></plan-province>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import PlanList from './developmentPlanList'
import PlanCity from './developmentPlanCity'
import PlanProvince from './developmentPlanProvince'

export default {
  name: "",
  components: {
    PlanList,
    PlanCity,
    PlanProvince
  },
  data() {
    return {
      active: '1'
    }
  },
  methods: {
    getStoreList(row) {
      const self = this;
      const data = {
        orderId: row.orderId
      };
      (async (data)=>{
				let res = await self.$api.getStoreList({data})
				if(res && res.code == 0) {
          self.$message.success('注销成功')
          row.orderStatus = 6;
          self.getLotteryList(self.param)
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
  },
}
</script>

<style lang="less" scoped>
</style>
