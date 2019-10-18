<template>
 <div class="vlt-card">
   <div class="content-block">
     <search-bar class="search-bar-demo" @search="search" :options="searchOptions" :total="999" labelWidth="80px"></search-bar>
     <control-bar slot="extend-bar" @select="addBtn" :options="controlOptions" position="left"></control-bar>
     <el-table :data="tableData" border>
        <el-table-column fixed label="序号" type="index" width="90px"></el-table-column>
        <el-table-column label="仓库名称" prop="storeName" min-width="120px"></el-table-column>
        <el-table-column label="所属机构" prop="organization"></el-table-column>
        <el-table-column label="仓库类型" prop="storeType"></el-table-column>
        <el-table-column label="仓库管理员" prop="storeAdmin"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" v-prevent="2000" @click="storeDetail(scope.row.id)">查看</el-button>
            <el-button type="text" size="mini" v-prevent="2000" @click="storeEdit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class="vlt-edit-single">
      <el-dialog title="基本信息" :visible.sync="dialogFormVisible">
        <base-form :formData="basicInfo" labelWidth="140px" ref="baseForm" :rules="rules2" direction="right" @change="changeForm" ></base-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
        </div>
      </el-dialog>
    </div>
   </div>
 </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
 name: "storeManage",
 data() {
 return {
   params:{},
   dialogAddFormVisible:false,
   dialogFormVisible: false,
   searchOptions:[
     {title:'仓库名称',type:'input',prop:'storeName',value:''},
     {title:'仓库类型',type:'select',prop:'storeType',value:'',options:[{label:'中彩仓库',value:'1'},{label:'省中心仓库',value:''}]},
     {title:'仓库管理员',type:'select',prop:'storeAdmin',value:'',options:[{label:'xxx',value:'1'},{label:'yyy',value:'2'}]},
     {title:'所属机构',type:'select',prop:'organization',value:'',options:[{label:'广东省',value:'1'},{label:'北京市',value:''}]},
   ],
   controlOptions:[{ name: "新建仓库", type: "primary", icon: "plus" }],
   tableData:[
     {id:1,storeName:'xxx',organization:'广东省',storeType:'中彩仓库',storeAdmin:'xxxx'},
     {id:2,storeName:'xxx',organization:'广东省',storeType:'省中心仓库',storeAdmin:'xxxx'},
   ],
   basicInfo:[
     {title:'仓库名称',type:'input',prop:'storeName',value:''},
     {title:'所属机构',type:'select',prop:'organization',options:[{label:'深圳市',value:'sz'},{label:'广东市',value:'gd'}]},
     {title:'仓库类型',type:'select',prop:'storeType',options:[{label:'中彩仓库',value:'zc'},{label:'省中心仓库',value:'szx'}]},
     {title:'仓库管理员',type:'select',prop:'storeAdmin',options:[{label:'admin',value:'1'},{label:'xxxx',value:'2'}]},
     {title:'备注',type:'textarea',prop:'remark',value:''},
   ],
   rules2: {
        storeName: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        organization: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        storeType: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        storeAdmin: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        remark: [{ required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
      },

 }
 },
 components: {
 },
 methods: {
   search(form) {
        console.log("search", form);
    },
  //新建仓库跳转
   addBtn(val) {
      this.$router.push({name:'addStore'});
    },
    //查看
    storeDetail(id){
      this.$router.push({name:'detail',query:{id}})
    },
    //编辑
   storeEdit(id){
     this.dialogFormVisible = true;
     console.log(id)
   },
   changeForm(val) {
      Object.assign(this.params, val);
      console.log("派发出来的参数", this.params);
  },
 },
}
</script>

<style lang="less" scoped>
</style>
