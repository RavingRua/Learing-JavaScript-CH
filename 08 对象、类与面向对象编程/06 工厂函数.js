const createPerson = (name, age) => {
    const p = {
        name,
        age
    };

    // 注意this指向
    p.sayHello = function () {
        console.log(this.name);
    }

    return p;
};

let steven = createPerson('Steven', 20);
steven.sayHello();                      // Steven
console.log(typeof steven);             // object