<template>
  <div class="vlt-card">
    <h3 class="headling">城市游戏风险指标修改</h3>
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
        :header-cell-style="{background:'rgba(240,240,240,.5)'}"
        :cell-style="{align:'center'}"
        @selection-change="selectChange"
        ref="multipleTable"
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
            <el-button type="primary" v-prevent="1000" @click="onSubmit">修改</el-button>
            <el-button>取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        :data="tableData1"
        border
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
          <template slot-scope="scope">
            <div v-if="scope.row.warningLevel==='普通'" class="checkInfor">
              <el-checkbox size="medium" v-model="checkCityOrdinary" @change="cityPropleOrdinary">市</el-checkbox>
              <el-select
                size="mini"
                :disabled="optionsNotifyCityObjOfOrdinary1"
                v-model="informPeopleCityOrdinary"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-checkbox label="省" v-model="checkProOrdinary" @change="proPropleOrdinary" size="medium">省</el-checkbox>
              <el-select
                size="mini"
                :disabled="optionsNotifyProObjOfOrdinary1"
                v-model="informPeopleProOrdinary"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-checkbox
                label="中央"
                @change="centerPropleOrdinary"
                v-model="checkCenterOrdinary"
                size="medium"
              >中央</el-checkbox>
              <el-select
                size="mini"
                :disabled="optionsNotifyCenterObjOfOrdinary1"
                v-model="informPeopleCenterOrdinary"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div v-if="scope.row.warningLevel==='严重'" class="checkInfor">
              <el-checkbox label="市" v-model="checkCitySerious" @change="cityPropleSerious" size="medium">市</el-checkbox>
              <el-select
                size="mini"
                v-model="informPeopleCitySerious"
                :disabled="optionsNotifyCityObjOfSerious"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options6"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-checkbox label="省" size="medium" v-model="checkProSerious" @change="proPropleSerious"></el-checkbox>
              <el-select
                size="mini"
                :disabled="optionsNotifyProObjOfSerious"
                v-model="informPeopleProSerious"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options7"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-checkbox
                label="中央"
                size="medium"
                v-model="checkCenterSerious"
                @change="centerPropleSerious"
              ></el-checkbox>
              <el-select
                size="mini"
                :disabled="optionsNotifyCenterObjOfSerious"
                v-model="informPeopleCenterSerious"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options8"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div v-if="scope.row.warningLevel==='重大'" class="checkInfor">
              <el-checkbox label="市" v-model="checkCityMajor" @change="cityPropleMajor" size="medium"></el-checkbox>
              <el-select
                size="mini"
                :disabled="optionsNotifyCityObjOfMajor"
                v-model="informPeopleCityMajor"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options9"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-checkbox label="省" v-model="checkProMajor" @change="porPropleMajor" size="medium"></el-checkbox>
              <el-select
                size="mini"
                :disabled="optionsNotifyProObjOfMajor"
                v-model="informPeopleProMajor"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options10"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-checkbox label="中央" v-model="checkCenterMajor" @change="centerPropleMajor" size="medium"></el-checkbox>
              <el-select
                size="mini"
                :disabled="optionsNotifyCenterObjOfMajor"
                v-model="informPeopleCenterMajor"
                placeholder="请选择"
              >
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
          gameId: 1,
          gameName: "魂斗罗"
        },
        {
          gameId: 2,
          gameName: "狼和兔子"
        }
      ],
      options1: [
        {
          provinceId: 1,
          provinceName: "广东"
        },
        {
          provinceId: 2,
          provinceName: "广西"
        }
      ],
      options2: [
        {
          cityId: 3,
          cityName: "深圳"
        },
        {
          cityId: 4,
          cityName: "广州"
        }
      ],
     options3: [
        {
          value: 3,
          label: "3"
        },
        {
          value: 4,
          label: "4"
        }
      ],
      options4: [
        {
          value: 5,
          label: "5"
        },
        {
          value: 6,
          label: "6"
        }
      ],
      options6: [
        {
          value: 7,
          label: "7"
        },
        {
          value: 8,
          label: "8"
        }
      ],
      options7: [
        {
          value: 9,
          label: "9"
        },
        {
          value: 10,
          label: "10"
        }
      ],
      options8: [
        {
          value: 11,
          label: "11"
        },
        {
          value: 12,
          label: "12"
        }
      ],
      options5: [
        {
          value: 13,
          label: "13"
        },
        {
          value: 14,
          label: "14"
        }
      ],
      options11: [
        {
          value: 15,
          label: "15"
        },
        {
          value: 16,
          label: "16"
        }
      ],
      options9: [
        {
          value: 17,
          label: "17"
        },
        {
          value: 18,
          label: "18"
        }
      ],
      options10: [
        {
          value: 19,
          label: "19"
        },
        {
          value: 20,
          label: "20"
        }
      ],
      gameValue: "",
      cityValue: "",
      proviceValue: "",
      informPeopleCityOrdinary: "",
      informPeopleProOrdinary: "",
      informPeopleCenterOrdinary: "",
      informPeopleCitySerious: "",
      informPeopleProSerious: "",
      informPeopleCenterSerious: "",
      informPeopleCityMajor: "",
      informPeopleProMajor: "",
      informPeopleCenterMajor: "",
      checkCityOrdinary: true,
      checkProOrdinary: false,
      checkCenterOrdinary: false,
      checkCitySerious: true,
      checkProSerious: true,
      checkCenterSerious: false,
      checkCityMajor: true,
      checkProMajor: true,
      checkCenterMajor: true,
      optionsNotifyCityObjOfOrdinary1: false, //普通市级通知对象
      optionsNotifyProObjOfOrdinary1: false, //普通省级通知对象
      optionsNotifyCenterObjOfOrdinary1: false, //普通中央通知对象
      optionsNotifyCityObjOfSerious: false, //严重市级通知对象
      optionsNotifyProObjOfSerious: false, //严重省级通知对象
      optionsNotifyCenterObjOfSerious: false, //严重中央通知对象
      optionsNotifyCityObjOfMajor: false, //重大市级通知对象
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
     this.getInformIdByCheckValue(this.checkList,'informWayOrdinary');
    },
    //严重通知方式
    changesSerious(val) {
     this.getInformIdByCheckValue(this.checkList1,'informWaySerious');
    },
    //重大通知方式
    changesMajor(val) {
      this.getInformIdByCheckValue(this.checkList2,'informWayMajor');
    },
    getInformIdByCheckValue(arrList,name) {       
      if (arrList) {
        if (arrList.length == 1) {
          if (arrList.includes('站内')) {
            this.form[name] = 1;
          } else if (arrList.includes('邮件')) {
            this.form[name] = 2;
          } else {
           this.form[name]  = 3;
          }
        } else if (arrList.length == 2) {
          if (
            (arrList.includes('站内') && arrList.includes('邮件'))
          ) {
            this.form[name]  = 4;
          } else if (
           arrList.includes('短信') && arrList.includes('邮件')
          ) {
            this.form[name]  = 6;
          } else {
            this.form[name]  = 5;
          }
        } else if(arrList.length==3){
          this.form[name]  = 7;
        }else{
         this.form[name] =""
        }
      }
    },
    //勾选普通市级通知对象
    cityPropleOrdinary() {
      if (this.checkCityOrdinary) {
        this.optionsNotifyCityObjOfOrdinary1 = false;
      } else {
        this.optionsNotifyCityObjOfOrdinary1 = true;
        this.informPeopleCityOrdinary = "";
      }
    },
    //勾选普通省级通知对象
    proPropleOrdinary() {
      if (this.checkProOrdinary) {
        this.optionsNotifyProObjOfOrdinary1 = false;
      } else {
        this.optionsNotifyProObjOfOrdinary1 = true;
        this.informPeopleProOrdinary = "";
      }
    },
    //勾选普通中央通知对象
    centerPropleOrdinary() {
      if (this.checkCenterOrdinary) {
        this.optionsNotifyCenterObjOfOrdinary1 = false;
      } else {
        this.optionsNotifyCenterObjOfOrdinary1 = true;
        this.informPeopleCenterOrdinary = "";
      }
    },
    //勾选严重城市通知对象
    cityPropleSerious() {
      if (this.checkCitySerious) {
        this.optionsNotifyCityObjOfSerious = false;
      } else {
        this.optionsNotifyCityObjOfSerious = true;
        this.informPeopleCitySerious = "";
      }
    },
    //勾选严重省级通知对象
    proPropleSerious() {
      if (this.checkProSerious) {
        this.optionsNotifyProObjOfSerious = false;
      } else {
        this.optionsNotifyProObjOfSerious = true;
        this.informPeopleProSerious = "";
      }
    },
    //勾选严重中央通知对象
    centerPropleSerious() {
      if (this.checkCenterSerious) {
        this.optionsNotifyCenterObjOfSerious = false;
      } else {
        this.optionsNotifyCenterObjOfSerious = true;
        this.informPeopleCenterSerious = "";
      }
    },
    //勾选重大市级通知对象
    cityPropleMajor() {
      if (this.checkCityMajor) {
        this.optionsNotifyCityObjOfMajor = false;
      } else {
        this.optionsNotifyCityObjOfMajor = true;
        this.informPeopleCityMajor = "";
      }
    },
    //勾选重大省级通知对象
    porPropleMajor() {
      if (this.checkProMajor) {
        this.optionsNotifyProObjOfMajor = false;
      } else {
        this.optionsNotifyProObjOfMajor = true;
        this.informPeopleProMajor = "";
      }
    },
    //勾选重大中央通知对象
    centerPropleMajor() {
      if (this.checkCenterMajor) {
        this.optionsNotifyCenterObjOfMajor = false;
      } else {
        this.optionsNotifyCenterObjOfMajor = true;
        this.informPeopleCenterMajor = "";
      }
    },

    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      this.gameRiskUpdate();
    },

    //游戏风险指标修改
    async gameRiskUpdate() {
      const self = this;
      this.form.alarmFrequencyMajor = this.tableData1[2].warningPl;
      this.form.alarmFrequencySerious = this.tableData1[1].warningPl;
      this.form.alarmFrequencyOrdinary = this.tableData1[0].warningPl;

      const res = await self.$api.gameRiskUpdate({
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
            informCentralManIdMajor: this.informPeopleCenterMajor,
          informProvinceManIdMajor: this.informPeopleProMajor,
          informCityManIdMajor: this.informPeopleCityMajor,

          informCentralManIdOrdinary: this.informPeopleCenterOrdinary,
          informProvinceManIdOrdinary: this.informPeopleProOrdinary,
          informCityManIdOrdinary: this.informPeopleCityOrdinary,

          informCityManIdSerious: this.informPeopleCitySerious,
          informCentralManIdSerious: this.informPeopleCenterSerious,
          informProvinceManIdSerious: this.informPeopleProSerious,

          informWayMajor: this.form.informWayMajor,
          informWayOrdinary: this.form.informWayOrdinary,
          informWaySerious: this.form.informWaySerious,
          minimumReturnRateMajor: this.form.minimumReturnRateMajor,
          minimumReturnRateOrdinary: this.form.minimumReturnRateOrdinary,
          minimumReturnRateSerious: this.form.minimumReturnRateSerious,
          businessKey: this.$route.query.id
        }
      });
      if (res && res.code == 0) {
        this.$message({
          message: "修改成功",
          type: "success"
        });
         this.$router.push({name:'gameRiskDetail',query:{
            id:this.$route.query.id
        }})
      } else {
        this.$message.error("修改失败");
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
    },
    async getDetailInfo() {
      const id = this.$route.query.id;
      const self = this;
      const res = await self.$api.getGameRiskDetail({
        data: {
          businessKey: id
        }
      });
      if (res && res.code == 0) {
        this.form = res.data;
        this.gameValue = res.data.gameId;
        this.proviceValue = res.data.provinceId;
        this.cityValue = res.data.cityId;
        this.tableData1[2].warningPl = this.form.alarmFrequencyMajor;
        this.tableData1[1].warningPl = this.form.alarmFrequencySerious;
        this.tableData1[0].warningPl = this.form.alarmFrequencyOrdinary;
        this.checkList2 = this.showInformType(this.form.informWayMajor);
        this.checkList1 = this.showInformType(this.form.informWaySerious);
        this.checkList = this.showInformType(this.form.informWayOrdinary);
         this.informPeopleCityOrdinary = this.form.informCityManIdOrdinary;
        this.informPeopleProOrdinary = this.form.informProvinceManIdOrdinary;
        this.informPeopleCenterOrdinary = this.form.informCentralManIdOrdinary;
        this.informPeopleCitySerious = this.form.informCityManIdSerious;
        this.informPeopleProSerious = this.form.informProvinceManIdSerious;
        this.informPeopleCenterSerious = this.form.informCentralManIdSerious;

        this.informPeopleCityMajor = this.form.informCityManIdMajor;

        this.informPeopleProMajor = this.form.informProvinceManIdMajor;
        this.informPeopleCenterMajor = this.form.informCentralManIdMajor;
      }
    },
    showInformType(type) {
      var list;
      switch (type) {
        case 1:
          list = ["站内"];
          break;
        case 2:
          list = ["邮件"];
          break;
        case 3:
          list = ["短信"];
          break;
        case 4:
          list = ["站内", "邮件"];
          break;
        case 5:
          list = ["站内", "短信"];
          break;
        case 6:
          list = ["邮件", "短信"];
          break;
        case 7:
          list = ["站内", "邮件", "短信"];
          break;
      }
      return list;
    }
  },
  created() {
    //默认全选
    this.$nextTick(() => {
      for (let i = 0; i < this.tableData.length; i++) {
        this.$refs.multipleTable.toggleRowSelection(this.tableData[i], true);
      }
    });
    this.getDetailInfo();
  }
};
</script>

<style lang='less' scoped>
@import './less/index.less';
</style>
