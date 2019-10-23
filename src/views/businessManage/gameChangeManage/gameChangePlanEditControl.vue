<template>
  <div class="wrap">
    <panel title="游戏规则" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-double">
        <div class="vlt-edit-wrap">
          <base-form :formData="gameData" labelWidth="90px" ref="baseForm" :rules="rules" direction="top" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="投注规则" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-double">
        <div class="vlt-edit-wrap">
          <base-form :formData="betData" labelWidth="90px" ref="baseForm" :rules="rules" direction="top" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="单次加注金额配置" :show="true" style="margin-bottom:15px">
      <el-form label-position="top" label-width="100px" ref="form"
        :model="eachBetForm"
        :rules="rules"
        class="eachBet-form">
        <el-form-item v-for="(item,index) in eachBetData" :key="index" :label="`${item.title}${index+1}`">
          <el-input v-model="eachBetForm[item.prop]" :placeholder="item.placeholder?`${item.placeholder}`:`请输入${item.title}`"></el-input> 
          <el-button v-if="index!==0" type="text" class="delete" @click="deleteBetMoney(index)">删除</el-button>
        </el-form-item>
      </el-form>
      <el-button class="add-btn" @click="addBetMoney" icon="el-icon-plus">新 增</el-button>
    </panel>
    <panel title="资金规则" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-double">
        <div class="vlt-edit-wrap">
          <base-form :formData="fundsData" labelWidth="90px" ref="baseForm" :rules="rules" direction="top" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="风控规则" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-double">
        <div class="vlt-edit-wrap">
          <base-form :formData="riskData" labelWidth="90px" ref="baseForm" :rules="rules" direction="top" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="自定义设置" :show="true" style="margin-bottom:15px">
      <el-button class="add-btn" @click="addBetMoney" icon="el-icon-plus">新 增</el-button>
    </panel>
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
      gameData: [
        {title: '游戏状态', type: 'select',  prop: 'gameStatus', value: '', options:[{label: '试玩',value: '1'},{label: '上市',value: '2'}]},
        {title: '消费模式', type: 'select',  prop: 'salesModel', value: '', options:[{label: '账户金额',value: '1'},{label: '试玩积分',value: '2'}]},
        {title: '游戏奖池', type: 'select',  prop: 'status', value: '', options:[{label: '无奖池',value: '0'},{label: '单奖池',value: '1'},{label: '多奖池',value: '2'}]},
        {title: 'Jackpot比率', type: 'input',  prop: 'phoneNumber', value: ''},
        {title: '返奖率', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '调节基金比率', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '奖池比率', type: 'input',  prop: 'email', value: ''},
        {title: '游戏兑换比例', type: 'input',  prop: 'rate', value: '',placeholder: '示例1:100 请用英文符号“ : ”'},
        {title: '防沉迷', type: 'select',  prop: 'statusa', value: {label: '启用',value: '0'}, options:[{label: '启用',value: '0'},{label: '禁止',value: '1'}]},
        {title: '游戏规则介绍', type: 'textarea',  prop: 'textarea', value: ''},
        {title: '单次时长', type: 'input',  prop: 'faxaphone', value: ''},
        {title: '单日限额', type: 'input',prop: 'address', value: ''},
      ],
      betData: [
        {title: '单注最小金额', type: 'input',  prop: 'phoneNumber', value: ''},
        {title: '最小投注数', type: 'input',  prop: 'email', value: ''},
        {title: '单注最大金额', type: 'input',  prop: 'phoneNumber', value: ''},
        {title: '最大投注数', type: 'input',  prop: 'email', value: ''},
      ],
      eachBetData: [
        {title: '单次加注金额', type: 'input',  prop: 'eachAdd', value: ''},
      ],
      fundsData: [
        {title: '总发行经费占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '总公益金占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '中福彩发行费占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '中福彩公益金占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '省福彩发行费占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '省福彩公益金占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '市福彩发行费占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '市福彩公益金占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '销售厅发行费占比', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '销售厅公益金占比', type: 'input',  prop: 'eachAdd', value: ''},
      ],
      riskData: [
        {title: '最低中奖金额', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最低返奖率', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最高中奖金额', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最高返奖率', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最低奖池金额', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最低销量', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最高奖池金额', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最高销量', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最低开机率', type: 'input',  prop: 'eachAdd', value: ''},
        {title: '最低在线数量', type: 'input',  prop: 'eachAdd', value: ''},
      ],
      eachBetForm: {},
      gameForm: {},
      rules: {},
      params: {}
    }
  },
  components: {
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
    deleteBetMoney(index) {
      this.eachBetData.splice(index, 1)
      console.log('删除', this.deviceData)
    },
    addBetMoney() {
      let cloneData = JSON.parse(JSON.stringify(this.eachBetData[0]))
      cloneData.prop = `${cloneData.eachAdd}${this.eachBetData.length}`
      this.$set(this.eachBetData, this.eachBetData.length, cloneData);
    },
    changeForm(val) {
      Object.assign(this.params, val)
      console.log('派发出来的参数', this.params)
    },
    prev() {
      this.$emit('prev', this.params)
    },
    next() {
      this.$emit('next', this.params)
    }
  },
}
</script>

<style lang="less" scoped>
.add-btn{
  width: 100%;
  max-width: 350px;
  margin: 0 0 30px 16px;
}
.delete{
  margin-left: 20px;
}
  .vlt-edit-btn{
    text-align: right;
    margin: 40px 0 40px;
    .el-button{
      // width: 120px;
    }
    .cancel{
      // margin: 0 30px 0 0;
    }
  }
  .wrap{
    // max-width: 900px;
    // margin: 0 auto;
  }
</style>
