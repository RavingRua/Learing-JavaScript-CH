const add = (x, y, z) => x + y + z;
const arr = [1, 2, 3];
console.log(add(...arr));               // 6

const arr1 = [arr, 4, 5, 6];
const arr2 = [...arr, 4, 5, 6];
console.log(arr1);                        // [ [ 1, 2, 3 ], 4, 5, 6 ]
console.log(arr2);                        // [ 1, 2, 3, 4, 5, 6 ]
arr[0] = 0;
console.log(arr1);                        // [ [ 0, 2, 3 ], 4, 5, 6 ]
console.log(arr2);                        // [ 1, 2, 3, 4, 5, 6 ]

const obj1 = {name: 'obj1'};
const obj2 = {...obj1};
obj2.name = 'obj2';
console.log(obj1.name);                 // obj1
console.log(obj2.name);                 // obj2