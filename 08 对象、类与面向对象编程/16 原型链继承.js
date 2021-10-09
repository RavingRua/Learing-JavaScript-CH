function Base() {
    this.name = 'Base';
}

function Derived() {
    this.name = 'Derived';
}

// 继承
Derived.prototype = new Base();
// 发生了什么
// 1. 创建了一个Base类型对象（base）
// 2. base的原型指向了Base的原型，即Object的原型
// 3. Base函数体中的this指向base，挂载实例成员
// 4. Derived的原型被指定为base，因此Derived实例化的对象将拥有和Base一样的实例成员和原型

let b = new Base();
let d = new Derived();
console.log(b.name);            // Base
console.log(d.name);            // Derived