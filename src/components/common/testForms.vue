<template>
  <el-form :label-position="direction" :label-width="labelWidth" ref="form"
    :model="form"
    :rules="rules"
    class="base-form">
    <el-form-item v-for="(item,index) in options" :key="index" :label="item.title" :prop="item.prop" :class="{'siding':item.type=='minMax'}">
      <!-- 输入框 -->
      <el-input v-if="item.type=='input'" :disabled="item.disabled?item.disabled:false" v-model="form[item.prop]" :placeholder="item.placeholder?`${item.placeholder}`:`请输入${item.title}`" :class="item.class"></el-input> 
      <!-- 输入框 密码 -->
      <el-input v-if="item.type=='password'" :prefix-icon="`el-icon-${item.icon}`" show-password v-model="form[item.prop]" :placeholder="item.placeholder?`${item.placeholder}`:`请输入${item.title}`"></el-input> 
      <!-- 输入框 带icon-->
      <el-input v-if="item.type=='input-icon'" :prefix-icon="`el-icon-${item.icon}`" v-model="form[item.prop]" :placeholder="item.placeholder?`${item.placeholder}`:`请输入${item.title}`"></el-input> 
      <!-- 支持单选 -->
      <el-select v-if="item.type=='select'" :filterable='item.filterable' :disabled="item.disabled"  v-model="form[item.prop]" :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`" :class="item.class">
        <el-option v-for="(items,index) in item.options" :key="index" :label="items.label"
          @click.native="changeSelect(items)"
          :value="items.value">
        </el-option>
      </el-select>
      <!-- 支持单选 -->
      <el-select v-if="item.type=='select-item'" :filterable='item.filterable' :disabled="item.disabled"  v-model="form[item.prop]" :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`" :class="item.class">
        <el-option v-for="(items,index) in item.options" :key="index" :label="items.label"
          @click.native="changeSelect(items)"
          :value="items">
        </el-option>
      </el-select>
      <!-- 支持多选 -->
      <el-select v-if="item.type=='select-multiple'" multiple v-model="form[item.prop]" :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`">
        <el-option v-for="(items,index) in item.options" :key="index" :label="items.label"
          @click.native="changeSelect(items)"
          :value="items.value">
        </el-option>
      </el-select>
      <!-- 开关 -->
      <el-switch
        v-if="item.type=='switch'"
        v-model="form[item.prop]"
        @change="changeSelect"
        :active-text="item.value?'开启':'关闭'"
        :inactive-value="0"
        :active-value="1"
        active-color="#409EFF"
        inactive-color="">
      </el-switch>
      <!-- 单个日期选择// dateType设置时间类型 年 月 日 --> 
      <!-- <el-date-picker size="small" type="year"
        v-if="item.type=='dateyear'"
        v-model="form[item.prop]"
        :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`">
      </el-date-picker> -->
      <!-- 单个日期选择// dateType设置时间类型 年 月 日 --> 
      <el-date-picker size="small" 
        v-if="item.type=='datepicker'"
        v-model="form[item.prop]"
        @change="changeSelect"
        :type="item.dateType"
        :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`">
      </el-date-picker>
      <!-- 起止日期选择 -->
      <el-date-picker size="small" type="daterange"
        v-if="item.type=='datepicker-range'"
        v-model="form[item.prop]"
        @change="changeSelect"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <!-- 单个时间选择 -->
      <el-date-picker size="small" type="datetime"
        v-if="item.type=='datetime'"
        v-model="form[item.prop]"
        @change="changeSelect"
        :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`">
      </el-date-picker>
      <!-- 两个时间选择 -->
      <el-date-picker size="small" type="datetimerange"
        v-if="item.type=='datetime-range'"
        v-model="form[item.prop]"
        @change="changeSelect"
        start-placeholder="开始时间"
        end-placeholder="结束时间">
      </el-date-picker>
      <!-- 支持文本域 -->
      <el-input v-if="item.type=='textarea'" v-model="form[item.prop]" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :placeholder="item.placeholder?`${item.placeholder}`:`请输入${item.title}`"></el-input>
      <!-- 级联选择 返回id-->
      <el-cascader  v-if="item.type=='cascader'" size="small" 
        @change="changeSelect"
        v-model="form[item.prop]" 
        :value="item.value" 
        :options="item.options" 
        :props="item.setProps"
        :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`" :disabled="item.disabled"></el-cascader>
      <!-- 级联选择 返回对象-->
      <el-cascader  v-if="item.type=='cascader-object'" size="small" 
        @change="changeSelect"
        v-model="form[item.prop]" 
        :value="item" 
        :options="item.options" 
        :props="item.setProps"
        :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`"></el-cascader>
      <!-- 级联选择（多选） -->
      <el-cascader
        v-if="item.type=='cascader-multiple'"
        @change="changeSelect"
        v-model="form[item.prop]"
        :options="item.options"
        :props="item.setProps"
        :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`"
        clearable>
      </el-cascader>
      <!-- 单选 -->
      <el-radio-group v-if="item.type=='radio'" @change="changeSelect" v-model="form[item.prop]">
        <el-radio 
        v-for="(list,index) in item.options"
        :key="index"
        :label="list.value">{{list.label}}</el-radio>
      </el-radio-group>
      <!-- 上下排列的单选 带输入框 -->
      <!-- <div v-if="item.type=='radio-textarea'">
        <el-radio v-model="item.value[0]]" :label="item.options[0].value">{{item.options[0].label}}</el-radio>
        <div class="flex-wrap">
          <el-radio v-model="item.value[0]]" :label="item.options[1].value">{{item.options[1].label}}</el-radio>
          <el-input v-model="item.value[1]]" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :placeholder="item.placeholder?`${item.placeholder}`:`请选择${item.title}`"></el-input>
        </div>
      </div> -->
      <!-- 地址栏 -->
      <div v-if="item.type=='address'">
        <el-cascader size="small" v-model="citySelect" :props='cascaderProps' @change="changeCity" :options="cityData" placeholder="请选择省、市、区"></el-cascader>
        <el-input v-model="form[item.prop]" placeholder="填写详细地址"></el-input> 
      </div>
      <!-- 最大值最小值 -->
      <!-- <el-input v-if="item.type=='minMax'" v-model="item.valuens[0]]" @blur="checkNumber" type="text" placeholder="输入最小值"></el-input>
      <span v-if="item.type=='minMax'" class="siding-flag">至</span>
      <el-input v-if="item.type=='minMax'" v-model="item.valuens[1]]" @blur="checkNumber" type="text" placeholder="输入最大值"></el-input> -->
      <!-- 多选checkbox -->
      <el-checkbox-group v-if="item.type=='checkbox'" @change="changeSelect" v-model="form[item.prop]">
        <el-checkbox 
          v-for="(list, index) in item.options"
          :key="index"
          :label="list.value">
          {{list.label}}
        </el-checkbox>
      </el-checkbox-group>
      <slot v-if="item.type=='slot'" :name="item.slotName"></slot>
    </el-form-item>
  </el-form> 
</template>

<script type="text/javascript">
import moment from 'moment'
import cityData from '@/libs/map/area.json'

export default {
  name: "",
  props: {
    options: {
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
      radioValue: '',
      switchText: '开启',
      form: {},
    }
  },
  watch: {
    options:{
      handler(newValue,oldValue) {
        console.log('表单变化', newValue)
        // this.$refs.form.validate();
        newValue&&newValue.forEach((item) => {
          this.form[item.prop] = item.value;
          this.$set(this.form, item.prop, item.value)
          console.log('form',this.form)
        })
        
        // return newValue;
      },
      deep: true,
    }
  },
  created() {
    // this.init(this.formData)
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
    resetForm() {
      this.$refs.form.resetFields();
    },
    validate(callback) {
      this.$emit('change', this.form)
      // this.$refs.form.validate((valid) => {
      //   if (valid) {
      //     console.log('校验通过')
      //     // this.$emit('asset')
      //     callback('true')
      //   }else{
      //     console.log('校验不通过')
      //     callback('false');
      //   }
      // })
    },
    changeSelect(val) {
      this.$emit('change', this.form)
    },
  },
}
</script>

<style lang="less" scoped>
  .flex-wrap{
    display: flex;
    align-items: center;
  }
</style>
