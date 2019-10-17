<template>
  <div class="vlt-card">
    <div class="MemberGrade">
      <search-bar :options="MemberGradeOptions" :total="999"></search-bar>
      <el-table
        ref="multipleTable"
        :data="MemberGradeTableData"
        tooltip-effect="dark"
        @selection-change="MemberGradeChange"
        border
      >
        <el-table-column prop="MemberGradeId" label="序号"></el-table-column>
        <el-table-column prop="MemberGradeRank" label="会员级别" show-overflow-tooltip></el-table-column>
        <el-table-column prop="MemberGradeName" label="会员名称"></el-table-column>
        <el-table-column prop="MemberGradeLeft" label="左区间"></el-table-column>
        <el-table-column prop="MemberGradeRight" label="右区间" min-width="100"></el-table-column>
        <el-table-column prop="MemberGradeDescribe" label="规则描述" show-overflow-tooltip></el-table-column>
        <el-table-column prop="MemberGradeDate" label="生效日期"></el-table-column>
        <el-table-column prop="MemberGradeStatus" label="状态"></el-table-column>
        <el-table-column prop="handles" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="MemberGradeWrite(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="会员等级修改" :visible.sync="MemberGradeWriteVisible">
        <div class="vlt-edit-single">
          <base-form
            :formData="MemberGradeWriteData"
            ref="baseForm"
            :rules="MemberGradeWriteRule"
            direction="right"
            @change="MemberGradeWritechangeForm"
          ></base-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="MemberGradeWriteVisible = false">取 消</el-button>
          <el-button type="primary" @click="MemberGradeWriteVisible = false">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      //编辑弹框默认为false
      MemberGradeWriteVisible: false,
      //搜索框类型
      MemberGradeOptions: [
        {
          type: "input",
          prop: "MemberGrade",
          value: "",
          title: "会员级别",
          placeholder: "请输入"
        },
        {
          type: "input",
          prop: "MemberName",
          value: "",
          title: "会员名称",
          placeholder: "请输入"
        }
      ],
      //表格数据
      MemberGradeTableData: [
        {
          MemberGradeId: 1,
          MemberGradeRank: "level1",
          MemberGradeName: "level1",
          MemberGradeLeft: "level1",
          MemberGradeRight: "level1",
          MemberGradeDescribe: "level1",
          MemberGradeDate: "level1",
          MemberGradeStatus: "level1"
        }
      ],
      //编辑弹框表单类型
      MemberGradeWriteData: [
        { type: "input", title: "会员级别", prop: "memberRank" },
        { type: "input", title: "会员名称", prop: "memberName" },
        {
          type: "select",
          title: "左区间",
          prop: "memberLeft",
          options: [
            { label: "哈哈", value: "0" },
            { label: "嘿嘿", value: "1" }
          ]
        },
        { type: "input", title: "右区间", prop: "memberRight" },
        {
          title: "生效日期",
          type: "datepicker",
          prop: "memberDate",
          value: ""
        },
        { type: "textarea", title: "规则描述", prop: "memberRules" }
      ]
    };
  },
  components: {},
  methods: {
    //编辑按钮
    MemberGradeWrite() {
      this.MemberGradeWriteVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
</style>
