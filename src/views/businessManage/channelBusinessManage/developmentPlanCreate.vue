<template>
  <div class="vlt-card">
    <div class="vlt-edit-single">
      <h2 class="title">基础信息</h2>
      <div class="vlt-edit-wrap">
        <base-form ref="baseForm"
          :formData="formData" 
          :rules="rules" 
          direction="right" 
          labelWidth="120px" 
          @change="changeForm">
        </base-form>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import moment from 'moment'
import {getCascaderCheckedItem} from '@/utils/getCascaderCheckedItem.js'
import rules from '@/utils/rules.js';

export default {
  name: "",
  data() {
    return {
      formData: [
        {title: '计划年份', type: 'datepicker', prop: 'planDate', dateType:'year', value: ''},
        {title: '所属机构', type: 'cascader', prop: 'insId', value: [], options: [], 
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            // multiple: true, // 多选
            checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
          }
        },
        {title: '新建销售厅数量', type: 'input', prop: 'newSellingHall', value: '20'},
        {title: '销售厅投注机数量', type: 'input', prop: 'sellingMachine', value: '200'},
        {title: '市合作厅数量', type: 'input', prop: 'cooperationHall', value: '30'},
        {title: '市合作厅投注数量', type: 'input', prop: 'cooperationMachine', value: '300'},
        {title: '发展预算', type: 'input', prop: 'developBudget', value: '4000'},
        {title: '计划说明',type: 'textarea', prop: 'planDesc', value: '说明'},
      ],
      params: {
        insLevel: "2",
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
      cascaderOptions: []
    }
  },
  created() {
    // 用户所在机构
    if(true) {
      // 省级用户 调省查市接口
      // 市级数据 不能输入
      let data = {
        insId: '25',
        planDate: '2019'
      };
      this.getProvinceCityPlan(data)
    }else{
      // 只需要市级数据  省级不用
    }
    // 获取所属机构数据
    this.getInsData()
  },
  methods: {
    // 省级用户查询市级数据
    getProvinceCityPlan(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.getProvinceCityPlan({data})
				if(res && res.code == 0) {
          console.log('res', res.data)
          // self.$set(self.formData[1], 'options', res.data)
          // self.formData[1].options = res.data;
          self.cascaderOptions = res.data;
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    // 获取机构数据
    getInsData() {
      const self = this;
      const data = {};
      (async (data)=>{
				let res = await self.$api.QueryInsTree({data})
				if(res && res.code == 0) {
          console.log('res', res.data)
          self.$set(self.formData[1], 'options', res.data)
          // self.formData[1].options = res.data;
          self.cascaderOptions = res.data;
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    // 新建发展计划
    createDevelopPlan() {
      const self = this;
      const data = this.params;
      (async (data)=>{
				let res = await self.$api.createDevelopPlan({data})
				if(res && res.code == 0) {
          console.log(res)
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    changeForm(val) {
      console.log('派发出来的参数', val)
      this.params = Object.assign(this.params, val);
      if(this.params.planDate) {
        this.params.planDate = moment(this.params.planDate).format("YYYY")
      }
      
      const instArr = getCascaderCheckedItem(val.insCode, 'id', this.cascaderOptions)
      console.log(instArr)
    },
    submit() {
      const self = this;
      console.log('提交的参数', this.params)
      self.$refs.baseForm.validate((val)=>{
        console.log(val)
        self.createDevelopPlan();
      });
    },
    changeSelect(val) {
      console.log(this.form, val)
    },
    cancel() {

    }
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
</style>
