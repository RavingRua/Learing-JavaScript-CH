# JavaScript

---

> 整理自 《Professional JavaScript for Web Developers》，原作者 Matt Frisibie。

## 01 什么是 JavaScript

## JavaScript实现

完整的JavaScript包括：

+ 核心（ECMAScript）
+ 文档对象模型（DOM）
+ 浏览器对象模型（BOM，在 Web 浏览器为 ECMAScript 的宿主环境时）

另外常见的 ECMAScript 宿主环境还有 NodeJS 和 Adobe Flash（已淘汰）。

### ECMAScript

ECMAScript 已经经历了多个版本标准的迭代，被设计为一种**平台无关**编程语言。

ECMAScript 定义了：

+ 语法
+ 类型
+ 语句
+ 关键字
+ 保留字
+ 操作符
+ 全局对象

#### 关于 ES6

ECMAScript 第六版，俗称 ES6、ES2015，于2015年6月发布，是有史以来最重要的一次 ES 特性增强，包括了类、模块（ES Module）、迭代器、生成器、箭头函数（Lambda表达式）、期约、反射、代理和众多数据类型。

#### ESNEXT

ECMAScript 标准还在不断完善中，截至 2021年6月22日，ECMA 已有12版标准。

### DOM

文档对象模型（DOM，Document Object Model）是一个应用编程接口（API），用于在 HTML 中使用拓展的 XML。DOM 会创建表示HTML文档的节点树，通过 ECMAScript 控制网页的内容和结构。

DOM 标准由万维网联盟（W3C，World Wide WebConsortium）制定。DOM 包括 DOM Core 和 DOM HTML：

+ DOM Core：提供映射 XML 文档、访问和操作文档任意节点的方式
+ DOM HTML：提供特定于 HTML 的对象和方法

支持 DOM 对于浏览器尝试而言是重中之重。

#### 其他 DOM

除了 DOM Core 和 HTML，其他的一些基于 XML 的语言也有属于自己的 DOM，以下语言同样是 W3C 推荐标准：

+ 可伸缩矢量图 SVG
+ 数学标记语言 MathML
+ 同步多媒体开发语言 SMIL

### BOM

浏览器会提供浏览器对象模型（BOM） API，用于支持访问和操作浏览器的窗口。与 ECMAScript 和 DOM 不同，BOM 没有相关标准。而 HTML5 的出现解决了这个问题，HTML5 以正式规范的形式涵盖了尽可能多的BOM 特性，目前各大浏览器的 BOM 实现细节正日趋一致。

> ECMAScript 核心
>
> DOM 提供与网页内容交互的方法和接口
>
> BOM 提供与浏览器交互的方法与接口

---

## 02 HTML 与 JavaScript

早期的 Web 标准并不统一，将 JavaScript 引入网页不应造成部分浏览器内容渲染错误。在 HTML 中使用 JavaScript 的方式逐渐形成了一种标准。

### script 标签

script 标签用于向网页中插入 JavaScript ，最早由 NetScape 创造并成为标准。常用属性：

+ src：脚本文件的URL，**可以跨域**
+ async：表示网页加载时立即下载脚本文件，**只对外部脚本有效**
+ crossorigin：配置 CORS（跨域资源共享），默认不使用
+ defer：将脚本的执行延迟到文档完全解析和显示后执行，**只对外部脚本有效**
+ integrity：用于验证 SRI（子资源完整性），可以确保 CDN（资源分发网络）不提供恶意内容
+ type：用于替代淘汰的 language 属性，当值为 type 时内部代码被视作 ES6 Module，可以使用 import 和 export 关键字

> script 标签可以跨域，因此在 CORS 出现前有一种跨域资源解决方案 JSONP，利用 script 标签的跨域特性来引入跨域资源。

#### script 导致的页面渲染阻塞

script 标签中的代码内容会**从上到下**被解释执行，并且在 script 标签中的内容被解释执行完前，浏览器不会渲染页面其余内容，这可能导致**页面内容渲染阻塞**。

因此，在原生开发中一般会将 script 标签放至 body 末尾，或在读取外部代码时启用 defer 属性（立即下载，但推迟执行）。

#### defer

defer 使外部链接的脚本在页面解析完后运行，HTML5 标准规定推迟执行的脚本在 DOMContentLoaded 事件之前运行。

#### async 

async 与defer 类型，但是不能保证链接的脚本按其链接顺序执行，顺序和资源加载顺序有关。

#### 动态加载脚本

利用 DOM API 可以动态加载脚本文件：

```js
const script = document.createElement('script');
script.src = 'js/例1.js';
script.async = false;           // 默认为true
document.head.appendChild(script);
```

这种加载方式对于浏览器预加载器来说不可见，因此可能导致性能问题。在文档头部显示声明来告知预加载器动态脚本的存在：

```html
<!-- 告知预加载器存在动态请求文件 -->
<link href="xxx" rel="prefetch">
```

### 内联和外部代码

直接在 script 标签中的代码为**内联代码**，src 属性外部链接引入的称为**外部代码**。对于可重用的代码，使用外部代码引入有几个好处：

+ **可维护性**：分散的 JavaScript 代码会导致维护困难
+ **缓存**：现代浏览器会缓存外部资源文件，外部链接代码只需读取一次，加载速度会更快

随着通信技术的发展，资源请求对 UX（用户体验）的影响显著减小，在 HTTP 2.0 中，将代码文件分开加载或置于一个大文件中加载的延迟近似。

### 文档模式

文档模式最早出现在 IE 浏览器中，用于让浏览器兼容标准。

```html	
<!DOCTYPE html>
```

### noscript

当浏览器不支持 JavaScript 或关闭了 JavaScript 功能时，noscript 标签内的内容将显示。

```html
<noscript>
      <strong>
          We're sorry but this page doesn't work properly without JavaScript enabled. Please enable it to continue.		</strong>
</noscript>
```

---

## 03 JavaScript 基础

任何语言都基于语法、操作符、数据类型、流程控制语句等内置功能工作。ECMAScript 标准定义了 JavaScript 的基础。JavaScript 很大程度上借鉴了 C 和类 C 语言。

### 语法

+ ECMAScript 区分大小写
+ 标识符必须由字母（解释器/编译器支持的编码类型，如UTF-8）、下划线、美元符开头，包含字母、下划线、美元符和数字
+ 注释采用 C 风格：

```js
// 单行注释
/*
	多行注释
*/
```

+ 严格模式：ES 5 标准提出了“严格模式”，通过在代码块中添加`"use strict";`开启，该语句实际上是解释器预处理语句
+ 一条 ES 语句以分号结尾，但也可以省略，省略时由解释器决定语句结尾位置（不推荐）
+ 代码块由花括号`{}`包裹

> 现代 IDE 支持解析一种新的 JavaScript 注释：JsDoc，这种新的文档注释类型能帮助程序员理解代码，尤其是接口部分。IDE 的代码分析器通常会根据文档注释进行代码提示和补全，并检测潜在错误。

### 关键字和保留字

关键字不能用作标识符和属性名，ES 6 的保留字有：

+ break 终止循环
+ do 和 while 一起使用，在每次循环前执行
+ in 判断对象是否为另一个对象成员，或用于循环语句中
+ typeof 判断类型，返回 String 类型值
+ case 用于 switch 语句中
+ else 用于判断
+ instanceof 判断某个实例对象是否为某个构造函数（类），返回 Boolean
+ var 声明变量（不建议使用）
+ catch 用于错误捕捉处理
+ export 模块导出
+ new 创建一个新的实例对象，并绑定 this 指针
+ void 执行语句，返回 undefined
+ class 用于声明类型（构造函数）
+ extends 继承
+ return 用于函数返回
+ while 循环
+ const 用于声明常量
+ finally 用于错误最终处理
+ super 指向基类
+ with 用于简化对象引用语句（不建议使用）
+ continue 用于进入下一循环
+ for 循环
+ switch 选择
+ yield 用于生成器返回
+ debugger 断点
+ function 声明函数对象
+ this 特殊指针
+ default 用于选择块中，或导出语句中
+ if 判断
+ throw 用于抛出错误
+ delete 用于删除对象成员
+ import 导入语句
+ try 用于异常处理语句

ES 6 同样为未来的标准设置了保留字（一些已实现）：

+ enum 枚举类型
+ implements 实现抽象类/接口
+ package 包
+ interface 接口
+ public 定义公有成员
+ protected 定义保护成员
+ private 定义私有成员
+ static 静态成员
+ let 用于声明变量
+ async 用于声明异步函数
+ await 用于异步函数中，解构 Promise

为了兼容和为未来标准作准备，不应使用保留字和关键字。

### 变量

#### 全局变量

不使用关键字直接声明的变量，可以在全局作用域中访问（不推荐）。

#### 局部变量

局部变量是由 var 或 let 声明的变量，两者在作用域和变量提升特性上不同。

##### var

var 声明一个函数的局部变量，在函数使用后即销毁。在其他代码块中声明的 var 变量可以被外部访问（不推荐）。

由 var 关键字声明的变量会进行声明**提升（hoist）**，所有的变量声明都会被解释器拉到函数作用域顶部（如果有初始化变量，则在语句原位置进行初始化，此前变量值为 undefined，直到初始化语句或变量被赋值），因此可以先使用，后声明（不推荐），这一操作可能会因为作用域不明导致未知错误：

##### let

let 声明一个代码块内的局部变量，不能被外部访问。**let 声明的变量不会被提升**，在 let 变量声明前的作用域区域被称为 “暂时性死区”，在 let 变量声明前调用该变量会抛出 ReferenceError。

此外，在浏览器中，全局作用域声明的 **let 变量不会像 var 一样成为 window 的属性**。

解释器会自动合并重复的 var 声明，而**重复的 let 声明会导致重定义错误**。

##### const

const 和 let 类似，区别是 const 声明的常量必须在声明时被初始化，且不能在之后更改其值。const 声明的变量是**顶层 const**，当其指向一个对象时，不能重新绑定一个对象到 const 对象上，但是可以改变对象的成员。尝试修改 const 变量将导致运行时错误。

### 数据类型

ECMAScript 有6种基本数据类型：

+ Undefined
+ Null
+ Boolean
+ Number
+ String
+ Symbol

和1种复杂数据类型：

+ Object

ES 中不能自定义数据类型（class实际上是构造函数的另一种写法），但是可以用这7种数据类型作多种数据类型使用。

#### typeof 关键字

typeof 关键字接收一个变量作参数，返回其类型的小写字符串。

```js
// 基本数据类型
console.log(typeof undefined);          // undefined
console.log(typeof null);               // object，实际上是Null类型，特殊值null会被操作符认为是空对象的引用
console.log(typeof Boolean());          // boolean
console.log(typeof Number());           // number
console.log(typeof String());           // string
console.log(typeof Symbol());           // symbol

// 复杂数据类型
console.log(typeof Object());           // object
console.log(typeof Function());         // function，严格意义上函数和其他的特殊对象应该属于Object
                                        // 但是为了区分返回各自类型值
```

#### Undefined

Undefined 于 ES 3 中提出，目的是与 Null 进行区分。对于没有初始化的变量，其类型和值都为 undefined，因此不必显示声明变量值为 undefined 。undefined 是一个**假值**。

undefined 实际上是 null 的派生类：

```js
// undefined实际上是null的派生类
console.log(undefined == null);             // true
console.log(undefined === null);            // false

// undefined用于标识一个变量尚未初始化
let val = undefined;

// null用于标识一个标识符指向空对象，在将来将会接收一个对象
let obj = null;
```

#### Null

Null 只有一个值，即特殊值 null。语义上，null 表示空对象指针，因此 typeof 将返回 "object"。**定义一个将来需要接收对象的标识符时，应该使用 null 而不是其他类型值**，通过检查其值是否为 null 即可判断该变量是否接收了一个对象。null 也是一个假值。

#### Boolean

布尔类型只有两个值，即 true 和 false，**其他任何值都不是 Boolean 类型**。在使用判断语句和转型函数时，其他数据类型会被转换成对应的布尔值。

+ 被转换为 true 的类型值称为**真值**（truthy），除假值以外的所有值都为真值
+ 被转换为 false 的类型值称为**假值**（falsy）， `false`、`0`、`""`（空字符串）、`null`、`undefined` 和 `NaN`为假值

```js
// 布尔类型只有两个值，即 true 和 false，其他任何值都不是 Boolean 类型
// 真值会被转换为true，假值被转换为false
console.log(true == 1);             // true
console.log(true === 1);            // false

// 以下均为假值
console.log(Boolean(0));
console.log(Boolean(''));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
```

#### Number

ECMAScript 中的 Number 类型用于标识整数和浮点数（双精度），其值的字面量可以是十进制，也可以是八进制（0o开头）和十六进制（0x开头）。

##### 浮点数

ECMAScript 会尽可能的将浮点数转化为整数，最高精度为**17**位小数。小数位后包含至少6个0的浮点数都会以科学记数法标识。

浮点数是不精确的：

```js
// 由于计算机内存中存储浮点数方式的原因，浮点数计算是不精确的
console.log((0.1 + 0.2) === 0.3);               // false
console.log(0.1 + 0.2);                         // 0.30000000000000004

// 比较浮点数
const EPSILON = 1e-17;
if (0.3 - (0.1 + 0.2) < EPSILON) console.log(true);
```

##### 值范围

全局对象 Number 中的两个属性记录了JavaScript 运行环境可以表示的最大与最小数值：

```js
// 全局Number对象有两个属性，记录了 JavaScript 运行环境中的最大和最小值范围
console.log(Number.MAX_VALUE);                  // 1.7976931348623157e+308  (NodeJS,Chromium)
console.log(Number.MIN_VALUE);                  // 5e-324                   (NodeJS,Chromium)
```

超出范围无法表示的值会被转为 Infinity：

```js
// 判断一个值是否无穷大
console.log(isFinite(1 / 0));           // false
console.log(isFinite(1e-17));           // true
```

##### NaN

NaN，Not a Number，任何本应返回数值的操作在失败后都将返回 NaN：

```js
// 特殊值 NaN，Not a Number，表示返回数值的操作失败
console.log(0 / -0);                            // NaN
console.log(1 / 'b');                           // NaN
```

NaN 是假值，不等于任何值，包括自身：

```js
// NaN不等于任何值，包括自身
console.log(NaN === NaN);                       // false
```

`isNaN()` 函数用于判断一个值是否为 NaN（如果值可以转换为数值，视作非 NaN）：

```js
// isNaN函数用于判断一个值是否为NaN
console.log(isNaN(1));                 // false
console.log(isNaN('1'));               // false
console.log(isNaN('a'));               // true
console.log(isNaN(NaN));               // true
console.log(isNaN(true));              // false
console.log(isNaN(false));             // false
```

##### 数值转换

Number()、parseInt() 和 parseFloat() 用于将值转换成 Number。

###### Number

转型函数，规则如下：

```js
// 转型函数Number，将一个值转为Number类型
console.log(Number(true));                  // 1
console.log(Number(false));                 // 0
console.log(Number(2));                     // 2，数值类型直接返回
console.log(Number(null));                  // 0
console.log(Number(undefined));             // NaN

// 字符串规则
// 包含数字的字符串会尝试转换为Number，忽略首位的0，计入正负号，返回十进制
console.log(Number('1'));                   // 1
console.log(Number('+1'));                  // 1
console.log(Number('-1'));                  // -1
console.log(Number('01'));                  // 1
console.log(Number(' 1'));                  // 1
console.log(Number('1.0001'));              // 1.0001
// 十六进制字符串将转换为十进制
console.log(Number('0xdeadbeef'));          // 3735928559
// 空字符串返回0
console.log(Number(''));                    // 0
// 其他情况均返回NaN
console.log(Number('abc'));                 // NaN

// 对象规则
// 首先调用对象的valueOf方法，如果其返回值为NaN，则尝试调用其toString方法，并按照字符串规则转换
console.log(Number({
    valueOf() {
        return 10;
    }
}));                                              // 10
console.log(Number({
    toString() {
        return '20';
    }
}));                                              // 20
console.log(Number({}));                    // NaN
```

###### parseInt

parseInt 用于将一个字符串转换为 Number 整数类型，相比转型函数更注重字符串是否包含数字模式。忽略字符串最前方的空格，**从第一个非空格开始转换**。如果第一个字符不是**数字或正负号**，就返回 NaN，之后一直检测下一个字符，直到结尾或非数字字符。该函数可以接收两个参数，第二个参数为数制。

parseInt 也可以接收非字符串类型（不推荐），并尝试调用 valueOf 和 toString 方法。

```js
console.log(parseInt(1));               // 1
console.log(parseInt(1.00001));         // 1
console.log(parseInt('1'));             // 1
console.log(parseInt('1.00001'));       // 1
console.log(parseInt('     -1'));       // -1
console.log(parseInt('1b'));            // 1
console.log(parseInt('aa', 16));  // 170
console.log(parseInt(''));              // NaN
console.log(parseInt('abc'));           // NaN
```

###### parseFloat

parseFloat 和 parseInt 类似，将字符串转为浮点数。从第一个出现的小数点开始记为小数位，直到字符串末尾或遇到非数字字符结束。如果尝试解析的结果不是浮点而是整数，则返回整数类型。

```js
console.log(parseFloat(1));         // 1
console.log(parseFloat(1.00001));   // 1.00001
console.log(parseFloat('1'));       // 1
console.log(parseFloat('01'));      // 1
console.log(parseFloat('1.00001')); // 1.00001
console.log(parseFloat('0xaa'));    // 0
console.log(parseFloat('1.2.3'));   // 1.2
console.log(parseFloat('1.00'));    // 1
```

#### String

ES 的 String类型用 `''`、`""`、` `` `表示，含义没有区别。

ECMAScript 中的字符串是**不可变的**（immutable），字符串一旦创建则不可更改，如果一个变量字符串，只有为其重新赋值才能改变值内容。

##### 字符字面量

String 类型包含一些字符字面量：

| 字面量 | 含义         |
| ------ | ------------ |
| \n     | 换行         |
| \t     | 制表位       |
| \b     | 退格         |
| \r     | 回车         |
| \f     | 换页         |
| \\     | 反斜杠       |
| \\'    | 引号         |
| \xnn   | 十六进制     |
| \unnnn | Unicode 字符 |

##### toString

大部分类型有 toString 方法，将值类型转换为 String 类型，null 和 undefined 则没有。Number 类型值的 toString 可以接收一个参数，表示转换的数制：

```js
console.log((10).toString());       // '10'
console.log((10).toString(2));      // '1010'
console.log((10).toString(8));      // '12'
console.log((10).toString(10));     // '10'
console.log((10).toString(16));     // 'a'
```

##### 转型函数

转型函数 String() 会调用接收参数的 toString 方法，如果接收 null 或 undefined 则返回字符串 'null' 或 'undefined' ：

```js
console.log(String(10));            // '10'
console.log(String({}));            // '[object Object]'
console.log(String(null));          // 'null'
console.log(String(undefined));     // 'undefined'
```

##### 模板字面量

模板字面量由 ES 6 标准提出，使用``` `表示，支持换行表示，并可以使用`${}`在内部插入 JavaScript 语句。

##### 标签函数

标签函数（tag function）本身是一种常规函数，可以接收一个模板字面量作为参数。模板字面量中的字符部分和插值语句结果会分别作参数传入函数：

```js
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
```

让标签函数返回模板字面量原内容：

```js
function zipTag(strings, ...expressions) {
    return strings[0] + expressions.map((e, i) => `${e}${strings[i + 1]}`).join('');
}
```

##### 获取原始的模板字面量

全局对象 String 的 raw 方法是一个标签函数，可以通过 raw 来获取一个模板字面量的原内容（转义字符，不包括执行前的 JavaScript 语句）：

```javascript
const a = 1;
const b = 2;

console.log(String.raw`${a} + ${b} = ${a + b}`);        // 1 + 2 = 3
console.log(`\u00a9`);                                  // ©
console.log(String.raw`\u00a9`);                        // \u00a9
```

标签函数的第一个参数（通常命名为 strings）是一个数组对象，其内部有一个 raw 属性，同样记录了模板字符串的原始内容：

```js
function raw(strings, ...expression) {
    console.log(strings.raw);                           // [ '\\u00aa' ]
}

console.log(`\u00aa`);                                  // ª
raw`\u00aa`;
```

#### Symbol

Symbol 符号类型是 ES 6 新增的基本类型，Symbol 是**唯一且不变**的，用作对象属性的**唯一标识符**。在 ES 6 之前，对象的属性标识符都是 String 类型，通过操作符`[]`或`.`来访问。如果对象属性键为局部的 Symbol ，在作用域外将无法访问该属性，类似于私有属性。但是可以通过`Object.getOwnPropertySymbols()`来获取所有对象的符号类型键数组，并从中获取符号。

```js
// 创建一个符号
let sym1 = Symbol();
console.log(sym1);                      // Symbol()

// 使用一个字符串来描述一个符号，描述与符号的定义和标识无关
let sym2 = Symbol('sym2');
console.log(sym2);                      // Symbol(sym2)
```

Symbol不是一个构造函数，因此无法像其他类型一样通过new创建一个用对应类型对象包裹的对象。Symbol也没有字面量语法，无法直接使用.操作符和[]操作符访问。

##### 全局符号

使用 Symbol 的 for 方法可以注册一个全局符号，传入一个字符串类型参数作为符号的键，同样作描述使用。非字符串类型的参数会被转换为字符串。如果没有传入参数，键为 undefined（String 类型的 'undefined'）：

```js
// 使用Symbol的for方法注册一个全局符号，接收一个字符串作为符号的键，该键同样是该符号的描述
// 如果不传入参数，则键为"undefined"
// for方法对每个键执行幂等操作，如果该键没有注册，则在全局创建一个符号
let globalSym1 = Symbol.for('global1');
// 如果该键已经注册，则返回该符号
let globalSym2 = Symbol.for('global1');
console.log(globalSym1);                // Symbol(global1)
console.log(globalSym2);                // Symbol(global1)
console.log(globalSym1 === globalSym2); // true
```

使用 Symbol 的 keyFor 方法来查询一个全局符号的键，如果查询的符号非全局符号返回 undefined（值为 Undefined 类型的 undefined），参数必须为符号，否则会抛出 TypeError：

```js
let globalSym1 = Symbol.for('global1');
let globalSym2 = Symbol.for('global1');
let globalSym3 = Symbol.for();
let sym1 = Symbol();

console.log(Symbol.keyFor(globalSym1));     // 'global1'
console.log(Symbol.keyFor(globalSym2));     // 'global1'
console.log(Symbol.keyFor(globalSym3));     // 'undefined'
console.log(Symbol.keyFor(sym1));           // undefined
```

##### 使用符号作对象属性标识符

在可以使用 Number 或 String 作属性标识符的地方都可以用 Symbol 代替，包括字面量属性和 `Object.definedProperty()`，访问该属性只能通过对应的 Symbol：

```js
const name = Symbol('name');
const value = Symbol('value');
const obj = {
    [name]: 'obj'
}
Object.defineProperty(obj, value, {value: 100});

console.log(obj);                               // {Symbol(name): "obj", Symbol(value): 100}
console.log(obj.name);                          // undefined
console.log(obj.value);                         // undefined
console.log(obj[name]);                         // obj
console.log(obj[value]);                        // 100
```

`Object.getOwnPropertyNames()`返回对象实例的常规属性数组，`Object.getOwnPropertySymbols()`返回对象实例的符号属性数组：

```js
console.log(Object.getOwnPropertyNames(obj));       // []
console.log(Object.getOwnPropertySymbols(obj));     // [ Symbol(name), Symbol(value) ]
```

`Object.getOwnPropertyDescriptors()`会返回同时包含常规和符号属性描述符的对象：

```js
console.log(Object.getOwnPropertyDescriptors(obj));
// {
//   [Symbol(name)]: {
//     value: 'obj',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   [Symbol(value)]: {
//     value: 100,
//     writable: false,
//     enumerable: false,
//     configurable: false
//   }
// }
```

`Reflect.ownKey()`会返回常规和符号类型键的数组：

```js
console.log(Reflect.ownKeys(obj));              // [ Symbol(name), Symbol(value) ]
```

遍历所有符号类型键来获取符号：

```js
let o = {
	[Symbol('foo')]: 'foo val',
	[Symbol('bar')]: 'bar val'
};

console.log(o);
// {Symbol(foo): "foo val", Symbol(bar): "bar val"}

let barSymbol = Object.getOwnPropertySymbols(o)
	.find((symbol) => symbol.toString().match(/bar/));

console.log(barSymbol);
// Symbol(bar)
```

##### 常用内置符号

常用内置符号（well-known symbol）用于暴露 ECMAScript 语言的内部行为，类似 C++ 和一些语言的运算符重载、成员函数重写。通过重写内置符号键的属性或方法，来**改变原生结构的行为**。使用常用内置符号作为键的成员一般是由 ES 操作符或内置对象的方法来调用的，无法直接调用。

#### Object

在 ECMAScript 中，Object（对象）类型是所有其他对象的基类。使用关键字`new`来创建一个对象：

```js
// 创建一个对象
let obj1 = new Object();

// 简化写法
let obj2 = {};
```

一些 Object 方法：

```js
// 创建一个对象
let obj1 = new Object();

// 定义对象属性
Object.defineProperties(obj1, {
    'name': {
        value: 'obj1',
    },
    'value': {
        value: 10
    }
});

// 简化写法
let obj2 = {
    name: 'obj2',
    value: 20
};

// 判断对象实例（非原型）上是否有给定属性
console.log(obj1.hasOwnProperty('name'));       // true

// 判断一个对象是否为另一个对象的原型
console.log(obj1.isPrototypeOf(obj1));          // false

// 判断对象的属性是否为可枚举的（用于for-in）
console.log(obj1.propertyIsEnumerable('name')); // false

// 返回对象的字符串表示
console.log((new Date()).toString());                       // 国际标准时间格式描述

// 返回对象的字符串表示，本地化显示
console.log((new Date()).toLocaleString());                 // 国家/地区标准时间格式描述

// 返回对象的Number、Boolean或String表示，一般和toString行为一致
console.log(obj1.valueOf());                                // {}
```

### 操作符

ECMAScript 定义了一组操作符，可用于各种类型的值。在对象上使用时，操作符一般会调用`valueOf`或`toString`来获取对象的值表示。

#### 递增/递减操作符

一元操作符`++`、`--`操作符可以用于任何类型，包括且不限于 Number，还可用于 String、Boolean、Object。

对于 Number，执行一般操作；

对于非 Number，如果可以被直接转换成 Number（调用 `toString()`或`valueOf()`），则先转换再运算，否则返回 NaN：

```js
// String
let str1 = '123';
let str2 = '123a';

console.log(++str1);        // 124
console.log(++str2);        // NaN

// Boolean
let flag1 = true;
let flag2 = false;

console.log(++flag1);       // 2
console.log(++flag2);       // 1

// Object
let obj1 = {};
let obj2 = {
    valueOf() {
        return 20;
    }
};

console.log(++obj1);        // NaN
console.log(++obj2);        // 21
```

#### 加减操作符

加减操作符和数学中的加减操作符作用相同，对于 Number 类型是计算数值，对于其他类型将调用相应规则。

对于 String，`+`操作符将连接字符串：

+ 如果两个值都为字符串，则连接
+ 如果有一个值不是字符串，将另一个值转为字符串并连接

```js
let result1 = 5 + 5; // 两个数值
console.log(result1); // 10
let result2 = 5 + "5"; // 一个数值和一个字符串
console.log(result2); // "55"
```

`-`操作符则是进行数学减运算，会尝试将 String 转换成 Number，

```js
console.log('1' + '2' + '3');       // '123'
console.log('1' + '2' - '3');       // 9
console.log('a' - '3');             // NaN
```

#### 位操作符

ECMAScript 中的 Number 类型按照 IEEE 754 浮点数算术标准中的双精度64位方式存储。

在实际运算时，先将64位浮点数值转换为32位数值进行运算，再转换为64位浮点数存储，使用时64位存储方式是不可见的，对于程序员而言只需考虑32位数值。

正整数按前31位存放数值，32位存放符号的规则在内存中存储。负数使用补码，由绝对值取反加一获得。

##### 按位非

一元操作符波浪符`~`按数值的二进制位进行取反操作：

```js
let num1 = 25; 		// 二进制 00000000000000000000000000011001
let num2 = ~num1; 	// 二进制 11111111111111111111111111100110
console.log(num2); 	// -26
```

##### 按位与

二元操作符和符`&`进行按二进制位的与操作，接收两个参数：

```js
let result = 25 & 3;
console.log(result); // 1
```

##### 按位非

二元操作符管道符`|`进行按二进制位的非操作：

```js
let result = 25 | 3;
console.log(result); // 27
```

##### 按位异或

二元操作符脱字符`^`进行按二进制位的异或（即或非）操作：

```js
let result = 25 ^ 3;
console.log(result); // 26
```

##### 左移

二元操作符双小于号`<<`进行按位左移操作，接收值和位移位数作参数，并保留值的符号，缺位补0：

```js
console.log(2 << 5);        // 64
console.log(-2 << 5);       // -64
```

##### 有符号右移

二元操作符双大于号`>>`进行按位右移操作，接收值和位移位数作参数，并保留值的符号，缺位补0：

```js
console.log(64 >> 5);       // 2
console.log(-64 >> 5);      // -2
```

##### 无符号右移

二元操作符三大于号`>>>`进行按位右移操作，接收值和位移位数作参数，符号位也进行右移，缺位补0：

```js
console.log(64 >>> 5);      // 2
console.log(-64 >>> 5);     // 134217726
```

#### 布尔操作符

+ 逻辑非`!`：一元逻辑非操作符感叹号符，尝试将参数转换成 Boolean 类型后取反，双感叹号符`!!`相当于调用转型函数`Boolean()`，在布尔运算中拥有最高优先级
+ 逻辑与`&&`：二元逻辑与操作符双和符，短路特性，优先级高于逻辑或
+ 逻辑或`||`：二元逻辑或操作符双管道符，短路特性

#### 乘性操作符

+ 乘法`*`：二元操作符乘号，会尝试使用`Number()`转型函数将非数值类型转换
+ 除法`/`：二元操作符斜杠，会尝试使用`Number()`转型函数将非数值类型转换，`0 / 0`返回特殊值`NaN`
+ 取模`%`：二元操作符百分号，会尝试使用`Number()`转型函数将非数值类型转换

#### 指数操作符

ES 7 标准提出了指数二元操作符双星号`**`，代替原来的`Math.pow()`方法。

```js
console.log(Math.pow(3, 2); 		// 9
console.log(3 ** 2); 				// 9
console.log(Math.pow(16, 0.5); 		// 4
console.log(16** 0.5); 				// 4
```

#### 关系操作符

二元关系操作符`<`、`>`、`>=`、`<=`比较两值关系，并返回 Boolean。关系操作符会尝试将值转换为数值后比较。**对于 NaN，任何值与其比较都将返回 false。**

+ 对于数值，直接比较大小
+ 对于字符串，先将字符转为编码数字，再比较数值：

```js
let result = "23" < "3"; 	// true
```

+ 如果任意一值是数值，则转换另一值为数值后比较：

```js
let result1 = "23" < 3;		// false
let result2 = "a" < 3;		// false，'a'会转换为NaN
```

+ 如果任意一值是布尔值，则布尔值会转换为数值再比较
+ 如果任意一值是对象，调用其`valueOf()`或`toString()`方法

#### 相等操作符

在 ES 6 标准前，原本的相等操作符在比较前会进行类型转换。在 ES 6 标准出台后，添加了**全等操作符**，**不进行类型转换**。

##### 等于和不等于

二元操作符`==`和`!=`，会在比较前进行强制类型转换并比较值。（不推荐使用）

+ 比较前转换类型，存在数值时，将其他值转换为数值再比较
+ null 和 undefined 相等
+ null 和 undefined 无法转换类型
+ NaN 不等于任何值，包括自身

| 表达式            | 结果 |
| ----------------- | ---- |
| null == undefined | T    |
| "NaN" == NaN      | F    |
| 5 == NaN          | F    |
| NaN == NaN        | F    |
| NaN != NaN        | T    |
| false == 0        | T    |
| true == 1         | T    |
| true == 2         | F    |
| undefined == 0    | F    |
| null == 0         | F    |
| "5" == 5          | T    |

##### 全等于和不全等于

二元操作符`===`=和`!==`，在比较前不进行类型转换，只有类型和值都相等的情况下`===`返回 true。

#### 条件操作符

三元条件操作符问号符和冒号符组合`expr ? true_value : false_value`，相当于 if-else 语句。

#### 赋值操作符

二元赋值操作符等号符`=`，用于赋值，左侧称左值（left-hand），右侧称右值（right-hand）。

其他一元复合赋值操作符：

+ 乘后赋值`*=`
+ 除后赋值/=`
+ 取模后赋值%=`
+ 加后赋值+=`
+ 减后赋值-=`
+ 左移后赋值`<<=`
+ 右移后赋值>>=`
+ 无符号右移后赋值>>>=`

#### 逗号操作符

逗号操作符`,`用于在一句语句中执行多个操作，如复合赋值语句：

```js
let num1 = 1, num2 = 2, num3 = 3;
```

在赋值时使用逗号操作符分隔值，最终会返回表达式中最后一个值：

```js
let num = (5, 1, 4, 8, 0); // 0
```

