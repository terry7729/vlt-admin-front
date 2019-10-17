<template>
  <div class="vlt-card">
    <div class="memberEquity">
      <search-bar :options="memberEquityOptions" :total="999">
        <controlBar
          slot="extend-bar"
          @select="memberEquityBtn"
          :options="memberEquityBtnOption"
          position="left"
        ></controlBar>
      </search-bar>
      <el-table
        ref="memberEquityTable"
        :data="memberEquityTableData"
        tooltip-effect="dark"
        @selection-change="memberEquityChange"
        border
      >
        <el-table-column prop="memberEquityId" label="序号"></el-table-column>
        <el-table-column prop="memberEquityName" label="权益名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="memberEquityUser" label="适用会员"></el-table-column>
        <el-table-column prop="memberEquityDescribe" label="权益描述"></el-table-column>
        <el-table-column prop="memberEquityStartDate" label="生效时间" min-width="100"></el-table-column>
        <el-table-column prop="memberEquityEndDate" label="失效时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="memberEquitySource" label="权益来源"></el-table-column>
        <el-table-column prop="memberEquityStatus" label="权益状态">
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
        <el-table-column prop="memberEquityCreateDate" label="创建时间" min-width="100"></el-table-column>
        <el-table-column prop="handles" label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="memberEquityDetail(scope.row)">详情</el-button>
            <el-button type="primary" size="mini" @click="memberEquityWrite(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="memberEquityDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_paging">
        <tablePaging class="table_paging_right" :total="99" :currentPage="1" :pageSize="10"></tablePaging>
      </div>
      <el-dialog title="会员权益修改" :visible.sync="memberEquityWriteVisible">
        <div class="vlt-edit-single">
          <base-form
            :formData="memberEquityWriteData"
            ref="baseForm"
            :rules="memberEquityWriteRule"
            direction="right"
            @change="memberEquityWritechangeForm"
          ></base-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="memberEquityWriteVisible = false">取 消</el-button>
          <el-button type="primary" @click="memberEquityWriteVisible = false">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "",
  data() {
    return {
      //编辑弹框默认为false
      memberEquityWriteVisible: false,
      value: false,
      //搜索框类型
      memberEquityOptions: [
        {
          type: "input",
          prop: "memberEquityName",
          value: "",
          title: "权益名称",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "memberEquityUse",
          value: "",
          title: "适用会员",
          placeholder: "请输入"
        },
        {
          title: "生效时间",
          type: "datepicker-range",
          prop: "",
          value: "",
          options: ["start", "end"]
        }
      ],
      //新增按钮类型
      memberEquityBtnOption: [{ name: "新建", type: "primary", icon: "plus" }],
      //表格数据
      memberEquityTableData: [
        {
          memberEquityId: 1,
          memberEquityName: "哈哈",
          memberEquityUser: "哈哈",
          memberEquityDescribe: "哈哈",
          memberEquityStartDate: "哈哈",
          memberEquityEndDate: "哈哈",
          memberEquitySource: "哈哈",
          memberEquityStatus: "哈哈",
          swich1: 1,
          memberEquityCreateDate: "哈哈"
        }
      ],
      //编辑表单弹框验证
      memberEquityWriteRule: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        all: [{ required: true, validator: rules.checkEmail, trigger: "blur" }]
      },

      //编辑弹框表单类型
      memberEquityWriteData: [
        { type: "input", title: "权益名称", prop: "WriteName" },
        { type: "input", title: "权益编码", prop: "WriteNumber" },
        {
          type: "select",
          title: "操作等级",
          prop: "WriteGrade",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        {
          type: "select",
          title: "权益状态",
          prop: "WriteStatus",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        { type: "textarea", title: "权益描述", prop: "WriteDescribe" },
        {
          title: "创建时间",
          type: "datepicker",
          prop: "WriteCreateDate",
          value: ""
        },
        {
          title: "更新时间",
          type: "datepicker",
          prop: "WriteUpdateDate",
          value: ""
        }
      ]
    };
  },
  components: {},
  methods: {
    //点击新增
    memberEquityBtn(val) {
      if (val.name == "新建") {
        this.$router.push("MemberEquityManagementAdd");
      }
    },
    //点击详情按钮
    memberEquityDetail(row) {
      let id = row.memberEquityId;
      console.log(id);
      this.$router.push({
        path: "MemberEquityManagementDetail",
        query: { id }
      });
    },
    //点击编辑
    memberEquityWrite() {
      this.memberEquityWriteVisible = true;
    },
    //点击删除
    memberEquityDelete() {},
    memberEquityChange() {},
    memberEquityWritechangeForm() {}
  }
};
</script>

<style lang="less" scoped>
</style>
