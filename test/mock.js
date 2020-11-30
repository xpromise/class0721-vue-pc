// 使用 Mock
var Mock = require("mockjs");

Mock.Random.ctitle();
Mock.Random.color();
Mock.Random.cname();
Mock.Random.image();

var data = Mock.mock({
  // // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  // 'list|5': [{
  //     // 属性 id 是一个自增数，起始值为 1，每次增 1
  //     'id|+1': 1
  // }]
  title: "@ctitle(4)",
  "subTitle|3-10": ["@ctitle(1,4)"],
  "caroucelList|4": [
    "@image('200x100', '@color', '#FFF', 'png', '@cname')",
  ],
});
// 输出结果
console.log(data);
