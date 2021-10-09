let obj = {
    name: 'obj',
    value: 10,
    say() {},
    [Symbol('private')]: 'private'
}

Object.defineProperty(obj, '_value', {
    value: 20,
    enumerable: false
});

console.log(Object.entries(obj));        // [ [ 'name', 'obj' ], [ 'value', 10 ], [ 'say', [Function: say] ] ]