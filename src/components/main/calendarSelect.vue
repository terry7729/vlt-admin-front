<!-- 首页 - 日期选项 -->
<template>
  <div class="module-calemdar">
    <el-row>
      <el-col :span="10">
        <el-calendar v-model="value"></el-calendar>
      </el-col>
      <el-col :span="12" :getter="1">
          <el-table>

        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date()
    };
  }
};
</script>

<style lang="scss" scoped>
</style>