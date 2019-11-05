<template>
  <div class="vlt-card plan-check">
    <panel title="城市游戏风险指标详情" :show="true">
      <base-info :infoList="planList"></base-info>
      <p>
        <el-button type="primary" @click.native="goEdit" size="mini">修改</el-button>
      </p>
    </panel>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "warningWatchDetail",
  data() {
    return {
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
      planList: [
        { title: "省", value: "", prop: "provinceId" },
        { title: "市", value: "", prop: "cityId" },
        { title: "游戏", value: "", prop: "gameId" },
        { title: "最高返奖率", value: "", prop: "highestReturnRateOrdinary" },
        {
          title: "最高返奖率-严重级别",
          value: "",
          prop: "highestReturnRateSerious"
        },
        {
          title: "最高返奖率-重大级别",
          value: "",
          prop: "highestReturnRateMajor"
        },
        { title: "最低返奖率", value: "", prop: "minimumReturnRateOrdinary" },
        {
          title: "最高返奖率-严重级别",
          value: "",
          prop: "minimumReturnRateSerious"
        },
        {
          title: "最高返奖率-重大级别",
          value: "",
          prop: "minimumReturnRateMajor"
        },
        { title: "普通告警次数", value: "", prop: "informTotalCountOrdinary" },
        { title: "严重告警次数", value: "", prop: "informTotalCountSerious" },
        { title: "重大告警次数", value: "", prop: "informTotalCountMajor" },

        {
          title: "普通通知市级管理员",
          value: "",
          prop: "informCityManIdOrdinary"
        },
        {
          title: "严重通知市级管理员",
          value: "",
          prop: "informCityManIdSerious"
        },
        {
          title: "重大通知市级管理员",
          value: "",
          prop: "informCityManIdMajor"
        },
        {
          title: "普通通知省级管理员",
          value: "",
          prop: "informProvinceManIdOrdinary"
        },
        {
          title: "严重通知省级管理员",
          value: "",
          prop: "informProvinceManIdSerious"
        },
        {
          title: "重大通知省级管理员",
          value: "",
          prop: "informProvinceManIdMajor"
        },
        {
          title: "普通通知中央管理员",
          value: "",
          prop: "informCentralManIdOrdinary"
        },

        {
          title: "严重通知中央管理员",
          value: "",
          prop: "informCentralManIdSerious"
        },

        {
          title: "重大通知中央管理员",
          value: "",
          prop: "informCentralManIdMajor"
        },
        { title: "普通通知方式", value: "", prop: "informWayOrdinary" },
        { title: "严重通知方式", value: "", prop: "informWaySerious" },
        { title: "重大通知方式", value: "", prop: "informWayMajor" },
        { title: "采集间隔(次/分钟)", value: "", prop: "collectFrequency" },
        { title: "状态", value: "", prop: "collectStatus" }
      ]
    };
  },
  components: {},
  methods: {
    //获取游戏风险指标详情.
    async getGameRiskDetail() {
      const id = this.$route.query.id;
      const self = this;
      const res = await self.$api.getGameRiskDetail({
        data: {
          businessKey: id
        },
      });
      if (res && res.code == 0) {
        for (var item in res.data) {
          for (var i = 0; i < this.planList.length; i++) {
            if (item === this.planList[i].prop) {
              this.planList[i].value = res.data[item];
              if (
                item === "informWayOrdinary" ||
                item === "informWaySerious" ||
                item === "informWayMajor" ||
                item === "collectStatus"
              ) {
                this.planList[i].value = this.getInformationType(
                  item,
                  res.data[item]
                );
              }
              if(item==='cityId'){ 
                var  cityName             
                this.options2.forEach(v=>{               
                    if(v.cityId==res.data[item]){                       
                      cityName=v.cityName           
                    }
                }),
                this.planList[i].value=cityName
              }
              if(item==='gameId'){ 
                var  gameName             
                this.options.forEach(v=>{                  
                    if(v.gameId==res.data[item]){                                        
                      gameName=v.gameName           
                    }
                }),
                this.planList[i].value=gameName
              }
              if(item==='provinceId'){ 
                var  provinceName             
                this.options1.forEach(v=>{               
                    if(v.provinceId==res.data[item]){                       
                      provinceName=v.provinceName           
                    }
                }),
                this.planList[i].value=provinceName
              }
              break;
            }
          }
        }
      }
    },
    getInformationType(item, type) {
      var InformType;
      if (item != "collectStatus") {
        switch (type) {
          case 1:
            InformType = "站内";
            break;
          case 2:
            InformType = "邮件";
            break;
          case 3:
            InformType = "短信";
            break;
          case 4:
            InformType = "站内+邮件";
            break;
          case 5:
            InformType = "站内+短信";
            break;
          case 6:
            InformType = "邮件+短信";
            break;
          case 7:
            InformType = "站内+邮件+短信";
            break;
        }
      } else {
        switch (type) {
          case 0:
            InformType = "生效";
            break;
          case 1:
            InformType = "停止";
            break;
        }
      }

      return InformType;
    },
    goEdit() {
      this.$router.push({
        name: "gameRiskEdit",
        query: {
          id: this.$route.query.id
        }
      });
    }
  },
  mounted() {
    this.getGameRiskDetail();
  }
};
</script>

<style lang="less" scoped>
/deep/ .base-info .info-list .title {
  min-width: unset;
}

p {
  margin-right: 150px;
  margin-bottom: 10px;
  text-align: right;
}
</style>
