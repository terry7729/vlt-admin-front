<template>
  <div class="vlt-card">
    <div class="haveListDetailTwo">
      <panel title="基本信息" :show="true" style="margin-bottom:20px">
        <base-Info :infoList="haveListDetailTwoData"></base-Info>
      </panel>
      <panel title="人员信息" :show="true" style="margin-bottom:20px">
        <el-table :data="haveListDetailTwotableData" border style="padding:16px">
          <el-table-column prop="haveListDetailTwoid" label="序号"></el-table-column>
          <el-table-column prop="haveListDetailTwojob" label="职位"></el-table-column>
          <el-table-column prop="haveListDetailTwoName" label="姓名"></el-table-column>
          <el-table-column prop="haveListDetailTwoNum" label="身份证号"></el-table-column>
          <el-table-column prop="haveListDetailTwosex" label="性别"></el-table-column>
          <el-table-column prop="haveListDetailTwotelephone" label="手机号"></el-table-column>
          <el-table-column prop="haveListDetailTwophoto" label="正面照">
            <template>
              <img :src="haveListDetailTwoSrc" alt style="width:50px; height:50px" />
            </template>
          </el-table-column>
        </el-table>
      </panel>

      <panel title="财务信息" :show="true" style="margin-bottom:20px">
        <base-Info :infoList="haveListDetailTwofinance">
          <img :src="haveListDetailTwofileurl" alt />
        </base-Info>
      </panel>

      <panel title="销售游戏" :show="true" style="margin-bottom:20px">
        <el-table :data="haveListDetailTwotableDatagame" border style="padding:16px">
          <el-table-column prop="haveListDetailTwogameid" label="序号"></el-table-column>
          <el-table-column prop="haveListDetailTwogameName" label="游戏名称"></el-table-column>
          <el-table-column prop="haveListDetailTwogameauthority" label="投注权限"></el-table-column>
          <el-table-column prop="haveListDetailTwogameredeem" label="兑奖权限"></el-table-column>
          <el-table-column prop="haveListDetailTwogamedate" label="销售时间"></el-table-column>
        </el-table>
      </panel>
      <panel title="发放设备" :show="true" style="margin-bottom:20px">
        <el-table :data="haveListDetailTwoDistributioneQuipment" border style="padding:16px">
          <el-table-column prop="haveListDetailTwoDistributioneQuipmentid" label="设备1"></el-table-column>
          <el-table-column prop="haveListDetailTwoDistributioneQuipmentbet" label="投注机"></el-table-column>
          <el-table-column prop="haveListDetailTwoDistributioneQuipmentnum" label="型号"></el-table-column>
        </el-table>
      </panel>
      <panel title="其他事项" :show="true" style="margin-bottom:20px">
        <img src="haveListDetailTwoDistributioneQuipmentImg" alt />
      </panel>
      <controlBar
        :options="haveListDetailTwoDistributioneQuipmentBtn"
        @select="haveListDetailTwoDistributioneQuipmentImggoback"
      ></controlBar>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      haveListDetailTwoDistributioneQuipmentImg: "",
      haveListDetailTwofileurl: "",
      haveListDetailTwoSrc:
        "https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=3483030207,3924941481&fm=202&mola=new&crop=v1",

      haveListDetailTwotableData: [
        {
          haveListDetailTwoid: 1,
          haveListDetailTwojob: "广东省",
          haveListDetailTwoName: "上海市普陀区金沙江路 1518 弄",
          haveListDetailTwoNum: "赵",
          haveListDetailTwosex: "自营",
          haveListDetailTwotelephone: "赵"
        }
      ],
      haveListDetailTwoData: [
        { title: "所属机构", value: "", prop: "subsidiaryorgan" },
        { title: "渠道类型", value: "", prop: "channeltype" },
        { title: "渠道编号", value: "", prop: "channelnum" },
        { title: "渠道地址", value: "", prop: "channeladdress" },
        { title: "经营场所属性", value: "", prop: "Propertyofbusinesssite" },
        { title: "站点面积", value: "", prop: "sitearea" }
      ],
      haveListDetailTwofinance: [
        { title: "销售保证金", value: "", prop: "Sales" },
        { title: "代销费费率", value: "", prop: "Commission" }
      ],
      haveListDetailTwotableDatagame: [
        {
          haveListDetailTwogameid: 1,
          haveListDetailTwogameName: "广东省",
          haveListDetailTwogameauthority: "广东省",
          haveListDetailTwogameredeem: "上海市普陀区金沙江路 1518 弄",
          haveListDetailTwogamedate: "自营"
        }
      ],
      haveListDetailTwoDistributioneQuipment: [
        {
          haveListDetailTwoDistributioneQuipmentid: 1,
          haveListDetailTwoDistributioneQuipmentbet: "广东省",
          haveListDetailTwoDistributioneQuipmentnum: "广东省"
        }
      ],
      haveListDetailTwoDistributioneQuipmentBtn: [
        { name: "返回", type: "primary", icon: "" }
      ]
    };
  },

  components: {},
  methods: {
    haveListDetailTwoDistributioneQuipmentImggoback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
