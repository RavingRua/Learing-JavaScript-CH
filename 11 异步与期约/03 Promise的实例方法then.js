// Promise.prototype.then是为期约添加子处理程序的接口，实际可以接收两个参数
// onResolved：进入兑现状态时执行的回调
// onRejected：进入拒绝状态时执行的回调
// 非函数类型的参数会被then静默忽略
let p1 = new Promise((resolve, reject) => {
    resolve('p1');
});
let p2 = new Promise((resolve, reject) => {
    reject('p2');
});

p1.then(value => {
    console.log(value);
});

p2.then(undefined, reason => {
    console.error(reason);
});

// then方法会返回一个新的Promise对象，可以定义onResolved手动返回，返回值可以是任意类型和Promise
// 如果返回一个非Promise类型对象，该对象最终也会被Promise.resolve方法包装
let p1r = p1.then(value => {
    return 0;
});
setTimeout(() => {
    console.log(p1r);
}, 0);

// 如果没有显式的返回，Promise.resolve会再次包装一遍原Promise对象并返回
// 同样，onRejected也会返回一个Promise，并且应当返回一个履行的期约，这样符合期约应有的行为
let p2r = p2.then(undefined, value => {
    return -1;
});
setTimeout(() => {
    console.log(p2r);
}, 0);

// 如果没有错误处理子程序onRejected，该Promise对象会原样向后传递，如果没有被捕获则抛出异常