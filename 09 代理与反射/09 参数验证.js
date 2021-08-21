// 利用捕获器进行函数参数类型和内容验证
let add = (a, b) => {
    return a + b;
}

let proxy = new Proxy(add, {
    apply(target, thisArg, argArray) {
        for (const arg of argArray) {
            if (typeof arg !== 'number') {
                throw new TypeError('arguments must be number');
            }
        }
        return Reflect.apply(...arguments);
    }
});

console.log(proxy(1, 2));
console.log(proxy({}, {}));