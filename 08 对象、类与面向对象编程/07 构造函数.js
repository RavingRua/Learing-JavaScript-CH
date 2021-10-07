// 注意this指向，表达式中的this指向Global对象，因此不要尝试用lambda创建构造函数
// 构造函数中的this指向构造函数自身，而普通函数中的this也指向Global对象
function Person(name, age) {
    this.name = name ?? 'unknown';
    this.age = age ?? 0;
    this.sayHello = function () {
        console.log(this.name);
    }
}

// new
const steven = new Person('Steven', 20);
const anonymous = new Person();
steven.sayHello();                  // Steven
anonymous.sayHello();               // unknown
console.log(typeof steven);         // object

console.log(steven.constructor === Person);         // true
console.log(steven instanceof Person);              // true

console.log(steven.sayHello === anonymous.sayHello);        // false