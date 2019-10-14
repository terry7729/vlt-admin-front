<template>
  <div class="vlt-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="渠道新建" name="first"></el-tab-pane>
      <el-tab-pane label="渠道新建流程图" name="second"></el-tab-pane>
    </el-tabs>
    <div class="vlt-edit-single">
      <h2 class="title">基本信息</h2>
      <div class="vlt-edit-wrap">
        <base-form :formData="formData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
      </div>
      <h2 class="title">人员信息</h2>
      <div class="vlt-edit-wrap">
        <base-form :formData="formData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" size="medium" @click="submit">提交并保存</el-button>
          <el-button size="medium" @click="editShow = !editShow">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "channelList",
  data() {
    return {
      activeName: "first",
      formData: [
        {title: '所属机构', type: 'cascader', prop: 'insCode', value: '',  options: []},
        {title: '渠道类型', type: 'select', prop: 'channelType', value: '', options:[{label:'自营厅',value:'1'},{label:'合作厅',value:'2'}]},
        {title: '渠道编号', type: 'input', prop: 'channelCode', value: ''},
        {title: '渠道地址', type: 'address', prop: 'address', value: '',options:[]}
      ],
      rules: {},
      params: {
      }
    };
  },
  created() {},
  methods: {
    handleClick() {},
    changeForm(val) {
      Object.assign(this.params, val)
      console.log('派发出来的参数', this.params)
    },
    submit() {
      this.$refs.baseForm.validate((val)=>{
        console.log(val)
      });
    },
    add() {
      console.log("a");
    }
  },
  components: {}
};
</script>


<style lang="less" scoped>
@import "./less/index.less";
</style>
