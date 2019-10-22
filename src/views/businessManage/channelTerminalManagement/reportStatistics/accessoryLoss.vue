<template>
<!-- 配件损耗报表 -->
  <div class="vlt-card">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    >      <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions" position="left"></control-bar>
</search-bar>
    <el-row class="card-table">
      <el-table
        :data="tableDatas.tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        class="table-box"
      >
        <el-table-column
          v-for="(item,key) in tableDatas.tableKey"
          :key="key"
          :prop="item.value"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
      </el-table>
    </el-row>

    <table-paging
      position="right"
      :total="999"
      :currentPage="1"
      :pageSize="10"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></table-paging>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "accessoriesList",
  data() {
    return {
      // 搜索组件配置
      searchOptions: [
        {
          type: "input",
          prop: "inputName",
          value: "",
          title: "配件名称：",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "selectName",
          value: "",
          title: "配件型号：",
          placeholder: "请选择",
          options: [
            {
              label: "设备1",
              value: 1
            },
            {
              label: "设备2",
              value: 2
            }
          ]
        },
        {
          title: "申请日期：",
          type: "datetime-range",
          prop: "date4",
          value: ["2019-08-12 09:10:10", "2019-09-20 12:12:12"],
          option: ["start", "end"]
        },
        {
          type: "input",
          prop: "inputName2",
          value: "",
          title: "所属机构：",
          placeholder: "请输入"
        },
      ],
      controlOptions: [
        { name: "导出", type: "primary", icon: "download" },
        {name: '打印当前', type: "primary", icon: 'printer'}
      ],
      tableDatas: {
        tableData: [
          {
            id: 0,
            deviceName: "xxx",
            type: "xxx",
            coding: "xxx",
            affiliation: '广东省',
            CauseLoss: '',
            Applicant: '张三',
            applicationTime : '2018-12-19 16:10:40',
          },
          {
            id: 1,
            deviceName: "xxx",
            type: "xxx",
            coding: "xxx",
            affiliation: '广东省',
            CauseLoss: '',
            Applicant: '张三',
            applicationTime : '2018-12-19 16:10:40',
          },
          {
            id: 2,
            deviceName: "xxx",
            type: "xxx",
            coding: "xxx",
            affiliation: '广东省',
            CauseLoss: '',
            Applicant: '张三',
            applicationTime : '2018-12-19 16:10:40',
          },
          {
            id: 3,
            deviceName: "xxx",
            type: "xxx",
            coding: "xxx",
            affiliation: '广东省',
            CauseLoss: '',
            Applicant: '张三',
            applicationTime : '2018-12-19 16:10:40',
          },
          {
            id: 4,
            deviceName: "xxx",
            type: "xxx",
            coding: "xxx",
            affiliation: '广东省',
            CauseLoss: '',
            Applicant: '张三',
            applicationTime : '2018-12-19 16:10:40',
          },
          {
            id: 5,
            deviceName: "xxx",
            type: "xxx",
            coding: "xxx",
            affiliation: '广东省',
            CauseLoss: '',
            Applicant: '张三',
            applicationTime : '2018-12-19 16:10:40',
          },
          {
            id: 6,
            deviceName: "xxx",
            type: "xxx",
            coding: "xxx",
            affiliation: '广东省',
            CauseLoss: '',
            Applicant: '张三',
            applicationTime : '2018-12-19 16:10:40',
          },
          {
            id: 7,
            deviceName: "xxx",
            type: "xxx",
            coding: "xxx",
            affiliation: '广东省',
            CauseLoss: '',
            Applicant: '张三',
            applicationTime : '2018-12-19 16:10:40',
          },
          {
            id: 8,
            deviceName: "xxx",
            type: "xxx",
            coding: "xxx",
            affiliation: '广东省',
            CauseLoss: '',
            Applicant: '张三',
            applicationTime : '2018-12-19 16:10:40',
          },
          {
            id: 9,
            deviceName: "xxx",
            type: "xxx",
            coding: "xxx",
            affiliation: '广东省',
            CauseLoss: '',
            Applicant: '张三',
            applicationTime : '2018-12-19 16:10:40',
          }
        ],
        tableKey: [
          {
            label: "序号",
            value: "id",
            width: "80"
          },
          {
            label: "配件名称",
            value: "deviceName",
            width: ""
          },
          {
            label: "配件型号",
            value: "type",
            width: "100"
          },
          {
            label: "配件编码",
            value: "coding",
            width: ""
          },
          {
            label: "所属机构",
            value: "affiliation",
            width: ""
          },
          {
            label: "损耗原因",
            value: "CauseLoss",
            width: ""
          },
          {
            label: "申请人员",
            value: "Applicant",
            width: ""
          },
          {
            label: "申请时间",
            value: "applicationTime",
            width: ""
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    search(form) {
      console.log("search", form);
    },
    handleClick(row) {
      this.$router.push({
        name: "equipmentDesc",
        query: {
          id: row.id
        }
      });
    },
    selectBtn () {
      console.log(1);
    },
    resume(row) {
      console.log(row);
      this.$router.push({
        name: "equipmentResume"
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize) {
      console.log(pageSize);
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
