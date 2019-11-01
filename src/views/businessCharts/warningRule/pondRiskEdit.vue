<template>
  <div class="vlt-card">
    <h3 class="headling">奖池风险指标新增</h3>
    <div class="vlt-card select-box">
      <span>游戏</span>
      <el-select v-model="gameValue" placeholder="请选择">
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
        ref="multipleTable"
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
        <el-form-item>
          <div v-for="item in type" class="editfrom">
            <el-form-item>
              <span slot="label">{{item.type}}</span>
              <span v-if="item.type==='最低奖池金额'">
                <el-input v-model="form.minJackpotMoneyOrdinary"></el-input>
              </span>
              <span v-if="item.type==='最高奖池金额'">
                <el-input v-model="form.maxJackpotMoneyOrdinary"></el-input>
              </span>
            </el-form-item>
            <el-form-item label="严重">
              <span v-if="item.type==='最低奖池金额'">
                <el-input v-model="form.minJackpotMoneySerious"></el-input>
              </span>
              <span v-if="item.type==='最高奖池金额'">
                <el-input v-model="form.maxJackpotMoneySerious"></el-input>
              </span>
            </el-form-item>
            <el-form-item label="重大">
              <span v-if="item.type==='最低奖池金额'">
                <el-input v-model="form.minJackpotMoneyMajor"></el-input>
              </span>
              <span v-if="item.type==='最高奖池金额'">
                <el-input v-model="form.maxJackpotMoneyMajor"></el-input>
              </span>
            </el-form-item>
          </div>
        </el-form-item>
        <div class="editfrom">
          <el-form-item prop label="监控频率">
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
          <el-table-column align="center" prop="warningLevel" label="告警等级" min-width="5%"></el-table-column>
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
                <el-checkbox size="medium" v-model="checked1" @change="cityPropleOrdinary">市</el-checkbox>
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
                  v-model="checked2"
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
                  v-model="checked3"
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
                  v-model="checked4"
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
                <el-checkbox label="省" size="medium" v-model="checked5" @change="proPropleSerious"></el-checkbox>
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
                  v-model="checked6"
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
                <el-checkbox label="市" v-model="checked7" @change="cityPropleMajor" size="medium"></el-checkbox>
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
                <el-checkbox label="省" v-model="checked8" @change="porPropleMajor" size="medium"></el-checkbox>
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
                  v-model="checked9"
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
        <el-button type="primary" v-prevent="1000" @click="onSubmit">修改</el-button>
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
      num: "",
      value1: "",
      checkListOrdinary: ["站内"],
      checkListSeriours: ["站内", "短信"],
      checkListMajor: ["站内", "短信", "邮件"],
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
      //[new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
      options: [
        {
          value: 1,
          label: "1"
        },
        {
          value: 2,
          label: "2"
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
      checked1: true,
      checked2: false,
      checked3: false,
      checked4: true,
      checked5: true,
      checked6: false,
      checked7: true,
      checked8: true,
      checked9: true,
      optionsNotifyCityObjOfOrdinary1: false, //普通市级通知对象
      optionsNotifyProObjOfOrdinary1: false, //普通省级通知对象
      optionsNotifyCenterObjOfOrdinary1: false, //普通中央通知对象
      optionsNotifyCityObjOfSerious: false, //严重市级通知对象
      optionsNotifyProObjOfSerious: false, //严重省级通知对象
      optionsNotifyCenterObjOfSerious: false, //严重中央通知对象
      optionsNotifyCityObjOfMajor: false, //重大市级通知对象
      optionsNotifyProObjOfMajor: false, //重大省级通知对象
      optionsNotifyCenterObjOfMajor: false, //重大中央通知对象

      value: "",
      num: 10,
      type: null,
      showeditBox: false,
      tableData: [{ type: "最高奖池金额" }, { type: "最低奖池金额" }],
      controlOptions: [
        { name: "确认", type: "primary", icon: "" } // type为按钮的五种颜色， icon为具体的图标
      ],
      form: {
        informTotalCountMajor: "", //重大告警频次
        informTotalCountOrdinary: "", //普通告警频次
        informTotalCountSerious: "", //严重告警频次
        collectFrequency: "", //采集间隔(单位：分钟) 传入15，表示15分钟匹配一次
        collectStatus: 0, //0生效 1停止
        gameId: "",
        gameName: "",
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
        informWayMajor: 7, //重大通知方式 1站内 2邮件 3短信 4站|邮 5站|端 6邮|短 7全部
        informWaySerious: 5, //严重通知方式 同上
        informWayOrdinary: 1, //普通通知方式
        minJackpotMoneyMajor: "", //最低奖池金额-重大级别
        minJackpotMoneyOrdinary: "", //最低奖池金额-普通级别
        minJackpotMoneySerious: "" //最低奖池金额-严重级别
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
      this.pondRiskUpdate();
    },
    async pondRiskUpdate() {
      const res = await this.$api.pondRiskUpdate({
        data: {
          informTotalCountMajor: this.tableData1[2].warningPl,
          informTotalCountOrdinary: this.tableData1[1].warningPl,
          informTotalCountSerious: this.tableData1[0].warningPl,
          gameId: this.gameValue,
          gameName: this.gameValue,
          collectFrequency: this.form.collectFrequency,
          collectStatus: this.form.collectStatus,
          maxJackpotMoneyMajor: this.form.maxJackpotMoneyMajor,
          maxJackpotMoneyOrdinary: this.form.maxJackpotMoneyOrdinary,
          maxJackpotMoneySerious: this.form.maxJackpotMoneySerious,

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
          minJackpotMoneyMajor: this.form.minJackpotMoneyMajor,
          minJackpotMoneyOrdinary: this.form.minJackpotMoneyOrdinary,
          minJackpotMoneySerious: this.form.minJackpotMoneySerious,
          businessKey: this.$route.query.id
        },
        baseURL:'http://10.6.0.203:8086/api'
      });
      if (res && res.code == 0) {
        this.$message({
          message: "修改成功",
          type: "success"
        });
        this.$router.push({
          name: "pondRiskDetail",
          query: {
            id: this.$route.query.id
          }
        });
      } else {
        this.$message.error("修改失败");
      }
    },
    selectChange(val) {
      // this.showeditBox = false;
      this.type = val;
      if (this.type) {
        if (this.type.length > 0) {
          this.showeditBox = true;
        } else {
          this.showeditBox = false;
        }
      }
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
    getInformIdByCheckValue(arrList, name) {
      if (arrList) {
        if (arrList.length == 1) {
          if (arrList.includes("站内")) {
            this.form[name] = 1;
          } else if (arrList.includes("邮件")) {
            this.form[name] = 2;
          } else {
            this.form[name] = 3;
          }
        } else if (arrList.length == 2) {
          if (arrList.includes("站内") && arrList.includes("邮件")) {
            this.form[name] = 4;
          } else if (arrList.includes("短信") && arrList.includes("邮件")) {
            this.form[name] = 6;
          } else {
            this.form[name] = 5;
          }
        } else if (arrList.length == 3) {
          this.form[name] = 7;
        } else {
          this.form[name] = "";
        }
      }
    },
    //勾选普通市级通知对象
    cityPropleOrdinary() {
      if (this.checked1) {
        this.optionsNotifyCityObjOfOrdinary1 = false;
      } else {
        this.optionsNotifyCityObjOfOrdinary1 = true;
        this.informPeopleCityOrdinary = "";
      }
    },
    //勾选普通省级通知对象
    proPropleOrdinary() {
      if (this.checked2) {
        this.optionsNotifyProObjOfOrdinary1 = false;
      } else {
        this.optionsNotifyProObjOfOrdinary1 = true;
        this.informPeopleProOrdinary = "";
      }
    },
    //勾选普通中央通知对象
    centerPropleOrdinary() {
      if (this.checked3) {
        this.optionsNotifyCenterObjOfOrdinary1 = false;
      } else {
        this.optionsNotifyCenterObjOfOrdinary1 = true;
        this.informPeopleCenterOrdinary = "";
      }
    },
    //勾选严重城市通知对象
    cityPropleSerious() {
      if (this.checked4) {
        this.optionsNotifyCityObjOfSerious = false;
      } else {
        this.optionsNotifyCityObjOfSerious = true;
        this.informPeopleCitySerious = "";
      }
    },
    //勾选严重省级通知对象
    proPropleSerious() {
      if (this.checked5) {
        this.optionsNotifyProObjOfSerious = false;
      } else {
        this.optionsNotifyProObjOfSerious = true;
        this.informPeopleProSerious = "";
      }
    },
    //勾选严重中央通知对象
    centerPropleSerious() {
      if (this.checked6) {
        this.optionsNotifyCenterObjOfSerious = false;
      } else {
        this.optionsNotifyCenterObjOfSerious = true;
        this.informPeopleCenterSerious = "";
      }
    },
    //勾选重大市级通知对象
    cityPropleMajor() {
      if (this.checked7) {
        this.optionsNotifyCityObjOfMajor = false;
      } else {
        this.optionsNotifyCityObjOfMajor = true;
        this.informPeopleCityMajor = "";
      }
    },
    //勾选重大省级通知对象
    porPropleMajor() {
      if (this.checked8) {
        this.optionsNotifyProObjOfMajor = false;
      } else {
        this.optionsNotifyProObjOfMajor = true;
        this.informPeopleProMajor = "";
      }
    },
    //勾选重大中央通知对象
    centerPropleMajor() {
      if (this.checked9) {
        this.optionsNotifyCenterObjOfMajor = false;
      } else {
        this.optionsNotifyCenterObjOfMajor = true;
        this.informPeopleCenterMajor = "";
      }
    },
    async getDetailInfo() {
      const id = this.$route.query.id;
      const self = this;
      const res = await self.$api.getPondRiskDetail({
        data: {
          businessKey: id
        },
        baseURL:'http://10.6.0.203:8086/api'
      });
      if (res && res.code == 0) {
        this.form = res.data;
        this.gameValue = res.data.gameId;
        this.proviceValue = res.data.provinceId;
        this.cityValue = res.data.cityId;
        this.tableData1[2].warningPl = this.form.informTotalCountMajor;
        this.tableData1[1].warningPl = this.form.informTotalCountSerious;
        this.tableData1[0].warningPl = this.form.informTotalCountOrdinary;
        this.checkListMajor = informs.showInformType(this.form.informWayMajor);
        this.checkListSeriours = informs.showInformType(this.form.informWaySerious);
        this.checkListOrdinary = informs.showInformType(this.form.informWayOrdinary);
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
@import "./less/index.less";
</style>
