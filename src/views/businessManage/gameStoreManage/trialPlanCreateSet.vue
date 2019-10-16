<template>
  <div>
    <panel title="游戏规则" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <el-form label-position="right" label-width="90px" ref="form"
            :model="gameForm"
            :rules="rules"
            class="device-form">
            <base-form :formData="gameData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
            <el-form-item label="游戏兑换比例">

            </el-form-item>
          </el-form>
        </div>
      </div>
    </panel>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "",
  data() {
    return {
      gameData: [
        {title: '游戏状态', type: 'select',  prop: 'gameStatus', value: {label:'试玩',value:'1'}, options:[{label: '试玩',value: '1'},{label: '上市',value: '2'}]},
        {title: '消费模式', type: 'select',  prop: 'salesModel', value: {label: '试玩积分',value: '2'}, options:[{label: '账户金额',value: '1'},{label: '试玩积分',value: '2'}]},
        {title: '游戏奖池', type: 'select',  prop: 'status', value: {label: '多奖池',value: '2'}, options:[{label: '无奖池',value: '0'},{label: '单奖池',value: '1'},{label: '多奖池',value: '2'}]},
        {title: 'Jackpot比率', type: 'input',  prop: 'phoneNumber', value: ''},
        {title: '奖池比率', type: 'input',  prop: 'email', value: ''},
        {title: '防沉迷', type: 'select',  prop: 'statusa', value: '', options:[{label: '启用',value: '0'},{label: '禁止',value: '1'}]},
        {title: '单次时长', type: 'input',  prop: 'faxaphone', value: ''},
        {title: '单日限额', type: 'input',prop: 'address', value: ''},
        
      ],
      gameForm: {},
      rules: {},
      params: {}
    }
  },
  components: {
  },
  methods: {
    changeForm(val) {
      Object.assign(this.params, val)
      console.log('派发出来的参数', this.params)
    },
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
</style>
