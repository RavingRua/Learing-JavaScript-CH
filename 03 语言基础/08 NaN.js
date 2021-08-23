// 特殊值 NaN，Not a Number，表示返回数值的操作失败
console.log(0 / -0);                            // NaN
console.log(1 / 'b');                           // NaN

// NaN不等于任何值，包括自身
console.log(NaN === NaN);                       // false

// isNaN函数用于判断一个值是否为NaN
console.log(isNaN(1));                 // false
console.log(isNaN('1'));               // false
console.log(isNaN('a'));               // true
console.log(isNaN(NaN));               // true
console.log(isNaN(true));              // false
console.log(isNaN(false));             // false

// isNaN检测对象时，实际上先调用其valueOf()方法，如果无结果再调用toString()
console.log('1'.valueOf());
console.log((1).toString());