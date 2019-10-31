<template>
  <div class="vlt-card">
    <div class="vlt-edit-single">
      <h2 class="title">基本信息</h2>
      <div class="vlt-edit-wrap">
        <test-form  :options="formData" ref="baseForm" labelWidth="140px" :rules="rules" direction="right" @change="changeForm">
        </test-form>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
import schema from 'async-validator';

export default {
  name: "addStore",
  data() {
    return {
      selectedOption: '',
      insData: [], //  所属机构数据
      options: [
        { title: "仓库名称", type: "input", prop: "warName", value: "" },
        {
          title: "所属机构",
          type: "cascader",
          prop: "insId",
          value: "",
          options: [],
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            // multiple: true, // 多选
            checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
          }
        },
        {
          title: "所属部门",
          type: "cascader",
          prop: "departmentId",
          value: "",
          options: [],
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            // multiple: true, // 多选
            checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
          }
        },
        {title:'仓库类型',type:'select',prop:'warType',value:'',disabled:true,options:[
          {label:'中彩仓库',value:1},
          {label:'省中心仓库',value:2},
          {label:'地市仓库',value:3}
        ]},
        {
          title: "仓库管理员",
          type: "select",
          prop: "adminId",
          value: "",
          options: [],
        },
        { title: "备注", type: "textarea", prop: "remark", value: "" }
      ],
      formData: [],
      rules: {
        warName: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        insId: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        adminId: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        // remark: [
        //   { required: true, validator: rules.checkEmpty, trigger: "blur" }
        // ]
      },
      departmentData: [],
      form: {},
      departmentArray: [],
    };
  },
  components: {},
  created() {
    let form = {
      warName:'',
      insId: '',
      departmentId: '',
      adminId:'',
      warType:'',
      remark:'',
    }
    this.formData = this.$formMethods.toggle(this.options, form) // 切换菜单
    this.getInsData();
  },
  methods: {
    changeForm(val) {
      let res = this.$formMethods.get(val)
      console.log("派发出来的参数", res);
      this.form = res;
      if (res.insId) {
        this.getAdminList(res.insId);
        let insArray = this.$formMethods.getInsArray(res.insId, "id", this.insData, "type");
        this.$formMethods.set(val, 'warType', 'value', insArray[0]+1)
      }
      if (res.departmentId) {
        // debugger 
        const data = JSON.parse(JSON.stringify(this.departmentData))
        this.getInsArray(res.departmentId, 'id', data, "list");
        let array = []
        this.departmentArray.forEach(item => {
          let obj = {}
          obj.label = item.userName;
          obj.value = item.userId;
          array.push(obj)
        });
        this.$formMethods.set(this.options, 'adminId', 'options', array)
      }
    },
    // 获取所属机构列表
    getInsData() {
      const data = {};
      (async data => {
        let res = await this.$api.getInsList({ data });
        console.log(res)
        if (res && res.code == 0) {
          // this.$set(this.formData[1], "options", res.data);
          this.$formMethods.set(this.options, 'insId', 'options', res.data);
          this.insData = res.data;
        } else {
          self.$message.warning(res.msg)
        }
      })(data);
    },
    // 获取仓库管理员数据
    getAdminList(data) {
      (async data => {
        let res = await this.$api.getAdminList({ data });
        console.log('部门与管理员',res)
        this.departmentData = res.data;
        this.$formMethods.set(this.options, "departmentId", 'options', res.data);
      })(data);
    },
    // 提交
    submit() {
            
      var descriptor = {
        remark(rule, value, callback, source, options) {
          var errors = [];
          if(!/^[a-z0-9]+$/.test(value)) {
            // debugger
            errors.push(new Error('校验失败'));
          }
          return errors;
        }
      }
      var validator = new schema(descriptor);
      validator.validate({remark: "Firstname"}, (errors, fields) => {
        // debugger
        if(errors) {
          return handleErrors(errors, fields);
        }
        // validation passed
      });
      // this.$refs.baseForm.validate(val=>{
      //   if(val) {
      //     delete this.form.departmentId;
      //     let data = this.form;
      //     this.createWare(data);
      //   }
      // })
    },
    // 创建仓库
    createWare(data) {
      (async data => {
        let res = await this.$api.createWare({ data });
        if (res && res.code == 0) {
          this.$message.success("新建成功");
          this.$router.push({ path: "storeManage" });
        }
      })(data);
    },
    cancel() {
      this.$router.back();
    },

    
    //数据级联
    getInsArray(id, key, data, keyBack) {
      // 传入id和key是一样胡  keyBack返回key
      const self = this;
      for (var i in data) {
        if (data[i][key] == id) {
          // return [data[i][key]]; //用于传id 返回id数组
          this.departmentArray = data[i][keyBack]
          return false; //用于传id 返回code数组
        }
        if (data[i].children) {
          self.getInsArray(id, key, data[i].children, keyBack);
          // let ro = self.getInsArray(id, key, data[i].children, keyBack);
          // if (ro !== undefined) {
          //   return ro.concat(data[i][keyBack]);
          // }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
