<template>
  <div class="vlt-card  vlt-edit-single">
    <div class="vlt-edit-wrap">
      <panel-static title="彩票信息">
        <base-info :infoList="infoList"></base-info>
      </panel-static>
    </div>
  </div>
</template>

<script type="text/javascript">
import rules from "@/utils/rules.js";
export default {
  name: "equipmentDetail",
  data() {
    return {
      form: {
        name: "",
        type: "",
        coding: "",
        location: "",
        useStatus: "",
        accessoryStatus: "",
        storageTime: ''
      },
      params: {},
      infoList: [
        { title: "游戏编码", value: "", prop: "gameCode" },
        { title: "周期类型", value: "", prop: "cycleType" },
        { title: "游戏状态", value: "", prop: "gameStatus" },
        { title: "游戏名称", value: "", prop: "gameName" },
        { title: "游戏类型", value: "", prop: "officialEndSale" }
      ],
      setData: {
            id: 0,
            device: 'xxx',
            type: 'xxx',
            coding: 'xxx',
            location: '中彩仓库',
            useStatus: '运行中',
            accessoryStatus: '正常',
            storageTime: '2019-09-09'
      }
    };
  },
  created () {
      let id = this.$route.query.id;
    if (id) {
      this.id = id;
      this.initDetail(this.id)
    }
  },
  components: {},
  methods: {
    async initDetail (id) {
      let result = await this.$api.accessoriesInfoDetail(id)
       if (result.code === 0) {
        this.infoList.forEach(item => {
          item.value = result.data[item.prop]
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
.vlt-card {
  padding: 20px;
}
</style>
