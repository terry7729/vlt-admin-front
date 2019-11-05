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
              v-model="form.timingFirst"
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
              v-model="form.timingSecond"
              :picker-options="{
                start: form.timingFirst,
                step: '00:15',
                end: '23:30',
                minTime: form.timingFirst
              }"
            ></el-time-select>
          </el-form-item>
          <el-form-item prop label="监控时间点">
            <el-time-select
              placeholder="选择时间"
              v-model="form.timingThird"
              :picker-options="{
                start: form.timingSecond,
                step: '00:15',
                end: '23:30',
                minTime: form.timingSecond
              }"
            ></el-time-select>
          </el-form-item>
          <el-form-item prop label="监控时间点">
            <el-time-select
              placeholder="选择时间"
              v-model="form.timingFourth"
              :picker-options="{
                start: form.timingThird,
                step: '00:15',
                end: '23:30',
                minTime: form.timingThird
              }"
            ></el-time-select>
          </el-form-item>
        </div>
        <el-form-item>
          <p class="tips">
            <span>*</span>数值达到对应风险指标值即为触发
          </p>
        </el-form-item>
      </el-form>
      <inform-table :informInfo="tablesData" ref="table"></inform-table>
      <div class="btn">
        <el-button type="primary" v-prevent="1000" @click="onSubmit">修改</el-button>
        <el-button @click="goList">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import rules from "@/utils/rules.js";
import informs from "@/utils/inform.js";
import informTable from "@/views/businessCharts/warningRule/informTable.vue";
export default {
  name: "cityRiskEdit",
  components: { informTable },
  data() {
    return {
      tablesData: {},

      showHighestSalesMoney: false,
      showMinimumSalesMoney: false,
      showMinimumOnlineCounts: false,
      showMinimumOperatingRate: false,
      showMinimumHallSaleMoney: false,
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

      gameValue: "",
      cityValue: "",
      proviceValue: "", //

      controlOptions: [
        { name: "确认", type: "primary", icon: "" } // type为按钮的五种颜色， icon为具体的图标
      ],
      form: {
        timingSecond: "",
        timingFirst: "",
        timingThird: "",
        timingFourth: "",
        cityId: "",
        cityName: "",
        collectFrequency: "", //采集间隔(单位：分钟) 传入15，表示15分钟匹配一次
        collectStatus: 0, //0生效 1停止

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
          { validator: rules.checkPointOrPercent, trigger: "blur" }
        ],
        minimumOperatingRateSerious: [
          { validator: rules.checkPointOrPercent, trigger: "blur" }
        ],
        minimumOperatingRateMajor: [
          { validator: rules.checkPointOrPercent, trigger: "blur" }
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
    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      this.cityRiskUpdate();
    },
    goList() {
      this.$router.push({ name: "cityRisk" });
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
          this.form.highestSalesMoneyMajor = "";
          (this.form.highestSalesMoneySerious = ""),
            (this.form.highestSalesMoneyOrdinary = "");
        }
        if (list.includes("最低销量")) {
          this.showMinimumSalesMoney = true;
        } else {
          this.showMinimumSalesMoney = false;
          (this.form.minimumSalesMoneyMajor = ""),
            (this.form.minimumSalesMoneyOrdinary = "");
          this.form.minimumSalesMoneySerious = "";
        }
        if (list.includes("最低开机率")) {
          this.showMinimumOperatingRate = true;
        } else {
          this.showMinimumOperatingRate = false;
          this.form.minimumOperatingRateMajor = "";
          this.form.minimumOperatingRateSerious = "";
          this.form.minimumOperatingRateOrdinary = "";
        }
        if (list.includes("最低在线数量")) {
          this.showMinimumOnlineCounts = true;
        } else {
          this.showMinimumOnlineCounts = false;
          this.form.minimumOnlineCountsMajor = "";
          this.form.minimumOnlineCountsSerious = "";
          this.form.minimumOnlineCountsOrdinary = "";
        }
        if (list.includes("最低单厅销量")) {
          this.showMinimumHallSaleMoney = true;
        } else {
          this.showMinimumHallSaleMoney = false;
          this.form.minimumHallSaleMoneyMajor = "";
          this.form.minimumHallSaleMoneyOrdinary = "";
          this.form.minimumHallSaleMoneySerious = "";
        }
      } else {
        this.showeditBox = false;
      }
    },
    //游戏风险指标修改
    async cityRiskUpdate() {
      const self = this;
      this.form.informTotalCountMajor = this.tableData1[2].warningPl;
      this.form.informTotalCountSerious = this.tableData1[1].warningPl;
      this.form.informTotalCountOrdinary = this.tableData1[0].warningPl;
      const res = await self.$api.cityRiskUpdate({
        data: {
          informTotalCountMajor: this.form.informTotalCountMajor,
          informTotalCountOrdinary: this.form.informTotalCountOrdinary,
          informTotalCountSerious: this.form.informTotalCountSerious,
          cityId: this.cityValue,
          cityName: this.cityValue,
          provinceId: this.proviceValue,
          provinceName: this.proviceValue,
          // collectFrequency: this.form.collectFrequency,
          collectStatus: this.form.collectStatus,
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

          highestSalesMoneyMajor: this.form.highestSalesMoneyMajor,
          highestSalesMoneyOrdinary: this.form.highestSalesMoneyOrdinary,
          highestSalesMoneySerious: this.form.highestSalesMoneySerious,

          minimumOnlineCountsMajor: this.form.minimumOnlineCountsMajor,

          minimumOnlineCountsOrdinary: this.form.minimumOnlineCountsOrdinary,
          minimumOnlineCountsSerious: this.form.minimumOnlineCountsSerious,

          minimumOperatingRateMajor: informs.conventToPoint(
            this.form.minimumOperatingRateMajor
          ),
          minimumOperatingRateOrdinary: informs.conventToPoint(
            this.form.minimumOperatingRateOrdinary
          ),
          minimumOperatingRateSerious: informs.conventToPoint(
            this.form.minimumOperatingRateSerious
          ),

          minimumSalesMoneyMajor: this.form.minimumSalesMoneyMajor,
          minimumSalesMoneyOrdinary: this.form.minimumSalesMoneyOrdinary,
          minimumSalesMoneySerious: this.form.minimumSalesMoneySerious,

          minimumHallSaleMoneyMajor: this.form.minimumHallSaleMoneyMajor,
          minimumHallSaleMoneyOrdinary: this.form.minimumHallSaleMoneyOrdinary,
          minimumHallSaleMoneySerious: this.form.minimumHallSaleMoneySerious,
          timingFirst: this.form.timingFirst,
          timingSecond: this.form.timingSecond,
          timingThird: this.form.timingThird,
          timingFourth: this.form.timingFourth,
          businessKey: this.$route.query.id
        }
      });
      if (res && res.code == 0) {
        this.$message({
          message: "修改成功",
          type: "success"
        });
        this.$router.push({
          name: "cityRiskDetail",
          query: {
            id: this.$route.query.id
          }
        });
      } else {
        this.$message.error("修改失败");
      }
    },
    changeTime1() {
      this.form.timingSecond = "";
      this.form.timingThird = "";
      this.form.timingFourth = "";
    },
    //获取详细信息
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
        this.tablesData=res.data
      }
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
@import "./less/index.less";
</style>
