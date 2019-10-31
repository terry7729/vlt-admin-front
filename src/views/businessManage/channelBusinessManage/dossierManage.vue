<template>
  <div class="vlt-card">
    <search-bar class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="80px">
    </search-bar>
    <test-form  :formData="baseData" ref="baseForm" :rules="rules" direction="right" v-model="changeForm"></test-form>
    <el-table :data="tableData" border>
      <el-table-column label="序号" fixed type="index" width="60px"></el-table-column>
      <el-table-column label="业务标题" prop="gameId" min-width="160px"></el-table-column>
      <el-table-column label="业务类型" prop="gameName" min-width="140px"></el-table-column>
      <el-table-column label="归档状态" prop="gameCode" min-width="140px"></el-table-column>
      <el-table-column label="发起人" prop="cycleType" min-width="140px"></el-table-column>
      <el-table-column label="发起时间" prop="gameTypeName" min-width="160px"></el-table-column>
      <el-table-column label="完成时间" prop="gameTypeName" min-width="160px"></el-table-column>
      <el-table-column label="是否查看" prop="status" min-width="140px"></el-table-column>
      <el-table-column label="操作" fixed="right" min-width="140px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="detail(scope.row, 'game-permission')">查看</el-button>
          <el-button size="mini" @click="detail(scope.row, 'game-permission')">分发</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/javascript">
import TestForm from '@/components/common/testForm.vue'

export default {
  name: "",
  data() {
    return {
      searchOptions: [
        {title: '业务标题', type: 'input', prop: 'date4', value: ''},
        {title: '业务类型', type: 'select', prop: 'status', value: '', options: [{label:'计划中',value:'1'},{label:'已通过',value:'2'},{label:'未通过',value:'3'}]},
      ],
      tableData: [
        {gameId:'标题',gameName: 'a',cycleType: '李明',gameTypeName:'2019-09-12 09：00：00',status:'计划中'}
      ],
      baseData: [
        {title: '上市游戏', type: 'select',  prop: 'a', value: '', options:[{label:'苹果',value:1},{label:'香蕉',value:2}]},
        {title: '销售区域', type: 'cascader',  prop: 'b', value: '', options: [],
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            // multiple: true, // 多选
            checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
          }
        },
        {title: '状态', type: 'select',  prop: 'c', value: '', options:[{label:'启用',value:1},{label:'禁用',value:2}]},
        {title: '姓名', type: 'input',  prop: 'd', value: '', options:[{label:'启用',value:1},{label:'禁用',value:2}]},
        {title: '备注', type: 'input',  prop: 'e', value: '', options:[{label:'启用',value:1},{label:'禁用',value:2}]},
      ],
      rules: {},
      changeForm: {

      }
    }
  },
  components: {
    TestForm
  },
  watch: {
    changeForm(val) {
      console.log('changeForm', val);
      debugger
      if(val.a=='1'){
        
      }else{
        
      }
      if(val.b) {
        // this.$set(this.baseData[3], 'value', val.b)
      }
    }
  },
  created() {
    this.getInsData()
  },
  methods: {
    // 获取机构数据
    getInsData() {
      const self = this;
      const data = {};
      (async (data)=>{
				let res = await self.$api.QueryInsTree({data})
				if(res && res.code == 0) {
          console.log('res', res.data)
          self.$set(self.baseData[1], 'options', res.data)
          // self.formData[1].options = res.data;
          // self.cascaderOptions = res.data;
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    search() {

    },
    getStoreList(row) {
      const self = this;
      const data = {
        orderId: row.orderId
      };
      (async (data)=>{
				let res = await self.$api.getStoreList({data})
				if(res && res.code == 0) {
          self.$message.success('注销成功')
          row.orderStatus = 6;
          self.getLotteryList(self.param)
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
</style>
