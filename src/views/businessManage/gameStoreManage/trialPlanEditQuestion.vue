<template>
  <div class="vlt-edit-wrap">
    <base-form :formData="questionnaireData" labelWidth="100px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column prop="id" label="问卷标题" ></el-table-column>
      <el-table-column prop="name" label="题目分类"></el-table-column>
      <el-table-column prop="type" label="问卷说明"></el-table-column>
      <el-table-column prop="pond" label="调查对象"></el-table-column>
      <el-table-column prop="time" label="生效时间"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-prevent="2000" @click.native="detail(scope.row.id)">去除</el-button>
          <!-- <el-button  size="mini" v-prevent="2000" @click.native="edit(scope.row.id)">去除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-row class="vlt-edit-btn">
      <el-button type="primary" v-prevent="1000" size="medium" @click="next">提交并保存</el-button>
      <el-button size="medium" @click="prev" class="cancel">取 消</el-button>
    </el-row>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "",
  data() {
    return {
      questionnaireData: [
        {title: '问卷调查配置', type: 'select',  prop: 'salesModel', value: '', options:[{label: '问卷一',value: '1'},{label: '问卷二',value: '2'}],placeholder:'请选择问卷调查'},
      ],
      tableData: [
        {id: 'a',name:'b',type:'c',pond: 'd',time:'2019-09-12 09:00:00'}
      ],
    }
  },
  methods: {
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
    prev() {
      this.$emit('prev', this.params)
    },
    next() {
      this.$emit('next', this.params)
    },
    changeForm() {

    }
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
  .vlt-edit-btn{
    text-align: right;
    margin: 60px 0 30px;
    .el-button{
      // width: 120px;
    }
    .cancel{
      // margin: 0 50px 0 180px;
    }
  }
  .vlt-edit-wrap{
    // max-width: 900px;
    margin: 30px 20px;
  }
</style>
