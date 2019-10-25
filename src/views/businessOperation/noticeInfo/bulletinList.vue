<template>
  <div class="vlt-card">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    ></search-bar>
    <el-button type="primary" size="small" @click="addBulletin">
      <i class="el-icon-plus">发布公告</i>
    </el-button>

    <el-table :data="tableData" border style="width: 100%; margin-top: 10px;">
      <el-table-column prop="num" label="序号"></el-table-column>
      <el-table-column prop="name" label="公告名称"></el-table-column>
      <el-table-column prop="template" label="公告模板"></el-table-column>
      <el-table-column prop="manage" label="管理层级"></el-table-column>
      <el-table-column prop="area" label="所属机构"></el-table-column>
      <el-table-column prop="time" label="公告周期"></el-table-column>
      <el-table-column prop="type" label="发布状态"></el-table-column>
      <el-table-column prop="target" label="公告对象"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="bulletinDetail(scope.row.name)">查看详情</el-button>
          <el-button type="danger" size="mini" v-if="scope.row.type=='已公告'">停用</el-button>
          <el-button type="danger" size="mini" v-if="scope.row.type=='待公告'">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-paging
      :current-page="1"
      :page-size="10"
      :total="100"
      @handleSizeChange="pageSizeChange"
      @handleCurrentChange="pageCurrentChange"
    ></table-paging>

    <el-dialog title="基础信息" :visible.sync="dialogFormVisible">
      <section class="comp-item">
        <div class="vlt-edit-single">
          <div class="vlt-edit-wrap">
            <el-form label-width="90px" :model="form" ref="form">
              <base-form
                :formData="dialogData"
                labelWidth="140px"
                ref="baseForm"
                :rules="rule2"
                direction="right"
                @change="changeForm"
              ></base-form>
            </el-form>
          </div>
        </div>
      </section>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="postBulletin">提交</el-button>
        <el-button type="primary" @click="saveForm">保存</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      rule2: { rule: "" },
      searchOptions: [
        { title: "公告名称", type: "input", prop: "name", value: "" },
        {
          title: "公告模板",
          type: "select",
          prop: "template",
          value: "",
          options: [
            {
              label: "模板1",
              value: "模板1"
            },
            {
              label: "模板2",
              value: "模板2"
            }
          ]
        },
        {
          title: "公告对象",
          type: "select",
          prop: "target",
          value: "",
          options: [
            {
              label: "全部",
              value: "全部"
            },
            {
              label: "007",
              value: "007"
            }
          ]
        },
        {
          title: "发布状态",
          type: "select",
          prop: "state",
          value: "",
          options: [
            {
              label: "待公告",
              value: "待公告"
            },
            {
              label: "已公告",
              value: "已公告"
            },
            {
              label: "已过期",
              value: "已过期"
            },
            {
              label: "已停用",
              value: "已停用"
            }
          ]
        },
        {
          type: "cascader",
          prop: "organ",
          value: "",
          title: "所属机构",
          options: [
            {
              value: "1",
              label: "江西省",
              children: [
                {
                  value: "2",
                  label: "宜春市",
                  children: [
                    {
                      value: "3",
                      label: "上高县"
                    }
                  ]
                }
              ]
            },
            {
              value: "4",
              label: "广东省",
              children: [
                {
                  value: "5",
                  label: "广州市",
                  children: [
                    {
                      value: "6",
                      label: "白云区"
                    }
                  ]
                }
              ]
            },
            {
              value: "7",
              label: "北京",
              children: [
                {
                  value: "8",
                  label: "海淀区"
                }
              ]
            }
          ]
        },
        {
          title: "公告周期",
          type: "datetime-range",
          prop: "time",
          value: ""
        }
      ],
      dialogFormVisible: false,
      form: {},
      dialogData: [
        { type: "input", title: "公告名称", prop: "name" },
        {
          type: "select",
          title: "公告模板",
          prop: "template",
          options: [
            { label: "模板1", value: "0" },
            { label: "模板2", value: "1" }
          ]
        },
        {
          type: "datepicker-range",
          prop: "time",
          value: "",
          title: "公告周期",
          options: ["start", "end"]
        },
        {
          type: "select",
          title: "管理层级",
          value: "",
          prop: "tier",
          options: [{ label: "全国", value: 2 }, { label: "广东省", value: 3 }]
        },
        {
          type: "select",
          title: "选择机构",
          prop: "organ",
          options: [
            { label: "中彩", value: "4" },
            { label: "广东福彩中心", value: "5" }
          ]
        },
        { type: "textarea", title: "公告对象", prop: "all" }
      ],

      tableData: [
        {
          num: 1,
          name: "防沉迷提醒",
          template: "责任提醒",
          manage: "全国",
          area: "深圳",
          time: "2019-10-14~2019-11-2",
          type: "已公告",
          target: "全部"
        }
      ]
    };
  },
  components: {},
  methods: {
    search(params) {
      console.log(params);
    },
    addBulletin() {
      this.dialogFormVisible = true;
    },
    saveForm() {
      // console.log(this.dialogData);
    },
    postBulletin() {
      this.dialogFormVisible = false;
    },
    bulletinDetail(name) {
      this.$router.push({ path: "bulletinDetail", query: name });
    },
    changeForm(val) {},

    pageSizeChange(size) {},
    pageCurrentChange(page) {}
  }
};
</script>

<style lang="less" scoped>
</style>
