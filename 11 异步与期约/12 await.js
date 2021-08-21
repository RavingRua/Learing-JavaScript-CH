// await只能用于异步函数内部，具有暂停后代码的作用
// await实际上是一个一元运算符，期待接收一个thenable对象
// await会尝试解包一个thenable对象，返回履行期约的value，使用throw抛出拒绝期约的reason
// 如果await接收的是非thenable对象，直接返回此对象（相当于履行期约的value）
(async function () {
    let p1 = new Promise(resolve => {
        resolve(0);
    });

    let p2 = new Promise((resolve, reject) => {
        reject(-1);
    });

    // await是一元运算符，可以单独使用，也可以在表达式内使用
    // 尝试解包p1
    console.log(await p1);
    // 尝试解包p2，遇到拒绝的reason并抛出，和throw一样会终止代码块后续代码的执行
    console.log(await p2);

    console.log('ok');      // 永远不会被打印，await暂停了内部代码执行，该语句只有在上一语句正常完成后才执行
})().catch(reason => {
    console.log(reason);
});

(async function () {
    // await会暂停内部代码执行，直到thenable能够被解包（落定）
    // 如果没有调用resolve，则await尝试解包的期约始终为待定状态，await后的代码永远不会执行
    await new Promise(resolve => {
        setTimeout(resolve, 1000, 2);
    });

    console.log('time out');
})().then(console.log);