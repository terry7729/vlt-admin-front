<template>
  <el-row class="card-list" :gutter="20">
    <el-col v-for="item in list.dataList" :key="item.id" :span="8">
      <div class="col-box">
        <span class="number">{{item.id}}</span>
        <div class="info-list">
          <img :src="item.avatar" alt  class="avatar"/>
          <div class="info">
            <p class="name">{{item.name}}</p>
            <p class="tel" v-if="item.tel" ><i class="icon el-icon-phone"></i> {{item.tel}}</p>
            <p class="add" v-if="item.address"><i class="icon el-icon-location-outline"></i> {{item.address}}</p>
            <p class="device" v-if="item.device">关联设备：{{item.device}}</p>
          </div>
        </div>
        <div class="col-desc">
          <div v-if="item.failure" class="failure">
            <p class="desc-number">{{item.failure.failureRate}}</p>
            <p class="desc-item">{{item.failure.name}}</p>
          </div>
          <el-row class="desc-list">
            <el-col v-for="item in item.descList" :key="item.id" :span="8">
              <p class="desc-number">{{item.number}}</p>
              <p class="desc-item">{{item.name}}</p>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script type="text/javascript">
export default {
  name: "analysisCard",
  props: {
    list: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.card-list {
  margin-top: 20px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .el-col {
    padding-bottom: 20px;
    .col-box {
      position: relative;
      padding: 10px;
      border: 1px solid #797979;
      border-radius: 4px;
      span.number {
        position: absolute;
        top: 10px;
        right: -5px;
        display: block;
        padding: 10px 20px;
        border: 1px solid #333;
        border-radius: 4px;
        background: #fff;
      }
      .info-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .avatar {
          display: block;
          width: 80px;
          height: 80px;
          margin-right: 20px;
        }
        .info {
          flex: 1;
          .name {
            color: #108EE9;
            font-size: 16px;
            line-height: 2;
          }
          .tel,.add {
            line-height: 1.5;
            .icon {
              padding-right: 5px;
            }
          }
        }
      }
      .col-desc {
        margin-top: 20px;
        padding-top: 10px;
        border-top: 1px solid #8a8a8a;
        width: 100%;

        .desc-number {
          font-size: 28px;
          font-weight: 700;
          color: #999999;
        }
        .desc-item {
          color: #333333;
        }
        .failure {
          width: 100%;
          text-align: center;
          .desc-number {
            font-size: 36px;
            color: #333;
          }
        }
        .desc-list {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-top: 10px;
          .el-col {
            text-align: center;
            border-right: 1px solid #333;
            padding-left: 10px;
            padding-right: 10px;
            &:last-child {
              border-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
