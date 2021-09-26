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

// 迭代器方法
arr = ["foo", "bar", "baz", "qux"];
console.log(arr.keys());                        // Object [Array Iterator] {}
console.log(Array.from(arr.keys()));    // [ 0, 1, 2, 3 ]
console.log(arr.values());
console.log(Array.from(arr.values()));  // [ 'foo', 'bar', 'baz', 'qux' ]
console.log(arr.entries());
console.log(Array.from(arr.entries())); // [ [ 0, 'foo' ], [ 1, 'bar' ], [ 2, 'baz' ], [ 3, 'qux' ] ]
for (const [index, value] of arr.entries()) {
    console.log(index);         // 0,1,2,3
    console.log(value);         // foo,bar,baz,qux
}

arr = [1, 2, 3, 4, 5];
console.log(arr.fill(6));                       // [ 6, 6, 6, 6, 6 ]
console.log(arr.fill(7, 1));            // [ 6, 7, 7, 7, 7 ]
console.log(arr.fill(8, 2, 4));     // [ 6, 7, 8, 8, 7 ]

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const reset = () => arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr.copyWithin(3));                 // [1, 2, 3, 1, 2, 3, 4, 5, 6]
console.log(arr);
reset();
console.log(arr.copyWithin(0, 5));         // [6, 7, 8, 9, 5, 6, 7, 8, 9]
reset();
console.log(arr.copyWithin(4, 0, 3)); // [1, 2, 3, 4, 1, 2, 3, 8, 9]

// 队列方法
arr = [1];
arr.push(2, 3);
console.log(arr);               // [ 1, 2, 3 ]
arr = [1];
arr.unshift(2, 3);
console.log(arr);               // [ 2, 3, 1 ]
arr.shift();
console.log(arr);               // [ 3, 1 ]

reset();
arr.reverse();
console.log(arr);

console.log(arr.sort((a, b) => a - b));

arr = [1, 2, 3];
console.log(arr.concat([4, 5, 6], [7, 8]));     // [ 1, 2, 3, 4, 5, 6, 7, 8 ]
console.log(arr);                               // [ 1, 2, 3 ]

console.log([1, 2, 3, 4].slice());              // [ 1, 2, 3, 4 ]
console.log([1, 2, 3, 4].slice(1));             // [ 1, 2, 3 ]
console.log([1, 2, 3, 4].slice(1, 2));           // [ 2 ]

arr = [1, 2, 3];
console.log(arr.splice(0, 2, 1, 2, 4, 5, [6, 7]));       // [ 1, 2 ]
console.log(arr);                   // [ 1, 2, 4, 5, [ 6, 7 ], 3 ]

arr = [1, 2, 3];
arr.splice(0, 2, 9, 10);
console.log(arr);                   // [ 9, 10, 3 ]

arr = [1, 2, 3];
arr.splice(1, 1);
console.log(arr);                   // [ 1, 3 ]

console.log([1, 2, 3].find(value => value === 3));          // 3
console.log([1, 2, 3].find(value => value === 4));          // undefined
console.log([1, 2, 3].findIndex(value => value === 3));     // 2
console.log([1, 2, 3].findIndex(value => value === 4));     // -1