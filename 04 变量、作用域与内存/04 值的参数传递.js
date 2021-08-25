// 值的参数传递始终是值传递
let fun = (arg) => {
    if (typeof arg === 'number') arg **= 2;
    else arg.value **= 2;
};

let num = 10;
let obj = {value: 20};

fun(num);               // 复制值
console.log(num);           // 10

fun(obj);               // 复制指针
console.log(obj.value);     // 400

fun(obj.value);         // 复制值
console.log(obj.value);     // 400