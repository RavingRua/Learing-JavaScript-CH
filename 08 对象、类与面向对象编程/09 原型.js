function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 函数原型上挂载的方法中的this指向函数，这个this在调用构造函数时会被重新指向新创建的对象
Person.prototype.sayHello = function () {
    console.log(this.name);
}

const steven = new Person('Steven', 20);
const bob = new Person('Bob', 18);
steven.sayHello();                                      // Steven
bob.sayHello();                                         // Bob
console.log(steven.sayHello === bob.sayHello);          // true

console.log(Person.isPrototypeOf(bob));              // false
console.log(Person.prototype.isPrototypeOf(bob));    // true

console.log(Object.getPrototypeOf(steven) === Person.prototype);        // true
console.log(Object.getPrototypeOf(steven).sayHello);                    // Function

// 重写原型
let obj1 = {
    name: 'obj1'
}
let obj2 = {
    value: 10
}

Object.setPrototypeOf(obj1, obj2);
console.log(Object.getPrototypeOf(obj1));           // { value: 10 }，obj2成为了一个原型对象

// 指定原型创建对象
let normalObj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(normalObj) === Object.prototype);     // true
let nullObj = Object.create(null);
console.log(Object.getPrototypeOf(nullObj));                            // null
let person = Object.create(Person.prototype);                              // 相当于调用构造函数
console.log(Person.prototype.isPrototypeOf(person));                    // true