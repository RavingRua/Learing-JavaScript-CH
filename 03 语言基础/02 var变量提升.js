function f1() {
    var val = 10;
    console.log(val);       // 10
}

function f2() {
    val = 2;
    console.log(val);       // 2
    var val = 20;
    console.log(val);       // 20
}

function f3() {
    console.log(v);         // undefined，此处由于局部变量被提升，隐藏了同名的全局变量
    var v = 30;
}

function f4() {
    console.log(val);

    // let声明的变量不会被提升
    let val = 40;
}

v = 3;

f1();
f2();
f3();
f4();                       // ReferenceError: Cannot access 'val' before initialization