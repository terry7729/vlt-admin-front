<template>
  <div class="vlt-card">
    <search-bar class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="getDatas.total"
      labelWidth="80px">
      <control-bar slot="extend-bar" @select="select" :options="options"></control-bar>
    </search-bar> 
    <!-- <el-dropdown @command="exportExcel">
      <el-button  size="small"> <i class="el-icon-s-promotion"></i>  导出</el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command ="now">当页数据</el-dropdown-item>
        <el-dropdown-item command ="all">全部数据</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    <el-table :data="tableData" border>
      <el-table-column label="序号" fixed type="index" width="60px"></el-table-column>
      <el-table-column label="所属机构" prop="insName" min-width="120px"></el-table-column>
      <el-table-column label="新建销售厅" prop="cityNewSellingHall" min-width="120px"></el-table-column>
      <el-table-column label="销售厅投注机" prop="citySellingMachine" min-width="120px"></el-table-column>
      <el-table-column label="市属合作厅" prop="cityCooperationHall" min-width="120px"></el-table-column>
      <el-table-column label="市属合作厅投注机" prop="cityCooperationMachine" min-width="120px"></el-table-column>
      <el-table-column label="发展预算（亿）" prop="developBudget" min-width="120px"></el-table-column>
      <el-table-column label="状态" prop="status" min-width="120px"></el-table-column>
      <el-table-column label="操作" fixed="right" min-width="100">
        <template slot-scope="scope">
          <el-button type="primary"  v-if="scope.row.id !=0" size="mini" @click="detail(scope.row, 'developmentPlanCityDetail')">查看</el-button>
          <!-- <el-button size="mini" @click="detail(scope.row, 'game-permission')">编辑</el-button> -->
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
  </div>
</template>

<script type="text/javascript">
import moment from 'moment'
export default {
  name: "developmentPlanCity",
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
                  label: "湖南",
                  children: [
                    {
                      value: "61",
                      label: "长沙市"
                    }
                  ]
                }
              ]
            }]},
      ],
      options: [
        {name: '导出当页数据', type: 'primary', icon: 's-promotion'}, 
        {name: '导出全部数据', type: '', icon: 's-promotion'}
      ],
      tableData: [
        {gameId:'12',gameName: 'a',cycleType: 0,gameTypeName:'奖组型',status:'已通过'}
      ],
      requestOptions: {
        page: 1,
        pageSize: 10,
        param: {
          all: false,
          id: 0,
          insId: "",
          insLevel: "2",
          planDate: new Date().getFullYear()
        }
      },
      status: ['计划中','已通过'],
      outData: {},
      getDatas: {}
    }
  },
  created() {
    // 搜索里面只查询该用户市级机构
    const fullYear = new Date().getFullYear();
    this.requestOptions.param.insId = '61';
    this.requestOptions.param.planDate = fullYear;
    
    this.getCityPlanList(this.requestOptions)
  },
  methods: {
    select(val) {
      if (val.name == '导出当页数据') {
        this.exportExcel('now');
      } else if (val.name == '导出全部数据') {
        this.exportExcel('all');
      }
    },
    search(form) {
      // 请求数据修改格式
       if(form.planDate) {
        form.planDate = moment(form.planDate).format("YYYY")
      }
      this.requestOptions.param = Object.assign(this.requestOptions.param, form);
      this.requestOptions.param.insId = '61';
       console.log(this.requestOptions);
      this.getCityPlanList(this.requestOptions)
    },
    getCityPlanList(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.getCityPlanList({data})
				if(res && res.code == 0) {
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
      })(data)
    },
    //  导出年度发展计划市级信息

// 

 async exportExcel(val) {
        // console.log(val);
      if (val == 'now') {
        console.log('导出当前数据');
        // planDate 和机构 insId 都是通过筛选出来的 默认 为当前年份和机构 后续更改 
        this.outData = {
          page: this.getDatas.current,
          pageSize: this.getDatas.size,
          param: {
            all: false,
            insId: "61",
            insLevel: "2",
            planDate: '2019'
          }
        }
      } else if (val == 'all'){
        this.outData = {
          page: 0,
          pageSize: 0,
          param: {
            all: true,
            insId: "61",
            insLevel: "2",
            planDate: '2019'
          }
        }
      }

      const data = JSON.parse(JSON.stringify(this.outData));
      let result = await this.$api.exportCityDevelopPlanList({
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
    changeForm(val) {
      console.log(val);
    },
    detail (row, name) {
      this.$router.push({
        name: name,
        query: {
          id: row.id
        }
      })
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
}
</script>

<style lang="less" scoped>
@import './less/index.less';
</style>
