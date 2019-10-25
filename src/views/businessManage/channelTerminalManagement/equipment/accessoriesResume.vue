<template>
  <div class="vlt-card">
    <div class="time-line">
      <div v-for="item  in timeLiness" :key="item.id" class="list">
        <div class="date">
          <h5>{{item.date.split(' ')[0]}}</h5>
          <span>{{item.date.split(' ')[1]}}</span>
          <i class="point"></i>
        </div>
        <div class="events-box">
          <div v-for="n in item.resumeList" :key="n.id" class="events-item">
            <p class="title">{{n.title}}</p>
            <p class="content">{{n.desc}}</p>
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
      timeLiness: [
        {
          id: 0,
          date: "2018-11-30 13:42:54",
          resumeList: [
            {
              id: 0,
              title: "由【朱朱】发起【采购】 - 【采购】操作",
              desc: "【10-25中心】- 入库"
            },
            {
              id: 1,
              title: "由【朱朱】发起【采购】 - 【采购】操作",
              desc: "【10-25中心】- 入库"
            }
          ]
        },
        {
          id: 1,
          date: "2018-11-30 13:42:54",
          resumeList: [
            {
              id: 0,
              title: "由【朱朱】发起【采购】 - 【采购】操作",
              desc: "【10-25中心】- 入库"
            },
            {
              id: 1,
              title: "由【朱朱】发起【采购】 - 【采购】操作",
              desc: "【10-25中心】- 入库"
            }
          ]
        },
        {
          id: 2,
          date: "2018-11-30 13:42:54",
          resumeList: [
            {
              title: "由【朱朱】发起【采购】 - 【采购】操作",
              desc: "【10-25中心】- 入库"
            }
          ]
        },
        {
          id: 3,
          date: "2018-11-30 13:42:54",
          resumeList: [
            {
              id: 0,
              title: "由【朱朱】发起【采购】 - 【采购】操作",
              desc: "【10-25中心】- 入库"
            },
            {
              id: 1,
              title: "由【朱朱】发起【采购】 - 【采购】操作",
              desc: "【10-25中心】- 入库"
            }
          ]
        },
        {
          id: 4,
          date: "2018-11-30 13:42:54",
          resumeList: [
            {
              title: "由【朱朱】发起【采购】 - 【采购】操作",
              desc: "【10-25中心】- 入库"
            }
          ]
        }
      ]
    };
  },
  mounted() {},
  components: {},
  methods: {
    async initList () {
      let result = await this.$api.accessoriesRecord()
      console.log(result);
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
