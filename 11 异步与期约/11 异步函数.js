// 异步函数是ES8内容之一，使用async关键字声明，返回一个被期约包装的值
// 异步函数期待一个实现thenable接口的对象（如Promise），如果是非thenable的对象则使用Promise.resolve包装这个对象
let af1 = async () => {
    console.log(1);
    return 0;
}

// 异步函数内部具有异步特征，但在总体上和其他外部代码是同步的
af1().then(console.log);
console.log(2);
// 1
// 2
// 0

// 异步函数返回的期约对象只负责处理异步函数内部抛出的错误和返回的期约，而不处理其他内部拒绝的期约
let af2 = async () => {
    // throw抛出的错误由异步函数返回的期约处理，函数在此时返回
    throw -1;
}

af2().catch(console.log);           // -1

let af3 = async () => {
    return Promise.reject(-2);
}

af3().catch(console.log);           // -2

let af4 = async () => {
    Promise.reject(-3);
}

af4().catch(console.log);           // UnhandledPromiseRejectionWarning: -3