<template>
  <div class="vlt-card">
    <panel title="活动资源" :show="false">
      <div class="active-table">
        <el-button type="primary" size="small" @click="resourceDialog=true">资源选择</el-button>
        <el-table :data="tableData" border style="width:60%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column
            v-for="(item,key)in tableData.fundsData"
            :key="key"
            prop="id"
            label="资源ID"
          ></el-table-column>
          <el-table-column prop="name" label="资源名称"></el-table-column>
          <el-table-column prop="type" label="资源分类"></el-table-column>
          <el-table-column prop="num" label="数量"></el-table-column>
          <el-table-column label="操作">
            <el-button type="primary" size="mini">修改</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </el-table-column>
        </el-table>
        <div class="remark">
          <span>备注：</span>
          <el-input type="textarea" :rows="3" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <el-dialog title="资源选择" :visible.sync="resourceDialog">
        <search-bar @search="resourceSearch" :options="searchOptions" labelWidth="80px"></search-bar>
        <el-table
          :data="resourceCheckData"
          border
          @select="selectChange"
          @select-all="selectAllChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="id" label="资源ID"></el-table-column>
          <el-table-column prop="name" label="资源名称"></el-table-column>
          <el-table-column prop="type" label="资源分类"></el-table-column>
          <el-table-column prop="organ" label="所属机构"></el-table-column>
          <el-table-column prop="store" label="存储仓"></el-table-column>
          <el-table-column prop="stock" label="存量"></el-table-column>
          <el-table-column prop="num" label="需求数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.num" :disabled="scope.row.isabled"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resourceDialog = false">取 消</el-button>
          <el-button type="primary" @click="resourceEnter">确 定</el-button>
        </div>
      </el-dialog>
    </panel>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "",
  data() {
    return {
      tableData: {
        fundsData: [
          {
            id: "9527",
            name: "泡泡龙",
            organ: "中彩",
            type: "游戏发行基金",
            money: "10万"
          }
        ],
        resourceData: [{ id: 9527, name: "海报", type: "宣传材料", num: 100 }],
        executeData: [
          {
            num: "007",
            person: "李白",
            role: "渠道经理",
            name: "A计划",
            talk: "balabala",
            start: "19-10-25",
            end: "19-11-11"
          }
        ]
      }
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
