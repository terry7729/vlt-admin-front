<template>
  <div class="vlt-card">
    <h3 class="headling">城市游戏风险指标新增</h3>
    <div class="vlt-card select-box">
      <span>游戏</span>
      <el-select v-model="gameValue" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.gameId"
          :label="item.gameName"
          :value="item.gameId"
        ></el-option>
      </el-select>
      <span>省份</span>
      <el-select v-model="proviceValue" placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.provinceId"
          :label="item.provinceName"
          :value="item.provinceId"
        ></el-option>
      </el-select>
      <span>城市</span>
      <el-select v-model="cityValue" placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.cityId"
          :label="item.cityName"
          :value="item.cityId"
        ></el-option>
      </el-select>
      <el-table
        :data="tableData"
        border
        style="width: 70%"
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
              <span v-if="item.type==='最低返奖率'">
                <el-input v-model="form.minimumReturnRateOrdinary"></el-input>
              </span>
              <span v-if="item.type==='最高返奖率'">
                <el-input v-model="form.highestReturnRateOrdinary"></el-input>
              </span>
            </el-form-item>
            <el-form-item label="严重">
              <span v-if="item.type==='最低返奖率'">
                <el-input v-model="form.minimumReturnRateSerious"></el-input>
              </span>
              <span v-if="item.type==='最高返奖率'">
                <el-input v-model="form.highestReturnRateSerious"></el-input>
              </span>
            </el-form-item>
            <el-form-item label="重大">
              <span v-if="item.type==='最低返奖率'">
                <el-input v-model="form.minimumReturnRateMajor"></el-input>
              </span>
              <span v-if="item.type==='最高返奖率'">
                <el-input v-model="form.highestReturnRateMajor"></el-input>
              </span>
            </el-form-item>
          </div>
        </el-form-item>
        <div class="editfrom">
          <!-- <el-form-item prop="date2" label="监控时间点">
            <el-time-picker
              is-range
              v-model="value1"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-form-item>-->
          <el-form-item prop="date2" label="监控频率">
            <el-input-number
              v-model="form.collectFrequency"
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
    <div>
      <el-table
        :data="tableData1"
        border
        style="width: 70%"
        :header-cell-style="{background:'rgba(240,240,240,.5)'}"
        :cell-style="{align:'center'}"
      >
        <el-table-column align="center" prop="warningLevel" label="告警等级"></el-table-column>
        <el-table-column align="center" prop="type" label="通知方式" width="360">
          <template slot-scope="scope">
            <div v-if="scope.row.warningLevel==='普通'">
              <el-checkbox-group v-model="checkList" @change="changes">
                <el-checkbox label="站内" border size="medium" v-model="form.informWayOrdinary"></el-checkbox>

                <el-checkbox label="邮件" border size="medium"></el-checkbox>
                <el-checkbox label="短信" border size="medium"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-if="scope.row.warningLevel==='严重'">
              <el-checkbox-group v-model="checkList1">
                <el-checkbox label="站内" border size="medium"></el-checkbox>

                <el-checkbox label="邮件" border size="medium"></el-checkbox>
                <el-checkbox label="短信" border size="medium"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-if="scope.row.warningLevel==='重大'">
              <el-checkbox-group v-model="checkList2">
                <el-checkbox label="站内" border size="medium"></el-checkbox>

                <el-checkbox label="邮件" border size="medium"></el-checkbox>
                <el-checkbox label="短信" border size="medium"></el-checkbox>
              </el-checkbox-group>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="type" label="通知对象 " width="400"></el-table-column>
        <el-table-column align="center" prop="warningPl" label="告警频率">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.warningPl"
              controls-position="right"
              @change="handleChange"
              :min="1"
              :max="100"
              :step="10"
              size="mini"
            ></el-input-number>
          </template>
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
      tableData1: [
        {
          warningLevel: "普通",
          warningPl: 10,
          informWay: 1
        },
        {
          warningLevel: "严重",
          warningPl: 13,
          informWay: 2
        },
        {
          warningLevel: "重大",
          warningPl: 18
        }
      ],
      checkList: ["站内"],
      checkList1: ["站内", "短信"],
      checkList2: ["站内", "短信", "邮件"],
      num: 10,
      value1: "",
      options: [
        {
          gameId: "1",
          gameName: "魂斗罗"
        },
        {
          gameId: "2",
          gameName: "狼和兔子"
        }
      ],
      options1: [
        {
          provinceId: "1",
          provinceName: "广东"
        },
        {
          provinceId: "2",
          provinceName: "广西"
        }
      ],
      options2: [
        {
          cityId: "3",
          cityName: "深圳"
        },
        {
          cityId: "4",
          cityName: "广州"
        }
      ],
      gameValue: "",
      cityValue: "",
      proviceValue: "",
      num: 10,
      type: null,
      showeditBox: false,
      tableData: [{ type: "最低返奖率" }, { type: "最高返奖率" }],
      controlOptions: [
        { name: "确认", type: "primary", icon: "" } // type为按钮的五种颜色， icon为具体的图标
      ],
      form: {
        alarmFrequencyMajor: "", //重大告警频次
        alarmFrequencyOrdinary: "", //普通告警频次
        alarmFrequencySerious: "", //严重告警频次
        cityId: "",
        cityName: "",
        collectFrequency: "", //采集间隔(单位：分钟) 传入15，表示15分钟匹配一次
        collectStatus: 0, //0生效 1停止
        gameId: "",
        gameName: "",
        highestReturnRateMajor: "", //最高返奖率-重大级别
        highestReturnRateOrdinary: "", //最高返奖率-普通级别
        highestReturnRateSerious: "", //最高返奖率-严重级别
        informCentralManIdMajor: "", //重大通知中央管理员id
        informCentralManIdOrdinary: "", //普通通知中央管理员id
        informCentralManIdSerious: "", //严重通知中央管理员id
        informCityManIdMajor: "", //重大通知市级管理员id
        informCityManIdOrdinary: "", //普通通知市级管理员id
        informCityManIdSerious: "", //严重通知市级管理员id
        informProvinceManIdMajor: "", // 重大通知省级管理员id
        informProvinceManIdOrdinary: "", //普通通知省级管理员id
        informProvinceManIdSerious: "", //严重通知省级管理员id
        informWayMajor: "", //重大通知方式 1站内 2邮件 3短信 4站|邮 5站|端 6邮|短 7全部
        informWaySerious: "", //严重通知方式 同上
        informWayOrdinary: "", //普通通知方式
        minimumReturnRateMajor: "", //最低返奖率-重大级别
        minimumReturnRateOrdinary: "", //最低返奖率-普通级别
        minimumReturnRateSerious: "", //最低返奖率-严重级别
        provinceId: "", //省级id
        provinceName: "" //省级名称
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
    changes(val) {
      this.checkBoxInfo();
     
    },

    checkBoxInfo(){
       if (this.checkList.length) {
        var listLength = this.checkList.length;
        if (listLength == 1) {
          if (this.checkList[0] == "站内") {
            this.form.informWayOrdinary = 1;
          } else if (this.checkList[0] == "邮件") {
            this.form.informWayOrdinary = 2;
          } else {
            this.form.informWayOrdinary = 3;
          }
        } else if (listLength == 2) {
          if (
            (this.checkList[0] == "站内" && this.checkList[1] == "邮件") ||
            (this.checkList[1] == "站内" && this.checkList[0] == "邮件")
          ) {
            this.form.informWayOrdinary = 4;
          } else if (
            (this.checkList[0] == "短信") & (this.checkList[1] == "邮件") ||
            (this.checkList[1] == "短信") & (this.checkList[0] == "邮件")
          ) {
            this.form.informWayOrdinary = 6;
          } else {
            this.form.informWayOrdinary = 5;
          }
        } else {
          this.form.informWayOrdinary = 7;
        }
      }
    },
    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      this.getGameRiskInsert();
    },

    //游戏风险指标新增
    async getGameRiskInsert() {
      const id = this.$route.query.id;
      const self = this;
      this.form.alarmFrequencyMajor = this.tableData1[2].warningPl;
      this.form.alarmFrequencySerious = this.tableData1[1].warningPl;
      this.form.alarmFrequencyOrdinary = this.tableData1[0].warningPl;
      const res = await self.$api.getGameRiskInsert({
        data: {
          alarmFrequencyMajor: this.form.alarmFrequencyMajor,
          alarmFrequencyOrdinary: this.form.alarmFrequencyOrdinary,
          alarmFrequencySerious: this.form.alarmFrequencySerious,
          cityId: this.cityValue,
          cityName: this.cityValue,
          provinceId: this.proviceValue,
          provinceName: this.proviceValue,
          gameId: this.gameValue,
          gameName: this.gameValue,
          collectFrequency: this.form.collectFrequency,
          collectStatus: this.form.collectStatus,
          highestReturnRateMajor: this.form.highestReturnRateMajor,
          highestReturnRateOrdinary: this.form.highestReturnRateOrdinary,
          highestReturnRateSerious: this.form.highestReturnRateSerious,
          informCentralManIdMajor: this.form.informCentralManIdMajor,
          informCentralManIdOrdinary: this.form.informCentralManIdOrdinary,
          informCentralManIdSerious: this.form.informCentralManIdSerious,
          informCityManIdMajor: this.form.informCityManIdMajor,
          informCityManIdOrdinary: this.form.informCityManIdOrdinary,
          informCityManIdSerious: this.form.informCityManIdSerious,
          informProvinceManIdMajor: this.form.informProvinceManIdMajor,
          informProvinceManIdOrdinary: this.form.informProvinceManIdOrdinary,
          informProvinceManIdSerious: this.form.informProvinceManIdSerious,
          informWayMajor: this.form.informWayMajor,
          informWayOrdinary: this.form.informWayOrdinary,
          informWaySerious: this.form.informWaySerious,
          minimumReturnRateMajor: this.form.minimumReturnRateMajor,
          minimumReturnRateOrdinary: this.form.minimumReturnRateOrdinary,
          minimumReturnRateSerious: this.form.minimumReturnRateSerious
        }
      });
      if (res && res.code == 0) {
        console.log(res);
      }
    },
    selectChange(val) {
      // this.showeditBox = false;
      this.type = val;
      console.log(this.type);
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
// .vlt-card{
//   padding: 5px;
// }
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
.vlt-card {
  border: 1px solid #eee;
  padding: 10px 10px;
  &:hover {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    border-color: #eee;
  }
}
</style>
