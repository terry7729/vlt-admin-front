<template>
  <div class="vlt-card">
    <div class="vlt-edit-single">
      <el-form
        label-position="right"
        label-width="90px"
        :model="form"
        ref="form"
        class="device-add"
      >
        <base-form
          :formData="data2"
          ref="baseForm"
          :rules="rules2"
          direction="right"
          @change="changeForm"
        ></base-form>
        <el-form-item label="上传文件">
          <el-upload
            class="upload-demo"
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
      <el-row class="vlt-edit-btn">
        <el-button type="primary" v-prevent="1000" size="medium" @click="submit(form)">提交并保存</el-button>
        <el-button size="medium" @click="cancel">取消</el-button>
      </el-row>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "",
  data() {
    return {
      form: {},
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      data2: [
        { type: "input", title: "户名全称", prop: "accountname" },
        { type: "input", title: "银行接口类型", prop: "bankinterfacetype" },
        { type: "input", title: "银行账号", prop: "bankaccount" },
        {
          type: "select",
          title: "账户类别",
          prop: "typeofaccount",
          option: [
            {
              label: "专用存款账户",
              value: "0"
            },
            {
              label: "专用存款账户2",
              value: "1"
            }
          ]
        },
        {
          type: "select",
          title: "账户属性",
          prop: "accountproperties",
          option: [
            {
              label: "对公账户",
              value: "0"
            },
            {
              label: "对公账户2",
              value: "1"
            }
          ]
        },
        { type: "input", title: "开户行", prop: "openingbank" },
        { type: "datepicker", title: "开户日期", prop: "openingdate" },
        { type: "input", title: "备注", prop: "remark" },
        { type: "input", title: "联系人", prop: "linkman" },
        { type: "input", title: "电话", prop: "telephone" }
      ],
      rules2: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        all: [{ required: true, validator: rules.checkEmail, trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    submit(form) {
      console.log(form);
    },
    cancel() {},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    changeForm() {}
  }
};
</script>

<style lang="less" scoped>
</style>
