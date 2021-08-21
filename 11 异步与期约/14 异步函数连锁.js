// 异步函数和期约一样可以连锁调用
// asyncPrint可以接收thenable和非thenable对象
let asyncPrint = async (msg) => {
    // 尝试解包并打印该对象
    console.log(await msg);
    // 返回Promise.resolve包装的msg
    return msg;
}

asyncPrint(1)
    .then(asyncPrint)
    .then(asyncPrint)
    .then(asyncPrint)
    .then(asyncPrint)
    .then(asyncPrint)
;