const add = (x, y, z) => x + y + z;
const arr = [1, 2, 3];
console.log(add(...arr));               // 6

console.log([arr, 4, 5, 6]);            // [ [ 1, 2, 3 ], 4, 5, 6 ]
console.log([...arr, 4, 5, 6]);         // [ 1, 2, 3, 4, 5, 6 ]

const obj1 = {name: 'obj1'};
const obj2 = {...obj1};
obj2.name = 'obj2';
console.log(obj1.name);                 // obj1
console.log(obj2.name);                 // obj2