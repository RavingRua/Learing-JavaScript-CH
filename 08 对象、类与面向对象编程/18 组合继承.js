function Base(name = 'base') {
    this.name = name;
}

function Derived(name) {
    // 继承实例成员
    Base.call(this, name);
}

// 继承静态成员
Derived.prototype = new Base();

Base.prototype.say = function () {
    console.log(this.name);
};
Base.prototype.type = 'Base';

let obj = new Derived('obj');
console.log(obj.name);                  // obj
obj.say();                              // obj
console.log(obj.type);                  // Base

console.log(Object.getPrototypeOf(obj).name);   // base
console.log(obj.name);                             // obj