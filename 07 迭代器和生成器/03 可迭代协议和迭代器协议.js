class Foo {
    // 可迭代对象必须实现该方法
    [Symbol.iterator]() {
        // 必须返回一个迭代器
        return {
            // 迭代器必须实现该方法
            next() {
                // 必须返回一个IteratorResult
                return {done: true, value: undefined};
            }
        }
    }
}

// 由于第一次迭代就返回true，因此什么都不会打印
// 如果没有实现迭代器协议内容，会抛出错误
for (let i of new Foo()) {
    console.log(i);
}

class Bar {
    count = 0;

    [Symbol.iterator]() {
        return {
            next: () => {
                this.count++;
                return this.count <= 3 ? {done: false, value: this.count} : {done: true, value: undefined}
            },
            return: () => {
                console.log('exiting early');
                return {done: true, value: undefined};
            }
        }
    }
}

for (let i of new Bar()) {
    console.log(i);
    // 1
    // 2
    // 3
}

for (let i of new Bar()) {
    console.log(i);
    break;
    // 1
    // exiting early
}

const bar = new Bar();

for (let i of bar) {
    console.log(i);
    break;
    // 1
    // exiting early
}

for (let i of bar) {
    console.log(i);
    // 2
    // 3
}