<template>
  <div class="vlt-card">
    <div class="operationManage">
      <searchBar :options="operationManageoptions" @search="search" :total="this.num">
        <!-- <controlBar
          slot="extend-bar"
          @select="operationManageAddclick"
          :options="operationManageAddbtn"
          position="left"
        ></controlBar>-->
      </searchBar>
      <el-table :data="operationManageTableData" border style="width: 100%; margin-top: 10px">
        <el-table-column prop="operationManageNum" label="序号" type="index"></el-table-column>
        <el-table-column prop="channelId" label="渠道编号"></el-table-column>
        <el-table-column prop="accountCode" label="员工编号"></el-table-column>
        <el-table-column prop="accountName" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="channelIdentity" label="身份证号"></el-table-column>

        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="账户状态" prop="accountStatus"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="mini" @click="operationManageWrite(scope.row)">编辑</el-button> -->
            <el-button type="primary" size="mini" @click="operationManageLook(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <tablePaging
        :total="this.num"
        :currentPage="1"
        :pageSize="10"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></tablePaging>
      <!-- <el-dialog title="新增账号" :visible.sync="dialogFormVisible">
        <div class="vlt-edit-single">
          <base-form
            :formData="operationManageWriteData"
            ref="baseForm"
            :rules="operationManageWriteRule"
            direction="right"
            @change="operationManageWritechangeForm"
          ></base-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button :plain="true" type="primary" @click="save">保 存</el-button>
        </div>
      </el-dialog>-->
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "",
  data() {
    return {
      num: 0,
      // option: {
      //   enable: {
      //     apiName: "apiName",
      //     label: "启用",
      //     value: 0
      //   },
      //   disable: {
      //     apiName: "apiName",
      //     label: "冻结",
      //     value: 1
      //   },
      //   logout: {
      //     apiName: "apiName",
      //     label: "注销",
      //     value: 2
      //   }
      // },

      // 表格数据
      operationManageTableData: [],
      //搜索框类型
      operationManageoptions: [
        {
          type: "input",
          prop: "channelId",
          value: "",
          title: "渠道编号",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "accountCode",
          value: "",
          title: "员工编号",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "accountName",
          value: "",
          title: "姓名",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "accountStatus",
          value: "",
          title: "账户状态",
          placeholder: "请输入",
          options: [
            { label: "启用", value: 1 },
            { label: "冻结", value: 2 },
            { label: "注销", value: 3 }
          ]
        },
        {
          type: "select",
          prop: "roleId",
          value: "",
          title: "角色名称",
          placeholder: "请输入",
          options: []
        },
        // {
        //   type: "input",
        //   prop: "createBy",
        //   value: "",
        //   title: "创建人",
        //   placeholder: "请输入"
        // },
        {
          type: "datetime-range",
          prop: "createTime",
          value: "",
          title: "创建时间",
          options: ["start", "end"]
        }
      ],
      //按钮类型
      //operationManageAddbtn: [{ name: "新增", type: "primary", icon: "plus" }],
      //表单验证
      // operationManageWriteRule: {
      //   operationManageBelong: [
      //     { required: true, message: "请选择所属渠道", trigger: "change" }
      //   ],
      //   operationManageName: [
      //     { required: true, message: "请输入账户名称", trigger: "blur" }
      //   ],
      //   operationManageRoleName: [
      //     { required: true, message: "请选择账户角色", trigger: "change" }
      //   ],
      //   operationManageStaffNum: [
      //     { required: true, message: "请输入员工编号", trigger: "blur" }
      //   ],
      //   operationManageAge: [
      //     { required: true, message: "请输入年龄", trigger: "blur" }
      //   ],
      //   operationManagetelephone: [
      //     { required: true, message: "请输入手机号", trigger: "blur" }
      //   ],
      //   operationManageIDCard: [
      //     { required: true, message: "请输入身份证号", trigger: "blur" }
      //   ],
      //   operationManageAdress: [
      //     { required: true, message: "请输入联系地址", trigger: "blur" }
      //   ],
      //   operationManageLimit: [
      //     {
      //       type: "array",
      //       required: true,
      //       message: "请选择账号权限",
      //       trigger: "change"
      //     }
      //   ]
      // },
      searchData: {
        page: 0,
        pageSize: 10
      },

      // 编辑弹框表单类型
      // operationManageWriteData: [
      //   {
      //     type: "select",
      //     title: "所属渠道",
      //     prop: "channelName",
      //     value: "",
      //     options: [
      //       { label: "哈哈", value: "0" },
      //       { label: "嘿嘿", value: "1" }
      //     ]
      //   },
      //   {
      //     type: "input",
      //     title: "账户名称",
      //     prop: "accountName",
      //     value: ""
      //   },
      //   {
      //     type: "input",
      //     title: "员工编号",
      //     prop: "accountCode",
      //     value: ""
      //   },
      //   {
      //     type: "input",
      //     title: "年龄",
      //     prop: "age",
      //     value: ""
      //   },
      //   {
      //     type: "select",
      //     title: "账户角色",
      //     prop: "roleName",
      //     value: "",
      //     options: [
      //       { label: "哈哈", value: "0" },
      //       { label: "嘿嘿", value: "1" }
      //     ]
      //   },
      //   {
      //     type: "input",
      //     title: "手机号",
      //     value: "",
      //     prop: "phone"
      //   },
      //   {
      //     type: "input",
      //     title: "身份证号",
      //     value: "",
      //     prop: "channelIdentity"
      //   },
      //   {
      //     type: "input",
      //     title: "联系地址",
      //     value: "",
      //     prop: "address"
      //   },
      //   {
      //     type: "input",
      //     title: "账户密码",
      //     value: "",
      //     prop: "password",
      //     disabled: true,
      //     placeholder: "初始密码为123456"
      //   }
      // {
      //   type: "cascader-multiple",
      //   prop: "operationManageLimit",
      //   value: "",
      //   title: "账号权限",
      //   placeholder: "请选择",
      //   options: []
      // }
      //],
      row: ""
      //param: null
    };
  },
  async created() {
    this.init();
  },
  components: {},

  methods: {
    async init(val) {
      //初始查询列表的参数
      let data = {
        page: val,
        pageSize: 10,
        param: {
          accountName: "",
          accountStatus: "",
          createBy: "",
          createTime: "",
          fundId: "",
          roleId: ""
        }
      };
      let result = await this.$api.getAccount({ data: data });
      console.log(result);
      //let arr = result.data.records;
      let arr = result.data.records;
      arr.forEach(ele => {
        if (ele.accountStatus === 1) {
          ele.accountStatus = "启用中";
        } else if (ele.accountStatus === 2) {
          ele.accountStatus = "禁用";
        } else {
          ele.accountStatus = "注销";
        }
      });
      if (result.code === 0) {
        this.operationManageTableData = result.data.records;
        this.num = result.data.total;
        //   // console.log(result);
        // }
        // 获取用户角色列表
        let resul = await this.$api.accountRole();
        //console.log(resul);
        this.operationManageoptions[4].options = resul.data;
      }
    },
    //
    handleCurrentChange(val) {
      this.init(val);
    },
    handleSizeChange(size) {
      this.init();
    },
    //点击搜索
    async search(param) {
      let obj = this.searchData;
      //console.log(param.createTime.join(","));

      let data = { ...obj, param };
      // console.log(data);

      let result = await this.$api.getAccount({ data: data });
      console.log(result);
      this.operationManageTableData = result.data.records;
      //console.log(result);
      // if (result.code == 0) {
      // }
    },
    //新增按钮
    // operationManageAddclick() {
    //   this.$router.push("operationAccountAdd");
    // },
    //点击编辑
    // operationManageWrite(row) {
    //   this.dialogFormVisible = true;
    //   this.row = row;
    //   // row = this.operationManageWriteData[0].prop;
    //   //this.operationManageWriteData.value = Object.assign({}, row);
    //   let n = Object.keys(this.row);
    //   let arr = this.operationManageWriteData;
    //   //console.log(n);
    //   for (var i = 0; i < arr.length; i++) {
    //     for (var j = 0; j < n.length; j++) {
    //       if (arr[i].prop === n[j]) {
    //         arr[i].value = this.row[n[j]];
    //       }
    //     }
    //   }
    // },
    //点击查看
    operationManageLook(row) {
      this.$router.push({
        path: "operationAccountExamine",
        query: { id: row.id }
      });
      //console.log(row);
      //this.eventBus.$emit("send", row);
    }
    //编辑change事件
    // operationManageWritechangeForm(form) {
    //   this.param = form;
    // },
    //点击保存
    // async save() {
    //   let data = this.param;
    //   let id = this.row.id;
    //   //let formData = this.$refs.baseForm.form;
    //   let resul = await this.$api.updateAccount({ data }, id);
    //   this.init();
    //   this.$refs.baseForm.resetForm();
    //   console.log(resul);
    //   this.dialogFormVisible = false;
    // }
  }
};
</script>

<style lang="less" scoped>
</style>
