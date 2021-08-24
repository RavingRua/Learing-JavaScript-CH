// for-in语句用于遍历可枚举对象中的非符号键属性，获取的是键
let obj = {
    name: 'obj',
    type: 'Object',
    [Symbol('value')]: 10
};

for (const key in obj) {
    console.log(key);
    // name
    // type
    console.log(obj[key]);
    // 'obj'
    // 'Object'
}

let arr = ['foo', 'bar', 'baz'];

// for-of用于遍历可迭代对象，获取的是元素值
for (const value of arr) {
    console.log(value);
    // foo
    // bar
    // baz
}