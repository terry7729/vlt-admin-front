<template>
  <div class="vlt-card">
    <div class="time-line">
      <div v-for="item  in timeLiness" :key="item.id" class="list">
        <div class="date">
          <h5>{{item.createTime}}</h5>
          <!-- <span>{{item.outWarehouseTime}}</span> -->
          <i class="point"></i>
        </div>
        <div class="events-box">
          <div class="events-item">
            <p
              class="title"
            >由【{{item.entryWarehouseBy}}】发起 【{{item.documentToppic}}】 -- 【{{item.oplType}}】操作</p>
            <p class="content">【{{item.nameX}}】</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      timeLiness: [],
      formatoplType:['资源采购','资源申请','资源发放','资源调拨','建厅发送','扯厅回收','资源报废']
    };
  },
  mounted() {},
  created () {
    const routerQuery = this.$route.query;
    if (routerQuery && routerQuery.serial) {
      const data = {
        serial: routerQuery.serial
      };
      this.initList(data);
    }
  },
  components: {},
  methods: {
    async initList(data) {
      const _this = this;
      let result = await _this.$api.equipmentRecord({ data });
      if (result.code == 0 ) {
        if ( result.data.length > 0 && result.data[0]!= null) {;
          this.timeLiness =  result.data.map(item => {
            item.oplType = _this.formatoplType[parseInt(item.oplType) - 1];
            return item;
          })
        } else {
          console.log('无数据');
        }
      } else {
        _this.$message.warning(res.msg);
      }
      // equipmentRecord
    }
  }
};
</script>

<style lang="less" scoped>
.vlt-card {
  padding: 20px;
}
.time-line {
  position: relative;
  &:before {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 200px;
    width: 1px;
    height: 100%;
    background: #f1f1f1;
  }
    .date {
      // float: left;
      position: absolute;
      width: 170px;
      margin-left: 30px;
      padding-right: 30px;
      color: #4c9fd0;
      text-align: right;
      h5 {
        font-size: 16px;
        line-height: 2;
      }
      p {
        font-size: 12px;
      }
      &:after {
        display: block;
        content:'';
        position: absolute;
        right: -9px;
        top: 20px;
        width: 16px;
        height: 16px;
        border-radius: 10px;
        border: 1px solid #4c9fd0;
        background: #fff;
      }
    }
  .events-box {
    .events-item {
      // float: left;
      position: relative;
      max-width: 800px;
      margin-left: 240px;
      padding: 20px;
      background: #eaf4fe;
      border: 1px solid #e0eefd;
      border-radius: 4px;
      &:before {
        position: absolute;
        left: -20px;
        display: block;
        content: '';
        border-top: 10px transparent dashed;
        border-left: 10px transparent dashed;
        border-bottom: 10px transparent dashed;
        border-right: 10px #eaf4fe solid;
      }
      &:not(first-child) {
        margin-top: 30px;
      }
      .title {
        font-size: 14px;
      }
      .content {
        margin-top: 10px;
        font-size: 12px;
        color: #333;
      }
    }
  }
}
</style>
