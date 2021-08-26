// 字面量创建
let str1 = 'str1';
console.log(typeof str1);               // 'string'
console.log(str1.substring(0, 3));      // 'str'
str1.name = '1';                        // str1是新创建的一个原始值包装类型对象，语句结束后销毁
console.log(str1.name);                 // undefined，调用str1再次创建一个对象，该对象没有默认的name属性

// 显示使用构造函数
let str2 = new String('str2');
console.log(typeof str2);               // 'object'
str2.name = '2';
console.log(str2.name);                 // '2'