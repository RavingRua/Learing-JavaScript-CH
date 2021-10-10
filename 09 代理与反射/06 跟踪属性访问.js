// 利用捕获器可以跟踪对对象的属性访问
let obj = {name: 'obj', proxyVisitedTimes: 0};

let proxy = new Proxy(obj, {
    get(target) {
        target.proxyVisitedTimes++;
        return Reflect.get(...arguments);
    }
});

console.log(proxy.name);
console.log(obj.proxyVisitedTimes);