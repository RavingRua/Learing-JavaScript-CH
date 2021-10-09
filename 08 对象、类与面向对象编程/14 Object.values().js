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

console.log(Object.values(obj));        // [ 'obj', 10, [Function: say] ]