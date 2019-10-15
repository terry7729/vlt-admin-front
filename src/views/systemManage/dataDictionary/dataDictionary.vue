<template>
  <div class="vlt-card">
    <div class="search">
      <search-Bar :options="option"></search-Bar>
    </div>
    <div class="addlist">
      <el-button type="primary" icon="el-icon-plus" @click="edit()">新建流程</el-button>
    </div>
    <div>
      <tips-line>共搜索到8项数据</tips-line>
    </div>
    <div class="el_table">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="序号" width="100"></el-table-column>
        <el-table-column prop="classes" label="所属类别 "></el-table-column>
        <el-table-column prop="dictionaryname" label="字典名称"></el-table-column>
        <el-table-column prop="dictionarydata" label="字典数据值"></el-table-column>
        <el-table-column prop="sort" label="排序字段" ></el-table-column>
        <el-table-column prop="creater" label="创建人 "></el-table-column>
        <el-table-column prop="createrdate" label="创建时间 "></el-table-column>
        <el-table-column label="状态  ">
          <template>            <div>
              <el-button type="primary" size="mini">启动</el-button>

              <el-button type="danger" size="mini">禁止</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <table-paging></table-paging>
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
          title: "用户名称",
          prop: "user",
          type: "input",
          value: "",
          placeholder: "请输入" || ["请输入1", "请输入2"]
        },

        {
          title: "用户名称",
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
      tableData: [
        {
          id: 1,
          classes: "游戏类型",
          dictionaryname: "主动型",
          dictionarydata:"active",
          sort:"1",
          creater:"admin",
          createrdate: "2019-10-12 10:0:0",  
        },
        {
          id: 2,
          classes: "游戏类型",
          dictionaryname: "主动型",
          dictionarydata:"active",
          sort:"1",
          creater:"admin",
          createrdate: "2019-10-12 10:0:0",  
        },
        {
          id: 3,
          classes: "游戏类型",
          dictionaryname: "主动型",
          dictionarydata:"active",
          sort:"1",
          creater:"admin",
          createrdate: "2019-10-12 10:0:0",  
        },
        {
          id: 4,
          classes: "游戏类型",
          dictionaryname: "主动型",
          dictionarydata:"active",
          sort:"1",
          creater:"admin",
          createrdate: "2019-10-12 10:0:0",  
        },
        {
          id: 5,
          classes: "游戏类型",
          dictionaryname: "主动型",
          dictionarydata:"active",
          sort:"1",
          creater:"admin",
          createrdate: "2019-10-12 10:0:0",  
        },
        {
          id: 6,
          classes: "游戏类型",
          dictionaryname: "主动型",
          dictionarydata:"active",
          sort:"1",
          creater:"admin",
          createrdate: "2019-10-12 10:0:0",  
        }
      ]
    };
  },
  components: {},
  methods: {
    edit(id) {
      this.$router.push({
        path: "dataDictionary/dataDictionaryEdit",
        query:{id}
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
