const a = {
    name: 'a',
    a: 'a',
    obj: {
        name: 'a obj'
    }
}

const b = {
    name: 'b',
    b: 'b',
    obj: {
        name: 'b obj'
    }
}

Object.assign(a, b);

console.log(a);                         // { name: 'b', a: 'a', obj: { name: 'b obj' }, b: 'b' }
b.b = 'B';
b.obj.name = 'B OBJ';
console.log(a);                         // { name: 'b', a: 'a', obj: { name: 'B OBJ' }, b: 'b' }

