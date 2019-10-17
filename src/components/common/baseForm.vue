<template>
  <el-form :label-position="direction" :label-width="labelWidth" ref="form"
    :model="form"
    :rules="rules"
    class="base-form">
    <el-form-item v-for="(item,index) in formData" :key="index" :label="item.title" :prop="item.prop" :class="{'siding':item.type=='minMax'}">
      <!-- 输入框 -->
      <el-input v-if="item.type=='input'" :disabled="item.disabled?item.disabled:false" v-model="form[item.prop]" :placeholder="item.placeholder?`${item.placeholder}`:`请输入${item.title}`"></el-input> 
      <!-- 支持单选 -->
      <el-select v-if="item.type=='select'" v-model="form[item.prop]" :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`"  >
        <el-option v-for="items in item.options" :key="items.value" :label="items.label"
          @click.native="changeSelect(items)"
          :value="items">
        </el-option>
      </el-select>
      <!-- 支持多选 -->
      <el-select v-if="item.type=='select-multiple'" multiple v-model="form[item.prop]" :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`">
        <el-option v-for="items in item.options" :key="items.value" :label="items.label"
          @click.native="changeSelect(items)"
          :value="items">
        </el-option>
      </el-select>
      <!-- 开关 -->
      <el-switch
        v-if="item.type=='switch'"
        v-model="form[item.prop]"
        @change="changeSwitch"
        :active-text="switchText"
        active-color="#409EFF"
        inactive-color="">
      </el-switch>
      <!-- 单个日期选择 -->
      <el-date-picker size="small" type="date"
        v-if="item.type=='datepicker'"
        v-model="form[item.prop]"
        :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`">
      </el-date-picker>
      <!-- 起止日期选择 -->
      <el-date-picker size="small" type="daterange"
        v-if="item.type=='datepicker-range'"
        v-model="dateParam[item.prop]"
        @change="changeDate(item)"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <!-- 单个时间选择 -->
      <el-date-picker size="small" type="datetime"
        v-if="item.type=='datetime'"
        v-model="form[item.prop]"
        :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`">
      </el-date-picker>
      <!-- 两个时间选择 -->
      <el-date-picker size="small" type="datetimerange"
        v-if="item.type=='datetime-range'"
        v-model="timeParam[item.prop]"
         @change="changeTime(item)"
        start-placeholder="开始时间"
        end-placeholder="结束时间">
      </el-date-picker>
      <!-- 支持文本域 -->
      <el-input v-if="item.type=='textarea'" v-model="form[item.prop]" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :placeholder="item.placeholder?`${item.placeholder}`:`请输入${item.title}`"></el-input>
      <!-- 级联选择 -->
      <el-cascader  v-if="item.type=='cascader'" size="small" v-model="form[item.prop]" :value="item.value" :options="item.options" :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`"></el-cascader>
      <!-- 级联选择（多选） -->
      <el-cascader
        v-if="item.type=='cascader-multiple'"
        v-model="form[item.prop]"
        :options="item.options"
        :props="{ multiple: true, checkStrictly: true }"
        :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`"
        clearable>
      </el-cascader>
      <!-- 单选 -->
      <el-radio-group v-if="item.type=='radio'" @change="changeRadio(item)" v-model="radioParam[item.prop]">
        <el-radio 
        v-for="(list,index) in item.options"
        :key="index"
        :label="list.key">{{list.value}}</el-radio>
      </el-radio-group>
      <!-- 地址栏 -->
      <div v-if="item.type=='address'">
        <el-cascader size="small" v-model="citySelect" :props='cascaderProps' @change="changeCity" :options="cityData" placeholder="请选择省、市、区"></el-cascader>
        <el-input v-model="form[item.prop]" placeholder="填写详细地址"></el-input> 
      </div>
      <!-- 最大值最小值 -->
      <el-input v-if="item.type=='minMax'" v-model="form[item.options[0]]" @blur="checkNumber" type="text" placeholder="输入最小值"></el-input>
      <span v-if="item.type=='minMax'" class="siding-flag">至</span>
      <el-input v-if="item.type=='minMax'" v-model="form[item.options[1]]" @blur="checkNumber" type="text" placeholder="输入最大值"></el-input>
      <!-- 多选checkbox -->
      <el-checkbox-group v-if="item.type=='checkbox'" v-model="form[item.prop]">
        <el-checkbox 
          v-for="(list,index) in item.options"
          :key="index"
          :label="list.key">
          {{list.value}}
        </el-checkbox>
      </el-checkbox-group>
      <!-- 图片上传 -->
      <el-upload
        v-if="item.type=='upload'"
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="success"
        :before-upload="beforeUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <!-- 多个图片上传 -->
      <el-upload
        v-if="item.type=='upload-drag'"
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item> 
  </el-form> 
</template>

<script type="text/javascript">
import moment from 'moment'
import cityData from '@/libs/map/area.json'

export default {
  name: "",
  props: {
    formData: {
      type: Array,
      default: [],
    },
    rules: {
      type: Object,
      default: {}
    },
    direction: {
      type: String,
      default: 'right'
    },
    labelWidth: {
      type: String,
      default: '90px'
    }
  },
  data() {
    return {
      cityData,
      citySelect: '',
      cascaderProps: {
        label: 'text',
        value: 'value',
        children: 'children',
      },
      form: {},
      radioValue: '',
      radioParam: {}, // 用于保存radio的参数
      switchText: '开启',
      dateParam: {}, // 用于保存起止日期的参数
      timeParam: {}, // 用于保存起止时间的参数
      selectParam: {}, // 用于保存起止时间的参数
      imageUrl: '',
    }
  },
  watch: {
    form: {
      handler(newValue, oldValue) {
        this.$emit("change", this.form)
      },
      // 深度监听 监听对象，数组的变化
      deep: true
    },
    formData: {
      handler(newValue, oldValue) {
        this.init()
      },
      // 深度监听 监听对象，数组的变化
      deep: true
    },
  },
  created() {
    this.init()
  },
  components: {
  },
  methods: {
    checkNumber(val, flag) {
      if(this.form[val] < 0) {
        this.$message.warning(`${flag}须大于0`);
      }
    },
    success(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    changeDate(val) {
      this.form[val.options[0]] = moment(this.dateParam[val.prop][0]).format("YYYY-MM-DD")
      this.form[val.options[1]] = moment(this.dateParam[val.prop][1]).format("YYYY-MM-DD")
    },
    changeTime(val) {
      this.form[val.options[0]] = moment(this.timeParam[val.prop][0]).format("YYYY-MM-DD HH:mm:ss")
      this.form[val.options[1]] = moment(this.timeParam[val.prop][1]).format("YYYY-MM-DD HH:mm:ss")
    },
    changeRadio(val) {
      this.form[val.prop] = this.radioParam[val.prop];
    },
    changeCity(val) {
      const self = this;
      self.cityData.forEach((item)=>{
        if(item.value==val[0]) {
          self.form.provinceId = item.value;
          self.form.provinceName = item.text;
          item.children.forEach((list)=>{
            if(list.value==val[1]) {
              self.form.cityId = list.value;
              self.form.cityName = list.text;
              list.children.forEach((el)=>{
                if(el.value==val[2]) {
                  self.form.townId = el.value;
                  self.form.townName = el.text;
                }
              })
            }
          })
        }
      })
    },
    validate(callback) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('校验通过')
          // this.$emit('asset')
          callback('true')
        }else{
          console.log('校验不通过')
          callback('false');
        }
      })
    },
    changeSwitch(val) {
      this.switchText = val ? '开启' : '关闭'
    },
    changeSelect(val) {
      console.log(val)
      this.form[val.prop] = this.selectParam[val.prop];
      console.log(this.selectParam)
    },
    init() {
      const self = this;
      self.formData.forEach((item)=>{
        if(item.type=='datepicker-range' || item.type=='datetime-range') {
          if(item.value!='') { // 数据回填
            self.timeParam[item.prop] = item.value;
            self.dateParam[item.prop] = item.value;
          } else {
            self.$set(self.form, item.options[0], '')
            self.$set(self.form, item.options[1], '')
            // self.timeParam[item.type] = item.options; // 用于获取起止时间的字段名称
            console.log('时间参数', self.timeParam)
          }
        }else if(item.type=='switch') {
          if(!item.value) { // 数据回填
            self.changeSwitch(item.value)
            self.$set(self.form, item.prop, item.value)
          }else{
            self.$set(self.form, item.prop, true)
          }
        }else if(item.type=='radio') {
          if(item.value !='') { // 数据回填
            self.$set(self.radioParam, item.prop , item.value);
            self.$set(self.form, item.prop, item.value)
          }else{
            self.$set(self.form, item.prop, '')
            self.$set(self.radioParam, item.prop, '')
          }
        }else if(item.type=='address') {
          if(item.value !='') { // 数据回填
            self.citySelect = item.value;
            self.$set(self.form, 'address', item.address)
          } else {
            self.$set(self.form, 'provinceId', '')
            self.$set(self.form, 'provinceName', '')
            self.$set(self.form, 'cityId', '')
            self.$set(self.form, 'cityName', '')
            self.$set(self.form, 'townId', '')
            self.$set(self.form, 'townName', '')
            self.$set(self.form, 'address', '')
          }
        }else if(item.type=='select') {
          if(item.value !='') { // 数据回填
            self.$set(self.selectParam, item.prop , item.value);
            self.$set(self.form, item.prop, item.value)
          }else{
            self.$set(self.form, item.prop, '')
            self.$set(self.selectParam, item.prop, '')
          }
        } else {
          if(item.value !='') { // 数据回填
            self.$set(self.form, item.prop, item.value)
          }else{
            self.$set(self.form, item.prop, '')
          }
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
</style>
