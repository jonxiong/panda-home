# 面试题目汇总

## localstorage同源网页，一个网页改变了，另一个网页如何获取

## async await 写一个sleep函数

*  两数组去重用es6实现
*  [... new Set()]三个点是什么意思
*  继承
*  项目中遇到什么问题如何解决的
*  [js严格模式与普通模式的区别](https://www.jianshu.com/p/39e295f4526d)
  + 变量必须先声明后使用，且无法删除，不能重复
  + 不能对只读属性赋值，不能删除不可删除的属性
  + 禁止this指向全局对象
*  jsbridge
*  页面元素图片过多或者图片过大如何处理
* input有什么类型
* sass如何定义变量

尾递归
Hit
手写字符串解析（字符串和Object合并）
请求劫持的时候怎么判断请求是否被劫持了
算法归并排序
做过什么出色的东西，怎么做的
做过什么有亮点的东西
设计一个vue组件
Jquery和zepto data的区别
实现a(). b(). c() 输出abc
实现随意b(). a(). c()
Http2. 0特性
Delegate怎么判断真实的元素是哪个
怎么用Promise以外实现异步调用
5个请求发来怎么保证请求顺序
Async, await和generator有什么区别
数据库索引
数据库聚合
怎么防刷数据

* jquery 扩展
* jquery 事件代理
* 原生实现：给父元素绑定事件，获取 e. target， 

判断 e. target 是否是被代理的元素，如果是则执行 - bind（全部绑定一次）, live（先把 
元素存储为 query 对象，再代理; 只能使用 css 选择器）, delegate（直接代理）, on 
第一套： 

1. 项目模块的划分和划分标准；模块之间如何做到解耦；模块之间的通信、数据流向。 
2. 前端工程化，使用 FIS 对比 grunt 的差别和优势， FIS 插件的细节问题（注册到哪个阶段）3. JS 

语言：typeof、Symbol 类型的使用、判断全局变量、数组的判断。写码示范 JS 如何实现继承。 

5. 后端开发：简单了解。 
6. 移动端开发：点击穿透的问题。 
7. HTTP 协议，对于 keep alive 理解。 

第二套： 
Ajax 和 jsonp 的区别 
flex 属性都代表什么意思
主要是基础问题加算法 

1. 如何实现一个表单单选：性别○男○女和提交按钮，男为默认勾选，点击性别时 focus 到男女 

选项上 

2. 提交的两种实现（input + type=submit, button+点击事件） 
3. 点击事件具体 js 实现及 Jquery 对应的 api 
5. 不同浏览器的事件机制 
9. 简单的算法题 

第四套： 

1. React 的 flex 的实现原理？ 
2. Angular 的双向数据绑定的实现原理？ 
3. jquery 的 API 有好多，有都看过么？ 

React，Angular，jquery 是人选用过才有问的。 
第五套 

1. 模块之间如何做到解耦：以事件来解耦，非最优。举了一个例子，将 require 变成 init 时候传 

入实例解耦的例子，说明其对这块有一定深入，但是其实质并非不用 require 就能解耦，这块并 
没有认识到。模块之间的通信、数据流向：通过 mdediator 层进行通信。总体来说，答的比较 
好。6 / 10 

2. 前端工程化。使用了 FIS，让其对比了与 grunt 的差别和优势，答的还可以。问了其写的一个 

FIS 插件的细节问题（注册到哪个阶段）。 

3. JS 语言尚可：typeof（有错误）、Symbol 类型的使用（答的不好）、判断全局变量（正确）、数 

组的判断（基本正确）。写码示范 JS 如何实现继承，写的比较烂。 

4. CSS 略差：两列布局，答的不好，用了 margin 又用 padding，父元素用 overflow:hidden 不知道 

是为了解决什么问题。CSS 选择器及其优先级，选择器答对，优先级有少许错误。 

7. HTTP 协议，基本上掌握的还可以。对于 keep alive 理解的不够。 

一面：各种技术，项目，原理，框架， 
二面： 
具体的某个框架的实现原理，是否去优化过这些框架，怎么优化的 
新技术深层次的使用方法，有没有研究过更深入的方法。 
带团队相关

###css

* 实现纯css，单选按钮
* 响应式布局，用过哪些

###js

* 了解websocket吗
* 变量提升出了道题

	

``` 
		var tmp = 'outer';
		(function(){
			console.log(tmp);
			if([]==[]){
				var tmp = 'inner';
			}

		})()
	```

``` 
var name = 'outer';
var obj = {
	name:'inner',
	close:function(){
		return function(){
			console.log(this.name);
		}
	}
}
1.obj.close()//输出什么
2.怎么让obj.close输出outer
```

* 定时器，和promise

``` 
setTimeout(function(){console.log(1)},0)
Promise( function(resolve, reject) {
	console.log(2)
	for(var i = 0;i<99999;i++){
		resolve();
	}
	console.log(3);
}).then(function(){
	console.log(4)
});
console.log(5)
```

* udp和tcp区别
* 啥是链表
* xss了解吗，讲一下，怎么防范
* 两个有序数组[1, 3, 5, 7, 9, 30], [2, 3, 5, 8, 22, 15, 20]，要求写一个方法，输出排好序的数组，时间复杂度为N


1. react hook 原理？- 不清楚原理，介绍了比较多用法 - 3.5
> 解决了副作用等问题useEffect，了解比较多的用法
2. react vdom 算法 - 没了解 - 2
> 简单知道下解决的问题
3. 受控组件与非受控组件区别 - 3.5
4. 如何实现长距离父子组件通信 - 3（提到了 emit，没提到 context，错误的提到 fiber）；
5. redux 的优缺点 - 3

6. fis3 如何识别循环依赖 - 3
7. 性能优化 - 3.5
    fis3 - inline、script（preload，prefetch）  （有自己写 fis3 插件）
8. Javascript 是单线程，那它是如何实现同步和异步的？介绍了 eventloop  - 4
9. git commit diff view - 4
    算法 - （使用了系统的 diff => 存文件，使用 node子进程做的diff逻辑）
    页面组件设计 - 基本未涉及
10. SSR- 未用过，Node - 有简单使用；
11. pm2 - 有简单用过；
## 相关文章

https://juejin.im/post/5cc1da82f265da036023b628
https://juejin.im/post/5b3c87386fb9a04f9a5cb037
