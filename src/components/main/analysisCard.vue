<template>
  <el-row class="card-list" :gutter="10">
    <el-col v-for="item in list.dataList" :key="item.id" :span="8">
      <div class="col-box">
        <span class="number">{{item.id}}</span>
        <div class="info-list">
          <img :src="item.avatar" alt  class="avatar"/>
          <div class="info">
            <p class="name">{{item.name}}</p>
            <p class="tel" v-if="item.tel">{{item.tel}}</p>
            <p class="add" v-if="item.address">{{item.address}}</p>
          </div>
        </div>
        <ul class="desc-list">
          <li v-for="item in item.descList" :key="item.id">
            {{item.number}}
            {{item.name}}
          </li>
        </ul>
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
    padding-bottom: 10px;
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
        }
      }
      .desc-list {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        margin-top: 20px;
        padding-top: 10px;
        border-top: 1px solid #8a8a8a;
      }
    }
  }
}
</style>
