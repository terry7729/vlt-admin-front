<template>
  <div class="vlt-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="渠道新建" name="first"></el-tab-pane>
      <el-tab-pane label="渠道新建流程图" name="second"></el-tab-pane>
    </el-tabs>
    <panel title="基本信息" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <base-form :formData="formData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="人员信息" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-single" v-for="(item, index) in workerData" :key="index">
        <div v-if="index!==0" class="title-wrap">
          <h2 class="title">{{`人员信息(${index+1})`}}</h2>
          <el-button type="text" class="delete" @click="deleteMember(index)">删除</el-button>
        </div>
        <div class="vlt-edit-wrap">
          <base-form :formData="workerData[index]" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        </div>
      </div>
      <el-button class="addMember" @click="addMember" v-show="isAddMember" icon="el-icon-plus">添加成员</el-button>
    </panel>
    <panel title="财务信息" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <base-form :formData="financeData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="投注卡规则" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <el-form :model="betCard" label-position="right" label-width="90px">
            <el-form-item label="卡费规则">
              <div class="flex-wrap">
                <div class="flex-wrap"><span class="label">累计大于</span><el-input v-model="betCard.charge" placeholder="请输入数量（张）"></el-input></div>
                <div class="flex-wrap"><span class="label">收费</span><el-input v-model="betCard.amount" placeholder="请输入金额（元）"></el-input></div>
              </div>
            </el-form-item>
            <el-form-item label="押金设置">
              <el-radio v-model="betCard.depositSet" label="0">不收费</el-radio>
              <el-radio v-model="betCard.depositSet" label="1">全部收费</el-radio>
              <el-radio v-model="betCard.depositSet" label="2">按投注卡申请量收取</el-radio>
            </el-form-item>
            <el-form-item label="押金金额" v-if="betCard.depositSet==1">
              <el-input v-model="betCard.amount" placeholder="请输入金额（元）"></el-input>
            </el-form-item>
            <el-form-item label="押金金额" v-if="betCard.depositSet==2">
              <div class="flex-wrap">
                <div class="flex-wrap"><span class="label">累计大于</span><el-input v-model="betCard.charge" placeholder="请输入数量（张）"></el-input></div>
                <div class="flex-wrap"><span class="label">金额</span><el-input v-model="betCard.amount" placeholder="请输入金额（元）"></el-input></div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </panel>
    <panel title="销售游戏" :show="true" style="margin-bottom:15px">
      <el-table :data="tableData" border class="table">
        <el-table-column label="序号"  type="index" width="80px"></el-table-column>
        <el-table-column label="游戏名称" prop="gameName"></el-table-column>
        <el-table-column label="投注权限">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.bet"
              @change="changeSwitchBet"
              :active-text="scope.row.bet?'允许':'禁止'"
              active-color="#409EFF"
              inactive-color="">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="兑奖权限">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.cash"
              @change="changeSwitchCash"
              :active-text="scope.row.cash?'允许':'禁止'"
              active-color="#409EFF"
              inactive-color="">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="销售时间" width="360px">
          <template slot-scope="scope">
            <el-date-picker size="small" type="datetime"
              v-model="scope.row.time"
              placeholder="`请选择销售时间">
            </el-date-picker>
          </template>
        </el-table-column>
      </el-table>
    </panel>
    <!-- <panel title="发放设备" :show="true" style="margin-bottom:15px">
      <el-form label-position="right" label-width="90px" ref="form"
        :model="formDevice"
        :rules="rules"
        class="device-form">
        <el-form-item v-for="(item,index) in deviceData" :key="index" :label="`${item.title}${index+1}`">
          <el-select v-model="deviceParam[index][item.propType]" placeholder="请选择设备类型" class="device-item">
            <el-option
              v-for="(list,index) in item.optionsType"
              :key="index"
              :label="list.label"
              :value="list.value">
            </el-option>
          </el-select>
          <el-select v-model="deviceParam[index][item.propModel]" placeholder="请选择设备型号" class="device-item">
            <el-option
              v-for="(list, index) in item.optionsModel"
              :key="index"
              :label="list.label"
              :value="list.value">
            </el-option>
          </el-select>
          <el-button v-if="index!==0" type="text" class="delete" @click="deleteDevice(index)">删除</el-button>
        </el-form-item>
      </el-form>
      <el-button class="addDevice" @click="addDevice" icon="el-icon-plus">添加设备</el-button>
    </panel> -->
    <panel title="发放资源" :show="true" style="margin-bottom:15px">
      <el-form label-position="right" label-width="90px" ref="form"
        :model="formDevice"
        :rules="rules"
        class="device-form">
        <el-form-item v-for="(item,index) in resourceData" :key="index" :label="`${item.title}${index+1}`">
          <el-select v-model="item.type" placeholder="请选择资源类型" class="device-item">
            <el-option
              v-for="(list, index) in item.optionsType"
              :key="index"
              :label="list.label"
              :value="list.value">
            </el-option>
          </el-select>
          <el-select v-model="item.name" placeholder="请选择资源名称" class="device-item">
            <el-option
              v-for="(list,index) in item.optionsName"
              :key="index"
              :label="list.label"
              :value="list.value">
            </el-option>
          </el-select>
          <el-select v-model="item.model" placeholder="请选择设备型号" class="device-item">
            <el-option
              v-for="(list, index) in item.optionsModel"
              :key="index"
              :label="list.label"
              :value="list.value">
            </el-option>
          </el-select>
          <el-input v-model="item.number" class="device-item" placeholder="请输入数量"></el-input>
          <el-button v-if="index!==0" type="text" class="delete" @click="deleteResource(index)">删除</el-button>
        </el-form-item>
      </el-form>
      <el-button class="addDevice" @click="addResource" icon="el-icon-plus">添加设备</el-button>
    </panel>
    <panel title="其他附件" :show="true" style="margin-bottom:15px">
      <el-form label-position="right" 
        label-width="90px" 
        ref="form"
        class="device-form">
        <el-form-item  label="附件上传">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </panel>
    <div class="submit-wrap">
      <el-row class="vlt-edit-btn">
        <el-button type="primary" size="medium" @click="submit">提交并保存</el-button>
        <el-button size="medium" @click="editShow = !editShow">取消</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import mixin from '@/utils/mixin';
const typeData = [
  {label:'设备',value:'1'},
  {label:'配件',value:'2'},
  {label:'耗材',value:'3'},
  {label:'设施',value:'3'},
];
const nameData = [
  {label:'名称一',value:'4'},
  {label:'名称二',value:'5'},
  {label:'名称三',value:'6'},
];
const modelData = [
  {label:'型号一',value:'7'},
  {label:'型号二',value:'8'},
  {label:'型号三',value:'9'},
];
export default {
  name: "channelList",
  mixins: [mixin],
  data() {
    return {
      isAddMember: false,
      betCard: { // 投注卡的数据
        num:'',
        money:'',
        depositSet: '0', // 押金设置 0-不收费；1-收费，2-按投注卡申请量收费
        num2: '',
        amount: '' // 押金金额
      },
      resourceData: [ // 发放资源数据
        {title:'资源类型',type:'',model:'',name:'',number:'',optionsType:typeData,optionsName:nameData,optionsModel:modelData,}
      ],
      radio: '1',
      fileList: [],
      activeName: "first",
      formData: [
        {title: '所属机构', type: 'cascader', prop: 'insId', value: '',  options: []},
        {title: '渠道类型', type: 'select', prop: 'channelType', value: '', options:[{label:'自营厅',value:'1'},{label:'合作厅',value:'2'}]},
        {title: '渠道编号', type: 'input', prop: 'channelNo', value: ''},
        {title: '经营场所属性', type: 'select', prop: 'runField', value: '', options:[{label:'自有',value:'1'},{label:'租赁',value:'2'}]},
        {title: '渠道面积', type: 'input', prop: 'pointArea', value: ''},
        {title: '渠道地址', type: 'address', prop: 'channelAddress', value: '',options:[]},
      ],
      workerData: [
        [{title: '角色名称', type: 'select', prop: 'roleId', value: '', options:[{label:'大厅经理',value:'1'},{label:'普通职员',value:'2'}]},
        {title: '姓名', type: 'input', prop: 'accountName', value: ''},
        {title: '性别', type: 'radio', prop: 'sex', value: '2', options: [{ label: '男', value: "1" }, { label: '女', value: "2" }]},
        {title: '手机号码', type: 'input', prop: ' phone', value: ''},
        {title: '身份证号码', type: 'input', prop: 'channelIdentity', value: ''},
        {title: '身份证照正面', type: 'upload', prop: 'photo', value: ''},
        {title: '身份证照背面', type: 'upload', prop: 'photo', value: ''}]
      ],
      financeData: [
        {title: '合作预交款', type: 'input', prop: 'coPrepareMoney', value: ''},
        {title: '授信额度', type: 'input', prop: 'creditQuota', value: ''},
        {title: '代销费费率', type: 'select', prop: 'agentSellRate', value: '', options:[{label:'大厅经理',value:'1'},{label:'普通职员',value:'2'}]},
        {title: '收款凭证', type: 'upload-drag', prop: 'evidence', value: ''}
      ],
      deviceData: [
        {title:'设备', propType: 'type', propModel: 'model', optionsType:[{label:'类型一',value:1},{label:'类型二',value:2}],optionsModel:[{label:'型号三',value:3},{label:'型号四',value:4}]}
      ],
      rules: {},
      params: {
        workerList:[],
      },
      tableData: [
        {gameName:'a',bet: false,cash:true,time:''},
        {gameName:'b',bet: false,cash:true,time:''},
        {gameName:'c',bet: true,cash:false,time:''},
      ],
      formDevice:{},
      deviceParam: [{type:'',model:''}], // 用于保存设备的参数
      memberArray: [], // 用于保存人员信息数据
    };
  },
  watch: {
    resourceData: {
      handler(newValue, oldValue) {
        let res = JSON.parse(JSON.stringify(newValue));
        let params = []
        res.forEach((item)=>{
          // 保留你需要的参数
          let param = (({type, name, model, number}) =>({type, name, model, number}))(item);
          params.push(param)
        })
        console.log('params', params)
      },
      // 深度监听 监听对象，数组的变化
      deep: true
    },
  },
  created() {
    this.getInsData()
    this.getChannelGameList()
  },
  methods: {
    // 获取渠道 销售游戏列表
    getChannelGameList() {
      const self = this;
      const data = {};
      (async (data)=>{
				let res = await self.$api.getChannelGameList({data})
				if(res && res.code == 0) {
          console.log('res', res.data)
          // self.$set(self.formData[1], 'options', res.data)
          // self.formData[1].options = res.data;
          self.cascaderOptions = res.data;
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    // 获取机构列表
    getInsData() {
      const self = this;
      const data = {};
      (async (data)=>{
				let res = await self.$api.QueryInsTree({data})
				if(res && res.code == 0) {
          console.log('res', res.data)
          self.$set(self.formData[1], 'options', res.data)
          // self.formData[1].options = res.data;
          self.cascaderOptions = res.data;
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    creatChannel(row) {
      const self = this;
      const data = {
        orderId: row.orderId
      };
      (async (data)=>{
				let res = await self.$api.creatChannel({data})
				if(res && res.code == 0) {

				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    deleteResource(index) {
      this.resourceData.splice(index, 1);
    },
    addResource() {
      let obj = {
        title:'资源类型',
        type:'',model:'',
        name:'',number:'',
        optionsType:typeData,
        optionsName:nameData,
        optionsModel:modelData,
      }
      this.$set(this.resourceData, this.resourceData.length, obj);
    },
    handleExceed() {},
    handleRemove() {},
    handlePreview() {},
    beforeRemove() {},
    changeSwitchBet(val) {
      // this.switchBetText = val ? '允许' : '禁止'
    },
    changeSwitchCash(val) {
      // this.switchBetText = val ? '允许' : '禁止'
    },
    deleteMember(index) {
      this.workerData.splice(index, 1)
      this.memberArray.splice(index, 1)
      console.log('删除', this.memberArray)
    },
    addMember() { // 添加成员
      let cloneData = JSON.parse(JSON.stringify(this.workerData[0]))
      cloneData.forEach((item)=>{
        item.prop = `${item.prop}${this.workerData.length}`
        item.value = ''; // 数据要情空
        if(item.type=='radio') {
          item.value = '1' // 默认为男
        }
      })
      this.$set(this.workerData, this.workerData.length, cloneData);
    },
    handleClick() {},
    changeForm(val) {
      this.params = Object.assign(this.params, val)
      console.log('派发出来的参数', this.params)
      let array = []// 用于传参（人员信息数组列表）给后台
      this.workerData.forEach((item)=>{
        let obj = {};
        item.forEach((list)=>{
          obj[list.prop] = this.params[list.prop];
          // 先保存输入数据 因为删除的时候会刷新数据
          list.value = this.params[list.prop];
        })
        array.push(obj)
      })
      this.memberArray = array;
      console.log('array', array)
      console.log('member', this.memberArray)
    },
    submit() {
      console.log('设备参数', this.deviceParam)
      this.$refs.baseForm.validate((val)=>{
        console.log(val)
        self.creatChannel();
      });
    },
  },
  components: {}
};
</script>


<style lang="less" scoped>
@import "./less/index.less";
.addMember,
.addDevice{
  width: 100%;
  max-width: 490px;
  margin: 0 0 30px 20px;
}
.addDevice{
  max-width: 468px;
  margin-left: 108px;
}
.vlt-card{
  margin-bottom: 10px;
}
.title-wrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.delete{
  padding-right: 30px;
}
.table, 
.device-form{
  padding: 16px;
}
.device-item{
  margin-right: 15px;
  width: 160px;
}
.submit-wrap{
  text-align: right;
  padding: 10px 0;
}
.flex-wrap{
  display: flex;
  align-items: center;
  .label{
    color: #444;
    font-size: 12px;
    flex: none;
    margin: 0 8px;
  }
}
// .addMember:focus{
//   background: #FFF;
//   border: 1px solid #DCDFE6;
//   color: #606266;
// }
</style>
