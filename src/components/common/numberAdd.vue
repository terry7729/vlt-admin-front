<!-- 数字累加 -->
<template>
  <div class="number-grow-warp">
    <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">0</span>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: Number,
      default: 2
    },
    value: {
      type: Number,
      default: 0
    }
  },
  methods: {
    numberGrow(ele) {
      let _this = this;

      let step =  parseInt(_this.value / (_this.time * 10));
      let current = 0;
      let start = 0;
      let t = setInterval(function() {
        start += step;
        if (start > _this.value) {
          clearInterval(t);
          start = _this.value;
          t = null;
        }
        if (current === start) {
          return;
        }
        current = start;
        ele.innerHTML = current
          .toString()
          .replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, "$1,");
      }, 20);
    }
  },
  mounted() {
    this.numberGrow(this.$refs.numberGrow);
  }
};
</script>

<style lang="less">
.number-grow-warp {
  transform: translateZ(0);
}
.number-grow {
  font-weight: bold;
  font-size: 36px;
  padding-bottom: 10px;
    @media (max-width: 1400px ) {
      font-size: 32px;
    }
}
</style>