<template>
  <div class="vlt-card">
    <div class="search">
      <search-Bar :options="option"></search-Bar>
      <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
    </div>
    <div class="el_table">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column prop="id" label="序号" width="100"></el-table-column>
        <el-table-column prop="holidayName" label="假日名称" width="100"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" sortable></el-table-column>
        <el-table-column prop="endTime" label="结束时间" sortable></el-table-column>
        <el-table-column prop="abandonstartTime" label="弃奖开始日期" sortable width="110"></el-table-column>
        <el-table-column prop="abandonendTime" label="弃奖结束日期 " sortable width="110"></el-table-column>

        <el-table-column label="销售状态">
          <template>
            <el-switch
              style="display: block"
              v-model="value2"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="停销"
              inactive-text="不停销"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="启用状态">
          <template>
            <el-switch v-model="value1" active-text="已启用" inactive-text="已停用"></el-switch>
          </template>
        </el-table-column>
      </el-table>
      <table-paging :total="total"></table-paging>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      value1: true,
      value2: true,
      option: [
        {
          title: "假日名称",
          prop: "select",
          type: "select",
          options: [
            {
              value: "beijing",
              label: "春节"
            },
            {
              value: "shanghai",
              label: "国庆"
            },
            {
              value: "beijing",
              label: "中秋"
            },
            {
              value: "beijing",
              label: "清明"
            },
            {
              value: "beijing",
              label: "端午"
            }
          ],
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        }
      ],
      controlOptions: [
        { name: "新增", type: "primary", icon: "plus" },
        { name: "保存", type: "success" }
      ],
      tableData: [
        {
          id: 1,
          holidayName: "春节",
          startTime: "2019-10-11 10:0:0",
          endTime: "2019-10-15 12:0:0",
          abandonstartTime: "2019-10-12",
          abandonendTime: "2019-10-15"
        },
        {
          id: 2,
          holidayName: "端午",
          startTime: "2019-10-12 10:0:0",
          endTime: "2019-10-15 12:0:0",
          abandonstartTime: "2019-10-12",
          abandonendTime: "2019-10-15"
        },
        {
          id: 3,
          holidayName: "中秋",
          startTime: "2019-10-13 10:0:0",
          endTime: "2019-10-15 12:0:0",
          abandonstartTime: "2019-10-12",
          abandonendTime: "2019-10-15"
        },
        {
          id: 4,
          holidayName: "国庆",
          startTime: "2019-10-14 10:0:0",
          endTime: "2019-10-15 12:0:0",
          abandonstartTime: "2019-10-12",
          abandonendTime: "2019-10-15"
        },
        {
          id: 5,
          holidayName: "清明",
          startTime: "2019-10-15 10:0:0",
          endTime: "2019-10-15 12:0:0",
          abandonstartTime: "2019-10-12",
          abandonendTime: "2019-10-15"
        }
      ],
      total: 400
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>

