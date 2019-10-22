<template>
  <div class="vlt-card">
    <el-tabs tab-position="left" v-model="active">
      <el-tab-pane label="课程列表" name="1">
        <plan-list></plan-list>
      </el-tab-pane>
      <el-tab-pane label="标签列表" name="2">
        <plan-city></plan-city>
      </el-tab-pane>
      <el-tab-pane label="类型列表" name="3">
        <plan-province></plan-province>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "",
  components: {
    
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
