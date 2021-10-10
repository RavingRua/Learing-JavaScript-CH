(function () {
    console.log(arguments.callee);      // Function (anonymous)
})();

function fun() {
    console.log(arguments.callee);      // Function: fun
}

fun();