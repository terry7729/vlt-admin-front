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
      </el-form>
      <informTable :form="form" ref='table'></informTable>
       <div class="btn">
        <el-button type="primary" v-prevent="1000" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import inform from "@/utils/inform.js";
import rules from "@/utils/rules.js";
import informTable from "@/views/businessCharts/warningRule/informTable.vue";
export default {
  name: "pondRiskAdd",
  components: { informTable },
  data() {
    return {
      options: [
        {
          value: 1,
          label: "幸运卡片"
        },
        {
          value: 2,
          label: "侏罗寻宝"
        }
      ],
      gameValue: "",
      cityValue: "",
      proviceValue: "",
      value: "",
      type: null,
      showeditBox: false,
      tableData: [{ type: "最高奖池金额" }, { type: "最低奖池金额" }],
      controlOptions: [
        { name: "确认", type: "primary", icon: "" } // type为按钮的五种颜色， icon为具体的图标
      ],
      form: {    
        collectFrequency: "", //采集间隔(单位：分钟) 传入15，表示15分钟匹配一次
        collectStatus: 0, //0生效 1停止
        gameId: "",
        gameName: "",
        maxJackpotMoneyMajor: "", //最高奖池金额-重大级别
        maxJackpotMoneyOrdinary: "", //最高奖池金额-普通级别
        maxJackpotMoneySerious: "", //最高奖池金额-严重级别  
        maxJackpotMoneyMajor: "", //最高奖池金额-重大级别
        maxJackpotMoneyOrdinary: "", //最高奖池金额-普通级别
        maxJackpotMoneySerious: "", //最高奖池金额-严重级别
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
    //初始化
    init() {},
    handleChange(value) {
      console.log(value);
    },
    //提交
    onSubmit() {
      this.pondRiskInsert(this.$refs.table.dataInform)
    },
    async pondRiskInsert(propsData) {
      const res = await this.$api.pondRiskInsert({
        data: {
          informTotalCountMajor: propsData.informData[2].warningPl,
          informTotalCountOrdinary: propsData.informData[1].warningPl,
          informTotalCountSerious: propsData.informData[0].warningPl,
          gameId: this.gameValue,
          gameName: this.gameValue,
          collectFrequency: this.form.collectFrequency,
          collectStatus: this.form.collectStatus,
          maxJackpotMoneyMajor: this.form.maxJackpotMoneyMajor,
          maxJackpotMoneyOrdinary: this.form.maxJackpotMoneyOrdinary,
          maxJackpotMoneySerious: this.form.maxJackpotMoneySerious,
          minJackpotMoneyMajor: this.form.minJackpotMoneyMajor,
          minJackpotMoneyOrdinary: this.form.minJackpotMoneyOrdinary,
          minJackpotMoneySerious: this.form.minJackpotMoneySerious,

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
          informWaySerious: propsData.informWaySerious
        },
      });
      if (res && res.code == 0) {
        // this.$message({
        //   message: '新增成功',
        //   type: 'success'
        // });
        this.$router.push({
          name: "pondRiskDetail",
          query: {
            id: res.data.businessKey
          }
        });
      } else {
        // this.$message.error('新增失败');
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
  }
};
</script>

<style lang='less' scoped>
@import "./less/index.less";
</style>
