<template>
  <div class="vlt-card">
    <search-bar class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="params.total"
      labelWidth="80px"
    >
      <control-bar slot="extend-bar" @select="select" :options="controlOptions"></control-bar>
    </search-bar>
    <el-table :data="tableData" border>
      <el-table-column label="序号" fixed type="index" width="55px"></el-table-column>
      <el-table-column label="渠道编号" prop="channelNo"></el-table-column>
      <el-table-column label="渠道名称" prop="channelName"></el-table-column>
      <el-table-column label="渠道类型" prop="channelType">
        <template slot-scope="scope">
          {{scope.row.channelType==0?'自营厅':'合作厅'}}
        </template>
      </el-table-column>
      <el-table-column label="所属机构" prop="insName"></el-table-column>
      <el-table-column label="渠道等级" prop="channelLevel"></el-table-column>
      <el-table-column label="负责人" prop="accountName"></el-table-column>
      <el-table-column label="联系电话" prop="phone"></el-table-column>
      <el-table-column label="创建时间" prop="createTime" min-width="160px"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="detail(scope.row.channelId, 'game-permission')">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-paging
      position="right"
      :total="params.total"
      :currentPage="params.current "
      :pageSize="params.size"
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
        {title: '渠道类型', type: 'select', prop: 'channelType', value: '', options: [{label: '自营厅',value: 0},{label: '合作厅',value: 1}]},
        {title: '渠道等级', type: 'select', prop: 'channelLevel', value: '', options: [{label: '自营厅',value: 0},{label: '合作厅',value: 1}]},
        {title: '负责人', type: 'input', prop: 'accountName', value: '', },
        {title: '联系电话', type: 'input', prop: 'phone', value: '', },
        {title: '起止时间', type: 'datetime-range', prop: 'date4', value: ''},
      ],
      controlOptions: [
        {name: '导出', type: 'primary', icon: 's-promotion'},   
      ],
      tableData: [],
      params: {
        total: 0,
        size: 10,
        current: 1
      }
    }
  },
  created() {
    let data = {};
    this.getChannelList(data)
  },
  methods: {
    // 导出列表
    async exportExcel() {
      const res = await this.$api.exportChannelExcel({
        data: {
          page: 1,
          pageSize: 10,
          all: false,
          status: 1,
          documentNumber: "",
          documentToppic: ""
        },
        responseType: "blob"
      });
      var blob = new Blob([res], {
        type: "application/vnd.ms-excel;charset=utf-8"
      });
      var url = window.URL.createObjectURL(blob);
      var aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = url;
      aLink.setAttribute("download", "渠道信息.xls");
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink); //下载完成移除元素
      window.URL.revokeObjectURL(url); //释放掉blob对象
      console.log(res);
    },
    getChannelList(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.getChannelList({data})
				if(res && res.code == 0) {
          console.log(res.data)
          self.params.total = res.data.total;
          self.params.size = res.data.size;
          self.params.current = res.data.current;
          self.tableData = res.data.records;
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    detail(channelId) {
      this.$router.push({path:'./channelDetail',query:{channelId}})
    },
    search(param) {
      console.log(val)
      this.params.size = 10;
      this.params.current = 1;
      this.params.param = param;
      this.getChannelList(data)
    },
    select(val) {
      this.exportExcel();
      console.log(val)
    },
    changeSize(val) {
      console.log(`每页 ${val} 条`);
      this.params.size = val;
      this.getChannelList(data)
    },
    changeCurrent(val) {
      console.log(`当前页: ${val}`);
      this.params.current = val;
      this.getChannelList(data)
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
