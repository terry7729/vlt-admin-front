<template>
  <div class="vlt-card">
    <div class="search">
      <!-- <search-Bar :options="option"></search-Bar> -->
      <search-Bar :options="option" :total="9">
        <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
      </search-Bar>
    </div>
    <div class="el_table">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="序号" width="100"></el-table-column>
        <el-table-column prop="sort" label="所属类别 "></el-table-column>
        <el-table-column prop="processname" label="流程名称"></el-table-column>
        <el-table-column prop="date" label="发布时间"></el-table-column>
        <el-table-column prop="note" label="备注描述" width="260"></el-table-column>

        <el-table-column label="账户">
          <template>
            <div>
              <el-button type="primary" size="mini">启动</el-button>

              <el-button type="danger" size="mini">禁止</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="detail(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      option: [
        {
          title: "流程名称",
          prop: "user",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },
        {
          title: "所属类别",
          prop: "select",
          type: "select",
          options: [
            {
              value: "beijing",
              label: "北京"
            },
            {
              value: "shanghai",
              label: "上海"
            }
          ],
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        }
      ],
      controlOptions: [
        //按钮组
        { name: "新建流程", type: "primary", icon: "plus" } // type为按钮的五种颜色， icon为具体的图标
      ],
      tableData: [
        {
          id: 1,
          sort: "游戏发行",
          processname: "游戏发行A发行申请",
          date: "2019-10-12 10:0:0",
          note: "视频游戏A上市发行计划申请流程"
        },
        {
          id: 2,
          sort: "游戏发行",
          processname: "游戏发行A发行申请",
          date: "2019-10-12 10:0:0",
          note: "视频游戏A上市发行计划申请流程"
        },
        {
          id: 3,
          sort: "游戏发行",
          processname: "游戏发行A发行申请",
          date: "2019-10-12 10:0:0",
          note: "视频游戏A上市发行计划申请流程"
        },
        {
          id: 4,
          sort: "游戏发行",
          processname: "游戏发行A发行申请",
          date: "2019-10-12 10:0:0",
          note: "视频游戏A上市发行计划申请流程"
        },
        {
          id: 5,
          sort: "游戏发行",
          processname: "游戏发行A发行申请",
          date: "2019-10-12 10:0:0",
          note: "视频游戏A上市发行计划申请流程"
        }
      ]
    };
  },
  components: {},
  methods: {
    detail(id) {
      this.$router.push({
        path: "processSet/processSetDetail"
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
