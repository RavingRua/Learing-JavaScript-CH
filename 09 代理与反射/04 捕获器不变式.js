let obj = {};
Object.defineProperty(obj, 'name', {
    writable: false,
    configurable: false,
    value: 'unwritable'
})

let proxy = new Proxy(obj, {
    get() {
        return Reflect.get(...arguments) + '[from proxy]';
    }
})

// 如果捕获器尝试改变一个不可配置和不可写的属性，会抛出TypeError
try {
    console.log(proxy.name);
} catch (e) {
    console.log(e.message);
}