<template>
  <div class="vlt-card">
    <h3 class="headling">城市风险指标新增</h3>
    <div class="vlt-card select-box">
      <span>省份</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>城市</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-table
        :data="tableData"
        border
        :header-cell-style="{background:'rgba(240,240,240,.5)'}"
        :cell-style="{align:'center'}"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="type" label="标准配置"></el-table-column>
      </el-table>
    </div>
    <div class="vlt-card showbox" v-show="showeditBox">
      <el-form label-position="top" label-width="80px" ref="form" :model="form">
        <el-form-item class="lalala">
          <div v-for="item in type" class="editfrom">
            <el-form-item>
              <span slot="label">{{item.type}}</span>
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
          <el-form-item prop="date2" label="监控时间点">
            <el-time-picker placeholder="选择时间" v-model="form.date3" style="width: 100%;"></el-time-picker>
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
    <div>
      <el-table
        :data="tableData1"
        border
        style="width: 70%"
        :header-cell-style="{background:'rgba(240,240,240,.5)'}"
        :cell-style="{align:'center'}"
        @selection-change="selectChange"
      >
        <el-table-column align="center" prop="warningLevel" label="告警等级"></el-table-column>
        <el-table-column align="center" prop="type" label="通知方式" width="360">
          <template slot-scope="scope">
            <div v-if="scope.row.warningLevel==='普通'">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="站内" border size="medium" disabled></el-checkbox>

                <el-checkbox label="邮件" border size="medium" disabled></el-checkbox>
                <el-checkbox label="短信" border size="medium" disabled></el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-if="scope.row.warningLevel==='严重'">
              <el-checkbox-group v-model="checkList1">
                <el-checkbox label="站内" border size="medium" disabled></el-checkbox>

                <el-checkbox label="邮件" border size="medium" disabled></el-checkbox>
                <el-checkbox label="短信" border size="medium" disabled></el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-if="scope.row.warningLevel==='重大'">
              <el-checkbox-group v-model="checkList2">
                <el-checkbox label="站内" border size="medium" disabled></el-checkbox>

                <el-checkbox label="邮件" border size="medium" disabled></el-checkbox>
                <el-checkbox label="短信" border size="medium" disabled></el-checkbox>
              </el-checkbox-group>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="type" label="通知对象 " width="400"></el-table-column>
        <el-table-column align="center" prop="warningLevel" label="告警频率">
          <el-input-number
            v-model="num"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="100"
            :step="10"
            size="mini"
          ></el-input-number>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import rules from "@/utils/rules.js";
export default {
  data() {
    return {
      num: 10,
      checked3: false,
      checkList: ["站内"],
      checkList1: ["站内", "短信"],
      checkList2: ["站内", "短信", "邮件"],
       tableData1: [
        {
          warningLevel: "普通"
        },
        {
          warningLevel: "严重"
        },
        {
          warningLevel: "重大"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      num: 10,
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
      this.type = val;
      if (this.type) {
        if (this.type.length > 0) {
          this.showeditBox = true;
        } else {
          this.showeditBox = false;
        }
      }
    }
  }
};
</script>

<style lang='less' scoped>
.el-select {
  margin-right: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
}
.selectSure {
  margin-top: 20px;
}
.select-box {
  margin-bottom: 20px;
  width: 70%;
  /deep/ .el-table {
    width: 100% !important;
  }
}
.showbox {
  width: 70%;
  margin-bottom: 20px;
}
.btn {
  text-align: right;
}
.headling {
  margin-bottom: 20px;
  font-weight: normal;
    padding: 15px 0;
  border-bottom: 1px solid #ccc;
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
