<template>
  <div class="vlt-edit-single wrap">
    <div class="vlt-edit-wrap">
      <el-form label-position="right" 
        label-width="90px" 
        ref="form"
        class="baseInfo">
        <base-form :formData="baseData" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        <el-form-item label="销售渠道">
          <el-radio v-model="gameSaleChannel" label="1">区域内全部大厅</el-radio>
          <div class="flex-wrap">
            <el-radio v-model="gameSaleChannel" label="2">区域内指定大厅</el-radio>
            <el-input v-model="textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入大厅编号，多个大厅以“；”相隔"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="销售终端">
          <el-radio v-model="gameSaleTerminal" label="1">大厅内全部终端</el-radio>
          <div class="flex-wrap">
            <el-radio v-model="gameSaleTerminal" label="2">大厅内指定终端</el-radio>
            <el-input v-model="textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入终端编号，多个终端以“；”相隔"></el-input>
          </div>
        </el-form-item>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="next">提交并保存</el-button>
          <el-button size="medium" @click="back" class="cancel">取 消</el-button>
        </el-row>
      </el-form>
      </div>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "",
  data() {
    return {
      baseData: [
        {title: '上市计划名称', type: 'input',  prop: 'gameListName', value: '', placeholder: '请输入上市计划名称'},
        {title: '上市时间', type: 'datetime',  prop: 'gameListPlanTime', value: ''},
        {title: '计划简介', type: 'textarea',  prop: 'gameSaleDesc', value: '', placeholder: '请输入上市计划简介'},
        {title: '上市游戏', type: 'select',  prop: 'gameId', value: '', options:[]},
        {title: '销售区域', type: 'cascader-multiple',  prop: 'gameSaleArea', value: '', options: [],
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            multiple: true, // 多选
            checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
          }
        },
        // {title: '销售渠道', type: 'radio-textarea', value:'', props:['radio','texat'],options:[{label:'全部',value:1},{label:'指定',value:2}]}
      ],
      rules: {},
      gameSaleChannel: '1',
      gameSaleTerminal: '1',
      options: [{label:'男', value:'1'},{label:'女',value:'2'}],
      checkList: [],
      textarea: '',
      param: null,
      insData: [],
      planData:{}
    }
  },
  created() {
    this.getAllGameList();
    // this.getInsData()
  },
  methods: {
    // 获取计划详情
    getMarketPlanDetail() {
      const self = this;
      const data = {
        id: this.$route.query.id,
        gameId: this.$route.query.gameId
      };
      (async (data)=>{
				let res = await self.$api.getMarketPlanDetail({data})
				if(res && res.code == 0) {
          // self.$message.success('注销成功')
          this.planData = res.data;
          self.getInsData();
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    // 返回机构完整数组
    getInsArray(id, obj) {
      let array = [];
      array.push(obj.id)
      if(id&&id!=obj.id) {
        obj.children.forEach((item)=>{
          if(item.id == id) {
            array[1] = item.id
            return array
          }else{
            item.children&&item.children.forEach((list)=>{
              if(list.id==id) {
                array[1] = item.id
                array[2] = list.id
                return array
              }else{
                list.children&&list.children.forEach((el)=>{
                  if(el.id==id) {
                    array[1] = item.id
                    array[2] = list.id
                    array[3] = el.id
                    return array
                  }
                })
              }
            })
          }
        })
      }
      console.log('getInsArray',array)
      return array
    },
    // 获取所有游戏列表
    getAllGameList() {
      const self = this;
      const data = {};
      (async (data)=>{
				let res = await self.$api.getAllGameList({data})
				if(res && res.code == 0) {
          console.log('res', res.data)
          let gameData = res.data;
          let array = []
          gameData.forEach(item => {
            let obj = {};
            obj.label = item.gameName;
            obj.value = item.id;
            array.push(obj)
          });
          self.$set(self.baseData[3], 'options', array)
          // self.formData[1].options = res.data;
          // self.cascaderOptions = res.data;
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    // 获取机构数据
    getInsData() {
      const self = this;
      const data = {};
      (async (data)=>{
				let res = await self.$api.QueryInsTree({data})
				if(res && res.code == 0) {
          console.log('res', res.data)
          this.insData = res.data;
          self.$set(self.baseData[4], 'options', res.data)
          // self.formData[1].options = res.data;
          // self.cascaderOptions = res.data;
          self.getInsArray('', res.data)
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
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
    changeForm(val) {
      console.log('参数', val)
      this.param = val;
    },
    next(val) {
      this.$emit('next', this.param)
    }
  },
}
</script>

<style lang="less" scoped>
  @import './less/index.less';
  .vlt-edit-wrap{
    // width: 100%;
    margin: 0 30px;
  }
  .vlt-edit-btn{
    text-align: right;
    margin: 60px 0 30px;
    .el-button{
      // width: 120px;
    }
    .cancel{
      // margin: 0 50px 0 80px;
    }
  }
  .flex-wrap{
    display: flex;
    align-items: center;
  }
  .wrap{
    // max-width: 900px;
    margin: 0 auto;
  }
</style>
