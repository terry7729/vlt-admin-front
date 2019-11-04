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
       <inform-table :form="form" ref='table'></inform-table>
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
import informTable from "@/views/businessCharts/warningRule/informTable.vue";
export default {
   name: "gameRiskAdd",
  components: { informTable },
  data() {
    return {
      showMinimumReturnRate: false,
      showHighestReturnRate: false,
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
      type: null,
      showeditBox: false,
      tableData: [{ type: "最低返奖率" }, { type: "最高返奖率" }],
      form: {      
        cityId: "",
        cityName: "",
        collectFrequency: "", //采集间隔(单位：分钟) 传入15，表示15分钟匹配一次
        collectStatus: 0, //0生效 1停止
        gameId: "",
        gameName: "",
        highestReturnRateMajor: "", //最高返奖率-重大级别
        highestReturnRateOrdinary: "", //最高返奖率-普通级别
        highestReturnRateSerious: "", //最高返奖率-严重级别  
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
   
  
    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      this.gameRiskInsert(this.$refs.table.dataInform);
    },

    //游戏风险指标新增
    async gameRiskInsert(propsData) {
      const id = this.$route.query.id;
      const self = this;
      const res = await self.$api.gameRiskInsert({
        data: {        
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

           informCentralManIdMajor: propsData.informCentralManIdMajor,
          informProvinceManIdMajor: propsData.informProvinceManIdMajor,
          informCityManIdMajor: propsData.informCityManIdMajor,

          informCentralManIdOrdinary: propsData.informCentralManIdOrdinary,
          informProvinceManIdOrdinary: propsData.informProvinceManIdOrdinary,
          informCityManIdOrdinary: propsData.informCityManIdOrdinary,

          informCityManIdSerious: propsData.informCityManIdSerious,
          informCentralManIdSerious: propsData.informCentralManIdSerious,
          informProvinceManIdSerious: propsData.informProvinceManIdSerious,

          informWayMajor: propsData.informWayMajor,
          informWayOrdinary: propsData.informWayOrdinary,
          informWaySerious: propsData.informWaySerious,
           informTotalCountMajor: propsData.informData[2].warningPl,
          informTotalCountOrdinary: propsData.informData[1].warningPl,
          informTotalCountSerious: propsData.informData[0].warningPl,
        },
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
