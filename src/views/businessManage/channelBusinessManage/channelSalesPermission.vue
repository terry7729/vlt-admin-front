<template>
  <div class="vlt-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="销售权限" name="1">
        <panel title="销售权限" :show="true" style="margin-bottom:15px">
          <div class="vlt-edit-single">
            <div class="vlt-edit-wrap">
              <el-form
                label-position="right"
                label-width="90px"
                :model="form"
                ref="form"
                class="device-form"
              >
                <el-form-item label="修改方式">
                  <el-select v-model="form.type" placeholder="请选择">
                    <el-option label="渠道区域" value="1"></el-option>
                    <el-option label="渠道编码" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="渠道区域" v-show="form.type=='1'">
                  <el-cascader
                    size="small"
                    v-model="form.insId"
                    :options="areaData"
                    :props="setProps"
                    @change="insIdChange"
                    placeholder="请选择渠道区域"
                  ></el-cascader>
                </el-form-item>
                <el-form-item label="渠道编码" v-show="form.type=='0'">
                  <el-input v-model="form.channelNo" placeholder="请输入渠道编码"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <el-table :data="tableData" border class="table">
            <el-table-column prop="id" label="序号" width="80px"></el-table-column>
            <el-table-column label="游戏名称" prop="gameName"></el-table-column>
            <el-table-column label="投注权限">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.throwRight"
                  @change="changeSwitchBet"
                  :active-text="scope.row.throwRight?'允许':'禁止'"
                  active-color="#409EFF"
                  inactive-color
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="兑奖权限">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.cashRight"
                  @change="changeSwitchCash"
                  :active-text="scope.row.cashRight?'允许':'禁止'"
                  active-color="#409EFF"
                  inactive-color
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="销售时间">
              <template slot-scope="scope">
                <el-time-picker
                  is-range
                  v-model="scope.row.time"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                ></el-time-picker>
              </template>
            </el-table-column>
          </el-table>
        </panel>
        <panel title="其他附件" :show="true" style="margin-bottom:15px">
          <el-form label-position="right" label-width="90px" ref="form" class="device-form">
            <el-form-item label="附件上传">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
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
      <el-tab-pane label="销售权限流程图" name="2"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import moment from "moment";
export default {
  name: "",
  data() {
    return {
      activeName: "1",
      tableData: [],
      form: {
        type: "1",
        channelNo: "",
        insId: ""
      },
      areaData: [],
      setProps: {
        label: "text",
        value: "id",
        children: "children",
        checkStrictly: true
      },
      fileList: []
    };
  },
  created() {
    this.getInsData();
  },
  methods: {
    async insIdChange() {
      if (this.form.insId !== null) {
        this.form.insId = this.form.insId[this.form.insId.length - 1];
      }
      let data = this.form;
      let res = await this.$api.queryGameRight({ data });
      if (res && res.code === 0) {
        this.tableData = res.data;
        for (let item of this.tableData) {
          if (item.throwRight === 0) {
            item.throwRight = false;
          } else {
            item.throwRight = true;
          }
          if (item.cashRight === 0) {
            item.cashRight = false;
          } else {
            item.cashRight = true;
          }
        }
      }
    },

    getInsData() {
      const self = this;
      const data = {};
      (async data => {
        let res = await self.$api.QueryInsTree({ data });
        if (res && res.code == 0) {
          this.areaData = res.data;
        } else {
        }
      })(data);
    },

    async submit() {
      for (let item of this.tableData) {
        if (item.time) {
          item.sellBeginTime = item.time[0];
          item.sellEndTime = item.time[1];
        }
        item.sellBeginTime = moment(item.sellBeginTime).format("HH:mm:ss");
        item.sellEndTime = moment(item.sellEndTime).format("HH:mm:ss");
        delete item.time;
      }
   
      let res = await this.$api.updateGameRight({
        data: {
          ...this.form,
          gameRights: this.tableData
        }
      });
      console.log(res);
    },
    changeSwitchBet(val) {
      // console.log(val);
    },
    changeSwitchCash(val) {},
    handleClick() {},
    handleExceed() {},
    beforeRemove() {},
    handleRemove() {},
    handlePreview() {}
  }
};
</script>

<style lang="less" scoped>
@import "./less/index.less";
.submit-wrap {
  text-align: right;
  padding: 10px 0;
}
.vlt-card {
  margin-bottom: 10px;
}
.table {
  padding: 16px;
}
</style>
