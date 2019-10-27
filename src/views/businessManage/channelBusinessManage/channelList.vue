<template>
  <div class="vlt-card">
    <search-bar class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px"
    >
      <control-bar slot="extend-bar" @select="select" :options="controlOptions"></control-bar>
    </search-bar>
    <el-table :data="tableData" border>
      <el-table-column label="序号"  type="index" width="80px"></el-table-column>
      <el-table-column label="渠道编号" prop="channelNo"></el-table-column>
      <el-table-column label="渠道名称" prop="channelName"></el-table-column>
      <el-table-column label="渠道类型" prop="channelType"></el-table-column>
      <el-table-column label="所属机构" prop="insName"></el-table-column>
      <el-table-column label="渠道等级" prop="channelLevel"></el-table-column>
      <el-table-column label="负责人" prop="createBy"></el-table-column>
      <el-table-column label="创建时间" prop="createDate"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="detail(scope.row.channelId, 'game-permission')">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-paging
      position="right"
      :total="999"
      :currentPage="1"
      :pageSize="10"
      @handleSizeChange="changeSize"
      @handleCurrentChange="changeCurrent">
    </table-paging>
  </div>
</template>

<script>
export default {
  name: 'channelList',
  data() {
    return {
      searchOptions: [
        {title: '渠道编号', type: 'input', prop: 'channelNo', value: '', },
        {title: '渠道名称', type: 'input', prop: 'channelName', value: '', },
        { type: 'select', prop: 'selectName', value: '', title: '选择框',
         
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
        {title: '计划日期',type: 'datepicker', prop: 'date1', value: ''},
        {title: '销售日期', type: 'datepicker-range', prop: 'date2', value: ''},
        {title: '计划时间', type: 'datetime', prop: 'date3', value: ''},
        {title: '起止时间', type: 'datetime-range', prop: 'date4', value: ''},
        {title: '所属机构', type: 'cascader', prop: 'cascader1', value: '', options: []},
      ],
      controlOptions: [
        {name: '导出', type: 'primary', icon: 's-promotion'},   
      ],
      tableData: []
    }
  },
  created() {
    let data = {};
    this.getChannelList(data)
  },
  methods: {
    getChannelList(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.getChannelList({data})
				if(res && res.code == 0) {
          console.log(res.data)
          self.tableData = res.data.records;
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    detail(channelId) {
      this.$router.push({path:'./channelDetail',query:{channelId}})
    },
    search(val) {
      console.log(val)
      let data = val;
      this.getChannelList(data)
    },
    select(val) {
      console.log(val)
    },
    changeSize(val) {
      console.log(`每页 ${val} 条`);
    },
    changeCurrent(val) {
      console.log(`当前页: ${val}`);
    },
    add() {
      console.log('a')
    }
  },
  components: {

  },
}
</script>


<style lang="less" scoped>
@import './less/index.less';
</style>
