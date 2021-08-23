// 创建一个符号
let sym1 = Symbol();
console.log(sym1);                      // Symbol()

// 使用一个字符串来描述一个符号，描述与符号的定义和标识无关
let sym2 = Symbol('sym2');
console.log(sym2);                      // Symbol(sym2)

// Symbol不是一个构造函数，因此无法像其他类型一样通过new创建一个用对应类型对象包裹的对象
// Symbol也没有字面量语法，无法直接使用.操作符和[]操作符访问

// 使用Symbol的for方法注册一个全局符号，接收一个字符串作为符号的键，该键同样是该符号的描述
// 如果不传入参数，则键为"undefined"
// for方法对每个键执行幂等操作，如果该键没有注册，则在全局创建一个符号
let globalSym1 = Symbol.for('global1');
// 如果该键已经注册，则返回符号
let globalSym2 = Symbol.for('global1');
console.log(globalSym1);                // Symbol(global1)
console.log(globalSym2);                // Symbol(global1)
console.log(globalSym1 === globalSym2); // true

let globalSym3 = Symbol.for();
console.log(globalSym3);                // Symbol(undefined)

// 使用Symbol的keyFor方法查询一个符号对应的键，该方法参数只接收符号类型
console.log(Symbol.keyFor(globalSym1));     // 'global1'
console.log(Symbol.keyFor(globalSym2));     // 'global1'
console.log(Symbol.keyFor(globalSym3));     // 'undefined'
console.log(Symbol.keyFor(sym1));           // undefined

