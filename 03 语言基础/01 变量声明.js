{
    // 声明一个全局变量，可以在任意作用域中被访问
    msg = 'msg';

    // var 声明一个局部变量，只能在其函数作用域中被访问
    function fun() {
        var value1 = 10;
    }

    var value2 = 20

    // let 声明一个变量，只能在定义其的代码块内访问
    let value3 = 30;
}

console.log(value2);
console.log(msg);