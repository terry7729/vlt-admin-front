<template>
  <div class="vlt-card plan-template">
    <el-card class="box-card" v-for="card in cardList" :key="card.title">
      <div slot="header" class="clearfix">
        <img src="../../../../assets/img/avatar.jpg" />
        <span class="card-title">{{card.name}}</span>
        <span class="card-text">{{card.text}}</span>
      </div>
        <el-button class="card-btn" @click="preview(card.num,card.name)">预览</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "name",
  data() {
    return {
      cardList: [
        {
          num: "1",
          name: "新游戏上线活动",
          text: "累计充值到指定额度获得奖励"
        },
        {
          num: "2",
          name: "会员充值奖励活动",
          text: "累计充值到指定额度获得奖励"
        },
        {
          num: "3",
          name: "消费赠送活动",
          text: "累计充值到指定额度获得奖励"
        },
        {
          num: "4",
          name: "拉新活动",
          text: "累计充值到指定额度获得奖励"
        }
      ]
    };
  },
  methods: {
    preview(num,name) {
      this.$router.push({ path: "previewTemplate",query:{id:num,name:name}});
    }
  },
  computed: {},
  created() {},
  mounted() {},
  components: {}
};
</script>


<style lang="less" scoped>

@import "./less/index";
</style>