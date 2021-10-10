(function () {
    console.log(arguments);                         // [Arguments] { '0': 1, '1': 2, '2': 3 }
    console.log(typeof arguments);                  // object
    console.log(arguments instanceof Array);        // false
    console.log(Array.from(arguments));             // [ 1, 2, 3 ]
})(1, 2, 3);

((...rest) => {
    console.log(rest);                      // [ 1, 2, 3, 4 ]
    console.log(typeof rest);               // object
    console.log(rest instanceof Array);     // true
})(1, 2, 3, 4);