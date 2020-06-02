# Browser相关机制

- [Browser相关机制](#browser相关机制)
  - [一个页面从输入url到显示经历了什么](#一个页面从输入url到显示经历了什么)
    - [网络通信](#网络通信)
    - [渲染](#渲染)
    - [DOM构建](#dom构建)
    - [CSS构建](#css构建)
    - [Render树](#render树)
    - [DOMContentLoaded与onload的区别](#domcontentloaded与onload的区别)
    - [JS执行会阻塞DOM树的解析和渲染，那么CSS加载会阻塞DOM树的解析和渲染吗](#js执行会阻塞dom树的解析和渲染那么css加载会阻塞dom树的解析和渲染吗)
  - [浏览器如何解析css选择器](#浏览器如何解析css选择器)
  - [重绘与重排](#重绘与重排)
    - [会导致重排的因素](#会导致重排的因素)
    - [如何避免重绘重排](#如何避免重绘重排)
  - [dom事件流](#dom事件流)
  - [移动端点击穿透问题](#移动端点击穿透问题)
    - [解决方案](#解决方案)
  - [是否了解Dom1, Dom2, Dom3以及他们的区别](#是否了解dom1-dom2-dom3以及他们的区别)
  - [什么是事件委托](#什么是事件委托)
    - [优点](#优点)
    - [局限性](#局限性)
  - [如何判断页面白屏如果出现白屏怎么排查](#如何判断页面白屏如果出现白屏怎么排查)
  - [v8引擎](#v8引擎)
  - [前端如何实现实时通讯](#前端如何实现实时通讯)
    - [短轮询](#短轮询)
    - [comet](#comet)
    - [SSE](#sse)
    - [Websocket](#websocket)
    - [Web Worker](#web-worker)
    - [Service workers](#service-workers)
  - [浏览器不同tab之间如何通信](#浏览器不同tab之间如何通信)

## 一个页面从输入url到显示经历了什么

总体分为两大块：

### 网络通信

1. 输入网址<br/>
2. DNS解析域名<br/>
3. 建立链接(与服务器建立连接时TCP属于安全的连接，需要三次握手)<br/>
4. 浏览器给web服务器发送一个HTTP请求<br/>
5. 服务器处理请求并发回一个HTML响应<br/>
6. 浏览器接收到HTML开始渲染显示页面<br/>

### 渲染

1. 浏览器解析 html 页面的 DOM 结构<br/>
2. 开启下载线程对文档中的所有资源按优先级排序下载<br/>
3. 主线程继续解析文档，到达 head 节点 ，head 里的外部资源无非是外链样式表和外链 js<br/>

> 发现有外链 css 或者外链 js，如果是外链 js ，则停止解析后续内容，等待该资源下载，下载完后立刻执行。如果是外链 css，继续解析后续内容

4. 解析到 body<br/>

> body 里的情况比较多，body 里可能只有 DOM 元素，可能既有 DOM、也有 css、js 等资源，js 资源又有可能异步加载 图片、css、js 等。DOM 结构不同，浏览器的解析机制也不同，我们分开来讨论。

* 只有 DOM 元素
    - 这种情况比较简单了，DOM 树构建完，页面首次渲染。
* 有 DOM 元素、外链 js
    - 当解析到外链 js 的时候，该 js 尚未下载到本地，则 js 之前的 DOM 会被渲染到页面上，同时 js 会阻止后面 DOM 的构建，即后面的 DOM 节点并不会添加到文档的 DOM 树中。所以，js 执行完之前，我们在页面上看不到该 js 后面的 DOM 元素
* 有 DOM 元素、外链 css
    - 外链 css 不会影响 css 后面的 DOM 构建，但是会阻碍渲染。简单点说，外链 css 加载完之前，页面还是白屏
* 有 DOM 元素、外链 js、外链 css
    - 外链 js 和外链 css 的顺序会影响页面渲染，这点尤为重要。当 body 中 js 之前的外链 css 未加载完之前，页面是不会被渲染的
    - 当body中 js 之前的 外链 css 加载完之后，js 之前的 DOM 树和 css 合并渲染树，页面渲染出该 js 之前的 DOM 结构
5. 文档解析完毕，页面重新渲染。当页面引用的所有 js 同步代码执行完毕，触发 DOMContentLoaded 事件<br/>

6.html 文档中的图片资源，js 代码中有异步加载的 css、js 、图片资源都加载完毕之后，load 事件触发<br/>

### DOM构建

DOM 构建的意思是，将文档中的所有 DOM 元素构建成一个树型结构。

> 注意，DOM 构建是自上而下进行构建的，会受到 js 执行的干扰。

### CSS构建

将文档中的所有 css 资源合并

### Render树

将DOM树和CSS合并成一棵渲染树render 树在合适的时机会被渲染到页面中。（比如遇到 script 时, 该 script 还没有下载到本地时）

参考文章：<br/>
https://juejin.im/post/5b2a508ae51d4558de5bd5d1
https://juejin.im/post/5b88ddca6fb9a019c7717096

### DOMContentLoaded与onload的区别

### JS执行会阻塞DOM树的解析和渲染，那么CSS加载会阻塞DOM树的解析和渲染吗

## 浏览器如何解析css选择器

浏览器会『从右往左』解析CSS选择器。<br/>
我们知道DOM Tree与Style Rules合成为 Render Tree，实际上是需要将Style Rules附着到DOM Tree上，因此需要根据选择器提供的信息对DOM Tree进行遍历，才能将样式附着到对应的DOM元素上。

> 从右向左匹配性能更好，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点）；而从左向右的匹配规则的性能都浪费在了失败的查找上面

## 重绘与重排

* 重排: 部分渲染树（或者整个渲染树）需要重新分析并且节点尺寸需要重新计算，表现为重新生成布局，重新排列元素
* 重绘: 由于节点的几何属性发生改变或者由于样式发生改变，例如改变元素背景色时，屏幕上的部分内容需要更新，表现为某些元素的外观被改变

> 重排必然导致重绘，所以重排更加恶心。其实我们一直研究的应该是怎么避免触发多次重排。

### 会导致重排的因素

* 添加或者删除可见的DOM元素
* 元素位置改变
* 元素尺寸改变
* 元素内容改变（例如：一个文本被另一个不同尺寸的图片替代）
* 页面渲染初始化（这个无法避免）
* 浏览器窗口尺寸改变
* 访问某些属性

### 如何避免重绘重排

* 集中改变样式: 通过class来改变
* 使用DocumentFragment: 可以通过createDocumentFragment创建一个游离于DOM树之外的节点，只触发一次重排
* 提升为合成层: will-change: transform; 

postion:absolute; left:100px; 会不会引起？不会
translateX:100px; 会不会引起？不会
getBoundingClientRect会不会引起？会
getClientWidth、getClientHeight会不会引起？会

## [dom事件流](https://juejin.im/post/5cb677026fb9a0686f3d2c63)

什么是事件流：<br/>

> 文档或浏览器窗口中发生的一些特定的交互瞬间，而事件流(又叫事件传播)描述的是从页面中接收事件的顺序。

事件冒泡(event bubbling)：<br/>

> 即事件开始时由最具体的元素(文档中嵌套层次最深的那个节点)接收，然后逐级向上传播到较为不具体的节点

事件捕获：<br/>

> 事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。事件捕获的用意在于在事件到达预定目标之前就捕获它

事件流:<br/>

> DOM2级事件分为三个阶段：捕获阶段、目标阶段、冒泡阶段

触发顺序通常为<br/>

* 进行事件捕获，为截获事件提供了机会
* 实际的目标接收到事件
* 冒泡阶段，可以在这个阶段对事件做出响应

## [移动端点击穿透问题](https://juejin.im/entry/56ce9c97c24aa80052101aab)

* 双击放大，300ms延迟
* click时间触发延迟
* touchStart，touchMove, touchend, click(200ms~300ms)

### 解决方案

* 只用touchstart，注意a标签需要换成JavaScript:void（0）
* 只用click(不建议)：但是有300ms延迟
* 加动画隐藏元素
* fastclick

## 是否了解Dom1, Dom2, Dom3以及他们的区别

## 什么是事件委托

> 事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件. 在绑定大量事件的时候往往选择事件委托

### 优点

* 节省内存占用，减少事件注册
* 新增子对象时无需再次对其绑定事件，适合动态添加元素

### 局限性

* focus、blur 之类的事件本身没有事件冒泡机制，所以无法委托
* mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，不适合事件委托

## [如何判断页面白屏如果出现白屏怎么排查](https://mp.weixin.qq.com/s/YiKRY_LDURY0uONtEhkUfg)

## v8引擎

## 前端如何实现实时通讯

### 短轮询

> 原理很简单，每隔一段时间客户端就发出一个请求，去获取服务器最新的数据，一定程度上模拟实现了即时通讯

* 优点：兼容性强，实现非常简单
* 缺点：延迟性高，非常消耗请求资源，影响性能

### [comet](http://www.52im.net/thread-334-1-1.html)

comet有两种主要实现手段，一种是基于 AJAX 的长轮询（long-polling）方式，另一种是基于 Iframe 及 htmlfile 的流（streaming）方式，通常被叫做长连接。

长轮询优缺点：

* 优点：兼容性好，资源浪费较小
* 缺点：服务器hold连接会消耗资源，返回数据顺序无保证，难于管理维护

长连接优缺点：

* 优点：兼容性好，消息即时到达，不发无用请求
* 缺点：服务器维护长连接消耗资源

### [SSE](https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html)

> SSE（Server-Sent Event，服务端推送事件）是一种允许服务端向客户端推送新数据的HTML5技术

* 优点：基于HTTP而生，因此不需要太多改造就能使用，使用方便，而websocket非常复杂，必须借助成熟的库或框架
* 缺点：基于文本传输效率没有websocket高，不是严格的双向通信，客户端向服务端发送请求无法复用之前的连接，需要重新发出独立的请求

### [Websocket](http://www.ruanyifeng.com/blog/2017/05/websocket.html)

> Websocket是一个全新的、独立的协议，基于TCP协议，与http协议兼容、却不会融入http协议，仅仅作为html5的一部分，其作用就是在服务器和客户端之间建立实时的双向通信

* 优点：真正意义上的实时双向通信，性能好，低延迟
* 缺点：独立与http的协议，因此需要额外的项目改造，使用复杂度高，必须引入成熟的库，无法兼容低版本浏览器

### [Web Worker](#http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

> Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行

### [Service workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)

> Service workers 本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理，创建有效的离线体验

## [浏览器不同tab之间如何通信](https://segmentfault.com/a/1190000011207317)

https://juejin.im/post/5acdba01f265da23826e5633
