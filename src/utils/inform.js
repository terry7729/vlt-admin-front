// 表单验证规则 for ElementUI
export default {
  //通知方式改变
  getInformIdByCheckValue(arrList) {
    let informType;
    if (arrList) {
      if (arrList.length == 1) {
        if (arrList.includes("站内")) {
          informType = 1;
        } else if (arrList.includes("邮件")) {
          informType = 2;
        } else {
          informType = 3;
        }
      } else if (arrList.length == 2) {
        if (arrList.includes("站内") && arrList.includes("邮件")) {
          informType = 4;
        } else if (arrList.includes("短信") && arrList.includes("邮件")) {
          informType = 6;
        } else {
          informType = 5;
        }
      } else if (arrList.length == 3) {
        informType = 7;
      } else {
        informType = "";
      }
    }
    return informType
  },
  //百分比数字转换成小数
  conventToPoint(percent) {
    if (typeof percent === 'string') {
      if (percent.indexOf('%') != -1) {
        percent = Number(percent.split('%')[0]) / 100
      }
    }
    return percent;
  },

  // //小数转换成百分比数字
  // conventToPoint(percent) {
  //   console.log(typeof percent)
  //   // if (typeof percent === 'string') {
  //   //   if (percent.indexOf('%') != -1) {
  //   //     percent = Number(percent.split('%')[0]) / 100
  //   //   }
  //   // }
  //   return percent;
  // },
}