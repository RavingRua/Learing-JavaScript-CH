let obj1 = {
    name: 'obj1',
    value: 10,
};

let obj2 = Object.create(obj1);
obj2.name = 'obj2';

console.log('name' in obj2);            // true
console.log('value' in obj2);           // true

// 检测访问到的成员是否为原型上的成员
let hasPrototypeProperty = (obj, ref) => !obj.hasOwnProperty(ref) && ref in obj;

console.log(hasPrototypeProperty(obj2, 'name'));        // false
console.log(hasPrototypeProperty(obj2, 'value'));       // true