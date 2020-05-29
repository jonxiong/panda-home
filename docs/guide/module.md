# 前端模块化

- [前端模块化](#前端模块化)
  - [CommonJS](#commonjs)
    - [CommonJS规范](#commonjs规范)
    - [CommonJS模块实现原理](#commonjs模块实现原理)
  - [amd-异步模块定义](#amd-异步模块定义)
  - [cmd-通用模块定义](#cmd-通用模块定义)
    - [seaJS与requireJS的区别](#seajs与requirejs的区别)
  - [es6模块](#es6模块)
  - [commonjs与es6的区别](#commonjs与es6的区别)
  - [组件的开发](#组件的开发)

> 模块化是指在解决某一个复杂问题或者一系列的杂糅问题时，依照一种分类的思维把问题进行系统性的分解以之处理。模块化是一种处理复杂系统分解为代码结构更合理，可维护性更高的可管理的模块的方式。

## CommonJS

出现背景：在服务器端编写代码，一定要有模块，与操作系统和其他应用程序互动

JS模块化变成的诞生：2009-Ryan创造类Node.js项目，将JS用于服务器编程

> Node是CommonJS规范的实现, 虽说Node遵循CommonJS的规范，但是相比也是做了一些取舍，填了一些新东西的
> webpack也是以CommonJS的形式类书写

CommonJS定义的模块分为:

* 模块引用(require): 引入外部模块
* 模块定义(exports): 用于导出当前模块的方法或变量
* 模块标识(module): 代表模块本身

``` js
//定义模块math.js
var basicNum = 0;

function add(a, b) {
    return a + b;
}
module.exports = { //在这里写上需要向外暴露的函数、变量
    add: add,
    basicNum: basicNum
}

//引用自定义的模块时，参数包含路径，可省略.js
var math = require('./math');
math.add(2, 5);

//引用核心模块时，不需要带路径
var http = require('http');
http.createService(...).listen(3000);
```

### CommonJS规范

> 每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见，CommonJS规范加载模块是同步的，也就是说，加载完成才可以执行后面的操作，Node.js主要用于服务器编程，模块一般都是存在本地硬盘中，加载比较快，所以Node.js采用CommonJS规范，

### CommonJS模块实现原理

* 实现模块功能：函数式编程语言，用函数包装一段代码，全局变量变成局部变量
* module.exports的实现

现状：JavaScript语言本身并没有一种模块机制来保证不同模块可以使用相同的变量名 <br/>
如何实现：实现“模块”功能的奥妙就在于JavaScript是一种函数式编程语言，它支持闭包。如果我们把一段JavaScript代码用一个函数包装起来，这段代码的所有“全局”变量就变成了函数内部的局部变量
例子：

``` js
// hello.js
var s = 'Hello';
var name = 'world';
console.log(s + ' ' + name + '!');
```

Node加载完hello.js后，它把代码包装一下，变成了：

``` js
(function() {
    // 读取的hello.js代码:
    var s = 'Hello';
    var name = 'world';
    console.log(s + ' ' + name + '!');
    // hello.js代码结束
})()
```

这样一来，原来的全局变量s现在变成了匿名函数内部的局部变量。如果Node.js继续加载其他模块，这些模块中定义的“全局”变量s也互不干扰。
所以，Node利用JavaScript的函数式编程的特性，轻而易举地实现了模块的隔离。

模块的输出**module.exports**怎么实现？
Node可以先准备一个对象**module**

``` js
// 准备module对象:
var module = {
    id: 'hello',
    exports: {}
};
var load = function(module) {
    // 读取的hello.js代码:
    function greet(name) {
        console.log('Hello, ' + name + '!');
    }

    module.exports = greet;
    // hello.js代码结束
    return module.exports;
};
var exported = load(module);
// 保存module:
save(module, exported);
```

[模块化实现](https://www.liaoxuefeng.com/wiki/1022910821149312/1023027697415616)

## amd-异步模块定义

出现背景： CommonJS的require是同步的，显然CommonJS不适合浏览器环境

> AMD规范采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。这里介绍用require.js实现AMD规范的模块化：

用**require.config()**指定引用路径等，用**define()**定义模块，用**require()**加载模块

最早的时候，所有Javascript代码都写在一个文件里面，只要加载这一个文件就够了。后来，代码越来越多，一个文件不够了，必须分成多个文件，依次加载。下面的网页代码，相信很多人都见过。

``` js
< script src = "1.js" > < /script> <
    script src = "2.js" > < /script> <
    script src = "3.js" > < /script> <
    script src = "4.js" > < /script>
```

这样写的缺点：

1. 加载的时候，浏览器会停止网页渲染，加载文件越多，网页失去响应的时间就会越长
2. 由于js文件之间存在依赖关系，因此必须严格保证加载顺序（比如上例的1.js要在2.js的前面），依赖性最大的模块一定要放到最后加载，当依赖关系很复杂的时候，代码的编写和维护都会变得困难

require.js的诞生，就是为了解决这两个问题：

* 实现js文件的异步加载，避免网页失去响应；
* 管理模块之间的依赖性，便于代码的编写和维护。

require.js例子：

``` js
/** 网页中引入require.js及main.js 加上defer和async让文件异步加载避免页面失去响应**/ <
script src = "js/require.js"
data - main = "js/main"
defer async = "true" > < /script>

/** main.js 入口文件/主模块 **/
// 首先用config()指定各模块路径和引用名
require.config({
    baseUrl: "js/lib",
    paths: {
        "jquery": "jquery.min", //实际路径为js/lib/jquery.min.js
        "underscore": "underscore.min",
    }
});
//执行基本操作
require(["jquery", "underscore"], function($, _) {
    // some code here
});
```

引用模块的时候，我们将模块名放在[/]中作为reqiure()的第一参数；如果我们定义的模块本身也依赖其他模块，那就需要将它们放在[]中作为define()的第一参数。

``` js
//定义math.js模块
define(function() {
    var basicNum = 0;
    var add = function(x, y) {
        return x + y;
    };
    return {
        add: add,
        basicNum: basicNum
    };
});
//定义一个依赖underscore.js的模块
define(['underscore'], function(_) {
    var classify = function(list) {
        _.countBy(list, function(num) {
            return num > 30 ? 'old' : 'young';
        })
    };
    return {
        classify: classify
    };
})

//引用模块，将模块放在[]内
require([jquery, math], function($, math) {
    var sum = math.add(10, 20);
    $("#sum").html(sum);
});
```

## cmd-通用模块定义

目前，主要有**sea.js**库实现了CMD规范：<br/>
背景：require.js在申明依赖的模块时会在第一事件加载并执行模块内的代码：

``` js
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) {
    // 等于在最前面声明并初始化了要用到的所有模块
    if (false) {
        // 即便没用到某个模块 b，但 b 还是提前执行了
        b.foo()
    }
});
```

CMD是另一种js模块化方案，它与AMD很类似，不同点在于：**AMD 推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行**。此规范其实是在sea.js推广过程中产生的。

``` js
/** AMD写法 **/
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) {
    // 等于在最前面声明并初始化了要用到的所有模块
    a.doSomething();
    if (false) {
        // 即便没用到某个模块 b，但 b 还是提前执行了
        b.doSomething()
    }
});

/** CMD写法 **/
define(function(require, exports, module) {
    var a = require('./a'); //在需要时申明
    a.doSomething();
    if (false) {
        var b = require('./b');
        b.doSomething();
    }
});

/** sea.js **/
// 定义模块 math.js
define(function(require, exports, module) {
    var $ = require('jquery.js');
    var add = function(a, b) {
        return a + b;
    }
    exports.add = add;
});
// 加载模块
seajs.use(['math.js'], function(math) {
    var sum = math.add(1 + 2);
});
```

### seaJS与requireJS的区别

* SeaJS对模块的态度是懒执行, 而RequireJS对模块的态度是预执行
* SeaJS只会在真正需要使用(依赖)模块时才执行该模块
* SeaJS是异步加载模块的没错, 但执行模块的顺序也是严格按照模块在代码中出现(require)的顺序, 这样才更符合逻辑

而RequireJS会先尽早地执行(依赖)模块, 相当于所有的require都被提前了

## es6模块

模块功能主要由两个命令构成：**export**和**import**。**export**命令用于规定模块的对外接口，**import**命令用于输入其他模块提供的功能。

``` js
/** 定义模块 math.js **/
var basicNum = 0;
var add = function(a, b) {
    return a + b;
};
export {
    basicNum,
    add
};

/** 引用模块 **/
import {
    basicNum,
    add
} from './math';

function test(ele) {
    ele.textContent = add(99 + basicNum);
}
```

如上例所示，使用import命令的时候，用户需要知道所要加载的变量名或函数名。其实ES6还提供了export default命令，为模块指定默认输出，对应的import语句不需要使用大括号。这也更趋近于ADM的引用写法。

``` js
/** export default **/
//定义输出
export default {
    basicNum,
    add
};
//引入
import math from './math';

function test(ele) {
    ele.textContent = math.add(99 + math.basicNum);
}
```

ES6的模块不是对象，import命令会被 JavaScript 引擎静态分析，在编译时就引入模块代码，而不是在代码运行时加载，所以无法实现条件加载。也正因为这个，使得静态分析成为可能。

## commonjs与es6的区别

* CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
    - CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
    - ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
    - 运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”
    - 编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”

CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成

## 组件的开发

参考文章：
[ruanyifeng](https://es6.ruanyifeng.com/#docs/module)
[huangxuan](http://huangxuan.me/js-module-7day/#/2)
[JavaSript模块规范 - AMD规范与CMD规范介绍](http://blog.chinaunix.net/uid-26672038-id-4112229.html)
