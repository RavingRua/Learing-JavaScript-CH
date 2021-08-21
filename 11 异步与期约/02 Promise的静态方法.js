// Promise.resolve用于生成一个解决的期约，Promise.reject用于生成一个失败的期约，两者可以将任何类型转为期约类型
let p = new Promise(resolve => {
    resolve('p');
});
let pRes = Promise.resolve('promise.resolve');
// 同样，reject方法生成的对象产生的错误不能由外部try catch块捕捉
let pRej = Promise.reject('promise.reject');

console.log(p);         // Promise {<fulfilled>: "p"}
console.log(pRes);      // Promise {<fulfilled>: "promise.resolve"}
console.log(pRej);      // Promise {<rejected>: "promise.reject"}