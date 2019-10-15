<template>
  <div class="vlt-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="渠道新建" name="first"></el-tab-pane>
      <el-tab-pane label="渠道新建流程图" name="second"></el-tab-pane>
    </el-tabs>
    <panel title="基本信息" :show="true" style="margin-bottom:10px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <base-form :formData="formData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="人员信息" :show="true" style="margin-bottom:10px">
      <div class="vlt-edit-single" v-for="(item, index) in workerData" :key="index">
        <div v-if="index!==0" class="title-wrap">
          <h2 class="title">{{`人员信息(${index+1})`}}</h2>
          <el-button type="text" class="delete" @click="deleteMember(index)">删除</el-button>
        </div>
        <div class="vlt-edit-wrap">
          <base-form :formData="workerData[index]" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        </div>
      </div>
      <el-button class="addMember" @click="addMember" icon="el-icon-plus">添加成员</el-button>
    </panel>
    <panel title="财务信息" :show="true" style="margin-bottom:10px">
      <div class="vlt-edit-single">
        <div class="vlt-edit-wrap">
          <base-form :formData="financeData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
        </div>
      </div>
    </panel>
    <panel title="销售游戏" :show="true" style="margin-bottom:10px">
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
    <panel title="发放设备" :show="true" style="margin-bottom:10px">
      <el-form label-position="right" label-width="90px" ref="form"
        :model="formDevice"
        :rules="rules"
        class="device-form">
        <el-form-item v-for="(item,index) in deviceData" :key="index" :label="`${item.title}${index+1}`">
          <el-select v-model="item.type" placeholder="请选择设备类型" class="device-item">
            <el-option
              v-for="(list,index) in item.optionsType"
              :key="index"
              :label="list.label"
              :value="list">
            </el-option>
          </el-select>
          <el-select v-model="item.model" placeholder="请选择设备型号" class="device-item">
            <el-option
              v-for="(list, index) in item.optionsModel"
              :key="index"
              :label="list.label"
              :value="list">
            </el-option>
          </el-select>
          <el-button v-if="index!==0" type="text" class="delete" @click="deleteDevice(index)">删除</el-button>
        </el-form-item>
      </el-form>
      <el-button class="addDevice" @click="addDevice" icon="el-icon-plus">添加设备</el-button>
    </panel>
    <panel title="其他附件" :show="true" style="margin-bottom:10px">
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
export default {
  name: "channelList",
  data() {
    return {
      activeName: "first",
      formData: [
        {title: '所属机构', type: 'cascader', prop: 'insCode', value: '',  options: []},
        {title: '渠道类型', type: 'select', prop: 'channelType', value: '', options:[{label:'自营厅',value:'1'},{label:'合作厅',value:'2'}]},
        {title: '渠道编号', type: 'input', prop: 'channelCode', value: ''},
        {title: '经营场所属性', type: 'select', prop: 'addressType', value: '', options:[{label:'自有',value:'1'},{label:'租赁',value:'2'}]},
        {title: '渠道面积', type: 'input', prop: 'channelCode', value: ''},
        {title: '渠道地址', type: 'address', prop: 'address', value: '',options:[]},
      ],
      workerData: [
        [{title: '职位类别', type: 'select', prop: 'workerType', value: '', options:[{label:'大厅经理',value:'1'},{label:'普通职员',value:'2'}]},
        {title: '姓名', type: 'input', prop: 'name', value: ''},
        {title: '性别', type: 'radio', prop: 'sex', value: 1, options: [{ key: 1, value: "男" }, { key: 2, value: "女" }]},
        {title: '手机号码', type: 'input', prop: 'mobile', value: ''},
        {title: '身份证号码', type: 'input', prop: 'idCard', value: ''},
        {title: '身份证照正面', type: 'upload', prop: 'idCardPre', value: ''},
        {title: '身份证照背面', type: 'upload', prop: 'idCardBack', value: ''}]
      ],
      financeData: [
        {title: '销售保证金', type: 'select', prop: 'workerType', value: '', options:[{label:'大厅经理',value:'1'},{label:'普通职员',value:'2'}]},
        {title: '代销费费率', type: 'select', prop: 'workerType', value: '', options:[{label:'大厅经理',value:'1'},{label:'普通职员',value:'2'}]},
        {title: '收款凭证', type: 'upload-drag', prop: 'idCardBack', value: ''}
      ],
      deviceData: [
        {title:'设备', propType: 'type', propModel: 'model', optionsType:[{label:'类型一',value:1},{label:'类型二',value:2}],optionsModel:[{label:'型号一',value:1},{label:'型号二',value:2}]}
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
      formDevice:{}
    };
  },
  created() {},
  methods: {
    addDevice() {
      let cloneData = JSON.parse(JSON.stringify(this.deviceData[0]))
      cloneData.propType = `${cloneData.propType}${this.deviceData.length}`
      cloneData.propModel = `${cloneData.propModel}${this.deviceData.length}`
      this.$set(this.deviceData, this.deviceData.length, cloneData);
    },
    deleteDevice(index) {
      this.deviceData.splice(index, 1)
      console.log('删除', this.deviceData)
    },
    changeSwitchBet(val) {
      // this.switchBetText = val ? '允许' : '禁止'
    },
    changeSwitchCash(val) {
      // this.switchBetText = val ? '允许' : '禁止'
    },
    deleteMember(index) {
      this.workerData.splice(index, 1)
      console.log('删除', this.workerData)
    },
    addMember() {
      let cloneData = JSON.parse(JSON.stringify(this.workerData[0]))
      cloneData.forEach((item)=>{
        item.prop = `${item.prop}${this.workerData.length}`
      })
      this.$set(this.workerData, this.workerData.length, cloneData);
    },
    handleClick() {},
    changeForm(val) {
      this.params = Object.assign(this.params, val)
      console.log('派发出来的参数', this.params)
      let array = [] // 用于传参（人员信息数组列表）给后台
      this.workerData.forEach((item)=>{
        let obj = {};
        item.forEach((list)=>{
          obj[list.prop] = this.params[list.prop];
          // 先保存输入数据 因为删除的时候会刷新数据
          list.value = this.params[list.prop];
        })
        array.push(obj)
      })
      console.log('array', array)
      
      console.log('workerData', this.workerData)
    },
    submit() {
      this.$refs.baseForm.validate((val)=>{
        console.log(val)
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
  margin-left: 60px;
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
  margin-right: 20px;
}
.submit-wrap{
  text-align: right;
  padding: 10px 0;
}
// .addMember:focus{
//   background: #FFF;
//   border: 1px solid #DCDFE6;
//   color: #606266;
// }
</style>
