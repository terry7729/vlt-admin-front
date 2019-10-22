<template>
  <div class="vlt-card">
    <el-tabs tab-position="left" v-model="active">
      <el-tab-pane label="题库管理" name="1">
        <question-bank></question-bank>
      </el-tab-pane>
      <el-tab-pane label="考试档案" name="2">
        <examination-archives></examination-archives>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import QuestionBank from './questionBank'
import ExaminationArchives from './examinationArchives'

export default {
  name: "",
  components: {
    QuestionBank,
    ExaminationArchives
  },
  data() {
    return {

    }
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>
</style>
