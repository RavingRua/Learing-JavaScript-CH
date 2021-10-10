function f1() {
    f2();
}

function f2() {
    console.log(f2.caller);         // Function: f1
}

f1();