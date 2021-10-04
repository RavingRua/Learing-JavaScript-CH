const m1 = new Map([
    ['key1', 'value'],
    // 出现重复键时新值覆盖旧值
    ['key1', 'value1'],
    ['key2', 'value2'],
    ['key3', 'value3'],
]);

console.log(m1);            // Map(3) { 'key1' => 'value1', 'key2' => 'value2', 'key3' => 'value3' }

const m2 = new Map({
    [Symbol.iterator]: function* () {
        for (let i = 1; i <= 3; i++) {
            yield [`key${i}`, `value${i}`];
        }
    }
});

console.log(m2);            // Map(3) { 'key1' => 'value1', 'key2' => 'value2', 'key3' => 'value3' }

const m3 = new Map();
m3.set('key1', 'value1')
    .set('key2', 'value3')
    .set('key3', 'value3');
console.log(m3.has('key'));         // false
console.log(m3.has('key1'));        // true
console.log(m3.get('key'));             // undefined
console.log(m3.get('key1'));            // 'value1'

m3.delete('key1');
console.log(m3);                        // Map(2) { 'key2' => 'value3', 'key3' => 'value3' }
m3.clear();
console.log(m3);                        // Map(0) {}

const map = new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
    ['key3', 'value3'],
]);

const iter = map.entries();
console.log(iter.next());       // { value: [ 'key1', 'value1' ], done: false }
console.log(iter.next());       // { value: [ 'key2', 'value2' ], done: false }
console.log(iter.next());       // { value: [ 'key3', 'value3' ], done: false }
console.log(iter.next());       // { value: undefined, done: true }

for (let iter of map.entries()) {
    console.log(iter);
    // [ 'key1', 'value1' ]
    // [ 'key2', 'value2' ]
    // [ 'key3', 'value3' ]
}

map.forEach((value, key, map) => console.log(value));
// value1
// value2
// value3

for (let key of map.keys()) {
    console.log(key);
}

for (let value of map.values()) {
    console.log(value);
}

