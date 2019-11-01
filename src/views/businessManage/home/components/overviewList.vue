<template>
  <el-row type="flex" :gutter="0" class="row-bg" justify="space-around">
    <el-col v-for="(item, index) in list" :key="index" :span="4">
      <div class="grid-content bg-purple" @click="to(item.url)">
        <!-- <i class="iconfont icon-B-fulicaipiao"></i> -->
        <img :src="item.img" alt="" class="iconImg">
        <div class="overview-info">
          <h2> <numberAdd :value="item.number"></numberAdd></h2>
          <p>{{item.name}}</p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import numberAdd from  '@/components/common/numberAdd.vue'
const LIST_DATA = {
  status: 200,
  data: [
    {
      id: 0,
      name: "总流程数",
      number: 9999,
      img: require("../../../../assets/img/icon/businessManage/lczs.png"),
      url: ""
    },

    {
      id: 1,
      name: "待审核",
      number: 888,
      img: require("../../../../assets/img/icon/businessManage/dsh.png"),
      url: "/home/businessManage/overview/pendingReview"
    },
    {
      id: 2,
      name: "已审核",
      number: 66,
      img: require("../../../../assets/img/icon/businessManage/ysh.png"),
      url: "/home/businessManage/overview/audited"
    },
    {
      id: 3,
      name: "已申请",
      number: 54,
      img: require("../../../../assets/img/icon/businessManage/ysq.png"),
      url: "/home/businessManage/overview/alreadyApplied"
    },
    {
      id: 4,
      name: "待阅读",
      number: 21,
      img: require("../../../../assets/img/icon/businessManage/dyd.png"),
      url: "/home/businessManage/overview/pendingReading"
    }
  ]
};
export default {
  name: 'overviewList',
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getPress();
    
  },
  computed: {
  },
  methods: {
    getPress() {
      this.list = LIST_DATA.data;
    },
    to(url) {
      console.log(url);
      this.$router.push({ path: `${url}` });
    }
  },
  components: {
    'numberAdd': numberAdd
  }
};
</script>

<style lang="less" scoped>
.row-bg {
  justify-content: space-between;
  margin: 0 -10px;
 
  .el-col {
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(235, 235, 235, 1);
    &.el-col-4 {
      width: 20%;
      margin: auto 10px;
      padding: 15px 20px;
      @media (max-width:1400px) {
        padding: 10px 20px;
      }
      & > div {
          width: 100%;
          cursor: pointer;
          &.grid-content {
            height: 80px;
            box-sizing: border-box;
          }
      }
      &:first-child {
        &>div {
          cursor: default;
        }
      }
    }
    .grid-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .iconImg {
        display: block;
        width: 60px;
        height: 60px;
        @media (max-width: 1400px) {
          width: 50px;
          height: 50px;
        }
      }
      .iconfont {
        display: block;
        width: 60px;
        height: 60px;
        font-size: 48px;
        text-align: center;
        color: #e60012;
        background: rgba(235, 235, 235, 1);
        border-radius: 50%;
      }
      .overview-info {
        flex: 1;
        margin-left: 20px;
        @media (max-width: 1400px) {
          margin-left: 15px;
        }
        * {
          display: block;
        }
        h2 {
          font-weight: bold;
          font-size: 36px;
          padding-bottom: 10px;
        }
        p {
          font-size: 12px;
          color: #00000072;
        }
      }
    }
  }
}
</style>