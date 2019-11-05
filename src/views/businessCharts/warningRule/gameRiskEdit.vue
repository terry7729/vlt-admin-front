<template>
  <div class="vlt-card">
    <h3 class="headling">城市游戏风险指标修改</h3>
    <div class="vlt-card select-box">
      <span>游戏</span>
      <el-select v-model="form.gameId" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.gameId"
          :label="item.gameName"
          :value="item.gameId"
        ></el-option>
      </el-select>
      <span>省份</span>
      <el-select v-model="form.provinceId" placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.provinceId"
          :label="item.provinceName"
          :value="item.provinceId"
        ></el-option>
      </el-select>
      <span>城市</span>
      <el-select v-model="form.cityId" placeholder="请选择">
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
      <inform-table :informInfo='form' ref='table'></inform-table>
      <div class="btn">
        <el-button type="primary" v-prevent="1000" @click="onSubmit">修改</el-button>
        <el-button @click="gotoList">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import rules from "@/utils/rules.js";
import informs from "@/utils/inform.js";
import informTable from "@/views/businessCharts/warningRule/informTable.vue";
export default {
  name: "gameRiskEdit",
  components: { informTable },
  data() {
    return {
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
      type: null,
      showeditBox: false,
      tableData: [{ type: "最低返奖率" }, { type: "最高返奖率" }],
      controlOptions: [
        { name: "确认", type: "primary", icon: "" } // type为按钮的五种颜色， icon为具体的图标
      ],
      form: {      
        cityId: "",
        cityName: "",
        collectFrequency: "", //采集间隔(单位：分钟) 传入15，表示15分钟匹配一次
        collectStatus: 0, //0生效 1停止
        gameId: "",
        gameName: "",
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
    
    handleChange(value) {
      console.log(value);
    },
    onSubmit() {
      this.gameRiskUpdate(this.$refs.table.dataInform);
    },
    gotoList() {
      this.$router.push({
        name:'cityGameRisk'
      })
    },
    //游戏风险指标修改
    async gameRiskUpdate(propsData) {
      const self = this
      const res = await self.$api.gameRiskUpdate({
        data: {  
          businessKey: this.$route.query.id,
          cityId: this.form.cityId,
          cityName: this.form.cityId,
          provinceId: this.form.provinceId,
          provinceName: this.form.provinceId,
          gameId: this.form.gameId,
          gameName: this.form.gameId,
          collectFrequency: this.form.collectFrequency,
          collectStatus: this.form.collectStatus,
          highestReturnRateMajor: this.form.highestReturnRateMajor,
          highestReturnRateOrdinary: this.form.highestReturnRateOrdinary,
          highestReturnRateSerious: this.form.highestReturnRateSerious,
          minimumReturnRateMajor: this.form.minimumReturnRateMajor,
          minimumReturnRateOrdinary: this.form.minimumReturnRateOrdinary,
          minimumReturnRateSerious: this.form.minimumReturnRateSerious,
          
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
          message: "修改成功",
          type: "success"
        });
        this.$router.push({
          name: "gameRiskDetail",
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
        },
      });
      if (res && res.code == 0) {
        this.form = res.data;
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
