let obj = {name: 'obj'};

// 可撤销代理是一种可以解除代理对象与目标对象联系的代理，使用revocable方法创建
// 该方法返回一个对象，包含生成的代理对象和一个撤销函数
let proxy = Proxy.revocable(obj, Reflect);
console.log(proxy.proxy['name']);

// 撤销后不可再次访问代理对象
proxy.revoke();
console.log(proxy);