const steven = {};

// 数据属性
Object.defineProperty(steven, 'name', {
    value: 'Steven',
    configurable: true,
    writable: false,
    enumerable: true
});

// 访问器属性
steven._age = undefined;
Object.defineProperty(steven, 'age', {
    get() {
        return `age: ${this._age}`;
    },
    set(v) {
        if (typeof v === "number") {
            this._age = v;
        }
    }
});
steven.age = 21;
console.log(steven.age);                // age: 21

// 获取属性描述符
console.log(Object.getOwnPropertyDescriptor(steven, 'age'));
// {
//   get: [Function: get],
//   set: [Function: set],
//   enumerable: false,
//   configurable: false
// }

console.log(Object.getOwnPropertyDescriptors(steven));
// {
//   name: {
//     value: 'Steven',
//     writable: false,
//     enumerable: true,
//     configurable: true
//   },
//   _age: { value: 21, writable: true, enumerable: true, configurable: true },
//   age: {
//     get: [Function: get],
//     set: [Function: set],
//     enumerable: false,
//     configurable: false
//   }
// }