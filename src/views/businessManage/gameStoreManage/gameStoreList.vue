<template>
  <div class="vlt-card game-store-list">
    <search-bar class="search-bar-demo"
        @search="search"
        :options="searchOptions"
        :total="999"
        labelWidth="100px"
      >
    </search-bar>
    
    <el-table
    border
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" fixed="left"></el-table-column>
      <el-table-column label="序号" type="index" width="55"></el-table-column>
      <el-table-column prop="id" label="游戏ID" ></el-table-column>
      <el-table-column prop="name" label="游戏名称"></el-table-column>
      <el-table-column prop="type" label="游戏类型"></el-table-column>
      <el-table-column prop="pond" label="奖池类型"></el-table-column>
      <el-table-column prop="versions" label="游戏版本"></el-table-column>
      <el-table-column prop="icon" label="游戏图标"></el-table-column>
      <el-table-column prop="developer" label="游戏开发商"></el-table-column>
      <el-table-column prop="time" label="最近更新时间"></el-table-column>
      <el-table-column prop="state" label="游戏状态"></el-table-column>

      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-prevent="2000" @click.native="detail(scope.row.id)">查看</el-button>
          <el-button  size="mini" v-prevent="2000" @click.native="edit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :hide-on-single-page="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total,prev, pager, next, sizes,jumper"
      :total="100" background>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'gameStoreManage',
  data() {
    return {
      tableData: [
        {
          id:"01",
          name: '开心一刻',
          type:'概率型',
          pond:"单奖池",
          versions:"1.0.1",
          icon:"",
          developer:"中彩",
          time:"2019-09-12 09:00:00",
          state:"试玩",
        },
        {
          id:"01",
          name: '开心一刻',
          type:'概率型',
          pond:"单奖池",
          versions:"1.0.1",
          icon:"",
          developer:"中彩",
          time:"2019-09-12 09:00:00",
          state:"试玩",
        },
        {
          id:"01",
          name: '开心一刻',
          type:'概率型',
          pond:"单奖池",
          versions:"1.0.1",
          icon:"",
          developer:"中彩",
          time:"2019-09-12 09:00:00",
          state:"试玩",
        },
        {
          id:"01",
          name: '开心一刻',
          type:'概率型',
          pond:"单奖池",
          versions:"1.0.1",
          icon:"",
          developer:"中彩",
          time:"2019-09-12 09:00:00",
          state:"试玩",
        },
        {
          id:"01",
          name: '开心一刻',
          type:'概率型',
          pond:"单奖池",
          versions:"1.0.1",
          icon:"",
          developer:"中彩",
          time:"2019-09-12 09:00:00",
          state:"试玩",
        },
        {
          id:"01",
          name: '开心一刻',
          type:'概率型',
          pond:"单奖池",
          versions:"1.0.1",
          icon:"",
          developer:"中彩",
          time:"2019-09-12 09:00:00",
          state:"试玩",
        },
        {
          id:"01",
          name: '开心一刻',
          type:'概率型',
          pond:"单奖池",
          versions:"1.0.1",
          icon:"",
          developer:"中彩",
          time:"2019-09-12 09:00:00",
          state:"试玩",
        },{
          id:"01",
          name: '开心一刻',
          type:'概率型',
          pond:"单奖池",
          versions:"1.0.1",
          icon:"",
          developer:"中彩",
          time:"2019-09-12 09:00:00",
          state:"试玩",
        }
        ],
        multipleSelection: [],
        totalCount:0,
        ruleForm: {
          page: 1,
          limit: 10
        },
        searchOptions:[
        {type: 'input', prop: 'inputName', value: '', title: '游戏ID', placeholder: '请输入'},
        {type: 'input', prop: 'inputName2', value: '', title: '游戏名称', placeholder: '请输入'},
        {
          type: 'select', prop: 'selectName', value: '', title: '游戏类型', placeholder: '请选择',
          options: [
            {
              label: '选项1',
              value: 1
            },
            {
              label: '选项2',
              value: 2
            }
          ]
        },
        {
          type: 'select', prop: 'selectName2', value: '', title: '游戏状态', placeholder: '请选择',
          options: [
            {
              label: '选项1',
              value: 1
            },
            {
              label: '选项2',
              value: 2
            }
          ]
        },
        {
          type: 'select', prop: 'selectName3', value: '', title: '奖池类型', placeholder: '请选择',
          options: [
            {
              label: '选项1',
              value: 1
            },
            {
              label: '选项2',
              value: 2
            }
          ]
        },
        {type: 'datepicker-range', prop: 'date2', value: '', title: '最近更新时间', placeholder: ['开始日期', '结束日期']},
          
        ],
        currentPage: 1
      }
    
  },
  methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //查看页面跳转
      detail (id) {
        this.$router.push({
          name: 'storeCheck',
          query: {id}
        })
      },
      edit (id) {
        this.$router.push({
          name: 'storeEdit',
          query: {id}
        })
      },
      search(form) {
      console.log('search', form)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  computed: {

  },
  created() {
  
  },
  mounted() {
    
  },
  components: {

  }
}
</script>


<style lang="less">
@import './less/index.less';
</style>
