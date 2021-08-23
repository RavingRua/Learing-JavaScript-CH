// 转型函数Number，将一个值转为Number类型
console.log(Number(true));                  // 1
console.log(Number(false));                 // 0
console.log(Number(2));                     // 2，数值类型直接返回
console.log(Number(null));                  // 0
console.log(Number(undefined));             // NaN

// 字符串规则
// 包含数字的字符串会尝试转换为Number，忽略首位的0，计入正负号，返回十进制
console.log(Number('1'));                   // 1
console.log(Number('+1'));                  // 1
console.log(Number('-1'));                  // -1
console.log(Number('01'));                  // 1
console.log(Number(' 1'));                  // 1
console.log(Number('1.0001'));              // 1.0001
// 十六进制字符串将转换为十进制
console.log(Number('0xdeadbeef'));          // 3735928559
// 空字符串返回0
console.log(Number(''));                    // 0
// 其他情况均返回NaN
console.log(Number('abc'));                 // NaN

// 对象规则
// 首先调用对象的valueOf方法，如果其返回值为NaN，则尝试调用其toString方法，并按照字符串规则转换
console.log(Number({
    valueOf() {
        return 10;
    }
}));                                              // 10
console.log(Number({
    toString() {
        return '20';
    }
}));                                              // 20
console.log(Number({}));                    // NaN