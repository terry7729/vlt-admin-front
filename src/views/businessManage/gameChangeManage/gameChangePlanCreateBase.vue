<template>
  <div class="vlt-edit-single wrap">
    <div class="vlt-edit-wrap">
      <el-form label-position="right" 
        label-width="90px" 
        ref="form"
        class="baseInfo">
        <base-form :formData="baseData" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        <!-- <el-form-item label="试玩工具">
          <el-radio v-model="radio" label="1">试玩投注卡</el-radio>
          <div class="flex-wrap">
            <el-radio v-model="radio" label="2">会员积分</el-radio>
            <el-input v-model="input" placeholder="请输入积分兑换比例"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="试玩群体">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="0">全部用户</el-checkbox>
            <el-checkbox label="1">新游玩用户</el-checkbox>
            <el-checkbox label="2">新会员</el-checkbox>
            <el-checkbox label="3" >老会员</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="会员等级">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <base-form :formData="channelData" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        <el-form-item label="试玩渠道">
          <el-radio v-model="radio" label="1">区域内全部大厅</el-radio>
          <div class="flex-wrap">
            <el-radio v-model="radio" label="2">区域内指定大厅</el-radio>
            <el-input v-model="textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入大厅编号，多个大厅以“；”相隔"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="试玩终端">
          <el-radio v-model="radio" label="1">大厅内全部终端</el-radio>
          <div class="flex-wrap">
            <el-radio v-model="radio" label="2">大厅内指定终端</el-radio>
            <el-input v-model="textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入终端编号，多个终端以“；”相隔"></el-input>
          </div>
        </el-form-item> -->
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
        {title: '变更计划名称', type: 'input',  prop: 'changePlanName', value: '', placeholder: '请输入变更计划名称'},
        {title: '生效时间', type: 'datetime',  prop: 'gameChangePlanTime', value: ''},
        {title: '计划简介', type: 'textarea',  prop: 'changePlanDesc', value: '', placeholder: '请输入变更计划简介'},
        {title: '变更游戏', type: 'select',  prop: 'gameId', value: '', options:[], placeholder: '请选择变更游戏'},
      ],
      channelData: [
        {title: '试玩区域', type: 'cascader-multiple',  prop: '', value: '', options: []},
      ],
      rules: {},
      param: {},
    }
  },
  created() {
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
    changeForm(val) {
      console.log('参数', val)
      this.param = val;
    },
    back() {

    },
    next(val) {
      this.param.gameChangePlanTime = moment(this.param.gameChangePlanTime).format("YYYY-MM-DD HH:mm:ss")
      // this.param.gameSaleArea = this.param.gameSaleArea.join(',');
      let data = {
        gameChangePlanVo: this.param
      }
      this.$emit('next', data)
    }
  },
}
</script>

<style lang="less" scoped>
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
      margin: 0 30px 0 80px;
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
