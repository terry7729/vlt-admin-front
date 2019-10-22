<template>
  <div class="vlt-card">
    <el-tabs tab-position="left" v-model="active">
      <el-tab-pane label="计划列表" name="1">
        <plan-list></plan-list>
      </el-tab-pane>
      <el-tab-pane label="计划汇总（省）" name="2">
        <plan-city></plan-city>
      </el-tab-pane>
      <el-tab-pane label="计划汇总（地市）" name="3">
        <plan-province></plan-province>
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
  },
}
</script>

<style lang="less" scoped>
</style>
