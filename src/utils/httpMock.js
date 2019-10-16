import Mock from 'mockjs'
import menuData from '@/libs/menu/'

Mock.mock('/api/menu', 'post', menuData);


const data = Mock.mock({
  "code":1,
  "mssage":"成功",
  "data|1000":[{
      "id|+1":1,
      "account":"@ctitle(3,5)",
      "phoneNumber":/^1(5|3|7|8)[0-9]{9}$/,
      "subsidiaryOrgan":"@ctitle(8,12)",
      "department":"@ctitle(3,6)",
      "userRole":"@ctitle(3,4)",
      "name":"@cname(3,4)",
      "latelyFrequency":/^[1-9]$/,
      "latelyTime":"@date('yyyy-MM-dd HH:mm:ss')",
      "latelyIP":/^[1-9]$/,
      "createTime":"@date('yyyy-MM-dd HH:mm:ss')"
      
  }]
})

Mock.mock(/\/shoopList/,"get",function(options){
  console.log(options);
  // console.log(Json)
  return data
  
})

Mock.mock(/\/shoopList/,"post",function(options){

  console.log(options.body);
  let n = data.data.map(item=>{
  
  })
  // console.log(Json)
  return data
  
})
