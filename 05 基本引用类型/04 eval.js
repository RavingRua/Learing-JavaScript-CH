// 'use strict';

let msg = "hello world";
eval("console.log(msg)");           // "hello world"

try {
    eval("function sayHi() { console.log('hi'); }");
    sayHi();
} catch (e) {
    console.log(e.message);
}

try {
    eval("let msg1 = 'hello world';");
    console.log(msg1); // Reference Error: msg is not defined
} catch (e) {
    console.log(e.message);
}