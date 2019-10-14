<template>
  <div class="vlt-card plan-dedail">
    <preview-template v-show="activeContent">
      <template v-slot:header>
        <div class="header-box">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="新建活动计划"></el-form-item>
          </el-form>
          <div style="margin-left:25px;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="活动内容" name="activeContent"></el-tab-pane>
              <el-tab-pane label="审核流程" name="auditProcess"></el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </template>
      <template v-slot:addForm>
        <div></div>
      </template>
      <template v-slot:upload-file>
        <div></div>
      </template>
      <template v-slot:footer-btn>
        <div></div>
      </template>
    </preview-template>

    <div v-show="auditProcess" class="audit-process">
      <el-container>
        <el-header>
          <div class="state-inform">
            <span>状态</span>
            <h2>正常</h2>
          </div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="活动内容" name="activeContent"></el-tab-pane>
            <el-tab-pane label="审核流程" name="auditProcess"></el-tab-pane>
          </el-tabs>
        </el-header>
        <el-container>
          <el-main>
            <div class="vlt-edit-wrap">
              <h2 class="title">流程进度</h2>
              <el-steps :active="3">
                <el-step title="创建活动" description="李某2019-10-14"></el-step>
                <el-step title="部门初审" description="王某"></el-step>
                <el-step title="财务复审" description="赵某"></el-step>
                <el-step title="经理批复" description="某某"></el-step>
              </el-steps>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script type="text/javascript">
import previewTemplate from "./previewTemplate";
export default {
  data() {
    return {
      processForm: {},
      activeName: "activeContent",
      activeContent: true,
      auditProcess: false
    };
  },
  components: {
    previewTemplate
  },
  methods: {
    handleClick() {
      if (this.activeName === "activeContent") {
        this.activeContent = true;
        this.auditProcess = false;
      } else {
        this.activeContent = false;
        this.auditProcess = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
