// 表单验证规则 for ElementUI
export default {
  // 为空
  checkEmpty: (rule, value, callback) => {
    const _value = (value + '').trim();
    if (!_value) {
      return callback(new Error(rule.message));
    }
    callback();
  },
  // 余额下限为非负数
  userCredit: (rule, value, callback) => {
    const _value = value
    if (_value && _value != 0 && (!Number(_value) || Number(_value) < 0)) {
      return callback(new Error('余额下限需为非负数'));
    }
    if (_value >999999999999.99) {
      return callback(new Error('余额下限不能超过12位数'));
    }
    callback();
  },
    // 输入框必须填数字
    numberVal: (rule, value, callback) => {
      const _value = (value + '').trim()
      const test = (/(^[1-9]\d*$)/.test(_value)) ? true : false
      if (_value && !test) {
        return callback(new Error('值必须为正整数'));
      }
      callback();
    },
    // 数字必填的
    checkEmptyNumber: (rule, value, callback) => {
      const _value = (value + '').trim()
      const test = (/(^[1-9]\d*$)/.test(_value)) ? true : false
      if (!_value) {
        return callback(new Error(rule.message));
      }
      if (_value && !test) {
        return callback(new Error('值必须为正整数'));
      }
      callback();
    },
  // 负责人
  checkPrincipal: (rule, value, callback) => {
    const _value = (value + '').trim();
    if (!_value) {
      return callback(new Error('负责人不能为空'));
    }
    callback();
  },
  // 用户账号
  checkAccount: (rule, value, callback) => {
    const _value = (value + '').trim();
    if (!_value) {
      return callback(new Error('用户账号不能为空'));
    }
    callback();
  },
  // 用户密码
  checkPwd: (rule, value, callback) => {
    const _value = (value + '').trim();
    const test = !(/^[a-zA-Z0-9!@#$%\^&_+=-]{6,16}$/g).test(_value) ? false : true;
    if (!_value) {
      return callback(new Error('密码不能为空'));
    }
    if (!test) {
      return callback(new Error('仅支持6-16位数字英文大小写或特殊字符'));
    }
    callback(); 
  },
  // 用户密码
  checkPassword: (rule, value, callback) => {
    const _value = (value + '').trim();
    const reg = /^[a-zA-Z0-9!@#$%\^&_+=-]{6,16}$/g
    // if (!_value) {
    //   return callback(new Error('密码不能为空'));
    // }
    if (_value && !reg.test(_value)) {
      return callback(new Error('仅支持6-16位数字英文大小写或特殊字符'));
    }
    callback();
  },
  // 手机号
  checkPhone: (rule, value, callback) => {
    const _value = (value + '').trim();
    const test = !/^[1][3,4,5,7,8][0-9]{9}$/.test(_value) ? false : true;
    if (!_value) {
      return callback(new Error('手机号不能为空'));
    }
    if (!test) {
      return callback(new Error('请输入正确的手机号'));
    }
    callback();
  },
  // 邮箱
  checkEmail: (rule, value, callback) => {
    const _value = (value + '').trim();
    const test = !/^[a-zA-Z\d]+([-_\.][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/.test(_value) ? false : true;
    if (!_value) {
      return callback(new Error('邮箱不能为空'));
    }
    if (!test) {
      return callback(new Error('邮箱输入有误'));
    }
    callback();
  },
  // 机构编号
  checkInstStr: (rule, value, callback) => {
    const _value = (value + '').trim();
    if (!_value) {
      return callback(new Error('机构编号不能为空'));
    }
    callback();
  },
  // 银行卡号
  checkBankNo: (rule, value, callback) => {
    // 先判断，是否符合规则
    const _value = (value + '').trim();
    if (!_value) {
      callback(new Error('银行卡号不能为空'))
    } else {
      if (/^([1-9]{1})(\d{15}|\d{18})$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的银行卡号'))
      }
    }
  },
  // 身份证校验
  checkIdCard: (rule, value, callback) => {
    const _value = (value + '').trim();
    if(!_value) {
      callback(new Error('身份证号不能为空'))
    } else {
      // 18位身份证号码校验正则
      let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      // 15位身份证号码校验正则
      let regs = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/;
      if(reg.test(_value)||regs.test(_value)){
        callback()
      } else {
        callback('请输入正确的身份证号码')
      }
    }
  },

  // 整型验证
  checkInteger: (rule, value, callback) => {
    const _value = (value + '').trim();
    const test = !/^[1-9]*[1-9][0-9]*$/.test(_value) ? false : true;
    if (!_value) {
      return callback(new Error(rule.emptyMessage));
    }
    if (!test) {
      return callback(new Error(rule.errorMessage));
    }
    callback();
  },
  // 数字 字母 下划线 减号
  checkCode: (rule, value, callback) => {
    const _value = (value + '').trim();
    const test = !/[^a-zA-Z0-9_-]*$/.test(_value) ? false : true;
    if (!_value) {
      return callback(new Error(rule.emptyMessage));
    }
    if (!test) {
      return callback(new Error(rule.errorMessage));
    }
    callback();
  },
  // 金额必须为正数
  checkMoney: (rule, value, callback) => {
    const _value = value
    const reg =  /^[0-9]+([.]{1}[0-9]+){0,1}$/g;
    if (_value == '' || _value < 0 ) {
      return callback(new Error('最大金额不能为空且不小于0'));
    }
    if(!reg.test(_value)){
      return callback(new Error('金额必须是数字'));
    }
    callback();
  },
  // 捐款金额必须为正数
  donationAmount: (rule, value, callback) => {
    const _value = value
    const reg =  /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/g;
    if (_value < 0 ) {
      return callback(new Error('捐款金额可不填或大于0'));
    }
    if(_value && !reg.test(_value)){
      return callback(new Error('捐款金额格式错误且最多保留两位小数'));
    }
    callback();
  },
  // 搜索范围的金额必须为正数
  searchMoney: (rule, value, callback) => {
    const _value = value
    const reg =  /^[0-9]+([.]{1}[0-9]+){0,1}$/g;
    if (_value < 0 ) {
      return callback(new Error('金额须大于0'));
    }
    // if(!reg.test(_value)){
    //   return callback(new Error('捐款金额必须是数字'));
    // }
    callback();
  },
  // 整型验证
  checkUrl: (rule, value, callback) => {
    const _value = (value + '').trim();
    const test = !/^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/.test(_value) ? false : true;
    if (!_value) {
      return callback(new Error('请输入URL地址'));
    }
    if (!test) {
      return callback(new Error('URL地址输入有误'));
    }
    callback();
  },
  // 验证经度
  checkLng: (rule, value, callback) => {
    const _value = (value + '').trim();
    const test = !/^-?((0|1?[0-8]?[0-9]?)(([.][0-9]{1,10})?)|180(([.][0]{1,10})?))$/.test(_value) ? false : true;
    // if (!_value) {
    //   return callback(new Error('请输入经度'));
    // }
    if (!test && _value) {
      return callback(new Error('请输入合法的经度'));
    }
    callback();
  },
  // 验证纬度
  checkLat: (rule, value, callback) => {
    const _value = (value + '').trim();
    const test = !/^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,10})?)|90(([.][0]{1,10})?))$/.test(_value) ? false : true;
    // if (!_value) {
    //   return callback(new Error('请输入纬度'));
    // }
    if (!test && _value) {
      return callback(new Error('请输入合法的纬度'));
    }
    callback();
  },

   // 输入框可空(填只能填数字)
   numberCheck: (rule, value, callback) => {
    const _value = (value + '').trim()
    const test = (/(^[1-9]\d*$)/.test(_value)) ? true : false
    // if (!_value) {
    //   return callback(new Error('值不能为空'));
    // }
    if (!test && _value) {
      return callback(new Error('值必须为数字'));
    }
    callback();
  },
}
