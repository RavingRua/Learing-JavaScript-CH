// 异步函数的执行与外部代码是同步执行的，但是外部代码不会等待异步函数内代码全部执行完毕才执行
// 如果异步函数内部出现await，则会暂停异步函数内部代码的执行
// 执行顺序：
// 1. async内部的同步代码与外部同步代码按次序执行
// 2. 内部await运算语句执行
// 3. 异步函数返回的期约执行onResolved或onRejected
let af = async () => {
    console.log('foo');                                                             // 1
    // noinspection ES6RedundantAwait
    console.log(await Promise.resolve('bar'));                                // 3
    // noinspection ES6RedundantAwait
    console.log(await Promise.resolve('baz'));                                // 5
    console.log('foobar')                                                           // 6
    return 'qux';                                                                   // 7
}

af().then(console.log);
Promise.resolve('bruh').then(console.log);                                    // 4
console.log('promise');                                                             // 2

// 上方代码执行过程
// 1. 执行af并添加onResolved处理程序
// 2. 在af内部先打印foo，随后遇到await语句，将await语句放入消息队列，跳出af
// 消息队列：[打印bar]
// 3. 执行外部同步语句，遇到履行期约并添加onResolved，由于是一个同步落定期约将打印加入消息队列
// 消息队列：[打印bar，打印bruh]
// 4. 遇到同步语句打印promise
// 同步代码全部执行完毕，执行消息队列内代码，返回异步函数内部，await解包接收的对象，打印bruh，并执行下一语句
// 消息队列：[打印bruh]
// 6. 遇到下一句await，将打印baz推入消息队列
// 消息队列：[打印bruh，打印baz]
// 7. 继续执行消息队列代码，打印bruh
// 消息队列：[打印baz]
// 8. 继续执行消息队列代码，返回异步函数内部，打印baz
// 消息队列：[]
// 9. 遇到同步语句，打印分隔线，函数返回
// 10. 返回履行期约，onResolved运行，打印qux