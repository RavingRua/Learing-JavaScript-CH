((a = 0, b = 0) => {
    console.log(a + b);
})(1);

((a, b = a) => {
    console.log(a + b);
})(1);