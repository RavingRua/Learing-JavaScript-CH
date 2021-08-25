// 基础类型值复制时本质是新建一块内存区域存放复制的值
let num1 = 10;
let num2 = num1;

num2 = 20;

console.log(num1);      // 10
console.log(num2);      // 20

// 复制引用类型值本质是新建一个指针指向同一对象
let obj1 = {name: 'obj1'};
let obj2 = obj1;

obj2.name = 'obj2';
console.log(obj1.name); // 'obj2'