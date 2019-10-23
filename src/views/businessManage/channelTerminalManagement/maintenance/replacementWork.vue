<!-- 置换工单 -->
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

        <el-table-column fixed="right" label="关联维修单" width="120" >
          <template slot-scope="scope">
            <el-link :underline="false" @click="handleClick(scope.row)">{{scope.row.repairOrder}}</el-link>
            <!-- <el-button type="primary" size="mini" @click="handleClick(scope.row)">{{scope.row.repairOrder}}</el-button> -->
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
            itemCategory: "设备",
            itemName: "投注机",
            itemModel: "xxx",
            originalItemCode: "xxx",
            replacementItemCode: "xxx",
            repairTime: "2018-12-19 16:10:40",
            repairOrder: 'R20181212'
          },
          {
            id: 1,
            itemCategory: "设备",
            itemName: "投注机",
            itemModel: "xxx",
            originalItemCode: "xxx",
            replacementItemCode: "xxx",
            repairTime: "2018-12-19 16:10:40",
            repairOrder: 'R2018123'
          },
          {
            id: 2,
            itemCategory: "设备",
            itemName: "投注机",
            itemModel: "xxx",
            originalItemCode: "xxx",
            replacementItemCode: "xxx",
            repairTime: "2018-12-19 16:10:40",
            repairOrder: 'R2018122212'
          },
          {
            id: 3,
            itemCategory: "设备",
            itemName: "投注机",
            itemModel: "xxx",
            originalItemCode: "xxx",
            replacementItemCode: "xxx",
            repairTime: "2018-12-19 16:10:40",
            repairOrder: 'R201814212'
          },
          {
            id: 4,
            itemCategory: "设备",
            itemName: "投注机",
            itemModel: "xxx",
            originalItemCode: "xxx",
            replacementItemCode: "xxx",
            repairTime: "2018-12-19 16:10:40",
            repairOrder: 'R20181212'
          },
          {
            id: 5,
            itemCategory: "设备",
            itemName: "投注机",
            itemModel: "xxx",
            originalItemCode: "xxx",
            replacementItemCode: "xxx",
            repairTime: "2018-12-19 16:10:40",
            repairOrder: 'R20181212'
          },
          {
            id: 6,
            itemCategory: "设备",
            itemName: "投注机",
            itemModel: "xxx",
            originalItemCode: "xxx",
            replacementItemCode: "xxx",
            repairTime: "2018-12-19 16:10:40",
            repairOrder: 'R20181212'
          },
          {
            id: 7,
            itemCategory: "设备",
            itemName: "投注机",
            itemModel: "xxx",
            originalItemCode: "xxx",
            replacementItemCode: "xxx",
            repairTime: "2018-12-19 16:10:40",
            repairOrder: 'R20181212'
          },
          {
            id: 8,
            itemCategory: "设备",
            itemName: "投注机",
            itemModel: "xxx",
            originalItemCode: "xxx",
            replacementItemCode: "xxx",
            repairTime: "2018-12-19 16:10:40",
            repairOrder: 'R20181212'
          },
          {
            id: 9,
            itemCategory: "设备",
            itemName: "投注机",
            itemModel: "xxx",
            originalItemCode: "xxx",
            replacementItemCode: "xxx",
            repairTime: "2018-12-19 16:10:40",
            repairOrder: 'R20181212'
          }
        ],
        tableKey: [
          {
            label: "序号",
            value: "id",
            width: "80"
          },
          {
            label: "物品类别",
            value: "itemCategory",
            width: "100"
          },{
            label: "物品名称",
            value: "itemName",
            width: "100"
          },
          {
            label: "物品型号",
            value: "itemModel",
            width: ""
          },
          {
            label: "原物品编码",
            value: "originalItemCode",
            width: ""
          },
          {
            label: "更换后物品编码",
            value: "replacementItemCode",
            width: ""
          },
          {
            label: "维修时间",
            value: "repairTime",
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
