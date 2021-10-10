# JavaScript

---

> 整理自 《Professional JavaScript for Web Developers》，原作者 Matt Frisibie。

## 01 什么是 JavaScript

### JavaScript实现

完整的JavaScript包括：

+ 核心（ECMAScript）
+ 文档对象模型（DOM）
+ 浏览器对象模型（BOM，在 Web 浏览器为 ECMAScript 的宿主环境时）

另外常见的 ECMAScript 宿主环境还有 NodeJS 和 Adobe Flash（已淘汰）。

#### ECMAScript

ECMAScript 已经经历了多个版本标准的迭代，被设计为一种**平台无关**编程语言。

ECMAScript 定义了：

+ 语法
+ 类型
+ 语句
+ 关键字
+ 保留字
+ 操作符
+ 全局对象

##### 关于 ES6

ECMAScript 第六版，俗称 ES6、ES2015，于2015年6月发布，是有史以来最重要的一次 ES 特性增强，包括了类、模块（ES Module）、迭代器、生成器、箭头函数（Lambda表达式）、期约、反射、代理和众多数据类型。

###### ESNEXT

ECMAScript 标准还在不断完善中，截至 2021年6月22日，ECMA 已有12版标准。

#### DOM

文档对象模型（DOM，Document Object Model）是一个应用编程接口（API），用于在 HTML 中使用拓展的 XML。DOM 会创建表示HTML文档的节点树，通过 ECMAScript 控制网页的内容和结构。

DOM 标准由万维网联盟（W3C，World Wide WebConsortium）制定。DOM 包括 DOM Core 和 DOM HTML：

+ DOM Core：提供映射 XML 文档、访问和操作文档任意节点的方式
+ DOM HTML：提供特定于 HTML 的对象和方法

支持 DOM 对于浏览器尝试而言是重中之重。

##### 其他 DOM

除了 DOM Core 和 HTML，其他的一些基于 XML 的语言也有属于自己的 DOM，以下语言同样是 W3C 推荐标准：

+ 可伸缩矢量图 SVG
+ 数学标记语言 MathML
+ 同步多媒体开发语言 SMIL

#### BOM

浏览器会提供浏览器对象模型（BOM） API，用于支持访问和操作浏览器的窗口。与 ECMAScript 和 DOM 不同，BOM 没有相关标准。而 HTML5 的出现解决了这个问题，HTML5 以正式规范的形式涵盖了尽可能多的BOM
特性，目前各大浏览器的 BOM 实现细节正日趋一致。

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
        We're sorry but this page doesn't work properly without JavaScript enabled. Please enable it to
        continue. </strong>
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

const 和 let 类似，区别是 const 声明的常量必须在声明时被初始化，且不能在之后更改其值。const 声明的变量是**顶层 const**，当其指向一个对象时，不能重新绑定一个对象到 const
对象上，但是可以改变对象的成员。尝试修改 const 变量将导致运行时错误。

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

对于在内部实现了 [[ Call ]] 方法（即`()`函数调用操作符）的对象，typeof 将会返回 `'function'`。

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

Null 只有一个值，即特殊值 null。语义上，null 表示空对象指针，因此 typeof 将返回 "object"。**定义一个将来需要接收对象的标识符时，应该使用 null 而不是其他类型值**，通过检查其值是否为 null
即可判断该变量是否接收了一个对象。null 也是一个假值。

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

ES 会尽可能地将 Number 类型作为整数存储和操作，因此一些不必要的浮点数字面量会被转换为整数：

```js
console.log(Number.isInteger(1)); 		// true
console.log(Number.isInteger(1.00)); 	// true
console.log(Number.isInteger(1.01)); 	// false
```

IEEE 754 双精度浮点表示法规定在一定范围内的数值可以使用整数表示。这个数值范围从Number.MIN_SAFE_INTEGER（-2^53^+1）到Number.MAX_SAFE_INTEGER（2^53^-1），使用全局
Number 对象的方法`isSafeInteger()`可以判断一个数值是否为安全整数（可以存储为二进制整数）：

```js
console.log(Number.isSafeInteger(-1 * (2 ** 53))); // false
console.log(Number.isSafeInteger(-1 * (2 ** 53) + 1)); // true
console.log(Number.isSafeInteger(2 ** 53)); // false
console.log(Number.isSafeInteger((2 ** 53) - 1)); // true
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

parseInt 用于将一个字符串转换为 Number 整数类型，相比转型函数更注重字符串是否包含数字模式。忽略字符串最前方的空格，**从第一个非空格开始转换**。如果第一个字符不是**数字或正负号**，就返回
NaN，之后一直检测下一个字符，直到结尾或非数字字符。该函数可以接收两个参数，第二个参数为数制。

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

Symbol 符号类型是 ES 6 新增的基本类型，Symbol 是**唯一且不变**的，用作对象属性的**唯一标识符**。在 ES 6 之前，对象的属性标识符都是 String 类型，通过操作符`[]`或`.`
来访问。如果对象属性键为局部的 Symbol ，在作用域外将无法访问该属性，类似于私有属性。但是可以通过`Object.getOwnPropertySymbols()`来获取所有对象的符号类型键数组，并从中获取符号。

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

常用内置符号（well-known symbol）用于暴露 ECMAScript 语言的内部行为，类似 C++ 和一些语言的运算符重载、成员函数重写。通过重写内置符号键的属性或方法，来**改变原生结构的行为**
。使用常用内置符号作为键的成员一般是由 ES 操作符或内置对象的方法来调用的，无法直接调用。

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
console.log(Math.pow(3, 2)); 		// 9
console.log(3 ** 2); 				// 9
console.log(Math.pow(16, 0.5)); 		// 4
console.log(16 ** 0.5); 				// 4
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

#### 展开操作符

展开操作符`...`用于在函数调用与数组、对象构造时将数组表达式、字符串、对象展开，本质上是**浅拷贝**

函数调用：

```js
const add = (x, y, z) => x + y + z;
const arr = [1, 2, 3];
console.log(add(...arr));               // 6
```

数组构造：

```js
const arr = [1, 2, 3];
const arr1 = [arr, 4, 5, 6];
const arr2 = [...arr, 4, 5, 6];
console.log(arr1);                        // [ [ 1, 2, 3 ], 4, 5, 6 ]
console.log(arr2);                        // [ 1, 2, 3, 4, 5, 6 ]
arr[0] = 0;
console.log(arr1);                        // [ [ 0, 2, 3 ], 4, 5, 6 ]
console.log(arr2);                        // [ 1, 2, 3, 4, 5, 6 ]
```

对象属性浅拷贝：

```js
const obj1 = {obj: {name: 'obj1'}};
const obj2 = {...obj1};
obj2.name = 'obj2';
console.log(obj1.obj.name);                 // obj1
console.log(obj2.obj.name);                 // obj1
```

### 流程控制语句

+ if：常用的判断语句
+ do-while：至少会执行一次的循环语句
+ while：循环语句
+ for：循环语句
+ for-in：严格迭代语句，用于遍历**可枚举**对象中的**非符号键**属性，获取**键的值**，由于对象属性排列是无序的，在不同的运行环境中不一定能保证返回的键的顺序是一致的，一般用于遍历**对象**类型

```js
let obj = {
    name: 'obj',
    type: 'Object',
    [Symbol('value')]: 10
};

for (const key in obj) {
    console.log(key);
    // name
    // type
    console.log(obj[key]);
    // 'obj'
    // 'Object'
}
```

+ for-of：严格迭代语句，用于遍历**可迭代**对象的元素，获取的是**元素值**，一般用于数组等。of 关键字期待一个可迭代对象或一个迭代器：

```js
const arr = ['foo', 'bar', 'baz'];

for (const value of arr) {
    console.log(value);
    // foo
    // bar
    // baz
}

const map = new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
    ['key3', 'value3'],
]);

for (let iter of map.entries()) {
    console.log(iter);
    // [ 'key1', 'value1' ]
    // [ 'key2', 'value2' ]
    // [ 'key3', 'value3' ]
}
```

+ for-await-of：于 ES 7 提出，用于遍历生成期约的可迭代对象
+ 标签语句：用于给语句加上标签，可以用于嵌套循环等复杂的大段代码块中，用于标识代码块作用：

```js
loop1: for (let i = 0; i < 10; i++) {
    console.log(i);
    loop2: for (let j = 0; j < 10; j++) {
        console.log(j);
        loop3: for (let k = 0; k < 10; k++) {
            console.log(k);
        }
    }
}

// 另一种用法是类似于 C 中 goto 语句的目的地，在 ECMAScript 中配合 continue 和 break 同样可以实现类似效果，不建议使用。
```

+ with：用于设置一块代码区域为特点的对象作用域，**不建议使用**，严格模式下使用 with 会抛出错误：

```js
let qs = location.search.substring(1);
let hostName = location.hostname;
let url = location.href;

with (location) {
    let qs = search.substring(1);
    let hostName = hostname;
    let url = href;
}
```

+ switch：选择判断语句，和其他的一些语言不同，ES 中的 case 可以使用**任何类型的值**

> ECMAScript 包含7种数据类型：Undefined、Null、Boolean、Number、String、Symbol 和 Object
>
> Null 类型的特殊值 null 表示指向一个空对象
>
> Number 类型不区分浮点数和整数，以64位双精度方式在内存中存储，以32位方式运算
>
> Object 是复杂数据类型，是所有对象的基类
>
> 没有指定返回值的函数将返回 undefined

## 04 变量、作用域与内存

ECMAScript 的变量是松散类型的，变量的值和类型在生命期内可以改变。ES 不允许直接访问内存空间。

### 原始和引用值

ES 变量可以包含两种类型：原始值和引用值。

**原始值（primitive value，或称基元值）**是最简单的数据，包含6种基础类型的值。原始值是**按值访问（by value）**的，程序员操作的是存储在变量中的实际值。原始值存储在**栈内存**中。

**引用值（by reference）**是由多个值构成的对象，包含复杂类型 Object 的值。引用值是**按引用（by reference）**
访问的，不能直接操作对象所以在内存空间，而是按引用访问。包含引用值的变量实际在栈内存中存储了一个**指针**，其指向的对象则在**堆内存**中。

#### 动态属性

引用值可以在定义后随时动态地添加属性，而原始值不能：

```js
// 引用值可以动态地添加属性
let man = {};
man.name = 'Steven';
console.log(man.name);                  // 'Steven'

// 原始值不能动态添加属性，即使不会报错
let num = 10;
num.name = 'number';
console.log(num.name);                  // undefined
```

除了`Symbol()`外，**其他类型的转型函数可以当做构造函数使用**，通过 new 关键字实例化一个被初始值包裹的同类型对象，称为**基础类型包装器**
。这和直接使用字面量初始一个值不同，实例化的结果将是一个引用值对象，其行为类似原始值，因此可以动态添加属性：

```js
// 使用new关键字实例化一个原始类型的引用值，拥有和原始值相似的行为，称为基础类型包装器
let str1 = 'string';
let str2 = new String('string');

str1.name = 'str1';
str2.name = 'str2';

console.log(str1);              // 'string'
console.log(str2);              // [String: 'string'] { name: 'str2' }
console.log(str2.toString());   // 'string'
console.log(str2.valueOf());    // 'string'

console.log(str1.name);         // undefined
console.log(str2.name);         // str2

console.log(typeof str1);       // 'string'
console.log(typeof str2);       // 'object'

// 字符串类型是不变的，使用包装器也一样无法改变值，操作包装器对象时可能会发生类型转换
str2 += ' str2';
console.log(str2);              // 'string str2'
console.log(typeof str2);       // 'string'
```

#### 复制值

复制原始类型值时，本质是将一个原始类型值存放的内存中的数据**复制到另一内存区域中**，两者互不干扰，相互独立：

```js
let num1 = 10;
let num2 = num1;

num2 = 20;

console.log(num1);      // 10
console.log(num2);      // 20
```

复制引用类型值时，本质是**新建指针存储到栈中**，该指针指向原本在堆中的引用类型对象。同时指向同一对象的指针通过引用方式访问时修改的是同一个实例：

```js
let obj1 = {name: 'obj1'};
let obj2 = obj1;

obj2.name = 'obj2';
console.log(obj1.name); // 'obj2'
```

#### 值的参数传递

ES 中参数均**按值传递**，即复制值。对于原始类型是复制新值，对于引用类型是复制新指针。和 C++ 不同，ES 中没有引用传递，因此即使是引用类型的参数**也将占用一块新的内存来存放临时指针**。

```js
// 值的参数传递始终是值传递
let fun = (arg) => {
    if (typeof arg === 'number') arg **= 2;
    else arg.value **= 2;
};

let num = 10;
let obj = {value: 20};

fun(num);               	// 复制值
console.log(num);           // 10

fun(obj);               	// 复制指针
console.log(obj.value);     // 400

fun(obj.value);         	// 复制值
console.log(obj.value);     // 400
```

#### instanceof

操作符`instanceof`用于检测一个变量是否为给定引用类型的实例，由对象原型链决定，是则返回 true。如果用 `instanceof`检测原始值，始终返回 false。

### 执行上下文和作用域

每个**执行上下文（context）**都与一个**变量对象（variable object）**关联，变量对象的作用域决定了内部成员能访问哪些数据。变量对象无法通过代码访问，但是解释器后台将利用变量对象作处理。

上下文对应的变量对象会在生命期结束时被销毁，包括内部所有变量和函数。

上下文类型：

+ 全局上下文
+ 函数上下文
+ 块上下文

#### 全局上下文

**全局上下文**即最外层的执行上下文。在浏览器中，最外层的执行上下文即 window 窗口对象：

```js
var val1 = 10;
let val2 = 20;

console.log(this);                  // 浏览器：window对象，NodeJS：空对象
console.log(this.val1);             // 浏览器：10，NodeJS：undefined
console.log(this.val2);             // 浏览器：undefined，NodeJS：undefined
```

浏览器全局上下文会在关闭窗口（选项卡）或关闭浏览器时销毁。

#### 上下文栈

**上下文栈**中存储每个上下文对应的变量对象，栈底为全局上下文。当流程进入函数时，会将函数上下文推入上下文栈，如果下个进入的上下文也是函数则此函数将**中断**。当前函数流程结束返回时则弹出上下文栈顶元素，返回中断的上下文中继续执行流程。

#### 作用域链

上下文中代码执行时会创建变量对象的一个**作用域链（scope chain）**，决定各级上下文访问变量和函数的顺序。作用域链中的下一个变量对象可以访问链之前所有变量对象内部成员（变量、函数、函数参数）。

**标识符查找**开始于作用域的链尾，逐级查找标识符对应的内容，如果找到则终止查找并返回值，如果没有找到则说明标识符对应的变量未声明。作用域链中的对象有属于自己的**原型链**。

```js
// 作用域链
{	// 变量对象1
    // 链首
    let val1 = 1;
    let name = '1';
    {	// 变量对象2
        let val2 = 2;
        let name = '2';
        {	// 变量对象3
            // 链尾
            let val3 = 3;
            let name = '3';

            // 作用域链决定能访问的变量和函数以及访问顺序
            // 链尾变量对象可以访问之前所有变量对象内的函数和变量
            console.log(val1);      // 1
            console.log(val2);      // 2
            console.log(val3);      // 3
            // 如果遇到重名变量或函数，则按访问顺序，访问最近的重名变量或函数
            console.log(name);      // '3'
        }
    }
}
```

对于函数上下文，则其**活动对象（activation object）**作为其变量对象，活动对象最初只有一个成员，即可迭代对象`arguments`，全局上下文没有这个成员。

#### 作用域链增强

执行上下文主要有全局上下文和函数上下文两种。此外`eval()`函数执行时会使用第三种上下文。

而在使用`with`和`try/catch`语句时，当前作用域链会被增强，链首会被添加一个新作用域链，当语句结束时消除。

+ with：进入 with 语句内部时，在链首追加指定对象的上下文
+ catch：进入 catch 内部时，在链首追加一个包含错误对象的变量对象

### 变量声明

#### var

+ var 声明的变量会被自动添加到最近的上下文（函数和全局）
+ var 声明的变量会被提升，并忽略重复声明
+ var 作用域为函数上下文，在一些循环语句（if、while）中声明变量会泄漏到循环外部

#### let 和 const

+ let 作用域为块级（花括号`{}`内部范围）
+ let 在作用域内不能重复声明
+ let 不会提升，不会添加到上下文，具有暂时性死区（temporal dead zone），在声明前无法访问
+ const 必须在声明时被初始化
+ const 变量是顶层 const，不能重新绑定对象，可以修改绑定的对象
+ const 声明的变量初始化的引用值（对象）在运行时会被替换为实际的值，不会通过查询表进行查找，这是一种解释器优化

> 尽量使用 const 来声明变量，避免因为不必要的重新赋值产生问题代码。不再使用 var 。

### 垃圾回收

JavaScript 是使用垃圾回收技术的语言，无需程序员手动管理堆内存。垃圾回收的基本思路是：**确定不会再使用的变量并释放**。该过程是周期性的，每隔一定时间进行一次。确定无用变量的过程称为**标记**，ES
标准在浏览器环境实现的过程中，主要有两种标记策略。

#### 标记清理

**标记清理（mark-and-sweep）**是最常用的垃圾回收策略，大部分浏览器都主要使用该策略。

1. 标记内存中所有的变量
2. 将上下文中的变量、被上下文中变量引用的变量的标记去除
3. 回收带标记的变量

#### 引用计数

**引用计数（reference counting）**策略不常用，是最早的垃圾回收策略。该策略的基本思想是：当一个变量值被创建或引用时，计数+1，当值的引用减少时，计数-1，如果计数为0则清除。

这种策略在一些情况下将导致内存泄漏问题，如**循环引用**：

```js
function problem() {
    let objectA = new Object();
    let objectB = new Object();
    objectA.someOtherObject = objectB;
    objectB.anotherObject = objectA;
}

// 函数结束时，objectA和objectB的计数为2，两者并不会被清除
```

> 在 IE8 中，DOM 和 BOM 并非 JavaScript 对象，而是属于浏览器中使用 C++ 编写的组件对象模型（COM，omponent Object Model）对象，这将造成跨语言的循环引用问题。IE9 将 DOM 和 BOM 都修改为了原生 JavaScript 对象，但是 IE 的问题远不止这些。
>
> IE7 发布后，JavaScript 引擎的垃圾回收程序被调优为动态改变分配变量、字面量或数组槽位等会触发垃圾回收的阈值。IE7 的起始阈值都与 IE6 的相同。如果垃圾回收程序回收的内存不到已分配的15%，这些变量、字面量或数组槽位的阈值就会翻倍。如果有一次回收的内存达到已分配的85%，则阈值重置为默认值。这么一个简单的修改，极大地提升了重度依赖 JavaScript 的网页在浏览器中的性能。

### 内存管理策略

目前，浏览器中的 JavaScript 运行在一个较为特殊的环境下，和桌面以及其他运行环境不同，为浏览器分配的内存往往更少。因此让页面保持较少的运行内存十分重要。对于其他环境中的 NodeJS
服务器与桌面应用一样，尽可能提高程序运行效率是非常重要的。

#### 释放内存

尽可能不要申请不必要的内存空间，对于不再使用的变量，可以直接手动释放。**解除引用**是常用的内存释放手段，方法是将一个变量赋值为`null`，原先的变量值会被自动释放。

#### 弃用 var

var 可能导致不必要的变量泄漏，而块级作用域的 let 和 const 在块作用域结束后会自动释放。

#### 隐藏类和删除操作

JavaScript V8 是目前最流行的 JavaScript 解释器引擎，在众多浏览器和 NodeJS 中都使用 V8。V8 在编辑 JavaScript 为机器码时会利用**隐藏类**特性。

V8 在运行时会将对象与一个隐藏类关联，跟踪他们的属性特征。这和其他高级编程语言中的自定义数据类型相似，只是 ES 中，自定义数据类型相当于一个构造器。用同一个构造器声明的多个对象将共用一个隐藏类，**
但是为对象动态添加或删除属性或方法会导致生成一个新的隐藏类**，这将降低运行效率。因此，最好的方式是**将不再需要的属性绑定到空对象上**，并减少动态赋值，使用构造器或新的`class`语法：

```js
function Article() {
    this.title = 'Inauguration Ceremony Features Kazoo Band';
    this.author = 'Jake';
}

let a1 = new Article();
let a2 = new Article();

// delete a1.author;		删除操作会导致新的隐藏类出现
a1.author = null;
```

#### 常见的内存泄漏问题

##### 意外声明的全局变量

没有使用关键字声明的变量会被挂载到全局上下文中，使用 var 声明的变量可能在无疑中泄漏（如在循环条件中的变量）。使用新的 let 和 const 来避免这些问题。

##### 闭包泄漏

**闭包**很容易在不经意间泄漏变量，通常发生在回调函数和函数上下文的函数声明中：

```js
let outer = function () {
    let name = 'Jake';
    return function () {
        return name;
    };
};
```

函数 outer 返回一个内部声明的函数，该函数内部引用了局部变量 name 。此变量本该在 outer 执行完毕后被销毁，但是由于返回的函数进行了引用。如果有一个变量接收了这个闭包，只有在该闭包被销毁时 name 才会一同销毁。因此，**
尽可能不要再被返回的闭包中引用局部变量**。

##### 定时器泄漏

定时器的回调函数导致的内存泄漏属于**闭包**泄漏的一种，如果回调函数内部引用了一个外部上下文的变量，在定时器结束前该变量值会一直存在：

```js
let name = 'Jake';
setInterval(() => {
    // name直到100ms后被释放
    console.log(name);
}, 100);
```

##### 静态分配和对象池

一般来说，对于浏览器前端的业务场景并不需要特别注意垃圾回收问题。但是随着浏览器技术的发展和 JavaScript 运用环境的拓展，在前端的 canvas 接口和服务器端应用上可能需要特别的软件优化。

在一些场景下，可能会有大量复杂数据类型被不断创建和销毁（如生成计算机图形接口所需要的多维向量对象）。**如果解释器发现一些对象经常被创建和销毁，就会提高垃圾回收频率**，这将导致总体性能下降。此时，可以使用**对象池**技术。

假如有一个一维向量增加函数，用于计算并返回一个一维向量：

```js
function addVector(a, b) {
    let resultant = new Vector();
    resultant.x = a.x + b.x;
    resultant.y = a.y + b.y;
    return resultant;
}
```

每次调用该函数，其内部将实例化一个对象，如果频繁调用，解释器会提高局部垃圾回收频率。

然而这个对象的实例化是不必要的，可以让函数接收一个外部对象并修改：

```js
function addVector(a, b, resultant) {
    resultant.x = a.x + b.x;
    resultant.y = a.y + b.y;
    return resultant;
}
```

这个外部对象不应直接定义在全局上下文中，这会污染全局作用域。其中的一种解决方案是使用对象池，创建一个全局上下文中的对象来存储不同的向量类型实例对象：

```js
// vectorPool 是已有的对象池
let v1 = vectorPool.allocate();
let v2 = vectorPool.allocate();
let v3 = vectorPool.allocate();

v1.x = 10;
v1.y = 5;
v2.x = -3;
v2.y = -6;

addVector(v1, v2, v3);
console.log([v3.x, v3.y]); // [7, -1]
vectorPool.free(v1);
vectorPool.free(v2);
vectorPool.free(v3);

// 如果对象有属性引用了其他对象
// 则这里也需要把这些属性设置为null
v1 = null;
v2 = null;
v3 = null;
```

对象池只需分配向量，当池中对象数量不够时分配新对象，当池中有足够对象时分配对象，其他变量在不需要时解除对这些变量的引用即可。本质上是一种**贪婪算法**，分配**静态**但**增长**
的内存。对象池的存储结构适合用内置数组实现，但是要注意不必要的垃圾回收（JavaScript 在某个数组预分配空间不足时会删除并增加一个新数组，尽可能在对象池存储数组中手动分配足够多的空间）。

```js
let vectorList = new Array(100);		// 100个向量对象是否足够？
let vector = new Vector();
vectorList.push(vector);
```

> 原始值保存在栈上，引用值保存在堆中
>
> 原始值复制创建新值，引用值复制创建新指针
>
> typeof 用于确定原始值类型，instanceof 用于确定引用值类型
>
> 执行上下文分全局上下文、函数上下文和块级上下文
>
> 标记清理策略是目前主流的垃圾回收策略
>
> 静态操作可以提高运行效率，减少垃圾回收次数，使用 null 值代替 delete 操作

---

## 05 基本引用类型

**引用值**是某个特定引用类型的**实例**。ECMAScript 中的引用类型是把数据和功能组织在一起的结构，这与面向对象方法中的**类**很相似，但 ECMAScript 中实际上并没有类的存在。引用类型有时也被称为**对象定义**。

在 ES 中，一个实例通过 new 关键字和一个**构造函数（constructor）**来实例化。

### Date

Date 类型将日期保存为**自协调世界时（UTC，Universal Time Coordinated）**，为1970年1月1日0时至今的**毫秒数**，最多表示1970年之后285616年的时间。

构造函数`Date()`可以接收一个参数，单位为毫秒的 Number 类型。在不传入参数的情况下默认存储当前时间。

#### 常用方法

+ `Date.parse()`：接收一个表示时间的字符串，支持`月/日/年`、ISO 8601时间格式等形式的字符串。如果解析失败返回 NaN
+ `Date.UTC()`：接收一组参数，接收年、月（从0开始为1）、日（从1开始）、时、分、秒和毫秒。年和月是必选参数，解析失败返回 NaN

构造函数在接收非 Number 类型参数时会尝试调用 parse 和 UTC 方法解析。

#### 继承的方法

Date 类型重写了以下方法：

+ `toLocalString()`：返回与浏览器运行的本地环境一致的日期和时间
+ `toString()`：返回格林尼治时间字符串
+ `valueOf()`：返回1970.1.1至今毫秒数

#### 日期格式化方法

+ `toDateString()`：显示日期中的周几、月、日、年（格式特定于实现）
+ `toTimeString()`：显示日期中的时、分、秒和时区（格式特定于实现）
+ `toLocaleDateString()`：显示日期中的周几、月、日、年（格式特定于实现和地区）
+ `toLocaleTimeString()`：显示日期中的时、分、秒（格式特定于实现和地区）
+ `toUTCString()`：显示完整的UTC 日期（格式特定于实现）

### RegExp

ES 支持正则表达式，可以通过字面量创建一个 RegExp 对象。

#### 标记

正则对象可以带 flag（标记），设置的标记可以使用 flags 方法查询。

+ g：全局模式，表示查找字符串的全部内容，而不是找到第一个匹配的内容就结束
+ i：不区分大小写，表示在查找匹配时忽略pattern 和字符串的大小写
+ m：多行模式，表示查找到一行文本末尾时会继续查找。
+ y：粘附模式，表示只查找从lastIndex 开始及之后的字符串
+ u：Unicode 模式，启用Unicode 匹配
+ s：dotAll 模式，表示元字符.匹配任何字符（包括\n 或\r）

#### 实例属性

+ global：布尔值，表示是否设置了g 标记。
+ ignoreCase：布尔值，表示是否设置了i 标记。
+ unicode：布尔值，表示是否设置了u 标记。
+ sticky：布尔值，表示是否设置了y 标记。
+ lastIndex：整数，表示在源字符串中下一次搜索的开始位置，始终从0 开始。非全局模式始终不变
+ multiline：布尔值，表示是否设置了m 标记。
+ dotAll：布尔值，表示是否设置了s 标记。
+ source：正则表达式的字面量字符串（不是传给构造函数的模式字符串），没有开头和结尾的斜杠
+ flags：正则表达式的标记字符串。始终以字面量而非传入构造函数的字符串模式形式返回（没有前后斜杠）

#### 常用实例方法

+ exec：应用正则，接收一个参数作为要应用正则的字符串，返回包含第一个匹配信息的数组，该数组包含所有查询到的匹配模式的字符串，以及额外的 index（查询到的第一个字符串的起始下标） 与 input（输入的字符串）
  属性，如果是全局查找只返回第一个字符串的 index
+ test：应用正则，接收一个字符串，如果字符串包含模式则返回 true

### 原始值包装类型

ES 中提供三种特殊的引用类型 Boolean、Number 和 String 来包装原始值。在使用字面量初始化包含原始值变量时，ES 会为这些原始值自动用对应类型的对象包装，从而实现在原始值上调用方法。

原始值包装类型对象的声明期仅在使用它的语句范围内。当语句结束后，对象就被销毁了，因此在原始值上添加属性是无效的：

```js
let str1 = 'str1';
console.log(typeof str1);               // 'string'
console.log(str1.substring(0, 3));      // 'str'
str1.name = '1';                        // str1是新创建的一个原始值包装类型对象，语句结束后销毁
console.log(str1.name);                 // undefined，调用str1再次创建一个对象，该对象没有默认的name属性
```

可以显式使用 Boolean、Number 和 String 构造函数创建原始值包装对象，生成的实例具有引用类型的特性：

```js
let str2 = new String('str2');		    // 不使用new则是调用转型函数
console.log(typeof str2);               // 'object'
str2.name = '2';
console.log(str2.name);                 // '2'
```

一般不会显式调用这些构造函数，如果必须要使用，需要注意：

+ 生成的实例是引用类型值，typeof 将返回 `'object'`
+ 在判断语句中，如果引用类型值要被转为 Boolean 类型值，将返回 true，对于一个值为 false 的引用类型 Boolean 对象，判断时依旧返回 true ，这在语句中可能导致阅读歧义。不建议生成一个引用类型为 Boolean
  的实例

#### 字符串方法

String 类型拥有几个常用的方法。

##### concat 连接

`concat()`用于拼接多个字符串，接收任意数量字符串类型参数，返回拼接的结果：

```js
let stringValue = "hello ";
let result = stringValue.concat("world", "!");
console.log(result); 		// "hello world!"
console.log(stringValue); 	// "hello"
```

一般使用更方便的`+`操作符替代。

##### slice 截取范围

截取字符串部分。接收一个或两个参数，第一个参数为起始位置下标，第二个为结束位置下标（不包括下标位置的字符串，截取该位置前的内容，默认截取至结尾）。**参数为负数时**
，参数与字符串长度相加后输入，即对于第一个参数而言，负数代表从倒数第几位开始截取。

##### substring 截取范围

截取字符串部分。接收一个或两个参数，第一个参数为起始位置下标，第二个为结束位置下标（不包括下标位置的字符串，截取该位置前的内容，默认截取至结尾）。**参数为负数时**，转化为0。

##### substr 截取数量

截取字符串部分。接收一个或两个参数，第一个参数为起始位置下标，第二个参数为截取后字符串长度（默认截取全部剩余）。**参数为负数时**
，第一个参数与字符串长度相加后输入，即对于第一个参数而言，负数代表从倒数第几位开始截取，第二个参数会转换为0，截取0长度的字符串。

```js
let stringValue = "hello world";
console.log(stringValue.slice(3)); 			// "lo world"
console.log(stringValue.substring(3)); 		// "lo world"
console.log(stringValue.substr(3)); 		// "lo world"
console.log(stringValue.slice(3, 7)); 		// "lo w"
console.log(stringValue.substring(3, 7)); 	// "lo w"
console.log(stringValue.substr(3, 7)); 		// "lo worl"
console.log(stringValue.slice(-3)); 		// "rld"
console.log(stringValue.substring(-3)); 	// "hello world"
console.log(stringValue.substr(-3)); 		// "rld"
console.log(stringValue.slice(3, -4)); 		// "lo w"
console.log(stringValue.substring(3, -4)); 	// "hel"
console.log(stringValue.substr(3, -4)); 	// "" (empty string)
```

##### indexOf 和 lastIndexOf 查找子串位置

`indexOf()`获取第一个给定子字符串出现的位置，找到则返回第一个出现的子字符串第一个字符的下标，没有找到返回 -1。`lastIndexOf()`为反向查找：

```js
let stringValue = "hello world";
console.log(stringValue.indexOf("o")); 		// 4
console.log(stringValue.lastIndexOf("o")); 	// 7
```

可以接收第二个参数，用于指定开始查找的位置：

```js
let stringValue = "hello world";
console.log(stringValue.indexOf("o", 6)); 		// 7
console.log(stringValue.lastIndexOf("o", 6)); 	// 4
```

查找所有子字符串位置算法：

```js
function findAllIndex(string, target) {
    let positions = [];
    let pos = string.indexOf(target);
    while (pos > -1) {
        positions.push(pos);
        pos = stringValue.indexOf(target, pos + 1);
    }

    return positions;
}
```

##### includes 确认是否存在子串

确认字符串中是否存在给定子字符串。第一个参数接收给定的字符串，第二个可选参数接收开始查找的位置。如果存在返回 true：

```js
let message = "foobarbaz";
console.log(message.includes("bar")); // true
console.log(message.includes("qux")); // false
```

##### startsWith

确认从给定索引位置开始的子字符串是否匹配给定字符串。第一个参数接收给定的字符串，第二个可选参数接收开始查找的位置，默认为0：

```js
let message = "foobarbaz";
console.log(message.startsWith("foo")); // true
console.log(message.startsWith("foo", 1)); // false
```

##### endsWith

确认从索引位置（string.length - substring.length）开始的子字符串是否匹配给定字符串。第一个参数接收给定字符串，第二个可选参数接收指定的末尾位置（即将字符串当作在该位置结尾），默认为字符串长度：

```js
let message = "foobarbaz";
console.log(message.endsWith("bar")); // false
console.log(message.endsWith("bar", 6)); // true
```

##### trim 删除首尾空格

用于去除字符串首尾全部空格，不包括内部空格。`trimStart()`和`trimEnd()`用于去除首或尾空格。

##### repeat 重复字符串内容

重复字符串内容并拼接，返回拼接结果：

```js
let stringValue = "na ";
console.log(stringValue.repeat(16) + "batman");
// na na na na na na na na na na na na na na na na batman
```

##### padStart 和 padEnd

`padStart()` 在字符串起始位置添加给定数量的给定字符串，`padEnd()`从尾部开始重复。第一个参数为重复次数，第二个参数为重复的字符串，默认为空格。

##### replace 替换内容

去除字符串中与第一个给定字符串相同字符串，并用指定的内容替换。第一个参数为要删除的字符串，第二个参数为要替代的字符串：

```js
const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';
console.log(p.replace('dog', 'monkey'));
// "The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?"
```

ES 2021 提出的`replaceAll()`方法可以替代目标字符串中的所有子字符串。

##### toLowerCase 和 toUpperCase

分别用于大小写转换。

##### split 分隔子串

用一个给定的字符串作分隔标准，返回字符串分隔后的结果数组。第一个参数为分隔标准，第二个可选参数为最大分隔数量：

```js
const str = 'The quick brown fox jumps over the lazy dog.';

const words = str.split(' ');
console.log(words);
// Array ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog."]

const chars = str.split('');
console.log(chars);
// Array ["T", "h", "e", " ", "q", "u", "i", "c", "k", " ", "b", "r", "o", "w", "n", " ", "f", "o", "x", " ", "j", "u", "m", "p", "s", " ", "o", "v", "e", "r", " ", "t", "h", "e", " ", "l", "a", "z", "y", " ", "d", "o", "g", "."]

const strCopy = str.split();
console.log(strCopy);
// Array ["The quick brown fox jumps over the lazy dog."]
```

##### match 匹配正则

接收一个正则对象，返回正则匹配的内容数组：

```js
const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/g;
const found = paragraph.match(regex);

console.log(found);
// expected output: Array ["T", "I"]
```

##### search 匹配正则

接收一个正则对象，返回第一个符合模式的字符下标，没有找到时返回-1：

```js
const paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';

// 非英文字符和空格
const regex = /[^\w\s]/g;
console.log(paragraph.search(regex));
// 43
console.log(paragraph[paragraph.search(regex)]);
// "."
```

##### [[ iterator ]]

字符串原型上有一个内置方法 [[ iterator ]]，可以使用常用内置符号访问，并手动使用迭代器：

```js
let message = "abc";
let stringIterator = message[Symbol.iterator]();
console.log(stringIterator.next()); // {value: "a", done: false}
console.log(stringIterator.next()); // {value: "b", done: false}
console.log(stringIterator.next()); // {value: "c", done: false}
console.log(stringIterator.next()); // {value: undefined, done: true}
```

由于具有迭代器，字符串可以使用解构操作符进行解构：

```js
let message = "abcde";
console.log([...message]); // ["a", "b", "c", "d", "e"]
```

##### localeCompare 比较单词表顺序

用于在本地语言单词表中比较两个字符串中字符出现的顺序，出现位置小于给定字符串时返回-1，相同返回0，大于返回1：

```js
let stringValue = "yellow";
console.log(stringValue.localeCompare("brick")); 	// 1
console.log(stringValue.localeCompare("yellow")); 	// 0
console.log(stringValue.localeCompare("zoo")); 		// -1
```

### 标准内置对象

**标准内置对象**是任何由 ECMAScript 实现提供、**与宿主环境无关**，并在ECMAScript程序**开始执行时就存在**的对象。

#### Global

**Global** 对象是 ES 中最特殊的对象，代码不会显示访问这个对象（包括全局下的 this 指针）。事实上 ES 中并**不存在全局函数和全局变量**，在全局下定义的函数和变量都会**成为 Global 对象的属性**。

那些看起来像是全局函数或变量的函数与变量实际上是 Global 对象的成员，`isNaN()`、`isFinite()`、`parseInt()`和`parseFloat()`，实际上都是 Global 对象的方法。

##### URL 编码方法

全局对象的 URL 编码方法用于将字符串编码为浏览器能识别的**统一资源标识符（URI）**。

`encodeURI()`用于对整个字符串进行编码，转码所有**不属于 URL 组件中的非标准字符**，如冒号、斜杠、问号、井号，返回编码结果：

```js
let uri = "http://www.wrox.com/illegal value.js#start";

console.log(encodeURI(uri));	// "http://www.wrox.com/illegal%20value.js#start"，空格被替换
```

`encodeURIComponent()`会将所有非标准字符转码，包括 URL 中内容：

```js
console.log(encodeURIComponent(uri));	// "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start"
```

一般使用`encodeURI()`来编码 URL 部分，而`encodeURIComponent()`则用来编码 URI 中剩余部分，如查询字符串。

对应的，`decodeURI()`和`decodeURIComponent()`用于解码：

```js
let uri = "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start";
// http%3A%2F%2Fwww.wrox.com%2Fillegal value.js%23start
console.log(decodeURI(uri));
// http:// www.wrox.com/illegal value.js#start
console.log(decodeURIComponent(uri));
```

##### eval

`eval()`就是一个完整的 ECMAScript 解释器。该方法接收一个 ECMAScript 字符串作为参数并执行。eval 中执行的代码拥有和调用 eval
时所在代码块相同的上下文与作用域链，因此可以访问相同上下文中定义的变量和函数。

```js
let msg = "hello world";
eval("console.log(msg)"); 	// "hello world"
```

在 eval 内部定义的函数可以在外部被调用，而变量不行：

```js
eval("function sayHi() { console.log('hi'); }");
sayHi();			// hi
eval("let msg = 'hello world';");
console.log(msg); 	// Reference Error: msg is not defined
```

在严格模式下，外部将无法访问 eval 内部创建的函数和变量。

> 使用 eval 时应该注意页面安全，注意防范 XXS，以及谨慎使用用户输入内容作为 eval 参数。

##### window

在浏览器中，**window 对象**实际上是 Global 对象的代理，是对 ES 的 Global 对象的实现，可以通过 this 指针访问。

#### Math

全局对象属性 Math 用于进行数学相关操作。和其他内置原生方法一样，Math 中的方法由解释器实现，拥有比同样的 JavaScript 代码实现更高的效率。

##### 对象属性

+ `Math.E`：自然对数的基数e 的值
+ `Math.LN10`： 10为底的自然对数
+ `Math.LN2`： 2为底的自然对数
+ `Math.LOG2E`： 以2 为底e 的对数
+ `Math.LOG10E`： 以10 为底e 的对数
+ `Math.PI`： π 的值
+ `Math.SQRT1_2`： 1/2的平方根
+ `Math.SQRT2`： 2的平方根

##### min 和 max

`min()`和`max()`方法用于确定一组数值中的最小值和最大值，接收任意多个参数，返回结果：

```js
let max = Math.max(3, 54, 32, 16);
console.log(max); // 54
let min = Math.min(3, 54, 32, 16);
console.log(min); // 3
let values = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(Math.max(...values));	// 8
```

##### ceil

用于向上取整。

```js
console.log(Math.ceil(25.9));   // 26
console.log(Math.ceil(25.5));   // 26
console.log(Math.ceil(-25.1));  // -25
```

##### floor

用于向下取整。

```js
console.log(Math.floor(25.9));  // 25
console.log(Math.floor(25.5));  // 25
console.log(Math.floor(-25.1)); // -25
```

##### round

用于四舍五入。

```js
console.log(Math.round(25.9));  // 26
console.log(Math.round(25.5));  // 26
console.log(Math.round(-25.1)); // -25
```

##### fround

返回最接近的单精度浮点值。

```js
console.log(Math.fround(0.4));  // 0.4000000059604645
console.log(Math.fround(0.5));  // 0.5
console.log(Math.fround(25.9)); // 25.899999618530273
```

##### random

返回 [0,1) 区间内的随机数。以下是常用的随机数获取函数：

```js
let selectFrom = (lowerValue, upperValue) => {
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}
```

##### 其他方法

+ `Math.abs(x)` ：返回 x 的绝对值
+ `Math.exp(x)`：返回 Math.E 的x 次幂
+ `Math.expm1(x)`： 等于 Math.exp(x) - 1
+ `Math.log(x)`： 返回x 的自然对数
+ `Math.log1p(x)`： 等于1 + Math.log(x)
+ `Math.pow(x, power)`： 返回x 的 power 次幂
+ `Math.hypot(...nums)` ：返回 nums 中每个数平方和的平方根
+ `Math.clz32(x)`： 返回32 位整数 x 的前置零的数量
+ `Math.sign(x)` ：返回表示 x 符号的1、0、-0 或-1
+ `Math.trunc(x)`： 返回 x 的整数部分，删除所有小数
+ `Math.sqrt(x)` ：返回 x 的平方根
+ `Math.cbrt(x)`： 返回 x 的立方根
+ `Math.acos(x)` ：返回 x 的反余弦
+ `Math.acosh(x)` ：返回 x 的反双曲余弦
+ `Math.asin(x)` ：返回 x 的反正弦
+ `Math.asinh(x)` ：返回 x 的反双曲正弦
+ `Math.atan(x)` ：返回 x 的反正切
+ `Math.atanh(x)` ：返回 x 的反双曲正切
+ `Math.atan2(y, x)`： 返回 y/x 的反正切
+ `Math.cos(x)` ：返回 x 的余弦
+ `Math.sin(x)` ：返回 x 的正弦
+ `Math.tan(x)` ：返回 x 的正切

#### 所有标准内置对象

以下是所有 ECMAScript 标准内置对象。

##### [值属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#值属性)

这些全局属性返回一个简单值，这些值没有自己的属性和方法。

+ [`Infinity`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Infinity)
+ [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)
+ [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)
+ [`globalThis`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis)

##### [函数属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#函数属性)

全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。

+ [`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval)
+ [`uneval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/uneval)
+ [`isFinite()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isFinite)
+ [`isNaN()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN)
+ [`parseFloat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)
+ [`parseInt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
+ [`decodeURI()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)
+ [`decodeURIComponent()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)
+ [`encodeURI()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
+ [`encodeURIComponent()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
+ 已废弃
    + [`escape()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/escape)
    + [`unescape()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/unescape)

##### [基本对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#基本对象)

顾名思义，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。

+ [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)
+ [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)
+ [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
+ [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

###### 错误对象

错误对象是一种特殊的基本对象。它们拥有基本的 [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)
类型，同时也有多种具体的错误类型。

+ [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)
+ [`AggregateError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AggregateError)
+ [`EvalError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/EvalError)
+ [`InternalError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/InternalError)
+ [`RangeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RangeError)
+ [`ReferenceError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)
+ [`SyntaxError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError)
+ [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)
+ [`URIError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/URIError)

##### [数字和日期对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#数字和日期对象)

用来表示数字、日期和执行数学计算的对象。

+ [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)
+ [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
+ [`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)
+ [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

##### [字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#字符串)

用来表示和操作字符串的对象。

+ [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
+ [`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

##### [可索引的集合对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#可索引的集合对象)

这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。

+ [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
+ [`Int8Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)
+ [`Uint8Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
+ [`Uint8ClampedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)
+ [`Int16Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int16Array)
+ [`Uint16Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array)
+ [`Int32Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int32Array)
+ [`Uint32Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array)
+ [`Float32Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)
+ [`Float64Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Float64Array)
+ [`BigInt64Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array)
+ [`BigUint64Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array)

##### [使用键的集合对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#使用键的集合对象)

这些集合对象在存储数据时会使用到键，包括可迭代的[`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
和 [`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)，支持按照插入顺序来迭代元素。

+ [`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
+ [`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)
+ [`WeakMap`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
+ [`WeakSet`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

##### [结构化数据](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#结构化数据)

这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON （JavaScript Object Notation）编码的数据。

+ [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
+ [`SharedArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)
+ [`Atomics`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics)
+ [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)
+ [`JSON`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)

##### [控制抽象对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#控制抽象对象)

控件抽象可以帮助构造代码，尤其是异步代码（例如，不使用深度嵌套的回调）。

+ [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
+ [`Generator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)
+ [`GeneratorFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction)
+ [`AsyncFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)

##### [反射](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#反射)

+ [`Reflect`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
+ [`Proxy`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

##### [国际化](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#国际化)

ECMAScript核心的附加功能，用于支持多语言处理。

+ [`Intl`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl)
+ [`Intl.Collator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator)
+ [`Intl.DateTimeFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
+ [`Intl.ListFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat)
+ [`Intl.NumberFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
+ [`Intl.PluralRules`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules)
+ [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)
+ [`Intl.Locale`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale)

##### [WebAssembly](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#webassembly)

+ [`WebAssembly`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly)
+ [`WebAssembly.Module`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module)
+ [`WebAssembly.Instance`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Instance)
+ [`WebAssembly.Memory`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory)
+ [`WebAssembly.Table`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Table)
+ [`WebAssembly.CompileError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/CompileError)
+ [`WebAssembly.LinkError` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/LinkError)
+ [`WebAssembly.RuntimeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/RuntimeError)

##### [其他](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#其他)

+ [`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)

> ECMAScript 的引用类型和传统面向对象语言中的类类似，但实现不同
>
> Date 是时间类型
>
> RegExp 是正则表达式接口
>
> 函数也是对象，即 Function 的实例
>
> 原始值在访问时会生成一个临时的原始值包装类型对象，因此可以在原始值上调用方法，语句结束即销毁包装对象

---

## 06 集合引用类型

### Object

Object 是 ECMAScript 中所有引用类型的基类，其实例没有多少功能，但是适合存储数据。

#### 创建实例

Object 实例有两种创建方式，一种是使用 new 关键字，另一种是使用**对象字面量（object literal）**：

```js
let man = {	// 表达式上下文开始
    name: "Steven",
    age: 20
};	// 表达式上下文结束
```

对象字面量从`{`开始到`}`结束，其中内容称为**表达式上下文（expression context）**，表达式上下文期待返回值，在对象字面量中返回值即是一个对象。类似的还有**语句上下文（statement context）**，内容是一段要执行的语句块。

**在字面量中声明的 Number 类型的键会被自动转换为 String 类型**：

```js
let obj = {
    name: 'Steven',
    age: 20,
    1: true         // Number类型的键会自动转为字符串类型
};

console.log(obj);   // { '1': true, name: 'Steven', age: 20 }
```

使用字面量定义对象的好处是并**不会调用 Object 的构造函数**，可以提高程序效率。

#### 访问属性

ES 中访问对象属性有两种方式，一种是和其他面向对象语言一样的**点语法**，`.`后的字面量实际是 String 类型的键：

```js
console.log(obj.name);
```

另一种是使用中括号，实际上是通过键的值来访问属性，键值可以是 String、Number 或 Symbol：

```js
console.log(obj['name']);
console.log(arr[1]);
console.log(arr[Symbol.iterator]);
```

### Array

ES 中的 Array 引用类型是一组有序的数据，和其他强类型语言不同，每个槽位**可以存放任意类型的值**。Array 的长度时动态的，可以随着数据添加自动增长。数组最多可以包含 4 294 967 295 个元素。

#### 创建数组 of

数组可以通过构造函数和字面量创建，在使用构造函数创建时，可以接收一个 Number 类型参数，代表初始化数组大小，关键字 new 可以省略：

```js
let arr = new Array(10);
console.log(arr);       // [ <10 empty items> ]
```

也可以接收多个任意类型值，作为数组的元素：

```js
let arr = new Array(true, '2', 3);
console.log(arr);       // [ true, '2', 3 ]
```

但是有一个问题，如果要初始化一个只有一个 Number 类型元素的数组时，会出现歧义，此时可以使用 `of()`方法，接收一组参数，并将参数作为返回数组的元素：

```js
arr = Array(3);
console.log(arr);           // [ <3 empty items> ]

arr = Array.of(3);
console.log(arr);           // [ 3 ]
```

#### 转化类数组结构 from

**类数组结构**是类似于数组的数据结构类型，即任何**可迭代结构**，或是一个**拥有 length 属性并可索引**的结构，如 String、Map、Set 以及常用的函数内标准对象 arguments：

```js
console.log(Array.from('string'));      // [ 's', 't', 'r', 'i', 'n', 'g' ]

console.log(Array.from(new Map().set('1', 1).set('2', 2)));
// [ [ '1', 1 ], [ '2', 2 ] ]

console.log(Array.from({
    * [Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }
}));        // [ 1, 2, 3, 4 ]

function getArgsArray() {
    console.log(arguments);            // [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4 }
    return Array.from(arguments);
}

console.log(getArgsArray(1, 2, 3, 4)); // [1, 2, 3, 4]
```

`Array.from()`实际上是一种**浅拷贝**，返回的是一个新数组对象，但是内部元素是浅拷贝：

```js
let a = [[1], [2], [3]];
let b = Array.from(a);
console.log(a === b);
a[0][0] = 10;
console.log(b);			// [[10], [2], [3]]
```

`Array.from()`实际上可以接收三个参数，第二个参数为一个回调，接收类数组元素值作为参数，第三个参数用于提供回调中的 this 指向：

```js
console.log(Array.from([1, 2, 3, 4], v => v **= 2));
// [ 1, 4, 9, 16 ]
console.log(Array.from([1, 2, 3, 4], function (v) {
    return v **= this.exponent;
}, {exponent: 2}));
// [ 1, 4, 9, 16 ]
```

#### 数组空位

使用字面量创建数组时，可以留下空位，其中的值为 undefined：

```js
console.log([, , , , ,]);   // [ <5 empty items> ]
console.log([1, , , 4]);    // [ 1, <2 empty items>, 4 ]
console.log([1, , 4][1]);   // undefined
```

#### 数组索引

数组对象的可迭代索引是类型为 Number 的键，通过`[]`访问，和对象属性一样可以动态添加：

```js
let arr = [1, 2, 3];
console.log(arr[0]);        // 1
arr[5] = 10;
console.log(arr);           // [ 1, 2, 3, <2 empty items>, 10 ]
```

#### 数组长度 length

数组元素的长度保存在`length`属性中，长度包括空位：

```js
console.log([1, , , 4].length);   // 4
```

`length`**不是只读的**，更改其值会改变元素个数，应该避免误操作该属性：

```js
let arr = [1, 2, 3, 4, 5];
arr.length = 2;
console.log(arr);                 // [1, 2]
```

#### 检测数组 isArray

通常情况下，一个全局上下文中只有一个 Array 构造函数，因此要检测一个对象是否为数值类型，只需使用`instanceof`关键字。在一些场景下，一个网页中可能有多个全局上下文（如包含多个框架），如果**跨全局上下文传递数组对象**
，可能导致传递的数组对象在另一全局上下文中被视作非 Array 类型。`Array.isArray()`方法可以避免这个问题：

```js
console.log(Array.isArray([]));    // true
```

#### 迭代器方法

`keys()`用于返回数组对象的索引迭代器：

```js
let arr = ["foo", "bar", "baz", "qux"];
console.log(arr.keys());                // Object [Array Iterator] {}
console.log(Array.from(arr.keys()));    // [ 0, 1, 2, 3 ]
```

`values()`返回元素迭代器：

```js
console.log(Array.from(arr.values()));  // [ 'foo', 'bar', 'baz', 'qux' ]
```

`entires()`返回索引和值的数组迭代器：

```js
console.log(Array.from(arr.entries())); 	// [ [ 0, 'foo' ], [ 1, 'bar' ], [ 2, 'baz' ], [ 3, 'qux' ] ]
for (const [index, value] of arr.entries()) {
    console.log(index);         			// 0,1,2,3
    console.log(value);         			// foo,bar,baz,qux
}
```

#### 填充方法 fill

`fill()`方法用于使用指定值填充数组的一部分，不会改变数组原长度。第一个参数为用于填充的值，第二个可选参数为开始位置，默认0，第三个可选参数为结束位置（不填充该位置），默认为数组长度-1。参数为负数时从尾部计算位置。

```js
arr = [1, 2, 3, 4, 5];
console.log(arr.fill(6));                       // [ 6, 6, 6, 6, 6 ]
console.log(arr.fill(7, 1));            		// [ 6, 7, 7, 7, 7 ]
console.log(arr.fill(8, 2, 4));     			// [ 6, 7, 8, 8, 7 ]
```

#### 内部复制 copyWithin

`copyWithin()`方法用于在复制数组内部的一段元素并插入到内部指定位置，内部元素是**浅拷贝**：

```js
arr = [[1], 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr.copyWithin(3));                 		// [[1], 2, 3, [1], 2, 3, 4, 5, 6]
arr[0][0] = 10;
console.log(arr[0] === arr[3]);						  // true
console.log(arr);                                       // [[ 10 ], 2, 3, [ 10 ], 2, 3, 4, 5, 6]
```

只有一个参数时，从0开始复制，到参数指定位置（不包括该位置元素）结束，插入到该参数指定位置：

```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr.copyWithin(3));                 // [1, 2, 3, 1, 2, 3, 4, 5, 6]
```

两个参数时，第一个参数为插入位置，第二个为开始复制的位置，一直复制到底：

```js
console.log(arr.copyWithin(0, 5));         // [6, 7, 8, 9, 5, 6, 7, 8, 9]
```

三个参数时，第一个参数为插入位置，第二个参数为复制开始位置，第三个参数为复制结束位置（不包括该位置）：

```js
console.log(arr.copyWithin(4, 0, 3)); 	// [1, 2, 3, 4, 1, 2, 3, 8, 9]
```

#### 转换方法

转换方法继承自 Object，`valueOf()`返回数组本身，`toString()`返回一个字符串，该字符串由每个元素的等效字符串（toString 返回值）和逗号连接，`toLocalString()`
返回本地化结果。如果某项元素的转换值为 null 或 undefined，则以空字符串表示。

#### 栈方法

`pop()`和`push()`用于像栈一样操作数组元素。`push()`接收任意个数参数，按照顺序压入栈（从数组尾），返回压入个数。**数组尾相当于栈顶**，`pop()`返回并删除数组尾元素。

#### 队列方法

`shift()`用于出队操作，入队使用`push()`。**数组头相当于队头**，`shift()`返回数组第一个元素。`unshift()`执行和`shift()`相反操作，从队头依次压入元素：

```js
arr = [1];
arr.push(2, 3);
console.log(arr);               // [ 1, 2, 3 ]
arr = [1];
arr.unshift(2, 3);
console.log(arr);               // [ 2, 3, 1 ]
arr.shift();
console.log(arr);               // [ 3, 1 ]
```

#### 反向排列 reverse

`reverse()`方法用于倒转数组元素，返回数组本身。该方法会改变数组内容。

#### 排序 sort

`sort()`方法默认按升序重新排列数组，比较规则是调用转型函数 `String()`。可以传入一个比较函数作回调，回调接收两个参数代表比较双方，如果第一个参数应该排在第二个参数前面，就返回**负值**；如果两个参数相等，就**返回0**
；如果第一个参数应该排在第二个参数后面，就返回正值：

```js
// 升序
(value1, value2) => {
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
}

// 等价于该表达式
(a, b) => a < b ? 1 : a > b ? -1 : 0;

// 数值类型可以更加简化
(a, b) => a - b;
```

该方法返回排序后的数组自身。

#### 数组连接 concat

`concat()`用于连接数组并返回连接结果，不改变数组自身。参数是数组是会被打平，每个元素连接到目标数组上，非数组类型参数直接连接：

```js
arr = [1, 2, 3];
console.log(arr.concat([4, 5, 6], [7, 8]));     // [ 1, 2, 3, 4, 5, 6, 7, 8 ]
console.log(arr);                               // [ 1, 2, 3 ]
```

打平数组的行为在创建数组对象时可以改写，该属性用布尔值控制，使用内置符号访问：

```js
let colors = ["red", "green", "blue"];
let newColors = ["black", "brown"];
let moreNewColors = {
    [Symbol.isConcatSpreadable]: true,
    length: 2,
    0: "pink",
    1: "cyan"
};
newColors[Symbol.isConcatSpreadable] = false;
// 强制不打平数组
let colors2 = colors.concat("yellow", newColors);
// 强制打平类数组对象
let colors3 = colors.concat(moreNewColors);
console.log(colors); // ["red", "green", "blue"]
console.log(colors2); // ["red", "green", "blue", "yellow", ["black", "brown"]]
console.log(colors3); // ["red", "green", "blue", "pink", "cyan"]
```

#### 截取部分 slice

`slice()`方法返回截取的部分数组，不修改元素组，第一个参数为开始截取位置，第二个为结束位置（不包括该元素），默认数组长度：

```js
console.log([1, 2, 3, 4].slice());              // [ 1, 2, 3, 4 ]
console.log([1, 2, 3, 4].slice(1));             // [ 1, 2, 3 ]
console.log([1, 2, 3, 4].slice(1, 2));           // [ 2 ]
```

#### 插入、替换和删除 splice

`splice()`方法本身用于插入数组，也可用于替换与删除数组。接收三个或更多参数：开始插入位置、要删除的元素个数、插入内容（默认为空），插入内容不会被打平。该方法会修改原数组，返回从数组中删除的元素数组。

插入内容：

```js
arr = [1, 2, 3];
console.log(arr.splice(0, 2, 1, 2, 4, 5, [6, 7]));       // [ 1, 2 ]
console.log(arr);                   // [ 1, 2, 4, 5, [ 6, 7 ], 3 ]
```

替换内容，控制删除个数和插入个数一致即可：

```js
arr = [1, 2, 3];
arr.splice(0, 2, 9, 10);
console.log(arr);                   // [ 9, 10, 3 ]
```

删除内容，将第三个参数闲置即可：

```js
arr = [1, 2, 3];
arr.splice(1, 1);
console.log(arr);                   // [ 1, 3 ]
```

#### 严格相等搜索 indexOf includes

`includes()`、`indexOf()`和`lastIndexOf()`用于在数组内搜索指定元素，使用全等`===`比较。接收两个参数：需要查找的元素，可选的起始位置。`indexOf()`
从头开始查找，`lastIndexOf()`从末尾开始查找，如果存在元素则返回下标，不存在返回-1。`includes()`返回布尔值：

```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
alert(numbers.indexOf(4)); // 3
alert(numbers.lastIndexOf(4)); // 5
alert(numbers.includes(4)); // true
alert(numbers.indexOf(4, 4)); // 5
alert(numbers.lastIndexOf(4, 4)); // 3
alert(numbers.includes(4, 7)); // false
```

#### 断言函数搜索 find

`find()`方法使用一个断言函数进行搜索，该函数需要返回一个布尔值。回调接收三个参数：元素、下标、数组本身，当返回值为 true 时中断搜索。`find()`在找到目标时返回目标值，没有找到是返回
undefined。可以接收第二个参数，指定回调内部的 this。`findIndex()`方法返回下标，没有找到返回-1：

```js
console.log([1, 2, 3].find(value => value === 3));          // 3
console.log([1, 2, 3].find(value => value === 4));          // undefined
console.log([1, 2, 3].findIndex(value => value === 3));     // 2
console.log([1, 2, 3].findIndex(value => value === 4));     // -1
```

#### 迭代方法 every filter forEach map some

数组有五个迭代方法，这些方法接收一个回调，回调接收三个参数：元素、下标、数组本身。

+ `every()`：与连接，对数组每一项都运行传入的函数，如果对每一项函数都返回 true，则这个方法返回 true。
+ `filter()`：过滤元素，对数组每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回。
+ `forEach()`：遍历并执行，对数组每一项都运行传入的函数，没有返回值。
+ `map()`：遍历支线并保存结果，对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组。
+ `some()`：或连接，对数组每一项都运行传入的函数，如果有一项函数返回 true，则这个方法返回 true。

#### 归并方法 reduce

`reduce()`执行归并处理，参数为一个回调和初始归并值。回调接收四个参数：上一归并值、元素、下标、数组本身，并返回下一次调用时作为上一归并值的结果。如果没有指定初始归并值，则从数组第二个元素开始迭代.可以用累加来解释归并行为：

```js
let values = [1, 2, 3, 4, 5];
let sum = values.reduce((prev, cur, index, array) => prev + cur);
alert(sum); // 15
```

`reduceRight()`则是从尾部开始归并。

### 定型数组

新的 ES 增加**定型数组（typed array）**数据结构，用于提高向原生系统提交数据的效率。现代浏览器和 Node.js 所运行在的原生（native）操作系统一般是由汇编语言和 C 语言编写的，一些系统包括少部分 Java 代码。

ArrayBuffer 有些类似其他定型数组的“视图”，或可以将其称作内存的**指针**，即数据类型值和内存二进制内容的关系。**无法直接更改** ArrayBuffer 内容，只能通过更改其他定型数组值来改变其内容。

定型数组的来源和基于 Web 的图形 API 的引入有着很大的关系。WebGL 是根据 OpenGL ES 2.0 规范制定的，JavaScript 的双精度浮点数组向 WebGL 传递数据时都会发生类型转换，引发效率问题。定型数组提供的新数据类型可以解决向原生传递数据的效率问题。

#### ArrayBuffer

所有定型数组的基本单位是 **ArrayBuffer**，可以将其视作一种存储二进制数据的结构，本质是一串连续的内存空间。`ArrayBuffer()`构造函数的作用则是在内存中分配一定空间：

```js
const buf = new ArrayBuffer(16);
console.log(buf.byteLength);                // 16
```

ArrayBuffer 一旦创建就**不能改变大小**，但是可以将其一部分通过`slice`复制到另一个实例中，本质是新开辟一块内存并赋值内存内容，而不是引用绑定：

```js
const buf1 = new ArrayBuffer(8);
const buf2 = buf1.slice(4, 8);
console.log(buf2 === buf1.slice(4, 8));     // false
```

与 C 中的 `malloc()`不同，`ArrayBuffer()`分配的空间有以下特点：

+ 分配失败时抛出错误
+ 内存地址分配上限为`Number.MAX_SAFE_INTEGER`（即2^53^ - 1）字节
+ 会将分配的所有内存初始化为0
+ 会被垃圾回收机制自动回收

#### DataView

一种可以改变 ArrayBuffer 的视图是 **DataView**，即数据视图。该结构为文件与网络 I/O 设计，不能迭代，是对内存位的**直接操作**。DataView 必须基于已有的 ArrayBuffer 创建，可以使用全部或部分 ArrayBuffer ：

```js
const buf = new ArrayBuffer(16);

// 创建一个视图
const fullDataView = new DataView(buf);

// buffer属性是视图实际缓冲区的引用
console.log(fullDataView.buffer === buf);       // true

// byteOffset表示视图相对缓冲区的起点，0表示视图从缓冲区头部开始
console.log(fullDataView.byteOffset);           // 0
```

也可以选择一部分缓冲区构造视图：

```js
// 一半缓冲区的视图
const halfDataView = new DataView(buf, 8, 8);
console.log(halfDataView.byteOffset);           // 8
```

##### ElementType

存储在内存中的二进制本身不包含自身类型信息。在通过视图读写内存数据时，需要指定一个**元素类型（element type）**：

| ElementType | 字节 |         说明         |  对应 C 类型   |           取值范围           |
| :---------: | :--: | :------------------: | :------------: | :--------------------------: |
|    Int8     |  1   |    8 位有符号整数    |  signed char   |           -128~127           |
|    Uint8    |  1   |    8 位无符号整数    | unsigned char  |            0~255             |
|    Int16    |  2   |   16 位有符号整数    |     short      |        -32 768~32 767        |
|   Uint16    |  2   |   16 位无符号整数    | unsigned short |           0~65 535           |
|    Int32    |  4   |   32 位有符号整数    |      int       | -2 147 483 648~2 147 483 647 |
|   Uint32    |  4   |   32 位无符号整数    |  unsigned int  |       0~4 294 967 295        |
|   Float32   |  4   | 32 位IEEE-754 浮点数 |     float      |      -3.4e+38~+3.4e+38       |
|   Float64   |  8   | 64 位IEEE-754 浮点数 |     double     |     -1.7e+308~+1.7e+308      |

对于每种元素类型，DataView 都提供了对应的读写方法，以 UInt8 为例：

```js
const view = new DataView(new ArrayBuffer(1));
view.setUint8(0, 255);
console.log(view.buffer);                       	 //  <ff>
console.log(view.getUint8(0));      				// 255
```

在其他类型如 Uint16 中，可以指定需要的字节序。默认字节序为大端字节序，将最高有效位保存在第一个字节。

视图读写时必须有足够的缓冲区，否则将抛出错误。

#### 定型数组

通过 ES 的 DataView API 控制内存的效率不如**定型数组**，定型数组通过 ES API 向原生发送指令来控制内存。这些定型数组只能控制对应的 ElementType ，其名称也和元素类型相关。定型数组的类型名称为 ElementType + Array。定型数组操作方式类似于数组，以`Int32Array`为例：

```js
// 申请一个长度为6（6位数）的int32
const int32 = new Int32Array(6);

console.log(int32.length);                  // 6

// 每个int32数字占4个字节，因此其缓冲区占4*6个字节
console.log(int32.buffer.byteLength);       // 24
```

定型数组的操作类似数组，具体可以参考 [MDN 类型化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Typed_arrays)。

### Map

在 ES 6之前，键值对的映射数据结构类型的数据可以利用 Object 来存取。ES 6 中提出了**映射（Map）**专门支持键值对类型数据的存储，键可以为任意类型。

#### Map 与 Object 的区别

+ Map 支持所有数据类型作键，Object 只支持 Number、String、Symbol 类型作键，并且 Number 类型键会在实际构造时被转化为 String 
+ Map 会维护键值对的插入顺序，而 Object 可能重新排列成员
+ Object 的原型链上会挂载成员，因此有一些默认键值对存在，除非使用 `Object.create(null)`，因此向获取 Object 的实际长度比较复杂，Map 可以直接访问 size 属性获得
+ Object 不是可迭代类型，而 Map 定义了[Symbol.iterator]的生成器，可迭代，有`forEach()`方法
+ Map 重写了 `toString()`，因此只会打印出存储的数据，而不会打印出所有成员
+ Object 使用 `delete`操作符删除成员，且该操作会导致解释器生成一个新的隐藏类。Map 使用`delete()`方法删除一个键值对

#### 基本使用

构造函数`Map()`接收一个可迭代类型对象，该对象内的值为键值对数组，这些数组会按迭代顺序插入映射中。

利用数组构造一个映射：

```js
const m1 = new Map([
    ['key1', 'value'],
    // 出现重复键时新值覆盖旧值
    ['key1', 'value1'],
    ['key2', 'value2'],
    ['key3', 'value3'],
]);

console.log(m1);            // Map(3) { 'key1' => 'value1', 'key2' => 'value2', 'key3' => 'value3' }
```

利用自定义可迭代对象创建：

```js
const m2 = new Map({
    [Symbol.iterator]: function* () {
        for (let i = 1; i <= 3; i++) {
            yield [`key${i}`, `value${i}`];
        }
    }
});

console.log(m2);            // Map(3) { 'key1' => 'value1', 'key2' => 'value2', 'key3' => 'value3' }
```

使用`set`增加新的键值对，使用`has`检查键是否存在，使用`get`根据键获取值，使用`clear`清除所有内容，使用`delete`删除指定键：

```js
const m3 = new Map();
m3.set('key1', 'value1')
    .set('key2', 'value3')
    .set('key3', 'value3');
console.log(m3.has('key'));         	// false
console.log(m3.has('key1'));        	// true
console.log(m3.get('key'));             // undefined
console.log(m3.get('key1'));            // 'value1'

m3.delete('key1');
console.log(m3);                        // Map(2) { 'key2' => 'value3', 'key3' => 'value3' }
m3.clear();
console.log(m3);                        // Map(0) {}
```

#### 顺序与迭代

Map 与 Object 的**显著差异**之一是 Map 会维护键值对的插入顺序，而 Object 会自动调整键值对。因此在 Map 中可以按顺序进行跌打。

`entries()`方法返回一个 Map 的迭代器，[Symbol.iterator]引用了该方法：

```js
const iter = map.entries();
console.log(iter.next());       // { value: [ 'key1', 'value1' ], done: false }
console.log(iter.next());       // { value: [ 'key2', 'value2' ], done: false }
console.log(iter.next());       // { value: [ 'key3', 'value3' ], done: false }
console.log(iter.next());       // { value: undefined, done: true }

for (let iter of map.entries()) {
    console.log(iter);
    // [ 'key1', 'value1' ]
    // [ 'key2', 'value2' ]
    // [ 'key3', 'value3' ]
}
```

`forEach()`用于遍历元素：

```js
map.forEach((value, key, map) => console.log(value));
// value1
// value2
// value3
```

`keys()`返回键的迭代器：

```js
for (let key of map.keys()) {
    console.log(key);
}
```

`values()`返回值的迭代器：

```js
for (let value of map.values()) {
    console.log(value);
}
```

#### 选择 Map 还是 Object

在强调性能的场景如 canvas 开发中，有必要仔细选择 Map 或 Object 作为数据结构。

+ 内存：给定内存下，Map 可以比 Object 多存储50%的键值对
+ 插入：在 Map 中插入键值对的效率比 Object 要高，对 Object 执行插入可能导致解释器生成新的隐藏类
+ 查找：一些解释器会对 Object 进行查询优化，而 Map 不会。涉及大量数据查找的情况下，Object 的查找速度会更快。但是解释器在不断更新，以后可能会有对 Map 类型的查找优化
+ 删除：使用操作符删除 Object 成员会导致解释器生成新的隐藏类，因此一般建议将要删除的键的值设置为`null`或`undefined`，Map 的删除效率要比 Object 更高

### WeakMap

ES 6 的**弱映射（weak map）**与 Map 类似，“弱”指的是**垃圾回收**机制对其**键**的处理方式。WeakMap 的 API 是 Map 的 API 的子集。

#### 弱键

WeakMap 中的键被称为**弱键**，必须是 Object 或其派生类型。只要还有一个变量引用着引用类型值，这个引用类型值就不会被回收，而在引用类型值作为弱键时，键对该值是一种特殊的**弱引用**，垃圾回收机制不会将该引用视作一般的引用，因此弱引用不会阻止垃圾回收。

在某个对象上存储数据时，如果数据是引用类型值，则对象对该值会有一个引用。以 DOM 元素为例子，如果将一个 DOM 元素作为弱映射的键，在该 DOM 消失并不存在引用后，弱映射中对应的键值对会自动被清除：

```html
<script>
    let node = document.getElementById('node');
    const wm = new WeakMap([
        [node, 'node']
    ]);
    console.log(wm);
    setTimeout(() => {
        node.remove();
        node = null;
        console.log(wm);
    }, 2000);
    // 浏览器的垃圾回收机制是按一定周期或在特定条件下进行的，因此弱映射内容并不一定会被马上清理
    // 但是一旦失去引用，键值对就会在下一周期被清除
</script>
```

#### 不可迭代键

由于弱映射中的元素在任何时刻都可能被销毁，因此没有必要提供迭代功能，也就没有迭代方法，因此不能通过遍历获取值，只能通过键来获取值。此外，也没有`clear`方法，因为无需一次清除所有内容，但是可以使用`delete`清除指定键值对。

之所以要用引用类型值作键，是因为无法区分两个值相同的原始类型值是否为同一“值”，因为它们间的关系不是引用。

### Set

ES 6新增了**集合（Set）**类型，Set 类似 Map，是 Map 的加强版，不需要键值对结构，元素唯一。

#### 基本使用

构造函数`Set`接收一个可迭代对象，自动剔除重复元素：

```js
const s = new Set([
    // 原始值重复会被剔除
    1, 1, 2, 3,
    // 对象都是独一无二的，因此是不同的引用类型值
    {v: 1},
    {v: 1},
    {v: 2},
    {v: 3},
]);

console.log(s);             // Set(7) { 1, 2, 3, { v: 1 }, { v: 1 }, { v: 2 }, { v: 3 } }
```

初始化之后，可以使用`add()`增加值，使用`has()`查询，通过`size`取得元素数量，以及使用`delete()`和`clear()`删除元素：

```js
const set = new Set();
set.add(1)
    .add(2)
    .add(3)
    .add({v: 1});
console.log(set.has(1));            // true
console.log(set.has({v: 1}));       // false，如果要删除集合中的引用类型值，该值需要有其他引用
set.delete(1);
set.delete({v: 1});
console.log(set);                   // Set(3) { 2, 3, { v: 1 } }
```

#### 顺序与迭代

集合也会维护元素插入顺序，并可迭代。集合元素不是键值对的数据结构，为了保持迭代相关 API 的统一，这些方法使用上相同，但结果和其他可迭代对象有区别：

```js
for (const key of set.keys()) {
    console.log(key);
    // 2
    // 3
    // { v: 1 }
    // 不存在键值对，一律返回值
}

for (const value of set.values()) {
    console.log(value);
    // 2
    // 3
    // { v: 1 }
    // 不存在键值对，一律返回值
}

for (const item of set.entries()) {
    console.log(item);
    // [ 2, 2 ]
    // [ 3, 3 ]
    // [ { v: 1 }, { v: 1 } ]
    // 不存在键值对，以键值对形式返回值和值
}

set.forEach((value, value2, set) => console.log(value === value2));
// true
// true
// true
// 不存在键值对，因此第二个参数从索引变为值本身
```

#### 扩展集合

ES 中提供的集合缺少一些基本数学集合运算方法，可以通过继承原生集合实现一个扩展的集合来支持这些操作。扩展集合应该支持以下原则：

+ 数学运算方法应该能处理任意多个集合
+ 扩展的集合应该保留原始集合插入顺序
+ 通过展开操作符来简化语句并提高效率
+ 不能修改已有的集合实例，类似二元操作符

实现一个扩展集合：

```js
class XSet extends Set {
    union(...sets) {
        return XSet.union(this, ...sets)
    }

    intersection(...sets) {
        return XSet.intersection(this, ...sets);
    }

    difference(set) {
        return XSet.difference(this, set);
    }

    symmetricDifference(set) {
        return XSet.symmetricDifference(this, set);
    }

    cartesianProduct(set) {
        return XSet.cartesianProduct(this, set);
    }

    powerSet() {
        return XSet.powerSet(this);
    }

    // 返回两个或更多集合的并集
    static union(a, ...bSets) {
        const unionSet = new XSet(a);
        for (const b of bSets) {
            for (const bValue of b) {
                unionSet.add(bValue);
            }
        }
        return unionSet;
    }

    // 返回两个或更多集合的交集
    static intersection(a, ...bSets) {
        const intersectionSet = new XSet(a);
        for (const aValue of intersectionSet) {
            for (const b of bSets) {
                if (!b.has(aValue)) {
                    intersectionSet.delete(aValue);
                }
            }
        }
        return intersectionSet;
    }

    // 返回两个集合的差集
    static difference(a, b) {
        const differenceSet = new XSet(a);
        for (const bValue of b) {
            if (a.has(bValue)) {
                differenceSet.delete(bValue);
            }
        }
        return differenceSet;
    }

    // 返回两个集合的对称差集
    static symmetricDifference(a, b) {
        // 按照定义，对称差集可以表达为
        return a.union(b).difference(a.intersection(b));
    }

    // 返回两个集合（数组对形式）的笛卡儿积
    // 必须返回数组集合，因为笛卡儿积可能包含相同值的对
    static cartesianProduct(a, b) {
        const cartesianProductSet = new XSet();
        for (const aValue of a) {
            for (const bValue of b) {
                cartesianProductSet.add([aValue, bValue]);
            }
        }
        return cartesianProductSet;
    }

    // 返回一个集合的幂集
    static powerSet(a) {
        const powerSet = new XSet().add(new XSet());
        for (const aValue of a) {
            for (const set of new XSet(powerSet)) {
                powerSet.add(new XSet(set).add(aValue));
            }
        }
        return powerSet;
    }
}

const xs1 = new XSet([
    1, 2, 3
]);

const xs2 = new XSet([
    2, 3, 4
]);

console.log(XSet.union(xs1, xs2));          	// XSet(4) [Set] { 1, 2, 3, 4 }
console.log(XSet.intersection(xs1, xs2));   	// XSet(2) [Set] { 2, 3 }
console.log(XSet.difference(xs1, xs2));         // XSet(1) [Set] { 1 }
console.log(XSet.difference(xs2, xs1));         // XSet(1) [Set] { 4 }
```

### WeakSet

ES 6的**弱集合（weak set）**和弱映射类似，“弱”是对集合中值的描述。WeakSet 的 API 是 Set 的子集。元素只能是引用类型值。

#### 弱值

和弱键类似，弱值对其中元素的引用是弱引用，在值不存在其他引用后，弱值会被自动清除。以 DOM 元素为例：

```html
<div id="node">node</div>
<script>
    let node = document.getElementById('node');
    const ws = new WeakSet([
        node
    ]);
    console.log(ws);
    setTimeout(() => {
        node.remove();
        node = null;
        console.log(ws);
    }, 2000);
    // 浏览器的垃圾回收机制是按一定周期或在特定条件下进行的，因此弱集合内容并不一定会被马上清理
    // 但是一旦失去引用，值就会在下一周期被清除
</script>
```

#### 不可迭代值

由于元素可能在任何时候被清除，没有必要向弱集合提供迭代功能和清除全部功能。

>ES 的引用类型类似传统面向对象语言中的类，但有着不同的实现
>
>Object 是基础引用类型，其他引用类型都从 Object 派生
>
>ArrayBuffer 用于申请一块内存空间作为缓冲区，DataView 则是缓冲区的视图，只能通过视图操作缓冲区内存
>
>定型数组也称类型化数组，用于通过原生按一定数据类型规则操作内存读写
>
>Map 是比 Object 更高效的键值对数据类型，按键值对映射结构存储数据
>
>WeakMap 对键的引用是弱引用，实际只是对值的引用，垃圾回收不将其对键的弱引用视为引用
>
>Set 是集合数据类型，会自动剔除重复元素，数学集合运算可以在 Set 之上实现
>
>WeakSet 对值的引用是弱引用，不会影响垃圾回收

---

## 07 迭代器和生成器

迭代（iteration）在软件领域中指按照顺序反复执行一段程序。ECMAScript 6 中新增了两个特性：**迭代器**和**生成器**来实现迭代操作，而不用关心内部实现。

#### 什么是迭代

迭代一般有明确的终止条件，条件循环 for 和 while 语句就是一种迭代，而循环是迭代的基础。迭代会在一个有序集合上进行，使用数组进行迭代是常见场景，但并不适用于所有场景，一些数据结构不一定支持显示顺序的遍历。

早在 ES 5中就已经提出了 forEach 用于可迭代对象的遍历，但是没有办法终止整个循环（实际上可以通过抛出异常来结束代码块运行，但是这么做不符合异常处理语句的语义，并且可能造成代码阅读问题）。为了能够使用通用的迭代器模式，ES 6 引入了迭代器 API 。

#### 迭代器

可迭代对象（iterable）是一种抽象，可以是**聚合对象**的一种，也可以只是简单的计数循环对象。**迭代器（iterator）**是按需创建的一次性对象，通过操作迭代器来访问聚合对象中包含的其他元素，从而实现可迭代对象和迭代器的分离。

##### 可迭代协议

ES 中规定了一个可迭代协议，要求实现了可迭代接口的类需要有两种能力：

+ 支持迭代的自我识别
+ 创建实现了迭代器接口的对象的能力，即需要有一个方法返回一个自身容器的迭代器

这意味着必须暴露一个方法返回迭代器，这个方法**必须**以`Symbol.iterator`为键，且引用一个工厂函数返回迭代器。

一些 ES 原生类实现了可迭代接口：

+ String
+ Array
+ Map
+ Set
+ 标准内置对象 arguments
+ 一些 DOM 集合类型

可以通过检查是否存在默认迭代器属性来确认一个类型是否支持迭代：

```js
let num = 1;
let obj = {};
// 这两种类型没有实现迭代器工厂函数
console.log(num[Symbol.iterator]); // undefined
console.log(obj[Symbol.iterator]); // undefined
let str = 'abc';
let arr = ['a', 'b', 'c'];
let map = new Map().set('a', 1).set('b', 2).set('c', 3);
let set = new Set().add('a').add('b').add('c');
let els = document.querySelectorAll('div');
// 这些类型都实现了迭代器工厂函数
console.log(str[Symbol.iterator]); // f values() { [native code] }
console.log(arr[Symbol.iterator]); // f values() { [native code] }
console.log(map[Symbol.iterator]); // f values() { [native code] }
console.log(set[Symbol.iterator]); // f values() { [native code] }
console.log(els[Symbol.iterator]); // f values() { [native code] }
// 调用这个工厂函数会生成一个迭代器
console.log(str[Symbol.iterator]()); // StringIterator {}
console.log(arr[Symbol.iterator]()); // ArrayIterator {}
console.log(map[Symbol.iterator]()); // MapIterator {}
console.log(set[Symbol.iterator]()); // SetIterator {}
console.log(els[Symbol.iterator]()); // ArrayIterator {}
```

实际使用时**不需要**去手动调用该方法，原生语句和 API 在接收可迭代对象时会自动调用该方法：

+ for-of：of 关键字接收一个可迭代对象并调用默认迭代方法
+ 数组解构：数组解构语句自动调用迭代方法
+ 展开操作符：展开操作符`...`会自动调用迭代方法并返回所有元素
+ 一些原生 API ：`Array.from()`、`Set()`、`Map()`、`Promise.all()`、`Promise.race()`接收一个可迭代对象，自动调用其迭代方法并处理所有元素
+ `yield*`操作符：在生成器中接收一个可迭代对象，并在迭代中按顺序返回所有元素

只要实现了键为`Symbol.iterator`的接口，并让其返回一个迭代器对象，该类型就满足可迭代协议。

##### 迭代器协议

迭代器是一种一次性对象，按照 ES 6的迭代器协议，迭代器类型需要实现`next()`方法。

每个迭代器都**必须**有一个`next()`方法，这个方法**必须**返回一个`IteratorResult`对象，该对象包含两个属性：

+ `done`：是否全部迭代完毕，为`true`时的状态称为**耗尽**
+ `value`：当前元素。当`done`为`true`时值为`undefined`，之后所有调用都是该结构

```js
const arr = ['foo', 'bar'];
const iter = arr.entries();             // 相当于调用[Symbol.iterator]

console.log(iter.next());               // { value: [ 0, 'foo' ], done: false }
console.log(iter.next());               // { value: [ 1, 'bar' ], done: false }
console.log(iter.next());               // { value: undefined, done: true }
```

迭代器模式中的迭代器负责维护自己的指针，因此每个迭代器的迭代过程与其他迭代器无关。此外，迭代器并不与其被创建时的迭代对象状态所绑定，即不会在生成迭代器时生成一个迭代对象的快照，迭代器永远只访问原迭代对象的引用。

##### 自定义迭代器

手动实现一个只能迭代一次的可迭代对象：

```js
class Foo {
    // 可迭代对象必须实现该方法
    [Symbol.iterator]() {
        // 必须返回一个迭代器
        return {
            // 迭代器必须实现该方法
            next() {
                // 必须返回一个IteratorResult
                return {done: true, value: undefined};
            }
        }
    }
}

// 由于第一次迭代就返回true，因此什么都不会打印
// 如果没有实现迭代器协议内容，会抛出错误
for (let i of new Foo()) {
    console.log(i);
}
```

##### 提前终止迭代器

迭代器中可选的`return()`方法用于指定迭代器提前关闭时应该执行的逻辑。提前关闭的情况可能有：

+ for-of 中的`break`、`continue`、`return`、`throw`导致的提前退出
+ 解构操作没有消费所有值

`return()`必须返回一个`IteratorResult`对象。

许多原生可迭代对象并没有实现可选的`return()`接口。对于自定义迭代器，原生 ES 语句在调用这些迭代器时，提前退出会尝试自动调用`return()`：

```js
class Bar {
    count = 0;

    [Symbol.iterator]() {
        return {
            next: () => {
                this.count++;
                return this.count <= 3 ? {done: false, value: this.count} : {done: true, value: undefined}
            },
            return: () => {
                console.log('exiting early');
                return {done: true, value: undefined};
            }
        }
    }
}

for (let i of new Bar()) {
    console.log(i);
    // 1
    // 2
    // 3
}

for (let i of new Bar()) {
    console.log(i);
    break;
    // 1
    // exiting early
}
```

调用`return()`并**不能**关闭迭代器，只能提前退出，接下来还可迭代：

```js
const bar = new Bar();

for (let i of bar) {
    console.log(i);
    break;
    // 1
    // exiting early
}

for (let i of bar) {
    console.log(i);
    // 2
    // 3
}
```

#### 生成器

ES 6中的另一个新增特性是**生成器（generator）**。生成器拥有暂停内部代码并恢复执行的能力，利用生成器不仅可以**自定义迭代器**，甚至能够实现**协程**。

##### 基本语法

生成器是一个**函数**，在函数名称前加一个星号（*）表示它是一个生成器，生成器不能使用兰姆达表达式表示：

```js
// 生成器函数声明
function* generatorFn() {}
// 生成器函数表达式
let generatorFn = function* () {}
// 作为对象字面量方法的生成器函数
let foo = {
	* generatorFn() {}
}
// 作为类实例方法的生成器函数
class Foo {
	* generatorFn() {}
}
// 作为类静态方法的生成器函数
class Bar {
	static * generatorFn() {}
}
```

生成器函数会返回一个**生成器对象**，这个对象一开始处于**暂停执行（suspended）**状态。生成器对象实现了迭代器接口，因此有一个`next()`方法，执行该方法会让生成器开始或恢复执行，直到下一次`yield`。此外，生成器内部代码**不会**在生成器对象创立时就执行，直到第一次调用`next()`：

```js
function* generatorFn() {
console.log('foobar');
}
// 初次调用生成器函数并不会打印日志
let generatorObject = generatorFn();
generatorObject.next(); // foobar
```

生成器的默认迭代器是自引用：

```js
console.log(generatorFn());
// generatorFn {<suspended>}
console.log(generatorFn()[Symbol.iterator]());
// generatorFn {<suspended>}
```

##### 中断执行

`yield`关键字将中断生成器函数内部代码的执行，并保留其中作用域的状态，并只能通过`next()`方法恢复执行。`yield`关键字还会返回接收的表达式执行的值，该值会包含在`next()`的返回值中：

```js
function* generatorFn() {
yield 'foo';
yield 'bar';
return 'baz';
}
let generatorObject = generatorFn();
console.log(generatorObject.next()); // { done: false, value: 'foo' }
console.log(generatorObject.next()); // { done: false, value: 'bar' }
```

和迭代器不同，生成器函数可以有一个返回值，`return`后方的表达式结果将作为迭代结束时`IteratorResult`对象的`value`属性被**返回**：

```js
console.log(generatorObject.next()); // { done: true, value: 'baz' }
```

和迭代器一样，生成器函数创建的每个生成器都是互相独立的。

```js
function* generatorFn() {
yield 'foo';
yield 'bar';
return 'baz';
}
let generatorObject1 = generatorFn();
let generatorObject2 = generatorFn();
console.log(generatorObject1.next()); // { done: false, value: 'foo' }
console.log(generatorObject2.next()); // { done: false, value: 'foo' }
```

`yield`**只能**在生成器内部使用，在其他任何地方使用都会抛出错误，比如生成器函数内部的一个回调函数或定义的函数：

```js
// 有效
function* validGeneratorFn() {
	yield;
}
// 无效
function* invalidGeneratorFnA() {
    function a() {
    	yield;
    }
}
// 无效
function* invalidGeneratorFnB() {
    const b = () => {
    	yield;
    }
}
// 无效
function* invalidGeneratorFnC() {
	(() => {
		yield;
	})();
}
```

##### 作可迭代对象

显示调用`next()`方法比较麻烦，可以使用原生语句结构隐式调用该方法，将生成器做迭代器使用：

```js
function* generatorFn() {
    yield 1;
    yield 2;
    yield 3;
}
for (const x of generatorFn()) {
	console.log(x);
}
// 1
// 2
// 3
```

##### 中间参数

`yield`会返回一个值，该值是通过生成器的`next()`方法的第一个参数传入的，起到中间参数的作用。第一次调用的`next()`参数不会被传入，因为没有任何`yield`会去接收这个值：

```js
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
```

##### yield*

`yield*`用于接收一个可迭代对象，接下来会按可迭代对象的迭代顺序返回其中元素：

```js
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
```

`yield*`会将可迭代对象**最后一次**调用`next()`时返回的`IteratorResult`的`value`作为返回值：

```js
function* generatorFn() {
	console.log('iter value:', yield* [1, 2, 3]);
}
for (const x of generatorFn()) {
	console.log('value:', x);
}
// value: 1
// value: 2
// value: 3
// iter value: undefined，原生Array在迭代结束时返回{done: true, value: undefined}，因此yield*也返回undefined

function* innerGeneratorFn() {
    yield 'foo';
    return 'bar';
}
function* outerGeneratorFn(genObj) {
	console.log('iter value:', yield* innerGeneratorFn());
}
for (const x of outerGeneratorFn()) {
	console.log('value:', x);
}
// value: foo
// iter value: bar，生成器结束时会返回‘bar’，做迭代器使用时会传给yield*
```

##### 提前终止生成器

和迭代器不同，每个生成器都实现了`return()`方法，该方法接收一个参数作为生成器终止时的返回值。和自定义迭代器不同，生成器终止后将进入**关闭（closed）**状态，之后的迭代都将返回 true，而自定义迭代器还可以继续迭代直到结束：

```js
function* Gen() {
    yield* [1, 2, 3, 4];
}

const gen = Gen();
console.log(gen.next());                    // { value: 1, done: false }
console.log(gen.return('ok'));          	// { value: 'ok', done: true }
console.log(gen.next());                    // { value: undefined, done: true }
console.log(gen);                           // Gen {<closed>}
```

##### 异常处理

生成器对象可以接收一个外部传入的错误对象，并在生成器函数内部代码中处理，这个错误对象将会被`yield`返回。如果不处理该对象生成器将关闭：

```js
function* generatorFn() {
    for (const x of [1, 2, 3]) {
    	yield x;
    }
}
const g = generatorFn();
console.log(g); 			// generatorFn {<suspended>}
// 在外部处理错误
try {
	g.throw('foo');
} catch (e) {
	console.log(e); 		// foo
}
console.log(g); 			// generatorFn {<closed>}
```

在内部处理错误，如果一个`yield`返回一个错误并被处理，这个`yield`到下个`yield`间的代码**不会执行**：

```js
function* generatorFn() {
for (const x of [1, 2, 3]) {
        try {
            yield x;
        } catch(e) {}
    }
}

const g = generatorFn();
console.log(g.next()); // { done: false, value: 1}
g.throw('foo');
console.log(g.next()); // { done: false, value: 3}
```

如果生成器还未开始执行就调用`throw()`，相当于在外部抛出一个错误。

> 迭代器模式是一种设计模式，用于获取关联的聚合对象中包含的其他元素，而不暴露聚合对象其他内部成员
>
> ECMAScript 中生成器可以快速生成一个迭代器，也可用于实现用户协程
>
> 可迭代对象必须实现[Symbol.iterator]方法，该方法必须返回一个迭代器
>
> 迭代器必须实现 next 方法，此外有可选的 return 和 throw 用于终止迭代与向内部传递错误
>
> 原生结构语句与一些 API 会自动调用迭代器相关方法

---

## 08 对象、类与面向对象编程

和其他面向对象语言不同，ECMAScript 将对象定义为**一组属性的无序集合**，每个属性和方法都用一个名称来标识。可以将对象看作一张**哈希表**，其中的内容就是**键值对**。

### 对象

创建自定义对象有两种方法，第一种是实例化一个空对象，然后在空对象上挂载属性和方法：

```js
let person = new Object();
person.name = "Nicholas";
person.age = 29;
person.job = "Software Engineer";
person.sayName = function() {
	console.log(this.name);
};
```

另一种方法是直接使用对象字面量创建，这种方式更高效：

```js
let person = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
    	console.log(this.name);
    }
};
```

#### 属性的类型

ECMAScript 使用一些内部特性来描述属性的特征，开发者不能直接访问这些特征，但是可以在浏览器控制台中观察这些特征的打印结果。这些内部特性会用两个方括号包装起来表示，如`[[Enumerable]]`。

##### 数据属性

一些语言将**数据属性**称为字段。数据属性有一个保存数据值的位置，以及4个描述数据属性行为的**元属性**：

+ `[[Configurable]]`：表示属性是否可以通过`delete`关键字删除并重新定义、是否可以修改它的特性、是否可以更改为访问器属性。默认情况下自定义对象的属性的该属性值为 true，而大多数原生对象的该属性为 false
+ `[[Enumerable]]`：表示该属性是否为可枚举，即是否可以为 for-in 循环返回。默认情况下自定义对象的属性的该属性值为 true，而原生 Object 的原型上的属性的该属性为 false
+ `[[Writable]]`：表示该属性值是否可以被修改。默认情况下自定义对象的属性的该属性值为 true
+ `[[Value]]`：包含属性的值，没有初始化的属性值都为`undefined`

要修改这些属性，需要调用`Obejct.defineProperty`方法，该方法接收三个参数：要定义属性的对象、属性名、和描述符对象。如果`[[Configurable]]`为 false，调用该方法会抛出错误。

```js
const steven = {};

// 数据属性
Object.defineProperty(steven, 'name', {
    value: 'Steven',
    configurable: true,
    writable: false,
    enumerable: true
});
```

和字面量与直接挂载的方式不同，在调用Object.defineProperty()时，`configurable`、`enumerable` 和`writable` 的值如果不指定，默认会为 false 。

##### 访问器属性

一些语言将**访问器属性**称为属性，通过公有的属性访问私有的字段。访问器属性包含两个可选的**获取（getter）**和**设置（setter）**方法，以及两个属性：

+ `[[Configurable]]`：表示属性是否可以通过`delete`关键字删除并重新定义、是否可以修改它的特性、是否可以更改为数据属性，默认为 true
+ `[[Enumerable]]`：表示该属性是否为可枚举，即是否可以为 for-in 循环返回。默认情况下自定义对象的属性的该属性值为 true
+ `[[Get]]`：getter，返回属性实际值，默认为`undefined`
+ `[[Set]]`：setter，设置属性实际值，默认为`undefined`

访问器属性**只能**通过`Obejct.defineProperty`定义：

```js
// 访问器属性
steven._age = undefined;
Object.defineProperty(steven, 'age', {
    get() {
        return `age: ${this._age}`;
    },
    set(v) {
        if (typeof v === "number") {
            this._age = v;
        }
    }
});
steven.age = 21;
console.log(steven.age);                // age: 21
```

如果一个访问器属性没有 setter，则是只读的，尝试修改将会忽略；如果没有 getter，则不可访问，尝试获取返回 undefined，严格模式下抛出错误。

#### 定义多个属性

`Object.defineProperties()`可以用来定义多个对象的属性，第一个参数为要定义的属性，第二个参数为一个对象，包含要定义的属性与描述符的键值对：

```js
let book = {};
Object.defineProperties(book, {
    year_: {
    	value: 2017
    },
    edition: {
    	value: 1
    },
    year: {
    	get() {
    		return this.year_;
    	},
        set(newValue) {
    		if (newValue > 2017) {
    			this.year_ = newValue;
    			this.edition += newValue - 2017;
    		}
    	}
    }
});	
```

#### 读取属性的特性

虽然属性的特性没有办法被直接访问，但是通过`Object.getOwnPropertyDescriptor()`方法可以获取属性的描述符：

```js
// 获取属性描述符
console.log(Object.getOwnPropertyDescriptor(steven, 'age'));
// {
//   get: [Function: get],
//   set: [Function: set],
//   enumerable: false,
//   configurable: false
// }
```

ES 8中还提出了`Object.getOwnPropertyDescriptors()`，用于获得所有属性的描述符：

```js
console.log(Object.getOwnPropertyDescriptors(steven));
// {
//   name: {
//     value: 'Steven',
//     writable: false,
//     enumerable: true,
//     configurable: true
//   },
//   _age: { value: 21, writable: true, enumerable: true, configurable: true },
//   age: {
//     get: [Function: get],
//     set: [Function: set],
//     enumerable: false,
//     configurable: false
//   }
// }
```

#### 合并对象

有时需要将两个对象合并（merge），这种操作也称为混入（mixin）。

`Object.assign()`用于合并两个对象，这个方法接收一个目标对象和一个或多个源对象作为参数，然后将每个源对象中**可枚举**（`Object.propertyIsEnumerable()`返回 true）和**自有**（`Object.hasOwnProperty()`返回 true）属性复制到目标对象。以字符串和符号为键的属性会被复制。对每个符合条件的属性，这个方法会使用源对象上的`[[Get]]`取得属性的值，然后使用目标对象上的`[[Set]]`设置属性的值。

该方法会**直接**将源对象组合并到目标对象，而不是返回一个合并结果对象，将返回目标对象的引用。如果遇到同名属性，则保留**最后一个**同名属性值。此外，这种复制是一种**浅拷贝**：

```js
const a = {
    name: 'a',
    a: 'a',
    obj: {
        name: 'a obj'
    }
}

const b = {
    name: 'b',
    b: 'b',
    obj: {
        name: 'b obj'
    }
}

Object.assign(a, b);

console.log(a);                         // { name: 'b', a: 'a', obj: { name: 'b obj' }, b: 'b' }
b.b = 'B';
b.obj.name = 'B OBJ';
console.log(a);                         // { name: 'b', a: 'a', obj: { name: 'B OBJ' }, b: 'b' }
```

#### 对象相等判定

使用全等判断操作符能解决大部分相等判断问题，但在不同的 JavaScript 引擎中可能有不同。并且判断`NaN`需要调用全局对象下的一个方法：

```js
// 不同引擎中的结果不一定相同
console.log(0 === -0);          // true
console.log(0 === +0);          // true
console.log(+0 === -0);         // true

// 判断NaN
console.log(NaN === NaN);       // false
console.log(isNaN(NaN));        // true
```

`Object.is()`方法可以改善一些情况：

```js
console.log(Object.is(0, -0));          // false
console.log(Object.is(0, +0));          // true
console.log(Object.is(+0, -0));         // false

console.log(Object.is(NaN, NaN));       // true
```

#### 增强的对象语法

ES 6增强了对象语法，可以是代码变得更加简洁。

同名属性值简写：如果要用一个变量在对象字面量中初始化一个属性，且两者是同名的，可以直接简写：

```js
let name = 'Steven';
let person = {
    name
};
console.log(person);            // { name: 'Steven' }
```

动态命名属性：对象字面量初始化中的属性名现在可以动态指定，即字面量中的属性名可以是一个表达式，用中括号语法包围一个将返回 Number、String 或 Symbol 类型值的表达式。注意，如果表达式内部出错，对象创建将终止。

```js
let ageTag = 'a' + 'g' + 'e';

person = {
    ['name']: 'Steven',
    [ageTag]: 21
};
console.log(person);
```

方法简写：方法不再需要使用`function`声明：

```js
let person = {
    sayName(name) {
    	console.log(`My name is ${name}`);
    }
};
```

#### 对象解构

ES 6新增对象解构语法。解构语法中分**模式**和**变量**，声明的是变量，而模式则是对象属性的引用，在字面两中体现为冒号前的是模式，冒号后的是变量，不管在多复杂的解构语句中，声明的变量永远在冒号后面。如果模式和变量同名则不用特别引用：

```js
let obj = {
    name: 'obj',
    value: 10
}

let {name /*模式*/: objName /*变量*/, value} = obj;
console.log(objName);
console.log(value);
```

解构还可以同时指定默认值，避免解构失败无返回：

```js
let obj1 = {
    name: 'obj1'
};
let obj2 = {};
let {name: name1} = obj1;
let {name: name2 = 'obj2'} = obj2;
console.log(name1);
console.log(name2);
```

解构语句的右值在解构前会被转换成对象，因此原始值也会被包装，但是不能对`null`和`undefined`解构：

```js
let {length} = 'string';
console.log(length);                    // 6

let { constructor: c } = 4;
console.log(c === Number);              // true
```

变量的声明不一定要在解构语句中，但是如果要给一个声明过的变量从解构中赋值，解构语句需要被括号包裹：

```js
({name: objName} = obj);
```

解构是一种**浅拷贝**：

```js
let {v, v: {value: vv}} = obj3;
obj3.v.value = 20;
console.log(vv);                        // 10
console.log(v);                         // { value: 20 }
```

假如解构过程中发生错误，会停止解构。

解构还可以用在函数原型中：

```js
let obj = {
    name: 'obj',
    value: 10
};
const fun = ({name}) => console.log(name);
fun(obj);                       			// obj
```

### 复用对象

在 ES 6之前，复用对象有以下几种方式：

+ 工厂模式
+ 构造函数模式
+ 原型模式
+ 对象迭代

在 ES 6中新推出了类语法，虽然本质上是构造函数模式和继承的一种语法糖，但是建议之后都使用类语法进行面向对象编程，原先的几种模式都存在一些问题。可以说，虽然 ES 6之前能够面向对象地编程，但 ES 的面向对象机制始终是不完整的，甚至到 ES 2020 都还没有提出完整的面向对象编程方式，ES 中的面向对象只能是一种模拟，而一些保留的关键字将为未来 ES 的面向对象做准备。下方介绍 ES 6之前的对象复用模式。

#### 工厂模式

工厂模式是设计模式的一种，通过用户输入决定最终组装对象的组成。在 ECMAScript 中，基本思想是让一个函数接收几个用户参数，然后在函数内部组装一个新对象并返回：

```js
const createPerson = (name, age) => {
    const p = {
        name,
        age
    };

    // 注意this指向
    p.sayHello = function () {
        console.log(this.name);
    }

    return p;
};

let steven = createPerson('Steven', 20);
steven.sayHello();                      // Steven
console.log(typeof steven);             // object
```

工厂模式虽然能复用对象，但是**没有解决对象标识的问题**，即没有类型。

#### 构造函数模式

构造函数模式和工厂模式由一些不同：

+ 函数内没有显示创建对象
+ 对象的属性和方法直接赋值给 this
+ 没有 return
+ 依照规范，构造函数大驼峰命名

```js
// 注意this指向，表达式中的this指向Global，因此不要尝试用lambda创建构造函数
// 构造函数中的this指向构造函数自身，而普通函数中的this也指向Global
function Person(name, age) {
    this.name = name ?? 'unknown';
    this.age = age ?? 0;
    this.sayHello = function () {
        console.log(this.name);
    }
}

// new
const steven = new Person('Steven', 20);
const anonymous = new Person();
steven.sayHello();                  // Steven
anonymous.sayHello();               // unknown
console.log(typeof steven);         // object
```

在使用构造函数实例化一个对象时，`new`关键字做了以下**事情**：

1. 在内存中创建一个新对象
2. 新对象内部的`[[Prototype]]`被赋值为构造函数的`prototype`属性（函数也是对象，其`prototype`为`Object.prototype`的引用）
3. 构造函数中的`this`被赋值为新对象的引用（这就是为什么这些属性实际挂载到了对象上的原因）
4. 执行构造函数中的代码
5. 如果构造函数返回非空对象，则返回这个非空对象（此时构造函数实际上不是构造函数）；否则返回新对象

构造函数构造的对象的原型上将有一个`constructor`属性，这个属性将**指向**构造函数：

```js
console.log(steven.constructor === Person);         // true
```

`constructor`确实能用来标识对象类型，但是使用`instanceof`操作符**判断对象类型**更可靠：

```js
console.log(steven instanceof Person);              // true
```

构造函数和普通函数的唯一区别在于调用方式的不同，如果不使用`new`关键字调用构造函数就和调用普通函数一样，因为**构造函数也是普通函数**。普通函数中的 this 将**始终指向**`Global`对象，在全局作用域下不使用`new`调用按照构造函数模式创建的函数会让一些属性被挂载到`Global`，在浏览器中为`window`对象上：

```js
// 普通函数中的this永远指向Global对象，而不是上下文
function f1() {
    console.log(this);          // Global
}

function f2() {
    (function () {
        console.log(this);      // 依旧是Global
    })()
}

f1();
f2();
```

构造函数的主要问题是其内部代码会在构造每个对象时都被执行一遍，包括函数对象的挂载。在其他面向对象语言中，静态成员和成员函数都只会被初始化一次，而 ES 中的函数也是对象，每次调用构造函数都会创建一个函数对象并挂载：

```js
console.log(steven.sayHello === anonymous.sayHello);        // false
```

解决这个问题的办法是将函数定义在构造函数外部并在构造函数内部引用它，但这会导致外部上下文中的标识符问题，还可能会被误调用。要解决这个问题需要使用原型模式。

#### 原型模式

原型模式也是一种设计模式，该设计模式的基本思想是在需要时通过复制原型来创建一个新对象，并在这个对象上添加新的成员，从而减少不必要的类定义。这也是为什么ES 中实际上**没有类**的概念的原因。ES 不是完整的面向对象语言，因此使用原型来模拟类。

每个**函数**都会创建一个唯一的**原型对象**`prototype`，这个对象包含特定引用实例将**共享**的属性和方法，类似静态成员。调用构造函数时`new`关键字会将函数的原型对象引用赋值给创建的对象的原型，因此起到共享的作用：

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 函数原型上挂载的方法中的this指向函数，这个this在调用构造函数时会被重新指向新创建的对象
Person.prototype.sayHello = function () {
    console.log(this.name);
}

const steven = new Person('Steven', 20);
const bob = new Person('Bob', 18);
steven.sayHello();                                      // Steven
bob.sayHello();                                         // Bob
console.log(steven.sayHello === bob.sayHello);          // true
```

##### 原型

###### 函数的原型

在创建函数对象时，**始终**会为该函数创建一个`prototype`**属性**，并指向一个`Prototype`对象。该原型对象会自动获得一个`constructor`**属性**，并且该属性会自动指向与之关联的构造函数。

在自定义构造函数时，原型对象默认只会有`constructor`属性，原型对象上的其他所有方法都**继承自**`Object`函数的原型（`Object`本身也有一个`constructor`属性，这个属性不会被继承。此外`Object`的原型的原型是`null`）。

###### 对象的原型

而每个**实例**被创建时，实例内部的`[[Prototype]]`指针会指向相对应的构造函数的`prototype`。在实例中**无法访问**这个`[[Prototype]]`，ES 规范没有定义访问实例中该属性的方法，但是浏览器中的 JavaScript 可能会在实例上提供一个`__proto__`属性来访问对象的原型。

###### 对象实例和构造函数的关系

因此，实例和构造函数的关系**仅在**它们拥有同一个**原型对象**`Prototype`的引用上，在函数中它为`prototype`，在实例对象中它为`[[Prototype]]`。两者之间**没有**其他任何关系。

###### 原型和对象实例的关系

原型和对象实例的关系**仅在**对象实例内部的`[[Prototype]]`属性引用了原型，可以**通过对象实例直接访问原型上的成员**，以及实例对象方法体中的`this`也可以访问原型上的成员。

###### 原型和构造函数的关系

当函数被创建时，也会创建一个`Prototype`**原型对象**，函数的`prototype`属性会指向该原型对象，两者的**生命周期**是相同的。

###### 判断原型

构造函数的`prototype.isPrototypeOf()`用于判断给定参数是否和实例对象是同一个原型。注意**必须通过原型调用**该方法，否则调用的将会是`Object.prototype.isPrototypeOf()`，大部分情况这将返回`false`：

```js
console.log(Person.isPrototypeOf(bob));              // false，实际上调用了Object.prototype.isPrototypeOf()
console.log(Person.prototype.isPrototypeOf(bob));    // true
```

###### 获取原型

内部属性`[[Prototype]]`无法直接访问，但是可以通过`Object.getPrototypeOf()`获取原型对象的引用： 

```js
console.log(Object.getPrototypeOf(steven) === Person.prototype);        // true
console.log(Object.getPrototypeOf(steven).sayHello);                    // Function
```

###### 重写原型

`Object.setPrototypeOf()`方法可以重写一个对象的原型，但是因为会改变所有共享原型对象的状态，这个方法的调用可能会严重影响代码性能。第一个参数为要被重写的对象，第二个参数为用于重写的原型对象。

```js
// 重写原型
let obj1 = {
    name: 'obj1'
}
let obj2 = {
    value: 10
}

Object.setPrototypeOf(obj1, obj2);
console.log(Object.getPrototypeOf(obj1));           // { value: 10 }，obj2成为了一个原型对象
```

###### 指定原型创建对象

`Object.create()`方法用于将一个指定的对象作为原型来创建一个新的对象，该方法接收一个必选参数作为新对象的原型：

```js
// 指定原型创建对象
let normalObj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(normalObj) === Object.prototype);     // true
let nullObj = Object.create(null);
console.log(Object.getPrototypeOf(nullObj));                            // null
let person = Object.create(Person.prototype);                           // 相当于调用构造函数
console.log(Person.prototype.isPrototypeOf(person));                    // true
```

##### 原型层级

如前面所说，通过对象引用可以访问到对象`[[Prototype]]`上的属性与方法，这是因为在 ECMAScript 中访问对象属性时有一种**层级关系**，这个关系类似于作用域链，有就近访问的特性。当访问对象的属性或方法时，ES 会：

+ 寻找对象本身是否有该属性或方法，如果有则返回
+ 如果对象本身没有该属性或方法，查找原型上是否有，如果有则返回
+ 如果对象的原型对象上也没有该属性或方法，查找对象的原型对象是否有`[[Prototype]]`属性，如果有，查找原型对象的原型上是否有该属性或方法，有则返回

因此，当对象上有和其原型上同名的成员时，对象上的成员会**遮蔽（shadow）**原型上的成员，在其他面向对象语言中也叫做**隐藏**。

```js
let obj1 = {
    name: 'obj1',
    value: 10,
};

Object.defineProperty(obj1, '_value', {
    enumerable: false,
    value: 20
})

let obj2 = Object.create(obj1);
obj2.name = 'obj2';                 // 遮蔽

let obj3 = Object.create(obj2);
obj3.name = 'obj3';                 // 遮蔽

console.log(obj1.name);             // obj1
console.log(obj2.name);             // obj2
console.log(obj3.name);             // obj3

console.log(obj3.value);            // 10，相当于obj3[[Prototype]][[Prototype]].value
console.log(Object.getPrototypeOf(Object.getPrototypeOf(obj3)).value);      // 10
console.log(obj3._value);           // 20，不可枚举但可访问
```

因为对象引用语句（包括 for-in 结构）会隐式访问原型上的成员，可以使用`Object.hasOwnProperty()`实例方法检测一个成员是否为实例的成员：

```js
// 对象引用和for-in语句会将原型上的成员（[[Enumerable]]属性为true）也遍历出来
for (let v in obj3) {
    console.log(v);
    // name
    // value
}

// 检查是否是为自身成员而非原型成员
for (let v in obj3) {
    if (obj3.hasOwnProperty(v)) console.log(v);
    // name
}
```

#### 其他注意事项

##### 使用对象字面量来设置函数的原型

为构造函数指定原型时，如果每个表达式只为原型指定一个成员，每次都会重写所有相关对象的原型。为了程序运行效率，在**初次**为原型定义多个成员时，且对应的构造函数**没有进行原型链继承时**，考虑使用对象字面量：

```js
function Person() {}
Person.prototype = {
    name: "Steven",
    age: 20,
};
```

但是这么做有一个**问题**，函数原型在创建时会被自动赋予一个`constructor`属性，使用对象字面量赋值相当于使用一个新的对象覆盖原型，因此新原型不会包含指向构造函数的`constructor`。虽然`instanceof`关键字仍然可以正确判断实例对应的构造函数，但是无法通过`constructor`判别。

如果`constructor`属性很重要，则可以手动在字面量中指定，但其`[[Enumerable]]`会为 true，默认`constructor`是不可枚举的。要避免这个问题，使用`Object.defineProperty()`。

##### 原型是动态的

任何对象上的`[[Prototype]]`属性都是一个引用，因此对对象公有的原型进行修改会反应到所有原型上。

而实例的原型永远指向已经存在的`Prototype`对象，并不会随着构造函数原型的覆盖而重新指向新的原型对象，也就是说对原型对象的**直接覆盖不是一种重写**。因此，在使用对象字面量覆盖构造函数原来的原型时，在覆盖之前创建的实例并不能访问这个新原型对象上的成员：

```js
function Person() {}
let man = new Person();
Person.prototype = {
    name: 'Steven',
    age: 20,
    sayName() {
        console.log(this.name);
    }
};
Object.defineProperty(man,'constructor', {
    value: Person,
    enumerable: false
});
man.sayName(); // 错误
```

尽量**只在作初始化工作时**用字面量覆盖原型，而不是已经有实例被创建后。

##### 修改原生对象的原型

所有原生引用类型都在其原型上定义了静态方法，通过在这些引用类型构造函数上追加成员，可以在整个全局上下文中任意位置调用他们。但是**不推荐在生产环境中这么做**，因为这样做很可能会导致命名冲突，假如未来的 ES 标准定义了同名接口，代码就会出错。

##### 原型的问题

原型模式本是面向对象设计模式的一种，可以减少类的定义并动态产生对象，是对面向对象的一种功能性扩充。但是使用原型模式并不能完全地模拟面向对象，即使一些解释器内部逻辑有类似面向对象的地方（如隐藏类），这些问题可能会在将来的 ES 标准中讨论并解决。

### 对象成员迭代

#### in 和 for-in

`in`操作符既可以在 for-in 结构中使用，也可以单独使用。`in`是一个**二元操作符**，期待两个参数：对象成员的键值或引用与对象的引用变量。只要可以通过对象访问到该成员（**无论**是否为对象成员或原型上的成员），就返回 true：

```js
let obj1 = {
    name: 'obj1',
    value: 10,
};

let obj2 = Object.create(obj1);
obj2.name = 'obj2';

console.log('name' in obj2);            // true
console.log('value' in obj2);           // true
```

可以利用`in`和`hasOwnProperty()`来判断可以访问的一个成员是否为原型上的成员（包括同名覆盖时）：

```js
// 检测访问到的成员是否为原型上的成员
let hasPrototypeProperty = (obj, ref) => !obj.hasOwnProperty(ref) && ref in obj;

console.log(hasPrototypeProperty(obj2, 'name'));        // false
console.log(hasPrototypeProperty(obj2, 'value'));       // true
```

`in`也能访问原型上`[[Enumerable]]`为 false 的不可枚举成员，但是 for-in 不会将其遍历。

#### Object.keys()

`Object.keys()`可以获得一个对象**自身可枚举的成员**键值的数组，不包括原型上的成员，可以用来代替 for-in ：

```js
let obj1 = {
    name: 'obj1',
    value: 10
}

Object.defineProperty(obj1, '_value', {
    enumerable: false
})

let obj2 = Object.create(obj1);
obj2.name = 'obj2';
obj2.say = () => console.log('obj2');
Object.defineProperty(obj2, '__value', {
    enumerable: false,
    value: 20
});
console.log(Object.keys(obj2));                 // [ 'name', 'say' ]
```

#### Object.getOwnPropertyNames()

`Object.getOwnPropertyNames()`用于获取**所有对象自身成员**对应的键值，与是否可枚举无关，可以用来代替 for-in ：

```js
console.log(Object.getOwnPropertyNames(obj2));                 // [ 'name', 'say', '__value' ]
```

#### 关于枚举顺序

for-in 循环和`Object.keys()`的枚举顺序是**不确定**的，取决于解释器引擎，而`Object.getOwnPropertyNames()`、`Object.getOwnPropertySymbols()`和`Object.assign()`（成员复制顺序）的枚举顺序是确定性的。

#### Object.values()

`Object.values()`接收一个对象，并返回可枚举成员的值的数组，值为**浅拷贝**，符号属性会被忽略：

```js
let obj = {
    name: 'obj',
    value: 10,
    say() {},
    [Symbol('private')]: 'private'
}

Object.defineProperty(obj, '_value', {
    value: 20,
    enumerable: false
});

console.log(Object.values(obj));        // [ 'obj', 10, [Function: say] ]
```

#### Object.entries()

`Object.entries()`接收一个对象，并返回可枚举成员的键值对数组，值为**浅拷贝**，符号属性会被忽略：

```js
let obj = {
    name: 'obj',
    value: 10,
    say() {},
    [Symbol('private')]: 'private'
}

Object.defineProperty(obj, '_value', {
    value: 20,
    enumerable: false
});

console.log(Object.entries(obj));        // [ [ 'name', 'obj' ], [ 'value', 10 ], [ 'say', [Function: say] ] ]
```

### 继承

即使原型模式下的面向对象不完整，也没有原生操作能够快速进行实现**继承**（实际上 Node.js 的 util 库中有一个方法`inherits`用于快速实现继承），并且不存在接口继承，因为 ECMAScript 中的函数没有签名（一些语言中称为函数原型）。因此实现继承成为了 ES 中的唯一继承方式，在 ES 6前，有一些办法来模拟类的实现继承。事实上这部分可以直接跳过，因为 ES 6`extends`操作符更加强大，没有必要再去使用过时的方法，但是考虑到可能的旧项目维护问题，也可以阅读此节。

#### 原型链

ECMAScript 将**原型链**定义为主要的继承方式。其主要思想是通过原型继承多个引用类型的属性和方法。

```js
function Base() {
    this.name = 'Base';
}

function Derived() {
    this.name = 'Derived';
}

// 继承
Derived.prototype = new Base();

let b = new Base();
let d = new Derived();
console.log(b.name);            // Base
console.log(d.name);            // Derived
```

继承语句中发生了：

1. 创建了一个 Base 类型对象（base）
2. base 的原型指向了 Base 的原型，即 Object 的原型
3. Base 函数体中的 this 指向 base，挂载实例成员
4. Derived 的原型被指定为 base，因此 Derived 实例化的对象将拥有和 Base 一样的实例成员（变为新对象原型上的静态成员）和原型

前面已经提高过**原型层级**关系，在引用对象成员时，会通过原型链不断查找所有原型链中对象上是否存在引用的对象。关于原型链，还有一些需要关注的地方。

##### 默认原型

默认情况下，所有原型都继承自`Object`构造函数（或者说类），这也是通过原型链实现的：

```js
let obj = {};
console.log(Object.getPrototypeOf(obj) === Object.prototype);   // true
```

除非这么做：

```js
let obj = Object.create({});
console.log(Object.getPrototypeOf(obj) === Object.prototype);   // false
```

事实上使用任意一个对象（除了构造函数`Object()`的`prototype`外）作参数都有同样效果，因为`Object.create()`接收的参数会作为创建的对象的原型对象。如果这么做，新建的对象就不是继承自`Object`了。但是**不建议在生产环境中这么做**，因为有太多的情况下我们会在任意一个可能的对象上调用`Object.prototype`中的成员，这么做很容易引发运行时错误，并且基本没有人会对`Object.prototype`上的成员做空检查。

##### 原型链与继承关系

`instanceof`操作符会在指定参数能在指定对象上被调用时返回 true，而在正常情况下构造函数位于原型链中，因此使用任意一基类（或者说继承的构造函数）标识符进行检测，都能得到 true。

第二种检查继承关系的方法则是使用`Object.isPrototypeOf()`实例方法，当参数位于原型链中时返回 true。

##### 虚方法重写

如果要实现类似虚函数重写的效果（也称函数覆盖），重写基类虚函数（在 ES 中为原型链上的方法）的函数也必须定义在新的构造函数的原型上，否则当新的构造函数被继承时其派生构造函数创建的对象还是会访问到原型链中之前的方法。即：**虚方法重写（函数覆盖）必须在原型链上进行**。

此外，这些方法还需等到原型链继承语句执行后再挂载到原型链上，否则也会被覆盖：

```js
Derived.prototype = new Base();

// 继承后再挂载
Derived.prototype.say = function () {};
```

##### 原型链断裂

在复用对象一节的其他注意事项中已经说明，对象的`[[Prototype]]`属性引用的是被创建时的原型对象，而不会自动指向新覆盖函数原型的原型对象。如果直接覆盖函数原型对象，会导致接下来实例化的对象的原型链断裂。

##### 原型链的其他问题

一般在原型链上定义属性来模拟静态属性，当静态属性为引用类型值时需要注意对其他已存在对象的影响，就像对待静态属性一样。而原型链继承会导致被继承的构造函数中定义的所有成员都变成静态成员，无法进行实例成员继承。

此外，仅靠原型链，派生类对象实例化时无法向基类构造函数传递参数，因为构造函数继承语句发生在构造函数定义上。

#### 盗用构造函数

为了解决实例成员继承的问题，可以使用一种叫作**盗用构造函数（constructor stealing）**的方法，这种方法也被称为**对象伪装**或**经典继承**。其基本思路是派生类将在构造函数中调用基类构造函数，就像“经典”面向对象语言中的做的那样。

通过调用函数的`call()`或`apply()`方法，改变派生类构造函数中基类构造函数的内部 this 指向，并向基类构造函数传递参数：

```js
function Base(name) {
    this.name = name;
    this.type = 'Base';
}

function Derived(name) {
    // 改变Base函数体内部this指向
    Base.call(this, name);
    this.type = 'Derived';
}

let obj = new Derived('obj');
console.log(obj.name);                  // obj
```

盗用构造函数的**问题**很明显，无法继承基类构造函数原型链上的成员，因为在派生类构造函数中挂载的只有基类构造函数体内的成员，基类构造函数是作为普通函数调用的，不存在`new`将要执行的过程。而且基类和派生类实际上并没有继承关系，`instanceof`无法进行类型判别：

```js
console.log(obj instanceof Base);       // false
```

#### 组合继承

过去 JavaScript 中使用的最多的继承模式是**组合继承**，组合继承即使用原型链继承，也使用盗用构造函数模式，既可以向基类构造函数传参，又可以继承实例和静态成员：

```js
function Base(name = 'base') {
    this.name = name;
}

function Derived(name) {
    // 继承实例成员
    Base.call(this, name);
}

// 继承静态成员
Derived.prototype = new Base();

Base.prototype.say = function () {
    console.log(this.name);
};
Base.prototype.type = 'Base';

let obj = new Derived('obj');
console.log(obj.name);                  // obj
obj.say();                              // obj
console.log(obj.type);                  // Base
```

组合继承虽然弥补了两种方式的不足，但也带来另一个问题：不仅将基类构造函数中的定义的成员继承了过来，还把这些成员变成了原型上的成员，虽然访问时并不会有语义和指向问题，但是浪费了一些运行资源：

```js
// 原型和实例中都有name属性
console.log(Object.getPrototypeOf(obj).name);   // base
console.log(obj.name);                          // obj 
```

#### 原型式继承

这种方法来自于 Douglas Crockford 的一篇文章：《JavaScript 中的原型式继承》（[Prototypal Inheritance inJavaScript](https://www.crockford.com/javascript/prototypal.html)）。该方法不涉及全局上的构造函数的定义，只会涉及到一个临时的构造函数。原型式继承需要使用下方函数：

```js
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
```

使用时：

```js
let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
let yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie"
```

这种方式其实和`Object.create()`的设计一样，ES 5将原型式继承进行了规范化，一般只有在非常老的项目中会见到这种方法的使用。Douglas Crockford 还提出了寄生式继承，并有对其的改进方式寄生式组合继承，这两种方法在实践中并不常见，可以参考《Professional JavaScript for Web Developers》的8.3.5和8.3.6节。

### 类

终于，ECMAScript 6中正式提出了`class`关键字，用于在 ES 中编写传统面向对象风格的面向对象程序。相关的操作符极大的简化了 ES 中的面向对象实现，虽然这也只是一种由解释器提供并进行了内部优化的语法糖，最后的程序员实际能看到的还是原型模式下的结构。如果要进行面向对象风格的编程，最好使用相关操作符。

#### 类的定义

类声明语句和函数声明语句类似，有表达式和声明两种类型：

```js
// 类声明
class Person {}
// 类表达式
const Animal = class {};
```

但是和函数表达式不同，类声明语句**不会**进行变量提升，只能在声明后被引用。并且函数受函数作用域限制，**类受块作用域限制**，也会引起重定义错误。

下面介绍类的组成部分，会包含一些较新的特性，截至这部分内容撰写时（2021.10.10）一些老版本浏览器（甚至包括最新版本）可能没有实现。关于类的后续动态可以关注该页面：[MDN 类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes) 。

#### 静态成员初始化块

类的静态成员初始化块（Class static initialization blocks）是 ES 13（ES 2022）提议中的一部分，用于初始化静态成员，有些类似于一些语言中的静态成员构造函数：

```js
class ClassWithStaticInitializationBlock {
  static staticProperty1 = "Property 1";
  static staticProperty2;
  static {
    this.staticProperty2 = "Property 2"
  }
}

console.log(ClassWithStaticInitializationBlock.staticProperty1);	// "Property 1"
console.log(ClassWithStaticInitializationBlock.staticProperty2);	// "Property 2"
```

#### 构造函数

`constructor`关键字用于在类内部定义一个构造函数，使用`new`关键字实例化对象时会调用它。构造函数在没有继承时可以不显式定义，解释器会自动生成一个空的构造函数。

##### new 和实例化

实例化一个类的对象和实例化一个构造函数操作类似：

```js
class Vegetable {
    constructor(name) {
        this.type = 'Vegetable';
        this.name = name;
    }
}

let vegeta = new Vegetable('Vegeta');
console.log(vegeta);        // Vegetable { type: 'Vegetable', name: 'Vegeta' }
```

实例化类对象时，`new`操作符做了：

1. 在内存中创建一个新对象
2. 新对象内部的`[[Prototype]]`指针被赋值为构造函数（类）的`prototype`属性
3. 类构造函数内部 this 指向新对象
4. 执行构造函数内代码
5. 如果构造函数返回非空对象，则返回该对象，否则返回创建的新对象

这和构造函数实例化过程几乎没有区别，事实上`class`确实声明了一个新的构造函数。与普通构造函数的区别在于，使用类声明的构造函数时必须使用`new`关键字。

##### 类也是函数

类实际上也是一种函数，并且具有原型，原型的`constructor`指向类自身（不是指向类构造函数）：

```js
console.log(typeof Vegetable);                  // function
console.log(Vegetable.prototype);               // {constructor: class Vegetable}
console.log(Vegetable.prototype.constructor);   // class Vegetable
```

`instanceof`可以用来判断实例类型：

```js
console.log(new Vegetable('Kakarot') instanceof Vegetable);     // true
```

类的`constructor`属性（不是原型上那个）在进行类型判断时不会被当做构造函数：

```js
console.log(vegeta instanceof Vegetable.constructor);               // false
```

类可以立即实例化：

```js
let kakarot =new class Vegetable {
    constructor(name) {
        this.type = 'Vegetable';
        this.name = name;
    }
}('Kakarot');
```

类可作参数传递：

```js
((c) => console.log(new c('Kakarot')))(Vegetable);	// Vegetable { type: 'Vegetable', name: 'Kakarot' }
```

#### 实例成员

在类内部声明或构造函数中挂载到 this 上的成员即是实例成员，函数成员将在所有对象中共享，而不是每次实例化都创建一个函数对象：

```js
class Animal {
    constructor() {
        // 实例成员
        this.cry = function () {
        }
    }

    // 实例成员
    name;
}
```

#### 静态成员

使用`static`关键字声明或在类定义外部挂载到原型上的成员即为静态成员：

```js
// 静态成员
static type = 'Animal';
```

#### 可访问性

默认情况下定义的成员都是公有的，想让一个成员成为私有成员，在标识符前加上一个井号`#`，调用私有成员时也需要写上`#`：

```js
// 私有成员
#_instanceCount;
```

#### 访问器

类中也可以定义属性的 getter 和 setter：

```js
// 访问器
get instanceCount() {
    return this.#_instanceCount;
}

set instanceCount(v) {
    this.#_instanceCount = v;
}
```

#### 迭代方法

可以在类中定义生成器方法和默认的迭代方法，让类变成可迭代类：

```js
// 可迭代类
class Iterable {
    item = [1, 2, 3, 4, 5, 6];

    // 生成器方法
    * createNumberIterator() {
        yield* this.item;
    }

    // 实现默认迭代方法
    [Symbol.iterator]() {
        return this.item.values();
    }
}

let iter = new Iterable();

for (let v of iter.createNumberIterator()) {
    console.log(v);             // 1,2,3,4,5,6
}

for (let v of iter) {
    console.log(v);             // 1,2,3,4,5,6
}
```

### 继承

在 ES 6中可以很方便地使用`extends`实现单继承和多继承：

```js
class Animal {
    type = 'Animal'
}

class Human extends Animal {
    type = 'Human';
}

console.log(new Human().type);      // Human
```

一个类可以继承任何拥有`[[Constructor]]`和`[[Prototype]]`的对象，因此可以直接继承 ES 6之前的构造函数，保证向下兼容，之前的`XSet`就是一个例子。

#### 构造函数、HomeObject 和 super 指针

派生类可以通过`super`指针引用它们的原型对象，即基类，并访问原型上的成员。该关键字只能在派生类的构造函数和方法中使用。

如果一个派生类显式定义了构造函数，则必须在函数体内调用基类构造函数（不管基类构造函数是否有参或有显式定义的构造函数），并需要位于函数体顶端（即 this 不能在 `super()`前使用）：

```js
class Animal {
    type = 'Animal'
}

class Human extends Animal {
    constructor(name) {
        // 必须调用基类构造函数，并位于作用域顶端
        super();
        super.type;

        this.name = name;
    }

    type = 'Human';
}

console.log(new Human('Steven').type);      // Human
```

类的构造函数和静态方法有一个内部特性`[[HomeObject]]`，该属性指向定义该方法的对象。因此`super`始终指向`[[HomeObject]]`的原型，而`super()`则会调用`[[HomeObject]]`的`[[Constructor]]`。

`super` 可以做以下事情：

+ 访问类的原型，即基类，但是**不能单独使用**该关键字，必须引用其成员
+ 调用基类构造函数，并将基类构造函数体中的 this 指向调用它的派生类
+ 向基类构造函数传递参数

#### 抽象类

ES 中还没有专门的语法实现抽象类，但是可以通过`new.target`模拟。`new.target`保存通过`new`调用的类或函数，可以用于检测一个类是否用于实例化自身的对象：

```js
class Animal {
    constructor() {
        if (new.target === Animal) throw new Error('Abstract class cannot be instantiated.');
    }
}

try {
    new Animal();
} catch (e) {
    console.error(e.message);           // Abstract class cannot be instantiated.
}
```

`Animal`是一个不该被实例化的抽象类，通过`new.target`进行检测，如果自身被用于实例化则抛出错误，而派生类被实例化则不会：

```js
class Human extends Animal {
}

new Human();
```

也可以进行抽象方法检测：

```js
if (!this.eat) throw new Error('Inheriting class must define abstract method eat().');
```

#### 继承原生类型

原生类型的构造函数也可以出现在继承列表中，继承内置类型的新类型可以实现一些新方法：

```js
class SuperArray extends Array {
shuffle() {
    // 洗牌算法
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        	[this[i], this[j]] = [this[j], this[i]];
        }
    }
}
let a = new SuperArray(1, 2, 3, 4, 5);
console.log(a instanceof Array); // true
console.log(a instanceof SuperArray); // true
console.log(a); // [1, 2, 3, 4, 5]
a.shuffle();
console.log(a); // [3, 1, 4, 5, 2]
```

一些原生类型的方法可能会返回一个新实例，由于派生类构造函数调用了基类构造函数，并将基类构造函数中的 this 指向了派生类对象，这些新的实例也将为派生类类型：

```js
class SuperArray extends Array {}
let a1 = new SuperArray(1, 2, 3, 4, 5);
let a2 = a1.filter(x => !!(x % 2))
console.log(a1); // [1, 2, 3, 4, 5]
console.log(a2); // [1, 3, 5]
console.log(a1 instanceof SuperArray); // true
console.log(a2 instanceof SuperArray); // true
```

这一默认行为是可以覆盖的，如果只需要返回一个内置类型的对象，可以覆盖 getter `[Symbol.species]`，决定**返回对象的类型**：

```js
class SuperArray extends Array {
    static get [Symbol.species]() {
    	return Array;
    }
}
let a1 = new SuperArray(1, 2, 3, 4, 5);
let a2 = a1.filter(x => !!(x % 2))
console.log(a1); // [1, 2, 3, 4, 5]
console.log(a2); // [1, 3, 5]
console.log(a1 instanceof SuperArray); // true
console.log(a2 instanceof SuperArray); // false
```

由于 ECMAScript 本身是动态类型的，实际编程过程中使用**组合模式**（类似混入（mixin），将一些属性和方法放到单独的类中，在使用时将它们的对象组合起来形成一个新对象使用）可能更加有效。组合的对象不是任何一个类的派生类，更加灵活，也反映了“**组合胜过继承**（composition over inheritance）”的设计原则。ES 6虽然没有定义专门的混入关键字，但是可以使用`Object.assign()`进行对象组合。

>对象是一组属性的无序集合，属性可以是数据属性和访问器属性
>
>在过去，复用对象的模式有工厂模式、构造函数模式和原型模式
>
>在过去，实现对象继承可以使用原型链模式、盗用构造函数、组合继承等方式
>
>ES 6 标准提出了类的概念，本质上还是原型，但是极大简化了面向对象编程
>
>ES 的面向对象始终是不完整的，可能会在将来标准中逐渐完善

---

## 09 代理与反射

代理模式是一种设计模式，主要思想是在操作目标对象前使用另一个对象拦截这些操作并加以修改，最终将这些修改后的操作反应到目标对象上。ECMAScript 提供的 Proxy 和 Reflect API 实现了这一设计模式。代理和反射的功能实际上非常强大，甚至可以利用它们实现一些内置操作符的重载。

### 使用代理和反射

#### 创建代理

代理使用`Proxy`构造函数创建，该函数接收两个参数，**目标代理对象（target）**和**代理处理程序对象（handler）**：

```js
let obj = {name: 'obj'};
let proxy = new Proxy(obj, {});

console.log(proxy.name);
console.log(obj.name);

// 对代理对象的操作同样会影响目标
proxy.name = 'proxy obj';
console.log(proxy.name);
console.log(obj.name);

// 调用代理的方法最终会映射到目标上
console.log(proxy.hasOwnProperty('name'));      // true
```

在代理对象上执行的任何操作都会**映射**到目标对象上，对代理对象操作就像对目标对象操作一样。此外，由于构造函数`Proxy`**没有原型**，无法通过`instanceof`操作符检测一个对象是否为代理类型。想要分辨一个对象是否为代理，使用`instanceof`是不可行的，因为该操作会映射到目标对象上，但是可以使用严格相等运算符进行判断：

```js
// 利用严格相等运算符区分目标和代理
console.log(proxy instanceof Object);   // true
console.log(obj === proxy);             // false
```

#### 捕获器

代理构造函数的第二个参数为一个处理程序对象，包含一些**捕获器（trap）**方法。每个处理程序对象可以包含0个或多个捕获器，每种捕获器对应一种在目标对象上的**操作**，如访问操作对应的捕获器方法为`get`：

```js
// 捕获器trap是目标对象基本操作的拦截器，每种捕获器对应一种操作，不会出现重复捕获情况
let obj = {
    name: 'obj',
    type: 'Object'
}

let proxy = new Proxy(obj, {
    // 对代理执行get操作，被处理程序对象handler的捕获器get拦截
    // get捕获器会接收三个参数，目标对象、被查询的属性键值（一般为string）和代理对象
    get(trapTarget, property, receiver) {
        console.log(typeof property);       // string
        return trapTarget[property] += '[handled]';
    }
})

console.log(obj.name);                      // obj
console.log(obj.type)                       // Object
console.log(proxy.name);                    // obj[handled]
console.log(proxy.type);                    // Object[handled]
```

#### 反射

`Global`对象有一个属性`Reflect`对象，**反射**对象提供了一组和捕获器方法同名的方法，它们具有相同的函数原型，这些方法**和原生操作有一样的行为**。利用反射上的方法，可以快速在捕获器中对对目标对象的操作进行处理：

```js
// 利用反射，可以不用手动在捕获器中重现对象的方法，Proxy一般配合Reflect一起使用
let obj = {
    foo: 'foo',
    bar: 'bar'
}

let proxy = new Proxy(obj, {
    get(target, prop, proxy) {
        // 反射对象的方法拥有和捕获器同样的函数原型，因此可以直接传入相同的参数
        // return Reflect.get(...arguments);	// 不加处理，像原生的行为一样返回操作结果

        // 对返回值进行处理
        return Reflect.get(...arguments) + '[from proxy]';
    }
})

console.log(proxy.foo);     // foo[from proxy]
console.log(obj.foo);       // foo
```

由于和代理处理程序对象有着一样的接口，反射对象可以作为一个不做任何捕获处理的代理的处理程序，在构造函数中直接传入：

```js
// 如果要获取一个没有自定义捕获器的代理，可以直接传入Reflect
let noDecorationProxy = new Proxy(obj, Reflect);
```

#### 捕获器不变式

所有的捕获器都需要遵守一些相关的接口规定，称为**捕获器不变式（trap invariant）**：

+ 每个捕获器方法的方法名必须对应一种操作
+ 每个捕获器方法都能够获取目标对象和代理对象的引用
+ 每个捕获器方法都不能违反目标对象内部的规则

比如，如果一个目标对象有不可配置且不可写的属性，捕获器不能违反这些规则操作目标对象，否则会抛出错误：

```js
let obj = {};
Object.defineProperty(obj, 'name', {
    writable: false,
    configurable: false,
    value: 'unwritable'
})

let proxy = new Proxy(obj, {
    get() {
        return Reflect.get(...arguments) + '[from proxy]';
    }
})

// 如果捕获器尝试改变一个不可配置和不可写的属性，会抛出TypeError
try {
    console.log(proxy.name);
} catch (e) {
    console.log(e.message);
}
```

#### 撤销代理

代理是可以撤销的，但是撤销操作是不可逆的，也就是撤销后无法恢复代理对象对目标的代理，只能新建一个代理对象。使用`Proxy.revocable()`函数可以获取一个可撤销的代理：

```js
let obj = {name: 'obj'}

// 可撤销代理是一种可以解除代理对象与目标对象联系的代理，使用revocable方法创建
// 该方法返回一个对象，包含生成的代理对象和一个撤销函数
let proxy = Proxy.revocable(obj, Reflect);
console.log(proxy.proxy['name']);

// 撤销后不可再次访问代理对象
proxy.revoke();
console.log(proxy);
```

#### 单独使用反射

反射并不一定要与代理使用，由于反射包含一些具有和原生一致行为的方法，可以利用这些方法减少代码行数，降低对象的粒度。

##### 利用状态标记

反射上挂载的许多方法具有和原生同样行为，但在执行失败时**并不会抛出错误**，而是返回一个 false **标记**，成功时返回 true 。在有些情况下这些方法可以提高程序运行效率和减少代码量，如错误处理时：

正常情况下的错误处理代码：

```js
const o = {};
try {
    Object.defineProperty(o, 'foo', 'bar');
    console.log('success');
} catch(e) {
	console.log('failure');
}
```

使用反射来避免错误处理：

```js
const o = {};
if(Reflect.defineProperty(o, 'foo', {value: 'bar'})) {
	console.log('success');
} else {
	console.log('failure');
}
```

以下方法执行后将返回状态标记：

+ `Reflect.defineProperty()`
+ `Reflect.preventExtensions()`
+ `Reflect.setPrototypeOf()`
+ `Reflect.set()`
+ `Reflect.deleteProperty()`

##### 代替运算符

有时可能并不方便使用内置的操作符，反射上有一些方法可以实现和操作符一样的效果：

+ `Reflect.get()`：可以替代对象属性访问操作符`.`和`[]`
+ `Reflect.set()`：可以替代`=`赋值操作符
+ `Reflect.has()`：可以替代`in`操作符或`with()`
+ `Reflect.deleteProperty()`：可以替代`delete`操作符
+ `Reflect.construct()`：可以替代`new`操作符

##### 访问被覆盖的原生接口

有时一些对象可能定义了和原生接口同名的方法，这会导致原型上的原生接口被隐藏。使用反射方法可以再次访问这些被隐藏的接口。如函数的`apply()`方法，反射上有一个对应的方法`Reflect.apply(myFunc, thisVal, argumentsList)`。

#### 代理的代理

代理的目标对象可以是另一个代理，让代理对象代理另一个代理对象，可以实现一个目标对象上的多重拦截网。

#### 代理的问题

代理实际上存在一些问题。

##### this 指向

一般来说函数内部的 this 指向其调用者（对象方法为对象，全局下函数为Global），而在代理上调用目标对象方法时，这个 this 会**指向代理**：

```js
const target = {
    thisValEqualsProxy() {
    	return this === proxy;
    }
}
const proxy = new Proxy(target, {});
console.log(target.thisValEqualsProxy()); 	// false
console.log(proxy.thisValEqualsProxy()); 	// true
```

假如目标对象的一个方法将在内部通过 this 调用另一个目标对象上的方法，通过代理调用方法时就容易产生将`undefined`作为函数调用的错误。

##### 内部属性问题

一些 ECMAScript 内部类型可能依赖于一些代理无法控制的机制。如果这些类型实例要访问它们的某个内部属性，这个属性将是代理无法访问的，this 指向问题也可能会引发该问题。

如`Date`类型，日期类型类型的方法的执行依赖 this 值上的内部属性`[[NumberDate]]`，而代理对象没有这个属性，也无法在 getter 和 setter 捕获器中访问该属性，处理程序运行时将会发生错误：

```js
const target = new Date();
const proxy = new Proxy(target, {});
console.log(proxy instanceof Date); // true
proxy.getDate(); // TypeError: 'this' is not a Date object，代理对象没有Date运行时需要的内部属性
```

### 代理捕获器方法和反射方法

代理总共有13种不同的捕获器，而反射上也挂载了对应的方法，本节将列举这些捕获器和方法。

#### get()

访问操作对应`get()`方法。

```js
const myTarget = {};
const proxy = new Proxy(myTarget, {
    get(target, property, receiver) {
        console.log('get()');
        return Reflect.get(...arguments)
    }
});
proxy.foo;
// get()
```

1. 返回值：无限制
2. 拦截的操作
   + `proxy.property`
   + `proxy[property]`
   + `Object.create(proxy)[property]`
   + `Reflect.get(proxy, property, receiver)`
3. 参数
   + target：目标对象
   + property：引用的目标对象上的字符串键属性
   + receiver：代理对象或继承代理对象的对象
4. 不变式
   + 如果 target.property 不可写且不可配置，则处理程序返回的值必须与 target.property 匹配
   + 如果 target.property 不可配置且 [[Get]] 特性为 undefined，处理程序的返回值也必须是 undefined

#### set()

修改操作对应`set()`方法。

```js
const myTarget = {};
const proxy = new Proxy(myTarget, {
    set(target, property, value, receiver) {
        console.log('set()');
        return Reflect.set(...arguments)
    }
});
proxy.foo = 'bar';
// set()
```

1. 返回值：返回 true 表示成功；返回 false 表示失败，严格模式下会抛出 TypeError
2. 拦截的操作
   + proxy.property = value
   + proxy[property] = value
   + Object.create(proxy)[property] = value
   + Reflect.set(proxy, property, value, receiver)
3. 参数
   + target：目标对象
   + property：引用的目标对象上的字符串键属性
   + value：要赋给属性的值
   + receiver：接收最初赋值的对象
4. 不变式
   + 如果 target.property 不可写且不可配置，则不能修改目标属性的值
   + 如果 target.property 不可配置且 [[Set]] 特性为 undefined，则不能修改目标属性的值
   + 在严格模式下，处理程序中返回 false 会抛出 TypeError

#### has()

`has()`会在`in`操作符中调用。

```js
const myTarget = {};
const proxy = new Proxy(myTarget, {
    has(target, property) {
        console.log('has()');
        return Reflect.has(...arguments)
    }
});
'foo' in proxy;
// has()
```

1. 返回值：必须返回布尔值，表示属性是否存在，返回非布尔值会被转型为布尔值
2. 拦截的操作
   + property in proxy
   + property in Object.create(proxy)
   + with(proxy) {(property);}
   + Reflect.has(proxy, property)
3. 参数
   + target：目标对象
   + property：引用的目标对象上的字符串键属性
4. 不变式
   + 如果 target.property 存在且不可配置，则处理程序必须返回 true
   + 如果 target.property 存在且目标对象不可扩展，则处理程序必须返回 true

#### defineProperty()

`defineProperty()`会在`Object.defineProperty()`中被调用。

```js
const myTarget = {};
const proxy = new Proxy(myTarget, {
    defineProperty(target, property, descriptor) {
        console.log('defineProperty()');
        return Reflect.defineProperty(...arguments)
    }
});
Object.defineProperty(proxy, 'foo', { value: 'bar' });
// defineProperty()
```

1. 返回值：必须返回布尔值，表示属性是否成功定义，返回非布尔值会被转型为布尔值
2. 拦截的操作
   + Object.defineProperty(proxy, property, descriptor)
   + Reflect.defineProperty(proxy, property, descriptor)
3. 参数
   + target：目标对象
   + property：引用的目标对象上的字符串键属性
   + descriptor：包含可选的enumerable、configurable、writable、value、get 和set定义的对象
4. 不变式
   + 如果目标对象不可扩展，则无法定义属性
   + 如果目标对象有一个可配置的属性，则不能添加同名的不可配置属性
   + 如果目标对象有一个不可配置的属性，则不能添加同名的可配置属性

#### getOwnPropertyDescriptor()

`getOwnPropertyDescriptor()`捕获器会在`Object.getOwnPropertyDescriptor()`中被调用。

```js
const myTarget = {};
const proxy = new Proxy(myTarget, {
        getOwnPropertyDescriptor(target, property) {
        console.log('getOwnPropertyDescriptor()');
        return Reflect.getOwnPropertyDescriptor(...arguments)
    }
});
Object.getOwnPropertyDescriptor(proxy, 'foo');
// getOwnPropertyDescriptor()
```

1. 返回值：必须返回对象，或者在属性不存在时返回 undefined
2. 拦截的操作
   + Object.getOwnPropertyDescriptor(proxy, property)
   + Reflect.getOwnPropertyDescriptor(proxy, property)
3. 参数
   + target：目标对象
   + property：引用的目标对象上的字符串键属性
4. 不变式
   + 如果自有的 target.property 存在且不可配置，则处理程序必须返回一个表示该属性存在的对象
   + 如果自有的 target.property 存在且可配置，则处理程序必须返回表示该属性可配置的对象
   + 如果自有的 target.property 存在且target 不可扩展，则处理程序必须返回一个表示该属性存在的对象
   + 如果 target.property 不存在且target 不可扩展，则处理程序必须返回 undefined 表示该属性不存在
   + 如果 target.property 不存在，则处理程序不能返回表示该属性可配置的对象

#### deleteProperty()

`deleteProperty()`捕获器会在`delete`操作符中被调用。

```js
const myTarget = {};
const proxy = new Proxy(myTarget, {
    deleteProperty(target, property) {
        console.log('deleteProperty()');
        return Reflect.deleteProperty(...arguments)
    }
});
delete proxy.foo
// deleteProperty()
```

1. 返回值：必须返回布尔值，表示删除属性是否成功，返回非布尔值会被转型为布尔值
2. 拦截的操作
   + delete proxy.property
   + delete proxy[property]
   + Reflect.deleteProperty(proxy, property)
3. 参数
   + target：目标对象
   + property：引用的目标对象上的字符串键属性
4. 不变式
   + 如果自有的 target.property 存在且不可配置，则处理程序不能删除这个属性

#### ownKeys()

`ownKeys()`捕获器会在`Object.keys()`及类似方法中被调用。

```js
const myTarget = {};
const proxy = new Proxy(myTarget, {
        ownKeys(target) {
        console.log('ownKeys()');
        return Reflect.ownKeys(...arguments)
    }
});
Object.keys(proxy);
// ownKeys()
```

1. 返回值：必须返回包含字符串或符号的可枚举对象
2. 拦截的操作
   + Object.getOwnPropertyNames(proxy)
   + Object.getOwnPropertySymbols(proxy)
   + Object.keys(proxy)
   + Reflect.ownKeys(proxy)
3. 参数
   + target：目标对象
4. 不变式
   + 返回的可枚举对象必须包含 target 的所有不可配置的自有属性
   + 如果 target 不可扩展，则返回可枚举对象必须准确地包含自有属性键

#### getPrototypeOf()

`getPrototypeOf()`捕获器会在`Object.getPrototypeOf()`中被调用。

```js
const myTarget = {};
const proxy = new Proxy(myTarget, {
        getPrototypeOf(target) {
        console.log('getPrototypeOf()');
        return Reflect.getPrototypeOf(...arguments)
    }
});
Object.getPrototypeOf(proxy);
// getPrototypeOf()
```

1. 返回值：必须返回对象或null
2. 拦截的操作
   + Object.getPrototypeOf(proxy)
   + Reflect.getPrototypeOf(proxy)
   + proxy.\__proto__
   + Object.prototype.isPrototypeOf(proxy)
   + proxy instanceof Object
3. 参数
   + target：目标对象
4. 不变式
   + 如果 target 不可扩展，则`Object.getPrototypeOf(proxy)`唯一有效的返回值就是`Object.getPrototypeOf(target)`的返回值

#### setPrototypeOf()

`setPrototypeOf()`捕获器会在`Object.setPrototypeOf()`中被调用。

```js
const myTarget = {};
const proxy = new Proxy(myTarget, {
        setPrototypeOf(target, prototype) {
        console.log('setPrototypeOf()');
        return Reflect.setPrototypeOf(...arguments)
    }
});
Object.setPrototypeOf(proxy, Object);
// setPrototypeOf()
```

1. 返回值：必须返回布尔值，表示原型赋值是否成功，返回非布尔值会被转型为布尔值
2. 拦截的操作
   + Object.setPrototypeOf(proxy)
   + Reflect.setPrototypeOf(proxy)
3. 参数
   + target：目标对象
   + prototype：target 的替代原型，如果是顶级原型则为 null
4. 不变式
   + 如果 target 不可扩展，则唯一有效的 prototype 参数就是`Object.getPrototypeOf(target)`的返回值

#### isExtensible()

`isExtensible()`捕获器会在`Object.isExtensible()`中被调用。

```js
const myTarget = {};
const proxy = new Proxy(myTarget, {
    isExtensible(target) {
        console.log('isExtensible()');
        return Reflect.isExtensible(...arguments)
	}
});
Object.isExtensible(proxy);
// isExtensible()
```

1. 返回值：必须返回布尔值，表示 target 是否可扩展，返回非布尔值会被转型为布尔值
2. 拦截的操作
   + Object.isExtensible(proxy)
   + Reflect.isExtensible(proxy)
3. 参数
   + target：目标对象
4. 不变式
   + 如果 target 可扩展，则处理程序必须返回 true
   + 如果 target 不可扩展，则处理程序必须返回 false

#### preventExtensions()

`preventExtensions()`捕获器会在`Object.preventExtensions()`中被调用。

```js
const myTarget = {};
const proxy = new Proxy(myTarget, {
    preventExtensions(target) {
        console.log('preventExtensions()');
        return Reflect.preventExtensions(...arguments)
    }
});
Object.preventExtensions(proxy);
// preventExtensions()
```



1. 返回值：必须返回布尔值，表示 target 是否已经不可扩展，返回非布尔值会被转型为布尔值
2. 拦截的操作
   + Object.preventExtensions(proxy)
   + Reflect.preventExtensions(proxy)
3. 参数
   + target：目标对象
4. 不变式
   + 如果`Object.isExtensible(proxy)`是 false，则处理程序必须返回 true

#### apply()

`apply()`捕获器会在调用函数时中被调用。

```js
const myTarget = () => {};
const proxy = new Proxy(myTarget, {
    apply(target, thisArg, ...argumentsList) {
        console.log('apply()');
        return Reflect.apply(...arguments)
	}
});
proxy();
// apply()
```

1. 返回值：返回值无限制
2. 拦截的操作
   + proxy(...argumentsList)
   + Function.prototype.apply(thisArg, argumentsList)
   + Function.prototype.call(thisArg, ...argumentsList)
   + Reflect.apply(target, thisArgument, argumentsList)
3. 参数
   + target：目标对象
   + thisArg：调用函数时的 this 参数
   + argumentsList：调用函数时的参数列表
4. 不变式
   + target 必须是一个函数对象

#### construct()

`construct()`捕获器会在`new`操作符中被调用。

```js
const myTarget = function() {};
const proxy = new Proxy(myTarget, {
        construct(target, argumentsList, newTarget) {
        console.log('construct()');
        return Reflect.construct(...arguments)
    }
});
new proxy;
// construct()
```

1. 返回值：必须返回一个对象
2. 拦截的操作
   + new proxy(...argumentsList)
   + Reflect.construct(target, argumentsList, newTarget)
3. 参数
   + target：目标构造函数
   + argumentsList：传给目标构造函数的参数列表
   + newTarget：最初被调用的构造函数
4. 不变式
   + target 必须可以用作构造函数

### 代理模式的常见使用方式

#### 跟踪属性的访问

代理最简单的运用是跟踪一个属性的访问状态：

```js
// 利用捕获器可以跟踪对对象的属性访问 
let obj = {
    name: 'obj',
    proxyVisitedTimes: 0
}

let proxy = new Proxy(obj, {
    get(target) {
        target.proxyVisitedTimes++;
        return Reflect.get(...arguments);
    }
});

console.log(proxy.name);
console.log(obj.proxyVisitedTimes);
```

#### 隐藏属性

如果有一些属性不想被访问到，可以让代理返回一个空：

```js
// 通过代理访问可以隐藏一些属性
let obj = {name: 'obj'};

let proxy = new Proxy(obj, {
    get(target, prop) {
        if (prop === 'name') {
            return undefined;
        }
        return Reflect.get(...arguments);
    }
});

console.log(proxy.name);
```

#### 属性验证

在设置属性时可以要通过某种验证，如类型校验：

```js
// 可以使用捕获器在为属性赋值前进行类型和内容检查
let obj = {num: String};

let proxy = new Proxy(obj, {
    set(target, p, value, receiver) {
        if (p === 'num') {
            if (typeof value !== 'number') {
                throw new TypeError('must be number');
            } else {
                return Reflect.set(...arguments);
            }
        } else {
            return Reflect.set(...arguments);
        }
    }
});

proxy.num = '1';
```

#### 参数验证

和属性验证一样，代理还可用于参数检查：

```js
// 利用捕获器进行函数参数类型和内容验证
let add = (a, b) => a + b;

let proxy = new Proxy(add, {
    apply(target, thisArg, argArray) {
        for (const arg of argArray) {
            if (typeof arg !== 'number') {
                throw new TypeError('arguments must be number');
            }
        }
        return Reflect.apply(...arguments);
    }
});

console.log(proxy(1, 2));
console.log(proxy({}, {}));
```

#### 数据绑定和可观察对象

利用代理可以实现数据绑定与观察者模式，使得相关联的数据能动态变化：

```js
// 利用捕获器可以实现数据绑定，把运行过程中原本不关联的对象进行关联
let obj = {name: 'obj'};

let nameRef = obj.name;
obj.name = 'vue';
console.log(obj.name);          // vue
console.log(nameRef);           // obj

let proxy = new Proxy(obj, {
    set(target, p, value, receiver) {
        nameRef = value;
        return Reflect.set(...arguments);
    }
});

proxy.name = 'react';
console.log(proxy.name);        // react
console.log(nameRef);           // react
```

> 代理与反射是 ES 6提出的功能强大的 API ，基于原生实现，几乎无法被其他库代替
>
> 使用代理捕获器必须遵守捕获器不变式
>
> 代理仍然存在一些问题，使用时需要注意

---

## 20 JavaScript API

### Web Components

**Web Components** 即 **Web 组件**，是一套用于增强 DOM 行为的工具，包括 **Shadow DOM（影子 DOM）**、**Custom Element（自定义元素）**和 **HTML
Template（HTML 模板）**。

Web 组件在各浏览器中的具体实现并不相同，且目前在页面组件数较多时 Shadow DOM 的执行效率并没有一些框架使用的虚拟 DOM效率高。但由于是原生内容，开发者可以跨非原生框架使用这些可复用内容。

#### HTML Template

在 Web 组件之前，浏览器没有基于 HTML 解析构建子 DOM 的功能。直接使用`innerHTML`存在巨大安全隐患（恶意插入代码、信息丢失等），`document.createElement()`的使用过于复杂，且与标签无关。

**HTML 模板**的核心思想是，提前在 HTML 写好特殊标记，让浏览器将其作为子 DOM 解析，但不进行渲染，在需要使用的时候将模板内容**转移**到 DOM 上。使用`<template>`标签创建一个模板：

```html
<template id="foo">
    <p>I'm inside a template!</p>
</template>
```

##### Document Fragment

模板内的内容并不会被渲染，DOM 查询方法也无法获取其中节点。模板的子节点被包含在其`DocumentFragment`节点内，可见于浏览器开发者工具：

```html
<template id="foo">
    #document-fragment
    <p>I'm inside a template!</p>
</template>
```

通过 JavaScript DOM API 获取节点引用后，可以从节点的`content`属性中获取`DocumentFragment`的引用：

```js
console.log(document.getElementById('temp').content);   // document-fragment
```

利用`DocumentFragment`可以向 DOM 中一次添加多个平级节点。如果多次调用`appendChild`会导致**每次添加都重新排列一次 DOM**，`DocumentFragment`由于本身不是一个 DOM
节点对象，不会影响节点优化。在将`DocumentFragment`对象挂载到 DOM 上后，该对象的子节点会**直接转移**到 DOM 中，`DocumentFragment`成为一个**没有子节点的空节点**：

```js
const frag = new DocumentFragment();

frag.appendChild(document.createElement('p'));
frag.appendChild(document.createElement('p'));
frag.appendChild(document.createElement('p'));

console.log(frag.children.length);          // 3

// 只进行一次DOM插入，刷新一次DOM，插入三个平级节点
document.querySelector('body').appendChild(frag);

console.log(frag.children.length);          // 0
```

##### \<template>

`<template>`与`DocumentFragment`一样，将其`content`属性（即某个`DocumentFragment`对象的引用）挂载到 DOM 中后其子节点会**直接转移**：

```js
const fooElement = document.querySelector('#foo');
const barTemplate = document.querySelector('#bar');
const barFragment = barTemplate.content;
console.log(document.body.innerHTML);
// <div id="foo">
// </div>
// <template id="bar">
// <p></p>
// <p></p>
// <p></p>
// </template>
fooElement.appendChild(barFragment);
console.log(document.body.innerHTML);
// <div id="foo">
// <p></p>
// <p></p>
// <p></p>
// </div>
// <tempate id="bar"></template>
```

使用`document.importNode`方法可以**克隆**一个已经在 DOM 中的`DocumentFragment`对象，返回一个新的对象而不是引用，因此原模板中的内容不会消失。也可以使用`DocumentFragment`的`cloneNode()`方法进行克隆，该方法接收一个布尔值来决定深度还是浅度克隆：

```js
const fooElement = document.querySelector('#foo');
const barTemplate = document.querySelector('#bar');
const barFragment = barTemplate.content;
console.log(document.body.innerHTML);
// <div id="foo">
// </div>
// <template id="bar">
// <p></p>
// <p></p>
// <p></p>
// </template>
fooElement.appendChild(document.importNode(barFragment, true));
console.log(document.body.innerHTML);
// <div id="foo">
// <p></p>
// <p></p>
// <p></p>
// </div>
// <template id="bar">
// <p></p>
// <p></p>
// <p></p>
// </template>
```

##### 模板中的 script

模板中的`<script>`标签内容并不会执行，直到被添加到 DOM 中。可以利用这个特性来初始化内容：

```js
// 页面HTML：
//
// <div id="foo"></div>
// <template id="bar">
// <script>console.log('Template script executed');</script>
// </template>
const fooElement = document.querySelector('#foo');
const barTemplate = document.querySelector('#bar');
const barFragment = barTemplate.content;
console.log('About to add template');
fooElement.appendChild(barFragment);
console.log('Added template');
// About to add template
// Template script executed
// Added template
```

#### Shadow DOM

**Shadow DOM（影子 DOM）**可以将一个完整的 DOM 树添加到父 DOM 中，并且可以实现封装，因此 **CSS 样式可以限制在 shadow DOM 中**而不是整个父 DOM 中。

为了安全和节点间的兼容，**并非所有**类型的 HTML 节点都可以包含 shadow DOM，如`<input>`，尝试向这些节点添加 shadow DOM 会抛出错误。

##### 创建影子 DOM 和可访问性

一个 shadow DOM 通过 HTML 对象的`attachShadow()`方法创建，容纳 shadow DOM 的节点称为 **shadow host（影子宿主）**，shadow DOM 的根节点称为 **shadow root（影子根）**。

`attachShadow()`接收一个`shadowRootInit`对象作参数，返回一个 shadow DOM 实例。`shadowRootInit`包含一个`mode`属性，指定为`'open'`时，可以通过 HTML 元素的`shadowRoot`属性获取影子 DOM 的引用，为`'closed'`则不可获得。

```js
document.body.innerHTML = `
    <div id="foo"></div>
    <div id="bar"></div>
`;
const foo = document.querySelector('#foo');
const bar = document.querySelector('#bar');
const openShadowDOM = foo.attachShadow({mode: 'open'});
const closedShadowDOM = bar.attachShadow({mode: 'closed'});
console.log(openShadowDOM); // #shadow-root (open)
console.log(closedShadowDOM); // #shadow-root (closed)
console.log(foo.shadowRoot); // #shadow-root (open)
console.log(bar.shadowRoot); // null
```

即使可以隐藏影子 DOM 内容，恶意代码扔有许多方式可以获取其内容，因此封闭 shadow DOM **并不能实现内容保密**，并且其 HTML 在调试工具中是可视的。使用`<iframe>`来跨域引用资源会更加可靠。

##### 使用影子 DOM

影子 DOM 实例的使用和其他 HTML 节点元素相同：

```js
for (let color of ['red', 'green', 'blue']) {
    const div = document.createElement('div');
    const shadowDOM = div.attachShadow({mode: 'open'});
    document.body.appendChild(div);
	// 为shadow dom添加内容，css仅在影子DOM内部有效
    shadowDOM.innerHTML = `
    <p>Make me ${color}</p>
    <style>
    	p {
    		color: ${color};
    	}
    </style>
`;
}
```

##### slot 插槽

在默认情况下，如果为一个影子宿主创建影子 DOM，其原先内部元素会被**转移**到影子 DOM 中，但是原先的内部节点会被**隐藏**：

```js
// 1秒后p标签内容会被隐藏
document.body.innerHTML = `
    <div>
    <p>Foo</p>
    </div>
`;
setTimeout(() => document.querySelector('div').attachShadow({mode: 'open'}), 1000);    
```

影子 DOM 的优先级高于节点原来的内容，浏览器会优先渲染影子 DOM ，因为添加的影子 DOM 是空的，所以不会显示任何内容。

如果需要让一些不属于影子 DOM 中的元素在影子 DOM 中渲染，需要使用`<slot>`，原先位于节点中的元素会被**投射（projection）**到影子 DOM 中，在影子 DOM 中渲染，但实际上文档结构**还是位于外部影子宿主中**。从浏览器控制台中可以看到这种映射关系：

```js
document.querySelector('div')
    .attachShadow({mode: 'open'})
    .innerHTML = `
    <div id="bar">
        <slot></slot>
    <div>
`;
console.log(document.querySelector('p').parentElement);	// <div id="foo"></div>
```

如果只有一个插槽，所有原来的元素都会被添加到该插槽中。

##### 命名插槽

**命名插槽（named slot）**用于实现多个投射，通过外部节点的 **slot** 属性和影子 DOM 的 **name** 属性对关联，内容渲染顺序和插槽位置相关：

```js
document.body.innerHTML = `
    <div>
    <p slot="foo">Foo</p>
    <p slot="bar">Bar</p>
    </div>
`;
document.querySelector('div')
    .attachShadow({mode: 'open'})
    .innerHTML = `
        <slot name="bar"></slot>
        <slot name="foo"></slot>
`;
// Renders:
// Bar
// Foo
```

##### 事件重定向

**事件重定向（event retarget）**指在影子 DOM 发生的事件会逃出影子 DOM 内部，该事件的`target`属性会**指向外部节点**。事件重定向只会发生在影子 DOM 内部元素上，插槽中从外部投射进来的元素并**不会**进行事件重定向：

```js
    // <div id="host">
    //     <button>outer</button>
    // </div>
const host = document.getElementById('host');
const shadowRoot = host.attachShadow({mode: 'open'});
shadowRoot.innerHTML = `
        <button>click</button>
        <slot></slot>
    `;

shadowRoot.querySelector('button').addEventListener('click', ev => console.log(ev.target));
host.addEventListener('click', (ev) => console.log(ev.target));
host.querySelector('button').addEventListener('click', ev => console.log(ev.target));

// 点击outer，两次打印均为<button>outer</button>，但第一次来源为button的事件回调，第二次来源为div的事件回调
// 点击click，第一次打印为<button>click</button>，来源于button
// 第二次打印为<div id="host">...</div>，事件被重定向到了外部，来源于div
```

#### Custom Element

浏览器会尝试将无法识别的标签整合进 DOM，以行内元素的方式显示其内容，这些无法识别的元素**和原生 HTML 元素是同一类型**，具有相同的属性：

```js
document.body.innerHTML = `
	<x-foo >I'm inside a nonsense element.</x-foo >
`;
console.log(document.querySelector('x-foo') instanceof HTMLElement); // true
```

通过使用 **Custom Element（自定义元素）**，可以定义一非 HTML 标准的标签，并为其添加更复杂的行为。

##### 创建自定义元素

自定义元素通过调用全局对象下的 **customElements** 属性（CustomElements 类型的对象）的`define`方法创建，该方法接收一个字符串和一个派生自`HTMLElement`构造函数（类）的对象（也可以不派生，会失去原生元素的属性）。字符串作为自定义元素名使用，要求必须**包含至少一个不在开头或结尾的连字符**，否则会抛出错误：

```js
class FooElement extends HTMLElement {
}

customElements.define('x-foo', FooElement);
document.body.innerHTML = `
	<x-foo>I'm inside a nonsense element.</x-foo>
`;
console.log(document.querySelector('x-foo') instanceof FooElement); // true
```

通过调用自定义元素的**构造函数**来控制该类在每个 DOM 实例中的行为，该构造函数会覆盖基类构造函数，因此**必须调用基类的构造函数**：

```js
class FooElement extends HTMLElement {
    constructor() {
        // 必须调用基类构造函数
        super();
        console.log('x-foo')
    }
}

customElements.define('x-foo', FooElement);
document.body.innerHTML = `
    <x-foo></x-foo>
    <x-foo></x-foo>
    <x-foo></x-foo>
`;
// x-foo
// x-foo
// x-foo
```

##### 向自定义元素添加 Web 组件

要向自定义组件中添加 Web 组件，需要使用影子 DOM，如果尝试直接添加子节点将会抛出错误：

```js
class CustomElement extends HTMLElement {
    constructor() {
        super();
        console.log('create custom element');
        // this.innerHTML = '<p>custom</p>'
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            #shadow-root
            <p>This is a custom element</p>
            <slot></slot>
        `;
    }
}

customElements.define('custom-el', CustomElement);
```

让视图部分与 JavaScript 代码分离会更加清晰：

```html
<!-- 模板 -->
<template id="custom-element">
    #shadow-root
    <p>This is a custom element.</p>
    <slot></slot>
    <style>

    </style>
</template>

<!-- 创建自定义元素 -->
<script>
    class CustomElement extends HTMLElement {
        template = document.getElementById('custom-element') ?? document.createElement('template');

        constructor() {
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        }
    }

    customElements.define('custom-el', CustomElement);
</script>

<custom-el>
    some text here.
</custom-el>
```

`<template>`标签可以位于`<head>`中，这样将不影响`<body>`内部的节点优化。

单 js 文件，在 HTML 中使用`<script type="module" src="xxx.js"></script>`引入：

```js
const template = `
    #shadow-root
    <p>This is a custom element.</p>
    <slot></slot>
`;

const style = `
    <style>

    </style>
`;

class CustomElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template + style;
    }
}

customElements.define('custom-el', CustomElement);

// 如有必要，可以导出该类并修改
export default CustomElement;
```

##### 组件生命周期

自定义元素组件有5个**生命周期方法**：

+ `constructor()`：在创建元素实例或将已有 DOM 元素升级为自定义元素时调用。
+ `connectedCallback()`：在每次将这个自定义元素实例添加到 DOM 中时调用。
+ `disconnectedCallback()`：在每次将这个自定义元素实例从 DOM中移除时调用。
+ `attributeChangedCallback(name, oldValue, newValue)`：在每次**可观察属性**的值发生变化时调用。在元素实例初始化时，初始值的定义也算一次变化。
+ `adoptedCallback()`：在通过document.adoptNode()将这个自定义元素实例移动到新文档对象时调用。

```js
class FooElement extends HTMLElement {
    constructor() {
        super();
        console.log('ctor');
    }

    connectedCallback() {
        console.log('connected');
    }

    disconnectedCallback() {
        console.log('disconnected');
    }
}

customElements.define('x-foo', FooElement);
const fooElement = document.createElement('x-foo');
// ctor
document.body.appendChild(fooElement);
// connected
document.body.removeChild(fooElement);
```

如果需要在元素属性变化后，触发 `attributeChangedCallback()`回调函数，必须监听该属性。这可以通过定义`observedAttributes()` get 函数来实现，`observedAttributes()`函数体内包含一个 return 语句，返回一个数组，包含了需要监听的属性名称：

```js
class CustomElement extends HTMLElement {
    static get observedAttributes() {
        return ['foo'];
    }
}
```

##### 反射自定义元素属性

自定义元素应该是**响应式**的，对 DOM 的修改应该反映到 JavaScript 对象上。要进行 **JavaScript 至 DOM 间的反射**，常见的方法是使用 getter 和 setter；**DOM 至 JavaScript** 间的反射则需要使用`observedAttributes()`添加**可观察属性**，可观察属性的值变化时会调用`attributeChangedCallback()`：

```js
class Custom extends HTMLElement {
    template = document.getElementById('template') ?? document.createElement('template');

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));

        // 构造时自定义元素不能被初始化，会抛出错误
        this.foo;
    }

    // 设置观察属性
    static get observedAttributes() {
        return ['foo'];
    }

    get foo() {
        return this.getAttribute('foo');
    }

    set foo(value) {
        this.setAttribute('foo', value);
    }

    // 挂载时初始化
    connectedCallback() {
        this.foo = true;
    }

    // 观察属性变化时的回调
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        console.log(`${oldValue} -> ${newValue}`);
    }
}

customElements.define('custom-el', Custom);
```

##### 升级自定义元素

并非总是要先定义自定义元素，再在 DOM 中使用它们。`CustomElementRegistry`类型暴露了一些方法来检测是否存在对应自定义元素，并进行相关操作。已经连接到 DOM 上的元素会在自定义元素被定义时**自动升级**
，而没有连接的元素对象需要手动强制升级。

+ `CustomElementRegistry.get()`方法接收一个字符串，如果该元素已经定义，则返回元素对象引用，否则返回空。
+ `CustomElementRegistry.whenDefined()`接收一个字符串，返回一个期约，当对应自定义元素创建时期约将履行。
+ `CustomElementRegistry.upgrade()`接收一个 HTMLElement 对象，尝试强制升级该自定义元素。

```js
const cus = document.getElementById('cus');             // 已连接在DOM中的元素，在有自定义元素时会自动升级
const unmounted = document.createElement('custom-el');  // 未连接的元素，不会自动升级
class Custom {
}

customElements.whenDefined('custom-el').then(() => console.log('custom-el defined'));

console.log('Is cus a instance of Custom before define?', cus instanceof Custom); // false
console.log('Is unmounted a instance of Custom before define?', unmounted instanceof Custom); // false

console.log('Is there a custom element called custom-el?', Boolean(customElements.get('custom-el'))); // false

// 定义自定义元素
customElements.define('custom-el', Custom);
console.log('Is there a custom element called custom-el?', Boolean(customElements.get('custom-el'))); // true

console.log('Is cus a instance of Custom after define?', cus instanceof Custom); // true
console.log('Is unmounted a instance of Custom after define?', unmounted instanceof Custom); // false

customElements.upgrade(unmounted); // 强制升级
console.log('Is unmounted a instance of Custom after upgrade?', unmounted instanceof Custom); // true

// 期约 onResolved 异步打印 'custom-el defined'
```

