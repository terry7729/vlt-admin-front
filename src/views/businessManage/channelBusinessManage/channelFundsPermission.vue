<template>
  <div class="vlt-card">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="资金权限" name="1">
        <panel title="资金权限" :show="true" style="margin-bottom:15px">
          <div class="vlt-edit-single">
            <div class="vlt-edit-wrap">
              <base-form :formData="formData" ref="baseForm" :rules="rules" direction="right" labelWidth="120px" @change="changeForm"></base-form>
            </div>
          </div>
        </panel>
        <panel title="其他附件" :show="true" style="margin-bottom:15px">
          <el-form label-position="right" 
            label-width="90px" 
            ref="form"
            class="device-form">
            <el-form-item  label="附件上传">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </panel>
        <div class="submit-wrap">
          <el-row class="vlt-edit-btn">
            <el-button type="primary" size="medium" @click="submit">提交并保存</el-button>
            <el-button size="medium" @click="editShow = !editShow">取消</el-button>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="资金权限流程图" name="2">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "",
  data() {
    return {
      activeName: '1',
      formData: [
        {title: '渠道编号', type: 'input', prop: 'code'},
        {title: '原兑奖额度', type: 'input', prop: 'code'},
        {title: '现兑奖额度', type: 'input', prop: 'code'},
        {title: '原充值额度', type: 'input', prop: 'code'},
        {title: '现充值额度', type: 'input', prop: 'code'},
      ]
    }
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
.submit-wrap{
  text-align: right;
  padding: 10px 0;
}
</style>
