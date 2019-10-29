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
              :editable="false"
            ></el-date-picker>
            <!-- <el-date-picker
              v-model="monthValue"
              type="month"
              format="MM"
              placeholder="选择月"
              @change="changeMonth"
              :clearable="false"
            ></el-date-picker>-->
            <div class="select-month">
              <i class="el-icon-date"></i>
              <el-select v-model="monthValue" placeholder="选择月" @change="changeMonth">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <el-calendar v-model="dayValue" @change="changeCalendar" ref="selectItem">
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
const formatDates = function (num) {
  return num < 10 ? '0' + num : num;
};
export default {
  name: "calendarSelect",
  data() {
    return {
      value1ww: "",
      date: "2019-09-30 星期一",
      yearsValue: "" + new Date().getFullYear(),
      monthValue:  formatDates(new Date().getMonth() + 1),
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
        month: formatDates(new Date().getMonth() + 1),
        day: formatDates(new Date().getDate())
      },
      dayValue: new Date(),
      formatDate: ''
    };
  },
  created() {
    this.forMatMonth();
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
              value: formatDates(i),
              label: monthArr[j]
            });
          }
        }
      }
    },
    changeYear(value) {
      this.selectDay.year = new Date(value).getFullYear();
      // 选择年份月份后 下边的日历要变成选择年的当月显示的日历
      this.dayValue = `${this.selectDay.year}-${this.selectDay.month}-${this.selectDay.day}`;
      this.getTableInfo(this.dayValue);
    },
    changeMonth(value) {
      // 选择月份之后会相应的计算出这个月的天数
      // 31天 1 、3、5、7、8、10、12
      // 30天 4、6、9、11
      // 28 平 2 29 润 2
      console.log('valuess', value);
      this.formatDate =  new Date(`${this.selectDay.year}-${value}-${this.selectDay.day}`)
      let YYMMDD = `${this.formatDate.getFullYear()}-${formatDates(this.formatDate.getMonth()+1)}-${formatDates(this.formatDate.getDate())}`
      // this.selectDay.month = new Date(`${this.selectDay.year}-${value}-${this.selectDay.day}`).getMonth() + 1;
      this.selectDay.month = value;

      // 平年但是选择到了 日历上的 2月29号 则是跳转到28号
      if (this.selectDay.year % 4 != 0 && value == '02' && this.selectDay.day > 28) {
        this.dayValue = `${this.selectDay.year}-${value}-28`
        this.selectDay.day = '28';
      } else if (this.selectDay.year % 4 == 0 && value == '02' && this.selectDay.day > 29) { // 闰年 选择2月大于 29
        this.dayValue = `${this.selectDay.year}-${value}-29`
        this.selectDay.day = '29';
      } else if (value == '04' || value == '06' || value == '09' || value == 11) { // 当选择的天数大于30号 但是月份 显示的没有31号 
        if (this.selectDay.day > 30) {
          this.dayValue = `${this.selectDay.year}-${value}-30`
          this.selectDay.day = '30';
        } else {
          this.dayValue = YYMMDD;
        }
      } else {
        this.dayValue = YYMMDD;
      }

      // console.log('选择的月份是', this.selectDay.month );
      this.getTableInfo(this.dayValue);
    },
    changeDay(value) {
      this.selectDay.day = value.split("-")[2];
      // this.selectDay.month = value.split('-')[1];
      // this.monthValue = value.split('-')[1];
      // console.log(this.$refs.selectItem);

      // // 当点击选择超出本月时
      this.formatDate =  new Date(`${this.selectDay.year}-${this.selectDay.month}-${this.selectDay.day}`)
      this.dayValue = `${this.formatDate.getFullYear()}-${formatDates(this.formatDate.getMonth()+1)}-${formatDates(this.formatDate.getDate())}`
      // console.log(this.selectDay.day, this.dayValue);
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
}
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
      .select-month {
        position: relative;
        i.el-icon-date {
          position: absolute;
          left: 5px;
          z-index: 1;
          height: 100%;
          width: 25px;
          text-align: center;
          -webkit-transition: all 0.3s;
          transition: all 0.3s;
          line-height: 40px;
          color: #c0c4cc;
        }
        .el-input__inner {
          padding-left: 25px;
          text-align: center;
        }
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