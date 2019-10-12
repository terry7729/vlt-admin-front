<template>
  <div class="vlt-card plan-template">
    <el-card class="box-card" v-for="card in cardList" :key="card.title">
      <div slot="header" class="clearfix">
        <img src="../../../assets/img/avatar.jpg"/>
        <span class="card-title">{{card.title}}</span>
        <span class="card-text">{{card.text}}</span>
      </div>
      <el-button class="card-btn" type="text" @click="preview">预览</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "name",
  data() {
    return {
      cardList: [
        { title: "促销推广活动模板1", text: "累计充值到指定额度获得奖励" },
        { title: "促销推广活动模板2", text: "累计充值到指定额度获得奖励" },
        { title: "促销推广活动模板3", text: "累计充值到指定额度获得奖励" },
        { title: "促销推广活动模板4", text: "累计充值到指定额度获得奖励" }
      ]
    };
  },
  methods:{
      preview(){
          this.$router.push({ path: 'previewTemplate' })
      },
  },
  computed: {},
  created() {},
  mounted() {},
  components: {}
};
</script>


<style lang="less" scoped>

.plan-template {
    padding: 25px;
    .box-card {
        width: 350px;
        display: inline-block;
        margin:0 20px 20px 0;

        .clearfix {
            height: 180px;

            img {
                float: left;
                width: 50px;
                height: 180px;
            }

            span {
                display: inline-block;
            }

            .card-title {
                font-size: 16px;
                font-weight: 700;
                margin-left: 20px;
            }

            .card-text {
                margin-left: 20px;
                margin-top: 30px;
                font-size: 14px;
                color: #aaa;
            }
        }

        .el-card__body {
            text-align: center;
            background: #eee;
        }

        .card-btn {
            margin-left: 49%;
            padding: 3px 0;
            color: #aaa;
        }
    }
}
</style>