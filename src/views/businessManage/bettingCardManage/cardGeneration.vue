<template>
  <!-- 投注卡生成 -->
  <div class="vlt-card">
    <search-bar
      class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="tableData.total"
      labelWidth="100px"
    >
      <control-bar slot="extend-bar" position="left" @select="selectBtn" :options="controlOptions"></control-bar>
    </search-bar>
    <el-row class="card-table">
      <el-table
        :data="tableData.records"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        class="table-box"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          v-for="(item,key) in tableKey"
          :key="key"
          :prop="item.value"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button> -->
            <el-button type="primary" size="mini" @click="handleClick(scope.row)">明细</el-button>
            <el-button type="primary" size="mini" @click="exportExcel(scope.row)">导出</el-button>
            <el-button type="danger" size="mini" @click="logoutData (scope.row) ">注销</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <table-paging
      position="right"
      :total="tableData.total"
      :currentPage="tableData.current"
      :pageSize="tableData.size"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></table-paging>
  </div>
</template>

<script type="text/javascript">
import dialogForm from "@/views/businessManage/bettingCardManage/components/dialogForm";
export default {
  name: "cardGeneration",
  data() {
    return {
      // 搜索组件配置
      searchOptions: [
        { title: "批次：", type: "input", prop: "batch", value: "" },
        {
          title: "所属机构：",
          type: "cascader",
          prop: "insId",
          value: "",
          options: [],
          setProps: {
            label: "text",
            value: "id",
            children: "children",
            checkStrictly: true //设置父子节点取消选中关联，从而达到选择任意一级选项的目的
          }
        },
        {
          title: "投注卡类型：",
          type: "select",
          prop: "bettingCardType",
          value: "",
          options: [
            { label: "普通卡", value: 1 },
            { label: "会员卡", value: 2 },
            { label: "试玩卡", value: 3 }
          ]
        }
      ],
      controlOptions: [{ name: "新建卡片", type: "primary", icon: "plus" }],
      serviceList: {
        type: "1",
        dataList: [
          {
            id: 0,
            avatar: require("@/assets/img/avatar.jpg"),
            name: "主板-xx型",
            device: "投注机-F01型",
            failure: {
              failureRate: "1%",
              name: "故障率"
            },
            descList: [
              {
                id: 0,
                name: "配件数量",
                number: "3568"
              },
              {
                id: 1,
                name: "维修次数",
                number: "14"
              }
            ]
          },
          {
            id: 1,
            avatar: require("@/assets/img/avatar.jpg"),
            name: "主板-xx型",
            device: "投注机-F01型",
            failure: {
              failureRate: "1%",
              name: "故障率"
            },
            descList: [
              {
                id: 0,
                name: "配件数量",
                number: "3568"
              },
              {
                id: 1,
                name: "维修次数",
                number: "14"
              }
            ]
          },
          {
            id: 2,
            avatar: require("@/assets/img/avatar.jpg"),
            name: "主板-xx型",
            device: "投注机-F01型",
            failure: {
              failureRate: "1%",
              name: "故障率"
            },
            descList: [
              {
                id: 0,
                name: "配件数量",
                number: "3568"
              },
              {
                id: 1,
                name: "维修次数",
                number: "14"
              }
            ]
          },
          {
            id: 3,
            avatar: require("@/assets/img/avatar.jpg"),
            name: "主板-xx型",
            device: "投注机-F01型",
            failure: {
              failureRate: "1%",
              name: "故障率"
            },
            descList: [
              {
                id: 0,
                name: "配件数量",
                number: "3568"
              },
              {
                id: 1,
                name: "维修次数",
                number: "14"
              }
            ]
          },
          {
            id: 4,
            avatar: require("@/assets/img/avatar.jpg"),
            name: "主板-xx型",
            device: "投注机-F01型",
            failure: {
              failureRate: "1%",
              name: "故障率"
            },
            descList: [
              {
                id: 0,
                name: "配件数量",
                number: "3568"
              },
              {
                id: 1,
                name: "维修次数",
                number: "14"
              }
            ]
          },
          {
            id: 5,
            avatar: require("@/assets/img/avatar.jpg"),
            name: "主板-xx型",
            device: "投注机-F01型",
            failure: {
              failureRate: "1%",
              name: "故障率"
            },
            descList: [
              {
                id: 0,
                name: "配件数量",
                number: "3568"
              },
              {
                id: 1,
                name: "维修次数",
                number: "14"
              }
            ]
          }
        ]
      },
      tableKey: [
        { label: "序号", value: "bettingCardId", width: "80" },
        { label: "批次", value: "batch", width: "" },
        { label: "投注卡类型", value: "bettingCardType", width: "100" },
        { label: "所属机构", value: "insName", width: "" },
        { label: "发卡数量", value: "cardMakingQuantity", width: "80" },
        { label: "备注", value: "remark", width: "" }
      ],
      tableData: {
        records: [],
        total: 4,
        size: 15,
        current: 1,
        orders: [],
        searchCount: true,
        pages: 1
      },
      options: {
        page: 1,
        pageSize: 10,
        param: {
          batch: '',
          bettingCardType: 0,
          insId: 0
        }
      },
      outData: {}
    };
  },
  created() {
    this.initList(this.options);
    this.getInsData();
  },
  methods: {
    async initList(options) {
      const _this = this;
      let data = JSON.parse(JSON.stringify(options));
      console.log(data);
      let result = await this.$api.cardGenerationList({ data });
      console.log(result);
      if (result.code == 0) {
        _this.tableData = result.data;
        _this.tableData.records = result.data.records.map(item => {
          item.bettingCardType = _this.forMatType(item.bettingCardType);
          // item.cardStatus = _this.forMatStatus(item.cardStatus);
          return item;
        });
      } else {
          _this.$message({
            type: "error",
            message: result.msg
          });
      }
    },
    changeSelect(val) {
      console.log(this.form, val);
    },
    selectBtn(val) {
      this.$router.push({
        name: "newCard"
      });
    },
    // 获取机构数据
    getInsData() {
      const self = this;
      const data = {};
      (async data => {
        let res = await self.$api.QueryInsTree({ data });
        console.log(res);
        if (res && res.code == 0) {
          let newData = res.data;
          console.log('info', newData, self.searchOptions[1]);
          self.$set(self.searchOptions[1], "options", newData);
        } else {
          // self.$message.warning(res.msg)
        }
      })(data);
    },
    search(form) {
      this.options.param = form
      this.initList(this.options);
      // console.log("search", form);
    },
    handleClick(row) {
      this.$router.push({
        name: "cardDetail",
        query: {
          id: row.bettingCardId
        }
      });
    },
    edit(val) {
      this.$router.push({
        name: "exportCard",
        query: {
          id: val.id
        }
      });
    },
    // toExport(val) {
    //   this.$router.push({
    //     name: "exportCard",
    //     query: {
    //       id: val.id
    //     }
    //   });
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize) {
      this.tableData.size = pageSize;
      this.options.pageSize = pageSize;
      this.initList(this.options);
    },
    handleCurrentChange(currentPage) {
      console.log(currentPage);
      this.options.page = currentPage;
      this.initList(this.options);
    },
    changeForm(val) {
      Object.assign(this.params, val);
      // console.log("派发出来的参数", this.params);
    },
    async deleteBetting(id) {
      const _this = this;
      let result = await _this.$api.deleteCardGeneration(id);
      return result;
    },

    async exportExcel(row) {
        this.outData = {
          page: 0,
          pageSize: 0,
          param: {
            all: true,
            batch: "",
            bettingCardId: row.bettingCardId
          }
        }
      const data = JSON.parse(JSON.stringify(this.outData));
      let result = await this.$api.bettingCardExportExcel({
        data,
        responseType: 'blob'
      });
      var blob = new Blob([result], {
        type: "application/vnd.ms-excel;charset=utf-8"
      });
      var url = window.URL.createObjectURL(blob);
      var aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = url;
      aLink.setAttribute("download", "年度发展计划列表.xls");
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink); //下载完成移除元素
      window.URL.revokeObjectURL(url); //释放掉blob对象
      //console.log("res", result);
    },
    logoutData(row) {
      const _this = this;
      _this
        .$confirm("将永久注销此数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          let result = _this.deleteBetting({data: row.bettingCardId});
          result.then(resp => {
            console.log(resp);
            if (resp.code == 0) {
              _this.$message({
                type: "success",
                message: "删除成功!"
              });
              // 删除之后再次刷新一下数据
              _this.initList(_this.options);
            }
          });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    forMatType(type) {
      switch (type) {
        case 1:
          return (type = "普通卡");
        case 2:
          return (type = "会员卡");
        case 3:
          return (type = "试玩卡");
      }
    }
  },
  components: {
    "dialog-form": dialogForm
  }
};
</script>

<style lang="less" scoped>
</style>
