<template>
 <div class="vlt-card">
      <div class="vlt-edit-over">
        <h2 class="title">试玩计划详情</h2>
        <div class="vlt-edit-wrap">
          <el-form label-position="top" label-width="90px" :model="form" ref="form">
            <el-form-item label="试玩计划名称">
              <el-select v-model="form.planName" placeholder="请选择">
                <el-option
                  v-for="item in nameOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="游戏名称">
              <el-input v-model="form.gameName"></el-input>
            </el-form-item>
            <el-form-item label="试玩渠道">
              <el-select v-model="form.channel" multiple placeholder="请选择">
                <el-option
                  v-for="item in channelOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始试玩时间">
                <el-date-picker
                  v-model="form.startTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="试玩范围">
              <el-select v-model="form.rang" placeholder="请选择">
                <el-option
                  v-for="item in rangOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="试玩终端">
              <el-select v-model="form.terminal" multiple placeholder="请选择">
                <el-option
                  v-for="item in terminalOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结束试玩时间">
                <el-date-picker
                  v-model="form.endTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="试玩区域">
              <el-select v-model="form.area" multiple placeholder="请选择">
                <el-option
                  v-for="item in areaOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="试玩计划说明 " prop="cash">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4}"
                placeholder="请输入内容"
                v-model="form.textarea"
              ></el-input>
            </el-form-item>
          </el-form>
          
          <el-row class="vlt-edit-btn">
            <el-button type="primary" v-prevent="1000" size="medium" @click="save">提交并保存</el-button>
            <el-button size="medium" @click="editShow = !editShow">取消</el-button>
          </el-row>
        </div>
      </div>
 </div>
</template>

<script type="text/javascript">
export default {
 name: "planEdit",
 data() {
 return {
   form: {
        planName: "",
        gameName: "",
        channel: "",
        startTime:'',
        rang:'',
        terminal:'',
        endTime:'',
        area:'',
        bet: "",
        logOff: "",
        textarea: ""
      },
      nameOption:[
        {value:"选项一",label:"开心一刻"},
        {value:"选项二",label:"三江风光"}
      ],
      channelOption:[
        {value:"选项一",label:"10001"},
        {value:"选项二",label:"10003"}
      ],
      rangOption:[
        {value:"选项一",label:"试玩区域"},
        {value:"选项二",label:"试玩终端"}
      ],
      terminalOption:[
        {value:"选项一",label:"SC001"},
        {value:"选项二",label:"SC002"}
      ],
      areaOption:[
        {value:"选项一",label:"深圳"},
        {value:"选项二",label:"广东"}
      ],
      
      betOption:[]
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
      //保存
      save(formName){
        const self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            if (self.editData && !self.editData.isAdd) {
              self.save(self.editData.id);
            } else {
              self.openConfirm();
            }
          } else {
            return false;
          }
        });
      }
 },
}
</script>

<style lang="less" scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>

