<template>
  <div class="vlt-card">
    <div class="tabs-content">
      <h3>基本信息管理</h3>
      <el-tabs tab-position="left" style="height: 1000px;">
        <el-tab-pane label="类型管理">
          <search-bar
            class="search-bar-demo"
            @search="search"
            :options="typeInfoOptions"
            :total="typeTotalCount"
            labelWidth="80px"
          ></search-bar>
          <control-bar :options="controlOptions" @select="addEquipment" position="left"></control-bar>
          <el-table :data="typeData" border style="width: 100%">
            <el-table-column prop="id" label="序号" type="index" width="80px"></el-table-column>
            <el-table-column prop="goodsTypeName" label="物品类别"></el-table-column>
            <el-table-column prop="goodsName" label="物品名称"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <el-switch
                  class="switchStyle"
                  @change="changeState(scope.row.id,scope.row.status)"
                  v-model="scope.row.status"
                  active-color="#1890ff"
                  active-text="开"
                  inactive-color="#c0c0c0"
                  inactive-text="关"
                  :active-value="1"
                  :inactive-value="2"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click="typeCheck(scope.row.id,scope.row.goodsType)"
                  type="primary"
                  v-prevent="2000"
                  size="mini"
                >查看</el-button>
                <el-button
                  @click="typeAmend(scope.row.id,scope.row.goodsType)"
                  type="primary"
                  v-prevent="2000"
                  size="mini"
                >修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <table-paging
            position="right"
            :total="typeTotalCount"
            :currentPage="typeCurrentPage"
            :pageSize="pageSize"
            @handleSizeChange="handleSizeChangeType"
            @handleCurrentChange="handleCurrentChangeType"
          ></table-paging>
        </el-tab-pane>
        <el-tab-pane label="型号管理">
          <modelManage></modelManage>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
import modelManage from "../components/modelManage";
export default {
  name: "basicInfoManage",
  data() {
    return {
      typeTotalCount: 0,
      typeCurrentPage: 1,
      pageSize: 10,

      dialogImageUrl: "",
      typeInfoOptions: [
        {
          title: "物品类别",
          type: "select",
          prop: "goodsType",
          value: "",
          options: [
            { label: "设备", value: 1 },
            { label: "配件", value: 2 },
            { label: "耗材", value: 3 },
            { label: "设施", value: 4 }
          ]
        },
        {
          title: "物品名称",
          type: "select",
          prop: "goodsId",
          value: "",
          options: []
        },
        {
          title: "物品状态",
          type: "select",
          prop: "status",
          value: "",
          options: [{ label: "开", value: 1 }, { label: "关", value: 2 }]
        }
      ],
      controlOptions: [{ name: "新增", type: "primary", icon: "plus" }],
      //类型管理列表
      typeData: [],
      //物品名称列表
      goodsNameData: [],
      rules2: {
        goodsCategory: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentName: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentUnit: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        isStandard: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        isRecycle: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        remark: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        equipmentPrice: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        upperLimit: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ],
        lowerLimit: [
          { required: true, validator: rules.checkEmpty, trigger: "blur" }
        ]
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      // 类型管理参数
      requestData1: {
        page: 1,
        pageSize: 10,
        param: {
          goodsId: 0,
          goodsType: 0,
          status: 0
        }
      }
    };
  },
  components: {
    modelManage
  },
  created() {
    this.getTypeList(this.requestData1);
    this.getSelectOption();
  },
  components:{
    modelManage
  },
  methods: {
    //类型管理
    //状态修改
    async changeState(id, state) {
      console.log(id, state);
      let data = {
        id: id,
        status: state,
        updateBy: "",
        updateTime: ""
      };
      let res = await this.$api.statusUpdate({ data });
      if (res && res.code == 0) {
        this.$message({
          message: "状态修改成功",
          type: "success"
        });
      }
    },
    //获取类型管理物品名称
    async getSelectOption(data) {
      const self = this;
      let res = await this.$api.getModelTrees({ data });
      console.log("物品名称", res);
      if (res && res.code == 0) {
        let array = [];
        res.data.forEach(item => {
          let obj = {};
          obj.label = item.goodsName;
          obj.value = item.id;
          array.push(obj);
          self.$set(self.typeInfoOptions[1], "options", array);
        });
      }
    },
    //搜索
    search(data) {
      console.log(data);
      this.currentPage = 1;
      this.requestData1.param = data;
      this.getTypeList(this.requestData1);
    },
    //新增事件
    addEquipment() {
      this.$router.push({ name: "addEquipment" });
    },
    //修改
    typeAmend(id, goodsType) {
      this.$router.push({
        path: "modification",
        query: {
          id,
          goodsType
        }
      });
    },
    //设备查看
    typeCheck(id, goodsType) {
      console.log(goodsType);
      switch (goodsType) {
        case 1:
          this.$router.push({
            path: "equipmentCheck",
            query: { id }
          });
          break;
        case 4:
          this.$router.push({
            path: "facilityCheck",
            query: { id }
          });
          break;
        case 3:
          this.$router.push({
            path: "consumableCheck",
            query: { id }
          });
          break;
        case 2:
          this.$router.push({
            path: "mountingsCheck",
            query: { id }
          });
          break;
      }
    },

    //获取类型管理列表
    async getTypeList(data) {
      let obj = {
        1: "设备",
        2: "配件",
        3: "耗材",
        4: "设施"
      };
      let res = await this.$api.getGoosType({ data });
      console.log(res);
      if (res && res.code == 0) {
        this.typeData = res.data.records;
        this.typeData.forEach(item => {
          item.goodsTypeName = obj[item.goodsType];
        });
        this.typeTotalCount = res.data.total;
      }
    },
    //获取类型管理物品名称
    async getSelectOption(data) {
      const self = this;
      let res = await this.$api.getModelTrees({ data });
      console.log("物品名称", res);
      if (res && res.code == 0) {
        let array = [];
        res.data.forEach(item => {
          let obj = {};
          obj.label = item.goodsName;
          obj.value = item.id;
          array.push(obj);
          self.$set(self.typeInfoOptions[1], "options", array);
        });
      }
    },
    //搜索
    search(data) {
      console.log(data);
      this.currentPage = 1;
      this.requestData1.param = data;
      this.getTypeList(this.requestData1);
    },
    //新增事件
    addEquipment() {
      this.$router.push({ name: "addEquipment" });
    },
    //设备查看
    typeCheck(id, goodsType) {
      console.log(goodsType);
      switch (goodsType) {
        case 1:
          this.$router.push({
            path: "equipmentCheck",
            query: { id }
          });
          break;
        case 4:
          this.$router.push({
            path: "facilityCheck",
            query: { id }
          });
          break;
        case 3:
          this.$router.push({
            path: "consumableCheck",
            query: { id }
          });
          break;
        case 2:
          this.$router.push({
            path: "mountingsCheck",
            query: { id }
          });
          break;
      }
    },
    handleCurrentChangeType(currentPage) {
      this.requestData1.page = currentPage;
      this.getTypeList(this.requestData1);
    },
    handleSizeChangeType(pageSize) {
      this.requestData1.pageSize = pageSize;
      this.getTypeList(this.requestData1);
    }
  }
};
</script>

<style lang="less">
h3 {
  margin-bottom: 20px;
}
.tabs-content {
  .upLoadImg {
    .el-form-item__label {
      margin-left: 52px;
    }
  }
  padding: 16px 30px;
  .el-tabs__nav {
    margin-right: 100px;
  }
  .el-tabs__item.is-active {
    background: rgb(230, 247, 255);
  }
  .el-tabs--left .el-tabs__active-bar.is-left,
  .el-tabs--left .el-tabs__nav-wrap.is-left::after {
    left: 194px;
    margin-right: 10px;
  }
  .el-tabs--left .el-tabs__nav-wrap.is-left {
    margin-right: -60px;
  }
  .el-tabs__item {
    padding: 0 70px;
  }
  .tables-content .el-tabs__item.is-active {
    background: none;
  }
  .switchStyle .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
  }
  .switchStyle .el-switch__label--left {
    z-index: 9;
    left: 6px;
  }
  .switchStyle .el-switch__label--right {
    z-index: 9;
    left: -14px;
  }
  .switchStyle .el-switch__label.is-active {
    display: block;
  }
  .switchStyle.el-switch .el-switch__core,
  .el-switch .el-switch__label {
    width: 50px !important;
  }
}
</style>
