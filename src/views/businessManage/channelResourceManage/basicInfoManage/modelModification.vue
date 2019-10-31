<template>
  <!-- 型号管理修改页面 -->
  <div class="vlt-card modelAdd-page">
    <div class="vlt-edit-single">
      <div class="vlt-edit-wrap">
        <span class="goods-cate">物品类别</span>
        <el-form class="goods">
          <el-form-item>
            <el-select
              v-model="selectValue"
              placeholder="请选择"
              @change="changeOption"
              :disabled="true"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div v-if="this.selectValue === '设备'">
          <span class="goods-cate">设备类型</span>
          <el-form class="goods">
            <el-form-item>
              <el-select
                v-model="formParms.typeOption"
                placeholder="请选择"
                @change="changeTypeOption"
              >
                <el-option
                  v-for="item in typeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="this.selectValue === '设备'">
          <span class="goods-cate">设备名称</span>
          <el-form class="goods">
            <el-form-item>
              <el-select
                placeholder="请选择"
                v-model="formParms.nameOption"
                @change="changeOption"
                :disabled="falg?false:true"
              >
                <el-option
                  v-for="item in nameOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <el-form
          v-if="this.selectValue === '设备'"
          label-position="right"
          label-width="90px"
          :model="form1"
          ref="form1"
        >
          <base-form
            :formData="equipmentData"
            labelWidth="140px"
            ref="baseForm"
            :rules="rules2"
            direction="right"
            @change="changeForm"
          ></base-form>
          <el-form-item label="上传图片" class="upLoadImg">
            <el-upload
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
          </el-form-item>
        </el-form>
        <el-form v-else label-position="right" label-width="90px" :model="form2" ref="form2">
          <base-form
            :formData="mountingsData"
            labelWidth="140px"
            ref="baseForm"
            :rules="rules2"
            direction="right"
            @change="changeForm"
          ></base-form>

          <span class="goods-cate">可用机型</span>
          <el-form-item class="typeSelect" v-for="(ele, index) in modelAvailablesList" :key="index">
            <el-select
              v-model="ele.deviceId"
              placeholder="请选择设备名称"
              @change="changeDeviceId(ele.deviceId, index)"
            >
              <el-option
                v-for="(item,index) in ele.nameOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="ele.modelId" placeholder="请选择设备型号">
              <el-option
                v-for="(item,index) in ele.modelOptions.options"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <i class="el-icon-close" @click="clearDevice(index)" v-if="index > 0"></i>
          </el-form-item>
          <el-form-item>
            <p class="add-btn" @click="addMochine">
              <i class="el-icon-plus"></i>
              <span>新增设备</span>
            </p>
          </el-form-item>
          <el-form-item label="上传图片" class="upLoadImg">
            <el-upload
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
          </el-form-item>
        </el-form>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "modelModification",
  data() {
    return {
      type: 0,
      fitting: "",
      //selectValue: $route.query.modelType,
      modelAvailablesList: [
        {
          //可用机型选择框
          id: 0,
          deviceId: "",
          modelId: "",
          nameOptions: [{ label: "", value: "" }, { label: "", value: "" }],
          modelOptions: {
            options: [{ label: "", value: "" }, { label: "", value: "" }]
          }
        }
      ],
      falg: false,
      typeList: "",
      selectValue: this.$route.query.modelType,
      value: "",
      options: [{ value: 1, label: "设备" }, { value: 2, label: "配件" }],
      //可用机型选择框
      // nameOptions: [{ label: "", value: "1" }, { label: "", value: "2" }],
      // modelOptions: [{ label: "", value: "3" }, { label: "", value: "4" }],
      params: "",
      form1: {},
      form2: {},
      formParms: {
        nameOption: "",
        typeOption: 1
      },
      dialogImageUrl: "",
      dialogVisible: false,
      typeOption: [
        { label: "终端机", value: 1 },
        { label: "柜员机", value: 2 },
        { label: "其他", value: 3 }
      ],
      nameOption: [],

      equipmentData: [
        { title: "设备型号", type: "input", prop: "deviceModel", value: "" },
        { title: "设备单价", type: "input", prop: "unitPrice", value: "" },
        {
          title: "供应商",
          type: "select",
          prop: "providerId",
          value: "",
          options: [{ label: "1", value: "0" }, { label: "2", value: "1" }]
        },
        { title: "预警上限", type: "input", prop: "upperLimit", value: "" },
        { title: "预警下限", type: "input", prop: "lowerLimit", value: "" },
        { title: "厂家信息", type: "input", prop: "manufactorInfo", value: "" },
        { title: "备注", type: "textarea", prop: "remark", value: "" }
      ],
      mountingsData: [
        {
          title: "配件名称",
          type: "select",
          prop: "fittingsName",
          value: "",
          options: []
        },
        { title: "配件型号", type: "input", prop: "deviceModel", value: "" },
        { title: "配件单价", type: "input", prop: "unitPrice", value: "" },
        {
          title: "供应商",
          type: "select",
          prop: "providerId",
          value: "",
          options: [{ label: "1", value: "0" }, { label: "2", value: "1" }]
        },
        { title: "预警上限", type: "input", prop: "upperLimit", value: "" },
        { title: "预警下限", type: "input", prop: "lowerLimit", value: "" },
        { title: "厂家信息", type: "input", prop: "manufactorInfo", value: "" },
        { title: "备注", type: "textarea", prop: "remark", value: "" }
      ],
      rules2: {
        equipmentName: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentPrice: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        upperLimit: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        lowerLimit: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      imageUrl: "",
      imgUrl: "",
      goodsType: "",
      deviceDatas: {
        options: []
      },
      //表单数据
      list: "",
      //可用机型
      useDevice: "",
      goodsId: "",
      files: "",
      status: "",
      initArr: []
    };
  },
  components: {},
  computed: {},
  async created() {
    //获取详情数据 回显
    let id = this.$route.query.id;
    let result = await this.$api.modelDetail({ data: id });
    this.files = result.data.goodsModelVo.files;

    this.status = result.data.goodsModelVo.status;

    this.formParms.nameOption = result.data.goodsModelVo.id;

    this.equipmentData.forEach(item => {
      item.value = result.data.goodsModelVo[item.prop];
    });

    if (this.selectValue === "配件") {
      let id = this.$route.query.id;
      let result = await this.$api.modelDetail({ data: id });
      this.goodsId = result.data.goodsModelVo.goodsId;

      result.data.goodsModelVo.modelAvailablesList.forEach(item => {
        this.initArr.push({
          id: item.id,
          modelId: item.modelId
        });
      });
      console.log(result.data.goodsModelVo.modelAvailablesList);
      console.log("this.initArr", this.initArr);
      this.mountingsData.forEach(item => {
        item.value = result.data.goodsModelVo[item.prop];
      });
    }
    //获取设备名称数据
    this.goodsType = result.data.goodsType;
    this.goodsNameList();
    this.fittingNameList();
    this.getModelTrees();
  },
  methods: {
    //获取机型数据
    async getModelTrees() {
      if (this.goodsType === 2) {
        let data = {
          goodsType: 1
        };
        let res = await this.$api.getModelTrees({ data });
        let options = [];
        res.data.forEach(item => {
          if (item.modelInfoVoList.length > 0) {
            options.push({
              label: item.goodsName,
              value: item.id
            });
          }
        });
        this.modelAvailablesList[0].nameOptions = options;

        options.forEach(item => {
          this.modelAvailablesList[0].nameOptions.value = item.value;
        });

        this.modelAvailablesList[0].nameOptions.value = this.goodsId;
        // console.log(
        //   "------",
        //   this.modelAvailablesList[0].nameOptions,
        //   this.goodsId
        // );
        this.deviceDatas = res.data.filter(item => {
          return item.modelInfoVoList.length > 0;
        });
        // console.log(res);
      }
    },

    // changeOption() {
    //   console.log("this.selectValue", this.selectValue);
    //   this.getModelTrees();
    //   // if (this.selectValue == 1) {
    //   //   this.getModelTrees(1);
    //   // } else if (this.selectValue == 2) {
    //   //   this.getModelTrees(2);
    //   // } else {
    //   //   this.getModelTrees();
    //   // }
    // },

    //可选机型change事件
    changeDeviceId(id, index) {
      this.deviceDatas.forEach(item => {
        if (item.id == id) {
          let option = [];
          if (item.modelInfoVoList.length > 0) {
            for (let i = 0; i < item.modelInfoVoList.length; i++) {
              option.push({
                label: item.modelInfoVoList[i].deviceModel,
                value: item.modelInfoVoList[i].modelId
              });
            }
            this.$set(
              this.modelAvailablesList[index].modelOptions,
              "options",
              option
            );
            this.modelAvailablesList[index].modelId =
              item.modelInfoVoList[0].modelId;
            this.modelAvailablesList[index].modelOptions.options[0].label =
              item.modelInfoVoList[0].deviceModel;

            console.log(
              "modelOptions",
              this.modelAvailablesList[index].modelOptions.options[0].value,
              item.modelInfoVoList[0].deviceModel,
              item.modelInfoVoList
            );
            this.modelAvailablesList[index].modelOptions.options[0].value = "";
          } else {
            this.modelAvailablesList[index].modelId = "";
            this.$set(
              this.modelAvailablesList[index].modelOptions,
              "options",
              []
            );
          }
        }
      });
    },
    async goodsNameList() {
      let data = { goodsType: this.goodsType };
      let res = await this.$api.getModelTrees({ data });
      let info = res.data;
      info.forEach(item => {
        // console.log(item);
      });
      // console.log(res);
      this.goodsId = res.data.id;
      let hi = res.data;
      let arr = hi.map(item => {
        return { label: item.goodsName, value: item.id };
      });
      this.nameOption = arr;

      this.change(1);
    },
    async fittingNameList() {
      let data = { goodsType: this.goodsType };
      let res = await this.$api.getModelTrees({ data });
      let hi = res.data;
      // console.log(hi);
      let arr = hi.map(item => {
        return { label: item.goodsName, value: item.id };
      });
      // console.log("rrr", arr);
      this.mountingsData[0].options = arr;
      let obj = arr.forEach(item => {
        this.mountingsData[0].value = item.value;
      });
      // this.mountingsData[0].value = arr;
      // console.log(this.mountingsData[0].value);
      this.change(1);
    },
    changeTypeOption(val) {
      this.change(val);
      this.type = val;
    },
    change(val) {
      // console.log(val);
      if (val === 3) {
        this.falg = true;
        this.formParms.nameOption = "";
      } else if (val === 1 || val === 2) {
        this.typeOption.forEach(item => {
          this.nameOption.forEach(i => {
            if (item.value === val && item.label === i.label) {
              this.formParms.nameOption = i.value;
              this.falg = false;
            }
          });
        });
      }
    },
    changeForm(val) {
      // console.log(val);
      this.list = val;
      this.fitting = val;
      // if (val.goodsTypes === 0) {
      //   this.$set(this.equipmentData[1], "disabled", true);
      // } else if (val.goodsTypes === 1) {
      //   this.$set(this.equipmentData[1], "disabled", true);
      // } else {
      //   this.equipmentData[1].disabled = false;
      // }
    },
    changeOption() {
      // console.log(this.selectValue);
    },
    handlePictureCardPreview(file) {},
    //  移除文件
    handleRemove(res, file, fileList) {},
    beforeRemove(file, fileList) {},
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
      this.imgUrl = res.data.filePath;
    },
    // 上传文件超出个数
    handleExceed(files, fileList) {},
    //提交保存
    async submit() {
      if (this.selectValue === "设备") {
        let info = this.list;
        let id = this.$route.query.id;
        console.log(id);
        let type = {
          deviceType: this.type
        };
        let data = {
          ...info,
          ...type,
          id,
          goodsId: this.formParms.nameOption,
          files: this.files,
          status: this.status
        };
        console.log(data);
        let res = await this.$api.modelWrite({ message: "设备修改成功", data });
        this.$router.push({ basicInfoManage });
        console.log(res);
      } else {
        let modelAvailablesList = [];
        console.log("----", this.initArr);
        this.modelAvailablesList.forEach((item, index) => {
          if (index == 0) {
            // if (this.initId == item.modelId) {
            //   modelAvailablesList.push({
            //     id: this.initId
            //   });
            // } else {
            //   modelAvailablesList.push({
            //     id: this.initId,
            //     modelId: item.modelId
            //   });
            // }
          } else {
            // modelAvailablesList.push({
            //   modelId: item.modelId
            // });
          }
        });

        let data = this.fitting;
        data.goodsId = this.formParms.nameOption;
        data.files = this.files;
        data.status = this.status;
        data.modelAvailablesList = modelAvailablesList;

        console.log(data, modelAvailablesList);
      }
      // this.$refs["baseForm"].validate(async valid => {
      //   if (valid === "true") {
      //     let data = this.params;
      //     data.files = this.imgUrl.join(",");
      //     let res = await this.$api.modelCreate({ data });
      //     console.log(res);
      //     if (res || res.code == 0) {
      //       this.$message({
      //         message: "新增成功",
      //         type: "success"
      //       });
      //       this.$router.push({ path: "basicInfoManage" });
      //     }
      //   }
      // });
      // this.$refs[form].validate(async valid => {
      //     if (valid) {
      //     // 表单验证通过后使用组件自带的方法触发上传事件
      //       this.$refs.upload.submit()
      //     } else {
      //       return false;
      //     }
      //   });
    },
    cancel() {
      this.$router.back();
    },
    //新增机型点击事件
    addMochine() {
      if (this.modelAvailablesList.length > 0) {
        let option = [];
        for (let i = 0; i < this.deviceDatas.length; i++) {
          option.push({
            label: this.deviceDatas[i].goodsName,
            value: this.deviceDatas[i].id
          });
        }
        const param = {
          id:
            this.modelAvailablesList[this.modelAvailablesList.length - 1].id +
            1,
          deviceId: "",
          modelId: "",
          nameOptions: option,
          modelOptions: {
            options: []
          }
        };
        this.modelAvailablesList.push(param);
        // console.log('add', this.modelAvailablesList, this.modelAvailablesList[this.modelAvailablesList.length - 1].id);
      }
    },
    //删除新增机型数据
    clearDevice(index) {
      if (this.modelAvailablesList.length < 2) {
        return;
      }
      this.modelAvailablesList.splice(index, 1);
    },
    cancel() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less">
.modelAdd-page {
  .upLoadImg {
    .el-form-item__label {
      margin-left: 52px;
    }
  }
  .goods {
    margin-left: 14px;
    display: inline-block;
  }
  span {
    font-size: 12px;
  }
  .goods-cate {
    margin-left: 78px;
    margin-top: 20px;
  }
  .typeSelect {
    margin-left: 52px;
    margin-top: -16px;
  }
  .add-btn {
    border: 1px dashed #ccc;
    text-align: center;
    height: 36px;
    line-height: 36px;
    margin-left: 50px;
    width: 400px;
    cursor: pointer;
  }
}
</style>
