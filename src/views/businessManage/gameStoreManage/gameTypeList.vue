<template>
  <div class="vlt-card">
    <search-bar class="search-bar-demo"
      @search="search"
      :options="searchOptions"
      :total="999"
      labelWidth="86px">
      <control-bar slot="extend-bar" @select="selectBtn" :options="controlOptions"></control-bar>
    </search-bar>
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" fixed="left"></el-table-column>
      <el-table-column label="序号" type="index" width="55"></el-table-column>
      <el-table-column prop="id" label="游戏类型名称" ></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            @change="changeSwitchBet"
            active-color="#409EFF"
            inactive-color="">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="说明"></el-table-column>
      <el-table-column prop="pond" label="创建人"></el-table-column>
      <el-table-column prop="time" label="创建时间" width="160px"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-prevent="2000" @click.native="edit(scope.row.id)">编辑</el-button>
          <!-- <el-button  size="mini" v-prevent="2000" @click.native="edit(scope.row.id)">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <table-paging
      position="right"
      :total="999"
      :currentPage="1"
      :pageSize="10"
      @handleSizeChange="changeSize"
      @handleCurrentChange="changeCurrent">
    </table-paging>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="isShow"
      width="40%"
      max-width="700px">
      <div class="vlt-edit-single">
        <base-form :formData="typeData" ref="baseForm" :rules="rules" direction="right" @change="changeForm"></base-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "",
  data() {
    return {
      controlOptions: [
        { name: "新增类型", type: "primary", icon: "plus" }, // type为按钮的五种颜色， icon为具体的图标
        { name: "批量删除", type: "", icon: "delete" }
      ],
      searchOptions: [
        {title: '游戏类型名称', type: 'input', prop: "gameType", value:''},
        {title: '类型状态', type: 'select', prop: "typeStatus", value:'', options:[{label:'启用',value:'0'},{label:'关闭',value:'1'}]}
      ],
      tableData: [
        {id:'a',status: true,type:'c',pond:'3',time:'2019-09-12 09:00:00'}
      ],
      isShow: false,
      typeData: [
        {title: '类型名称', type: 'input', prop: 'name', value:''},
        {title: '类型状态', type: 'switch', prop: 'status', value: true},
        {title: '类型说明', type: 'textarea', prop: 'remark', value:''},
      ],
      rules: {},
      dialogTitle: '新增类型'
    }
  },
  methods: {
    edit() {
      this.isShow = true;
      this.dialogTitle = '编辑类型'
    },
    sure() {

    },
    changeCurrent() {

    },
    changeSize() {

    },
    selectBtn(item) {
      if(item.name=='新增类型') {
        this.dialogTitle = '新增类型'
        this.isShow = true;
      }
    },
    changeForm() {

    }
  },
}
</script>

<style lang="less" scoped>
@import './less/index.less';
</style>
