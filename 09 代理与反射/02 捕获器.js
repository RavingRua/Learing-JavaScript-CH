// 捕获器trap是目标对象基本操作的拦截器，每种捕获器对应一种操作，不会出现重复捕获情况
let obj = {
    name: 'obj',
    type: 'Object'
}

let proxy = new Proxy(obj, {
    // 对代理执行get操作，被处理程序对象handler的捕获器get拦截
    // get捕获器会接收三个参数，目标对象、被查询的属性键值（一般为string）和代理对象
    get(trapTarget, property, receiver) {
        console.log(typeof property);       // string
        return trapTarget[property] += '[handled]';
    }
})

console.log(obj.name);                      // obj
console.log(obj.type)                       // Object
console.log(proxy.name);                    // obj[handled]
console.log(proxy.type);                    // Object[handled]