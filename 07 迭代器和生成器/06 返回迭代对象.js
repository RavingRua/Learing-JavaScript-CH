function* Gen1() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}

function* Gen2() {
    yield 1;
    yield* [2, 3, 4];
    yield 5;
}
// 两者等价

const g1 = Gen1();
const g2 = Gen2();

for (const x of g1) {
    console.log(x);
}
// 1 2 3 4 5

for (const x of g2) {
    console.log(x);
}
// 1 2 3 4 5