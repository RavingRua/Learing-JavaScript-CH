// catch用于为一个期约添加onRejected拒绝处理子程序，实际上是一种语法糖
// 相当于then(undefined, onRejected)，两者的行为是相同的
let p = new Promise((resolve, reject) => {
    reject(-1);
});

// 为期约状态机添加错误处理子程序
p.catch(reason => {
    console.error(reason);
});