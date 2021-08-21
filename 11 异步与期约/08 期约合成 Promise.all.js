// 将多个期约组合成一个期约称为期约合成
// Promise有两个静态方法all和race，用于合并多个期约，两者的行为和状态取决于内部期约的行为和状态

// Promise.all创建的期约对象在内部期约全部解决之后再解决，方法接收一个数组或可迭代对象
// 数组内的期约同时执行，而不是按照顺序
// 成功的合成期约的解决值value是包含所有内部期约结果的数组
let ps1 = Promise.all([
    new Promise(resolve => {
        setTimeout(() => {
            console.log('p1 resolved');
            resolve(1);
        }, 1000);
    }),
    new Promise(resolve => {
        setTimeout(() => {
            console.log('p2 resolved');
            resolve(2);
        }, 100);
    }),
    new Promise(resolve => {
        setTimeout(() => {
            console.log('p3 resolved');
            resolve(3);
        }, 10);
    })
]);

// p3 resolved
// p2 resolved
// p1 resolved

ps1.then(value => {
    console.log(value);             // [ 1, 2, 3 ]
});

// 如果内部有期约被拒绝，则第一个被拒绝的期约理由会成为合成期约的拒绝理由
// 其他期约内部的错误则会被静默处理，不用调用其catch方法
let ps2 = Promise.all([
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('p1 rejected');
            reject(1);
        }, 1000);
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('p2 rejected');
            reject(2);
        }, 2000);
    }),
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('p3 rejected');
            reject(3);
        }, 10);
    })
]).catch(reason => {
    console.error(reason);          // 3
});

// p3 rejected
// p1 rejected
// p2 rejected