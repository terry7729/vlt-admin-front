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
             <p class="tip"><span>*</span>数值达到对应风险指标值即为触发</p>
          </el-form-item>
        </div>
        <el-form-item>
          <div class="btn">
            <el-button type="primary" v-prevent="1000" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        :data="tableData1"
        border
        style="width: 80%"
        :header-cell-style="{background:'rgba(240,240,240,.5)'}"
        :cell-style="{align:'center'}"
      >
        <el-table-column align="center" prop="warningLevel" label="告警等级" min-width="5%"></el-table-column>
        <el-table-column align="center" prop="type" label="通知方式" min-width="20%">
          <template slot-scope="scope">
            <div v-if="scope.row.warningLevel==='普通'">
              <el-checkbox-group v-model="checkList" @change="changesOrdinary" class="checkInfor">
                <el-checkbox label="站内" border size="medium" v-model="form.informWayOrdinary"></el-checkbox>

                <el-checkbox label="邮件" border size="medium"></el-checkbox>
                <el-checkbox label="短信" border size="medium"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-if="scope.row.warningLevel==='严重'">
              <el-checkbox-group class="checkInfor" v-model="checkList1" @change="changesSerious">
                <el-checkbox label="站内" border size="medium"></el-checkbox>

                <el-checkbox label="邮件" border size="medium"></el-checkbox>
                <el-checkbox label="短信" border size="medium"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-if="scope.row.warningLevel==='重大'">
              <el-checkbox-group class="checkInfor" v-model="checkList2" @change="changesMajor">
                <el-checkbox label="站内" border size="medium"></el-checkbox>

                <el-checkbox label="邮件" border size="medium"></el-checkbox>
                <el-checkbox label="短信" border size="medium"></el-checkbox>
              </el-checkbox-group>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="type" label="通知对象" min-width="45%">
          <template slot-scope="scope" >
            <div v-if="scope.row.warningLevel==='普通'" class="checkInfor">
                <el-checkbox  size="medium" v-model="checked1" @change="cityPropleOrdinary">市</el-checkbox>
                <el-select size="mini"  :disabled="optionsNotifyCityObjOfOrdinary1" v-model="options3Value" placeholder="请选择">
                  <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                   
                  ></el-option>
                </el-select>
                <el-checkbox label="省" v-model="checked2" @change="proPropleOrdinary" size="medium">省</el-checkbox>
                <el-select
                  size="mini"
                  :disabled="optionsNotifyProObjOfOrdinary1"
                  v-model="options4Value"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
          
                  ></el-option>
                </el-select>
                <el-checkbox label="中央" @change="centerPropleOrdinary" v-model="checked3" size="medium">中央</el-checkbox>
                <el-select size="mini"  :disabled="optionsNotifyCenterObjOfOrdinary1" v-model="options5Value" placeholder="请选择">
                  <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                   
                  ></el-option>
                </el-select>
            </div>
            <div v-if="scope.row.warningLevel==='严重'" class="checkInfor">        
                <el-checkbox label="市" v-model="checked4" @change="cityPropleSerious" size="medium">市</el-checkbox>
                <el-select size="mini" v-model="options6Value" :disabled="optionsNotifyCityObjOfSerious" placeholder="请选择">
                  <el-option
                    v-for="item in options6"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    
                  ></el-option>
                </el-select>
                <el-checkbox label="省" size="medium" v-model="checked5" @change="proPropleSerious"></el-checkbox>
                <el-select size="mini" :disabled="optionsNotifyProObjOfSerious" v-model="options7Value" placeholder="请选择">
                  <el-option
                    v-for="item in options7"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                   
                  ></el-option>
                </el-select>
                <el-checkbox label="中央" size="medium" v-model="checked6" @change="centerPropleSerious"></el-checkbox>
                <el-select size="mini"  :disabled="optionsNotifyCenterObjOfSerious" v-model="options8Value" placeholder="请选择">
                  <el-option
                    v-for="item in options8"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                   
                  ></el-option>
                </el-select>
        
            </div>
            <div v-if="scope.row.warningLevel==='重大'" class="checkInfor">
             
                <el-checkbox label="市" v-model="checked7"  @change="cityPropleMajor" size="medium"></el-checkbox>
                <el-select size="mini"  :disabled="optionsNotifyCityObjOfMajor" v-model="options9Value" placeholder="请选择">
                  <el-option
                    v-for="item in options9"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-checkbox label="省" v-model="checked8" @change="porPropleMajor" size="medium"></el-checkbox>
                <el-select size="mini"  :disabled="optionsNotifyProObjOfMajor" v-model="options10Value" placeholder="请选择">
                  <el-option
                    v-for="item in options10"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-checkbox label="中央" v-model="checked9" @change="centerPropleMajor" size="medium"></el-checkbox>
                <el-select size="mini"  :disabled="optionsNotifyCenterObjOfMajor" v-model="options11Value" placeholder="请选择">
                  <el-option
                    v-for="item in options11"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
          
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="warningPl" label="告警频率" min-width="10%">
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
       options3: [
        {
          value: 11,
          label: "张三"
        },
        {
          value: 12,
          label: "李四"
        }
      ],
      options4: [
        {
          value: 35,
          label: "王五"
        },
        {
          value: 36,
          label: "赵六"
        }
      ],
      options6: [
        {
          value: 33,
          label: "孙7"
        },
        {
          value: 34,
          label: "钱八"
        }
      ],
      options7: [
        {
          value: 15,
          label: "孙7"
        },
        {
          value: 16,
          label: "钱八"
        }
      ],
      options8: [
        {
          value: 17,
          label: "孙7"
        },
        {
          value: 18,
          label: "钱八"
        }
      ],
      options5: [
        {
          value: 19,
          label: "孙7"
        },
        {
          value: 20,
          label: "钱八"
        }
      ],
      options11: [
        {
          value: 21,
          label: "孙7"
        },
        {
          value: 22,
          label: "钱八"
        }
      ],
      options9: [
        {
          value: 23,
          label: "孙7"
        },
        {
          value: 24,
          label: "钱八"
        }
      ],
      options10: [
        {
          value: 25,
          label: "孙7"
        },
        {
          value: 26,
          label: "钱八"
        }
      ],
      gameValue: "",
      cityValue: "",
      proviceValue: "",
      options3Value: "",
      options4Value: "",
      options5Value: "",
      options6Value: "",
      options7Value: "",
      options8Value: "",
      options9Value: "",
      options10Value: "",
      options11Value: "",
      checked1:true,
      checked2:false,
      checked3:false,
      checked4:true,
      checked5:true,
      checked6:false,
      checked7:true,
      checked8:true,
      checked9:true,
      optionsNotifyCityObjOfOrdinary1:false,//普通市级通知对象
      optionsNotifyProObjOfOrdinary1: true, //普通省级通知对象
      optionsNotifyCenterObjOfOrdinary1: true, //普通中央通知对象
      optionsNotifyCityObjOfSerious:false,//严重市级通知对象
      optionsNotifyProObjOfSerious: false, //严重省级通知对象
      optionsNotifyCenterObjOfSerious: true, //严重中央通知对象
      optionsNotifyCityObjOfMajor:false,//重大市级通知对象
      optionsNotifyProObjOfMajor: false, //重大省级通知对象
      optionsNotifyCenterObjOfMajor: false, //重大中央通知对象
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
        informWayMajor: 7, //重大通知方式 1站内 2邮件 3短信 4站|邮 5站|端 6邮|短 7全部
        informWaySerious: 5, //严重通知方式 同上
        informWayOrdinary: 1, //普通通知方式
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
    //普通通知方式
    changesOrdinary(val) {
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
    //严重通知方式
    changesSerious(val) {
      if (this.checkList1.length) {
        var listLength = this.checkList1.length;
        if (listLength == 1) {
          if (this.checkList1[0] == "站内") {
            this.form.informWaySerious = 1;
          } else if (this.checkList1[0] == "邮件") {
            this.form.informWaySerious = 2;
          } else {
            this.form.informWaySerious = 3;
          }
        } else if (listLength == 2) {
          if (
            (this.checkList1[0] == "站内" && this.checkList1[1] == "邮件") ||
            (this.checkList1[1] == "站内" && this.checkList1[0] == "邮件")
          ) {
            this.form.informWaySerious = 4;
          } else if (
            (this.checkList1[0] == "短信") & (this.checkList1[1] == "邮件") ||
            (this.checkList1[1] == "短信") & (this.checkList1[0] == "邮件")
          ) {
            this.form.informWaySerious = 6;
          } else {
            this.form.informWaySerious = 5;
          }
        } else {
          this.form.informWaySerious = 7;
        }
      }
    },
    //重大通知方式
    changesMajor(val) {
      if (this.checkList2.length) {
        var listLength = this.checkList2.length;
        if (listLength == 1) {
          if (this.checkList2[0] == "站内") {
            this.form.informWayMajor = 1;
          } else if (this.checkList2[0] == "邮件") {
            this.form.informWayMajor = 2;
          } else {
            this.form.informWayMajor = 3;
          }
        } else if (listLength == 2) {
          if (
            (this.checkList2[0] == "站内" && this.checkList2[1] == "邮件") ||
            (this.checkList2[1] == "站内" && this.checkList2[0] == "邮件")
          ) {
            this.form.informWayMajor = 4;
          } else if (
            (this.checkList2[0] == "短信") & (this.checkList2[1] == "邮件") ||
            (this.checkList2[1] == "短信") & (this.checkList2[0] == "邮件")
          ) {
            this.form.informWayMajor = 6;
          } else {
            this.form.informWayMajor = 5;
          }
        } else {
          this.form.informWaySerious = 7;
        }
      }
    },
    //勾选普通市级通知对象
    cityPropleOrdinary() {
      if (this.checked1) {
        this.optionsNotifyCityObjOfOrdinary1 = false;
      } else {
        this.optionsNotifyCityObjOfOrdinary1 = true;
        this.options3Value = "";
      }
    },
    //勾选普通省级通知对象
    proPropleOrdinary() {
      if (this.checked2) {
        this.optionsNotifyProObjOfOrdinary1 = false;
      } else {
        this.optionsNotifyProObjOfOrdinary1 = true;
        this.options4Value = "";
      }
    },
    //勾选普通中央通知对象
    centerPropleOrdinary() {
      if (this.checked3) {
        this.optionsNotifyCenterObjOfOrdinary1 = false;
      } else {
        this.optionsNotifyCenterObjOfOrdinary1 = true;
        this.options5Value = "";
      }
    },
    //勾选严重城市通知对象
    cityPropleSerious() {
      if (this.checked4) {
        this.optionsNotifyCityObjOfSerious = false;
      } else {
        this.optionsNotifyCityObjOfSerious = true;
        this.options6Value = "";
      }
    },
    //勾选严重省级通知对象
    proPropleSerious() {
      if (this.checked5) {
        this.optionsNotifyProObjOfSerious = false;
      } else {
        this.optionsNotifyProObjOfSerious = true;
        this.options7Value = "";
      }
    },
    //勾选严重中央通知对象
    centerPropleSerious() {
      if (this.checked6) {
        this.optionsNotifyCenterObjOfSerious = false;
      } else {
        this.optionsNotifyCenterObjOfSerious = true;
        this.options8Value = "";
      }
    },
    //勾选重大市级通知对象
    cityPropleMajor() {
      if (this.checked7) {
        this.optionsNotifyCityObjOfMajor = false;
      } else {
        this.optionsNotifyCityObjOfMajor = true;
        this.options9Value = "";
      }
    },
    //勾选重大省级通知对象
    porPropleMajor() {
      if (this.checked8) {
        this.optionsNotifyProObjOfMajor = false;
      } else {
        this.optionsNotifyProObjOfMajor = true;
        this.options10Value = "";
      }
    },
    //勾选重大中央通知对象
    centerPropleMajor() {
      if (this.checked9) {
        this.optionsNotifyCenterObjOfMajor = false;
      } else {
        this.optionsNotifyCenterObjOfMajor = true;
        this.options11Value = "";
      }
    },

    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      this.gameRiskInsert();
    },

    //游戏风险指标新增
    async gameRiskInsert() {
      const id = this.$route.query.id;
      const self = this;
      this.form.alarmFrequencyMajor = this.tableData1[2].warningPl;
      this.form.alarmFrequencySerious = this.tableData1[1].warningPl;
      this.form.alarmFrequencyOrdinary = this.tableData1[0].warningPl;
      this.form.informCityManIdOrdinary=this.options4Value
         
      const res = await self.$api.gameRiskInsert({
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
          informCentralManIdMajor: this.options11Value,
          informCentralManIdOrdinary: this.options9Value,
          informCentralManIdSerious: this.options10Value,
          informCityManIdMajor: this.options5Value,
          informCityManIdOrdinary: this.options3Value,
          informCityManIdSerious: this.options4Value,
          informProvinceManIdMajor: this.options8Value,
          informProvinceManIdOrdinary: this.options6Value,
          informProvinceManIdSerious: this.options7Value,
          informWayMajor: this.form.informWayMajor,
          informWayOrdinary: this.form.informWayOrdinary,
          informWaySerious: this.form.informWaySerious,
          minimumReturnRateMajor: this.form.minimumReturnRateMajor,
          minimumReturnRateOrdinary: this.form.minimumReturnRateOrdinary,
          minimumReturnRateSerious: this.form.minimumReturnRateSerious
        }
      });
      if (res && res.code == 0) {
        this.$message({
          message: '新增成功',
          type: 'success'
        });
      }else{
        // this.$message.error('新增失败');
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
@import './less/index.less';
</style>
