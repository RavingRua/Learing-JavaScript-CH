// parseInt
console.log(parseInt(1));               // 1
console.log(parseInt(1.00001));         // 1
console.log(parseInt('1'));             // 1
console.log(parseInt('1.00001'));       // 1
console.log(parseInt('     -1'));       // -1
console.log(parseInt('1b'));            // 1
console.log(parseInt('aa', 16));  // 170
console.log(parseInt(''));              // NaN
console.log(parseInt('abc'));           // NaN

// parseFloat
console.log(parseFloat(1));         // 1
console.log(parseFloat(1.00001));   // 1.00001
console.log(parseFloat('1'));       // 1
console.log(parseFloat('01'));      // 1
console.log(parseFloat('1.00001')); // 1.00001
console.log(parseFloat('0xaa'));    // 0
console.log(parseFloat('1.2.3'));   // 1.2
console.log(parseFloat('1.00'));    // 1