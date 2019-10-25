<template>
  <div class="vlt-card">
    <div class="vlt-edit-double">
      <h2 class="title" >{{title}}</h2>
      <div class="vlt-edit-wrap">
          <base-form
              :formData="data1"
              ref="baseForm"
              labelWidth="140px"
              :rules="rules"
              direction="top"
              @change="changeForm"
            ></base-form>
        <el-row class="el-form-item vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="userSubmit">提交并保存</el-button>
          <el-button size="medium" @click="cencle">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 async created() {
    console.log(this.$route.query.title)
    this.title = this.$route.query.title

    let reslt = await this.$api.QueryInsTree() //机构树查询
     console.log('用户页机构树查询',reslt)

    if(reslt.code === 0){
      this.data1[4].options = reslt.data
    }

    let reslt2 = await this.$api.FindDeptTreeRoots()//部门树查询
    console.log('用户页部门树查询',reslt2)
    if(reslt.code === 0){
      this.data[5].options = reslt2.data
    }

    let reslt3 = await this.$api.QueryAllRole()//查询全部可用角色
    console.log('用户页面查询全部可用角色',reslt3)
    if(reslt3 === 0){
      this.data[8].options = reslt3.data
    }
  },
  data() {
    return {
      title:"",
      params:{},//表单对象
      rules:{},//表单验证对象
      data1:[
        { type: "input", title: "姓名", prop: "name" },
        { type: "input", title: "手机号码", prop: "mobile" },
        { type: "input", title: "邮箱", prop: "email" },
        {
          type: "select",
          title: "用户状态",
          prop: "userStatus",
          options: [{ label: "无效", value: "0" }, { label: "有效", value: "1" }]
        },
        {
          type: "cascader",
          setProps: {
            label: "text",
            value: "code",
            children: "children",
            checkStrictly: true
          },
          title: "所属机构",
          prop: "insCode",
          value: "",
          placeholder: "请选择",
          options: []
        },
       {
          type: "cascader",
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            checkStrictly: true
          },
          title: "所属部门",
          prop: "departmentId",
          value: "",
          placeholder: "请选择",
          options: []
        },
        { type: "input", title: "所属机构编号", prop: "name" },
        { type: "input", title: "用户账号", prop: "name" },
        {
          type: "select",
          title: "用户角色",
          prop: "sex",
          options: []
        },
      ]
    };
  },
  methods: {
    //表单提交事件
async userSubmit(val) {
      console.log(val);
      if(this.title === "新建用户信息"){
          let data = JSON.parse(JSON.stringify(this.params))
      let reslt = await this.$api.userRegist({data})
      console.log(reslt)
          if(reslt.code === 0){
            this.params = {}
          }
      }else if(this.title === "编缉用户信息"){
          console.log('编缉用户信息')
        let data = JSON.parse(JSON.stringify(this.params))
        //  let reslt = await this.$api.userRegist({data})
      }

    },
    cencle(){
      this.$router.go(-1)
    },
    changeForm(val){
      console.log(val)
      Object.assign(this.params,val)
    }
  }
};
</script>



<style lang="less">
@import "./less/index.less";
</style>