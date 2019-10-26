<template>
  <div class="vlt-card">
    <div class="haveListDetailTwo">
      <panel title="基本信息" :show="true" style="margin-bottom:15px">
        <base-Info :infoList="channelData"></base-Info>
      </panel>
      <panel title="人员信息" :show="true" style="margin-bottom:15px">
        <el-table :data="memberData" border style="padding:16px">
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column prop="roleName" label="职位"></el-table-column>
          <el-table-column prop="accountName" label="姓名"></el-table-column>
          <el-table-column prop="channelIdentity" label="身份证号"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="photo" label="正面照">
            <template>
              <img :src="haveListDetailTwoSrc" alt style="width:50px; height:50px" />
            </template>
          </el-table-column>
        </el-table>
      </panel>

      <panel title="财务信息" :show="true" style="margin-bottom:15px">
        <base-Info :infoList="financeData">
          <img :src="haveListDetailTwofileurl" alt />
        </base-Info>
      </panel>

      <panel title="销售游戏" :show="true" style="margin-bottom:15px">
        <el-table :data="gameData" border style="padding:16px">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="gameName" label="游戏名称"></el-table-column>
          <el-table-column label="投注权限">
            <template slot-scope="scope">
              {{scope.row.throwRight==1?'启用':'禁止'}}
            </template>
          </el-table-column>
          <el-table-column label="兑奖权限">
            <template slot-scope="scope">
              {{scope.row.cashRight==1?'启用':'禁止'}}
            </template>
          </el-table-column>
          <el-table-column prop="sellBeginTime" label="开始销售时间" min-width="140px"></el-table-column>
          <el-table-column prop="sellEndTime" label="结束销售时间" min-width="140px"></el-table-column>
        </el-table>
      </panel>
      <panel title="发放资源" :show="true" style="margin-bottom:15px">
        <el-table :data="resourceData" border style="padding:16px">
          <el-table-column prop="haveListDetailTwoDistributioneQuipmentid" label="资源类型"></el-table-column>
          <el-table-column prop="haveListDetailTwoDistributioneQuipmentbet" label="资源名称"></el-table-column>
          <el-table-column prop="haveListDetailTwoDistributioneQuipmentnum" label="设备型号"></el-table-column>
          <el-table-column prop="haveListDetailTwoDistributioneQuipmentnum" label="数量"></el-table-column>
        </el-table>
      </panel>
      <panel title="其他事项" :show="true" style="margin-bottom:15px">
        <img src="haveListDetailTwoDistributioneQuipmentImg" alt />
      </panel>
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

      channelData: [
        { title: "所属机构", value: "", prop: "insName" },
        { title: "渠道类型", value: "", prop: "channelType" },
        { title: "渠道等级", value: "", prop: "channelLevel" },
        { title: "渠道编号", value: "", prop: "channelNo" },
        { title: "渠道地址", value: "", prop: "channeladdress" },
        { title: "经营场所属性", value: "", prop: "runField" },
        { title: "站点面积", value: "", prop: "pointArea" }
      ],
      financeData: [
        {title: '合作预交款', prop: 'coPrepareMoney', value: ''},
        {title: '授信额度', prop: 'creditQuota', value: ''},
        {title: '代销费费率', prop: 'agentSellRate', value: ''},
        {title: '收款凭证', prop: 'evidence', value: ''}
      ],
      gameData: [],
      resourceData: [],
      memberData: [],
    };
  },
  created() {
    let data = {
      channelId: this.$route.query.channelId
    };
    this.getChannelDetail(data)
  },
  methods: {
    getChannelDetail(data) {
      const self = this;
      (async (data)=>{
				let res = await self.$api.getChannelDetail({data})
				if(res && res.code == 0) {
          console.log('res', res.data) //0关闭 1开启
          // 基础信息
          self.channelData.forEach(item=>{
            item.value = res.data.channelVO[item.prop] || res.data.financeInfoVO[item.prop];
          })
          // 财务信息
          self.financeData.forEach(item=>{
            item.value = res.data.financeInfoVO[item.prop]
          })
          // 销售游戏列表
          self.gameData = res.data.gameRightList;
          // 发放资源
          self.resourceData = res.data.deviceList;
          // 人员信息
          self.memberData.push(res.data.channelFundVO)
				} else {
          // self.$message.warning(res.msg)
        }
      })(data)
    },
    haveListDetailTwoDistributioneQuipmentImggoback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
