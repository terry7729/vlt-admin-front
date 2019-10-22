<template>
  <!-- 维修工单详情 -->
  <div class="vlt-card">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="已报障">ssss</el-step>
      <el-step title="进行中">wwww</el-step>
      <el-step title="未完成">eeeee</el-step>
    </el-steps>

    <el-row class="mt20">
      <panel-static title="报修信息">
        <base-info :infoList="infoList"></base-info>
      </panel-static>
    </el-row>
    <el-row class="mt20">
      <panel-static title="设备更换信息">
        <base-info :infoList="infoList2"></base-info>
      </panel-static>
    </el-row>
    <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
    <el-row class="vlt-edit-btn mt20" style="text-align: right">
      <el-button type="primary" v-prevent="1000" size="medium" @click="submit">确定</el-button>
      <el-button size="medium" @click="cancel">取消</el-button>
    </el-row>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      active: 2,
      infoList: [
        { title: "工单编号：", value: "xxxxxxxxxxxx", prop: "workOrderNumber" },
        { title: "设备名称：", value: "xxxxxxxxxxxx", prop: "deviceName" },
        { title: "所属机构：", value: "xxxx", prop: "affiliation" },
        { title: "故障级别：", value: "xxxxxxxxxxxx", prop: "faultLevel" },
        { title: "大厅编号：", value: "xxxxxxxxxxxx", prop: "hallNumber" },
        { title: "报修人：", value: "xxxxxxxxxxxx", prop: "repairer" },
        { title: "故障类型：", value: "xxxx", prop: "faulType" },
        {
          title: "故障描述：",
          value: "xxxxxxxxxxxxxxxxxxxx",
          prop: "faultDescription"
        }
      ],
      infoList2: [
        {
          title: "更换后设备名称：",
          value: "xxxxxxxxxxxx",
          prop: "afterReplacement"
        },
        {
          title: "原设备名称：",
          value: "xxxxxxxxxxxx",
          prop: "originalDeviceName:"
        },
        {
          title: "更换后设备型号：",
          value: "xxxx",
          prop: "replacementDeviceModel"
        },
        {
          title: "原设备型号：",
          value: "xxxxxxxxxxxx",
          prop: "originalEquipmentModel:"
        },
        {
          title: "更换后设备编码：",
          value: "xxxxxxxxxxxx",
          prop: "deviceCodeAfterReplacement"
        },
        {
          title: "原设备编码：",
          value: "xxxxxxxxxxxx",
          prop: "originalDeviceCode"
        },
        { title: "维修时长：", value: "xxxx", prop: "maintenanceTime" },
        { title: "维修人：", value: "xxxxxxxxxxxxxxxxxxxx", prop: "repairMan" }
      ]
    };
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    submit() {
      console.log(22);
    },
    cancel() {
      console.log(22);
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.mt20 {
  margin-top: 20px;
}
.vlt-card {
  padding: 20px;
}
</style>
