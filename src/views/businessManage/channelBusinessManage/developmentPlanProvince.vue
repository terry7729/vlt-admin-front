<template>
  <div class="vlt-card plan-list">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="getDatas.total"
      labelWidth="80px"
    >
      <control-bar slot="extend-bar" @select="select" :options="controlOptions"></control-bar>
    </search-bar>
    <!-- <el-dropdown @command="exportExcel" class="plan-export-btn">
      <el-button  size="small"> <i class="el-icon-s-promotion"></i>导出</el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command ="now">当页数据</el-dropdown-item>
        <el-dropdown-item command ="all">全部数据</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    <el-table :data="tableData" border>
      <el-table-column label="序号" fixed type="index" width="60px"></el-table-column>
      <el-table-column label="所属机构" prop="insName" min-width="120px"></el-table-column>
      <el-table-column label="新建销售厅" prop="provinceNewSellingHall" min-width="120px"></el-table-column>
      <el-table-column label="销售厅投注机" prop="provinceSellingMachine" min-width="120px"></el-table-column>
      <el-table-column label="省属合作厅" prop="provinceCooperationHall" min-width="120px"></el-table-column>
      <el-table-column label="省属合作厅投注机" prop="provinceCooperationMachine" min-width="120px"></el-table-column>
      <el-table-column label="市属合作厅" prop="cityCooperationHall" min-width="120px"></el-table-column>
      <el-table-column label="市属合作厅投注机" prop="cityCooperationMachine" min-width="120px"></el-table-column>
      <el-table-column label="发展预算" prop="developBudget" min-width="120px"></el-table-column>
      <el-table-column label="状态" prop="status" min-width="100px"></el-table-column>
      <el-table-column label="操作" fixed="right" min-width="140px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.id !=0" size="mini" @click="detail(scope.row, 'developmentPlanProvinceDetail')">查看</el-button>
          <el-button size="mini" v-if="scope.row.id !=0"  @click="approval(scope.row, 'game-permission')">审批</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-paging
      position="right"
      :total="getDatas.total"
      :currentPage="getDatas.current"
      :pageSize="getDatas.size"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange">
    </table-paging>
    <approval-dialog :showDia="approvalData"></approval-dialog>
  </div>
</template>

<script type="text/javascript">
import moment from 'moment'
import approvalDialog from '@/views/businessManage/channelBusinessManage/approvalDialog.vue'
export default {
  name: "",
  data() {
    return {
      searchOptions: [
         {title: '计划年份', type: 'datepicker', prop: 'planDate', dateType:'year', value: ''},
        {
          type: "cascader",
          prop: "insId",
          value: "61",
          title: "所属机构",
          options: [
            {
              value: "1",
              label: "中福彩",
              children: [
                {
                  value: "60",
                  label: "湖南"
                }
              ]
            }]},
      ],
      controlOptions: [
         {name: '导出当页数据', type: 'primary', icon: 's-promotion'}, 
        {name: '导出全部数据', type: '', icon: 's-promotion'}
      ],
      tableData: [
        {
          gameId: "12",
          gameName: "a",
          cycleType: 0,
          gameTypeName: "奖组型",
          status: "已通过"
        }
      ],
      options: {
        page: 1,
        pageSize: 10,
        param: {
          all: false,
          id: 0,
          insId: "",
          insLevel: '1',
          planDate: "2019"
        }
      },
      status: ['计划中','已通过'],
      approvalData: {
        showApproval: false
      },
      outData: {},
      getDatas: {}
    };
  },
  created() {
    // 根据stoage里边存储的个人数据 拿到用户的insId，然后根据id获取到他的下一级的机构信息
    // console.log(storage.get());
    const fullYear = new Date().getFullYear();
    this.options.param.planDate = fullYear;
    // 搜索里面只查询两级 中心到省级机构
    this.getProvincePlanList(this.options);
  },
  methods: {
    search(form) {
      // 请求数据修改格式
       if(form.planDate) {
        form.planDate = moment(form.planDate).format("YYYY")
      }
  
      this.options.param = Object.assign(this.options.param, form);
      this.options.param.insId = '60';
      //  console.log(this.options);
      this.getProvincePlanList(this.options);
    },
    select(val) {
      if (val.name == '导出当页数据') {
        this.exportExcel('now');
      } else if (val.name == '导出全部数据') {
        this.exportExcel('all');
      }
    },
    getProvincePlanList(data) {
      const self = this;
      (async data => {
        console.log(data);
        let res = await self.$api.getProvincePlanList({ data });
        // console.log("ssssss", res);
        if (res && res.code == 0) {
            self.getDatas = res.data;
          if (res.data.records && res.data.records.length > 0) {
            console.log(res);
              self.tableData = res.data.records.map(item => {
                item.status = self.status[item.status]
                return item;
              })
          } else {
            self.tableData = []
          }
        } else {
          // self.$message.warning(res.msg)
        }
      })(data);
    },
    // 导出年度发展计划 省级信息

// exportProvinceDevelopPlanList
  // 导出年度发展计划信息
    async exportExcel(val) {
        // console.log(val);
      if (val == 'now') {
        console.log('导出当前数据');
        // planDate 和机构 insId 都是通过筛选出来的 默认 为当前页
        this.outData = {
          page: this.getDatas.current,
          pageSize: this.getDatas.size,
          param: {
            all: false,
            insId: "60",
            insLevel: "1",
            planDate: '2019'
          }
        }
      } else if (val == 'all'){
        this.outData = {
          page: 0,
          pageSize: 0,
          param: {
            all: true,
            insId: "60",
            insLevel: "1" ,
            planDate: '2019'
          }
        }
      }

      const data = JSON.parse(JSON.stringify(this.outData));
      let result = await this.$api.exportProvinceDevelopPlanList({
        data,
        responseType: 'blob'
      });
      var blob = new Blob([result], {
        type: "application/vnd.ms-excel;charset=utf-8"
      });
      var url = window.URL.createObjectURL(blob);
      var aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = url;
      aLink.setAttribute("download", "年度发展计划列表.xls");
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink); //下载完成移除元素
      window.URL.revokeObjectURL(url); //释放掉blob对象
      //console.log("res", result);
    },
    detail (row, name) {
      this.$router.push({
        name: name,
        query: {
          id: row.id
        }
      })
    },
    approval (row, name) {
      console.log(row, name);
      this.approvalData = {
        showApproval: true,
        id: row.id
      } 
    },
    handleSizeChange(val) {
      this.options.pageSize = val
      this.getDevelopPlanList(this.options)
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.options.page = val
      this.getDevelopPlanList(this.options)
      console.log(`当前页: ${val}`);
    },
  },
  components: {
    'approval-dialog': approvalDialog
  }
};
</script>

<style lang="less" scoped>
@import "./less/index.less";
</style>
