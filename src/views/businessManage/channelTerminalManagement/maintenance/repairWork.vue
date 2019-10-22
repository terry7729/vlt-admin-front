<!-- 维修工单 -->

<template>
  <div class="vlt-card-child">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    >
    <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions" position="left"></control-bar>
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

        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="primary" size="mini" @click="remind(scope.row)">提醒</el-button>
          </template>
        </el-table-column>
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
  name: "repairWork",
  data() {
   return {
      // 搜索组件配置
      searchOptions: [
        {
          type: "input",
          prop: "inputName",
          value: "",
          title: "维修人员：",
          placeholder: "请输入"
        },
        {
          type: "select",
          prop: "selectName",
          value: "",
          title: "设备名称：",
          placeholder: "请选择",
          options: [
            {
              label: "类型1",
              value: 1
            },
            {
              label: "类型2",
              value: 2
            }
          ]
        },
        // 维修日期：
        {
          type: "select",
          prop: "selectName2",
          value: "",
          title: "工单状态：",
          placeholder: "请选择",
          options: [
            {
              label: "状态1",
              value: 1
            },
            {
              label: "状态2",
              value: 2
            },
            {
              label: "状态3",
              value: 3
            }
          ]
        }
      ],
      controlOptions: [
        { name: "一键提醒", type: "primary", icon: "message-solid" }, // type为按钮的五种颜色， icon为具体的图标
      ],
      tableDatas: {
        tableData: [
          {
            id: 0,
            orderNumber: 'R20180101123',
            hallNumber: '65010117',
            affiliation: 'xxx',
            deviceName: '投注机',
            faultLevel: '一般',
            repairTime: '2018-12-19 16:10:40',
            repairTime2: '2018-12-19 16:10:40',
            maintenanceStaff: '张三',
            orderStarus: '待处理',
          },
          {
            id: 1,
            orderNumber: 'R20180101123',
            hallNumber: '65010117',
            affiliation: 'xxx',
            deviceName: '投注机',
            faultLevel: '一般',
            repairTime: '2018-12-19 16:10:40',
            repairTime2: '2018-12-19 16:10:40',
            maintenanceStaff: '张三',
            orderStarus: '待处理',
          },
          {
            id: 2,
            orderNumber: 'R20180101123',
            hallNumber: '65010117',
            affiliation: 'xxx',
            deviceName: '投注机',
            faultLevel: '一般',
            repairTime: '2018-12-19 16:10:40',
            repairTime2: '2018-12-19 16:10:40',
            maintenanceStaff: '张三',
            orderStarus: '待处理',
          },
          {
            id: 3,
            orderNumber: 'R20180101123',
            hallNumber: '65010117',
            affiliation: 'xxx',
            deviceName: '投注机',
            faultLevel: '一般',
            repairTime: '2018-12-19 16:10:40',
            repairTime2: '2018-12-19 16:10:40',
            maintenanceStaff: '张三',
            orderStarus: '待处理',
          },
          {
            id: 4,
            orderNumber: 'R20180101123',
            hallNumber: '65010117',
            affiliation: 'xxx',
            deviceName: '投注机',
            faultLevel: '一般',
            repairTime: '2018-12-19 16:10:40',
            repairTime2: '2018-12-19 16:10:40',
            maintenanceStaff: '张三',
            orderStarus: '待处理',
          },
          {
            id: 5,
            orderNumber: 'R20180101123',
            hallNumber: '65010117',
            affiliation: 'xxx',
            deviceName: '投注机',
            faultLevel: '一般',
            repairTime: '2018-12-19 16:10:40',
            repairTime2: '2018-12-19 16:10:40',
            maintenanceStaff: '张三',
            orderStarus: '待处理',
          },
          {
            id: 6,
            orderNumber: 'R20180101123',
            hallNumber: '65010117',
            affiliation: 'xxx',
            deviceName: '投注机',
            faultLevel: '一般',
            repairTime: '2018-12-19 16:10:40',
            repairTime2: '2018-12-19 16:10:40',
            maintenanceStaff: '张三',
            orderStarus: '待处理',
          },
          {
            id: 7,
            orderNumber: 'R20180101123',
            hallNumber: '65010117',
            affiliation: 'xxx',
            deviceName: '投注机',
            faultLevel: '一般',
            repairTime: '2018-12-19 16:10:40',
            repairTime2: '2018-12-19 16:10:40',
            maintenanceStaff: '张三',
            orderStarus: '待处理',
          },
          {
            id: 8,
            orderNumber: 'R20180101123',
            hallNumber: '65010117',
            affiliation: 'xxx',
            deviceName: '投注机',
            faultLevel: '一般',
            repairTime: '2018-12-19 16:10:40',
            repairTime2: '2018-12-19 16:10:40',
            maintenanceStaff: '张三',
            orderStarus: '待处理',
          },
          {
            id: 9,
            orderNumber: 'R20180101123',
            hallNumber: '65010117',
            affiliation: 'xxx',
            deviceName: '投注机',
            faultLevel: '一般',
            repairTime: '2018-12-19 16:10:40',
            repairTime2: '2018-12-19 16:10:40',
            maintenanceStaff: '张三',
            orderStarus: '待处理',
          }
        ],
        tableKey: [
          {
            label: "序号",
            value: "id",
            width: "80"
          },
          {
            label: "工单编号",
            value: "orderNumber",
            width: "100"
          },{
            label: "大厅编号",
            value: "hallNumber",
            width: "100"
          },
          {
            label: "所属机构",
            value: "affiliation",
            width: ""
          },
          {
            label: "设备名称",
            value: "deviceName",
            width: ""
          },
          {
            label: "故障级别",
            value: "faultLevel",
            width: ""
          },
          {
            label: "报修时间",
            value: "repairTime",
            width: ""
          },
          {
            label: "维修时间",
            value: "repairTime2",
            width: ""
          },
          {
            label: "维修员",
            value: "maintenanceStaff",
            width: ""
          },
          {
            label: "工单状态",
            value: "orderStarus",
            width: ""
          }
        ]
      }
   }
  },
 components: {
 },
 methods: {
    search(form) {
      console.log("search", form);
    },

    selectBtn(val) {
      console.log(val);
    },
    handleClick(row) {
      this.$router.push({
        name: "repairOrderDetails",
        query: {
          id: row.id
        }
      });
    },
    remind(row) {
      console.log(row);
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
 },
}
</script>

<style lang="less" scoped>
</style>
