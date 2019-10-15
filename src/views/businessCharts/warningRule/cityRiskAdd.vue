<template>
  <div class="vlt-card">
    <h3 class="headling">城市风险指标新增</h3>
    <div class="vlt-card select-box">
      <el-table
        :data="tableData"
        border
        style="width: 30%"
        :header-cell-style="{background:'rgba(240,240,240,.5)'}"
        :cell-style="{align:'center'}"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="type" label="标准配置"></el-table-column>
      </el-table>
      <div class="btn">
        <el-button type="primary" @click="selectTypes" class="selectSure">确认</el-button>
      </div>
    </div>
    <div class="vlt-card showbox" v-show="showeditBox">
      <el-form label-position="top" label-width="80px" ref="form" :model="form">
        <el-form-item class="lalala">
          <div v-for="item in type" class="editfrom">
            <el-form-item>
              <span slot="label">{{item.type}}</span>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="普通">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="严重">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="重大">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
        </el-form-item>
        <div class="editfrom">
          <el-form-item prop="date2" label="监控时间点">
            <el-time-picker placeholder="选择时间" v-model="form.date1" style="width: 100%;"></el-time-picker>
          </el-form-item>
          <el-form-item prop="date2" label="监控时间点">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
          <el-form-item prop="date2" label="监控时间点">
            <el-time-picker placeholder="选择时间" v-model="form.date3" style="width: 100%;"></el-time-picker>
          </el-form-item>
          <el-form-item prop="date2" label="监控频率">
            <el-input-number
              v-model="num"
              controls-position="right"
              @change="handleChange"
              :min="1"
              :max="100"
              :step="10"
              size="medium"
            ></el-input-number>
          </el-form-item>
        </div>
        <el-form-item>
          <div class="btn">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import rules from "@/utils/rules.js";
export default {
  data() {
    return {
      num:10,
      type: null,
      showeditBox: false,
      tableData: [
        { type: "最高销量" },
        { type: "最低销量" },
        { type: "最低在线数量" },
        { type: "最低开机律" },
        { type: "最低单厅销量" }
      ],
      controlOptions: [
        { name: "确认", type: "primary", icon: "" } // type为按钮的五种颜色， icon为具体的图标
      ],
      form: {
        date1: "",
        date2: "",
        date3: "",
        date4: "",
        name: "",
        type: "",
        state: "",
        pond: "",
        desc: "",
        developersName: "",
        linkMan: "",
        phoneNumber: "",
        email: "",
        faxaphone: "",
        address: "",

        packageName: "",
        versionName: "",
        versionNumber: "",
        softwareSize: "",
        softwareDesc: "",
        newCharacter: ""
      },
      rules2: {
        test: [
          { required: true, validator: rules.checkEmail, trigger: "blur" }
        ],
        status: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        all: [{ required: true, validator: rules.checkEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      console.log("submit!");
    },
    selectChange(val) {
      this.showeditBox = false;
      this.type = val;
    },
    select(val) {
      if (val.name === "确认") {
        this.selectTypes();
      }
    },
    selectTypes() {
      if (this.type) {
        if (this.type.length > 0) {
          this.showeditBox = true;
          console.log(this.type);
        }
      }
    }
  }
};
</script>

<style lang='less' scoped>
.selectSure {
  margin-top: 20px;
}
.select-box {
  margin-bottom: 20px;
  width: 60%;
  /deep/ .el-table {
    width: 100% !important;
  }
}
.showbox {
  width: 60%;
}
.btn {
  text-align: right;
}
.headling {
  margin-bottom: 20px;
  font-weight: normal;
}
/deep/ .el-form {
  // width: 60%;

  .editfrom {
    display: flex;
    flex-wrap: wrap;
    > .el-form-item {
      flex: 20%;
      margin-right: 20px;
    }
  }
}
</style>
