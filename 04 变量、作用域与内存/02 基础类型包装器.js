// 使用new关键字实例化一个原始类型的引用值，拥有和原始值相似的行为，称为基础类型包装器
let str1 = 'string';
let str2 = new String('string');

str1.name = 'str1';
str2.name = 'str2';

console.log(str1);              // 'string'
console.log(str2);              // [String: 'string'] { name: 'str2' }
console.log(str2.toString());   // 'string'
console.log(str2.valueOf());    // 'string'

console.log(str1.name);         // undefined
console.log(str2.name);         // str2

console.log(typeof str1);       // 'string'
console.log(typeof str2);       // 'object'

// 字符串类型是不变的，使用包装器也一样无法改变值，操作包装器对象时可能会发生类型转换
str2 += ' str2';
console.log(str2);              // 'string str2'
console.log(typeof str2);       // 'string'