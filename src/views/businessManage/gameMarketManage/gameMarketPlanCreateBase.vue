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
            <el-input v-model="gameSaleChannelCode" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入大厅编号，多个大厅以“；”相隔"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="销售终端">
          <el-radio v-model="gameSaleTerminal" label="1">大厅内全部终端</el-radio>
          <div class="flex-wrap">
            <el-radio v-model="gameSaleTerminal" label="2">大厅内指定终端</el-radio>
            <el-input v-model="gameSaleTerminalCode" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入终端编号，多个终端以“；”相隔"></el-input>
          </div>
        </el-form-item>
        <el-row class="vlt-edit-btn">
          <el-button size="medium" @click="back" class="cancel">返 回</el-button>
          <el-button type="primary" v-prevent="1000" size="medium" @click="next">下一步</el-button>
        </el-row>
      </el-form>
      </div>
  </div>
</template>

<script type="text/javascript">
import moment from 'moment'

export default {
  name: "",
  data() {
    return {
      baseData: [
        {title: '上市计划名称', type: 'input',  prop: 'gameListName', value: '', placeholder: '请输入上市计划名称'},
        {title: '上市时间', type: 'datetime',  prop: 'gameListTime', value: ''},
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
      ],
      rules: {},
      gameSaleChannel: '1',
      gameSaleTerminal: '1',
      gameSaleChannelCode: '',
      gameSaleTerminalCode: '',
      options: [{label:'男', value:'1'},{label:'女',value:'2'}],
      checkList: [],
      textarea: '',
      param: {
        gameSaleChannel: '',
        gameSaleTerminal: '',
      },
    }
  },
  created() {
    this.getInsData();
    this.getAllGameList()
  },
  methods: {
    
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
          self.$set(self.baseData[4], 'options', res.data)
          // self.formData[1].options = res.data;
          // self.cascaderOptions = res.data;
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
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    changeForm(val) {
      console.log('参数', val)
      this.param = val;
    },
    next() {
      if(this.gameSaleChannel=='1') {
        this.param.gameSaleChannel = 'all';
      }else{
        this.param.gameSaleChannel = this.gameSaleChannelCode;
      }
      if(this.gameSaleTerminal=='1') {
        this.param.gameSaleTerminal = 'all';
      }else{
        this.param.gameSaleTerminal = this.gameSaleTerminalCode;
      }
      this.param.gameListPlanTime = moment(this.param.gameListPlanTime).format("YYYY-MM-DD HH:mm:ss")
      this.param.gameSaleArea = this.param.gameSaleArea.join(',');
      let data = {
        gameListPlanVo: this.param
      }
      this.$emit('next', data)
    },
    back() {

    }
  },
}
</script>

<style lang="less" scoped>
  @import './less/index.less';
  .vlt-edit-wrap{
    width: 100%;
    margin: 0 30px;
  }
  .vlt-edit-btn{
    text-align: right;
    margin: 60px 0 30px;
    .el-button{
      width: 120px;
    }
    .cancel{
      margin: 0 50px 0 80px;
    }
  }
  .flex-wrap{
    display: flex;
    align-items: center;
  }
  .wrap{
    max-width: 900px;
    margin: 0 auto;
  }
</style>
