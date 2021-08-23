// undefined实际上是null的派生类
console.log(undefined == null);             // true
console.log(undefined === null);            // false

// undefined用于标识一个变量尚未初始化
let val = undefined;

// null用于标识一个标识符指向空对象，在将来将会接收一个对象
let obj = null;