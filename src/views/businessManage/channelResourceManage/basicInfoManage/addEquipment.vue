<template>
<!-- 类型管理新增页面 -->
  <div class="vlt-card">
    <div class="vlt-edit-single typeAdd-page">
      <h2 class="title">基本信息</h2>
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

        <base-form
          v-if="this.selectValue === 1"
          :formData="equipmentData"
          labelWidth="140px"
          ref="baseForm"
          :rules="rules2"
          direction="right"
          @change="changeForm"
        ></base-form>
        <el-form v-else-if="this.selectValue === 2">
          <base-form
            :formData="facilitiesData"
            labelWidth="140px"
            ref="baseForm"
            :rules="rules2"
            direction="right"
            @change="changeForm"
          ></base-form>
          <el-form-item label="上传图片" class="upload">
            <el-upload action="#" :limit='2' list-type="picture-card" :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt='' />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <!-- 放大 -->
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
        <el-form v-else-if="this.selectValue === 3">
          <base-form
            :formData="consumableData"
            labelWidth="140px"
            ref="baseForm"
            :rules="rules2"
            direction="right"
            @change="changeForm"
          ></base-form>
          <el-form-item label="上传图片" class="upload">
            <el-upload action="#" :limit='2' list-type="picture-card" :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt='' />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <!-- 放大 -->
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
        <base-form
          v-else
          :formData="mountingsData"
          labelWidth="140px"
          ref="baseForm"
          :rules="rules2"
          direction="right"
          @change="changeForm"
        ></base-form>
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
  name: "addEquipment",
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,

      params: {},
      options: [
        { value: 1, label: "设备" },
        { value: 2, label: "设施" },
        { value: 3, label: "耗材" },
        { value: 4, label: "配件" }
      ],
      selectValue: 1,
      equipmentData: [
        { title: "设备名称", type: "input", prop: "equipmentName", value: "" },
        {
          title: "设备单位",
          type: "select",
          prop: "equipmentUnit",
          options: [{ label: "", value: "1" }, { label: "", value: "2" }]
        },
        {
          title: "是否标配",
          type: "radio",
          prop: "isStandard",
          value: "",
          options: [{ label: "是", value: "1" }, { label: "否", value: "0" }]
        },
        {
          title: "是否回收",
          type: "radio",
          prop: "isRecycle",
          value: "",
          options: [{ label: "是", value: "1" }, { label: "否", value: "0" }]
        },
        { title: "备注", type: "textarea", prop: "remark", value: "" }
      ],
      facilitiesData: [
        { title: "设施名称", type: "input", prop: "facilitiesName", value: "" },
        { title: "设施编号", type: "input", prop: "facilitiesCode", value: "" },
        {
          title: "设施单价",
          type: "select",
          prop: "facilitiesUnitPrice",
          options: [{ label: "1", value: "1" }, { label: "2", value: "2" }]
        },
        {
          title: "设施大单位",
          type: "select",
          prop: "facilitiesBigUnit",
          options: [{ label: "1", value: "1" }, { label: "2", value: "2" }]
        },
        {
          title: "设施小单位",
          type: "select",
          prop: "facilitiesSmallUnit",
          options: [{ label: "1", value: "1" }, { label: "2", value: "2" }]
        },
        {
          title: "供应商",
          type: "select",
          prop: "supplier",
          options: [{ label: "1", value: "1" }, { label: "2", value: "2" }]
        },
        { title: "预警上限", type: "input", prop: "upperLimit", value: "" },
        { title: "预警下限", type: "input", prop: "lowerLimit", value: "" },
        { title: "厂家信息", type: "input", prop: "factoryInfo", value: "" },
        { title: "备注", type: "textarea", prop: "remark", value: "" }
      ],
      consumableData:[
        { title: "耗材名称", type: "input", prop: "consumableName", value: "" },
        { title: "耗材编号", type: "input", prop: "consumableCode", value: "" },
        {
          title: "耗材单价",
          type: "select",
          prop: "consumableUnitPrice",
          options: [{ label: "1", value: "1" }, { label: "2", value: "2" }]
        },
        {
          title: "耗材大单位",
          type: "select",
          prop: "consumableBigUnit",
          options: [{ label: "1", value: "1" }, { label: "2", value: "2" }]
        },
        {
          title: "耗材小单位",
          type: "select",
          prop: "consumableSmallUnit",
          options: [{ label: "1", value: "1" }, { label: "2", value: "2" }]
        },
        {
          title: "供应商",
          type: "select",
          prop: "supplier",
          options: [{ label: "1", value: "1" }, { label: "2", value: "2" }]
        },
        { title: "预警上限", type: "input", prop: "upperLimit", value: "" },
        { title: "预警下限", type: "input", prop: "lowerLimit", value: "" },
        { title: "厂家信息", type: "input", prop: "factoryInfo", value: "" },
        { title: "备注", type: "textarea", prop: "remark", value: "" }
      ],
      mountingsData:[
        { title: "配件名称", type: "input", prop: "mountingsName", value: "" },
        {
          title: "配件单位",
          type: "select",
          prop: "mountingsUnit",
          options: [{ label: "", value: "1" }, { label: "", value: "2" }]
        },
        {
          title: "是否回收",
          type: "radio",
          prop: "isRecycle",
          value: "",
          options: [{ label: "是", value: "1" }, { label: "否", value: "0" }]
        },
        { title: "备注", type: "textarea", prop: "remark", value: "" }
      ],
      rules2: {
        goodsCategory: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentName: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentUnit: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        isStandard: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        isRecycle: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    submit() {
      console.log(this.params);
    },
    cancel() {
      this.$router.back();
    },
    changeForm(val) {
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
    },
    changeOption() {
      console.log(this.selectValue);
    },

     handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      }
  }
};
</script>

<style lang="less">
.typeAdd-page {
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
  .upload{
    margin-left: 82px;
  }
}
</style>
