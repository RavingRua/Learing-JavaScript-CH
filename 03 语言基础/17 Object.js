// 创建一个对象
let obj1 = new Object();

// 定义对象属性
Object.defineProperties(obj1, {
    'name': {
        value: 'obj1',
    },
    'value': {
        value: 10
    }
});

// 简化写法
let obj2 = {
    name: 'obj2',
    value: 20
};

// 判断对象实例（非原型）上是否有给定属性
console.log(obj1.hasOwnProperty('name'));       // true

// 判断一个对象是否为另一个对象的原型
console.log(obj1.isPrototypeOf(obj1));          // false

// 判断对象的属性是否为可枚举的（用于for-in）
console.log(obj1.propertyIsEnumerable('name')); // false

// 返回对象的字符串表示
console.log((new Date()).toString());                       // 国际标准时间格式描述

// 返回对象的字符串表示，本地化显示
console.log((new Date()).toLocaleString());                 // 国家/地区标准时间格式描述

// 返回对象的Number、Boolean或String表示，一般和toString行为一致
console.log(obj1.valueOf());                                // {}
