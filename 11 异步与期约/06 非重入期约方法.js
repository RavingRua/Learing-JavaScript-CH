// 当期约状态机进入下一状态时，处理子程序会被放入消息队列，该过程称为“排期”
// 只有在当前执行栈中的任务执行完毕后，才会执行消息队列中的处理子程序，这一特性被称为“非重入 non-reentrancy”
// 类似的，每个处理子程序按照同步代码中的添加顺序在消息队列中依次执行
let p1 = new Promise((resolve, reject) => {
    resolve(0);
});

let p2 = new Promise((resolve, reject) => {
    reject(-1);
});

p1.then(value => {
    console.log(value);         // 3
});

console.log('add p1.then');     // 1

p2.catch(reason => {
    console.error(reason);      // 4
});

console.log('add p2.catch');    // 2