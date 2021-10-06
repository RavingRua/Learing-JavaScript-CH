function* Generator() {
    for (let i = 1; i <= 3; i++) {
        console.log(i);
        yield i;
    }
    return 'ok';
}

console.log(Generator().next());      // { value: 1, done: false }
console.log(Generator());             // gen {<suspended>}

const gen = Generator();
gen.next();                           // 1
gen.next();                           // 2
gen.next();                           // 3
console.log(gen.next());              // { value: 'ok', done: true }