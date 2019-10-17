<!-- 首页 - 日期选项 -->
<template>
  <div class="module-calemdar">
    <el-row>
      <el-col :span="10">
        <div class="calemdar-select">
          <div class="change-select">
            <el-date-picker
              v-model="yearsValue"
              type="year"
              placeholder="选择年"
              @change="changeYear"
              :clearable="false"
            ></el-date-picker>
            <el-date-picker
              v-model="monthValue"
              type="month"
              format="MM"
              placeholder="选择月"
              @change="changeMonth"
              :clearable="false"
            ></el-date-picker>
            <!-- <el-select v-model="monthValue" placeholder="选择月" @change="changeMonth">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
          </div>
          <el-calendar v-model="dayValue" @change="changeCalendar">
            <template slot="dateCell" slot-scope="{date, data}">
              <p
                :class="data.isSelected ? 'is-selected' : ''"
                @click="changeDay(data.day)"
              >{{ data.day.split('-').slice(2)[0]}}</p>
            </template>
          </el-calendar>
        </div>
      </el-col>
      <el-col :span="13" :offset="1" class="select-table">
        <p class="tips-item">
          <i class="el-alert__icon el-icon-info"></i>
          <span>{{date}}</span>
        </p>
        <el-table :data="tableData" style="width: 100%" border class="table-box">
          <el-table-column prop="time0" label=" 9:00"></el-table-column>
          <el-table-column prop="time1" label="10:00"></el-table-column>
          <el-table-column prop="time2" label="11:00"></el-table-column>
          <el-table-column prop="time3" label="12:00"></el-table-column>
          <el-table-column prop="time4" label="13:00"></el-table-column>
          <el-table-column prop="time5" label="14:00"></el-table-column>
          <el-table-column prop="time6" label="15:00"></el-table-column>
          <el-table-column prop="time7" label="16:00"></el-table-column>
          <el-table-column prop="time8" label="17:00"></el-table-column>
          <el-table-column prop="time9" label="18:00"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "calendarSelect",
  data() {
    return {
      value1ww: "",
      date: "2019-09-30 星期一",
      yearsValue: "" + new Date().getFullYear(),
      monthValue: "" +  new Date().getFullYear() +'-'+ (new Date().getMonth() + 1),
      tableData: [
        {
          time0: "待办",
          time1: "",
          time2: "",
          time3: "",
          time4: "待办",
          time5: "",
          time6: "",
          time7: "",
          time8: "待办",
          time9: ""
        }
      ],
      options: [],
      selectDay: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
      },
      dayValue: new Date()
    };
  },
  created() {
    this.forMatMonth();
    console.log('返回的月份', this.monthValue);
  },
  methods: {
    forMatMonth() {
      let monthArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ];
      for (let i = 1; i < 13; i++) {
        for (let j = 0; j < monthArr.length; j++) {
          if (i - 1 == j) {
            this.options.push({
              value: i,
              label: monthArr[j]
            });
          }
        }
      }
    },
    changeYear(value) {
      this.selectDay.year = new Date(this.yearsValue).getFullYear();
      // 选择年份月份后 下边的日历要变成当年当月显示的日历
      this.dayValue = `${this.selectDay.year}-${this.selectDay.month}-${this.selectDay.day}`;
      this.getTableInfo(this.dayValue);
      // console.log("选择的年份是", this.selectDay, this.dayValue);
    },
    changeMonth(value) {
      console.log(value);
      console.log(new Date(value).getMonth()+1);
      // this.selectDay.month =
      //   new Date(
      //     `${this.selectDay.year}-${this.selectDay.month}-${this.selectDay.day}`
      //   ).getMonth() + 1;
      // let mm =  new Date(`${this.selectDay.year}-${this.selectDay.month}-${this.selectDay.day}`)
      // this.dayValue = mm.formatDate('yyyy-MM-dd');
      // this.getTableInfo(this.dayValue);
    },
    changeDay(value) {
      this.selectDay.day = value.split("-")[2];
      // console.log('day',this.selectDay, value);
      this.dayValue = new Date(
        `${this.selectDay.year}-${this.selectDay.month}-${this.selectDay.day}`
      );
      this.getTableInfo(this.dayValue);
    },
    changeCalendar(value) {
      console.log(value);
    },
    getTableInfo(info) {
      console.log("请求的数据", info);
    },
    open() {
      this.$message("这是一条消息提示");
    }
  }
};
Date.prototype.format = function(format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return format;
};
</script>

<style lang="less">
.module-calemdar {
  margin-top: 40px;
  .calemdar-select {
    border: 1px solid #ededed;
    .change-select {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 20px;
      .el-date-editor.el-input,
      .el-select {
        width: 120px;
        margin-right: 20px;
      }
    }
    .el-calendar {
      .el-calendar__header {
        padding-bottom: 0;
        padding-top: 0;
      }
      .el-calendar__title {
        display: none;
      }
      .el-calendar__button-group {
        .el-button-group {
          .el-button--plain {
            // &:nth-of-type(1),
            // &:nth-of-type(3) {
            //   display: none;
            // }
            display: none;
          }
        }
      }
      .el-calendar__body {
        .el-calendar-day {
          p {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
.select-table {
  // padding: 20px;
  background-color: #f7f7f7;
}
.tips-item {
  height: 32px;
  line-height: 32px;
  background-color: rgba(230, 243, 252, 1);
  // border: 1px solid rgba(212, 240, 252, 1);
  font-size: 12px;
  color: #515a6e;
  // border-radius: 4px;
  padding: 0 10px;
  margin: 10px 0;
  em {
    color: #2d8cf0;
    font-style: normal;
    padding: 0 3px;
  }
  i {
    vertical-align: middle;
    line-height: 32px;
    color: #2d8cf0;
    padding-right: 5px;
    margin-right: 5px;
  }
  span {
    line-height: 32px;
  }
}
</style>