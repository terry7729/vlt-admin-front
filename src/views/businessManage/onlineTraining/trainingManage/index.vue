<template>
  <div class="vlt-card">
    <el-tabs tab-position="left" v-model="active">
      <el-tab-pane label="培训计划" name="1">
        <training-plan></training-plan>
      </el-tab-pane>
      <el-tab-pane label="培训项目" name="2">
        <training-project></training-project>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import TrainingPlan from './trainingPlanList'
import TrainingProject from './trainingProjectList'

export default {
  name: "",
  components: {
    TrainingPlan,
    TrainingProject
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
