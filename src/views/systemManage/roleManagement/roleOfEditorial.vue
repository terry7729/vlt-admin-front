<template>
  <div class="vlt-card">
    <div class="vlt-edit-single">
      <h2 class="title">{{id?"编缉角色信息":'新增角色信息'}}</h2>
      <div class="vlt-edit-wrap">
        <el-form ref="form" label-position="top">
          <el-container>
            <el-aside>
              <el-tree
                :data="dataTree"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                :props="setProps"
                @check="checkChange"
                highlight-current
                :default-checked-keys="formParam.moduleIds"
              ></el-tree>
            </el-aside>
            <el-main style="padding:0 0 0 30px;margin-top:-8px">
              <el-form-item label="用户角色" prop="roleName">
                <el-input type="input" v-model="formParam.roleName" ></el-input>
              </el-form-item>
              <el-form-item label="角色类型" prop="roleType">
                <el-select placeholder="请选择" v-model="formParam.roleType">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="角色状态" prop="status" v-if="!id">
                  <el-switch
                    v-model="formParam.status"
                    active-color="#13ce66"
                    >
                  </el-switch>
              </el-form-item>
              <el-form-item label="角色编码" prop="roleCode"  v-if="!id">
                <el-input type="input" v-model="formParam.roleCode"></el-input>
              </el-form-item>
              <el-form-item label="描述" prop="roleDesc" >
                <el-input type="textarea" v-model="formParam.roleDesc"></el-input>
              </el-form-item>
            </el-main>
          </el-container>
              <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
              <el-button size="medium" @click="cancel">取消</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      id:-1,
      formParam:{
        roleName:'',
        roleType:'',
        roleDesc:'',
        roleCode:'',
        status:1,
        moduleIds:[]
      },
      options: [
        { label: "管理员", value: 1 },
        { label: "子管理员", value: 2 },
        { label: "普通角色", value: 3 }
      ],
      dataTree: [],
      setProps: {
        label: "text",
        value: "id",
        children: "children",
        multiple: true
      },
      currentCode:[],
    };
  },
  created() {
    const self = this;
   
    (async () => {
      let res = await this.$api.QueryModuleTree();
      self.dataTree = res.data;
    })();
     this.id = this.$route.query.id
     if(this.id){
        (async ()=>{
            let reslt =  await this.$api.QueryRoleInfoDetail({data:this.id})//查询角色详情
            for(let key in self.formParam){
              if (key !== 'moduleIds') {
                self.formParam[key] = reslt.data[key]
              }
            }

            

            const checkedIds = reslt.data['moduleIds'];
            const result = [];
            // 递归遍历渲染树选中项
            (function find(treeData) {
              for (let i = 0, len = treeData.length; i < len; i++) {
                let children = treeData[i].children || null;
                if (!children) {
                  checkedIds.forEach(id => {
                    if (id === treeData[i].id) {
                      result.push(id);
                    }
                  })
                } else {
                  find(children);
                }
              }
            })(self.dataTree);
            self.$set(self.formParam, 'moduleIds', result)

        })()
     
     }
    //  
    console.log(this.id)
  },
  components: {},
  methods: {
    submit(){
      const self = this;
      console.log(this.currentCode)
       
      if(this.id){
        (async ()=>{
              self.currentCode = []
            let arr = this.$refs.tree.getCheckedNodes(false,true)
              arr.forEach(item => {
                self.currentCode.push(item.id)
              });
            self.formParam.moduleIds = [...self.currentCode]
            let data = {
              ...self.formParam,
              roleId:self.id
            }
           let reslt = await this.$api.UpdateRoleInfo({message:'编缉成功',data})//修改角色信息
           if(reslt.code === 0){
            self.$router.push({name:'roleList'})
           }
            console.log(reslt,'编缉')
        })()
      }else{
        (async ()=>{
             self.formParam.moduleIds = [...self.currentCode]
           let data = {
              ...self.formParam,
              sysCode: "VLT_BMS",
              status:Number(self.formParam.status)    
            }
          let reslt = await this.$api.SaveRoleInfo({message:'新建成功', data });//保存角色信息
          console.log(reslt,'新建')
          if(reslt.code === 0){
            self.$router.push({name:'roleList'})

          }

        })()
      }

    },
    cancel(){

    },
    checkChange(...res){
        
        this.getCodeId()
       console.log(res,'arr')
    },
    getCodeId(){
        const self = this;
        self.currentCode =[]
        let arr = this.$refs.tree.getCheckedNodes(false,true)
        arr.forEach(item => {
            self.currentCode.push(item.id)
        });
    }

  }
};
</script>

<style lang="less" scoped>
</style>
