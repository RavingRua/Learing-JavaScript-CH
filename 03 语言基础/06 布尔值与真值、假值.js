// 布尔类型只有两个值，即 true 和 false，其他任何值都不是 Boolean 类型
// 真值会被转换为true，假值被转换为false
console.log(true == 1);             // true
console.log(true === 1);            // false

// 以下均为假值
console.log(Boolean(0));
console.log(Boolean(''));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));