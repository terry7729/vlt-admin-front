<template>
  <div class="vlt-card">
    <div class="vlt-edit-double">
      <h2 class="title">{{title}}</h2>
      <div class="vlt-edit-wrap">
        <el-form  :rules="rules" ref="ruleForm" label-width="100px" label-position="top" class="demo-ruleForm">
            <el-form-item label="姓名" prop="userName" >
              <el-input type="text" v-model="form.userName" ></el-input>
            </el-form-item>
             <el-form-item label="手机号码" prop="mobile" >
              <el-input type="text" v-model="form.mobile"></el-input>
            </el-form-item>
             <el-form-item label="邮箱" prop="email" >
              <el-input type="text" v-model="form.email"></el-input>
            </el-form-item>
             <el-form-item label="用户状态" prop="userStatus" >
                <el-select placeholder="请选择" v-model="form.userStatus">
                  <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
             <el-form-item label="所属机构" prop="userInsList" >
              <el-cascader
              @change="handelerChange"
              v-model="form.userInsList"
                :options="options"
                :props="setProps"
                clearable></el-cascader>
            </el-form-item>
              <!-- <el-form-item label="所属机构编号" prop="insCode" >
              <el-input type="text" v-model="form.insCode" :disabled="true"></el-input>
            </el-form-item> -->
             <el-form-item label="所属部门" prop="userDeptList" >
                 <el-cascader
                 v-model="form.userDeptList"
                :options="userDeptOptions"
                :props="setProps"
                clearable></el-cascader>
            </el-form-item>
           
             <el-form-item label="用户账号" prop="account" >
              <el-input type="text"  v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="用户角色" prop="userRoleList" >
                <el-select  v-model="form.userRoleList"  multiple placeholder="请选择角色" >
                  <el-option
                 
                    v-for="item in userListOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-row class="el-form-item vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="userSubmit">提交并保存</el-button>
          <el-button size="medium" @click="cencle">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
let falg = true;
export default {
  async created() {

      this.title = this.$route.query.title;
      if(this.$route.query.ifo){
        let arr =Object.keys(this.form)
        console.log(this.$route.query.ifo)
        let arr2 = Object.keys(this.$route.query.ifo)
        arr.forEach(item=>{
          arr2.forEach(i=>{
            if(item === i){
              this.form[item] = this.$route.query.ifo[i]
            }
          })
        })
      }
      let reslt = await this.$api.QueryInsTree(); //机构树查询
      console.log("用户页机构树查询", reslt);
      if (reslt.code === 0) {
        this.options = reslt.data
        this.insData = reslt.data
      }
      
      let reslt3 = await this.$api.QueryAllRole(); //查询全部可用角色
      console.log("用户页面查询全部可用角色", reslt3); 
      if (reslt3.code === 0) {
        let arr3 = reslt3.data.map((item,index)=>{
        return {label:item.roleName,value:item.roleId}
      })
        this.userListOptions = arr3;
      }
 
  },
  data() {
    return {
      insData:{},
      title: "",
      rules: {}, //表单验证对象
      options:[],
      rules:{},
      userListOptions:[],
      userDeptOptions:[],
      selectOptions:[
        {label:'启用',value:0},
        {label:'冻结',value:1}
      ],
      setProps:{
        value:'id',
        label:'text',
        checkStrictly: true ,
        children: "children",
      },
      form:{
          userName:'',
          mobile:'',
          email:'',
          userStatus:0,
          userInsList:[],
          // insCode:'',
          userDeptList:[],
          account:'',
          userRoleList:[]
      },
   
    };
  },
  methods: {
    handelerChange(val){
        console.log('当前选中节点',val)
        if(val.length>1){
          
          let num  = val[val.length-1]
          // console.log(num)
          this.getdepment(num)
         
        }else{
          let num = val[0]
          this.getdepment(num)
        }
    },
    //表单提交事件
    async userSubmit() {
     
      if (this.title === "新建用户信息") {
        let data = {
          ...this.form
        }
        data.userId = "";
        let reslt = await this.$api.userRegist({Message:'请求成功', data });
        console.log(reslt);
        if (reslt.code === 0) {
          this.params = {};
          this.$router.push({ name: "userList" });
        }
      } else if (this.title === "编缉用户信息") {
        console.log("编缉用户信息");
        let data = {
          ...this.form
        }
        data.userId = this.$route.query.ifo.userId;
        console.log(data);
        let reslt = await this.$api.userEdit({ data });
        console.log("编缉用户信息", reslt);
        if (reslt.code === 0) {
          this.$router.push({ name: "userList" });
          this.params = {};
        }
      }
    },
    cencle() {
      this.$router.go(-1);
    },

   async getdepment(val){
    //  console.log('当前Id',val)
      // let code = this.getInsArray(val,'id',this.insData, 'code')
      //    console.log(code)
      //   if(code){
      //     this.form.insCode = code[0]
      //   } 
      let reslt = await this.$api.FindDeptTreeRoots({data:val})
      if(reslt.code === 0){
         this.userDeptOptions = reslt.data
      }
        console.log(reslt)
    },
   // 返回机构完整数组
      getInsArray(id, key, data, keyBack) { // 传入id和key是一样胡  keyBack返回key
        const self = this;
        for (var i in data) {
          if (data[i][key] == id) {
            // return [data[i][key]]; //用于传id 返回id数组
              return [data[i][keyBack]]; //用于传id 返回code数组
          }
          if (data[i].children) {
          let ro = self.getInsArray(id, key, data[i].children, keyBack);
            if (ro !== undefined) {
            return ro.concat(data[i][keyBack]);
            }
          }
        }
      },
  },

};
</script>



<style lang="less">
@import "./less/index.less";
</style>