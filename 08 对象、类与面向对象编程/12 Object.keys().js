let obj1 = {
    name: 'obj1',
    value: 10
}

Object.defineProperty(obj1, '_value', {
    enumerable: false
})

let obj2 = Object.create(obj1);
obj2.name = 'obj2';
obj2.say = () => console.log('obj2');
Object.defineProperty(obj2, '__value', {
    enumerable: false,
    value: 20
});
console.log(Object.keys(obj2));                 // [ 'name', 'say' ]