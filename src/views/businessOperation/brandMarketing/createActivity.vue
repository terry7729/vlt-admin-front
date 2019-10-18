<template>
  <div class="vlt-card create-active">
    <el-steps :active="activeStep" finish-status="success" simple style="margin-top: 20px">
      <el-step title="模板选择"></el-step>
      <el-step title="模板预览"></el-step>
      <el-step title="创建计划"></el-step>
    </el-steps>

    <preview-template v-show="stepOne">
      <template v-slot:header>
        <div class="header-box">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="模板选择">
              <el-select v-model="value" size="small" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template v-slot:addForm>
        <div class="addForm-box">
          <el-form class="add-form" ref="form" :model="form" label-width="80px">
            <el-form-item label="是否发布消息">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="不发送" name="type"></el-checkbox>
                <el-checkbox label="发送短信" name="type"></el-checkbox>
                <el-checkbox label="终端/APP推送" name="type"></el-checkbox>
                <el-checkbox label="发送短信与终端/APP推送" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item class="add-textarea" label="消息内容">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template v-slot:footer-btn>
        <div class="footer-btn">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button type="primary" size="small" @click="nextStep">下一步</el-button>
        </div>
      </template>
    </preview-template>

    <preview-template v-show="stepTwo">
      <template v-slot:header>
        <div class="header-box">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="模板预览"></el-form-item>
          </el-form>
        </div>
      </template>
      <template v-slot:addForm>
        <div></div>
      </template>
      <template v-slot:upload-file>
        <div></div>
      </template>
      <template v-slot:footer-btn>
        <div class="footer-btn">
          <el-button size="small" @click="prevStep">上一步</el-button>
          <el-button type="primary" size="small" @click="nextStep">使用模板</el-button>
        </div>
      </template>
    </preview-template>

    <preview-template v-show="stepThree">
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
        <div class="footer-btn">
          <el-button size="small" @click="prevStep">上一步</el-button>
          <el-button type="primary" size="small" @click="nextStep">保存</el-button>
        </div>
      </template>
    </preview-template>

    <div v-show="processContent" class="process-content">
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
          <el-aside width="400px">
            <img src="../../../assets/img/avatar.jpg" />
          </el-aside>
          <el-main>
            <section class="comp-item">
              <div class="vlt-edit-single process-form">
                <h2 class="title">新建申请</h2>
                <div class="vlt-edit-wrap">
                  <el-form
                    label-position="right"
                    label-width="90px"
                    :model="processForm"
                    ref="form"
                  >
                    <el-form-item label="处理人">
                      <el-input v-model="processForm.person"></el-input>
                    </el-form-item>
                    <el-form-item label="处理类型">
                      <el-input v-model="processForm.type"></el-input>
                    </el-form-item>
                    <el-form-item label="知会">
                      <el-input v-model="processForm.infoem"></el-input>
                    </el-form-item>
                    <el-form-item label="处理时限类型">
                      <el-input v-model="processForm.timeType"></el-input>
                    </el-form-item>
                    <el-form-item label="处理时限(天)">
                      <el-input v-model="processForm.time"></el-input>
                    </el-form-item>
                    <el-form-item label="任务类型">
                      <el-input v-model="processForm.taskType"></el-input>
                    </el-form-item>
                    <el-form-item label="消息提醒">
                      <el-input v-model="processForm.message"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </section>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script type="text/javascript">
import previewTemplate from "./previewTemplate";
export default {
  name: "",
  data() {
    return {
      activeStep: 0,
      value: "",
      textarea: "",
      uploadShow: false,
      stepOne: true,
      stepTwo: false,
      stepThree: false,
      processContent: false,
      activeName: "activeContent",
      processForm: {},
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        }
      ]
    };
  },
  components: {
    previewTemplate
  },
  methods: {
    cancel() {
      this.$router.push({ path: "planManage" });
    },
    prevStep() {
      const that = this;
      that.$el.parentNode.parentNode.scrollTop = 0;
      if (that.activeStep === 1) {
        that.stepTwo = false;
        that.stepOne = true;
        that.activeStep = 0;
      } else if (that.activeStep === 2) {
        that.stepThree = false;
        that.stepTwo = true;
        that.activeStep = 1;
      }
    },

    nextStep() {
      const that = this;
      that.stepOne = false;
      that.$el.parentNode.parentNode.scrollTop = 0;
      if (that.activeStep === 0) {
        that.stepTwo = true;
        that.activeStep = 1;
      } else if (that.activeStep === 1) {
        that.stepTwo = false;
        that.stepThree = true;
        that.activeStep = 2;
      } else {
        that.stepThree = false;
        that.activeStep = 3;
        that.$router.push({ path: "planManage" });
      }
    },
    handleClick() {
      if (this.activeName === "activeContent") {
        this.stepThree = true;
        this.processContent = false;
      } else {
        this.stepThree = false;
        this.processContent = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.footer-btn {
  width: 200px;
  margin-left: 800px;
  margin-bottom: 20px;
}
.process-content {
  margin-left: 100px;

  .state-inform {
    text-align: right;
    height: 20px;
    margin-top: 10px;
    margin-right: 33%;
  }
  .process-form {
    margin-left: 80px;
    width: 550px;
    background: #eee;
  }
}
</style>
