// 通过代理访问可以隐藏一些属性
let obj = {name: 'obj'};

let proxy = new Proxy(obj, {
    get(target, prop) {
        if (prop === 'name') {
            return undefined;
        }
        return Reflect.get(...arguments);
    }
});

console.log(proxy.name);