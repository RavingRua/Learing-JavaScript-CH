let obj = {
    name: 'Steven',
    age: 20,
    1: true         // Number类型的键会自动转为字符串类型
};

console.log(obj);   // { '1': true, name: 'Steven', age: 20 }

console.log(obj.name);
console.log(obj['name']);
