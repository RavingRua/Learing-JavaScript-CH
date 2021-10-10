function safeRecursionFib(n) {
    if (n < 2) {
        return n;
    }
    return arguments.callee(n - 1) + arguments.callee(n - 2);
}


// 基础框架
function optimizedRecursionFib(n) {
    return fibImpl(0, 1, n);
}

// 执行递归
function fibImpl(a, b, n) {
    if (n === 0) {
        return a;
    }
    return fibImpl(b, a + b, n - 1);
}

console.time('no optimization');
console.log(safeRecursionFib(30));                      // 832040
console.timeEnd('no optimization');     // no optimization: 56.503ms

console.time('optimization');
console.log(optimizedRecursionFib(30));                      // 832040
console.timeEnd('optimization');        // optimization: 0.215ms

console.time('optimization crazy');
console.log(optimizedRecursionFib(1000));                    // 4.346655768693743e+208
console.timeEnd('optimization crazy');  // optimization crazy: 0.183ms

console.time('optimization insane');
console.log(optimizedRecursionFib(8000));                    // Infinity
console.timeEnd('optimization insane');  // optimization insane: 2.339ms