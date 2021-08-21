// Promise.prototype.finally用于添加onFinally子程序，该子程序不接收参数
// 该回调在期约转换为履行和拒绝状态时都会被执行，并且在onResolve和onRejected之后，但是无法获得其状态
let p1 = new Promise((resolve, reject) => {
    resolve(0);
});

let p2 = new Promise((resolve, reject) => {
    reject(-1);
});

p1.then(value => {
    console.log(value);
});

p1.finally(() => {
    console.log('on p1 finally');
});

p2.catch(reason => {
    console.error(reason);
});

// finally将会原样返回一个Promise，如果返回了一个rejected的Promise需要再次处理错误
p2.finally(() => {
    console.log('on p2 finally');
}).catch(reason => {
});