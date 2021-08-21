// Promise.race返回一个新包装的期约对象，接收一个数组为参数
// 新的期约对象是所有内部期约中第一个达到履行或拒绝状态的期约
// 所有传入的内部期约都会被正常处理，无论第一个落定的期约是何种状态，都被合成期约返回
let ps1 = Promise.race([
    new Promise(resolve => {
        setTimeout(() => {
            console.log('p1 resolved');
            resolve(1);
        }, 100);
    }),
    new Promise(resolve => {
        setTimeout(() => {
            console.log('p2 resolved');
            resolve(2);
        }, 200);
    }),
    new Promise(resolve => {
        setTimeout(() => {
            console.log('p3 resolved');
            resolve(3);
        }, 10);
    })
]);

ps1.then(value => {
    console.log(value);
});

// 当内部期约被拒绝时，第一个被拒绝的期约会成为合成期约的返回值，并接收其拒绝理由，其他内部拒绝期约会被静默处理
let ps2 = Promise.all([
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('p1 rejected');
            reject(1);
        }, 1600);
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
        }, 1500);
    })
])

ps2.catch(reason => {
    console.error(reason);          // 3
});

// p3 rejected
// p1 rejected
// p2 rejected

setTimeout(() => {
    console.log(ps1);
    console.log(ps2);
}, 2100);

// Promise {<fulfilled>: 3}
// Promise {<rejected>: 3}