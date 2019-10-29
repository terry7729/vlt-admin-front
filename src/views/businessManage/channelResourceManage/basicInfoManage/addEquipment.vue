<template>
<!-- 类型管理新增页面 -->
  <div class="vlt-card">
    <div class="vlt-edit-single typeAdd-page">
      <h2 class="title">基本信息</h2>
      <div class="vlt-edit-wrap">
        <span class="goods-cate">物品类别</span>
        <el-form class="goods">
          <el-form-item>
            <el-select v-model="goodsType" placeholder="请选择" @change="changeOption">
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
          v-if="this.goodsType === 1"
          :formData="equipmentData"
          labelWidth="140px"
          ref="baseForm1"
          :rules="rules2"
          direction="right"
          @change="changeForm"
        ></base-form>
        <base-form
          v-else-if="this.goodsType === 2"
          :formData="mountingsData"
          labelWidth="140px"
          ref="baseForm1"
          :rules="rules2"
          direction="right"
          @change="changeForm"
        ></base-form>
        <!-- 耗材 -->
        <el-form v-else-if="this.goodsType === 3">
          <base-form
            :formData="consumableData"
            labelWidth="140px"
            ref="baseForm1"
            :rules="rules2"
            direction="right"
            @change="changeForm"
          ></base-form>
          <el-form-item label="上传图片" class="upload">
            <el-upload
              class="gameIcon-uploader"
              action=""
              :limit="3"
              accept=".png,.jpg,.jpeg"
              :show-file-list="false"
              :on-remove="handleRemove"
              :http-request="uploadFileImg">
              <img v-if="imageUrl" :src="imageUrl" class="gameIcon">
              <i v-else class="el-icon-plus gameIcon-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过500kb</div>
            </el-upload>
            <!-- <el-upload action="#" :limit='2' list-type="picture-card" :auto-upload="false">
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
            </el-upload> -->
            <!-- 放大 -->
            <!-- <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog> -->
          </el-form-item>
        </el-form>
        <!-- 设施 -->
        <el-form v-else>
          <base-form
            :formData="facilitiesData"
            labelWidth="140px"
            ref="baseForm1"
            :rules="rules2"
            direction="right"
            @change="changeForm"
          ></base-form>
          <el-form-item label="上传图片" class="upload">
            <el-upload
              class="gameIcon-uploader"
              action=""
              :limit="9"
              accept=".png,.jpg,.jpeg"
              :show-file-list="false"
              :on-remove="handleRemove"
              :http-request="uploadFileImg">
              <img v-if="imageUrl" :src="imageUrl" class="gameIcon">
              <i v-else class="el-icon-plus gameIcon-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过500kb</div>
            </el-upload>
            <!-- <el-upload action="#" :limit='2' list-type="picture-card" :auto-upload="false">
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
            </el-upload> -->
            <!-- 放大 -->
            <!-- <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog> -->
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
import { async } from 'q';
export default {
  name: "addEquipment",
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,

     
      options: [
        { value: 1, label: "设备" },
        { value: 2, label: "配件" },
        { value: 3, label: "耗材" },
        { value: 4, label: "设施" }
      ],
      goodsType: 1,

      equipmentData: [
        {title: '设备类型',type: 'select',prop:'deviceType',value: 1,options: 
        [
          {label: '终端机', value: 1},
          {label: '柜员机', value: 2},
          {label: '其它', value: 3}
        ]},
        { title: "设备名称", type: "input",disabled: true, prop: "goodsName", value: "" },
        { title: "设备单位", type: "input", prop: "deviceUnit", value:''},
        {
          title: "是否标配",
          type: "radio",
          prop: "isStandard",
          value: 1,
          options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
        },
        {
          title: "是否回收",
          type: "radio",
          prop: "isRecovery",
          value: 1,
          options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
        },
        { title: "备注", type: "textarea", prop: "remark", value: "" }
      ],
      facilitiesData: [
        { title: "设施名称", type: "input", prop: "goodsName", value: "" },
        { title: "设施编号", type: "input", prop: "code", value: "" },
        {
          title: "设施单价",
          type: "input",
          prop: "unitPrice",
          value: ''
        },
        { title: "设施单位", type: "input", prop: "deviceUnit", value:''},
        {
          title: "供应商",
          type: "select",
          prop: "providerId",
          options: [{ label: "1", value: "1" }, { label: "2", value: "2" }]
        },
        { title: "预警上限", type: "input", prop: "upperLimit", value: "" },
        { title: "预警下限", type: "input", prop: "lowerLimit", value: "" },
        { title: "厂家信息", type: "input", prop: "manufactorInfo", value: "" },
        { title: "备注", type: "textarea", prop: "remark", value: "" }
      ],
      consumableData:[
        { title: "耗材名称", type: "input", prop: "goodsName", value: "" },
        { title: "耗材编号", type: "input", prop: "code", value: "" },
        {
          title: "设施单价",
          type: "input",
          prop: "unitPrice",
          value: ''
        },
        { title: "耗材单位", type: "input", prop: "deviceUnit", value:''},
        {
          title: "供应商",
          type: "select",
          prop: "providerId",
          options: [{ label: "1", value: "1" }, { label: "2", value: "2" }]
        },
        { title: "预警上限", type: "input", prop: "upperLimit", value: "" },
        { title: "预警下限", type: "input", prop: "lowerLimit", value: "" },
        { title: "厂家信息", type: "input", prop: "manufactorInfo", value: "" },
        { title: "备注", type: "textarea", prop: "remark", value: "" }
      ],
      mountingsData:[
        { title: "配件名称", type: "input", prop: "goodsName", value: "" },
        { title: "配件单位", type: "input", prop: "deviceUnit", value:''},
        {
          title: "是否回收",
          type: "radio",
          prop: "isRecovery",
          value: 1,
          options: [{ label: "是", value: "1" }, { label: "否", value: "0" }]
        },
        { title: "备注", type: "textarea", prop: "remark", value: "" }
      ],
      rules2: {
        goodsCategory: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        goodsName: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        unitPrice: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        deviceUnit: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        isStandard: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        isRecovery: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        upperLimit: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        lowerLimit: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
      },
      imgId: [],
      imageUrl: '',
      params: {},
      falg:false,
    };
  },
  created() {
    
  },
  components: {},
  methods: {
    // 图标上传
    async uploadFileImg(files) {
      let formData = new FormData();
      formData.append('file', files.file);
      formData.append('refId', '');
      formData.append('flag', true);
      formData.append('busType', 6);
      debugger
      const res = await this.$api.uploadGoodsType({
        data: formData,
        onUploadProgress(evt) {
          console.log('上传进度事件:', evt)
        }
      })
      console.log('uploadFile', res);
      this.imgId.push(res.data.fileId)
      let imgUrl = res.data.filePath;
      console.log(this.imgId)
    },
    changeOption() {
      console.log(this.goodsType);
    },
     submit(formName) {
      this.$refs['baseForm1'].validate(async valid=>{
        if(valid === 'true') {
          let data = this.params;
          if(data.goodsType==3||data.goodsType==4) {
            data.imgInfo = this.imgId.join(',');
          }
          let res = await this.$api.typeCreate({data})
          console.log(res)
          if(res || res.code == 0){
            this.$message({
              message:'新增成功',
              type:'success'
            })
          }
        }
      })
    },
    cancel() {
      this.$router.back();
    },
    changeForm(val) {
      this.equipmentData.forEach((item)=>{
        item.value = val[item.prop]
        this.$set(item, 'value', item.value)
      })
      if(val.deviceType != ''){
        if(val.deviceType === 1){
          this.$set(this.equipmentData[1], 'disabled', true)
          this.$set(this.equipmentData[1], 'value','终端机')
        }else if(val.deviceType === 2){
          this.$set(this.equipmentData[1], 'disabled', true)
          this.$set(this.equipmentData[1], 'value','柜员机')
        }else{
          // this.$set(this.equipmentData[1], 'value','')
          this.equipmentData[1].disabled = false;
            
        }
        // console.log("派发出来的参数", val);
        this.params = Object.assign({goodsType:this.goodsType}, val);
        console.log('param', this.params)
      }
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
