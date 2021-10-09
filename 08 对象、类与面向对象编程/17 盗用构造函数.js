function Base(name) {
    this.name = name;
    this.type = 'Base';
}

function Derived(name) {
    // 改变Base函数体内部this指向
    Base.call(this, name);
    this.type = 'Derived';
}

let obj = new Derived('obj');
console.log(obj.name);                  // obj

console.log(obj instanceof Base);       // false