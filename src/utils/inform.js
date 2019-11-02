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
  //根据数值选中对应通知方式
  showInformType(type) {  
    var list=[];
    switch (type) {
      case 1:
        list = ["站内"];
        break;
      case 2:
        list = ["邮件"];
        break;
      case 3:
        list = ["短信"];
        break;
      case 4:
        list = ["站内", "邮件"];
        break;
      case 5:
        list = ["站内", "短信"];
        break;
      case 6:
        list = ["邮件", "短信"];
        break;
      case 7:
        list = ["站内", "邮件", "短信"];
        break;
    }
    return list;
  }
  

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