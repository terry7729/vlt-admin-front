<template>
  <div>
    <el-table
      :data="dataInform.informData"
      border
      :header-cell-style="{background:'rgba(240,240,240,.5)'}"
      :cell-style="{align:'center'}"
    >
      <el-table-column align="center" prop="warningLevel" label="告警等级" min-width="5%"></el-table-column>
      <el-table-column align="center" prop="type" label="通知方式" min-width="20%">
        <template slot-scope="scope">
          <div v-if="scope.row.warningLevel==='普通'">
            <el-checkbox-group
              v-model="dataInform.checkListOrdinary"
              @change="changesOrdinary"
              class="checkInfor"
            >
              <el-checkbox label="站内" border size="medium" v-model="dataInform.informWayOrdinary"></el-checkbox>

              <el-checkbox label="邮件" border size="medium"></el-checkbox>
              <el-checkbox label="短信" border size="medium"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-if="scope.row.warningLevel==='严重'">
            <el-checkbox-group
              class="checkInfor"
              v-model="dataInform.checkListSeriours"
              @change="changesSerious"
            >
              <el-checkbox label="站内" border size="medium"></el-checkbox>

              <el-checkbox label="邮件" border size="medium"></el-checkbox>
              <el-checkbox label="短信" border size="medium"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-if="scope.row.warningLevel==='重大'">
            <el-checkbox-group class="checkInfor" v-model="dataInform.checkListMajor" @change="changesMajor">
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
              v-model="dataInform.checkCityOrdinary"
              @change="cityPropleOrdinary"
            >市</el-checkbox>
            <el-select
              size="mini"
              :disabled="dataInform.optionsNotifyCityObjOfOrdinary1"
              v-model="dataInform.informPeopleCityOrdinary"
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
              v-model="dataInform.checkProOrdinary"
              @change="proPropleOrdinary"
              size="medium"
            >省</el-checkbox>
            <el-select
              size="mini"
              :disabled="dataInform.optionsNotifyProObjOfOrdinary1"
              v-model="dataInform.informPeopleProOrdinary"
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
              v-model="dataInform.checkCenterOrdinary"
              size="medium"
            >中央</el-checkbox>
            <el-select
              size="mini"
              :disabled="dataInform.optionsNotifyCenterObjOfOrdinary1"
              v-model="dataInform.informPeopleCenterOrdinary"
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
              v-model="dataInform.checkCitySerious"
              @change="cityPropleSerious"
              size="medium"
            >市</el-checkbox>
            <el-select
              size="mini"
              v-model="dataInform.informPeopleCitySerious"
              :disabled="dataInform.optionsNotifyCityObjOfSerious"
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
              v-model="dataInform.checkProSerious"
              @change="proPropleSerious"
            ></el-checkbox>
            <el-select
              size="mini"
              :disabled="dataInform.optionsNotifyProObjOfSerious"
              v-model="dataInform.informPeopleProSerious"
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
              v-model="dataInform.checkCenterSerious"
              @change="centerPropleSerious"
            ></el-checkbox>
            <el-select
              size="mini"
              :disabled="dataInform.optionsNotifyCenterObjOfSerious"
              v-model="dataInform.informPeopleCenterSerious"
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
              v-model="dataInform.checkCityMajor"
              @change="cityPropleMajor"
              size="medium"
            ></el-checkbox>
            <el-select
              size="mini"
              :disabled="dataInform.optionsNotifyCityObjOfMajor"
              v-model="dataInform.informPeopleCityMajor"
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
              v-model="dataInform.checkProMajor"
              @change="porPropleMajor"
              size="medium"
            ></el-checkbox>
            <el-select
              size="mini"
              :disabled="dataInform.optionsNotifyProObjOfMajor"
              v-model="dataInform.informPeopleProMajor"
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
              v-model="dataInform.checkCenterMajor"
              @change="centerPropleMajor"
              size="medium"
            ></el-checkbox>
            <el-select
              size="mini"
              :disabled="dataInform.optionsNotifyCenterObjOfMajor"
              v-model="dataInform.informPeopleCenterMajor"
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
            @change="handleChange(scope.row)"
            :min="10"
            :max="100"
            :step="10"
            size="mini"
          ></el-input-number>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import inform from "@/utils/inform.js";
export default {
  name: "informTable",
  // props: ["informInfo"],
  data() {
    return {
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
      dataInform: {
        checkListOrdinary: ["站内"],
        checkListSeriours: ["站内", "短信"],
        checkListMajor: ["站内", "短信", "邮件"],
        informData: [
          {
            warningLevel: "普通",
            warningPl: 10,
          },
          {
            warningLevel: "严重",
            warningPl: 13,
          },
          {
            warningLevel: "重大",
            warningPl: 18
          }
        ],

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
        informWayMajor: 7, //重大通知方式 1站内 2邮件 3短信 4站|邮 5站|端 6邮|短 7全部
        informWaySerious: 5, //严重通知方式 同上
        informWayOrdinary: 1 //普通通知方式
      },

      form: {
        informTotalCountMajor: "", //重大告警频次
        informTotalCountOrdinary: "", //普通告警频次
        informTotalCountSerious: "", //严重告警频次
        maxJackpotMoneyMajor: "", //最高奖池金额-重大级别
        maxJackpotMoneyOrdinary: "", //最高奖池金额-普通级别
        maxJackpotMoneySerious: "", //最高奖池金额-严重级别
        informCentralManIdMajor: "", //重大通知中央管理员id
        informCentralManIdOrdinary: "", //普通通知中央管理员id
        informCentralManIdSerious: "", //严重通知中央管理员id
        informCityManIdMajor: "", //重大通知市级管理员id
        informCityManIdOrdinary: "", //普通通知市级管理员id
        informCityManIdSerious: "", //严重通知市级管理员id
        informProvinceManIdMajor: "", // 重大通知省级管理员id
        informProvinceManIdOrdinary: "", //普通通知省级管理员id
        informProvinceManIdSerious: "", //严重通知省级管理员id
        
      }
    };
  },
  methods: {
    handleChange(row){
      // if(row.warningLevel=='普通'){
      //   this.
      // }
    },
    onSubmit() {},
    //普通通知方式
    changesOrdinary(val) {
      this.getInformIdByCheckValue(
        this.dataInform.checkListOrdinary,
        "informWayOrdinary"
      );
    },
    //严重通知方式
    changesSerious(val) {
      this.getInformIdByCheckValue(
        this.dataInform.checkListSeriours,
        "informWaySerious"
      );
    },
    //重大通知方式
    changesMajor(val) {
      this.getInformIdByCheckValue(
        this.dataInform.checkListMajor,
        "informWayMajor"
      );
    },
    getInformIdByCheckValue(arrList, name) {
      this.dataInform[name] = inform.getInformIdByCheckValue(arrList);
    },
    //勾选普通市级通知对象
    cityPropleOrdinary() {
      if (this.dataInform.checkCityOrdinary) {
        this.dataInform.optionsNotifyCityObjOfOrdinary1 = false;
      } else {
        this.dataInform.optionsNotifyCityObjOfOrdinary1 = true;
        this.dataInform.informPeopleCityOrdinary = "";
      }
    },
    //勾选普通省级通知对象
    proPropleOrdinary() {
      if (this.dataInform.checkProOrdinary) {
        this.dataInform.optionsNotifyProObjOfOrdinary1 = false;
      } else {
        this.dataInform.optionsNotifyProObjOfOrdinary1 = true;
        this.dataInform.informPeopleProOrdinary = "";
      }
    },
    //勾选普通中央通知对象
    centerPropleOrdinary() {
      if (this.dataInform.checkCenterOrdinary) {
        this.dataInform.optionsNotifyCenterObjOfOrdinary1 = false;
      } else {
        this.dataInform.optionsNotifyCenterObjOfOrdinary1 = true;
        this.dataInform.informPeopleCenterOrdinary = "";
      }
    },
    //勾选严重城市通知对象
    cityPropleSerious() {
      if (this.dataInform.checkCitySerious) {
        this.dataInform.optionsNotifyCityObjOfSerious = false;
      } else {
        this.dataInform.optionsNotifyCityObjOfSerious = true;
        this.dataInform.informPeopleCitySerious = "";
      }
    },
    //勾选严重省级通知对象
    proPropleSerious() {
      if (this.dataInform.checkProSerious) {
        this.dataInform.optionsNotifyProObjOfSerious = false;
      } else {
        this.dataInform.optionsNotifyProObjOfSerious = true;
        this.dataInform.informPeopleProSerious = "";
      }
    },
    //勾选严重中央通知对象
    centerPropleSerious() {
      if (this.dataInform.checkCenterSerious) {
        this.dataInform.optionsNotifyCenterObjOfSerious = false;
      } else {
        this.dataInform.optionsNotifyCenterObjOfSerious = true;
        this.dataInform.informPeopleCenterSerious = "";
      }
    },
    //勾选重大市级通知对象
    cityPropleMajor() {
      if (this.dataInform.checkCityMajor) {
        this.dataInform.optionsNotifyCityObjOfMajor = false;
      } else {
        this.dataInform.optionsNotifyCityObjOfMajor = true;
        this.dataInform.informPeopleCityMajor = "";
      }
    },
    //勾选重大省级通知对象
    porPropleMajor() {
      if (this.dataInform.checkProMajor) {
        this.dataInform.optionsNotifyProObjOfMajor = false;
      } else {
        this.dataInform.optionsNotifyProObjOfMajor = true;
        this.dataInform.informPeopleProMajor = "";
      }
    },
    //勾选重大中央通知对象
    centerPropleMajor() {
      if (this.dataInform.checkCenterMajor) {
        this.dataInform.optionsNotifyCenterObjOfMajor = false;
      } else {
        this.dataInform.optionsNotifyCenterObjOfMajor = true;
        this.dataInform.informPeopleCenterMajor = "";
      }
    }
  },
  watch: {
  
  }
};
</script>

<style lang='less' scoped>
@import "./less/index.less";
</style>
