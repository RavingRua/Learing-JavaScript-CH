// 反射Reflect是一个JavaScript全局对象，内部有各种与代理捕获器同名和同函数原型的方法，封装了对象的原始行为
// 利用反射，可以不用手动在捕获器中重现对象的方法，Proxy一般配合Reflect一起使用
let obj = {
    foo: 'foo',
    bar: 'bar'
}

let proxy = new Proxy(obj, {
    get(target, prop, proxy) {
        // 反射对象的方法拥有和捕获器同样的函数原型，因此可以直接传入相同的参数
        // return Reflect.get(...arguments);

        // 对返回值进行处理
        return Reflect.get(...arguments) + '[from proxy]';
    }
})

console.log(proxy.foo);     // foo[from proxy]
console.log(obj.foo);       // foo

// 如果要获取一个没有自定义捕获器的代理，可以直接传入Reflect
let noDecorationProxy = new Proxy(obj, Reflect);
console.log(noDecorationProxy.foo);