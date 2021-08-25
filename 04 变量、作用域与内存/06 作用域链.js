// 作用域链
{
    // 链首
    let val1 = 1;
    let name = '1';
    {
        let val2 = 2;
        let name = '2';
        {
            // 链尾
            let val3 = 3;
            let name = '3';

            // 作用域链决定能访问的变量和函数以及访问顺序
            // 链尾变量对象可以访问之前所有变量对象内的函数和变量
            console.log(val1);      // 1
            console.log(val2);      // 2
            console.log(val3);      // 3
            // 如果遇到重名变量或函数，则按访问顺序，访问最近的重名变量或函数
            console.log(name);      // '3'
        }
    }
}