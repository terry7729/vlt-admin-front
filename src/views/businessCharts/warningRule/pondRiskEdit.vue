<template>
  <div class="vlt-card">
    <h3 class="headling">奖池风险指标修改</h3>
    <div class="vlt-card select-box">
      <span>游戏</span>
      <el-select v-model="form.gameId" placeholder="请选择">
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
      <inform-table :informInfo='tablesData' ref='table'></inform-table>
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
import informTable from "@/views/businessCharts/warningRule/informTable.vue";
export default {
  name: "pondRiskEdit",
  components: { informTable },
  data() {
    return {
      tablesData: {       
      },      
      type: null,
      showeditBox: false,
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
      this.pondRiskUpdate(this.$refs.table.dataInform);
    },
    async pondRiskUpdate(propsData) {
      const res = await this.$api.pondRiskUpdate({
        data: {
          businessKey: this.$route.query.id,
          minJackpotMoneyMajor: this.form.minJackpotMoneyMajor,
          minJackpotMoneyOrdinary: this.form.minJackpotMoneyOrdinary,
          minJackpotMoneySerious: this.form.minJackpotMoneySerious,
           maxJackpotMoneyMajor: this.form.maxJackpotMoneyMajor,
          maxJackpotMoneyOrdinary: this.form.maxJackpotMoneyOrdinary,
          maxJackpotMoneySerious: this.form.maxJackpotMoneySerious,
           informTotalCountMajor: propsData.informData[2].warningPl,
          informTotalCountOrdinary: propsData.informData[1].warningPl,
          informTotalCountSerious: propsData.informData[0].warningPl,
          gameId: this.form.gameId,
          gameName: this.form.gameId,
          collectFrequency: this.form.collectFrequency,
          collectStatus: this.form.collectStatus,
         
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
          
        }
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
    //获取详细信息
    async getDetailInfo() {
      const id = this.$route.query.id;
      const self = this;
      const res = await self.$api.getPondRiskDetail({
        data: {
          businessKey: id
        }
      });
      if (res && res.code == 0) {
        this.form = res.data;
        this.tablesData=res.data;
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
