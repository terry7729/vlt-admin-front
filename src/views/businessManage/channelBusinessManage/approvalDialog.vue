<template>
  <el-dialog title="审核计划汇总（省）" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <div class="vlt-card vlt-edit-single">
        <base-form ref="baseForm"
          :formData="formData" 
          :rules="rules2" 
          direction="right" 
          labelWidth="140px" 
          @change="changeForm">
        </base-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/javascript">
import rules from '@/utils/rules.js';
export default {
  name: "approvalDialog",
  props: {
    showDia: {
      type: Object,
      default: {
        showApproval: false
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      formData:[
        {title: '审核结果', type: 'select', prop: 'status', value: [], options: [{
          label: '通过',
          value: 1
        },{
          label: '未通过',
          value: 2
        }]},
        {title: '审批意见', type: 'input', prop: 'approvalComments', value: ''}
      ],
      rules2: {
        status:[{required: true, validator: rules.checkEmpty, trigger: 'blur'}],
        approvalComments: [{required: true, validator: rules.checkEmpty, trigger: 'blur'}]
      },
      params: {
        id: ''
      }
    };
  },
  watch:  {
    showDia (newVal) {
      this.dialogVisible = newVal.showApproval
      this.params.id = newVal.id
    }
  },
  components: {},
  methods: {
    handleClose () {
      console.log(1);
    },
    changeForm (val) {
      Object.assign(this.params, val)
    },
    submit () {
      let self = this;
      // console.log(this.params);
      let data = this.params;
      console.log('this.data', data);
      (async (data)=>{
				let res = await self.$api.updateDevelopPlanApproval({data})
				if(res && res.code == 0) {
          self.$message.success('提交成功')
          this.$emit('hideDia')
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    }
  }
};
</script>

<style lang="less" scoped>
</style>
