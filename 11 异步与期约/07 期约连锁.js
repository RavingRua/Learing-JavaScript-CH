// 每个期约方法都会返回一个新的期约，因此可以将一串期约拼接而成，组成一条期约链
// 该方式称为期约连锁
let p = new Promise((resolve, reject) => {
    resolve('p');
});

p.then(value => {
    console.log(value);

    // 返回一个新的期约对象
    return new Promise((resolve, reject) => {
        reject('p2');
    });
}).catch(reason => {
    console.error(reason);

    return new Promise(resolve => {
        resolve('p3');
    });
}).then(value => {
    console.log(value);
});

// p
// p2
// p3