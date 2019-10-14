<template>
  <div class="vlt-card">
    <div class="vlt-edit-single">
      <h2 class="title">基础信息</h2>
      <div class="vlt-edit-wrap">
        <base-form :formData="formData" :rules="rules" direction="right" labelWidth="120px" @change="changeForm"></base-form>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

import rules from '@/utils/rules.js';

export default {
  name: "",
  data() {
    return {
      formData: [
        {title: '计划时间', type: 'datetime', prop: 'time', value: ''},
        {title: '所属机构', type: 'cascader', prop: 'insCode', value: '',  options: []},
        {title: '新建销售厅数量', type: 'input', prop: 'test', value: ''},
        {title: '销售厅投注机数量', type: 'input', prop: 'test', value: ''},
        {title: '市合作厅数量', type: 'input', prop: 'test', value: ''},
        {title: '市合作厅投注数量', type: 'input', prop: 'test', value: ''},
        {title: '发展预算', type: 'input', prop: 'test', value: ''},
        {title: '计划说明',type: 'textarea', prop: 'all', value: ''},
        {title: '状态', type: 'select', prop: 'status', value: '', option:[{label: '男',value: '0'},{label: '女',value: '1'},]},
        {title: '兑奖权限', type: 'switch', prop: 'isShow', value: ''},
        {title: '日期选择', type: 'datepicker', prop: 'date', value: ''},
        {title: '起止日期', type: 'datepicker-range', prop: '', value: '', option:['start', 'end']},
        {title: '起止时间', type: 'datetime-range', prop: '', value: '', option:['startTime', 'endTime']},
      ],
      params: {
      },
      rules: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: 'blur' }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: 'blur' }
        ],
        all: [
          { required: true, validator: rules.checkEmail, trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    changeForm(val) {
      Object.assign(this.params, val)
      console.log('派发出来的参数', this.params)
    },
    changeSelect(val) {
      console.log(this.form, val)
    },
    submit() {

    },
    cancel() {

    }
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
</style>
