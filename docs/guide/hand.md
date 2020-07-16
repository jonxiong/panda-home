# 手写代码

- [手写代码](#手写代码)
  - [组件实现](#组件实现)
  - [实现定时数字自](#实现定时数字自)
  - [简单算法](#简单算法)
    - [浅拷贝与深拷贝](#浅拷贝与深拷贝)
    - [求数组交集，并集, 差集](#求数组交集并集-差集)
    - [找出数组中出现次数最多元素，并给出其出现过的位置](#找出数组中出现次数最多元素并给出其出现过的位置)
    - [函数的防抖和截流](#函数的防抖和截流)
  - [观察者模式和监听发布者模式](#观察者模式和监听发布者模式)
  - [较难算法](#较难算法)
  - [大数 加减乘除](#大数-加减乘除)
  - [快速排序算法](#快速排序算法)
  - [手写promise, slice](#手写promise-slice)
  - [数组](#数组)
  - [代码题](#代码题)
  - [argument是什么类型，如何转换成数组](#argument是什么类型如何转换成数组)
  - [如何获取函数的名字](#如何获取函数的名字)
  - [substr|slice|splice|split](#substrslicesplicesplit)
    - [splice(数组)](#splice数组)
    - [split（字符串）](#split字符串)
  - [实现一个函数getNum, 按照如下规则输出第count个数结果](#实现一个函数getnum-按照如下规则输出第count个数结果)
  - [数组乱排](#数组乱排)
  - [用class写出发布者订阅模式，实现on，off，once(一次绑定)](#用class写出发布者订阅模式实现onoffonce一次绑定)

## 组件实现

## 实现定时数字自

## 简单算法

### 浅拷贝与深拷贝

* 基本数据类型的特点：直接存储在栈(stack)中的数据
* 引用数据类型的特点：存储的是该对象在栈中引用，真实的数据存放在堆内存里

### 求数组交集，并集, 差集

差集：以属于A而不属于B的元素为元素的集合成为A与B的差

es7：Array. prototype. includes

``` js
// 并集
let union = a.concat(b.filter(v => !a.includes(v)));
// 交集
let intersection = a.filter(v => b.includes(v));
// 差集
let difference = a.concat(b).filter(v => a.includes(v) && !b.includes(v));
```

es6:
ES6中新增的一个Array. from方法，用于将类数组对象和可遍历对象转化为数组。只要类数组有length长度，基本都可以转化为数组。结合Set结构实现数学集求解

``` js
let a = [1, 2, 3]
let b = [2, 4, 5]
let aSet = new Set(a)
let bSet = new Set(b)
// 并集
let union = Array.from(new Set(a.concat(b)));
// 交集
let intersection = Array.from(new Set(a.filter(v => bSet.has(v))));
// 差集
let differenceNew = Array.from(new Set(a.concat(b).filter(v => aSet.has(v) && !bSet.has(v)));
```

### [找出数组中出现次数最多元素，并给出其出现过的位置](https://github.com/zhouxiongking/article-pages/blob/master/articles/maxFrequencyNum/maxFrequencyNum.js)

### [函数的防抖和截流](https://juejin.im/post/5b7b88d46fb9a019e9767405)

* debounce（防抖），简单来说就是防止抖动

``` js
window.onload = function() {
    // 1、获取这个按钮，并绑定事件
    var myDebounce = document.getElementById("debounce");
    myDebounce.addEventListener("click", debounce(sayDebounce));
}

// 2、防抖功能函数，接受传参
function debounce(fn) {
    // 4、创建一个标记用来存放定时器的返回值
    let timeout = null;
    return function() {
        // 5、每次当用户点击/输入的时候，把前一个定时器清除
        clearTimeout(timeout);
        // 6、然后创建一个新的 setTimeout，
        // 这样就能保证点击按钮后的 interval 间隔内
        // 如果用户还点击了的话，就不会执行 fn 函数
        timeout = setTimeout(() => {
            fn.call(this, arguments);
        }, 1000);
    };
}

// 3、需要进行防抖的事件处理
function sayDebounce() {
    // ... 有些需要防抖的工作，在这里执行
    console.log("防抖成功！");
}
```

> 任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行
>  

结合上面的代码，我们可以了解到，在触发点击事件后，如果用户再次点击了，我们会清空之前的定时器，重新生成一个定时器。意思就是：这件事儿需要等待，如果你反复催促，我就重新计时

* throttle(节流)

``` js
window.onload = function() {
    // 1、获取按钮，绑定点击事件
    var myThrottle = document.getElementById("throttle");
    myThrottle.addEventListener("click", throttle(sayThrottle));
}

// 2、节流函数体
function throttle(fn) {
    // 4、通过闭包保存一个标记
    let canRun = true;
    return function() {
        // 5、在函数开头判断标志是否为 true，不为 true 则中断函数
        if (!canRun) {
            return;
        }
        // 6、将 canRun 设置为 false，防止执行之前再被执行
        canRun = false;
        // 7、定时器
        setTimeout(() => {
            fn.call(this, arguments);
            // 8、执行完事件（比如调用完接口）之后，重新将这个标志设置为 true
            canRun = true;
        }, 1000);
    };
}

// 3、需要节流的事件
function sayThrottle() {
    console.log("节流成功！");
}
```

> 节流：指定时间间隔内只会执行一次任务

[参考文章](https://juejin.im/post/5c87b54ce51d455f7943dddb#chapter-three-one)

## [观察者模式和监听发布者模式](https://www.cnblogs.com/onepixel/p/10806891.html)

> 订阅-发布模式

``` js
classPubSub {
    constructor() {
        this.subscribers = [];
    }
    subscribe(topic, callback) {
        letcallbacks = this.subscribers[topic];
        if (!callbacks) {
            this.subscribers[topic] = [callback];
        } else {
            callbacks.push(callback);
        }
    }
    publish(topic, ...args) {
        letcallbacks = this.subscribers[topic] || [];
        callbacks.forEach(callback => callback(...args));
    }
}

// 创建事件调度中心，为订阅者和发布者提供调度服务
letpubSub = newPubSub();
// A订阅了SMS事件（A只关注SMS本身，而不关心谁发布这个事件）
pubSub.subscribe('SMS', console.log);
// B订阅了SMS事件
pubSub.subscribe('SMS', console.log);
// C发布了SMS事件（C只关注SMS本身，不关心谁订阅了这个事件）
pubSub.publish('SMS', 'I published `SMS` event');
```

> 观察者模式

``` js
classSubject {
    constructor() {
        this.observers = [];
    }

    add(observer) {
        this.observers.push(observer);
    }

    notify(...args) {
        this.observers.forEach(observer => observer.update(...args));
    }
}

classObserver {
    update(...args) {
        console.log(...args);
    }
}

// 创建观察者ob1
letob1 = newObserver();
// 创建观察者ob2
letob2 = newObserver();
// 创建目标sub
letsub = newSubject();
// 目标sub添加观察者ob1 （目标和观察者建立了依赖关系）
sub.add(ob1);
// 目标sub添加观察者ob2
sub.add(ob2);
// 目标sub触发SMS事件（目标主动通知观察者）
sub.notify('I fired `SMS` event');
```

## 较难算法

## 大数 加减乘除

## 快速排序算法

## 手写promise, slice

https://juejin.im/post/5eb8b1f7e51d4540bb617226

## [数组](https://juejin.im/post/5d71fff5f265da03e4678328)

## 代码题

``` js
var b = 1

function b() {
    console.log(2)
}
console.log(b)

function b() {
    console.log(3)
}
```

``` js
var a = 1

function fun() {
    a++
    console.log(a)
    var a = 2
    a++
    console.log(a)
}
fun()
```

## argument是什么类型，如何转换成数组

类型： 类数组
方法一：

``` js
var args = Array.prototype.slice.call(arguments);
```

方法二：

``` js
var args = [].slice.call(arguments, 0);
```

方法三：

``` js
var args = [];
for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
}
```

通用转换成数组的表达式：

``` js
function toArray(s) {
    try {
        return Array.prototype.slice.call(s);
    } catch (e) {
        var arr = [];
        for (var i = 0, len = s.length; i < len; i++) {
            //arr.push(s[i]);
            arr[i] = s[i]; //据说这样比push快
        }
        return arr;
    }
}
```

## 如何获取函数的名字

* ES5

``` js
function functionName(fun) {
    var ret = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
}
// 回忆一下substr
stringObject.substr(start, length)
// start: 必需。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
// length: 可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。
// 一个新的字符串，包含从 stringObject 的 start（包括 start 所指的字符） 处开始的 length 个字符。如果没有指定 length，那么返回的字符串包含从 start 到 stringObject 的结尾的字符。
```

* ES6

``` js
myFunction.name
```

* js权威指南上看到一个方法|正则

``` js
Function.prototype.getName = function() {
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
}
```

## substr|slice|splice|split

**slice(a, b)**

* 字符串：截取字符串中a到b的位置(不包括b), 长度为 b-a, 如果b为负数，这时候b可以看做 字符串length-b
* 数组: 操作形式结果与字符串一样

arr. slice(a, b)获取数组a到b项（不包括b项, 截取的长度为b-a）**对原数组没有影响！！**
slice(-1)获取数组最后一项（如果是string的话返回最后一个字符）

### splice(数组)

splice 对数组 截取 **直接更改原数组!!!**
arr. splice(a, b, c)
a: 参数开始的位置
b: 删除个数（没写或者为0则全部删除）
c: 新增参数

### split（字符串）

将字符串分割为字符串数组，并返回此数组
直接看例子
var str = "I, am, xiong"
str. split(", ") // ["i", "am", "xiong"]
str. split(", ", 2)//["i", "am"]  后面这个数字为分割的参数，分割的次数将不超出这个数字
str. split("")//["i", ", ", "a", "m", ", ", "x", "i", "o", "n", "g"]
str. split(" ")//["i, am, xiong"]

## 实现一个函数getNum, 按照如下规则输出第count个数结果

> 已知数列规则为[1, 3, 7, 13, 21, 31, 43, ... ]
> 输入：3 输出13

## 数组乱排

## 用class写出发布者订阅模式，实现on，off，once(一次绑定)
