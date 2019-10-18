<template>
  <div class="vlt-card mountRecordInfo">
    <div class="package-status">
      <div class="status-box">
        <ul class="status-list">
          <li>
            <div class="wrap">
              <div class="status-content-before">您的订单开始处理</div>
              <span class="status-time-before">2017-08-17 23:31</span>
            </div>
          </li>
          <li>
            <div class="wrap">
              <div class="status-content-before">卖家发货</div>
              <div class="status-time-before">2017-08-18 09:11</div>
            </div>
          </li>
          <li>
            <div class="wrap">
              <div class="status-content-before">卖家发货</div>
              <div class="status-time-before">2017-08-18 09:11</div>
            </div>
          </li>
          <li>
            <div class="wrap">
              <div class="status-content-before">卖家发货</div>
              <div class="status-time-before">2017-08-18 09:11</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "mountRecordCheck",
  data() {
    return {
      statusList: []
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.mountRecordInfo {
  ul li {
    list-style: none;
    position: relative;
  }
  .package-status {
    // border:1px solid rgb(234, 235, 237);
    padding: 100px 200px;
  }
  .package-status .status-list {
    margin: 0;
    padding: 0;
    margin-top: -5px;
    padding-left: 60px;
    list-style: none;
  }
  .package-status .status-list > li {
    border-left: 1px solid #0278d8;
    text-align: left;
    padding: 10px;
    padding-bottom: 10px;
  }
  .package-status .status-list > li > .wrap {
    position: relative;
    border: 1px solid rgb(217, 230, 243);
    border-radius: 0 8px 8px 8px;
    width: 100%;
    height: 82px;
    padding: 10px;
    background: rgb(217, 230, 243);
  }
  .package-status .status-list > li:before {
    /* 流程点的样式 */
    content: "";
    border: 1px solid #0278d8;
    background-color: white;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-left: -22px;
    margin-right: 10px;
  }

  .package-status .status-list > li {
    position: relative;
    margin-left: 5px;
    height: auto;
    width: 95%;
  }
  .package-status .status-list {
    margin-top: -8px;
  }
  .package-status .status-box {
    position: relative;
  }
  .package-status .status-box:before {
    content: " ";
    background-color: #f3f3f3;
    display: block;
    position: absolute;
    top: -8px;
    left: 20px;
    width: 10px;
    height: 4px;
  }

  .status-list > li:not(:first-child) {
    padding-top: 10px;
  }
  .status-content-before {
    text-align: left;
    margin-left: 28px;
    margin-top: -36px;
    position: absolute;
    top: 50px;
  }

  .status-time-before {
    padding: 10px;
    display: inline-block;
    text-align: left;
    margin-left: -220px;
    font-size: 16px;
    margin-top: 34px;
    position: absolute;
    top: -68px;
  }
}
</style>
