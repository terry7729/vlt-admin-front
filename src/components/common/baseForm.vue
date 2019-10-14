<template>
  <el-form :label-position="direction" :label-width="labelWidth" ref="form"
    :model="form"
    :rules="rules"
  >
    <el-form-item v-for="(item,index) in formData" :key="index" :label="item.title" :prop="item.prop">
      <el-input v-if="item.type=='input'" v-model="form[item.prop]" :placeholder="`请输入${item.title}`"></el-input> 
      <el-select v-if="item.type=='select'" v-model="form[item.prop]" :placeholder="`请选择${item.title}`">
        <el-option v-for="items in item.option" :key="items.value" :label="items.label"
          @click.native="changeSelect(items)"
          :value="items">
        </el-option>
      </el-select>
      <el-switch
        v-if="item.type=='switch'"
        v-model="form[item.prop]"
        @change="change"
        :active-text="switchText"
        active-color="#409EFF"
        inactive-color="">
      </el-switch>
      <el-date-picker size="small" type="date"
        v-if="item.type=='datepicker'"
        v-model="form[item.prop]"
        :placeholder="`请选择${item.title}`">
      </el-date-picker>
      <el-date-picker size="small" type="daterange"
        v-if="item.type=='datepicker-range'"
        v-model="dateRange"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-date-picker size="small" type="datetime"
        v-if="item.type=='datetime'"
        v-model="form[item.prop]"
        :placeholder="`请选择${item.title}`">
      </el-date-picker>
      <el-date-picker size="small" type="datetimerange"
        v-if="item.type=='datetime-range'"
        v-model="timeRange"
        start-placeholder="开始时间"
        end-placeholder="结束时间">
      </el-date-picker>
      <el-input v-if="item.type=='textarea'" v-model="form[item.prop]" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :placeholder="`请输入${item.title}`"></el-input>
      <el-cascader  v-if="item.type=='cascader'" size="small" v-model="form[item.prop]" :options="item.options" :placeholder="`请选择${item.title}`"></el-cascader>
    </el-form-item> 
  </el-form> 
</template>

<script type="text/javascript">
import moment from 'moment'

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
      form: {},
      switchText: '开启',
      dateRange: '',
      timeRange: '',
      timeParam: {}
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
    timeRange(val) {
      this.form[this.timeParam['datetime-range'][0]] = moment(this.timeRange[0]).format("YYYY-MM-DD HH:mm:ss")
      this.form[this.timeParam['datetime-range'][1]] = moment(this.timeRange[1]).format("YYYY-MM-DD HH:mm:ss")
      this.$emit("change", this.form)
    },
    dateRange(val) {
      this.form[this.timeParam['datepicker-range'][0]] = moment(this.dateRange[0]).format("YYYY-MM-DD")
      this.form[this.timeParam['datepicker-range'][1]] = moment(this.dateRange[1]).format("YYYY-MM-DD")
      this.$emit("change", this.form)
    }
  },
  created() {
    this.formData.forEach((item)=>{
      if(item.type=='datepicker-range' || item.type=='datetime-range') {
        this.$set(this.form, item.option[0], '')
        this.$set(this.form, item.option[1], '')
        this.timeParam[item.type] = item.option;
        console.log('时间参数', this.timeParam)
      }else if(item.type=='switch') {
        this.$set(this.form, item.prop, true)
      }else{
        this.$set(this.form, item.prop, '')
      }
    })
  },
  components: {
  },
  methods: {
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
    change(val) {
      this.switchText = val ? '开启' : '关闭'
    },
    changeSelect(val) {
      console.log(val)
    }
  },
}
</script>

<style lang="less" scoped>
</style>
