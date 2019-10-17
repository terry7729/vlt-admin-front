<template>
  <div class="vlt-card create-template">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="公告模板" name="msgTemplate">
        <section class="comp-item">
          <div class="vlt-edit-single">
            <div class="vlt-edit-wrap form-detail">
              <h3>基本信息</h3>
              <el-form label-width="90px" :model="form" ref="form">
                <base-form
                  :formData="baseData"
                  labelWidth="140px"
                  ref="baseForm"
                  :rules="rule3"
                  direction="right"
                  @change="changeForm"
                ></base-form>
                <el-form-item label="上传文件"   class="upload-demo">
                  <el-upload
                  
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </section>
      </el-tab-pane>
      <el-tab-pane label="公告模板流程图" name="processImg">
        <h3>公告模板流程图</h3>
        <div style="margin-left:200px;">
          <img src="../../../assets/img/avatar.jpg" alt />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      form:{},
      rule3: {},
      fileList:[],
      activeName: "msgTemplate",
      baseData: [
        { type: "input", title: "模板名称", prop: "test" },
        {
          type: "select",
          title: "公告类型",
          prop: "template",
          options: [
            { label: "模板1", value: "0" },
            { label: "模板2", value: "1" }
          ]
        },
        {
          type: "select",
          title: "内容类型",
          prop: "template",
          options: [
            { label: "图片", value: "2" },
            { label: "视频", value: "3" }
          ]
        },
        {
          type: "select",
          title: "渠道类型",
          prop: "template",
          options: [
            { label: "线下", value: "4" },
            { label: "线上", value: "5" }
          ]
        },

        {
          type: "select",
          title: "播放时长",
          prop: "time",
          options: [
            { label: "一分钟", value: "6" },
            { label: "一小时", value: "7" }
          ]
        },
        { type: "textarea", title: "模板备注", prop: "all" }
      ]
    };
  },
  components: {},
  methods: {
    changeForm() {},
    handleClick() {},
    handlePreview(){},
    handleRemove(){},
    beforeRemove(){},
    handleExceed(){},
  }
};
</script>

<style lang="less" scoped>
.create-template {
  .form-detail {
    margin-left: 50px;
    margin-top: 50px;
    .upload-demo{
      margin-left: 50px;
    }
  }
}
</style>
