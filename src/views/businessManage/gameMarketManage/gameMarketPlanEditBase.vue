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
            <el-input v-model="gameSaleChannelTextarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入大厅编号，多个大厅以“；”相隔"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="销售终端">
          <el-radio v-model="gameSaleTerminal" label="1">大厅内全部终端</el-radio>
          <div class="flex-wrap">
            <el-radio v-model="gameSaleTerminal" label="2">大厅内指定终端</el-radio>
            <el-input v-model="gameSaleTerminalTextarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入终端编号，多个终端以“；”相隔"></el-input>
          </div>
        </el-form-item>
        <el-row class="vlt-edit-btn">
          <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
          <el-button size="medium" @click="cancel" class="cancel">取 消</el-button>
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
        {title: '上市时间', type: 'datetime',  prop: 'listPlanTime', value: ''},
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
      gameSaleChannelTextarea: '',
      gameSaleTerminal: '1',
      gameSaleTerminalTextarea: '',
      options: [{label:'男', value:'1'},{label:'女',value:'2'}],
      checkList: [],
      param: null,
    }
  },
  props: {
    planData: {
      type: Object,
      default: {}
    },
    insData: {
      type: Array,
      default: ()=>{}
    },
    insArray: {
      type: Array,
      default: ()=>{}
    }
  },
  created() {
    this.getAllGameList();
    // this.getInsData()
  },
  watch: {
    planData: {
      handler(newValue, oldValue) {
        // this.form = {};
        this.init(newValue)
      },
      // 深度监听 监听对象，数组的变化
      deep: true
    },
    insData: {
      handler(newValue, oldValue) {
        this.$set(this.baseData[4], 'options', newValue)
      },
      // 深度监听 监听对象，数组的变化
      deep: true
    },
    insArray(newValue, oldValue){
      console.log('组件insarray', newValue, oldValue)
      this.$set(this.baseData[4], 'value', newValue)

    },
  },
  methods: {
    init(val) {
      this.baseData.forEach((item)=>{
        if(item.prop == 'gameSaleArea') {
          // this.$set(this.baseData[4], 'value', this.insArray)
        }else if(item.prop=='listPlanTime') {
          item.value = val.gameListPlanVo&&val.gameListPlanVo.gameListTime;
        }else{
          item.value = val.gameListPlanVo&&val.gameListPlanVo[item.prop]
        }
      })

      if(val.gameListPlanVo.gameSaleChannel=='all') {
        this.gameSaleChannel = '1'
      }else{
        this.gameSaleChannel = '2'
        this.gameSaleChannelTextarea = val.gameListPlanVo.gameSaleChannel
      }

      if(val.gameListPlanVo.gameSaleTerminal=='all') {
        this.gameSaleTerminal = '1'
      }else{
        this.gameSaleTerminal = '2'
        this.gameSaleTerminalTextarea = val.gameListPlanVo.gameSaleTerminal
      }

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
    submit() {
      if(this.gameSaleChannel=='1') {
        this.param.gameSaleChannel = 'all'
      }else{
        this.param.gameSaleChannel = this.gameSaleChannelTextarea;
      }
      if(this.gameSaleTerminal=='1') {
        this.param.gameSaleTerminal = 'all'
      }else{
        this.param.gameSaleTerminal = this.gameSaleTerminalTextarea;
      }
      if(typeof this.param.gameSaleArea !== 'string') {
        this.param.gameSaleArea = this.param.gameSaleArea.join(',');
      }
      this.param.listPlanTime = moment(this.param.listPlanTime).format("YYYY-MM-DD HH:mm:ss")
      this.$refs.baseForm.validate((val)=>{
        console.log(val)

      });
      this.$emit('submit', this.param)
    },
    cancel() {

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
    text-align: left;
    margin: 60px 0 30px 30px;
    .el-button{
      // width: 120px;
    }
    .cancel{
      margin-left: 15px;
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
