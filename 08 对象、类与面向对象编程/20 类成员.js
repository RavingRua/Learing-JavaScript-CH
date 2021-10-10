class Animal {
    constructor() {
        // 实例成员
        this.cry = function () {
        }

    }

    // 实例成员
    name;

    eat() {
    }

    // 静态成员
    static type = 'Animal';

    // 私有成员
    #_instanceCount;

    // 访问器
    get instanceCount() {
        return this.#_instanceCount;
    }

    set instanceCount(v) {
        this.#_instanceCount = v;
    }
}

// 可迭代类
class Iterable {
    item = [1, 2, 3, 4, 5, 6];

    // 生成器方法
    * createNumberIterator() {
        yield* this.item;
    }

    // 实现默认迭代方法
    [Symbol.iterator]() {
        return this.item.values();
    }
}

let iter = new Iterable();

for (let v of iter.createNumberIterator()) {
    console.log(v);             // 1,2,3,4,5,6
}

for (let v of iter) {
    console.log(v);             // 1,2,3,4,5,6
}