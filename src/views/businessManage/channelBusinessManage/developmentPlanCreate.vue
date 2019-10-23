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
import {getCascaderCheckedItem} from '@/utils/getCascaderCheckedItem.js'
import rules from '@/utils/rules.js';

export default {
  name: "",
  data() {
    return {
      formData: [
        {title: '计划时间', type: 'datetime', prop: 'time', value: ''},
        {title: '所属机构', type: 'cascader', prop: 'insCode', value: [], options: [], 
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            // multiple: true, // 多选
            // checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
          }
        },
        {title: '新建销售厅数量', type: 'input', prop: 'test', value: ''},
        {title: '销售厅投注机数量', type: 'input', prop: 'test', value: ''},
        {title: '市合作厅数量', type: 'input', prop: 'test', value: ''},
        {title: '市合作厅投注数量', type: 'input', prop: 'test', value: ''},
        {title: '发展预算', type: 'input', prop: 'test', value: ''},
        {title: '计划说明',type: 'textarea', prop: 'all', value: ''},
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
      cascaderOptions: []
    }
  },
  created() {
    // 获取所属机构数据
    this.getInsData()
  },
  methods: {
    getInsData() {
      const self = this;
      const data = {};
      (async (data)=>{
				let res = await self.$api.queryInsTree({data})
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
    createDevelopPlan(row) {
      const self = this;
      const data = {
        orderId: row.orderId
      };
      (async (data)=>{
				let res = await self.$api.createDevelopPlan({data})
				if(res && res.code == 0) {
          self.$message.success('注销成功')
          row.orderStatus = 6;
          self.getLotteryList(self.param)
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    changeForm(val) {
      console.log('派发出来的参数', val)
      const instArr = getCascaderCheckedItem(val.insCode, 'id', this.cascaderOptions)
      console.log(instArr)
    },
    submit() {
      this.$refs.baseForm.validate((val)=>{
        console.log(val)
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
