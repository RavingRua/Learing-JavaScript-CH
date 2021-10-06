const arr = ['foo', 'bar'];
const iter = arr.entries();             // 相当于调用[Symbol.iterator]

console.log(iter.next());               // { value: [ 0, 'foo' ], done: false }
console.log(iter.next());               // { value: [ 1, 'bar' ], done: false }
console.log(iter.next());               // { value: undefined, done: true }