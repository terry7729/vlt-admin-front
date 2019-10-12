<template>
  <div class="table-paging-comp">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'tablePaging',
    data() {
      return {
        currentPage: 1
      };
    },
    methods: {
      handleSizeChange(size) {
        console.log(`每页 ${size} 条`);
        const self = this;
        self.currentPage = 1;
        self.pageSize = size;
        self.getList();
      },
      handleCurrentChange(page) {
        console.log(`当前页: ${page}`);
        const self = this;
        self.currentPage = page;
        self.getList();
      }
    },

  }
</script>

<style lang="less" scoped>
  .table-paging-comp{
    margin: 10px 0;
  }
</style>
