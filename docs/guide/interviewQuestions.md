# 面试题目汇总
## 美团
### css3需要知道的
比较出名的rem和视口相关单位，以及新的选择器（new selectors）、媒体查询（media queries）、网页文字（web fonts）、圆形边框（rounded borders）、动画（animation）、变换（transitions）、变形（transformations）

### http三次握手四次挥手
HTTP与TCP区别和联系：
TCP对应传输层，HTTP对应应用层，从本质上来说，两者没有可比性；

HTTP协议即超文本传送协议(Hypertext Transfer Protocol )，是Web联网的基础，也是手机联网常用的协议之一，HTTP协议是建立在TCP协议之上的一种应用。

Http协议是建立在TCP协议基础之上的，当浏览器需要从服务器获取网页数据的时候，会发出一次Http请求。Http会通过TCP建立起一个到服务器的连接通道，当本次请求需要的数据完毕后，Http会立即将TCP连接断开，这个过程是很短的。所以Http连接是一种短连接，是一种无状态的连接。

- TCP是底层协议，定义的是数据传输和连接方式的规范。
- HTTP是应用层协议，定义的是传输数据的内容的规范。

所以三次握手和四次挥手是针对TCP连接的：

#### 三次握手
所谓三次握手(Three-way Handshake)，是指建立一个 TCP 连接时，需要客户端和服务器总共发送3个包。
三次握手的目的是连接服务器指定端口，建立 TCP 连接，并同步连接双方的序列号和确认号，交换 TCP 窗口大小信息。在 socket 编程中，客户端执行 connect() 时。将触发三次握手

- 第一次握手(SYN=1, seq=x):
客户端发送一个 TCP 的 SYN 标志位置1的包，指明客户端打算连接的服务器的端口，以及初始序号 X,保存在包头的序列号(Sequence Number)字段里。
发送完毕后，客户端进入 SYN_SEND 状态。
- 第二次握手(SYN=1, ACK=1, seq=y, ACKnum=x+1):
服务器发回确认包(ACK)应答。即 SYN 标志位和 ACK 标志位均为1。服务器端选择自己 ISN 序列号，放到 Seq 域里，同时将确认序号(Acknowledgement Number)设置为客户的 ISN 加1，即X+1。 发送完毕后，服务器端进入 SYN_RCVD 状态。
- 第三次握手(ACK=1，ACKnum=y+1)
客户端再次发送确认包(ACK)，SYN 标志位为0，ACK 标志位为1，并且把服务器发来 ACK 的序号字段+1，放在确定字段中发送给对方，并且在数据段放写ISN的+1
发送完毕后，客户端进入 ESTABLISHED 状态，当服务器端接收到这个包时，也进入 ESTABLISHED 状态，TCP 握手结束。

#### 四次握手
TCP 的连接的拆除需要发送四个包，因此称为四次挥手(Four-way handshake)，也叫做改进的三次握手。客户端或服务器均可主动发起挥手动作，在 socket 编程中，任何一方执行 close() 操作即可产生挥手操作。
简化说：
- 第一次挥手：clientToServer（C: 发送FIN，我没有数据给你了）
- 第二次挥手：serverToClient（S: 好的我知道要关闭请求了，我准备关闭连接）
- 第三次挥手：serverToClient（S: 我再没有数据给你了，我准备好关系连接了）
- 第四次挥手：clientToServer（C: 好的收完了，你可以关闭我们之间的数据传输通道了，S收到确认信息，关闭连接）

### HTTP的GET与POST请求的差别
除了我们周知的
- 数据传输方式不同：GET请求通过URL传输数据，而POST的数据通过请求体传输。
- 安全性不同：POST的数据因为在请求主体内，所以有一定的安全性保证，而GET的数据在URL中，通过历史记录，缓存很容易查到数据信息。
- 数据类型不同：GET只允许 ASCII 字符，而POST无限制
- GET无害： 刷新、后退等浏览器操作GET请求是无害的，POST可能重复提交表单
- 特性不同：GET是安全（这里的安全是指只读特性，就是使用这个方法不会引起服务器状态变化）且幂等（幂等的概念是指同一个请求方法执行多次和仅执行一次的效果完全相同），而POST是非安全非幂等

本质上都为TCP链接，并无差别；
区别是：GET产生一个TCP数据包，POST产生两个TCP数据包


### https,如果要将http站迁移到https怎么做迁移
为什么要升级成https：

升级到HTTPS是改善网站和最终业务性能的好方法。
经过测试，运行在HTTPS上的网站的性能要优于HTTP上的网站。原因：数据安全性，更好的技术支持和更好的SEO。

1. 首先要申请SSL证书，然后将SSL证书安装到服务器端
2. 整改网站链接：SSL证书安装成功后，你的服务器就支持https了。这时我们要把自己网站上的全部链接修改成https的形式
3. 运行301重定向： 301重定向将90-99％的排名能力转移到重定向的页面。他们将您的站点平稳地移至HTTPS，从而保持SEO完整性。因此，请在服务器级别运行它们

### https与http的默认端口号
- HTTP服务器，默认端口号为80/tcp（木马Executor开放此端口）
- HTTPS（securely transferring web pages）服务器，默认端口号为443/tcp  443/udp

### 缓存catch-control，etag意思
### 如何让每次请求都请求新的资源

### localstorage跨域共享,localstorage超过5m如何处理

### transform,translation,animation,translate，以及如何监听动画完成
### 轮播如果要循环怎么做
### 做过那哪些优化,带团队的话你手下有两个人如何展开项目，有哪些标准衡量你这个项目做的好的地方


```js
var b = 1
function b(){
    console.log(2)
}
console.log(b)
function b(){
    console.log(3)
}
```

```js
var a =1
function fun(){
    a++
    console.log(a)
    var a = 2
    a++
    console.log(a)
}
fun()
```
### 原型相关

### 如何获取函数的名字
方法一：ES5
```js
function functionName(fun) {
  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}
// 回忆一下substr
stringObject.substr(start,length)
// start: 必需。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
// length: 可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。
// 一个新的字符串，包含从 stringObject 的 start（包括 start 所指的字符） 处开始的 length 个字符。如果没有指定 length，那么返回的字符串包含从 start 到 stringObject 的结尾的字符。
```

方法二：ES6
```js
myFunction.name
```

方法三：js权威指南上看到一个方法|正则
```js
Function.prototype.getName = function(){
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
}
```
### substr|slice|splice|split
#### slice（数组，字符串）
**slice(a,b)**
- 字符串：截取字符串中a到b的位置(不包括b),长度为 b-a,如果b为负数，这时候b可以看做 字符串length-b
- 数组: 操作形式结果与字符串一样
arr.slice(a,b)获取数组a到b项（不包括b项,截取的长度为b-a）**对原数组没有影响！！**
slice(-1)获取数组最后一项（如果是string的话返回最后一个字符）

#### splice(数组)
splice 对数组 截取 **直接更改原数组!!!**
arr.splice(a,b,c)
a: 参数开始的位置
b: 删除个数（没写或者为0则全部删除）
c: 新增参数

#### split（字符串）
将字符串分割为字符串数组，并返回此数组
直接看例子
var str = "I,am,xiong"
str.split(",") // ["i", "am", "xiong"]
str.split(",",2)//["i", "am"]  后面这个数字为分割的参数，分割的次数将不超出这个数字
str.split("")//["i", ",", "a", "m", ",", "x", "i", "o", "n", "g"]
str.split(" ")//["i,am,xiong"]

[js字符串截取函数slice()、substring()、substr()](http://www.cnblogs.com/lmsblogs/p/5876384.html)

### argument是什么类型，如何转换成数组
类型： 类数组
方法一：
```js
var args = Array.prototype.slice.call(arguments);
```
方法二：
```js 
var args = [].slice.call(arguments, 0);
```
方法三：
```js
var args = []; 
for (var i = 1; i < arguments.length; i++) { 
    args.push(arguments[i]);
}
```
通用转换成数组的表达式：
```js
function toArray(s) {
    try{
        return Array.prototype.slice.call(s);
    } catch(e){
        var arr = [];
        for(var i = 0,len = s.length; i < len; i++){
            //arr.push(s[i]);
               arr[i] = s[i];  //据说这样比push快
        }
         return arr;
    }
}
```

## momo
#### 实现一个函数getNum,按照如下规则输出第count个数结果
> 已知数列规则为[1,3,7,13,21,31,43,...] 
> 输入：3 输出13

#### 动画实现ios选择框效果
#### 如何实现圆环进度条
####有没有使用过ua，取得一个ua，获取其版本号，然后要求比较你获取的版本号是否在在版本号为8.1～8.2.35
#### 图片懒加载及其原理，并写出相关代码
#### Vue.nextTick()是做什么的
#### 0.5px相关引，引深出viewport，如何做页面兼容
#### input输入框每次输入获取数据大体是怎么实现的，如何避免用户输入过快的问题
#### webpack的loader和plugins是做什么的

## didi
###首先看你做过什么项目，由项目里随意引出问题
- 一面
#### banner是怎么如何实现的，问得很细（如何布局，上一页下一页如何实现，如何实现滑动等）
#### inline与line-block区别，图片是什么类型，span里面放img合理吗
#### vuex是做什么的，里面各个文件是怎么分工的
#### git你是如何回退版本，经常用什么命令
#### str=“kdfjsakdksks”,写一个函数将这个字符串反转输出,如何将这个方法添加到Array上，加在object上可不可以
#### let var const 区别
#### ()=>{}和function(){}的区别
#### promise如何使用
#### call，apply,bind区别
#### 用rem的坏处
#### 宽高没有的盒子如何上下居中
#### 给一个网页，从上到下解释下各个标签的意思用处，主要是head部分，同时问如果js和css会不会阻塞页面解析渲染
- 二面
#### vue生命周期（这道题就把我问住了。。。，就想到一个create）
#### cookie属性有
#### vue组件之间如何通信
#### 写一个方法实现深度拷贝（各种类型）
#### vue双向数据绑定实现原理，问得很细
#### webpack是如何打包的
#### 写一个弹窗插件，并要求该弹窗上操作还可以弹出第二个弹窗（其实没太懂他啥意思）
#### 将页面的解析渲染具体描述下
#### 解释一下同步和异步

## 58
#### class写法 + 继承写法
#### vue router,更改data没有改变的情况
#### 1px实现
#### localstorage 同源网页，一个网页改变了，另一个网页如何获取
#### async await 写一个sleep函数

## 京东金融
- （）=>{} 与 function（）{}区别
-  let const var 区别
-  this相关
-  ==与===
-  lazyload如何实现
-  vueX||vueRouter
-  flex布局
-  盒子模型
-  es6使用过什么各自解释
-  异步相关
-  绑定事件
-  两数组去重用es6实现
-  [...new Set()]三个点是什么意思
-  promise
-  class
-  继承
-  function相关
-  css3如何进行gpu加速，为何要加速，出现闪屏或者花屏如何处理
-  项目中遇到什么问题如何解决的
-  js严格模式与普通模式的区别
-  null,undefined,NaN
-  async await
-  jsbridge
-  页面元素图片过多或者图片过大如何处理
-  如何理解虚拟dom

#### 
- 盒子模型，如何更改盒子模型
- position几种定位
- display有什么类型，各个类型特点
- js数据类型
- margin重叠，bfc如何处理，除了bfc还能怎么处理
- animation和translation的区别
- 小熊移动动画怎么写的
- input有什么类型
- css3有什么新的属性
- es6用过什么类型
- storage与cookie区别
- sass如何定义变量
- 数组乱排
- 用class写出发布者订阅模式，实现on，off，once(一次绑定)
- 写一个函数给一个tagname获取它所有父元素的tagname
- promise

## 今日头条
http code =200但是不OK的情况
http 301 302的区别
http 304 什么意思 
http 200 from cache怎么回事
http缓存机制
js垃圾回收机制
event loop
https加密原理
尾递归
Hit
手写深拷贝
Vue双向绑定原理
手写字符串解析（字符串和Object合并）
请求劫持的时候怎么判断请求是否被劫持了
算法归并排序
做过什么出色的东西，怎么做的
做过什么有亮点的东西
设计一个vue组件
Jquery和zepto data的区别
Let var区别
实现a().b().c() 输出abc
实现随意b().a().c()
手写拖拽
Vue父子组件兄弟组件怎么通信
VueX数据流向图
Http2.0特性
跨域怎么实现
Delegate怎么判断真实的元素是哪个
作用域链
闭包
原型链
This和箭头函数this
箭头函数this是怎么实现的
Promise用法
怎么用Promise以外实现异步调用
5个请求发来怎么保证请求顺序
Async, await和generator有什么区别
数据库索引
数据库聚合
怎么防刷数据
Xss
Csrf
怎么跨域

## 快手
- 模板部分 
- css 部分 
- 状态码 
- 100-199 用于指定客户端响应相应的某些动作。 
- 200-299 用于表示请求成功。 
- 200 ok
- 201 created
- 202 accepted 
- 300-399 用于已经移动的文件并且常被包含在定位头信息中指定新的地址信息。 
- 300 多重选择
- 301 moved permanently 新 url 在响应头信息 
location 中给出
- 302 found/moved temporarily
- 304 not 
modified 
- 400-499 用于指出客户端的错误。 
- 400 bad request 语法错误 - 401 unauthorized 客户端在授权4 / 10 
头信息中没有有效的身份信息时访问受到密码保护的页面 
- 403 forbidden - 404 not found 
- 500-599 用于支持服务器错误 
- jquery 扩展
- $.getPageData = function () {}
- $.fn.extend({mouse wheel: 
function () {})
- jquery 事件代理
- 原生实现：给父元素绑定事件，获取 e.target， 
判断 e.target 是否是被代理的元素，如果是则执行 - bind（全部绑定一次）,live（先把 
元素存储为 query 对象，再代理;只能使用 css 选择器）,delegate（直接代理）,on 
第一套： 
1.项目模块的划分和划分标准；模块之间如何做到解耦；模块之间的通信、数据流向。 
2.前端工程化，使用 FIS 对比 grunt 的差别和优势， FIS 插件的细节问题（注册到哪个阶段）3.JS 
语言：typeof、Symbol 类型的使用、判断全局变量、数组的判断。写码示范 JS 如何实现继承。 
4.CSS：两列布局；CSS 选择器及其优先级。 
5.后端开发：简单了解。 
6.移动端开发：点击穿透的问题。 
7.HTTP 协议，对于 keep alive 理解。 
第二套： 
Ajax 和 jsonp 的区别 
事件冒泡及应用 
对象原型，call apply bind 区别 
盒模型 
如何分三列等宽度显示 
flex 属性都代表什么意思 
优化 JS 代码，给每个 a 元素都添加事件应用5 / 10 
第三套： 
主要是基础问题加算法 
1. 如何实现一个表单单选：性别○男○女和提交按钮，男为默认勾选，点击性别时 focus 到男女 
选项上 
2. 提交的两种实现（input + type=submit, button+点击事件） 
3. 点击事件具体 js 实现及 Jquery 对应的 api 
4. GET 和 POST 对比 
5. 不同浏览器的事件机制 
6. CSS 如何实现上下居中，包括内部文本垂直居中和整个块元素居中 
7. JS 跨域及解决方法 
8. 浏览器不同 tab 之间通信 
9. 简单的算法题 
第四套： 
1. React 的 flex 的实现原理？ 
2. Angular 的双向数据绑定的实现原理？ 
3. jquery 的 API 有好多，有都看过么？ 
React，Angular，jquery 是人选用过才有问的。 
第五套 
1.模块之间如何做到解耦：以事件来解耦，非最优。举了一个例子，将 require 变成 init 时候传 
入实例解耦的例子，说明其对这块有一定深入，但是其实质并非不用 require 就能解耦，这块并 
没有认识到。模块之间的通信、数据流向：通过 mdediator 层进行通信。总体来说，答的比较 
好。6 / 10 
2.前端工程化。使用了 FIS，让其对比了与 grunt 的差别和优势，答的还可以。问了其写的一个 
FIS 插件的细节问题（注册到哪个阶段）。 
3. JS 语言尚可：typeof（有错误）、Symbol 类型的使用（答的不好）、判断全局变量（正确）、数 
组的判断（基本正确）。写码示范 JS 如何实现继承，写的比较烂。 
4.CSS 略差：两列布局，答的不好，用了 margin 又用 padding，父元素用 overflow:hidden 不知道 
是为了解决什么问题。CSS 选择器及其优先级，选择器答对，优先级有少许错误。 
5.后端开发：简单了解。 
6.移动端开发，问了一个点击穿透的问题，不了解。经验一般。 
7.HTTP 协议，基本上掌握的还可以。对于 keep alive 理解的不够。 
一面：各种技术，项目，原理，框架， 
二面： 
具体的某个框架的实现原理，是否去优化过这些框架，怎么优化的 
新技术深层次的使用方法，有没有研究过更深入的方法。 
带团队相关

###css
- 啥是伪类
- 实现纯css，单选按钮
- bfc相关
- 移动端1px问题，原因，解决方案
- 响应式布局，用过哪些
- rem 和em 区别，还用过哪些单位
###js
- 事件委托原理
- 不可以冒泡的事件能用代理吗？
- 浏览器对象，ua怎么用？往里面插过参数吗
- bind，apply，call作用区别
- 了解websocket吗
- 变量提升出了道题
	```
		var tmp = 'outer';
		(function(){
			console.log(tmp);
			if([]==[]){
				var tmp = 'inner';
			}

		})()
	```
- bind,apply,call的使用出了道题
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
- 防抖和截流函数了解吗，写个截流函数
- 定时器，和promise
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
- 跨域方法
- 移动端click 300ms延迟原因，解决方案
- 前端构建化工具，gulp，webpack，loader干啥用的，你都用哪些了。怎么搭建的
- udp和tcp区别
- tcp三次握手，滑动窗口，四次挥手
- 啥是链表
- http缓存了解吗，说一下
- xss了解吗，讲一下，怎么防范
- 两个有序数组[1,3,5,7,9,30],[2,3,5,8,22,15,20]，要求写一个方法，输出排好序的数组，时间复杂度为N
- http和https区别
- http缓存
https://juejin.im/post/5b3c87386fb9a04f9a5cb037
- 是否链接Dom1,Dom2,Dom3以及他们的区别
#### fetch、axios、ajax 之间的差异
[参考](http://axios-js.com/zh-cn/axios-ajax-fetch-compare.html)
https://segmentfault.com/a/1190000012836882
- webpack性能优化

- 手写promise, slice, deepclone等
