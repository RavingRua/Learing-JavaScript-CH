function* Gen() {
    yield* [1, 2, 3, 4];
}

const gen = Gen();
console.log(gen.next());                    // { value: 1, done: false }
console.log(gen.return('ok'));          // { value: 'ok', done: true }
console.log(gen.next());                    // { value: undefined, done: true }
console.log(gen);                           // Gen {<closed>}