<template>
  <div class="vlt-card">
    <!-- <search-bar class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px">
      <control-bar slot="extend-bar" @select="select" :options="options"></control-bar>
    </search-bar> -->
    <control-bar slot="extend-bar" @select="select" :options="options"></control-bar>

    <el-dropdown @command="exportExcel">
      <el-button  size="small"> <i class="el-icon-s-promotion"></i>导出</el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command ="now">当页数据</el-dropdown-item>
        <el-dropdown-item command ="all">全部数据</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-table :data="tableData" border>
      <el-table-column label="序号" fixed type="index" width="60px"></el-table-column>
      <el-table-column label="计划年份" prop="planDate" min-width="160px"></el-table-column>
      <el-table-column label="新建销售厅" prop="cityNewSellingHall" min-width="140px"></el-table-column>
      <el-table-column label="销售厅投注机" prop="citySellingMachine" min-width="140px"></el-table-column>
      <!-- 如果查询的是市属数据，那就隐藏下边两调省属数据 -->
      <el-table-column label="省属合作厅" prop="provinceCooperationHall" min-width="140px"></el-table-column>
      <el-table-column label="省属合作厅投注机" prop="provinceSellingMachine" min-width="140px"></el-table-column>
     <!--  -->
     <el-table-column label="市属合作厅" prop="cityCooperationHall" min-width="140px"></el-table-column>
      <el-table-column label="市属合作厅投注机" prop="citySellingMachine" min-width="140px"></el-table-column>
      <el-table-column label="发展预算（亿）" prop="developBudget" min-width="140px"></el-table-column>
      <el-table-column label="状态" prop="status" min-width="140px"></el-table-column>
      <el-table-column label="操作" fixed="right" min-width="140px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="detail(scope.row, 'developmentPlanDetail')">查看</el-button>
          <el-button size="mini" @click="edit(scope.row, 'developmentPlanEdit')">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/javascript">
import { async } from 'q';

export default {
  name: "",
  data() {
    return {
      searchOptions: [
        {type: 'datetime-range', prop: 'date4', value: '', title: '日期时间', placeholder: ['开始时间', '结束时间']},
        {title: '状态', type: 'select', prop: 'status', value: '', options: [{label:'计划中',value:'1'},{label:'已通过',value:'2'},{label:'未通过',value:'3'}]},
      ],
      options: [
        {name: '新建发展计划', type: 'primary', icon: 'plus'},  // type为按钮的五种颜色， icon为具体的图标
     
      ],
      tableData: [],
      status: ['计划中','已通过'],
      outData: {},
      getDatas: {}
    }
  },
  created() {
    let data = {
      page: 1,
      pageSize: 10,
      param: {
        insId: "60",
        insLevel: "1" // 1为省级 2为市级
      }
    };
    // 用户所在机构
    if(true) {
      // 省级用户 调省查市接口
      // 市级数据 不能输入
    }else{
      // 市级用户
      // 只需要市级数据  省级不用
    }
    this.getDevelopPlanList(data)
  },
  methods: {
    search(data) {
      this.getDevelopPlanList(data)
    },
    getDevelopPlanList(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.getDevelopPlanList({data})
				if(res && res.code == 0) {
          if (res.data != null) {
            self.getDatas = res.data;
            self.tableData = res.data.records.map(item => {
              item.status = self.status[item.status]
              return item;
            })
            console.log(self.getDatas);
          }
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },




    select(val) {
      if(val.name=='新建发展计划') {
        this.$router.push({name:'developmentPlanCreate',query:{id:123}})
      }
    },

    // handleCommand (command) {
    //   console.log(command);
    // },
    // 导出年度发展计划信息
    async exportExcel(val) {
        // console.log(val);
      if (val == 'now') {
        console.log('导出当前数据');
        this.outData = {
          page: this.getDatas.current,
          pageSize: this.getDatas.size,
          param: {
            all: false,
            insId: "60",
            insLevel: "1" 
          }
        }
      } else if (val == 'all'){
        this.outData = {
          page: 0,
          pageSize: 0,
          param: {
            all: true,
            insId: "60",
            insLevel: "1" 
          }
        }
      }

      const data = JSON.parse(JSON.stringify(this.outData));
      let result = await this.$api.exportDevelopPlanList({
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
          id: row.id,
          insLevel: 2 // 此数据是省市属的参数 需要根据用户获取， 目前是定值
        }
      })
    },
    edit  (row, name) {
      this.$router.push({
        name: name,
        query: {
          id: row.id,
          insLevel: 2 // 此数据是省市属的参数 需要根据用户获取， 目前是定值
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
</style>
