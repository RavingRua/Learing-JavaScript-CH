const s = new Set([
    // 原始值重复会被剔除
    1, 1, 2, 3,
    // 对象都是独一无二的，因此是不同的引用类型值
    {v: 1},
    {v: 1},
    {v: 2},
    {v: 3},
]);

console.log(s);             // Set(7) { 1, 2, 3, { v: 1 }, { v: 1 }, { v: 2 }, { v: 3 } }

const set = new Set();
set.add(1)
    .add(2)
    .add(3)
    .add({v: 1});
console.log(set.has(1));            // true
console.log(set.has({v: 1}));       // false
set.delete(1);
set.delete({v: 1});
console.log(set);                         // Set(3) { 2, 3, { v: 1 } }

for (const key of set.keys()) {
    console.log(key);
    // 2
    // 3
    // { v: 1 }
}

for (const value of set.values()) {
    console.log(value);
    // 2
    // 3
    // { v: 1 }
}

for (const item of set.entries()) {
    console.log(item);
    // [ 2, 2 ]
    // [ 3, 3 ]
    // [ { v: 1 }, { v: 1 } ]
}

set.forEach((value, value2, set) => console.log(value === value2));
// true
// true
// true
