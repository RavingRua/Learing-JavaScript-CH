// 代理是目标对象的抽象，不具有目标对象的具体内容和定义，但是可以访问目标对象的属性和方法
// 代理的作用是在各种对目标对象操作执行前，对这些操作加以控制，类似钩子
// Proxy类的构造函数接收两个参数，分别为目标对象target和处理程序对象handler
let obj = {name: 'obj'};
let proxy = new Proxy(obj, {});

console.log(proxy.name);
console.log(obj.name);

// 对代理对象的操作同样会影响目标
proxy.name = 'proxy obj';
console.log(proxy.name);
console.log(obj.name);

// 调用代理的方法最终会映射到目标上
console.log(proxy.hasOwnProperty('name'));

// Proxy类没有原型，因此不能用作instanceof的参数
try {
    console.log(proxy instanceof Proxy);
} catch (e) {
    console.error(e.name);
}

// 利用严格相等运算符区分目标和代理
console.log(obj === proxy);         // false