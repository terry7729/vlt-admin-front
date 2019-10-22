<template>
  <div class="vlt-card">
    <panel title="基本信息" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <base-form :formData="baseData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="财务信息" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <base-form :formData="bankData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="业务信息" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <base-form :formData="businessData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="其他附件" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <base-form :formData="businessData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "",
  data() {
    return {
      baseData: [
        {title:'公司名称',type:'input',prop:'name', value:''},
        {title:'公司法人',type:'input',prop:'name', value:''},
        {title:'联系人',type:'input',prop:'name', value:''},
        {title:'联系电话',type:'input',prop:'name', value:''},
        {title:'传真',type:'input',prop:'name', value:''},
        {title:'公司地址',type:'input',prop:'name', value:''},
      ],
      bankData: [
        {title:'银行卡号',type:'input',prop:'name', value:''},
        {title:'开户行名称',type:'input',prop:'name', value:''},
        {title:'支行名称',type:'input',prop:'name', value:''},
      ],
      businessData: [
        {title:'合作等级',type:'select',prop:'name', value:'',options:[{label:'青铜',value:'1'},{label:'王者',value:'2'}]},
        {title:'合作时间',type:'datetime-range',prop:'', value:'',options:['start','end']},
        {title:'合作区域',type:'cascader-multiple',prop:'name', value:'',options:[]},
        {title:'业务范围',type:'textarea',prop:'name', value:''},
      ]
    }
  },
  components: {
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>
</style>
