<template>
  <div class="wrap">
    <panel title="游戏规则" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-double">
        <div class="vlt-edit-wrap">
          <base-form :formData="gameData" labelWidth="90px" ref="baseForm" :rules="rules" direction="top" @change="changeRuleForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="投注规则" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-double">
        <div class="vlt-edit-wrap">
          <base-form :formData="betData" labelWidth="90px" ref="baseForm" :rules="rules" direction="top" @change="changeBetForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="单次加注金额配置" :show="true" style="margin-bottom:15px">
      <el-form label-position="top" label-width="100px" ref="form"
        :model="eachBetForm"
        :rules="rules"
        class="eachBet-form">
        <el-form-item v-for="(item,index) in eachBetData" :key="index" :label="`单次加注金额${index+1}`">
          <el-input v-model="item.minAddBets" placeholder="请输入单次加注金额"></el-input> 
          <el-button v-if="index!==0" type="text" class="delete-text" @click="deleteBetMoney(index)">删除</el-button>
        </el-form-item>
      </el-form>
      <el-button class="add-btn" @click="addBetMoney" icon="el-icon-plus">新 增</el-button>
    </panel>
    <panel title="奖等设置" :show="true" style="margin-bottom:15px">
      <div class="table-wrap">
        <el-table :data="tableData" border class="table">
          <el-table-column label="序号" fixed  type="index" width="60px"></el-table-column>
          <el-table-column label="兑奖名称" min-width="160px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.exchangeName" placeholder="请输入兑奖名称"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="最大兑奖金额" min-width="160px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.exchangeMoney" placeholder="请输入最大兑奖金额"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="兑奖说明" min-width="200px">
            <template slot-scope="scope">
              <el-input type="textarea"
                :rows="2" v-model="scope.row.exchangeDesc" placeholder="请输入兑奖说明"></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80px">
            <template slot-scope="scope">
              <i class="el-icon-delete delete" @click="deleteGoods(scope.$index)"></i>
            </template>
          </el-table-column>
        </el-table>
        <el-button class="addGoods" @click="addGoods" icon="el-icon-plus">新增奖等设置</el-button>
      </div>
    </panel>
    <panel title="资金规则" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-double">
        <div class="vlt-edit-wrap">
          <base-form :formData="fundsData" labelWidth="90px" ref="baseForm" :rules="rules" direction="top" @change="changeFundsForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="风控规则" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-double">
        <div class="vlt-edit-wrap">
          <base-form :formData="riskData" labelWidth="90px" ref="baseForm" :rules="rules" direction="top" @change="changeRiskForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="自定义设置" :show="true" style="margin-bottom:15px">
      <el-button class="add-btn" @click="addCustomSet" icon="el-icon-plus">新 增</el-button>
    </panel>
    <panel title="信息发布设置" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <base-form :formData="publishData" labelWidth="90px" ref="baseForm" :rules="rules" direction="top" @change="changePublishForm"></base-form>
        </div>
      </div>
    </panel>
    <el-row class="vlt-edit-btn">
      <el-button size="medium" @click="prev" class="cancel">上一步</el-button>
      <el-button type="primary" v-prevent="1000" size="medium" @click="next">下一步</el-button>
    </el-row>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "",
  data() {
    return {
      gameData: [
        // {title: '游戏状态', type: 'select',  prop: 'gameStatus', value: '', options:[{label: '试玩',value: '1'},{label: '上市',value: '2'}]}, //未找到
        {title: '消费模式', type: 'select',  prop: 'conPattern', value: '', options:[{label: '账户金额',value: 1},{label: '试玩积分',value: 2}]},
        // {title: '游戏奖池', type: 'select',  prop: 'status', value: '', options:[{label: '无奖池',value: '0'},{label: '单奖池',value: '1'},{label: '多奖池',value: '2'}]}, //未找到
        {title: '兑奖权限', type: 'select',  prop: 'prizeAuthority', value: '', options:[{label: '启用',value: 1},{label: '禁用',value: 2}]},
        {title: '销售状态', type: 'select',  prop: 'saleAuthority', value: '', options:[{label: '开售',value: 1},{label: '停售',value: 2}]},
        {title: 'Jackpot比率', type: 'input',  prop: 'jackpotRate', value: ''},
        {title: '返奖比率', type: 'input',  prop: 'returnPrizeRate', value: ''},
        {title: '调节基金比率', type: 'input',  prop: 'reFundRate', value: ''},
        {title: '奖池比率', type: 'input',  prop: 'rewardPoolRate', value: ''},
        {title: '游戏兑换比例', type: 'input',  prop: 'prizeRate', value: '',placeholder: '按百分比转换，示例12'},
        {title: '防沉迷', type: 'select',  prop: 'indulgeSwitch', value: '', options:[{label: '启用',value: 1},{label: '禁止',value: 2}]},
        {title: '游戏规则介绍', type: 'textarea',  prop: 'ruleDesc', value: ''},
        {title: '单次时长', type: 'input',  prop: 'dayLimitTime', value: ''},
        {title: '单日限额', type: 'input',prop: 'dayLimitPrize', value: ''},
      ],
      betData: [
        {title: '单注最小金额', type: 'input',  prop: 'minAmount', value: ''},
        {title: '最小投注数', type: 'input',  prop: 'minBets', value: ''},
        {title: '单注最大金额', type: 'input',  prop: 'maxAmount', value: ''},
        {title: '最大投注数', type: 'input',  prop: 'maxBets', value: ''},
      ],
      eachBetData: [
        {minAddBets: ''},
      ],
      fundsData: [
        {title: '总发行经费占比', type: 'input',  prop: 'totalPublishRate', value: ''},
        {title: '总公益金占比', type: 'input',  prop: 'totalWelfareRate', value: ''},
        {title: '中福彩发行费占比', type: 'input',  prop: 'zhcPublishRate', value: ''},
        {title: '中福彩公益金占比', type: 'input',  prop: 'zhcWelfareRate', value: ''},
        {title: '省福彩发行费占比', type: 'input',  prop: 'proPublishRate', value: ''},
        {title: '省福彩公益金占比', type: 'input',  prop: 'proWelfareRate', value: ''},
        {title: '市福彩发行费占比', type: 'input',  prop: 'cityPublishRate', value: ''},
        {title: '市福彩公益金占比', type: 'input',  prop: 'cityWelfareRate', value: ''},
        {title: '销售厅发行费占比', type: 'input',  prop: 'marketPublishRate', value: ''},
        {title: '销售厅公益金占比', type: 'input',  prop: 'marketWelfareRate', value: ''},
      ],
      riskData: [
        {title: '最低中奖金额', type: 'input',  prop: 'minBonus', value: ''},
        {title: '最低返奖率', type: 'input',  prop: 'minReturnRate', value: ''},
        {title: '最高中奖金额', type: 'input',  prop: 'maxBonus', value: ''},
        {title: '最高返奖率', type: 'input',  prop: 'maxReturnRate', value: ''},
        {title: '最低奖池金额', type: 'input',  prop: 'minPoolAmount', value: ''},
        {title: '最低销量', type: 'input',  prop: 'minSale', value: ''},
        {title: '最高奖池金额', type: 'input',  prop: 'maxPoolAmount', value: ''},
        {title: '最高销量', type: 'input',  prop: 'maxSale', value: ''},
        {title: '最低开机率', type: 'input',  prop: 'minStartRate', value: ''},
        {title: '最低在线数量', type: 'input',  prop: 'minOnlineNum', value: ''},
      ],
      publishData: [
        {title: '发布标题', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '选择机构', type: 'cascader-multiple',  prop: 'eachAdd', value: '',options: [],},
        {title: '发布时间', type: 'datetime-range',  prop: '', value: '', options:['start', 'end']},
        {title: '发布内容', type: 'textarea',  prop: 'eachAdd', value: ''},
      ],
      tableData: [
        {exchangeName:'',exchangeMoney:'',exchangeDesc:''}
      ],
      eachBetForm: {},
      gameForm: {},
      rules: {},
      params: {},
      ruleParams: {}, // 游戏规则参数
      betParams: {}, // 投注规则参数
      fundsParams: {}, // 资金规则参数
      riskParams: {}, // 风控规则参数
      publishParams: {}, // 信息发布规则参数
      awardSetParams: [], // 奖等设置参数
    }
  },
  watch: {
    tableData: {
      handler(newValue, oldValue) {
        // this.$emit("change", this.form)
        console.log('监听table的数据变化', newValue)
        // 计算价格
        let res = JSON.parse(JSON.stringify(newValue));
        let params = []
        res.forEach((item)=>{
          // 删除不需要的参数
          delete item.options
          item.exchangeMoney = Number(item.exchangeMoney)
          // 保留你需要的参数
          // let param = (({goodsId, searl, max, min, price, money, remark}) =>({goodsId, searl, max, min, price, money, remark}))(item);
          params.push(item)
        })
        this.awardSetParams = params;
        console.log('params', params)
      },
      // 深度监听 监听对象，数组的变化
      deep: true
    },
  },
  methods: {
    deleteGoods(index) {
      this.tableData.splice(index, 1);
    },
    addGoods() {
      let obj = {exchangeName:'',exchangeMoney:'',exchangeDesc:''};
      this.tableData.push(obj)
    },
    deleteBetMoney(index) {
      this.eachBetData.splice(index, 1)
      console.log('删除', this.deviceData)
    },
    addBetMoney() {
      let obj = {minAddBets:''}
      this.eachBetData.push(obj);
    },
    addCustomSet() {

    },
    // 游戏规则参数
    changeRuleForm(val) {
      this.ruleParams = val;
      for(let key in this.ruleParams){
        if(key!='ruleDesc') {
          this.ruleParams[key] = Number(this.ruleParams[key])
        }
      }
    },
    // 投注规则参数
    changeBetForm(val) {
      this.betParams = val;
      for(let key in this.betParams){
        this.betParams[key] = Number(this.betParams[key])
      }
    },
    // 资金规则参数
    changeFundsForm(val) {
      this.fundsParams = val;
      for(let key in this.fundsParams){
        this.fundsParams[key] = Number(this.fundsParams[key])
      }
    },
    // 风控规则参数
    changeRiskForm(val) {
      this.riskParams = val;
      for(let key in this.riskParams){
        this.riskParams[key] = Number(this.riskParams[key])
      }
    },
    // 信息发布规则
    changePublishForm(val) {
      this.publishParams = val;
    },
    prev() {
      this.$emit('prev', this.params)
    },
    next() {
      console.log('eachbet', this.eachBetData)
      let array = []
      this.eachBetData.forEach(item=>{
        array.push(item.minAddBets)
      })
      let str = array.join(',')
      console.log('str', str)
      this.betParams.minAddBets = str;
      // 把返奖率 调节基金参数 调换位置
      this.fundsParams.reFundRate = this.ruleParams.reFundRate 
      this.fundsParams.returnPrizeRate = this.ruleParams.returnPrizeRate
      delete this.ruleParams.reFundRate 
      delete this.ruleParams.returnPrizeRate
      let data = {
        gameRuleVo: this.ruleParams,
        gameBettingRuleVo: this.betParams,
        gameFundRuleVo: this.fundsParams,
        gameRiskRuleVo: this.riskParams,
        // publishParams: this.publishParams,
        gameExchangeSetVoList: this.awardSetParams
      }
      this.$emit('next', data)
    }
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
.add-btn{
  width: 100%;
  max-width: 350px;
  margin: 0 0 30px 16px;
}
.delete-text{
  margin-left: 20px;
}
  .vlt-edit-btn{
    text-align: right;
    margin: 40px 0 40px;
    .el-button{
      width: 120px;
    }
    .cancel{
      margin: 0 50px 0 0;
    }
  }
  .wrap{
    max-width: 900px;
    margin: 0 auto;
  }
  .table-wrap{
  padding: 10px;
  text-align: center;
}
.addGoods{
  width: 100%;
  max-width: 490px;
  margin: 20px 0 30px 10px;
}
.delete{
  font-size: 22px;
  cursor: pointer;
}
</style>
