<template>
  <div class="vlt-card">
    <panel title="游戏销售权限" :show="true" style="margin-bottom:10px">
      <el-form label-position="right" 
        label-width="90px" 
        ref="form"
        class="device-form">
        <el-form-item  label="请选择类型">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="vlt-edit-single">
          <div class="vlt-edit-wrap">
            <base-form :formData="formData" labelWidth="90px" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
          </div>
        </div>
      </el-form>
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

<script type="text/javascript">

export default {
  name: "",
  data() {
    return {
      tableData: [
        {gameName:'a',bet: false,cash:true,time:''},
        {gameName:'b',bet: false,cash:true,time:''},
        {gameName:'c',bet: true,cash:false,time:''},
      ],
      formData: [],
      channelData: [],
      areaData: [],
    }
  },
  components: {
  },
  methods: {
    changeSwitchBet(val) {
      // this.switchBetText = val ? '允许' : '禁止'
    },
    changeSwitchCash(val) {
      // this.switchBetText = val ? '允许' : '禁止'
    },
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
.submit-wrap{
  text-align: right;
  padding: 10px 0;
}
.vlt-card{
  margin-bottom: 10px;
}
.table{
  padding: 16px;
}
</style>
