<template>
  <!-- 型号管理配件查看页面 -->
  <div class="vlt-card basic-info">
    <panel-static title="配件类型查看" style="margin-bottom:20px">
      <base-info :infoList="typeInfoList"></base-info>
    </panel-static>
    <panel-static title="配件型号信息" style="margin-bottom:20px">
      <base-info :infoList="modelInfoList"></base-info>
      <div class="base-info">
        <span class="picture">图片:</span>
        <el-image
          class="image"
          style="width: 100px; height: 100px"
          v-for="(item,index) in imgUrlList"
          :key="index"
          :src="item.url"
          fit="contain"
        ></el-image>
      </div>
    </panel-static>
    <panel-static title="可用机型信息" style="margin-bottom:20px">
      <el-table :data="tableData" border>
        <el-table-column label="序号" type="index" width="80px"></el-table-column>
        <el-table-column label="机型名称" prop="goodsName"></el-table-column>
        <el-table-column label="机型型号" prop="deviceModel"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="创建人" prop="createBy"></el-table-column>
      </el-table>
    </panel-static>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "modelPreCheck",
  data() {
    return {
      // url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      typeInfoList: [
        { title: "配件名称", value: "", prop: "goodsName" },
        { title: "配件单位", value: "", prop: "deviceUnit" },
        { title: "是否标配", value: "", prop: "isStandard" },
        { title: "备注", value: "", prop: "remark" }
      ],
      modelInfoList: [
        { title: "配件型号", value: "", prop: "deviceModel" },
        { title: "配件单价", value: "", prop: "unitPrice" },
        { title: "供应商", value: "", prop: "providerId" },
        { title: "厂家信息", value: "", prop: "manufactorInfo" },
        { title: "预警上限", value: "", prop: "upperLimit" },
        { title: "预警下限", value: "", prop: "lowerLimit" },
        { title: "备注", value: "", prop: "remark" }
      ],
      tableData: [],
      imgUrlList: [
        {
          url:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        }
      ]
    };
  },
  components: {},
  created() {
    this.modelDetail();
  },
  methods: {
    async modelDetail() {
      const self = this;
      const data = self.$route.query.id;
      let isStandard = {
        1: "是",
        2: "否"
      };
      console.log(data);
      let res = await self.$api.modelDetail({ data });
      console.log(res);
      if (res && res.code == 0) {
        let imgArr =
          res.data.goodsModelVo.files && res.data.goodsModelVo.files.split(",");
        imgArr &&
          imgArr.forEach(item => {
            let obj = {};
            obj.url = item;
            self.imgUrlList.push(obj);
          });

        let dataList = res.data.goodsModelVo.modelAvailablesList;
        self.tableData = dataList;
        console.log(self.imgUrlList);
        self.typeInfoList.forEach(item => {
          item.value = res.data[item.prop];
          if (item.prop == "isStandard") {
            item.value = isStandard[res.data.isStandard];
          }
        });
        self.modelInfoList.forEach(item => {
          item.value = res.data.goodsModelVo[item.prop];
        });
      }
    }
  }
};
</script>

<style lang="less">
.basic-info {
  .base-info {
    position: relative;
    .image {
      margin-left: 58px;
      margin-top: -24px;
    }
    .picture {
      position: absolute;
    }
  }
}
</style>
