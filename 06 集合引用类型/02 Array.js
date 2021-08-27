// 创建数组
let arr = new Array(10);
console.log(arr);           // [ <10 empty items> ]

arr = new Array(true, '2', 3);
console.log(arr);           // [ true, '2', 3 ]

arr = Array(3);
console.log(arr);           // [ <3 empty items> ]

arr = Array.of(3);
console.log(arr);           // [ 3 ]

// 转化类数组
console.log(Array.from('string'));      // [ 's', 't', 'r', 'i', 'n', 'g' ]

console.log(Array.from(new Map().set('1', 1).set('2', 2)));
// [ [ '1', 1 ], [ '2', 2 ] ]

console.log(Array.from({
    * [Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }
}));        // [ 1, 2, 3, 4 ]

function getArgsArray() {
    console.log(arguments);            // [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4 }
    return Array.from(arguments);
}

console.log(getArgsArray(1, 2, 3, 4)); // [1, 2, 3, 4]

let arr1 = [1, 2, 3, 4];
let arr2 = Array.from(arr1);
console.log(arr1 === arr2);             // false

console.log(Array.from([1, 2, 3, 4], v => v **= 2));
// [ 1, 4, 9, 16 ]
console.log(Array.from([1, 2, 3, 4], function (v) {
    return v **= this.exponent;
}, {exponent: 2}));
// [ 1, 4, 9, 16 ]

// 数组空位
console.log([, , , , ,]);   // [ <5 empty items> ]
console.log([1, , , 4]);    // [ 1, <2 empty items>, 4 ]
console.log([1, , 4][1]);   // undefined

// 数组索引
arr = [1, 2, 3];
console.log(arr[0]);        // 1
arr[5] = 10;
console.log(arr);           // [ 1, 2, 3, <2 empty items>, 10 ]

console.log([1, , , 4].length);   // 4

arr = [1, 2, 3, 4, 5];
arr.length = 2;
console.log(arr);                 // [1, 2]

console.log(Array.isArray([]));    // true
