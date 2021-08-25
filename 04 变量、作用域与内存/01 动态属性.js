// 引用值可以动态地添加属性
let man = {};
man.name = 'Steven';
console.log(man.name);                  // 'Steven'

// 原始值不能动态添加属性，即使不会报错
let num = 10;
num.name = 'number';
console.log(num.name);                  // undefined