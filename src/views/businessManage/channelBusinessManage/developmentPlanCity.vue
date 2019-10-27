<template>
  <div class="vlt-card">
    <search-bar class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px">
      <control-bar slot="extend-bar" @select="select" :options="options"></control-bar>
    </search-bar>
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
        {name: '导出', type: '', icon: 's-promotion'},  // type为按钮的五种颜色， icon为具体的图标
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
          planDate: "2019"
        }
      },
      status: ['计划中','已通过'],
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
    select() {

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
    }
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
</style>
