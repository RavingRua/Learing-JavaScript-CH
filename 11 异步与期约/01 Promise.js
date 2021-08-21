// Promise是ES6中新增特性之一，是CommonJS的Promise A+规范的最终实现结果
// Promise类通过new实例化，传入一个执行器executor函数，该回调函数包含两个参数
// resolve：执行器内部逻辑成功时调用，接收参数作为成功结果
// reject：执行器内部逻辑失败时调用，接收参数作为失败结果

// executor是立即执行的，执行后Promise将进入待定状态pending
let p1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('resolved');
    }, 100);
});

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('rejected');
    }, 100);
});

// 状态为待定pending
console.log(p1);             // Promise { <pending> }
console.log(p2);             // Promise { <pending> }

// 在待定状态下，期约可以落定为履行fulfilled或拒绝rejected状态
setTimeout(() => {
    console.log(p1);         // Promise {<fulfilled>: "resolved"}
    console.log(p2);         // Promise {<rejected>: "rejected"}
}, 1000);

// 期约实际上是一个状态机，通过调用其方法改变内部私有状态
// 期约的状态是私有的，不能在外部被检测和更改，唯一方式是通过期约自己的成员获取状态和执行结果，避免将异步作同步处理
// 如果执行成功，期约会有一个私有值value，该值由期约对象的then方法传递给其回调
p1.then(value => {
    console.log(value);
});

// 如果执行失败，期约会有一个私有理由reason，该理由由期约对象的catch传递给回调
// 执行失败的期约必须调用catch方法，否则运行环境会抛出一个Promise内部错误，且无法查看原因
// 期约内部错误是通过异步消息队列处理的，同步执行栈中的try/catch无法捕获其错误
p2.catch(reason => {
    console.error(reason);
});