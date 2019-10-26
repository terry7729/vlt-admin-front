<template>
  <div class="vlt-card">
    <h3 class="headling">城市风险指标修改</h3>
    <div class="vlt-card select-box">
      <span>省份</span>
      <el-select v-model="proviceValue" placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span>城市</span>
      <el-select v-model="cityValue" placeholder="请选择">
        <el-option
          v-for="item in options2"
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
      <el-form label-position="top" label-width="80px" ref="form" :rules="rules" :model="form">
         <div class="editfrom" v-show="showHighestSalesMoney">
          <el-form-item label="最高销量" prop="highestSalesMoneyOrdinary">
            <el-input v-model="form.highestSalesMoneyOrdinary"></el-input>
          </el-form-item>
          <el-form-item label="严重" prop="highestSalesMoneySerious">
            <el-input v-model="form.highestSalesMoneySerious"></el-input>
          </el-form-item>
          <el-form-item label="重大" prop="highestSalesMoneyMajor">
            <el-input v-model="form.highestSalesMoneyMajor"></el-input>
          </el-form-item>
        </div>
        <div class="editfrom" v-show="showMinimumSalesMoney">
          <el-form-item label="最低销量" prop="minimumSalesMoneyOrdinary">
            <el-input v-model="form.minimumSalesMoneyOrdinary"></el-input>
          </el-form-item>
          <el-form-item label="严重" prop="minimumSalesMoneySerious">
            <el-input v-model="form.minimumSalesMoneySerious"></el-input>
          </el-form-item>
          <el-form-item label="重大" prop="minimumSalesMoneyMajor">
            <el-input v-model="form.minimumSalesMoneyMajor"></el-input>
          </el-form-item>
        </div>
        <div class="editfrom" v-show="showMinimumOnlineCounts">
          <el-form-item label="最低在线数量" prop="minimumOnlineCountsOrdinary">
            <el-input v-model="form.minimumOnlineCountsOrdinary"></el-input>
          </el-form-item>
          <el-form-item label="严重" prop="minimumOnlineCountsSerious">
            <el-input v-model="form.minimumOnlineCountsSerious"></el-input>
          </el-form-item>
          <el-form-item label="重大" prop="minimumOnlineCountsMajor">
            <el-input v-model="form.minimumOnlineCountsMajor"></el-input>
          </el-form-item>
        </div>
        <div class="editfrom" v-show="showMinimumOperatingRate">
          <el-form-item label="最低开机率" prop="minimumOperatingRateOrdinary">
            <el-input v-model="form.minimumOperatingRateOrdinary"></el-input>
          </el-form-item>
          <el-form-item label="严重" prop="minimumOperatingRateSerious">
            <el-input v-model="form.minimumOperatingRateSerious"></el-input>
          </el-form-item>
          <el-form-item label="重大" prop="minimumOperatingRateMajor">
            <el-input v-model="form.minimumOperatingRateMajor"></el-input>
          </el-form-item>
        </div>
        <div class="editfrom" v-show="showMinimumHallSaleMoney">
          <el-form-item label="最低单厅销量" prop="minimumHallSaleMoneyOrdinary">
            <el-input v-model="form.minimumHallSaleMoneyOrdinary"></el-input>
          </el-form-item>
          <el-form-item label="严重" prop="minimumHallSaleMoneySerious">
            <el-input v-model="form.minimumHallSaleMoneySerious"></el-input>
          </el-form-item>
          <el-form-item label="重大" prop="minimumHallSaleMoneyMajor">
            <el-input v-model="form.minimumHallSaleMoneyMajor"></el-input>
          </el-form-item>
        </div>

        <div class="editfrom">
          <el-form-item prop label="监控时间点">
            <el-time-select
              placeholder="选择时间"
              v-model="watchingTime1"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:30'
              }"
              @change="changeTime1"
            ></el-time-select>
          </el-form-item>
          <el-form-item prop label="监控时间点">
            <el-time-select
              placeholder="选择时间"
              v-model="watchingTime2"
              :picker-options="{
                start: watchingTime1,
                step: '00:15',
                end: '23:30',
                minTime: watchingTime1
              }"
            ></el-time-select>
          </el-form-item>
          <el-form-item prop label="监控时间点">
            <el-time-select
              placeholder="选择时间"
              v-model="watchingTime3"
              :picker-options="{
                start: watchingTime2,
                step: '00:15',
                end: '23:30',
                minTime: watchingTime2
              }"
            ></el-time-select>
          </el-form-item>
          <el-form-item prop label="监控时间点">
            <el-time-select
              placeholder="选择时间"
              v-model="watchingTime4"
              :picker-options="{
                start: watchingTime3,
                step: '00:15',
                end: '23:30',
                minTime: watchingTime3
              }"
            ></el-time-select>
          </el-form-item>
        </div>
        <el-form-item>
          <div class="btn">
            <el-button type="primary" @click="onSubmit">修改</el-button>
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
                <el-checkbox  size="medium" v-model="checkCityOrdinary" @change="cityPropleOrdinary">市</el-checkbox>
                <el-select size="mini"  :disabled="optionsNotifyCityObjOfOrdinary" v-model="informPeopleCityOrdinary" placeholder="请选择">
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
                  :disabled="optionsNotifyProObjOfOrdinary"
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
                <el-checkbox label="中央" @change="centerPropleOrdinary" v-model="checkCenterOrdinary" size="medium">中央</el-checkbox>
                <el-select size="mini"  :disabled="optionsNotifyCenterObjOfOrdinary" v-model="informPeopleCenterOrdinary" placeholder="请选择">
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
                <el-select size="mini" v-model="informPeopleCitySerious" :disabled="optionsNotifyCityObjOfSerious" placeholder="请选择">
                  <el-option
                    v-for="item in options6"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    
                  ></el-option>
                </el-select>
                <el-checkbox label="省" size="medium" v-model="checkProSerious" @change="proPropleSerious"></el-checkbox>
                <el-select size="mini" :disabled="optionsNotifyProObjOfSerious" v-model="informPeopleProSerious" placeholder="请选择">
                  <el-option
                    v-for="item in options7"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                   
                  ></el-option>
                </el-select>
                <el-checkbox label="中央" size="medium" v-model="checkCenterSerious" @change="centerPropleSerious"></el-checkbox>
                <el-select size="mini"  :disabled="optionsNotifyCenterObjOfSerious" v-model="informPeopleCenterSerious" placeholder="请选择">
                  <el-option
                    v-for="item in options8"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                   
                  ></el-option>
                </el-select>
        
            </div>
            <div v-if="scope.row.warningLevel==='重大'" class="checkInfor">
             
                <el-checkbox label="市" v-model="checkCityMajor"  @change="cityPropleMajor" size="medium"></el-checkbox>
                <el-select size="mini"  :disabled="optionsNotifyCityObjOfMajor" v-model="informPeopleCityMajor" placeholder="请选择">
                  <el-option
                    v-for="item in options9"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-checkbox label="省" v-model="checkProMajor" @change="porPropleMajor" size="medium"></el-checkbox>
                <el-select size="mini"  :disabled="optionsNotifyProObjOfMajor" v-model="informPeopleProMajor" placeholder="请选择">
                  <el-option
                    v-for="item in options10"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-checkbox label="中央" v-model="checkCenterMajor" @change="centerPropleMajor" size="medium"></el-checkbox>
                <el-select size="mini"  :disabled="optionsNotifyCenterObjOfMajor" v-model="informPeopleCenterMajor" placeholder="请选择">
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
      watchingTime2:'',
      watchingTime1:'',
      watchingTime3:'',
      watchingTime4:'',
      showHighestSalesMoney: false,
      showMinimumSalesMoney: false,
      showMinimumOnlineCounts: false,
      showMinimumOperatingRate: false,
      showMinimumHallSaleMoney: false,
      num: 10,
      checkCenterOrdinary: false,
      checkList: ["站内"],
      checkList1: ["站内", "短信"],
      checkList2: ["站内", "短信", "邮件"],
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
      type: null,
      showeditBox: false,
      tableData: [
        { type: "最高销量" },
        { type: "最低销量" },
        { type: "最低在线数量" },
        { type: "最低开机率" },
        { type: "最低单厅销量" }
      ],
      options1: [
        {
          value: 1,
          label: "广东"
        },
        {
          value: 2,
          label: "广西"
        }
      ],
      options2: [
        {
          value: 3,
          label: "深圳"
        },
        {
          value: 4,
          label: "广州"
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
      optionsNotifyCityObjOfOrdinary: false, //普通市级通知对象
      optionsNotifyProObjOfOrdinary: false, //普通省级通知对象
      optionsNotifyCenterObjOfOrdinary: false, //普通中央通知对象
      optionsNotifyCityObjOfSerious: false, //严重市级通知对象
      optionsNotifyProObjOfSerious: false, //严重省级通知对象
      optionsNotifyCenterObjOfSerious: false, //严重中央通知对象
      optionsNotifyCityObjOfMajor: false, //重大市级通知对象
      optionsNotifyProObjOfMajor: false, //重大省级通知对象
      optionsNotifyCenterObjOfMajor: false, //重大中央通知对象
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
        highestSalesMoneyMajor: "", //最低返奖率-重大级别
        highestSalesMoneySerious: "", //最低返奖率-普通级别
        highestSalesMoneyOrdinary: "", //最低返奖率-严重级别
        provinceId: "", //省级id
        provinceName: "", //省级名称
        minimumHallSaleMoneyMajor: "", //最高返奖率-重大级别
        minimumHallSaleMoneySerious: "", //最高返奖率-普通级别
        minimumHallSaleMoneyOrdinary: "", //最高返奖率-严重级别
        minimumOnlineCountsMajor: "", //最高返奖率-重大级别
        minimumOnlineCountsSerious: "", //最高返奖率-普通级别
        minimumOnlineCountsOrdinary: "", //最高返奖率-严重级别
        minimumOperatingRateMajor: "", //最高返奖率-重大级别
        minimumOperatingRateSerious: "", //最高返奖率-普通级别
        minimumOperatingRateOrdinary: "", //最高返奖率-严重级别
        minimumSalesMoneyMajor: "", //最高返奖率-重大级别
        minimumSalesMoneyOrdinary: "", //最高返奖率-普通级别
        minimumSalesMoneySerious: "" //最高返奖率-严重级别
      },
      rules: {
        highestSalesMoneyOrdinary: [
          { validator: rules.numberCheck, trigger: "blur" }
        ],
        highestSalesMoneySerious: [
          { validator: rules.numberCheck, trigger: "blur" }
        ],
        highestSalesMoneyMajor: [
          { validator: rules.numberCheck, trigger: "blur" }
        ],
        minimumSalesMoneyOrdinary: [
          { validator: rules.numberCheck, trigger: "blur" }
        ],
        minimumSalesMoneySerious: [
          { validator: rules.numberCheck, trigger: "blur" }
        ],
        minimumSalesMoneyMajor: [
          { validator: rules.numberCheck, trigger: "blur" }
        ],
        minimumOnlineCountsOrdinary: [
          { validator: rules.numberCheck, trigger: "blur" }
        ],
        minimumOnlineCountsSerious: [
          { validator: rules.numberCheck, trigger: "blur" }
        ],
        minimumOnlineCountsMajor: [
          { validator: rules.numberCheck, trigger: "blur" }
        ],
        minimumOperatingRateOrdinary: [
          { validator: rules.numberCheck, trigger: "blur" }
        ],
        minimumOperatingRateSerious: [
          { validator: rules.numberCheck, trigger: "blur" }
        ],
        minimumOperatingRateMajor: [
          { validator: rules.numberCheck, trigger: "blur" }
        ],
        minimumHallSaleMoneyOrdinary: [
          { validator: rules.numberCheck, trigger: "blur" }
        ],
        minimumHallSaleMoneySerious: [
          { validator: rules.numberCheck, trigger: "blur" }
        ],
        minimumHallSaleMoneyMajor: [
          { validator: rules.numberCheck, trigger: "blur" }
        ]
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
    //勾选对应通知方式改变
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

     //通知对象改变
     peopleCheckChange(checked,options,value){
      if(checked){
        this[options]=false
      }else{
        this[options]=true
        this[value]=''
      }          
    },
    //勾选普通市级通知对象
    cityPropleOrdinary() {   
      this.peopleCheckChange(this.checkCityOrdinary,'optionsNotifyCityObjOfOrdinary','informPeopleCityOrdinary')
    },

    //勾选普通省级通知对象
    proPropleOrdinary() {
      this.peopleCheckChange(this.checkProOrdinary,'optionsNotifyProObjOfOrdinary','informPeopleProOrdinary')
    },
    //勾选普通中央通知对象
    centerPropleOrdinary() {
       this.peopleCheckChange(this.checkCenterOrdinary,'optionsNotifyCenterObjOfOrdinary','informPeopleCenterOrdinary')
    },
    //勾选严重城市通知对象
    cityPropleSerious() {
      this.peopleCheckChange(this.checkCitySerious,'optionsNotifyCityObjOfSerious','informPeopleCitySerious')
    },
    //勾选严重省级通知对象
    proPropleSerious() {
      this.peopleCheckChange(this.checkProSerious,'optionsNotifyProObjOfSerious','informPeopleProSerious')
    },
    //勾选严重中央通知对象
    centerPropleSerious() {
      this.peopleCheckChange(this.checkCenterSerious,'optionsNotifyCenterObjOfSerious','informPeopleCenterSerious')
    },
    //勾选重大市级通知对象
    cityPropleMajor() {
      this.peopleCheckChange(this.checkCityMajor,'optionsNotifyCityObjOfMajor','informPeopleCityMajor')
    },
    //勾选重大省级通知对象
    porPropleMajor() {
      this.peopleCheckChange(this.checkProMajor,'optionsNotifyProObjOfMajor','informPeopleProMajor')
    },
    //勾选重大中央通知对象
    centerPropleMajor() {
      this.peopleCheckChange(this.checkCenterMajor,'optionsNotifyCenterObjOfMajor','informPeopleCenterMajor')
    },
    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      this.cityRiskUpdate()
    },
     //表格选择指标配置显示对应要设置的
    selectChange(val) {
      this.type = val;
      if (this.type && this.type.length > 0) {
        this.showeditBox = true;
        var list = this.type.map(v => {
          return v.type;
        });
        if (list.includes("最高销量")) {
          this.showHighestSalesMoney = true;
        } else {
          this.showHighestSalesMoney = false;
          this.form.highestSalesMoneyMajor=''
          this.form.highestSalesMoneySerious='',
          this.form.highestSalesMoneyOrdinary=''
        }
        if (list.includes("最低销量")) {
          this.showMinimumSalesMoney = true;
        } else {
          this.showMinimumSalesMoney = false;
          this.form.minimumSalesMoneyMajor='',
          this.form.minimumSalesMoneyOrdinary=''
          this.form.minimumSalesMoneySerious=''
        }
        if (list.includes("最低开机率")) {
          this.showMinimumOperatingRate = true;
        } else {
          this.showMinimumOperatingRate = false;
          this.form.minimumOperatingRateMajor=''
          this.form.minimumOperatingRateSerious=''
          this.form.minimumOperatingRateOrdinary=''
        }
        if (list.includes("最低在线数量")) {
          this.showMinimumOnlineCounts = true;
        } else {
          this.showMinimumOnlineCounts = false;
          this.form.minimumOnlineCountsMajor=''
          this.form.minimumOnlineCountsSerious=''
          this.form.minimumOnlineCountsOrdinary=''
        }
        if (list.includes("最低单厅销量")) {
          this.showMinimumHallSaleMoney = true;
        } else {
          this.showMinimumHallSaleMoney = false;
          this.form.minimumHallSaleMoneyMajor=''
          this.form.minimumHallSaleMoneyOrdinary=''
          this.form.minimumHallSaleMoneySerious=''
        }
      } else {
        this.showeditBox = false;
      }
    },
    //游戏风险指标修改
    async cityRiskUpdate() {
      const self = this;
      this.form.alarmFrequencyMajor = this.tableData1[2].warningPl;
      this.form.alarmFrequencySerious = this.tableData1[1].warningPl;
      this.form.alarmFrequencyOrdinary = this.tableData1[0].warningPl;
      const res = await self.$api.cityRiskUpdate({
        data: {
          alarmFrequencyMajor: this.form.alarmFrequencyMajor,
          alarmFrequencyOrdinary: this.form.alarmFrequencyOrdinary,
          alarmFrequencySerious: this.form.alarmFrequencySerious,
          cityId: this.cityValue,
          cityName: this.cityValue,
          provinceId: this.proviceValue,
          provinceName: this.proviceValue,
          // collectFrequency: this.form.collectFrequency,
          collectStatus: this.form.collectStatus,
          informCentralManIdMajor: this.informPeopleCenterMajor,
          informCentralManIdOrdinary: this.informPeopleCityMajor,
          informCentralManIdSerious: this.informPeopleProMajor,
          informCityManIdMajor: this.informPeopleCenterOrdinary,
          informCityManIdOrdinary: this.informPeopleCityOrdinary,
          informCityManIdSerious: this.informPeopleProOrdinary,
          informProvinceManIdMajor: this.informPeopleCenterSerious,
          informProvinceManIdOrdinary: this.informPeopleCitySerious,
          informProvinceManIdSerious: this.informPeopleProSerious,
          informWayMajor: this.form.informWayMajor,
          informWayOrdinary: this.form.informWayOrdinary,
          informWaySerious: this.form.informWaySerious,

          highestSalesMoneyMajor: this.form.highestSalesMoneyMajor,
          highestSalesMoneyOrdinary: this.form.highestSalesMoneyOrdinary,
          highestSalesMoneySerious: this.form.highestSalesMoneySerious,

          minimumOnlineCountsMajor: this.form.minimumOnlineCountsMajor,

          minimumOnlineCountsOrdinary: this.form.minimumOnlineCountsOrdinary,
          minimumOnlineCountsSerious: this.form.minimumOnlineCountsSerious,

          minimumOperatingRateMajor: this.form.minimumOperatingRateMajor,
          minimumOperatingRateOrdinary: this.form.minimumOperatingRateOrdinary,
          minimumOperatingRateSerious: this.form.minimumOperatingRateSerious,

          minimumSalesMoneyMajor: this.form.minimumSalesMoneyMajor,
          minimumSalesMoneyOrdinary: this.form.minimumSalesMoneyOrdinary,
          minimumSalesMoneySerious: this.form.minimumSalesMoneySerious,

          minimumHallSaleMoneyMajor: this.form.minimumHallSaleMoneyMajor,
          minimumHallSaleMoneyOrdinary: this.form.minimumHallSaleMoneyOrdinary,
          minimumHallSaleMoneySerious: this.form.minimumHallSaleMoneySerious,
          timingFirst:this.watchingTime1,
          timingSecond:this.watchingTime2,
          timingThird:this.watchingTime3,
          timingFourth:this.watchingTime4,
          businessKey:this.$route.query.id
        }
      });
      if (res && res.code == 0) {
        this.$message({
          message: "修改成功",
          type: "success"
        });
      } else {
        this.$message.error("修改失败");
      }
    },
    changeTime1(){
      this.watchingTime2='';
      this.watchingTime3='';
      this.watchingTime4='';
    },
    async getDetailInfo() {
      const id = this.$route.query.id;
      const self = this;
      const res = await self.$api.getCityRiskDetail({
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
       
        this.informPeopleCenterMajor = this.form.informCentralManIdMajor;
        this.informPeopleCityMajor = this.form.informCentralManIdOrdinary;
        this.informPeopleProMajor = this.form.informCentralManIdSerious;
        this.informPeopleCenterOrdinary = this.form.informCityManIdMajor;
        this.informPeopleCityOrdinary = this.form.informCityManIdOrdinary;
        this.informPeopleProOrdinary = this.form.informCityManIdSerious;
        this.informPeopleCenterSerious = this.form.informProvinceManIdMajor;
        this.informPeopleCitySerious = this.form.informProvinceManIdOrdinary;
        this.informPeopleProSerious = this.form.informProvinceManIdSerious;
        this.watchingTime1=res.data.timingFirst;
        this.watchingTime2=res.data.timingSecond;
        this.watchingTime3=res.data.timingThird;
        this.watchingTime4=res.data.timingFourth;
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
  },created() {
       //默认全选
    this.$nextTick(() => {
      for (let i = 0; i < this.tableData.length; i++) {
        this.$refs.multipleTable.toggleRowSelection(this.tableData[i], true);
      }
    });
    this.getDetailInfo();
  },
};
</script>

<style lang='less' scoped>
@import './less/index.less';
</style>
