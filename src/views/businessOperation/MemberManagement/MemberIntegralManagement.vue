<template>
  <div class="vlt-card">
    <div class="MemberIntegral">
      <search-bar :options="MemberIntegralOptions" :total="999">
        <controlBar
          slot="extend-bar"
          @select="MemberIntegralBtn"
          :options="MemberIntegralBtnOption"
          position="left"
        ></controlBar>
      </search-bar>
      <el-table
        ref="memberEquityTable"
        :data="MemberIntegralTableData"
        tooltip-effect="dark"
        @selection-change="MemberIntegralChange"
        border
      >
        <el-table-column prop="MemberIntegralId" label="序号"></el-table-column>
        <el-table-column prop="MemberIntegralName" label="规则名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="MemberIntegralType" label="积分类型"></el-table-column>
        <el-table-column prop="MemberIntegralLimit" label="额度"></el-table-column>
        <el-table-column prop="MemberIntegralGive" label="赠送积分" min-width="100"></el-table-column>

        <el-table-column prop="MemberIntegralStatus" label="权益状态" min-width="150">
          <template slot-scope="scope">
            <tableRowStatus
              :scope="scope"
              :tableData="MemberIntegralTableData"
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
                  label:'删除',
                  value:2
               }
              }"
            ></tableRowStatus>
          </template>
        </el-table-column>
        <el-table-column prop="MemberIntegralDescribe" label="规则描述"></el-table-column>
        <el-table-column prop="MemberIntegralCreateDate" label="创建时间"></el-table-column>
        <el-table-column prop="memberEquityUpdateDate" label="更新时间" min-width="100"></el-table-column>
        <el-table-column prop="handles" label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="MemberIntegralDetail(scope.row)">详情</el-button>
            <el-button type="primary" size="mini" @click="MemberIntegralWrite(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增账号" :visible.sync="MemberIntegralVisible">
        <div class="vlt-edit-single">
          <base-form
            :formData="MemberIntegralData"
            ref="baseForm"
            :rules="MemberIntegralRule"
            direction="right"
            @change="MemberIntegralchangeForm"
          ></base-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="MemberIntegralVisible = false">取 消</el-button>
          <el-button type="primary" @click="MemberIntegralVisible = false">保 存</el-button>
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
      //编辑表单类型
      MemberIntegralData: [
        { type: "input", title: "规则ID", prop: "MemberIntegralID" },
        { type: "input", title: "规则名称", prop: "MemberIntegralName" },
        { type: "input", title: "额度", prop: "MemberIntegralLimit" },
        {
          type: "select",
          title: "积分类型",
          prop: "MemberIntegralType",
          options: [
            { label: "哈哈", value: "0" },
            { label: "哈哈", value: "1" }
          ]
        },
        { type: "input", title: "积分", prop: "MemberIntegralIntegral" },
        { type: "textarea", title: "规则描述", prop: "MemberIntegralDescribe" }
      ],
      //编辑弹框验证
      MemberIntegralRule: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        all: [{ required: true, validator: rules.checkEmail, trigger: "blur" }]
      },
      //编辑弹框默认为false
      MemberIntegralVisible: false,
      //搜索框类型
      MemberIntegralOptions: [
        {
          type: "input",
          prop: "MemberIntegralRuleName",
          value: "",
          title: "规则名称",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "MemberIntegralType",
          value: "",
          title: "积分类型",
          options: [
            {
              label: "哈哈",
              value: 1
            },
            {
              label: "哈哈",
              value: 2
            }
          ],
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "MemberIntegralRuleStatus",
          value: "",
          title: "规则状态",
          options: [
            {
              label: "哈哈",
              value: 1
            },
            {
              label: "哈哈",
              value: 2
            }
          ],
          placeholder: "请输入"
        }
      ],
      //按钮选择类型
      MemberIntegralBtnOption: [
        { name: "新增", type: "primary", icon: "plus" },
        { name: "批量删除", type: "", icon: "delete" },
        { name: "导出", type: "danger", icon: "download" }
      ],
      //表格数据
      MemberIntegralTableData: [
        {
          MemberIntegralId: 1,
          MemberIntegralName: "哈哈",
          MemberIntegralType: "哈哈",
          MemberIntegralLimit: "哈哈",
          MemberIntegralGive: "哈哈",
          MemberIntegralDescribe: "哈哈",
          MemberIntegralCreateDate: "哈哈",
          memberEquityUpdateDate: "哈哈"
        }
      ]
    };
  },
  components: {},
  methods: {
    //按钮类型选择
    MemberIntegralBtn(val) {
      if (val.name == "新增") {
        this.$router.push("MemberIntegralManagementAdd");
      } else if (val.name == "批量删除") {
      } else if (val.name == "导出") {
      }
    },
    //表格改变事件
    MemberIntegralChange() {},
    //点击详情
    MemberIntegralDetail(row) {
      let id = row.MemberIntegralId;
      this.$router.push({
        path: "MemberIntegralManagementDetail",
        query: { id }
      });
    },
    //点击编辑
    MemberIntegralWrite() {
      this.MemberIntegralVisible = true;
    },
    //编辑弹框表单change事件
    MemberIntegralchangeForm() {}
  }
};
</script>

<style lang="less" scoped>
</style>
