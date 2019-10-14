<template>
 <div class="vlt-card">
    <el-steps :active="active" align-center>
        <el-step description="试玩计划详情"></el-step>
        <el-step description="游戏规则"></el-step>
        <el-step description="投注规则"></el-step>
        <el-step description="资金规则"></el-step>
        <el-step description="风控规则"></el-step>
        <el-step description="自定义与试玩环境配置"></el-step>
    </el-steps>
      <div class="vlt-edit-single" v-show = 'active === 1'>
        <h2 class="title">试玩计划详情</h2>
        <div class="vlt-edit-wrap">
          <base-form :formData="detailsFormData" ref="baseForm" :rules="rules" direction="top" @change="changeForm"></base-form>
        </div>
        <el-button size="medium" style="margin-top: 12px;" @click="cancel">取 消</el-button>
        <el-button  class="next-btn" type="primary" v-prevent="1000" size="medium" style="margin-top: 12px;" @click="next">下一步</el-button>
        
      </div>
      <div class="vlt-edit-single" v-show = 'active === 2'>
        <h2 class="title">游戏规则</h2>
        <div class="vlt-edit-wrap">
          <base-form :formData="ruleFormData" ref="baseForm" :rules="rules" direction="top" @change="changeForm"></base-form>
        </div>
        <el-button type="primary" v-prevent="1000" size="medium" style="margin-top: 12px;" @click="back"
         v-show="active ==2||active==3||active==4">上一步</el-button>
        <el-button class="next-btn" type="primary" v-prevent="1000" size="medium" style="margin-top: 12px;" @click="next"
        v-show="active ==1||active==2||active==3">下一步</el-button>

      </div>
      <div class="vlt-edit-single" v-show = 'active === 3'>
        <h2 class="title">投注规则</h2>
        <div class="vlt-edit-wrap">
          <el-form label-position="top" label-width="90px" :model="form" ref="form">
            <base-form :formData="betFormData" ref="baseForm" :rules="rules" direction="top" @change="changeForm"></base-form>
            <h4>单注加注金额设置：</h4>
            <el-form-item label="第一档">
              <el-input v-model="form.firstGear"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button type="primary" v-prevent="1000" size="medium" style="margin-top: 12px;" @click="back">上一步</el-button>
        <el-button class="next-btn" type="primary" v-prevent="1000" size="medium" style="margin-top: 12px;" @click="next">下一步</el-button>
      </div>
      <div class="vlt-edit-single" v-show = 'active === 4'>
        <h2 class="title">资金规则</h2>
        <div class="vlt-edit-wrap">
          <base-form :formData="capitalFormData" ref="baseForm" :rules="rules" direction="top" @change="changeForm"></base-form>
          <el-button type="primary" v-prevent="1000" size="medium" style="margin-top: 12px;" @click="back">上一步</el-button>
        <el-button class="next-btn" type="primary" v-prevent="1000" size="medium" style="margin-top: 12px;" @click="next">下一步</el-button>
        </div>
      </div>
      <div class="vlt-edit-single" v-show = 'active === 5'>
        <h2 class="title">风控规则</h2>
        <div class="vlt-edit-wrap">
          <base-form :formData="riskFormData" ref="baseForm" :rules="rules" direction="top" @change="changeForm"></base-form>
          <el-button type="primary" v-prevent="1000" size="medium" style="margin-top: 12px;" @click="back">上一步</el-button>
        <el-button class="next-btn" type="primary" v-prevent="1000" size="medium" style="margin-top: 12px;" @click="next">下一步</el-button>
        </div>
      </div>
      <div class="vlt-edit-s-ingle zidingyi" v-show = 'active === 6'>
        <h3 class="title">自定义配置（可选）</h3>
        <el-form label-position="top" label-width="90px" :model="form" ref="form">
          <el-form-item>
            <el-input v-model="form.firstGear" placeholder="标题" width="50px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.firstGear" placeholder="请输入内容" class="inp-cootent"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div>
        <el-row class="vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
            <el-button size="medium" @click="cancel">取消</el-button>
        </el-row>
      </div> -->
   
 </div>
</template>

<script type="text/javascript">
import rules from '@/utils/rules.js';

export default {
 name: "planEdit",
 data() {
 return {
  //  showData:true,
   active:1,
   //试玩计划详情
   detailsFormData:[
     {title: '试玩计划名称', type:"input", prop: 'planName'},
     {title: '游戏名称', type:"input", prop: 'gameName'},
     {title: '试玩渠道', type:"select", prop: 'channel',option:[{label:'10001',value:''},{label:'10001',value:''}]},
    //  {title: '开始试玩时间', type: 'datepicker', prop: 'startTime', value: '', option:['start', 'end']},
    //  {title: '试玩范围', type:"select", prop: 'rang',option:[{label:'试玩区域',value:''},{label:'试玩渠道',value:''}]},
    //  {title: '试玩终端', type:"select", prop: 'terminal',option:[{label:'SC001',value:''},{label:'SC002',value:''}]},
    //  {title: '结束试玩时间', type: 'datepicker', prop: 'endTime', value: '', option:['start', 'end']},
    //  {title: '试玩区域', type:"select", prop: 'area',option:[{label:'广东',value:''},{label:'深圳',value:''}]},
   ],
    //游戏规则
   ruleFormData:[
     {title: '游戏状态', type:"select", prop: 'states', option:[{label:'试玩中',value:''},{label:'未开始',value:''}]},
     {title: '游戏兑换比例', type:"input", prop: 'conversionRatio'},
    //  {title: '消费模式', type:"select", prop: 'consumePattern', option:[{label:'账户金额',value:''},{label:'',value:''}]},
    //  {title: '防沉迷', type:"select", prop: 'preventWallow',option:[{label:'启用',value:''}]},
    //  {title: '奖池类型', type:"select", prop: 'pondType', option:[{label:'单奖池',value:''},{label:'双奖池',value:''}]},
    //  {title: 'jackpot比率', type:"input", prop: 'jackpotRation'},
    //  {title: '单次时长', type:"input", prop: 'onceDuration'},
    //  {title: '奖池比率', type:"input", prop: 'pondRation'},
    //  {title: '单日限额', type:"input", prop: 'dayQuota'},
    //  {title: '游戏规则介绍',type: 'textarea',  prop: 'ruleIntroduce'},
   ],
   //投注规则
   betFormData:[
     {title:'单注最小金额',type:'input',prop:'miniBetMoney'},
     {title:'最小投注数',type:'input',prop:'miniBetNum'},
     {title:'单注最大金额',type:'input',prop:'maxBetMoney'},
     {title:'最大投注数',type:'input',prop:'maxBetNum'},

   ],
   //资金规则
   capitalFormData:[
     {title:'总发行经费占比',type:'input',prop:'totalProportion'},
     {title:'总公益金占比',type:'input',prop:'totalPublicProportion'},
     {title:'返奖率',type:'input',prop:'slipperRation'},
     {title:'中福彩发行费占比',type:'input',prop:'lotteryProportion'},
     {title:'中福彩公益金占比',type:'input',prop:'lotteryPublicProportion'},
     {title:'调节基金比率',type:'input',prop:'fundlotteryRation'},
     {title:'省福彩发行费占比',type:'input',prop:'proLotteryProportion'},
     {title:'省福彩公益金占比',type:'input',prop:'proPublicProportion'},
     {title:'jackpot比率',type:'input',prop:'jackpotRation'},


   ],
   //风控规则
   riskFormData:[
     {title:'最低中奖率',type:'input',prop:'miniRate'},
     {title:'最低返奖率',type:'input',prop:'miniSlipperRation'},
     {title:'最低奖池金额',type:'input',prop:'miniPondMoney'},
     {title:'最高中奖金额',type:'input',prop:'maxWinningMoney'},
     {title:'最高返奖率',type:'input',prop:'maxSlipperRation'},
     {title:'最高奖池金额',type:'input',prop:'maxPondMoney'},
     {title:'最低销量',type:'input',prop:'miniSale'},
     {title:'最低开机率',type:'input',prop:'miniStartingRation'},
     {title:'最低在线数量',type:'input',prop:'miniOnLineNum'},
     {title:'最高销量',type:'input',prop:'maxSale'},
   ],
   form:{

   },
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
 components: {
 },
 methods: {
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

<style lang="less" sco-ped>
// .el-date-editor.el-input, .el-date-editor.el-input__inner{
//   width: 100%;
// }
h4{
  height: 20px;
}
.main-body .el-button--medium {
  margin-left:270px;
  margin-bottom: 100px
}
.main-body .next-btn{
  margin-left: 20px;
  margin-bottom: 100px
}
.zidingyi .el-input{
  margin-top:20px;
  width:120px;
}
.zidingyi .el-form-item{
  display: inline-block;
}
.zidingyi .el-input__inner{
  width:200px;
}
</style>

