<template>
  <div class="vlt-card">
    <div class="search">
      <search-Bar :options="option" @search="search" :total="total">
        <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
      </search-Bar>
    </div>
    <div class="el_table">
      <el-table :data="tableData" ref="multipleTable" border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="数据字典名称"></el-table-column>
        <el-table-column prop="key" label="数据字典键"></el-table-column>
        <el-table-column prop="value" label="字典数据值"></el-table-column>
        <el-table-column prop="description" label="数据字典描述"></el-table-column>
        <el-table-column label="创建时间 ">
          <template slot-scope="scope">{{translateTime(scope.row.createTime)}}</template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column prop="updateBy" label="更新人 "></el-table-column>
        <el-table-column label="更新时间 ">
          <template slot-scope="scope">{{translateTime(scope.row.updateTime)}}</template>
        </el-table-column>
        <el-table-column prop="isAllowDelete" label="数据字典状态" width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="tableData[scope.$index].isAllowDelete"
              active-color="#13ce66"
              @change="switchChange(scope.row)"
              active-text="启用"
              inactive-text="禁用"
              :inactive-value="1"
              :active-value="0"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="edit(scope.row)"
              :disabled="tableData[scope.$index].isAllowDelete?false:true"
            >编辑</el-button>
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
        { name: "新建字典", type: "primary", icon: "plus" }, // type为按钮的五种颜色， icon为具体的图标
        { name: "导出", type: "success", icon: "download" },
        { name: "打印", type: "primary", icon: "printer" }
      ],
      option: [
        {
          title: "字典名称",
          prop: "name",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        }
      ],
      tableData: [],
      total: 0,
      pageSize: 10,
      currentPage: 0,
      formData: [
        { title: "字典名称", type: "input", prop: "name", value: "" },
        {
          title: "数据字典键",
          type: "input",
          prop: "key",
          value: "",
          disabled: false
        },
        { title: "字典数据值", type: "input", prop: "value", value: "" },
        { title: "状态", type: "switch", prop: "isAllowDelete", value: "1" },
        { title: "详情描述", type: "textarea", prop: "description", value: "" }  
      ],
      data: {
        page: 0,
        pageSize: 10,
        param: {}
      }
    };
  },
  components: {},
  created() {
    let data = this.data;
    this.dictDataPage(data);
  },
  methods: {
    translateTime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    },
    async exportExcel() {
      //导出
      const res = await this.$api.exportDictDataList({
        data: {
          page: 1,
          pageSize: 10,
          param: {}
        },
        responseType: "blob"
      });
      var blob = new Blob([res], {
        type: "application/vnd.ms-excel;charset=utf-8"
      });
      var url = window.URL.createObjectURL(blob);
      var aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = url;
      aLink.setAttribute("download", "数据字典信息.xls");
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink); //下载完成移除元素
      window.URL.revokeObjectURL(url); //释放掉blob对象
      console.log(res);
    },
    async dictDataPage(data) {
      // const that = this;

      let res = await this.$api.dictDataPage({ data });
      console.log("全部数据", res);
      if (res && res.code == 0) {
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.pageSize = res.data.pageSize;
      } else {
      }
    },
    async switchChange(val) {
      console.log("val",val)
      let ifo;
      if (!val.isAllowDelete) {
        ifo = "此操作会启动此数据字典，请确认是否启动此字典？";
      } else {
        ifo = "此操作会禁用此数据字典，认确认是否要禁用此数据字典？";
      }
      this.$confirm(ifo, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = {
            id: val.id,
            isAllowDelete:val.isAllowDelete,
          };
          console.log(data);
          let reslt = await this.$api.status({ data });
          console.log("更改角色状态", reslt);
          if (reslt.code === 0) {
            let data1 = this.data;
            this.dictDataPage(data1);
            this.$message({
              type: "success",
              message: "状态更改成功!"
            });
          }
        })
        .catch(() => {
          let data1 = this.data;
            this.dictDataPage(data1);
          this.$message({
            type: "info",
            message: "更改状态失败"
          });
        });
    },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    handleSizeChange(val) {
      console.log(999, val);
      this.dictDataPage({
        pageSize: val,
        param: {}
      });
      this.data.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(6666, val);
      this.dictDataPage({
        page: val || 1,
        pageSize: this.data.pageSize,
        param: {}
      });
      this.currentPage = val;
    },

    async search(val) {
      //搜索接口
      // let obj=this.search.param
      console.log("搜索", val);
      let data = {
        param: val
      };
      //  let data1={...obj,param}
      if (val.keyName !== "") {
        let result = await this.$api.dictDataPage({
          message: "搜索成功",
          data
        });
        console.log(result);
        this.tableData = result.data.records;
        this.total = result.data.total;
      } else {
      }
    },

    selectBtn(val) {
      //新建流程
      // this.$router.push({
      //   path: "dataDictionary/dataDictionaryEdit",
      // });
      if (val.name == "新建字典") {
        this.dialogFormVisible = true;
        this.flag = true;
      } else {
        this.exportExcel();
      }
    },
    async edit(val) {
      //编辑
      console.log("编辑", val);
      this.dialogFormVisible = true;
      this.flag = false;
      this.val = val;
      let arr = Object.keys(val);
      let formData = this.formData;
      formData[1].disabled = true;
      console.log(formData);
      formData.forEach(item => {
        arr.forEach(i => {
          if (item.prop === i) {
            item.value = val[i];
          }
        });
      });
    },
    //表单change事件
    changeForm(val) {
      this.param = val;
      // console.log(1111,this.param);
    },
    async submit(val) {
      //新增和编辑
      // this.$refs.baseForm.validate(val => {
      if (this.param.isAllowDelete != 0) {
        this.param.isAllowDelete = 0;
      } else {
        this.param.isAllowDelete = 1;
      }
      // console.log(2222, data);
      let data = { ...this.param };
      if (this.flag) {
        //let formData = this.$refs.baseForm.form;
        let result = await this.$api.add({ data });
        // this.$refs.baseForm.resetForm();
        console.log(666, result);
        this.dialogFormVisible = false;
      } else {
        data.id = this.val.id;
        let result = await this.$api.edit({ data });
        // this.$refs.baseForm.resetForm();
        console.log(777, result);
        this.dialogFormVisible = false;
      }
      // });
    },

    cancel() {
      // this.$router.go(-1)
      this.dialogFormVisible = false;
    },
    handler() {}
  }
};
</script>

<style lang="less" scoped>
</style>
