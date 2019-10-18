<template>
  <div class="vlt-card">
    <div class="el_box">
      <search-bar :options="options" :total="999"></search-bar>
      <div class="el_table">
        <el-table :data="tableData" border>
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="accountName" label="账户名称"></el-table-column>
          <el-table-column prop="accountNum" label="账号"></el-table-column>
          <el-table-column prop="accountType" label="账户类型"></el-table-column>
          <el-table-column prop="principalName" label="负责人姓名"></el-table-column>
          <el-table-column prop="telephoneNum" label="手机号码"></el-table-column>
          <el-table-column prop="createDate" label="创建时间"></el-table-column>
          <el-table-column label="账户状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.swich1"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="detail(scope.row)">详情</el-button>
              <el-button type="primary" size="mini" @click="write(scope.row.id)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table_paging">
        <tablePaging class="table_paging_right" :total="99" :currentPage="1" :pageSize="10"></tablePaging>
      </div>
      <el-dialog title="新增账号" :visible.sync="accountDialogFormVisible">
        <div class="vlt-edit-single">
          <el-form
            label-position="right"
            label-width="90px"
            :model="accountWriteform"
            ref="form"
            class="device-add"
          >
            <base-form
              :formData="accountWriteData"
              ref="baseForm"
              :rules="accountWriteRule"
              direction="right"
              @change="accountWritechangeForm"
            ></base-form>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="accountDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="accountDialogFormVisible = false">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import rules from "@/utils/rules.js";
import { mapState } from "vuex";
export default {
  name: "name",
  data() {
    return {
      // swich1: 0,
      accountWriteform: {},
      accountDialogFormVisible: false,
      accountWriteData: [
        { type: "input", title: "负责人", prop: "accountprincipal" },
        { type: "input", title: "手机号码", prop: "accounttelephone" },
        { type: "input", title: "所属区域", prop: "accountarea" },
        { type: "input", title: "详细地址", prop: "accountaddress" }
      ],
      accountWriteRule: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        all: [{ required: true, validator: rules.checkEmail, trigger: "blur" }]
      },
      options: [
        {
          type: "input",
          prop: "channelName",
          value: "",
          title: "渠道名称",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "telephoneNum",
          value: "",
          title: "手机号码",
          placeholder: "请输入"
        },

        {
          type: "select",
          prop: "accountStatus",
          value: "",
          title: "账户状态",
          placeholder: "请输入",
          options: [
            {
              label: "启用",
              value: 1
            },
            {
              label: "冻结",
              value: 2
            }
          ]
        }
      ],
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      accounttype: false,
      tableData: [
        {
          id: 1,
          accountName: "广东省",

          accountNum: "赵",
          accountType: "自营",
          principalName: "赵",
          telephoneNum: "13800131358",
          createDate: "2019-02-25 01:50:06",
          swich1: 0,
          operation: "详情"
        },
        {
          id: 2,
          accountName: "广东省",

          accountNum: "赵",
          accountType: "自营",
          principalName: "赵",
          telephoneNum: "13800131358",
          createDate: "2019-02-25 01:50:06",
          swich1: 0,
          operation: "详情"
        },
        {
          id: 3,
          accountName: "广东省",

          accountNum: "赵",
          accountType: "自营",
          principalName: "赵",
          telephoneNum: "13800131358",
          createDate: "2019-02-25 01:50:06",
          swich1: 1,
          operation: "详情"
        },
        {
          id: 4,
          accountName: "广东省",

          accountNum: "赵",
          accountType: "自营",
          principalName: "赵",
          telephoneNum: "13800131358",
          createDate: "2019-02-25 01:50:06",
          swich1: 1,
          operation: "详情"
        },
        {
          id: 5,
          accountName: "广东省",

          accountNum: "赵",
          accountType: "自营",
          principalName: "赵",
          telephoneNum: "13800131358",
          createDate: "2019-02-25 01:50:06",
          swich1: 1,
          operation: "详情"
        }
      ]
    };
  },
  computed: {
    ...mapState(["data"])
  },
  created() {},
  mounted() {},
  methods: {
    write() {
      this.accountDialogFormVisible = true;
    },
    accountWritechangeForm() {},
    changeSize() {},
    changeCurrent() {},
    detail(row) {
      console.log(row);
      this.$router.push({
        path: "accountList/accountListDetail" + "?id" + "=" + row.id
      });
    }
  }
};
</script>


<style lang="less" scoped>
@import "./less/index.less";
</style>
