  <template>
  <div class="vlt-card">
    <el-tabs tab-position="left" v-model="active">
      <el-tab-pane label="计划列表" name="1" v-if="showAll">
        <plan-list v-if="active=='1'" :insData="insData"></plan-list>
      </el-tab-pane>
      <el-tab-pane label="计划汇总（省）" name="2" v-if="showPro">
        <plan-province v-if="active=='2'"></plan-province>
      </el-tab-pane>
      <el-tab-pane label="计划汇总（地市）" name="3" v-if="showCity">
        <plan-city v-if="active=='3'"></plan-city>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import PlanList from "./developmentPlanList";
import PlanCity from "./developmentPlanCity";
import PlanProvince from "./developmentPlanProvince";
import { isArray } from "util";

export default {
  name: "",
  components: {
    PlanList,
    PlanCity,
    PlanProvince
  },
  data() {
    return {
      active: "1",
      showAll: false,
      showPro: false,
      showCity: false,
      insData: {
        insIdArr: [],
        insLevel: 0
      }
    };
  },
  created() {
    this.getUserInsInfoList();
  },
  methods: {
    getUserInsInfoList() {
      const _this = this;
      (async data => {
        let res = await _this.$api.getUserInsInfoList({});
        // 返回的data 有0 时 表示有计划列表的权限 那么计划列表的tab显示，反之隐藏，
        // 同理 有一级的时候 则显示省级的数据，市级亦是如此
        if (res.data) {
          console.log('res.data...', res.data, isArray(res.data));
          let arr = Object.keys(res.data);
          if (arr[0] == 0) { // 如果是 0的话 显示省级
            console.log(0);
            _this.active = "2";
            _this.showPro = true;
            _this.insData.insLevel = 0;
          } else if (arr[0] == 1) { // 如果是1  显示 总 市
             console.log(2);
            _this.active = "1";
            _this.showPro = false;
            _this.showAll = true;
            _this.showCity = true;
            // console.log('arr----', res.data[arr[0]]);
            res.data[arr[0]].forEach(item => {
              let key = Object.keys(item)
              _this.insData.insIdArr.push(key)
            });
            console.log(_this.insData.insIdArr);
            _this.insData.insLevel = 1;
          } else if (arr[0] == 2) { // 如果是2 显示总
            console.log(1);
            _this.active = "1";
            _this.showPro = false;
            _this.showAll = true;
            _this.showCity = false;
            _this.insData.insLevel = 2;
          }
        }
      })();
    },
    getStoreList(row) {
      const self = this;
      const data = {
        orderId: row.orderId
      };
      (async data => {
        let res = await self.$api.getStoreList({ data });
        console.log("return data", data);
        if (res && res.code == 0) {
          self.$message.success("注销成功");
          row.orderStatus = 6;
          self.getLotteryList(self.param);
        } else {
          // self.$message.warning(res.msg)
        }
      })(data);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
