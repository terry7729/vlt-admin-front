<template>
  <!-- 型号管理新增页面 -->
  <div class="vlt-card modelAdd-page">
    <div class="vlt-edit-single">
      <h2 class="title">新增型号管理</h2>
      <div class="vlt-edit-wrap">
        <span class="goods-cate">物品类别</span>
        <el-form class="goods">
          <el-form-item>
            <el-select v-model="selectValue" placeholder="请选择" @change="changeOption">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form
          v-if="selectValue === 1"
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
            <!-- <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :data="upData"
              :auto-upload="false"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="upFile"
              :before-remove="beforeRemove"
              :limit="3"
              :on-exceed="handleExceed"
              multiple
              :file-list="fileList"
              >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>-->
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
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit('form')">提交并保存</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "modelAdd",
  data() {
    return {
      selectValue: 1,
      value: "",
      options: [{ value: 1, label: "设备" }, { value: 2, label: "配件" }],
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
      params: {},
      form1: {},
      form2: {},
      dialogImageUrl: "",
      dialogVisible: false,
      equipmentData: [
        // {title:'物品类别',type:'select',prop:'goodsCategory',options:[{label:'',value:''},{label:'',value:''}]},
        { title: "设备名称", type: "select", prop: "goodsId", options: [] },
        { title: "设备型号", type: "input", prop: "deviceModel", value: "" },
        { title: "设备单价", type: "input", prop: "unitPrice", value: "" },
        {
          title: "供应商",
          type: "select",
          prop: "providerId",
          options: [
            { label: "供应商1", value: 1 },
            { label: "供应商2", value: 2 }
          ]
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
          prop: "goodsId",
          options: [{ label: "", value: "" }, { label: "", value: "" }]
        },
        { title: "配件型号", type: "input", prop: "deviceModel", value: "" },
        { title: "配件单价", type: "input", prop: "unitPrice", value: "" },
        {
          title: "供应商",
          type: "select",
          prop: "providerId",
          options: [
            { label: "供应商1", value: 1 },
            { label: "供应商2", value: 2 }
          ]
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
        goodsId: [{ required: true, trigger: "blur" }],
        upperLimit: [
          { required: true, validator: rules.checkEmptyNumber, trigger: "blur" }
        ],
        lowerLimit: [
          { required: true, validator: rules.checkEmptyNumber, trigger: "blur" }
        ],
        unitPrice: [
          { required: false, validator: rules.numberVal, trigger: "blur" }
        ],
        deviceModel: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        unitPrice: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentPrice: [
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
      imgUrl: [],
      deviceDatas: {
        options: []
      }
    };
  },
  components: {},
  computed: {},
  created() {
    this.changeOption();
  },
  methods: {
    changeForm(val) {
      Object.assign(this.params, val);
      // console.log("派发出来的参数", this.params, val);
    },
    getModelTrees(type) {
      const _this = this;
      (async type => {
        let data = {};
        if (type == "") {
          data = "";
        } else {
          data = {
            goodsType: type
          };
        }
        let res = await _this.$api.getModelTrees({ data });
        if (res && res.code == 0) {
          let options = [];
          if (res.data) {
            res.data.forEach(item => {
              if (item.modelInfoVoList.length > 0) {
                options.push({
                  label: item.goodsName,
                  value: item.id
                });
              }
            });

            if (type == 1) {
              _this.$set(_this.equipmentData[0], "options", options);
              _this.deviceDatas = res.data.filter(item => {
                return item.modelInfoVoList.length > 0;
              });
              // console.log('00000', _this.deviceDatas);
              _this.modelAvailablesList[0].nameOptions = options;
            } else if (type == 2) {
              _this.$set(_this.mountingsData[0], "options", options);
            }
          } else {
            _this.$message.warning("没有获取到型号");
          }
          // console.log('下拉框', _this.equipmentData[0], options);
        } else {
          // self.$message.warning(res.msg);
        }
        // console.log("返回的数据", res);
      })(type);
    },
    changeOption() {
      console.log("this.selectValue", this.selectValue);
      if (this.selectValue == 1) {
        this.getModelTrees(1);
      } else if (this.selectValue == 2) {
        this.getModelTrees(2);
      } else {
        this.getModelTrees();
      }
    },
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
      // console.log('this.modelOptions', this.modelAvailablesList.modelOptions[index]);
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
      let res = await this.$api.uploadGoodsType({
        data: formData,
        onUploadProgress(evt) {
          console.log("上传进度事件:", evt);
        }
      });
      console.log("uploadFile", res);
      if (res && res.code == 0) {
        this.$message.success(res.data.msg);
        this.imgUrl.push(res.data.filePath);
        console.log("imgUrl", this.imgUrl);
      }
    },
    // 上传文件超出个数
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //提交保存
    submit(form) {
      let modelAvailablesList = [];
      if (this.selectValue == 1) {
      } else if (this.selectValue == 2) {
        console.log(this.modelAvailablesList);
        this.modelAvailablesList.forEach(item => {
          modelAvailablesList.push({
            modelId: item.modelId
          });
        });
        console.log(modelAvailablesList);
      }
      this.$refs["baseForm"].validate(async valid => {
        if (valid === "true") {
          let data = this.params;
          // console.log(this.params, this.imgUrl);
          data.files = this.imgUrl.join(",");
          data.modelAvailablesList = modelAvailablesList;
          // console.log(data);
          let res = await this.$api.modelCreate({ data });
          console.log(res);
          if (res && res.code == 0) {
            this.$message({
              message: "新增成功",
              type: "success"
            });
            this.$router.push({ path: "basicInfoManage" });
          } else {
          }
        }
      });
    },
    clearDevice(index) {
      if (this.modelAvailablesList.length < 2) {
        return;
      }
      this.modelAvailablesList.splice(index, 1);
    },
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
    padding-top: 10px;
  }
  .typeSelect {
    position: relative;
    margin-left: 52px;
    margin-top: -16px;
    .el-select {
      width: 190px !important;
      display: inline-block;
      &:first-child {
        margin-right: 20px;
      }
    }
    .el-icon-close {
      position: absolute;
      top: 15px;
      right: -20px;
      color: #333;
    }
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
