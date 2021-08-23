// 由于计算机内存中存储浮点数方式的原因，浮点数计算是不精确的
console.log((0.1 + 0.2) === 0.3);               // false
console.log(0.1 + 0.2);                         // 0.30000000000000004

// 比较浮点数
const EPSILON = 1e-17;
if (0.3 - (0.1 + 0.2) < EPSILON) console.log(true);

// 全局Number对象有两个属性，记录了 JavaScript 运行环境中的最大和最小值范围
console.log(Number.MAX_VALUE);                  // 1.7976931348623157e+308  (NodeJS,Chromium)
console.log(Number.MIN_VALUE);                  // 5e-324                   (NodeJS,Chromium)

// 任何无法表示的正值都为无穷大
console.log(1 / 0);                             // Infinity
console.log(-1 / 0);                            // -Infinity

// 判断一个值是否无穷大
console.log(isFinite(1 / 0));           // false
console.log(isFinite(1e-17));           // true