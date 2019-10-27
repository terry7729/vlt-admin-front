<template>
  <div class="vlt-card">
    <div class="search">
      <search-Bar :options="option" @search="search"></search-Bar>
    </div>
    <div class="addlist">
      <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
    </div>
    <div>
      <tips-line>共搜索到8项数据</tips-line>
    </div>
    <div class="el_table">
      <el-table :data="tableData" ref="multipleTable" border>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="keyName" label="数据字典名称"></el-table-column>
        <el-table-column prop="key" label="数据字典键"></el-table-column>
        <el-table-column prop="value" label="字典数据值"></el-table-column>
        <el-table-column prop="description" label="数据字典描述 "></el-table-column>
        <el-table-column label="创建时间 ">
          <template slot-scope="scope">{{translateTime(scope.row.createTime)}}</template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column prop="updateBy" label="更新人 "></el-table-column>
        <el-table-column label="更新时间 ">
          <template slot-scope="scope">{{translateTime(scope.row.updateTime)}}</template>
        </el-table-column>
        <el-table-column prop="status" label="数据字典状态">
          <template slot-scope="scope">
            <tableRowStatus
              :scope="scope"
              :tableData="tableData"
              idField="id"
              statusField="status"
              :rowName="scope.row.name"
              :option="{
                enable:{
                  apiName:'enable',
                  label:'启用',
                  value:0
                },
               disable:{
                  apiName:'disable',
                  label:'冻结',
                  value:1
               },
               
              }"
            ></tableRowStatus>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <table-paging
        :total="total"
        :currentPage="currentPage"
        :pageSize="pageSize"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></table-paging>
    </div>

    <div class="role-dialog">
      <el-dialog :visible.sync="dialogFormVisible" width="600px" custom-class="roleDialog">
        <!-- <roleifometion></roleifometion> -->
        <div class="vlt-edit-single">
          <h2 class="title">基本信息</h2>
          <div class="vlt-edit-wrap">
            <base-form
              :formData="formData"
              labelWidth="90px"
              ref="baseForm"
              :rules="rules"
              direction="right"
              @change="changeForm"
            ></base-form>
            <el-row class="vlt-edit-btn">
              <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
              <el-button size="medium" @click="cancel">取消</el-button>
            </el-row>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
import moment from "moment";
export default {
  name: "",
  data() {
    return {
      rules: {},
      dialogFormVisible: false,
      multipleSelection: [],

      controlOptions: [
        //按钮组
        { name: "新建流程", type: "primary", icon: "plus" } // type为按钮的五种颜色， icon为具体的图标
        // { name: "导出", type: "success", icon: "download" },
        // { name: "打印", type: "primary", icon: "printer" }
      ],
      option: [
        {
          title: "字典名称",
          prop: "keyName",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        }
      ],
      tableData: [
        {
          id: 1,
          classes: "游戏类型",
          dictionaryname: "主动型",
          dictionarydata: "active",
          sort: "1",
          creater: "admin",
          createrdate: "2019-10-12 10:0:0"
        }
      ],
      total: 0,
      pageSize: 10,
      currentPage: 0,
      // Data:{
      // page: 1,
      // pageSize: 10,//每页显示数据调试
      // param: {
      //   "size": "",
      //   "total": "",
      //   "pages": '',
      // }
      // },
      formData: [
        { title: "字典名称", type: "input", prop: "keyName", value: "" },
        {
          title: "数据字典键",
          type: "input",
          prop: "key",
          value: ""
        },
        {
          title: "字典数据值",
          type: "input",
          prop: "value",
          value: ""
        },
        { title: "状态", type: "switch", prop: "status", value: "" },
        { title: "详情描述", type: "textarea", prop: "description", value: "" }
      ],
      data: {
        page: 0,
        pageSize: 0,
        param: {}
      }
      // search:{

      //     param: {
      //       keyName: "",
      //     }
      // },
    };
  },
  components: {},
  created() {
    let data = this.data;
    this.getAll(data);
  },
  methods: {
    translateTime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    },
    getAll(data) {
      const that = this;
      (async data => {
        let res = await that.$api.getAll({ data });
        console.log('全部数据',res);
        if (res && res.code == 0) {
          that.tableData = res.data.records;
          that.total = res.data.total;
          that.pageSize = res.data.size;
        } else {
        }
      })(data);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    handleSizeChange() {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange() {},

    async search(val) {
      //搜索接口
      // let obj=this.search.param
      //console.log(val)
      let data = {
        param: val
      };
      //  let data1={...obj,param}
      let result = await this.$api.getByCondition({ data });
      console.log(result);
      this.tableData = result.data.records;
    },

    selectBtn() {
      //新建
      // this.$router.push({
      //   path: "dataDictionary/dataDictionaryEdit",
      // });
      this.dialogFormVisible = true;
      this.flag = true;
    },
    async edit(val) {
      this.dialogFormVisible = true;
      this.newcreate = 0;
      this.flag=false;
      //this.$router.push({
      //   path: "dataDictionary/dataDictionaryEdit",
      //   query:{id}
      // });
      let result = await this.$api.edit;
    },
    //表单change事件
    changeForm(val) {
      this.param = val;
      console.log(1111,this.param);
    },
    async submit(val) {
      // this.$refs.baseForm.validate(val => {
      //   console.log(val);
      let data = this.param
      if (this.flag == true) {
        //let formData = this.$refs.baseForm.form;
        let result = await this.$api.add({ data });
        // this.$refs.baseForm.resetForm();
        console.log(result);
        this.dialogFormVisible = false;
      } else if(this.flag==false){
        let result = await this.$api.edit({ data });
        this.$refs.baseForm.resetForm();
        console.log(result);
        this.dialogFormVisible = false;
      }
      // });
    },

    cancel() {
      // this.$router.go(-1)
      this.dialogFormVisible = false;
    },
    handler() {},
    // async disable(val) {
    //   this.id=val
    //   cosole.log(1111,id)
    //   let data=id
    //   let result = await this.$api.disable(id);
    //   console.log(22222,result);
    // },
    // async enable(id) {
    //   let result = await this.$api.enable(id);
    //   console.log(result);
    // }
  }
};
</script>

<style lang="less" scoped>
</style>
