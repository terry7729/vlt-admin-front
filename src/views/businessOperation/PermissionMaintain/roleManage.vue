<template>
  <div class="vlt-card">
    <div class="roleManage">
      <!-- 搜索 -->
      <searchBar :options="roleManageoptions" @search="search" :total="this.num">
        <!-- 新增按钮 -->
        <controlBar
          slot="extend-bar"
          @select="roleManageAddclick"
          :options="roleManageAddbtn"
          position="left"
        ></controlBar>
      </searchBar>
      <!-- 表格 -->
      <el-table :data="roleManagetableData" border style="width: 100%; margin-top: 10px">
        <el-table-column prop="roleManageId" label="序号" type="index"></el-table-column>
        <el-table-column prop="roleName" label="用户角色"></el-table-column>
        <el-table-column prop="roleTypes" label="角色权限"></el-table-column>
        <el-table-column prop="remark" label="描述"></el-table-column>
        <el-table-column prop="createBy" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="角色状态" min-width="110" prop="accountStatus">
          <template slot-scope="scope">
            <tableRowStatus
              :scope="scope"
              :tableData="roleManagetableData"
              idField="id"
              statusField="status"
              :rowName="scope.row.name"
              :option="{
                enable:{
                  apiName:'roleAmend',
                  label:'启用',
                  value:1
                },
               disable:{
                  apiName:'roleAmend',
                  label:'冻结',
                  value:2
               },
               logout:{
                  apiName:'roleAmend',
                  label:'注销',
                  value:3
               }
              }"
            ></tableRowStatus>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="140">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="roleManageAuthority(scope.row.id)">权限设置</el-button>
            <el-button type="primary" size="mini" @click="roleManageWrite(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="roleManageLook(scope.row)">查看</el-button>
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
      <!-- 编辑弹框 -->
      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <div class="vlt-edit-single">
          <base-form
            :formData="roleManageWriteData"
            ref="baseFormDaglog"
            :rules="roleManageWriteRule"
            direction="right"
            @change="changeForm"
          ></base-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="HandelSave">保 存</el-button>
        </div>
      </el-dialog>
      <div>
        <!-- 权限设置弹框 -->
        <el-dialog title="权限设置" :visible.sync="AuthoritydialogFormVisible">
          <div class="vlt-edit-single">
            <base-form
              :formData="roleManageAuthorityWriteData"
              ref="baseForm"
              :rules="roleManageAuthorityWriteRule"
              direction="right"
              @change="AuthoritychangeForm"
            ></base-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="AuthoritydialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">保 存</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "",
  data() {
    return {
      //编辑弹框标题
      title: "编辑角色",
      // 权限设置弹框默认为false
      AuthoritydialogFormVisible: false,
      // 编辑弹框表单验证
      roleManageWriteRule: {
        roleManageName: [
          { required: true, message: "请输入用户角色", trigger: "blur" }
        ],

        accountStatus: [
          { required: true, message: "请选择角色状态", trigger: "change" }
        ],
        roleManageAuthority: [
          { required: true, message: "请选择角色权限", trigger: "change" }
        ]
      },
      // 权限设置弹框表单验证
      roleManageAuthorityWriteRule: {
        roleManageAuthority: [
          { required: true, message: "请选择角色权限", trigger: "change" }
        ]
      },
      // 编辑弹框表单类型
      roleManageWriteData: [
        { type: "input", title: "用户角色", value: "", prop: "roleName" },
        {
          type: "radio",
          prop: "isManager",
          title: "是否为负责人",
          value: 2,
          options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
        },
        {
          type: "cascader-multiple",
          prop: "sysCode",
          value: "",
          title: "角色权限",
          placeholder: "请选择",
          setProps: {
            label: "moduleName",
            value: "id",
            children: "childModules",
            multiple: true,
            checkStrictly: true
          },
          options: []
        },
        {
          type: "textarea",
          title: "描述",
          value: "",
          prop: "remark"
        }
      ],
      // 定义当前页
      pageSize: 10,

      //权限设置弹框表单
      roleManageAuthorityWriteData: [
        {
          type: "cascader-multiple",
          prop: "sysCode",
          value: "",
          title: "角色权限",
          placeholder: "请选择",
          setProps: {
            label: "moduleName",
            value: "id",
            children: "childModules",
            multiple: true,
            checkStrictly: true
          },
          options: []
        }
      ],
      // 编辑弹框默认为false
      dialogFormVisible: false,
      // roleManageCurrentPage: 1,
      // 表格数据
      roleManagetableData: [],
      // 搜索表单类型
      roleManageoptions: [
        {
          type: "select",
          prop: "id",
          value: "",
          title: "用户角色",
          placeholder: "请输入",
          options: []
        },
        {
          type: "input",
          prop: "createBy",
          value: "",
          title: "创建人",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "status",
          value: "",
          title: "角色状态",
          placeholder: "请输入",
          options: [
            { label: "启用", value: 1 },
            { label: "禁用", value: 2 },
            { label: "注销", value: 3 }
          ]
        },
        {
          type: "datetime-range",
          prop: "roleManageCreateDate",
          value: "",
          title: "创建时间",
          placeholder: ["开始时间", "结束时间"]
        }
      ],
      // 新增按钮类型
      roleManageAddbtn: [{ name: "新增", type: "primary", icon: "plus" }],
      num: 0,
      row: "",
      sycords: "",
      searchData: {
        page: 0,
        pageSize: 0
      },
      //表单定义为空
      form: "",
      //权限表单定义为空
      limit: ""
    };
  },
  components: {},
  created() {
    //初始表格数据
    this.init();
  },
  methods: {
    //初始数据
    async init(val) {
      //console.log(val);
      let data = {
        page: val,
        pageSize: this.pageSize,
        param: {
          createBy: "",
          createTime: "",
          param: {},
          roleName: "",
          roleType: ""
        }
      };
      let result = await this.$api.getRole({ data });
      console.log(result);
      //console.log(result);
      let arr = result.data.records;
      this.num = result.data.total;
      // this.roleManageoptions[0].options = arr.roleType;
      this.roleManagetableData = arr;
      //初始搜索用户角色数据
      let searchResult = await this.$api.accountRole();
      if (searchResult.code === 0) {
        this.roleManageoptions[0].options = searchResult.data;
      }
      //console.log(searchResult);
      //console.log(resul);
    },
    //点击搜索
    async search(param) {
      let obj = this.searchData;
      let data = { ...obj, param };
      let result = await this.$api.getRole({ data });
      if (result.code === 0) {
        this.roleManagetableData = result.data.records;
      }
    },
    // 新增按钮
    roleManageAddclick() {
      this.$router.push("roleManageAdd");
    },
    // 权限设置按钮
    roleManageAuthority(row) {
      this.AuthoritydialogFormVisible = true;
      this.getRoleSetting();
      this.sycords = row;
    },
    // 编辑按钮
    roleManageWrite(row) {
      this.getRoleTypes();
      this.row = row;
      this.dialogFormVisible = true;
      let name = Object.keys(this.row);
      let msg = this.roleManageWriteData;
      for (var i = 0; i < msg.length; i++) {
        for (var j = 0; j < name.length; j++) {
          if (msg[i].prop === name[j]) {
            msg[i].value = this.row[name[j]];
          }
        }
      }
    },
    //获取编辑权限设置列表
    async getRoleSetting() {
      let res = await this.$api.channelLimit();
      this.roleManageAuthorityWriteData[0].options = res.data;
    },
    // 获取编辑权限列表
    async getRoleTypes() {
      let res = await this.$api.channelLimit();
      this.roleManageWriteData[2].options = res.data;
    },
    // 查看按钮
    roleManageLook(row) {
      this.$router.push({ path: "roleManageExamine", query: { id: row.id } });
    },

    // 表单change事件
    changeForm(form) {
      this.form = form;
      //console.log(this.data);
    },
    // 权限表单change事件
    AuthoritychangeForm(form) {
      this.limit = form;
    },
    handleSizeChange(size) {
      //console.log(`每页 ${size} 条`);
      this.pageSize = size;
      this.init();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      // this.page = val;
      this.init(val);
      console.log(this.page);
    },
    //编辑表单弹框保存
    async HandelSave() {
      console.log(this.row.id);
      let id = this.row.id;
      let info = JSON.parse(JSON.stringify(this.form));
      //console.log(info);
      let data = { ...info, id };
      // console.log(data);
      data.sysCode = data.sysCode.join(",");
      //console.log(data);
      let response = await this.$api.roleAmend({ data });
      if (response.code === 0) {
        console.log(response);
        this.init();
        // this.$refs.baseForm.resetForm();
        this.dialogFormVisible = false;
      }
    },
    //权限设置弹框保存
    async save() {
      this.AuthoritydialogFormVisible = false;
      let id = this.sycords;

      //console.log(one);
      let info = JSON.parse(JSON.stringify(this.limit));
      let data = { ...info, id };
      data.sysCode = data.sysCode.join(",");
      let res = await this.$api.roleAmend({ data });
      if (res.code === 0) {
        this.init();
      }

      // console.log(res);
      // console.log(getAuthorityForm);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
