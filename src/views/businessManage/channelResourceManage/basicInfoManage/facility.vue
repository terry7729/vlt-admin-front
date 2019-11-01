<template>
  <div class="vlt-card modelAdd-page">
    <div class="vlt-edit-single">
      <div class="vlt-edit-wrap">
        <test-form
          :options="formData"
          ref="baseForm"
          labelWidth="140px"
          :rules="rules"
          direction="right"
          @change="changeForm"
        >
          <el-upload
            slot="upload"
            class="gameIcon-uploader"
            action
            :limit="3"
            accept=".png, .jpg, .jpeg"
            :show-file-list="false"
            :on-remove="handleRemove"
            :http-request="uploadFileImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="gameIcon" />
            <i v-else class="el-icon-plus gameIcon-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过500kb</div>
          </el-upload>
        </test-form>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      options: [
        {
          title: "物品类别",
          type: "select",
          prop: "goodsType",
          value: 2,
          disabled: true,
          options: [{ label: "设备", value: 1 }, { label: "配件", value: 2 }]
        },
        {
          title: "设备名称",
          type: "select",
          prop: "goodsId",
          value: "",
          options: []
        },
        {
          title: "设备型号",
          type: "input",
          prop: "deviceModel",
          value: ""
        },
        { title: "设备单价", type: "input", prop: "unitPrice", value: "" },
        {
          title: "供应商",
          type: "select",
          prop: "providerId",
          value: "",
          options: [
            { label: "供应商1", value: 1 },
            { label: "供应商2", value: 2 }
          ]
        },
        { title: "预警上限", type: "input", prop: "upperLimit", value: "" },
        { title: "预警下限", type: "input", prop: "lowerLimit", value: "" },
        { title: "厂家信息", type: "input", prop: "manufactorInfo", value: "" },
        { title: "上传图片", type: "slot", prop: "slot", slotName: "upload" },
        { title: "备注", type: "textarea", prop: "remark", value: "" }
      ],
      rules: {},
      formData: [],
      useDeviceData: [],
      modelId: "",
      files: "",
      imageUrl: ""
    };
  },
  created() {
    this.formData = this.options;
    this.modelDetail();
    this.getModelTrees(1);
  },
  methods: {
    //获取配件的详情
    async modelDetail() {
      const self = this;
      let id = this.$route.query.id;
      let result = await this.$api.modelDetail({ data: id });
      this.goodsId = result.data.goodsModelVo.goodsId;
      this.modelId = result.data.goodsModelVo.id;
      // result.data.goodsModelVo.modelAvailablesList.forEach((item, index) => {
      //   this.modelAvailablesList.push({
      //     id: item.id,
      //     goodsId: item.goodsId,
      //     modelId: item.modelId,
      //     nameOptions: this.nameOptions,
      //     modelOptions: []
      //   });
      //   self.changeDeviceId(item.goodsId, index);
      // });
      // console.log("this.initArr", this.initArr);
      this.options.forEach(item => {
        item.value = result.data.goodsModelVo[item.prop];
        if (item.prop == "goodsType") {
          item.value = 1;
        }
      });
      this.status = result.data.goodsModelVo.status;
    },
    // 获取物品名称列表
    async getModelTrees(goodsType) {
      let data = { goodsType };
      let res = await this.$api.getModelTrees({ data });
      this.useDeviceData = res.data;
      let arr = res.data.map(item => {
        return { label: item.goodsName, value: item.id };
      });
      // 用于可用机型的下拉框
      // this.nameOptions = arr;
      this.$formMethods.set(this.options, "goodsId", "options", arr);
      // this.modelDetail(); // 初始化
    },
    changeForm(val) {
      this.param = this.$formMethods.get(val);
      console.log(this.param);
    },
    //提交保存
    async submit() {
      this.$refs.baseForm.validate(res => {
        let data = this.param;
        data.id = Number(this.$route.query.id);
        data.files = this.files;
        data.status = this.status;
        delete data.slot;
        data.modelAvailablesList = this.deviceParam;
        console.log(data);
        this.modelWrite(data);
      });
    },
    //修改设备
    async modelWrite(data) {
      const self = this;
      let result = await this.$api.modelWrite({ message: "修改成功", data });
      this.$router.push("basicInfoManage");
      console.log("result", result);
    },
    // 图标上传
    async uploadFileImg(files) {
      let formData = new FormData();
      formData.append("file", files.file);
      // formData.append('refId', '');
      // formData.append('flag', true);
      // formData.append('busType', 6);
      const res = await this.$api.uploadGoodsType({
        data: formData,
        onUploadProgress(evt) {
          console.log("上传进度事件:", evt);
        }
      });
      console.log("uploadFile", res);
      this.files = res.data.filePath;
      this.imgUrl = res.data.filePath;
    },
    //  移除文件
    handleRemove(res, file, fileList) {},
    //取消
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
