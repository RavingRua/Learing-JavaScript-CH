const name = Symbol('name');
const value = Symbol('value');
const obj = {
    [name]: 'obj'
}
Object.defineProperty(obj, value, {value: 100});

console.log(obj);                               // {Symbol(name): "obj", Symbol(value): 100}
console.log(obj.name);                          // undefined
console.log(obj.value);                         // undefined
console.log(obj[name]);                         // obj
console.log(obj[value]);                        // 100

console.log(Object.getOwnPropertyNames(obj));       // []
console.log(Object.getOwnPropertySymbols(obj));     // [ Symbol(name), Symbol(value) ]
console.log(Object.getOwnPropertyDescriptors(obj));
// {
//   [Symbol(name)]: {
//     value: 'obj',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   [Symbol(value)]: {
//     value: 100,
//     writable: false,
//     enumerable: false,
//     configurable: false
//   }
// }
console.log(Reflect.ownKeys(obj));              // [ Symbol(name), Symbol(value) ]

