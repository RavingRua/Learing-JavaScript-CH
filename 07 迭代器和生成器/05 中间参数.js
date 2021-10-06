function* Generator() {
    console.log(yield 1);
    console.log(yield 2);
    console.log(yield 3);
}

const gen = Generator();
gen.next('init', 0);
gen.next('one', 1);        // one
gen.next('two', 2);        // two
gen.next('three', 3);      // three