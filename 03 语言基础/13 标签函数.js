let tagFunction = (strings, ...expression) => {
    console.log(strings);                               // [ '', ' + ', ' = ', '' ]
    expression.forEach(value => console.log(value));
    // 1
    // 2
    // 3

    return 'template';
}

const a = 1;
const b = 2;

// 使用标签函数时，直接在函数名后接上模板字面量
console.log(tagFunction`${a} + ${b} = ${a + b}`);       // template

// 使用String.raw可以获取模板字面量的原内容
console.log(String.raw`${a} + ${b} = ${a + b}`);        // 1 + 2 = 3
console.log(`\u00a9`);                                  // ©
console.log(String.raw`\u00a9`);                        // \u00a9

function raw(strings, ...expression) {
    console.log(strings.raw);                           // [ '\\u00aa' ]
}

console.log(`\u00aa`);                                  // ª
raw`\u00aa`;