
<template>
<!-- 类型管理修改页面 -->
  <div class="vlt-card">
    <div class="vlt-edit-single modification-page">
      <h2 class="title">基本信息</h2>
      <div class="vlt-edit-wrap">
        <span class="goods-cate">物品类别</span>
        <el-form class="goods">
          <el-form-item>
            <el-select v-model="goodsType" :disabled="true"  placeholder="请选择" @change="changeOption">
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
          ref="baseForm"
          :rules="rules2"
          direction="right"
          @change="changeForm"
        ></base-form>
        <base-form
          v-else-if="this.goodsType === 2"
          :formData="mountingsData"
          labelWidth="140px"
          ref="baseForm"
          :rules="rules2"
          direction="right"
          @change="changeForm"
        ></base-form>
        <el-form v-else-if="this.goodsType === 3">
          <base-form
            :formData="consumableData"
            labelWidth="140px"
            ref="baseForm"
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
        <el-form v-else-if="this.goodsType === 4">
          <base-form
            :formData="facilitiesData"
            labelWidth="140px"
            ref="baseForm"
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
  name: "modification",
  data() {
    const self = this;
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      id: self.$route.query.id,          //页面id
      imgUrlList: self.$route.query.id,
      imgUrl:[],
      imageUrl: '',
      params: {},
      options: [
        { value: 1, label: "设备" },
        { value: 2, label: "配件" },
        { value: 3, label: "耗材" },
        { value: 4, label: "设施" }
      ],
      goodsType: Number(self.$route.query.goodsType),
      equipmentData: [
        {title: '设备类型',type: 'select',prop:'deviceType', disabled: false, value: self.$route.query.deviceType, 
        options: 
        [
          {label: '终端机', value: 1},
          {label: '柜员机', value: 2},
          {label: '其它', value: 3}
        ]},
        { title: "设备名称", type: "input",disabled: true, prop: "goodsName", value: '' },
        { title: "设备单位", type: "input", prop: "deviceUnit", value: ''},
        {
          title: "是否标配",
          type: "radio",
          prop: "isStandard",
          value: 0,
          options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
        },
        {
          title: "是否回收",
          type: "radio",
          prop: "isRecovery",
          value: 0,
          options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
        },
        { title: "备注", type: "textarea", prop: "remark", value: 0  }
      ],
      facilitiesData: [
        { title: "设施名称", type: "input", prop: "goodsName", value: ''},
        { title: "设施编号", type: "input", prop: "code", value: ''},
        { title: "设施单价", type: "input", prop: "unitPrice", value: ''},
        { title: "设施单位", type: "input", prop: "deviceUnit", value: ''},
        {
          title: "供应商",
          type: "input",
          prop: "providerId",
          value: '',
          options: [{ label: "1", value: "1" }, { label: "2", value: "2" }]
        },
        { title: "预警上限", type: "input", prop: "upperLimit", value: ''},
        { title: "预警下限", type: "input", prop: "lowerLimit", value: '' },
        { title: "厂家信息", type: "input", prop: "manufactorInfo", value: ''},
        { title: "备注", type: "textarea", prop: "remark", value: '' }
      ],
      consumableData:[
        { title: "耗材名称", type: "input", prop: "goodsName", value: '' },
        { title: "耗材编号", type: "input", prop: "code", value: '' },
        { title: "设施单价", type: "input", prop: "unitPrice", value: ''},
        { title: "耗材单位", type: "input", prop: "deviceUnit", value: ''},
        {
          title: "供应商",
          type: "select",
          prop: "providerId",
          value: '',
          options: [{ label: "1", value: "1" }, { label: "2", value: "2" }]
        },
        { title: "预警上限", type: "input", prop: "upperLimit", value: '' },
        { title: "预警下限", type: "input", prop: "lowerLimit", value: '' },
        { title: "厂家信息", type: "input", prop: "manufactorInfo", value: '' },
        { title: "备注", type: "textarea", prop: "remark", value: '' }
      ],
      mountingsData:[
        { title: "配件名称", type: "input", prop: "goodsName", value: '' },
        { title: "配件单位", type: "select", prop: "deviceUnit", value: ''},
        {
          title: "是否回收",
          type: "radio",
          prop: "isRecovery",
          value: 0,
          options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
        },
        { title: "备注", type: "textarea", prop: "remark", value: '' }
      ],
      rules2: {
        goodsName: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        unitPrice: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        deviceUnit: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        upperLimit: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        lowerLimit: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        isStandard: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        isRecovery: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
      },
      reslt:'',
    };
  },
  components: {},
 async created(data) {
    // 编辑回填
    let id = this.$route.query.id
    let reslt =await this.$api.getDetail({data:id})
    this.reslt = reslt.data
    let obj = [
      ...this.mountingsData,
      ...this.consumableData,
      ...this.facilitiesData,
      ...this.equipmentData
    ]
    let arr = Object.keys(reslt.data)
    console.log(reslt)
    arr.forEach(item=>{
      obj.forEach(i=>{
        if(item === i.prop){
          i.value = reslt.data[item]
        }
      })
    })


  },
  methods: {
    submit() {
      const self = this;
      this.$refs['baseForm'].validate(async valid=>{
        if(valid === 'true') {
          let data = self.params;
          if(data.goodsType==3||data.goodsType==4) {
            data.files = self.imgUrl.join(',');
          }      
          let res = await self.$api.modification({data})
          console.log(self.params)
          if(res || res.code == 0){
            self.$message({
              message:'修改成功',
              type:'success'
            })
            self.$router.push({path: 'basicInfoManage'})
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
        this.params = Object.assign({goodsType:this.goodsType},this.reslt, val);
        console.log('param', this.params)
      }
    },
    changeOption() {
      console.log(this.goodsType);
    },
    // 图标上传
    async uploadFileImg(files) {
      const self = this;
      let formData = new FormData();
      formData.append('file', files.file);
      // formData.append('refId', this.id);
      // formData.append('flag', true);
      // formData.append('busType', 6);
      const res = await this.$api.uploadGoodsType({
        data: formData,
        onUploadProgress(evt) {
          console.log('上传进度事件:', evt)
        }
      })
      console.log('uploadFile', res);
      this.imgUrl.push(res.data.filePath);
      console.log(this.imgId)
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

<style lang="less" sco-ped>
.modification-page {
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
