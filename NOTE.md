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
<link href="js/例1.js" rel="prefetch">
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

