<template>
  <div class="vlt-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="渠道新建" name="first"></el-tab-pane>
      <el-tab-pane label="渠道新建流程图" name="second"></el-tab-pane>
    </el-tabs>
    <panel title="基本信息" :show="true" style="margin-bottom:15px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <base-form :formData="formData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeBaseForm"></base-form>
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
          <base-form :formData="financeOptions" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeFinanceForm"></base-form>
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
              <el-input v-model="betCard.depositMoney" placeholder="请输入金额（元）"></el-input>
            </el-form-item>
            <el-form-item label="押金金额" v-if="betCard.depositSet==2">
              <div class="flex-wrap">
                <div class="flex-wrap"><span class="label">累计大于</span><el-input v-model="betCard.depositMoreThan" placeholder="请输入数量（张）"></el-input></div>
                <div class="flex-wrap"><span class="label">金额</span><el-input v-model="betCard.depositMoney" placeholder="请输入金额（元）"></el-input></div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </panel>
    <panel title="销售游戏" :show="true" style="margin-bottom:15px">
      <el-table :data="tableData" border class="table">
        <el-table-column label="序号" type="index" width="55px"></el-table-column>
        <el-table-column label="游戏名称" prop="gameName"></el-table-column>
        <el-table-column label="投注权限">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.throwRight"
              @change="changeSwitchBet"
              :active-text="scope.row.throwRight?'允许':'禁止'"
              active-color="#409EFF"
              inactive-color="">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="兑奖权限">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.cashRight"
              @change="changeSwitchCash"
              :active-text="scope.row.cashRight?'允许':'禁止'"
              active-color="#409EFF"
              inactive-color="">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="开始销售时间" min-width="140px">
          <template slot-scope="scope">
            <el-time-picker
              v-model="scope.row.sellBeginTime"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              placeholder="请选择开始时间">
            </el-time-picker>
          </template>
        </el-table-column>
        <el-table-column label="结束销售时间" min-width="140px">
          <template slot-scope="scope">
            <el-time-picker
              v-model="scope.row.sellEndTime"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              placeholder="请选择结束时间">
            </el-time-picker>
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
          <el-select v-model="item.goodsType" @change="selectResourceType(index)" placeholder="请选择资源类型" class="device-item">
            <el-option
              v-for="(list, index) in item.optionsType"
              :key="index"
              :label="list.label"
              :value="list.value">
            </el-option>
          </el-select>
          <el-select v-model="item.id" placeholder="请选择资源名称" class="device-item">
            <el-option
              v-for="(list,index) in item.optionsName"
              :key="index"
              @click.native="selectResourceName(index)"
              :label="list.label"
              :value="list.value">
            </el-option>
          </el-select>
          <el-select v-model="item.modelId" v-if="item.optionsModel.length>0" @change="selectResourceModel" placeholder="请选择设备型号" class="device-item">
            <el-option
              v-for="(list, index) in item.optionsModel"
              :key="index"
              :label="list.deviceModel"
              :value="list.modelId">
            </el-option>
          </el-select>
          <el-input v-model="item.num" class="device-item" placeholder="请输入数量"></el-input>
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
import moment from 'moment'
const typeData = [
  {label:'设备',value:1},
  {label:'配件',value:2},
  {label:'耗材',value:3},
  {label:'设施',value:4},
];
const modelData = [
  {label:'型号一',value:'7'},
  {label:'型号二',value:'8'},
  {label:'型号三',value:'9'},
];
export default {
  name: "channelList",
  // mixins: [mixin],
  data() {
    return {
      isAddMember: false,
      betCard: { // 投注卡的数据
        charge:'20',
        amount:'2',
        depositSet: '0', // 押金设置 0-不收费；1-收费，2-按投注卡申请量收费
        depositMoreThan: '',
        depositMoney: '' // 押金金额
      },
      resourceData: [ // 发放资源数据
        {title:'资源类型',goodsType:'',modelId:'',id:'',num:'',optionsType:typeData, optionsName:[],optionsModel:[],}
      ],
      radio: '1',
      fileList: [],
      activeName: "first",
      formData: [
        {title: '所属机构', type: 'cascader', prop: 'insId', value: '', options: [],
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            // multiple: true, // 多选
            checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
          }
        },
        {title: '渠道类型', type: 'select', prop: 'channelType', value: '', options:[{label:'自营厅',value:0},{label:'合作厅',value:1}]},
        {title: '渠道编号', type: 'input', prop: 'channelNo', value: 'sc001'},
        {title: '经营场所属性', type: 'select', prop: 'runField', value: '', options:[{label:'自有',value:0},{label:'租赁',value:1}]},
        {title: '渠道面积', type: 'input', prop: 'pointArea', value: '45'},
        {title: '渠道地址', type: 'address', prop: 'channelAddress', value: '',options:[]},
      ],
      workerData: [
        [{title: '角色名称', type: 'select', prop: 'roleId', value: '', options:[]},
        {title: '姓名', type: 'input', prop: 'accountName', value: '小李'},
        {title: '性别', type: 'radio', prop: 'sex', value: '女', options: [{ label: '男', value: "男" }, { label: '女', value: "女" }]},
        {title: '手机号码', type: 'input', prop: 'phone', value: '13012345678'},
        {title: '身份证号码', type: 'input', prop: 'channelIdentity', value: '360788200010102020'},
        {title: '身份证照正面', type: 'upload', prop: 'photo', value: ''},
        {title: '身份证照背面', type: 'upload', prop: 'photo', value: ''}]
      ],
      financeOptions: [
        {title: '合作预交款', type: 'input', prop: 'coPrepareMoney', value: 100},
        {title: '授信额度', type: 'input', prop: 'creditQuota', value: 200},
        {title: '代销费费率', type: 'input', prop: 'agentSellRate', value: 20},
        {title: '收款凭证', type: 'upload-drag', prop: 'evidence', value: ''}
      ],
      deviceData: [
        {title:'设备', propType: 'type', propModel: 'model', optionsType:[{label:'类型一',value:1},{label:'类型二',value:2}],optionsModel:[{label:'型号三',value:3},{label:'型号四',value:4}]}
      ],
      rules: {},
      params: {
        workerList:[],
      },
      nameData: [],
      resourceDatas: [], // 点击资源类型 获取数据
      tableData: [],
      formDevice:{},
      deviceParam: [], // 用于保存设备的参数
      resourceIndex: '',
      channelData: null, // 渠道基本信息参数
      financeData: null, // 账户资金参数
      channelFundData: [], // 人员信息参数
      gameRightList: null, // 销售权限参数
    };
  },
  watch: {
    resourceData: {
      handler(newValue, oldValue) {
        let res = JSON.parse(JSON.stringify(newValue));
        let params = []
        res.forEach((item)=>{
          // 保留你需要的参数
          let param = (({goodsType, modelId, id, num}) =>({goodsType, modelId, id, num}))(item);
          params.push(param)
        })
        this.deviceParam = params;
        console.log('params', params)
      },
      // 深度监听 监听对象，数组的变化
      deep: true
    },
  },
  created() {
    this.getInsData()
    this.getChannelGameList()
    this.getAccountRole()
  },
  methods: {
    changeBaseForm(val) {
      console.log('基础信息表单', val)
      this.channelData = val;
    },
    changeFinanceForm(val) {
      console.log('财务信息表单', val)
      this.financeData = val;
    },
    selectResourceType(index) {
      console.log('选择的资源index', index)
      this.resourceIndex = index;
      console.log('下拉的index', this.resourceData[index].type)
      let data = {
        goodsType: this.resourceData[index].type
      }
      this.getModelTree(data)
    },
    selectResourceName(index) {
      // console.log(index,this.resourceDatas[index])
      // 重置后面下拉框的数据 清空
      this.$set(this.resourceData[this.resourceIndex], 'model', '');
      this.$set(this.resourceData[this.resourceIndex], 'number', '');
      this.$set(this.resourceData[this.resourceIndex], 'optionsModel', this.resourceDatas[index].modelInfoVoList)
  
    },
    selectResourceModel(val) {
      // 重置后面输入框的数据 清空
      this.$set(this.resourceData[0], 'number', '');
      // console.log('设备型号', val)
    },
    // 角色名称
    getAccountRole() {
      const self = this;
      const data = {};
      (async (data)=>{
				let res = await self.$api.accountRole({data})
				if(res && res.code == 0) {
          console.log('res', res.data)
          self.workerData[0][0].options = res.data
          // self.$set(self.formData[1], 'options', res.data)
          // self.formData[1].options = res.data;
          self.cascaderOptions = res.data;
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    // 根据资源类型获取资源名称
    getModelTree(data) {
      const self = this;
      // 重置后面下拉框的数据 清空
      self.nameData =[];
      self.$set(self.resourceData[this.resourceIndex], 'optionsName', []);
      self.$set(self.resourceData[this.resourceIndex], 'name', '');
      self.$set(self.resourceData[this.resourceIndex], 'model', '');
      self.$set(self.resourceData[this.resourceIndex], 'number', '');
      (async (data)=>{
				let res = await self.$api.getModelTree({data})
				if(res && res.code == 0) {
          // console.log('res', res.data)
          this.resourceDatas = res.data;
          res.data.forEach((item, index)=>{
            let obj = {};
            obj.label = item.goodsName;
            obj.value = item.id;
            this.nameData.push(obj)
          })
          this.$set(this.resourceData[this.resourceIndex], 'optionsName', this.nameData)
          // console.log('namedata', this.nameData)
          // this.nameData = res.data;
          // self.$set(self.formData[1], 'options', res.data)
          // self.formData[1].options = res.data;
          self.cascaderOptions = res.data;
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    // 获取渠道 销售游戏列表
    getChannelGameList() {
      const self = this;
      const data = {};
      (async (data)=>{
				let res = await self.$api.getChannelGameList({data})
				if(res && res.code == 0) {
          console.log('res', res.data)
          self.tableData = res.data;
          self.tableData.forEach((item)=>{
            item.throwRight = item.throwRight == 1 ? true : false; //0关闭 1开启
            item.cashRight = item.cashRight == 1 ? true : false;//0关闭 1开启
          })
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
          self.$set(self.formData[0], 'options', res.data)
          // self.formData[1].options = res.data;
          self.cascaderOptions = res.data;
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    // 新建渠道
    createChannel(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.createChannel({data})
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
        goodsType:'',
        modelId:'',
        id:'',
        num:'',
        optionsType: typeData,
        optionsName: [],
        optionsModel: [],
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
    // 人员信息参数
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
      this.channelFundData = array;
      console.log('array', array)
      console.log('member', this.channelFundData)
    },
    submit() {
      console.log('渠道参数', this.memberArray)
      console.log('人员参数', this.channelFundData)
      console.log('投注参数', this.betCard)
      console.log('设备参数', this.deviceParam)
      const self = this;
      this.gameRightList = JSON.parse(JSON.stringify(this.tableData));
      this.gameRightList.forEach(item=>{
        item.cashRight = item.cashRight ? 1 : 0;
        item.throwRight = item.throwRight ? 1 : 0;
        item.sellBeginTime = moment(item.sellBeginTime).format("HH:mm:ss")
        item.sellEndTime = moment(item.sellEndTime).format("HH:mm:ss")
      })
      console.log('销售游戏参数', this.gameRightList)
      // 场所属性和面积 属于财务信息 需要切换
      let channelData = Object.assign(this.channelData, {})
      let financeData = Object.assign(this.financeData, {})
      financeData.pointArea = channelData.pointArea;
      financeData.runField = channelData.runField;
      delete channelData.pointArea
      delete channelData.runField
      let data = {
        channelData: this.channelData, // 渠道基本信息参数
        financeData: this.financeData, // 账户资金参数
        channelFundData: this.channelFundData[0], // 人员信息参数
        gameRightList: this.gameRightList, // 销售权限参数
        warehouseRecordingData: {
          list: this.deviceParam
        }
      }
      console.log('提交的参数', data)
      this.$refs.baseForm.validate((val)=>{
        console.log(val)
        self.createChannel(data);
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
