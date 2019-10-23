<template>
 <div class="vlt-card">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="1">
        <base-info @next="next"></base-info>
      </el-tab-pane>
      <el-tab-pane label="游戏配置" name="2">
        <game-set @next="next" @prev="prev"></game-set>
      </el-tab-pane>
      <el-tab-pane label="上传附件" name="4">
        <div class="vlt-edit-single appendix">
          <div class="vlt-edit-wrap">
            <base-form :formData="appendixData" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
            <el-row class="vlt-edit-btn">
              <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
              <el-button size="medium" @click="prev" class="cancel">取 消</el-button>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
 </div>
</template>

<script type="text/javascript">
import BaseInfo from './gameChangePlanEditBase'
import GameSet from './gameChangePlanEditControl'
import rules from '@/utils/rules.js';

export default {
  name: "planEdit",
  components: {
    BaseInfo,
    GameSet,
  },
  data() {
  return {
    appendixData: [
      {title: '其他附件', type: 'upload-drag',  prop: 'appendix', value: ''},
    ],
    activeName: '1',
    rules: {
        name: [
          { required: true, validator: rules.checkEmpty, trigger: 'blur' }
        ],
        gameName: [
          { required: true, validator: rules.checkEmpty, trigger: 'blur' }
        ],
        all: [
          { required: true, validator: rules.checkEmail, trigger: 'blur' }
        ]
      },
    params: {},
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
    // 新增提示框
        // openConfirm() {
        //   this.$confirm(`确认新增渠道 "${this.form.channelName}"，新增渠道后请设置游戏信息！`, '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }).then(() => {
        //     this.save();
        //   }).catch(() => {
        //     // 取消         
        // });
        next(){
          this.active ++
        },
        back(){
          this.active --
        },
        changeForm(val) {
          Object.assign(this.params, val)
          console.log('派发出来的参数', this.params)
        },
        //保存
        submit(formName){
          const self = this;
          this.$refs.baseForm1.validate((val)=>{
            console.log(val)
          });
        },
        cancel() {
        console.log('取消')
      },
  },
}
</script>

<style lang="less" scoped>
  .vlt-edit-btn{
    text-align: right;
    margin: 60px 0 30px;
  }
  .appendix{
    padding-top: 10px;
  }
</style>

