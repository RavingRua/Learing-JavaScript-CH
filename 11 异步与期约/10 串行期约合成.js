// 为了避免代码冗余，可以封装具有相同行为的连锁期约调用，让函数返回一个期约对象
let addPromise = (value) => {
    return new Promise(resolve => {
        resolve(value);
    });
}

// 链式调用函数
addPromise(1).then(value => {
    console.log(value);                 // 1

    // 返回函数的执行结果
    return addPromise(2);
}).then(value => {
    console.log(value);                 // 2

    return addPromise(3);
}).then(value => {
    console.log(value);                 // 3
});