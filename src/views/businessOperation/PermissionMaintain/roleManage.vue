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
                  apiName:'apiName',
                  label:'启用',
                  value:0
                },
               disable:{
                  apiName:'apiName',
                  label:'冻结',
                  value:1
               },
               logout:{
                  apiName:'apiName',
                  label:'注销',
                  value:2
               }
              }"
            ></tableRowStatus>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="140">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="roleManageAuthority(scope.row.id)">权限设置</el-button>
            <el-button type="primary" size="mini" @click="roleManageWrite(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="roleManageLook(scope.row.id)">查看</el-button>
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
      <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
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
      // 权限设置弹框默认为false
      AuthoritydialogFormVisible: false,
      // 编辑弹框表单验证
      roleManageWriteRule: {
        roleManageName: [
          { required: true, message: "请输入用户角色", trigger: "blur" }
        ],
        accountType: [
          { required: true, message: "请输入角色类型", trigger: "blur" }
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
        { type: "input", title: "用户角色", value: "", prop: "roleManageName" },
        { type: "input", title: "角色类型", value: "", prop: "accountType" },
        {
          type: "select",
          title: "角色状态",
          prop: "accountStatus",
          value: "",
          options: [
            {
              label: "启用",
              value: "0"
            },
            {
              label: "冻结",
              value: "1"
            },
            {
              label: "注销",
              value: "2"
            }
          ]
        },

        {
          type: "cascader-multiple",
          prop: "roleManageAuthority",
          value: "",
          title: "角色权限",
          value: "",
          placeholder: "请选择",
          options: [
            {
              value: "zhinan",
              label: "指南",
              children: [
                {
                  value: "shejiyuanze",
                  label: "设计原则",
                  children: [
                    {
                      value: "yizhi",
                      label: "一致"
                    },
                    {
                      value: "fankui",
                      label: "反馈"
                    },
                    {
                      value: "xiaolv",
                      label: "效率"
                    },
                    {
                      value: "kekong",
                      label: "可控"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: "textarea",
          title: "描述",
          value: "",
          prop: "roleManageDescribe"
        }
      ],
      data: {},
      //权限设置弹框表单
      roleManageAuthorityWriteData: [
        {
          type: "cascader-multiple",
          prop: "accountAuthority",
          value: "",
          title: "角色权限",
          placeholder: "请选择",
          options: [
            {
              value: "zhinan",
              label: "指南",
              children: [
                {
                  value: "shejiyuanze",
                  label: "设计原则",
                  children: [
                    {
                      value: "yizhi",
                      label: "一致"
                    },
                    {
                      value: "fankui",
                      label: "反馈"
                    },
                    {
                      value: "xiaolv",
                      label: "效率"
                    },
                    {
                      value: "kekong",
                      label: "可控"
                    }
                  ]
                },
                {
                  value: "daohang",
                  label: "导航",
                  children: [
                    {
                      value: "cexiangdaohang",
                      label: "侧向导航"
                    },
                    {
                      value: "dingbudaohang",
                      label: "顶部导航"
                    }
                  ]
                }
              ]
            }
          ]
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
          prop: "roleManageName",
          value: "",
          title: "用户角色",
          placeholder: "请输入",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        {
          type: "input",
          prop: "roleManageCreater",
          value: "",
          title: "创建人",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "accountStatus",
          value: "",
          title: "角色状态",
          placeholder: "请输入",
          options: [
            { label: "启用", value: 0 },
            { label: "禁用", value: 1 },
            { label: "注销", value: 2 }
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
      num: 0
    };
  },
  components: {},
  async created() {
    let data = {
      page: 0,
      pageSize: 0,
      param: {
        createBy: "",
        createTime: "",
        page: 0,
        pageSize: 0,
        param: {},
        roleName: "",
        roleType: ""
      }
    };
    let result = await this.$api.getRole({ data });
    console.log(result);
    let arr = result.data.records;
    this.num = arr.length;
    // this.roleManageoptions[0].options = arr.roleType;
    this.roleManagetableData = arr;
  },
  methods: {
    //点击搜索
    search(formData) {
      console.log(formData);
    },
    // 新增按钮
    roleManageAddclick() {
      this.$router.push("roleManageAdd");
    },
    // 权限设置按钮
    roleManageAuthority() {
      this.AuthoritydialogFormVisible = true;
    },
    // 编辑按钮
    roleManageWrite(row) {
      this.dialogFormVisible = true;
      let name = Object.keys(row);

      let msg = this.roleManageWriteData;

      for (var i = 0; i < msg.length; i++) {
        for (var j = 0; j < name.length; j++) {
          if (msg[i].prop === name[j]) {
            msg[i].value = row[name[j]];
          }
        }
      }
    },
    // 查看按钮
    roleManageLook() {
      this.$router.push("roleManageExamine");
    },

    // 表单change事件
    changeForm(form) {
      Object.assign(this.data, form);
      //console.log(this.data);
    },
    // 权限表单change事件
    AuthoritychangeForm() {},
    handleSizeChange(size) {
      console.log(`每页 ${size} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //编辑表单弹框保存
    HandelSave() {
      let writeData = JSON.parse(JSON.stringify(this.data));
      console.log(writeData);
      // let getForm = this.$refs.baseFormDaglog.form;
      // console.log(getForm);
      //console.log(this.data);

      this.dialogFormVisible = false;
    },
    //权限设置弹框保存
    save() {
      this.AuthoritydialogFormVisible = false;
      let getAuthorityForm = this.$refs.baseForm.form;
      console.log(getAuthorityForm);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
