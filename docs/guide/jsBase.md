# JS基础

- [JS基础](#js基础)
  - [js数据类型都有什么](#js数据类型都有什么)
  - [null与undefined的区别是什么](#null与undefined的区别是什么)
  - [为什么会有bigint提案](#为什么会有bigint提案)
  - [0. 1加0. 2为什么不等于0. 3](#0-1加0-2为什么不等于0-3)
  - [类型转换的规则](#类型转换的规则)
    - [类型转换的原理是什么](#类型转换的原理是什么)
  - [解释下变量提升](#解释下变量提升)
  - [js是解释型还是编译型语言可引深jit](#js是解释型还是编译型语言可引深jit)
    - [编译型语言：C，C##，JAVA](#编译型语言ccjava)
    - [解释型语言：SQL，Python](#解释型语言sqlpython)
    - [优缺点](#优缺点)
  - [js变量类型](#js变量类型)
  - [js的作用域和作用域链](#js的作用域和作用域链)
    - [全局作用域](#全局作用域)
    - [局部作用域](#局部作用域)
    - [ES6块级作用域](#es6块级作用域)
    - [什么是作用域链](#什么是作用域链)
    - [作用域链的本质](#作用域链的本质)
  - [谈谈对原型链的理解](#谈谈对原型链的理解)
    - [原型对象](#原型对象)
    - [原型链](#原型链)
  - [理解闭包吗](#理解闭包吗)
    - [概念](#概念)
    - [用途](#用途)
  - [讲讲js垃圾回收是怎么做的？](#讲讲js垃圾回收是怎么做的)
  - [this的理解](#this的理解)
    - [箭头函数的this指向哪里](#箭头函数的this指向哪里)
  - [call与apply与bind区别](#call与apply与bind区别)
  - [async和await是什么](#async和await是什么)
    - [async/await相比于promise的优势](#asyncawait相比于promise的优势)
  - [函数式编程](#函数式编程)
    - [函数的合成和柯里化](#函数的合成和柯里化)
    - [合成](#合成)
    - [柯里化](#柯里化)
  - [响应](#响应)

## js数据类型都有什么

JS的数据类型分为两大类：原始类型和引用类型
简单数据类型：

* boolean
* number
* string
* undefined
* null (读音类似no~)
* symbol （es6新增，表示独一无二的值）
* bigInt（es10新增）

复杂数据类型：

* Object(function, array, math, date)

原始数据类型：直接存储在栈（stack）中，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储

引用数据类型：同时存储在栈（stack）和堆（heap）中，占据空间大、大小不固定。引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体

## null与undefined的区别是什么

【null】表示为空，代表此处不应该有值的存在，一个对象可以是null，代表是个空对象，而null本身也是对象。<br/>
【undefined】表示『不存在』，表示一个变量声明了但是并没有赋值

## 为什么会有bigint提案

JavaScript中Number. MAX_SAFE_INTEGER表示最大安全数字, 计算结果是9007199254740991，即在这个数范围内不会出现精度丢失（小数除外）。<br/>
但是一旦超过这个范围，js就会出现计算不准确的情况，这在大数计算的时候不得不依靠一些第三方库进行解决，因此官方提出了BigInt来解决此问题。

## 0. 1加0. 2为什么不等于0. 3

JS 的 *Number* 类型遵循的是 **IEEE 754** 标准 <br/>
以 0. 1 转换为 IEEE 754 标准表示为例解释一下如何求 exponent bias 和 fraction。转换过程主要经历 3 个过程：

1. 将 0.1 转换为二进制表示
2. 将转换后的二进制通过科学计数法表示
3. 将通过科学计数法表示的二进制转换为 IEEE 754 标准表示

具体如何转换可以下面去了解这里不做过多阐述<br/>
此时如果将这个数转换为十进制，可以发现值已经变为 0. 100000000000000005551115123126 而不是 0. 1 了，因此这个计算精度就出现了问题

## 类型转换的规则

什么时候可能出现隐式类型转换：

* if语句
* 逻辑语句
* 数学运算
* ==

![2019-06-23-09-32-17]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/c378afab84afcdf430aec5229649faee.png)

``` js
Number(false) // 0
Number('') // 0
Number([]) // 0
Number(null) // 0
Number(undefined) // NaN
Number([20]) // 20
Boolean([]) // true
String(['twienty']) // twienty
String({}) //[object Object]
```

【提问】**==** 和 **===** 的区别<br/>
【提问】都有什么原始值转化为 number类型 后为0: false, 0, '0', [], null, ''<br/>
【提问】都有什么原始值转化为 boolean类型 后为false: false, 0, NaN, '', null, undefined<br/>

### 类型转换的原理是什么

类型转换指的是将一种类型转换为另一种类
类型转换分为显式和隐式, 但是不管是隐式转换还是显式转换

``` js
{} + [] //0
```

## 解释下变量提升

> 定义：JavaScript引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部

``` js
console.log(a) // undefined
var a = 1;

function b() {
    console.log(a)
}
b() // 1
```

上面的代码实际执行顺序是这样的:

第一步： 引擎将 `var a = 1` 拆解为 `var a = undefined` 和 `a = 1` ，并将 `var a = undefined` 放到最顶端， `a = 1` 还在原来的位置

这样一来代码就是这样:

``` js
var a = undefined;
console.log(a) // undefined
a = 1

function b() {
    console.log(a)
}
b() // 1
```

第二步就是执行，因此js引擎一行一行从上往下执行就造成了当前的结果，这就叫变量提升。

扩展：
(1) 变量声明提升：变量申明在进入执行上下文就完成了。
只要变量在代码中进行了声明，无论它在哪个位置上进行声明， js引擎都会将它的声明放在范围作用域的顶部；

(2) 函数声明提升：执行代码之前会先读取函数声明，意味着可以把函数申明放在调用它的语句后面。
只要函数在代码中进行了声明，无论它在哪个位置上进行声明， js引擎都会将它的声明放在范围作用域的顶部；

(3) 变量or函数声明：函数声明会覆盖变量声明，但不会覆盖变量赋值。（重点！！！）
同一个名称标识a，即有变量声明var a，又有函数声明function a() {}，不管二者声明的顺序，函数声明会覆盖变量声明，也就是说，此时a的值是声明的函数function a() {}。注意：如果在变量声明的同时初始化a，或是之后对a进行赋值，此时a的值变量的值。eg: var a; var c = 1; a = 1; function a() { return true; } console. log(a); 

## js是解释型还是编译型语言可引深jit

### 编译型语言：C，C##，JAVA

> 编译型语言是需要使用编译器先对代码进行编译为机器码，再运行程序，并不是直接运行的。

### 解释型语言：SQL，Python

> 对代码进行一句一句的直接运行，在程序运行期间，使用解释器动态将代码解释为机器码，再运行。

### 优缺点

编译型的语言在运行期间一般是要比解释型的要快一点，因为编译型的语言已经是机器码，无需要再进行解释为机器码。<br/>
解释型语言可以写完一行，或一小段程序之后，马上运行，马上调试，快速的测试自己的想法。

JS预解析：每次执行之前，需快速预览一遍，以便尽可能提高执行效率
普遍JS认为是解释型语言

引升：虽然JS执行时像是编译过的或者是一种混合，但JS是一门解释性语言

* JS代码需要在机器（node或者浏览器）上安装一个工具（JS引擎）才能执行。这是解释型语言需要的。编译型语言产品能够自由地直接运行
* 变量提升等不是代码修改。在这个过程中没有生成中间代码。这只是JS解释器处理事情的方式
* 即时编译是唯一一点我们可以对JavaScript是否是一个解释型语言提出疑问的理由。

但是即时编译不是纯粹的编译器，它在执行前进行编译。而且JIT知识Mozilla和Google的开发人员为了在他们的浏览器产品中提升性能才引入的。JavaScript或TC39从来没有要求这样做

## js变量类型

ECMAScript的变量是松散型的，所谓松散型指的是可以用来保存任何类型的的数据
变量有：局部变量 和 全局变量
下面例子：

``` js
function test() {
    var message = 'hi';
}
alert(message); // message is not defined (message是局部变量，外面无法访问)
test();
alert(message); // message is not defined (message已经被销毁)
```

## js的作用域和作用域链

作用域（靠函数来形成）： *全局作用域*和*局部作用域*

### 全局作用域

* 函数外定义的作用域
* 定义直接赋值的变量拥有全局作用域
* window对象拥有全局作用域

### 局部作用域

* 函数内部（在函数外部不能访问）

### ES6块级作用域

* {}
* let，const

### 什么是作用域链

通俗的讲，当声明一个函数时候，局部作用域一级一级向上包起来，就是作用域链接

### 作用域链的本质

> 其本质是JavaScript在执行过程中会创造可执行上下文，可执行上下文中的词法环境中含有外部词法环境的引用，

我们可以通过这个引用获取外部词法环境的变量、声明等，这些引用串联起来一直指向全局的词法环境，因此形成了作用域链

## 谈谈对原型链的理解

问题关键：1. 原型对象是什么 2. 原型链是如何形成的

### 原型对象

绝大部分的函数(少数内建函数除外)都有一个 `prototype` 属性, 这个属性是原型对象用来创建新对象实例, 而所有被创建的对象都会共享原型对象, 因此这些对象便可以访问原型对象的属性。

例如 `hasOwnProperty()` 方法存在于Obejct原型对象中, 它便可以被任何对象当做自己的方法使用. 

> 用法： `object.hasOwnProperty( propertyName )`
> `hasOwnProperty()` 函数的返回值为 `Boolean` 类型。如果对象 `object` 具有名称为 `propertyName` 的属性，则返回 `true` ，否则返回 `false` 。

``` js
 var person = {
     name: "Messi",
     age: 29,
     profession: "football player"
 };
 console.log(person.hasOwnProperty("name")); //true
 console.log(person.hasOwnProperty("hasOwnProperty")); //false
 console.log(Object.prototype.hasOwnProperty("hasOwnProperty")); //true
```

由以上代码可知, `hasOwnProperty()` 并不存在于person对象中, 但是 `person` 依然可以拥有此方法. <br/>
所以 `person` 对象是如何找到 `Object` 对象中的方法的呢? 靠的是 `原型链` 。

### 原型链

原因是每个对象都有 `__proto__` 属性，此属性指向该对象的构造函数的原型。<br/>
对象可以通过 `__proto__` 与上游的构造函数的原型对象连接起来，而上游的原型对象也有一个 `__proto__` ，这样就形成了原型链。<br/>

> 经典原型链图

![2019-06-15-05-36-59]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/282ef60fe1dfe60924c6caeaeab6c550.png)

## 理解闭包吗

背景：

> 上面我们得知作用域分为*全局变量*和*局部变量*，另外函数内部可以直接读取全局变量，函数外部无法读取函数内部的局部变量

我们要获取局部作用域里面的变量我们可以如下操作

``` js
function f1() {
    var n = 999;

    function f2() {
        alert(n);
    }
    return f2;
}
var result = f1();
result(); // 999
```

### 概念

如上面代码中的f2函数就是闭包，闭包就是能够读取其他函数内部变量的函数
在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁

### 用途

1. 前面说的可以读取函数内部的变量
2. 让这些变量的值始终保持在内存中

``` js
function f1() {
    var n = 999;
    nAdd = function() {
        n += 1
    }

    function f2() {
        alert(n);
    }
    return f2;
}
var result = f1();
result(); // 999
nAdd();
result(); // 1000
```

在这段代码中，result实际上就是闭包f2函数。它一共运行了两次，第一次的值是999，第二次的值是1000。这证明了，函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。<br/>
为什么会这样呢？原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。<br/>
这段代码中另一个值得注意的地方，就是"nAdd=function(){n+=1}"这一行，首先在nAdd前面没有使用var关键字，因此nAdd是一个全局变量，而不是局部变量。其次，nAdd的值是一个匿名函数（anonymous function），而这个匿名函数本身也是一个闭包，所以nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。

参考：
[ruanyifeng](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)

## [讲讲js垃圾回收是怎么做的？](https://juejin.im/post/5a6b3fcaf265da3e2c385375)

垃圾回收的方法：*标记清楚*、*计数引用*
标记清除:
js中最常用的垃圾收集方式是标记清除。当变量进入环境（例如，在函数中声明一个变量）时，就将这个变量标记为“进入环境”。从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为只要执行流进入相应的环境，就可能会用到他们。而当变量离开环境时，则将其标记为“离开环境”。

可以使用任何方式来标记变量。比如，可以通过翻转某个特殊的位来记录一个变量何时进入环境，或者使用一个“进入环境的”变量列表及一个“离开环境的”变量列表来跟踪哪个变量发生变化。

垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记（当然，可以使用任何标记方式）。然后，它会去掉环境中的变量以及被环境中的变量引用的变量标记。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后，垃圾收集器完成内存除工作，销毁那些带标记的值并回收他们所占用的内存空间。

引用计数（不常见）:
引用计数的含义是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型值赋给该变量时，则这个值的引用次数就是1。如果同一个值又被赋给另一个变量，则该值的引用次数加1. 相反，如果包含对这个值引用的变量又取的了另一个值，则这个值的引用次数减1. 当这个值的引用次数变成0时，则说明没有办法再访问这个值了，因而就可以将其占用的内存空间收回来。这样，当垃圾收集器下次再运行时，它就会释放那些引用次数为零的值所占用的内存。

## this的理解

this的几种情况：
this的指向不是在编写时确定的, 而是在执行时确定的，同时，this不同的指向在于遵循了一定的规则。

默认情况: this是指向全局对象的，比如在浏览器就是指向window

``` js
name = "Bale";

function sayName() {
    console.log(this.name);
};
sayName(); //"Bale"
```

隐式绑定: 如果函数被调用的位置存在上下文对象时

``` js
function f() {
    console.log(this.name);
}
var obj = {
    name: "Messi",
    f: f
};
obj.f(); //被调用的位置恰好被对象obj拥有，因此结果是Messi
```

显示改变this指向: 常见的方法就是call、apply、bind

``` js
function f() {
    console.log(this.name);
}
var obj = {
    name: "Messi",
};
var obj1 = {
    name: "Bale"
};
f.bind(obj)(); //Messi ,由于bind将obj绑定到f函数上后返回一个新函数,因此需要再在后面加上括号进行执行,这是bind与apply和call的区别
```

new 绑定: 用 new 调用一个构造函数，会创建一个新对象, 在创造这个新对象的过程中, 新对象会自动绑定到Person对象的this上，那么 this 自然就指向这个新对象

``` js
function Person(name) {
    this.name = name;
    console.log(name);
}
var person1 = new Person('Messi'); //Messi
```

> 绑定优先级: new绑定 > 显式绑定 >隐式绑定 >默认绑定

[this的原理](http://www.ruanyifeng.com/blog/2018/06/javascript-this.html)

### 箭头函数的this指向哪里

箭头函数不同于传统JavaScript中的函数, 箭头函数并没有属于自己的this, 它的所谓的this是捕获其所在上下文的 this 值，作为自己的 this 值, 并且由于没有属于自己的this, 而箭头函数是不会被new调用的，这个所谓的this也不会被改变. 

``` js
// ES6
const obj = {
    getArrow() {
        return () => {
            console.log(this === obj);
        };
    }
}
```

转化后：

``` js
// ES5，由 Babel 转译
var obj = {
    getArrow: function getArrow() {
        var _this = this;
        return function() {
            console.log(_this === obj);
        };
    }
};
```

## call与apply与bind区别

call/apply: 
改变this指向，调用其他对象的方法，call/apply语法不同，效果一致，都是【立即执行】
bind:
【非立即执行】，需要触发某条件才执行，语法同call

## async和await是什么

> async 函数，就是 Generator 函数的语法糖，它建立在Promises上，并且与所有现有的基于Promise的API兼容

### async/await相比于promise的优势

* 代码读起来更加同步，Promise虽然摆脱了回调地狱，但是then的链式调用也会带来额外的阅读负担
* Promise传递中间值非常麻烦，而async/await几乎是同步的写法，非常优雅
* 错误处理友好，async/await可以用成熟的try/catch，Promise的错误捕获非常冗余
* 调试友好，Promise的调试很差，由于没有代码块，你不能在一个返回表达式的箭头函数中设置断点，如果你在一个. then代码块中使用调试器的步进(step-over)功能，调试器并不会进入后续的. then代码块，因为调试器只能跟踪同步代码的『每一步』。

## [函数式编程](https://juejin.im/post/5c19c3ffe51d45059b632eef)

在函数式编程中，函数就是一个管道（pipe）。这头进去一个值，那头就会出来一个新的值，没有其他作用

### 函数的合成和柯里化

### 合成

假如：
**X**和**Y**之间的变形关系是函数**f**，**Y**和**Z**之间的变形关系是函数**g**，那么**X**和**Z**之间的关系，就是**g**和**f**的合成函数**g·f**
简单代码如下：

``` js
const compose = function(f, g) {
    return function(x) {
        return f(g(x));
    };
}
```

函数的合成还必须满足合成率：

``` js
compose(f, compose(g, h))
// 等同于
compose(compose(f, g), h)
// 等同于
compose(f, g, h)
```

### 柯里化

f(x)和g(x)合成为f(g(x))，有一个隐藏的前提，就是f和g都只能接受一个参数。如果可以接受多个参数，比如f(x, y)和g(a, b, c)，函数合成就非常麻烦。

这时就需要函数柯里化了。所谓"柯里化"，就是把一个多参数的函数，转化为单参数函数。

``` js
// 柯里化之前
function add(x, y) {
    return x + y;
}
add(1, 2) // 3
// 柯里化之后
function addX(y) {
    return function(x) {
        return x + y;
    };
}
addX(2)(1) // 3
```

## 响应

[js字符串截取函数slice()、substring()、substr()](http://www.cnblogs.com/lmsblogs/p/5876384.html)

---

[参考文章](http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html)

---
