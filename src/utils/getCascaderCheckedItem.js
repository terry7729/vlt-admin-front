// element-ui 获取级联选择数据（Array）
export const getCascaderCheckedItem = function(keys, keyName, options) {
  return keys.map(function (value, index, array) {
    for (let item of options) {
      if (item[keyName] == value) {
        options = item.child; 
        return item; 
      }
    }
    return null;
  });
}