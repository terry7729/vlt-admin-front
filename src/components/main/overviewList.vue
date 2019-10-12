<template>
  <el-row type="flex" :gutter="20" class="row-bg" justify="space-around">
    <el-col v-for="(item, index) in list" :key="index" :span="4">
        <div class="grid-content bg-purple" @click="to(item.url)">
          <i class="iconfont icon-B-fulicaipiao"></i>
          <div class="overview-info">
            <h2>{{item.number}}</h2>
            <p>{{item.name}}</p>
          </div>
        </div>
    </el-col>
  </el-row>
</template>

<script>
const LIST_DATA = {
  status: 200,
  data: [
    {
      id: 0,
      name: "总流程数",
      number: 99,
      url: ''
    },

    {
      id: 1,
      name: "待审核",
      number: 21,
      url: '/home/businessManage/pendingReview'
    },
    {
      id: 2,
      name: "已审核",
      number: 66,
      url: '/home/businessManage/audited'
    },
    {
      id: 3,
      name: "已申请",
      number: 54,
      url: '/home/businessManage/alreadyApplied'
    },
    {
      id: 4,
      name: "待阅读",
      number: 21,
      url: '/home/businessManage/pendingReading'
    }
  ]
}
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getPress();
  },
  methods: {
    getPress() {
      this.list = LIST_DATA.data;
      // this.$http
      //   .getProcess()
      //   .then(resp => {
      //     if (resp) {
      //       resp = JSON.parse(resp);
      //       if (resp.status === 200) {
      //         this.list = resp.data;
      //       }
      //     }
      //     console.log(resp);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    to (url) {
      console.log(url);
      this.$router.push({ path: `${url}` })
    }
  }
};
</script>

<style lang="less" scoped>
.row-bg {
  justify-content: space-between;
  margin: 0 !important;
  .el-col {
    border: 1px solid rgba(235, 235, 235, 1);
    background-color: rgba(255, 255, 255, 1);
    &.el-col-4 {
      padding: 20px !important;
      &>div {
        cursor: pointer;
      }
    }
    .grid-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .iconfont {
        display: block;
        width: 60px;
        height: 60px;
        font-size: 48px;
        text-align: center;
        color: #E60012;
        background: rgba(235, 235, 235, 1);
        border-radius: 50%;
      }
      .overview-info {
        flex: 1;
        margin-left: 20px;
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