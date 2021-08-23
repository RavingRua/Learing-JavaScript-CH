// 基本数据类型
console.log(typeof undefined);          // undefined
console.log(typeof null);               // object，实际上是Null类型，特殊值null会被操作符认为是空对象的引用
console.log(typeof Boolean());          // boolean
console.log(typeof Number());           // number
console.log(typeof String());           // string
console.log(typeof Symbol());           // symbol

// 复杂数据类型
console.log(typeof Object());           // object
console.log(typeof Function());         // function，严格意义上函数和其他的特殊对象应该属于Object
                                        // 但是为了区分返回各自类型值