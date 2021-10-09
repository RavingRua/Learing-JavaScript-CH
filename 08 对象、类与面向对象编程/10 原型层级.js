let obj1 = {
    name: 'obj1',
    value: 10,
};

Object.defineProperty(obj1, '_value', {
    enumerable: false,
    value: 20
})

let obj2 = Object.create(obj1);
obj2.name = 'obj2';                 // 遮蔽

let obj3 = Object.create(obj2);
obj3.name = 'obj3';                 // 遮蔽

console.log(obj1.name);             // obj1
console.log(obj2.name);             // obj2
console.log(obj3.name);             // obj3

console.log(obj3.value);            // 10，相当于obj3[[Prototype]][[Prototype]].value
console.log(Object.getPrototypeOf(Object.getPrototypeOf(obj3)).value);      // 10
console.log(obj3._value);           // 20，不可枚举但可访问

// 对象引用和for-in语句会将原型上的成员（[[Enumerable]]属性为true）也遍历出来
for (let v in obj3) {
    console.log(v);
    // name
    // value
}

// 检查是否是为自身成员而非原型成员
for (let v in obj3) {
    if (obj3.hasOwnProperty(v)) console.log(v);
    // name
}