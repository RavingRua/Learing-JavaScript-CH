// 可以使用捕获器在为属性赋值前进行类型和内容检查
let obj = {
    num: String
}

let proxy = new Proxy(obj, {
    set(target, p, value, receiver) {
        if (p === 'num') {
            if (typeof value !== 'number') {
                throw new TypeError('must be number');
            } else {
                return Reflect.set(...arguments);
            }
        } else {
            return Reflect.set(...arguments);
        }
    }
});

proxy.num = '1';