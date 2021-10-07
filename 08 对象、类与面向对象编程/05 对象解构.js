let obj = {
    name: 'obj',
    value: 10
};

let {name /*模式*/: objName /*变量*/, value} = obj;
console.log(objName);
console.log(value);

let obj1 = {
    name: 'obj1'
};
let obj2 = {};
let {name: name1} = obj1;
let {name: name2 = 'obj2'} = obj2;
console.log(name1);
console.log(name2);

let {length} = 'string';
console.log(length);                    // 6

let {constructor: c} = 4;
console.log(c === Number);              // true

({name: objName} = obj);

const obj3 = {
    v: {value: 10}
}

let {v, v: {value: vv}} = obj3;
obj3.v.value = 20;
console.log(vv);                        // 10
console.log(v);                         // { value: 20 }

const fun = ({name}) => console.log(name);
fun(obj);                       // obj
