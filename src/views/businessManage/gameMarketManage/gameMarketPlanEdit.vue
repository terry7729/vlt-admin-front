<template>
 <div class="vlt-card">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="1">
        <base-info :planData="planData" :insData="insData" :insArray="insArray" @submit="submit"></base-info>
      </el-tab-pane>
      <el-tab-pane label="游戏配置" name="2">
        <game-set :planData="planData" @submit="submit"></game-set>
      </el-tab-pane>
      <el-tab-pane label="上传附件" name="3">
        <div class="vlt-edit-single appendix">
          <div class="vlt-edit-wrap">
            <el-form label-position="right" 
              label-width="90px" 
              ref="form"
              class="soft-form">
              <el-form-item label="上传附件">
                <el-upload
                  class="upload-demo"
                  drag
                  multiple
                  action=""
                  :limit="10"
                  :show-file-list="true"
                  :on-remove="handleRemove"
                  :http-request="uploadFileOther">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
              </el-form-item>
            </el-form>
            <!-- <base-form :formData="appendixData" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form> -->
            <el-row class="vlt-edit-btn">
              <el-button type="primary" v-prevent="1000" size="medium" @click="submit">提交并保存</el-button>
              <el-button size="medium" @click="cancel" class="cancel">取 消</el-button>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
 </div>
</template>

<script type="text/javascript">
import BaseInfo from './gameMarketPlanEditBase'
import GameSet from './gameMarketPlanEditControl'
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
      planData: {},
      insData: [],
      insArray: [],
    }
  },
  created() {
    this.getMarketPlanDetail()
    // this.getInsData()
  },
  methods: {
    // 获取计划详情
    getMarketPlanDetail() {
      const self = this;
      const data = {
        id: this.$route.query.id,
        gameId: this.$route.query.gameId
      };
      (async (data)=>{
        let res = await self.$api.getMarketPlanDetail({data})
				if(res && res.code == 0) {
          // self.$message.success('注销成功')
          this.planData = res.data;
          this.insId = res.data.gameListPlanVo.gameSaleArea.split(',');
          self.getInsData();
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    // 返回机构完整数组
    getInsArray(id, obj) {
      let array = [];
      array.push(obj.id)
      if(id&&id!=obj.id) {
        obj.children.forEach((item)=>{
          if(item.id == id) {
            array[1] = item.id
            return array
          }else{
            item.children&&item.children.forEach((list)=>{
              if(list.id==id) {
                array[1] = item.id
                array[2] = list.id
                return array
              }else{
                list.children&&list.children.forEach((el)=>{
                  if(el.id==id) {
                    array[1] = item.id
                    array[2] = list.id
                    array[3] = el.id
                    return array
                  }
                })
              }
            })
          }
        })
      }
      this.insArray.push(array);
      console.log('getInsArray',array)
      console.log('getInsArrays',this.insArray)
      return array
    },
    // 获取机构数据
    getInsData() {
      const self = this;
      const data = {};
      (async data =>  {
        let res = await self.$api.QueryInsTree({data})
        if(res && res.code == 0) {
          console.log('res', res.data)
          self.insData = res.data;
          // self.$set(self.baseData[4], 'options', res.data)
          // self.formData[1].options = res.data;
          // self.cascaderOptions = res.data;
          self.insId&&self.insId.forEach((item)=>{
            self.getInsArray(item, res.data[0]) // 传入id 和对象
          })
        } else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    handleClick() {

    },
    handleRemove() {

    },
    // 附件上传
    async uploadFileOther(files) {
      let formData = new FormData();
      console.log('files', files.file.size/1024)
      // this.softData[3].value = `${(files.file.size/1024).toFixed()}`
      formData.append('file', files.file);
      formData.append('refId', 1);
      formData.append('flag', true);
      formData.append('busType', 9);
      const res = await this.$api.testUpload({
        data: formData,
        onUploadProgress(evt) {
          console.log('上传进度事件:', evt)
        }
      })
      console.log('uploadFile', res);
      this.gameOtherId = res.data.fileId;
    },
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
    submit(param){
      const self = this;
      console.log('部分数据', param)
      console.log('总共的参数', this.planData)
      Object.assign(this.planData.gameListPlanVo, param)
      
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
    padding: 0;
    .vlt-edit-wrap{
      padding-left: 0;
    }
  }
</style>

