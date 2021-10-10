class Animal {
    static type = 'Animal';

    static sayType() {
        console.log(this.type);
    }
}

class Human extends Animal {
    constructor(name) {
        // 必须调用基类构造函数，并位于作用域顶端
        super();

        this.name = name;
    }

    type = 'Human';
}

console.log(new Human('Steven').type);      // Human