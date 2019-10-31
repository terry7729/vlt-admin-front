<template>
  <div class="vlt-card">
    <test-form  :options="formData" ref="baseForm" labelWidth="140px" :rules="rules" direction="right" @change="changeForm">
      <el-upload
        class="upload-demo"
        slot="slotA"
        drag
        multiple
        action=""
        :limit="10"
        :show-file-list="true"
        :on-remove="handleRemove"
        :http-request="uploadFileOther">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
      <el-upload
        class="upload-demo"
        slot="slotB"
        drag
        multiple
        action=""
        :limit="10"
        :show-file-list="true"
        :on-remove="handleRemove"
        :http-request="uploadFileOther">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </test-form>
    <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
  </div>
</template>

<script type="text/javascript">
// import formMethods from '@/utils/formMethods'
import rules from '@/utils/rules.js';

export default {
  data() {
    return {
      rules: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: 'blur' }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: 'blur' }
        ],
        all: [
          { required: true, validator: rules.checkEmail, trigger: 'blur' }
        ],
        uploadA: [
          { required: true, validator: rules.checkEmail, trigger: 'blur' }
        ]
      },
      baseData: [
        {title: '上市游戏', type: 'select',  prop: 'a', value: 1, options:[{label:'苹果',value:1},{label:'香蕉',value:2}]},
        {title: '销售区域', type: 'cascader',  prop: 'all', value: [1,60], options: [],
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            // multiple: true, // 多选
            checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
          }
        },
        {title: '状态', type: 'select',  prop: 'status', value: 1, options:[{label:'启用',value:1},{label:'禁用',value:2}]},
        {title: '姓名', type: 'input',  prop: 'd', value: '', options:[{label:'启用',value:1},{label:'禁用',value:2}]},
        {title: '上传附件', type:'slot', slotName: 'slotA', prop:'uploadA'},
        {title: '备注', type: 'input',  prop: 'e', value: '', options:[{label:'启用',value:1},{label:'禁用',value:2}]},
        {title: '上传附件', type:'slot', slotName: 'slotB', prop:'uploadB'},
        {title: '简介', type: 'input',  prop: 'test', value: '', disable: true },
        {title: "单选",type: "radio",prop: "radio",value: 1,options: [{ label: "选项一", value: 1 }, { label: "选项二", value: 2 }]},
        {title: "下拉（多选）",type: "select-multiple",prop: "xiala",value:'',options: [{ label: "男", value: "0" }, { label: "女", value: "1" }]},
        {title: "说明", type: "textarea", prop: "textarea", value:''},
        {title: "兑奖权限", type: "switch", prop: "switch", value:'', options:[] },
        {title: "日期选择", type: "datepicker", prop: "date1", value: "",},
        {title: "日期选择range", type: "datepicker-range",prop: "date2",value: "",options: ["start", "end"]},
        {title: "时间", type: "datetime", prop: "date3", value: "",  },
        {title: "时间range",type: "datetime-range",prop: "date4",value: "",options: ["startTime", "endTime"]},
        {title: '多选', type:'checkbox',prop:'checkbox',value:[],options:[{label:'类型1',value:1},{label:'类型2',value:2},{label:'类型3',value:3}]}
      ],
      formData: []
    }
  },
  created() {
    let form = {
          a:'',
          all:'',
          d:'',
          e:'', 
          test:'',
          uploadA:'',
          uploadB:'',
          radio:'',
          xiala:'',
          date1:'',
          date4:'',
          checkbox:''
        }
    this.formData = this.$formMethods.toggle(this.baseData, form) // 切换菜单
    this.getInsData()
  },
  methods: {
    submit() {
      const self = this;
      self.$refs.baseForm.validate((val)=>{
        console.log(val)
        // self.createDevelopPlan();
      });
    },
    uploadFileOther() {
      this.$formMethods.set(this.baseData, 'uploadA', 1); // 设置表单的值
    },
    handleRemove() {},
    changeForm(val) {
      console.log('changeForm', val);
      let res = this.$formMethods.get(val); // 获取表单的值
      console.log('获取表单的值', res)
      this.$formMethods.set(val, 'c', 1); // 设置表单的值
      // console.log('设置的数据', data)
      
      if(res.a=='1'){
        let form = {
              a:'',
              all:'',
              d:'',
              e:'', 
              test:'',
              uploadA:'',
              uploadB:'',
              radio:'',
              xiala:'',
              date1:'',
              date4:'',
              checkbox:''
            }
        this.formData = this.$formMethods.toggle(this.baseData, form) // 切换菜单
        // console.log('array', array)
      }else if(res.a=='2'){
        let form = {
              a:'',
              status:'',
              e:'', 
              test:'',
              uploadA:'',
              uploadB:'',
              switch:'',
              textarea:'',
              date2:'',
              date3:'',
              checkbox:''
            }
        this.formData = this.$formMethods.toggle(this.baseData, form) // 切换菜单
        // console.log('array', array)
      }
      if(res.all) {
        // this.$set(this.baseData[3], 'value', val.b)
        if(res.all=='65') {
          this.$formMethods.set(val, 'e', 'value', res.all)
          this.$formMethods.set(val, 'e', 'disabled', true)
        } else {
          this.$formMethods.set(val, 'e', 'value', '')
          this.$formMethods.set(val, 'e', 'disabled', false)
        }
      }
    },
    // 获取机构数据
    getInsData() {
      const self = this;
      const data = {};
      (async (data)=>{
				let res = await self.$api.QueryInsTree({data})
				if(res && res.code == 0) {
          console.log('res', res.data)
          self.$set(self.baseData[1], 'options', res.data)
          // self.formData[1].options = res.data;
          // self.cascaderOptions = res.data;
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
  },
}
</script>

<style lang="less" scoped>

</style>
