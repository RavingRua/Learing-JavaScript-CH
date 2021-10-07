// 普通函数中的this永远指向Global对象，而不是上下文
function f1() {
    console.log(this);          // Global
}

function f2() {
    (function () {
        console.log(this);      // 依旧是Global
    })()
}

f1();
f2();