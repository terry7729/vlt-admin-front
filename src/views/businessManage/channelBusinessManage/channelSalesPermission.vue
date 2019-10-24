<template>
  <div class="vlt-card">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="销售权限" name="1">
        <panel title="销售权限" :show="true" style="margin-bottom:15px">
          <div class="vlt-edit-single">
            <div class="vlt-edit-wrap">
              <el-form label-position="right" 
                label-width="90px" 
                :model="form"
                ref="form"
                class="device-form">
                <el-form-item  label="修改方式">
                  <el-select v-model="form.type" placeholder="请选择">
                    <el-option
                      v-for="item in channelData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item  label="渠道区域">
                  <el-cascader size="small" 
                    v-model="form.channel"
                    :options="areaData" 
                    placeholder="请选择渠道区域"></el-cascader>
                </el-form-item>
                <el-form-item  label="渠道编码">
                  <el-input v-model="form.channelCode" placeholder="请输入渠道编码"></el-input> 
                </el-form-item>
              </el-form>
            </div>
          </div>
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
                  placeholder="`请选择生效时间">
                </el-date-picker>
              </template>
            </el-table-column>
          </el-table>
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
      </el-tab-pane>
      <el-tab-pane label="销售权限流程图" name="2">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "",
  data() {
    return {
      activeName: '1',
      tableData: [
        {gameName:'a',bet: false,cash:true,time:''},
        {gameName:'b',bet: false,cash:true,time:''},
        {gameName:'c',bet: true,cash:false,time:''},
      ],
      form: {
        type: '',
        channel: '',
        channelCode: ''
      },
      channelData: [],
      areaData: [],
      fileList: []
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
    submit() {},
    changeSwitchBet(val) {
      // this.switchBetText = val ? '允许' : '禁止'
    },
    changeSwitchCash(val) {
      // this.switchBetText = val ? '允许' : '禁止'
    },
    handleExceed() {},
    beforeRemove() {},
    handleRemove() {},
    handlePreview() {}
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
