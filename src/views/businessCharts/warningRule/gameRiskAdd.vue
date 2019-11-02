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
        :header-cell-style="{background:'rgba(240,240,240,.5)'}"
        :cell-style="{align:'center'}"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="type" label="标准配置"></el-table-column>
      </el-table>
    </div>
    <div class="vlt-card showbox" v-show="showeditBox">
      <el-form label-position="top" label-width="80px" ref="form" :model="form" :rules="rules">
     
        <div class="editfrom" v-show="showMinimumReturnRate">
          <el-form-item label="最低返奖率" prop="miniMumReturnRateOrdinary">
            <el-input v-model="form.minimumReturnRateOrdinary"></el-input>
          </el-form-item>
          <el-form-item label="严重" prop="minimumReturnRateSerious">
            <el-input v-model="form.minimumReturnRateSerious"></el-input>
          </el-form-item>
          <el-form-item label="重大" prop="minimumReturnRateMajor">
            <el-input v-model="form.minimumReturnRateMajor"></el-input>
          </el-form-item>
        </div>
        <div class="editfrom" v-show="showHighestReturnRate">
          <el-form-item label="最高返奖率" prop="highestReturnRateOrdinary">
            <el-input v-model="form.highestReturnRateOrdinary"></el-input>
          </el-form-item>
          <el-form-item label="严重" prop="highestReturnRateSerious">
            <el-input v-model="form.highestReturnRateSerious"></el-input>
          </el-form-item>
          <el-form-item label="重大" prop="highestReturnRateMajor">
            <el-input v-model="form.highestReturnRateMajor"></el-input>
          </el-form-item>
        </div>

        <div class="editfrom">
          <el-form-item prop="date2" label="监控频率">
            <el-input-number
              v-model="form.collectFrequency"
              controls-position="right"
              @change="handleChange"
              :min="10"
              :max="100"
              :step="10"
              size="medium"
            ></el-input-number>
            <p class="tip">
              <span>*</span>数值达到对应风险指标值即为触发
            </p>
          </el-form-item>
        </div>
        <el-form-item></el-form-item>
      </el-form>
      <div>
        <el-table
          :data="tableData1"
          border
          :header-cell-style="{background:'rgba(240,240,240,.5)'}"
          :cell-style="{align:'center'}"
        >
          <el-table-column align="center" prop="warningLevel" label="告警等级" min-width="10%"></el-table-column>
          <el-table-column align="center" prop="type" label="通知方式" min-width="20%">
            <template slot-scope="scope">
              <div v-if="scope.row.warningLevel==='普通'">
                <el-checkbox-group v-model="checkListOrdinary" @change="changesOrdinary" class="checkInfor">
                  <el-checkbox label="站内" border size="medium" v-model="form.informWayOrdinary"></el-checkbox>

                  <el-checkbox label="邮件" border size="medium"></el-checkbox>
                  <el-checkbox label="短信" border size="medium"></el-checkbox>
                </el-checkbox-group>
              </div>
              <div v-if="scope.row.warningLevel==='严重'">
                <el-checkbox-group class="checkInfor" v-model="checkListSeriours" @change="changesSerious">
                  <el-checkbox label="站内" border size="medium"></el-checkbox>

                  <el-checkbox label="邮件" border size="medium"></el-checkbox>
                  <el-checkbox label="短信" border size="medium"></el-checkbox>
                </el-checkbox-group>
              </div>
              <div v-if="scope.row.warningLevel==='重大'">
                <el-checkbox-group class="checkInfor" v-model="checkListMajor" @change="changesMajor">
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
                <el-checkbox
                  size="medium"
                  v-model="checkCityOrdinary"
                  @change="cityPropleOrdinary"
                >市</el-checkbox>
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
                <el-checkbox
                  label="省"
                  v-model="checkProOrdinary"
                  @change="proPropleOrdinary"
                  size="medium"
                >省</el-checkbox>
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
                <el-checkbox
                  label="市"
                  v-model="checkCitySerious"
                  @change="cityPropleSerious"
                  size="medium"
                >市</el-checkbox>
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
                <el-checkbox
                  label="省"
                  size="medium"
                  v-model="checkProSerious"
                  @change="proPropleSerious"
                ></el-checkbox>
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
                <el-checkbox
                  label="市"
                  v-model="checkCityMajor"
                  @change="cityPropleMajor"
                  size="medium"
                ></el-checkbox>
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
                <el-checkbox
                  label="省"
                  v-model="checkProMajor"
                  @change="porPropleMajor"
                  size="medium"
                ></el-checkbox>
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
                <el-checkbox
                  label="中央"
                  v-model="checkCenterMajor"
                  @change="centerPropleMajor"
                  size="medium"
                ></el-checkbox>
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
          <el-table-column align="center" prop="warningPl" label="告警次数" min-width="10%">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.warningPl"
                controls-position="right"
                @change="handleChange"
                :min="10"
                :max="100"
                :step="10"
                size="mini"
              ></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="btn">
        <el-button type="primary" v-prevent="1000" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import rules from "@/utils/rules.js";
import informs from "@/utils/inform.js";
export default {
  data() {
    return {
      showMinimumReturnRate: false,
      showHighestReturnRate: false,
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
      checkListOrdinary: ["站内"],
      checkListSeriours: ["站内", "短信"],
      checkListMajor: ["站内", "短信", "邮件"],

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
      optionsNotifyProObjOfOrdinary1: true, //普通省级通知对象
      optionsNotifyCenterObjOfOrdinary1: true, //普通中央通知对象
      optionsNotifyCityObjOfSerious: false, //严重市级通知对象
      optionsNotifyProObjOfSerious: false, //严重省级通知对象
      optionsNotifyCenterObjOfSerious: true, //严重中央通知对象
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
        informTotalCountMajor: "", //重大告警频次
        informTotalCountOrdinary: "", //普通告警频次
        informTotalCountSerious: "", //严重告警频次
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
      rules: {
        minimumOperatingRateOrdinary: [
          { validator: rules.checkPointOrPercent, trigger: "blur" }
        ],
        minimumReturnRateSerious: [
          { validator: rules.checkPointOrPercent, trigger: "blur" }
        ],
        minimumReturnRateMajor: [
          { validator: rules.checkPointOrPercent, trigger: "blur" }
        ],
        highestReturnRateOrdinary: [
          { validator: rules.checkPointOrPercent, trigger: "blur" }
        ],
        highestReturnRateSerious: [
          { validator: rules.checkPointOrPercent, trigger: "blur" }
        ],
        highestReturnRateMajor: [
          { validator: rules.checkPointOrPercent, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //通知方式改变
    getInformIdByCheckValue(arrList, name) {
      this.form[name] = informs.getInformIdByCheckValue(arrList);
    },
      //普通通知方式
    changesOrdinary(val) {
      this.getInformIdByCheckValue(this.checkListOrdinary, "informWayOrdinary");
    },
    //严重通知方式
    changesSerious(val) {
      this.getInformIdByCheckValue(this.checkListSeriours, "informWaySerious");
    },
    //重大通知方式
    changesMajor(val) {
      this.getInformIdByCheckValue(this.checkListMajor, "informWayMajor");
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
      this.gameRiskInsert();
    },

    //游戏风险指标新增
    async gameRiskInsert() {
      const id = this.$route.query.id;
      const self = this;
      this.form.informTotalCountMajor = this.tableData1[2].warningPl;
      this.form.informTotalCountSerious = this.tableData1[1].warningPl;
      this.form.informTotalCountOrdinary = this.tableData1[0].warningPl;
      this.form.informCityManIdOrdinary = this.informPeopleProOrdinary;

      const res = await self.$api.gameRiskInsert({
        data: {
          informTotalCountMajor: this.form.informTotalCountMajor,
          informTotalCountOrdinary: this.form.informTotalCountOrdinary,
          informTotalCountSerious: this.form.informTotalCountSerious,
          cityId: this.cityValue,
          cityName: this.cityValue,
          provinceId: this.proviceValue,
          provinceName: this.proviceValue,
          gameId: this.gameValue,
          gameName: this.gameValue,
          collectFrequency: this.form.collectFrequency,
          collectStatus: this.form.collectStatus,
          highestReturnRateMajor: informs.conventToPoint(
            this.form.highestReturnRateMajor
          ),
          highestReturnRateOrdinary: informs.conventToPoint(
            this.form.highestReturnRateOrdinary
          ),
          highestReturnRateSerious: informs.conventToPoint(
            this.form.highestReturnRateSerious
          ),
          minimumReturnRateMajor: informs.conventToPoint(
            this.form.minimumReturnRateMajor
          ),
          minimumReturnRateOrdinary: informs.conventToPoint(
            this.form.minimumReturnRateOrdinary
          ),
          minimumReturnRateSerious: informs.conventToPoint(
            this.form.minimumReturnRateSerious
          ),

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
          informWaySerious: this.form.informWaySerious
        },
        baseURL: "http://10.6.0.203:8086/api"
      });
      if (res && res.code == 0) {
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.$router.push({
          name: "gameRiskDetail",
          query: {
            id: res.data.businessKey
          }
        });
      } else {
        // this.$message.error('新增失败');
      }
    },
    selectChange(val) {
      this.type = val;
      if (this.type && this.type.length > 0) {
        this.showeditBox = true;
        var list = this.type.map(v => {
          return v.type;
        });
        if (list.includes("最高返奖率")) {
          this.showHighestReturnRate = true;
        } else {
          this.showHighestReturnRate = false;
          this.form.highestReturnRateMajor = "";
          this.form.highestReturnRateOrdinary = "";
          this.form.highestReturnRateSerious = "";
        }
        if (list.includes("最低返奖率")) {
          this.showMinimumReturnRate = true;
        } else {
          this.showMinimumReturnRate = false;
          this.form.minimumReturnRateMajor = "";
          this.form.minimumReturnRateOrdinary = "";
          this.form.minimumReturnRateSerious = "";
        }
      } else {
        this.showeditBox = false;
      }
    }
  }
};
</script>

<style lang='less' scoped>
@import "./less/index.less";
</style>
