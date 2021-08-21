// 利用捕获器可以实现数据绑定，把运行过程中原本不关联的对象进行关联
let obj = {
    name: 'obj'
}

let nameRef = obj.name;
obj.name = 'vue';
console.log(obj.name);          // vue
console.log(nameRef);           // obj

let proxy = new Proxy(obj, {
    set(target, p, value, receiver) {
        nameRef = value;
        return Reflect.set(...arguments);
    }
});

proxy.name = 'react';
console.log(proxy.name);        // react
console.log(nameRef);           // react