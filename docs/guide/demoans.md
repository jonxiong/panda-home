## 面试流程

## 自我介绍

## 基础
## html:
### 一个页面从输入url到显示，经历了什么
总体分为两大块：<br/>
网络通信：<br/>
1.输入网址<br/>
2.DNS解析域名<br/>
3.建立链接(与服务器建立连接时TCP属于安全的连接，需要三次握手)<br/>
4.浏览器给web服务器发送一个HTTP请求<br/>
5.服务器处理请求并发回一个HTML响应<br/>
6.浏览器接收到HTML开始渲染显示页面<br/>

渲染：<br/>
1.浏览器解析 html 页面的 DOM 结构<br/>
2.开启下载线程对文档中的所有资源按优先级排序下载<br/>
3.主线程继续解析文档，到达 head 节点 ，head 里的外部资源无非是外链样式表和外链 js<br/>
> 发现有外链 css 或者外链 js，如果是外链 js ，则停止解析后续内容，等待该资源下载，下载完后立刻执行。如果是外链 css，继续解析后续内容

4.解析到 body<br/>
> body 里的情况比较多，body 里可能只有 DOM 元素，可能既有 DOM、也有 css、js 等资源，js 资源又有可能异步加载 图片、css、js 等。DOM 结构不同，浏览器的解析机制也不同，我们分开来讨论。
- 只有 DOM 元素
    - 这种情况比较简单了，DOM 树构建完，页面首次渲染。
- 有 DOM 元素、外链 js
    - 当解析到外链 js 的时候，该 js 尚未下载到本地，则 js 之前的 DOM 会被渲染到页面上，同时 js 会阻止后面 DOM 的构建，即后面的 DOM 节点并不会添加到文档的 DOM 树中。所以，js 执行完之前，我们在页面上看不到该 js 后面的 DOM 元素
- 有 DOM 元素、外链 css
    - 外链 css 不会影响 css 后面的 DOM 构建，但是会阻碍渲染。简单点说，外链 css 加载完之前，页面还是白屏
- 有 DOM 元素、外链 js、外链 css
    - 外链 js 和外链 css 的顺序会影响页面渲染，这点尤为重要。当 body 中 js 之前的外链 css 未加载完之前，页面是不会被渲染的
    - 当body中 js 之前的 外链 css 加载完之后，js 之前的 DOM 树和 css 合并渲染树，页面渲染出该 js 之前的 DOM 结构

5.文档解析完毕，页面重新渲染。当页面引用的所有 js 同步代码执行完毕，触发 DOMContentLoaded 事件<br/>
6.html 文档中的图片资源，js 代码中有异步加载的 css、js 、图片资源都加载完毕之后，load 事件触发<br/>

### DOM构建：
DOM 构建的意思是，将文档中的所有 DOM 元素构建成一个树型结构。
> 注意，DOM 构建是自上而下进行构建的，会受到 js 执行的干扰。
### CSS构建:
将文档中的所有 css 资源合并 
### Render树:
将DOM树和CSS合并成一棵渲染树render 树在合适的时机会被渲染到页面中。（比如遇到 script 时, 该 script 还没有下载到本地时）

参考文章：<br/>
https://juejin.im/post/5b2a508ae51d4558de5bd5d1
https://juejin.im/post/5b88ddca6fb9a019c7717096

### DOMContentLoaded 与 onload 的区别
### JS执行会阻塞DOM树的解析和渲染，那么CSS加载会阻塞DOM树的解析和渲染吗

### script标签中defer和async的区别
defer：浏览器指示脚本在文档被解析后执行，script被异步加载后并不会立刻执行，而是等待文档被解析完毕后执行。
async：同样是异步加载脚本，区别是脚本加载完毕后立即执行，这导致async属性下的脚本是乱序的，对于script有先后依赖关系的情况，并不适用。
### doctype的作用是什么，有什么,之间的区别
DOCTYPE是html5标准网页声明，且必须声明在HTML文档的第一行。来告知浏览器的解析器用什么文档标准解析这个文档，不同的渲染模式会影响到浏览器对于 CSS 代码甚至 JavaScript 脚本的解析
CSS1Compat：标准模式，浏览器使用W3C的标准解析渲染页面。
BackCompat：怪异模式，浏览器使用自己的怪异模式解析渲染页面。（如果没有声明DOCTYPE，默认就是这个模式）
### Html5新的元素都用过什么,img是什么类型元素(inline-block)
新的元素：section, video, progress, nav, meter, time, aside, canvas, command, datalist, details, embed, figcaption, figure, footer, header, hgroup, keygen, mark, output, rp, rt, ruby, source, summary, wbr。
### [浏览器事件流](https://juejin.im/post/5cb677026fb9a0686f3d2c63)
DOM事件流分为三个阶段：捕获阶段、目标阶段、冒泡阶段
### 前端储存方式都有什么，这几种方式的区别是什么
cookies、localstorage、sessionstorage、Web SQL、IndexedDB

- cookies： 在HTML5标准前本地储存的主要方式，优点是兼容性好，请求头自带cookie方便，缺点是大小只有4k，自动请求头加入cookie浪费流量，每个domain限制20个cookie，使用起来麻烦需要自行封装
- localStorage：HTML5加入的以键值对(Key-Value)为标准的方式，优点是操作方便，永久性储存（除非手动删除），大小为5M，兼容IE8+
- sessionStorage：与localStorage基本类似，区别是sessionStorage当页面关闭后会被清理，而且与cookie、localStorage不同，他不能在所有同源窗口中共享，是会话级别的储存方式
- Web SQL：2010年被W3C废弃的本地数据库数据存储方案，但是主流浏览器（火狐除外）都已经有了相关的实现，web sql类似于SQLite，是真正意义上的关系型数据库，用sql进行操作，当我们用JavaScript时要进行转换，较为繁琐。
- IndexedDB： 是被正式纳入HTML5标准的数据库储存方案，它是NoSQL数据库，用键值对进行储存，可以进行快速读取操作，非常适合web场景，同时用JavaScript进行操作会非常方便。（用过，更快一点）

### 如何跨域共享cookie, 如何使脚本不能访问cookie

### [如何判断页面白屏,如果出现白屏怎么排查](https://mp.weixin.qq.com/s/YiKRY_LDURY0uONtEhkUfg)
- 检测是所有的白屏状态，加载白屏时间可以通过first meaningful paint来判定
- 如果是想看页面崩溃了或者是意外白屏的情况
MutationObserver可以获取到页面状态的变化

### xss和csrf攻击以及防御
- xss:跨站脚本攻击，恶意简本注入，有请求外部服务器
- csrf:跨站请求攻击，冒充用户发起请求，完成违背用户意愿的请求
xss偏向方法论，代码实现
csrf偏向一个攻击结果
xss是实现csrf诸多路径中的一条

### iframe有那些缺点？
iframe会阻塞主页面的Onload事件
搜索引擎的检索程序无法解读这种页面，不利于SEO
iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载
使用iframe之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题

## CSS
### CSS的几种定位方式
- static: 正常文档流定位，此时 top, right, bottom, left 和 z-index 属性无效，块级元素从上往下纵向排布，行级元素从左向右排列。
- relative：相对定位，此时的『相对』是相对于正常文档流的位置。
- absolute：相对于最近的非 static 定位祖先元素的偏移，来确定元素位置，比如一个绝对定位元素它的父级、和祖父级元素都为relative，它会相对他的父级而产生偏移。
- fixed：指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，比如那种回到顶部的按钮一般都是用此定位方式。
- sticky：粘性定位，特性近似于relative和fixed的合体，其在实际应用中的近似效果就是IOS通讯录滚动的时候的『顶屁股』。
### [谈谈对BFC的理解](https://zhuanlan.zhihu.com/p/25321647)
1.什么是BFC
BFC是指一个独立的渲染区域，只有Block-level Box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干.
2.BFC触发条件:
- 根元素，即HTML元素
- position: fixed/absolute
- float不为none
- overflow不为visible
- display的值为inline-block、table-cell、table-caption

### 盒模型
盒模型由content（内容）、padding（内边距）、border（边框）、margin（外边距）组成

标准盒模型和怪异盒模型
- 标准盒模型： 在W3C标准下，我们定义元素的width值即为盒模型中的content的宽度值，height值即为盒模型中的content的高度值。
- 怪异盒模型：而IE怪异盒模型（IE8以下）width的宽度并不是content的宽度，而是border-left + padding-left + content的宽度值 + padding-right + border-right之和，height同理。

虽然现代浏览器默认使用W3C的标准盒模型，但是在不少情况下怪异盒模型更好用，于是W3C在css3中加入box-sizing。
- box-sizing: content-box // 标准盒模型
- box-sizing: border-box // 怪异盒模型(IE8以下)
### 移动端适配1px的问题
1px的边框在devicePixelRatio = 2的retina屏下会显示成2px，在iphone 6 plug 下，更显示成3px，影响美感。

截止目前情况：
现在ios8以上可以已经支持0.5px，众多的安卓机以及ios8以下的系统还不支持0.5px

### 什么时候会触发重绘和重排，区别以及如何避免
重排必然导致重绘，所以重排更加恶心。其实我们一直研究的应该是怎么避免触发多次重排。

- 将会导致重排的因素：
    - 添加或者删除可见的DOM元素
    - 元素位置改变
    - 元素尺寸改变
    - 元素内容改变（例如：一个文本被另一个不同尺寸的图片替代）
    - 页面渲染初始化（这个无法避免）
    - 浏览器窗口尺寸改变
    - 访问某些属性
- 如何减少repaint/reflow

postion:absolute; left:100px;会不会引起？不会
translateX:100px;会不会引起？不会
getBoundingClientRect会不会引起？会
getClientWidth、getClientHeight会不会引起？会

### translate-X 和 left 区别
区别是元素位置：
- top left 定位是直接改变元素真实位置的
- transform: translateY(-5px) 只是改变了视觉位置，元素本身位置还是在 0px
最后的区别是效率：
由于transform不改动css布局，因为渲染行为大多数情况下在元素本身，所以效率比 top left 要高。另外在早期的一些版本，用 transform: translateZ(0px) 强制开启硬件加速好像只能应用在 transform 上。
### 居中写法，举出所想到的：至少五种
margin:0 auto方法
flex布局，目前主流方法
table方法
### em\px\rem区别，了解vw,vh吗
- px：绝对单位，页面按精确像素展示。
- em：相对单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值。
- rem：相对单位，可理解为”root em”, 相对根节点html的字体大小来计算，CSS3新加属性，chrome/firefox/IE9+支持

## JS基础
### 对event Loop的理解
在JavaScript中，任务被分为两种，一种宏任务（MacroTask）也叫Task，一种叫微任务（MicroTask）
- 宏任务：script全部代码、setTimeout、setInterval、I/O、UI Rendering
- 微任务：Process.nextTick（Node独有）、Promise、MutationObserver（具体使用方式查看这里）
#### 浏览器中的event Loop
同步任务和异步任务</br>
Javascript单线程任务被分为同步任务和异步任务，同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。</br>
任务队列Task Queue，即队列，是一种先进先出的一种数据结构</br>

执行栈在执行完同步任务后，查看执行栈是否为空，如果执行栈为空，就会去检查微任务(microTask)队列是否为空，如果为空的话，就执行Task（宏任务），否则就一次性执行完所有微任务。</br>
每次单个宏任务执行完毕后，检查微任务(microTask)队列是否为空，如果不为空的话，会按照先入先出的规则全部执行完微任务(microTask)后，设置微任务(microTask)队列为null，然后再执行宏任务，如此循环</br>

主线程执行完同步任务-微任务-宏任务

### 模块化理解：node-CommonJS，AMD，CMD，ES6模块与CommonJS模块的区别
commonjs
如何实现模块化的呢：JavaScript是一种函数式编程语言，它支持闭包
模块的输出module.exports是如何实现的呢？：Node可以先准备一个对象module

- [ES6模块与CommonJS模块的区别](https://www.cnblogs.com/unclekeith/p/7679503.html)
    -  commonjs模块输出的是值的浅拷贝，ES6模块输出的是值的引用 
    -  commonjs模块是运行时加载，而ES6模块是编译时输出接口，之所以webpack的tree-shaking只能作用于ES6模块，就是因为ES6模块在编译时就能确定依赖
- ES6 Module和CommonJS模块的共同点：
    - CommonJS和ES6 Module都不可以对引入的对象进行赋值，即对对象内部属性的值进行改变。但是可以添加属性

### 谈谈对原型链的理解
- 原型对象：每一个函数都有一个属性 prototype，该属性指向一个对象，每一个函数的该对象都存在
每一个该函数作为构造器创建的实例对象，都会默认连接到该对象上
- 原型链：原因是每个对象都有 __proto__ 属性，此属性指向该对象的构造函数的原型。
对象可以通过 __proto__与上游的构造函数的原型对象连接起来，而上游的原型对象也有一个__proto__，这样就形成了原型链

### currying柯里化
柯里化是闭包的应用之一

### [设计模式：观察者模式和发布订阅模式的区别，平时工作中有用到吗](https://www.cnblogs.com/onepixel/p/10806891.html)
发布订阅模式相比观察者模式多了个事件通道，事件通道作为调度中心，管理事件的订阅和发布工作，彻底隔绝了订阅者和发布者的依赖关系。即订阅者在订阅事件的时候，只关注事件本身，而不关心谁会发布这个事件；发布者在发布事件的时候，只关注事件本身，而不关心谁订阅了这个事件

### JS的垃圾回收机制
1.标记清除
垃圾回收器定时执行：
a:内存中所有的变量加上标记
b:去掉环境中变量和被环境中变量引用的变量的标记
c:剩余比变量准备删除，释放内存空间
2.引用计数
跟踪值的引用次数，当垃圾回收器运行的时候，释放引用次数为0的变量

我们在工作中可与将大多数不用的全局变量和对象将其值设置为null解除引用，在下一次垃圾回收的时候被回收

### 有用es6什么新特性

### async/awit了解吗？相比于promise的优势
async 函数，就是 Generator 函数的语法糖，它建立在Promises上，并且与所有现有的基于Promise的API兼容。
相比于promise的优势
- 代码读起来更加同步，Promise虽然摆脱了回调地狱，但是then的链式调用也会带来额外的阅读负担
- await几乎是同步的写法，非常优雅
- 错误处理友好，async/await可以用成熟的try/catch，Promise的错误捕获非常冗余
- 调试友好，Promise的调试很差，由于没有代码块，你不能在一个返回表达式的箭头函数中设置断点，如果你在一个.then代码块中使用调试器的步进(step-over)功能，调试器并不会进入后续的.then代码块，因为调试器只能跟踪同步代码的『每一步』

### call/apply/bind区别
call/apply: 改变this指向，调用其他对象的方法，call/apply语法不同，效果一致，都是【立即执行】
bind:【非立即执行】，需要触发某条件才执行，语法同call


### == 和 === 的区别，什么情况下用相等==
== 代表相同， ===代表严格相同

### 5个请求发来怎么保证请求顺序

### 对跨域的了解，jsonp的原理和实现
[jsonp原理和实现](https://segmentfault.com/a/1190000007665361)
jsonp是一种跨域通信的手段，它的原理其实很简单：

- 1.首先是利用script标签的src属性来实现跨域。
- 2.通过将前端方法作为参数传递到服务器端，然后由服务器端注入参数之后再返回，实现服务器端向客户端通信。
- 3.由于使用script标签的src属性，因此只支持get方法

### [防抖和截流](https://juejin.im/post/5b7b88d46fb9a019e9767405)
debounce（防抖），简单来说就是防止抖动。
当持续触发事件时，debounce 会合并事件且不会去触发事件，当一定时间内没有触发再这个事件时，才真正去触发事件

throttle（节流），当持续触发事件时，保证隔间时间触发一次事件。
持续触发事件时，throttle 会合并一定时间内的事件，并在该时间结束时真正去触发一次事件。
### class:
- 类的所有方法都在类的prototype上。类的实例调用方法就是调用原型上面的方法
- 

## VUE
### MVVM的理解


### 对Vue的生命周期理解，请求一般放在哪个生命周期
生命周期：
Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期

官方实例的异步请求是在mounted生命周期中调用的，而实际上也可以在created生命周期中调用
但是本人推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：
- 能更快获取到服务端数据，减少页面 loading 时间；
- ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；
### 在什么阶段才能访问操作DOM
在钩子函数 mounted 被调用前，Vue 已经将编译好的模板挂载到页面上，所以在 mounted 中可以访问操作 DOM
### Watch与computed的区别
computed:
- 1.computed是计算属性,也就是计算值,它更多用于计算值的场景
- 2.computed具有缓存性,computed的值在getter执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取computed的值时才会重新调用对应的getter来计算
- 3.computed适用于计算比较消耗性能的计算场景
watch:
- 1.更多的是「观察」的作用,类似于某些数据的监听回调,用于观察props $emit或者本组件的值,当数据变化时来执行回调进行后续操作
- 2.无缓存性，页面重新渲染时值不变化也会执行

结论：
当我们要进行数值计算,而且依赖于其他数据，那么把这个数据设计为computed
如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化
### [vue如何实现双向绑定](https://juejin.im/post/5abdd6f6f265da23793c4458)
利用Object.defineProperty劫持对象的访问器,在属性值发生变化时我们可以获取变化,然后根据变化进行后续响应,在vue3.0中通过Proxy代理对象进行类似的操作。

### vue3跟vue2的区别

### Proxy与Object.definedProperty的优点
Proxy的优势如下:
- Proxy可以直接监听对象而非属性
- Proxy可以直接监听数组的变化
- Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的
- Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,而Object.defineProperty只能遍历对象属性直接修改
- Proxy作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利
Object.defineProperty的优势如下:
- 兼容性好,支持IE9

### Vue 组件间通信有哪几种方式，组件之间如何通信
- props/$emit+v-on: 通过props将数据自上而下传递，而通过$emit和v-on来向上传递信息。
- EventBus: 通过EventBus进行信息的发布与订阅
- vuex: 是全局数据管理库，可以通过vuex管理全局的数据流
- $attrs/$listeners: Vue2.4中加入的$attrs/$listeners可以进行跨级的组件通信
- provide/inject：以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效，这成为了跨组件通信的基础

### vuex是做什么的主要解决什么问题，里面的各个文件是如何分工的
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。
- （1）Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- （2）改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。
主要包括以下几个模块：

- State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
- Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
- Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
- Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

### vue中key的作用

### Vue通过数据劫持可以精准探测数据变化,为什么还需要虚拟DOM进行diff检测差异
现代前端框架有两种方式侦测变化,一种是pull一种是push

pull: 其代表为React,我们可以回忆一下React是如何侦测到变化的,我们通常会用setStateAPI显式更新,然后React会进行一层层的Virtual Dom Diff操作找出差异,然后Patch到DOM上,React从一开始就不知道到底是哪发生了变化,只是知道「有变化了」,然后再进行比较暴力的Diff操作查找「哪发生变化了」，另外一个代表就是Angular的脏检查操作。

push: Vue的响应式系统则是push的代表,当Vue程序初始化的时候就会对数据data进行依赖的收集,一但数据发生变化,响应式系统就会立刻得知,因此Vue是一开始就知道是「在哪发生变化了」,但是这又会产生一个问题,如果你熟悉Vue的响应式系统就知道,通常一个绑定一个数据就需要一个Watcher,一但我们的绑定细粒度过高就会产生大量的Watcher,这会带来内存以及依赖追踪的开销,而细粒度过低会无法精准侦测变化,因此Vue的设计是选择中等细粒度的方案,在组件级别进行push侦测的方式,也就是那套响应式系统,通常我们会第一时间侦测到发生变化的组件,然后在组件内部进行Virtual Dom Diff获取更加具体的差异,而Virtual Dom Diff则是pull操作,Vue是push+pull结合的方式进行变化侦测的

### 如何理解Virtual Dom
实现原理：
- 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
- diff 算法 — 比较两棵虚拟 DOM 树的差异；
- pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。
优缺点：
优点：
- 保证性能下限： 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
- 无需手动操作 DOM： 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
- 跨平台： 虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。

缺点:
无法进行极致优化： 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。

### 有写过什么组件，如何做的？设计一个组件的原则

### 项目如何选择框架 vue/react

参考文章：
https://juejin.im/post/5d59f2a451882549be53b170#heading-7


### Node:
- 

### Webpack:相关
### webpack跟gulp的区别
Gulp是基于任务运行的工具：
它们会自动执行指定的任务，就像流水线，把资源放上去然后通过不同插件进行加工，它们包含活跃的社区，丰富的插件，能方便的打造各种工作流。

Webpack是基于模块化打包的工具:
自动化处理模块,webpack把一切当成模块，当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

### 常用的哪些loader和plugin
loader：
- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- source-map-loader：加载额外的 Source Map 文件，以方便断点调试
- image-loader：加载并且压缩图片文件
- babel-loader：把 ES6 转换成 ES5
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
- style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
- eslint-loader：通过 ESLint 检查 JavaScript 代码
plugin：
- define-plugin：定义环境变量
- html-webpack-plugin：简化html文件创建
- uglifyjs-webpack-plugin：通过UglifyES压缩ES6代码
- webpack-parallel-uglify-plugin: 多核压缩,提高压缩速度
- webpack-bundle-analyzer: 可视化webpack输出文件的体积
- mini-css-extract-plugin: CSS提取到单独的文件中,支持按需加载

### babel-loader的编译原理

### Loader和Plugin的不同
作用不同：
- Loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析_非JavaScript文件_的能力。
- Plugin直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果

用法不同：

Loader在module.rules中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个Object，里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）
Plugin在plugins中单独配置。 类型为数组，每一项是一个plugin的实例，参数都通过构造函数传入。

### webpack是的构建流程是什么
Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

- 1.初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
- 2.开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
- 3.确定入口：根据配置中的 entry 找出所有的入口文件；
- 4.编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
- 5.完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
- 6.输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
- 7.输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

### 如何用webpack来优化前端性能
用webpack优化前端性能是指优化webpack的输出结果，让打包的最终结果在浏览器运行快速高效。

- 压缩代码:删除多余的代码、注释、简化代码的写法等等方式。可以利用webpack的UglifyJsPlugin和ParallelUglifyPlugin来压缩JS文件， 利用cssnano（css-loader?minimize）来压缩css
- 利用CDN加速: 在构建过程中，将引用的静态资源路径修改为CDN上对应的路径。可以利用webpack对于output参数和各loader的publicPath参数来修改资源路径
- Tree Shaking: 将代码中永远不会走到的片段删除掉。可以通过在启动webpack时追加参数--optimize-minimize来实现
- Code Splitting: 将代码按路由维度或者组件分块(chunk),这样做到按需加载,同时可以充分利用浏览器缓存
提取公共第三方库:  SplitChunksPlugin插件来进行公共模块抽取,利用浏览器缓存可以长期缓存这些无需频繁变动的公共代码

#### webpack的劣势在哪里

### 其他：
- native和前端如何通信
- 如何唤起app原理
- js迁移到ts
- babel插件原理
- 页面优化
- 有自己做过什么小应用，插件，独立博客
- 项目中遇到什么问题
- 如何学习前端知识
- 为什么一年左右就离职
- 做过什么出色的东西，怎么做的

### 项目：
- 对小程序了解程度
- 学习前端的自驱力是