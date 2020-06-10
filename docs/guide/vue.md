# VUE

- [VUE](#vue)
  - [mvvm](#mvvm)
    - [mvvm的优缺点](#mvvm的优缺点)
    - [vue是如何实现数据双向绑定的](#vue是如何实现数据双向绑定的)
    - [vue框架怎么实现对象和数组的监听](#vue框架怎么实现对象和数组的监听)
  - [对vue的生命周期理解，请求一般放在哪个生命周期](#对vue的生命周期理解请求一般放在哪个生命周期)
    - [在哪个生命周期内调用异步请求](#在哪个生命周期内调用异步请求)
    - [在什么阶段才能访问操作DOM](#在什么阶段才能访问操作dom)
  - [vue的父组件和子组件生命周期钩子函数执行顺序](#vue的父组件和子组件生命周期钩子函数执行顺序)
    - [父组件可以监听到子组件的生命周期吗？如何监听](#父组件可以监听到子组件的生命周期吗如何监听)
  - [计算属性vs方法](#计算属性vs方法)
  - [watch与computed的区别](#watch与computed的区别)
  - [vue如何实现双向绑定](#vue如何实现双向绑定)
  - [观察者和发布者订阅模式以及区别](#观察者和发布者订阅模式以及区别)
  - [vue3跟vue2的区别](#vue3跟vue2的区别)
    - [proxy与objectdefinedproperty的优点](#proxy与objectdefinedproperty的优点)
  - [vue组件间通信有哪几种方式](#vue组件间通信有哪几种方式)
    - [vuex是做什么的主要解决什么问题，里面的各个文件是如何分工的](#vuex是做什么的主要解决什么问题里面的各个文件是如何分工的)
  - [如何解决vue渲染白屏问题](#如何解决vue渲染白屏问题)
    - [使用过vuessr吗说说ssr](#使用过vuessr吗说说ssr)
  - [能说下vue-router中常用的hash和history路由模式实现原理吗](#能说下vue-router中常用的hash和history路由模式实现原理吗)
    - [hash模式的实现原理](#hash模式的实现原理)
    - [history模式的实现原理](#history模式的实现原理)
  - [vue中key的作用](#vue中key的作用)
  - [vue通过数据劫持可以精准探测数据变化, 为什么还需要虚拟dom进行diff检测差异](#vue通过数据劫持可以精准探测数据变化-为什么还需要虚拟dom进行diff检测差异)
  - [如何理解virtualdom](#如何理解virtualdom)
  - [vue性能优化](#vue性能优化)
  - [高阶组件封装，HOC](#高阶组件封装hoc)
  - [项目如何选择框架vue/react](#项目如何选择框架vuereact)
  - [有写过什么组件，如何做的？设计一个组件的原则](#有写过什么组件如何做的设计一个组件的原则)

## mvvm

MVVM模式，顾名思义即 Model-View-ViewModel 模式

Model层: 数模模型，它主要做域模型的同步。通过 Ajax/fetch 等 API 完成客户端和服务端业务 Model 的同步。在层间关系里，它主要用于抽象出 ViewModel 中视图的 Model。

View层: 视图层，也就是用户界面， MVVM 里，整个 View 是一个动态模板。除了定义结构、布局外，它展示的是 ViewModel 层的数据和状态。View 层不负责处理状态，View 层做的是 数据绑定的声明、 指令的声明、 事件绑定的声明。

ViewModel 层: 把 View 需要的层数据暴露，并对 View 层的 数据绑定声明、 指令声明、 事件绑定声明 负责，也就是处理 View 层的具体业务逻辑。ViewModel 底层会做好绑定属性的监听。当 ViewModel 中数据变化，View 层会得到更新；而当 View 中声明了数据的双向绑定（通常是表单元素），框架也会监听 View 层（表单）值的变化。一旦值变化，View 层绑定的 ViewModel 中的数据也会得到自动更新。

![2019-07-16-21-47-05]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/d55fe97b6ef63370645754e1d4a760b6.png)

### mvvm的优缺点

优点:

* 分离视图（View）和模型（Model）, 降低代码耦合，提高视图或者逻辑的重用性: 比如视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定不同的"View"上，当View变化的时候Model不可以不变，当Model变化的时候View也可以不变。你可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑
* 提高可测试性: ViewModel的存在可以帮助开发者更好地编写测试代码
* 自动更新dom: 利用双向绑定, 数据更新后视图自动更新, 让开发者从繁琐的手动dom中解放

缺点:

* Bug很难被调试: 因为使用双向绑定的模式，当你看到界面异常了，有可能是你View的代码有Bug，也可能是Model的代码有问题。数据绑定使得一个位置的Bug被快速传递到别的位置，要定位原始出问题的地方就变得不那么容易了。另外，数据绑定的声明是指令式地写在View的模版当中的，这些内容是没办法去打断点debug的
* 一个大的模块中model也会很大，虽然使用方便了也很容易保证了数据的一致性，当时长期持有，不释放内存就造成了花费更多的内存
* 对于大型的图形应用程序，视图状态较多，ViewModel的构建和维护的成本都会比较高

  

### [vue是如何实现数据双向绑定的](https://juejin.im/post/5d421bcf6fb9a06af23853f1)
数据劫持+发布订阅模式

### vue框架怎么实现对象和数组的监听

> Vue 怎么实现数据双向绑定，大家肯定都会回答 通过 Object.defineProperty() 对数据进行劫持，但是  Object.defineProperty() 只能对属性进行数据劫持，不能对整个对象进行劫持，同理无法对数组进行劫持，但是我们在使用 Vue 框架中都知道，Vue 能检测到对象和数组（部分方法的操作）的变化，那它是怎么实现的呢？我们查看相关代码如下

``` js
 /**

  + Observe a list of Array items.

  */
 observeArray(items: Array < any > ) {
     for (let i = 0, l = items.length; i < l; i++) {
         observe(items[i]) // observe 功能为监测数据的变化
     }
 }

 /**

  + 对属性进行递归遍历

  */
 let childOb = !shallow && observe(val) // observe 功能为监测数据的变化
```

通过以上 Vue 源码部分查看，我们就能知道 Vue 框架是通过遍历数组 和递归遍历对象，从而达到利用 Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听

## 对vue的生命周期理解，请求一般放在哪个生命周期

生命周期：
Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期

* beforeCreate: 组件实例被创建之初，组件的属性生效之前
* created: 组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用
* beforeMount: 在挂载开始之前被调用：相关的 render 函数首次被调用
* mounted:el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
* beforeUpdate: 组件数据更新之前调用，发生在虚拟 DOM 打补丁之前
* update: 组件数据更新之后
* activited: keep-alive 专属，组件被激活时调用
* deactivated: keep-alive 专属，组件被销毁时调用
* beforeDestory: 组件销毁前调用
* destoryed: 组件销毁后调用

![0](https://user-gold-cdn.xitu.io/2019/8/19/16ca74f183827f46?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 在哪个生命周期内调用异步请求

官方实例的异步请求是在mounted生命周期中调用的，而实际上也可以在created生命周期中调用
但是本人推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

* 能更快获取到服务端数据，减少页面 loading 时间；
* ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

### 在什么阶段才能访问操作DOM

在钩子函数 mounted 被调用前，Vue 已经将编译好的模板挂载到页面上，所以在 mounted 中可以访问操作 DOM

## vue的父组件和子组件生命周期钩子函数执行顺序

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：

* 加载渲染过程
  + 父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
* 子组件更新过程
  + 父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
* 父组件更新过程
  + 父 beforeUpdate -> 父 updated
* 销毁过程
  + 父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

### 父组件可以监听到子组件的生命周期吗？如何监听

方案一：子组件手动$emit 触发父组件事件

``` vue
// Parent.vue
<Child @mounted="doSomething"/>

// Child.vue
mounted() {
  this.$emit("mounted");
}
```

方案二：@hook 方法不仅仅是可以监听 mounted，其它的生命周期事件，例如：created，updated

``` vue
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},

//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},

// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...
```

## 计算属性vs方法

计算属性:

``` html
<div id="example">
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

``` js
var vm = new Vue({
    el: '#example',
    data: {
        message: 'Hello'
    },
    computed: {
        // 计算属性的 getter
        reversedMessage: function() {
            // `this` 指向 vm 实例
            return this.message.split('').reverse().join('')
        }
    }
})
```

方法：

``` html
<p>Reversed message: "{{ reversedMessage() }}"</p>
```

``` js
// 在组件中
methods: {
    reversedMessage: function() {
        return this.message.split('').reverse().join('')
    }
}
```

我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。

这也同样意味着下面的计算属性将不再更新，因为 Date.now() 不是响应式依赖

``` js
computed: {
    now: function() {
        return Date.now()
    }
}
```

相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。

我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。

## watch与computed的区别

computed:

* 1.computed是计算属性, 也就是计算值, 它更多用于计算值的场景
* 2.computed具有缓存性, computed的值在getter执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取computed的值时才会重新调用对应的getter来计算
* 3.computed适用于计算比较消耗性能的计算场景

watch:

* 1. 更多的是「观察」的作用, 类似于某些数据的监听回调, 用于观察props $emit或者本组件的值, 当数据变化时来执行回调进行后续操作
* 2. 无缓存性，页面重新渲染时值不变化也会执行

结论：
当我们要进行数值计算, 而且依赖于其他数据，那么把这个数据设计为computed
如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化

## [vue如何实现双向绑定](https://juejin.im/post/5abdd6f6f265da23793c4458)

利用Object.defineProperty劫持对象的访问器, 在属性值发生变化时我们可以获取变化, 然后根据变化进行后续响应, 在vue3.0中通过Proxy代理对象进行类似的操作。

## [观察者和发布者订阅模式以及区别](https://www.cnblogs.com/onepixel/p/10806891.html)

观察者模式:

> 定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知，并自动更新。观察者模式属于行为型模式，行为型模式关注的是对象之间的通讯，观察者模式就是观察者和被观察者之间的通讯

订阅-发布模式:

> 现在的发布订阅模式中，称为发布者的消息发送者不会将消息直接发送给订阅者，这意味着发布者和订阅者不知道彼此的存在。在发布者和订阅者之间存在第三个组件，称为调度中心或事件通道，它维持着发布者和订阅者之间的联系，过滤所有发布者传入的消息并相应地分发它们给订阅者

![2020-6-10-6-0](https://img2018.cnblogs.com/blog/849589/201904/849589-20190424122505055-2083728728.png)

## vue3跟vue2的区别

* 压缩包体积更小

当前最小化并被压缩的 Vue 运行时大小约为 20kB（2.6.10 版为 22.8kB）。Vue 3.0捆绑包的大小大约会减少一半，即只有10kB

* 数据监听

Vue2.x大家都知道使用的是es5的**object.defineproperties**中getter和setter实现的
弊端： 就是无法兼听到数组内部的数据变化(当然我们可以通过arr = arr.concat([]))，来实现内部数据变化的检测
而vue3.0的版本，是基于**Proxy**进行监听的，可以检测到数组内部数据的变化
另一方面基于proxy监听就是所谓的lazy by default，
什么意思呢，就是只要你用到了才会监听，可以理解为‘按需监听’，官方给出的诠释是：速度加倍，同时内存占用还减半

Object.defineProperty是一个相对比较昂贵的操作，因为它直接操作对象的属性，颗粒度比较小。将它替换为es6的Proxy，在目标对象之上架了一层拦截，代理的是对象而不是对象的属性。这样可以将原本对对象属性的操作变为对整个对象的操作，颗粒度变大

兼容性：IE系列都不兼容Proxy，肯定会有向下兼容的方案，那就是用原始的Object.defineProperty

* vue3.0是基于type script重构

- 

### proxy与objectdefinedproperty的优点

Proxy的优势如下:

* Proxy可以直接监听对象而非属性
* Proxy可以直接监听数组的变化
* Proxy有多达13种拦截方法, 不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的
* Proxy返回的是一个新对象, 我们可以只操作新的对象达到目的, 而Object.defineProperty只能遍历对象属性直接修改
* Proxy作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利

Object.defineProperty的优势如下:

* 兼容性好, 支持IE9

## vue组件间通信有哪几种方式

* props/$emit+v-on: 通过props将数据自上而下传递，而通过$emit和v-on来向上传递信息。
* EventBus: 通过EventBus进行信息的发布与订阅，用它来触发事件和监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件
* vuex: 是全局数据管理库，可以通过vuex管理全局的数据流
* $attrs/$listeners: Vue2.4中加入的$attrs/$listeners可以进行跨级的组件通信
* provide/inject：以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效，这成为了跨组件通信的基础

### vuex是做什么的主要解决什么问题，里面的各个文件是如何分工的

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。

* （1）Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
* （2）改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。

主要包括以下几个模块：

* State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
* Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
* Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
* Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
* Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

## 如何解决vue渲染白屏问题

[参考文章](https://juejin.im/post/5bcc169ae51d450e85308d86)

### [使用过vuessr吗说说ssr](https://juejin.im/post/5cb6c36e6fb9a068af37aa35)

> Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，也可以将同一个组件渲染为服务端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。

即：SSR大致的意思就是vue在客户端将标签渲染成的整个 html 片段的工作在服务端完成，服务端形成的html 片段直接返回给客户端这个过程就叫做服务端渲染。

* ssr渲染的优点：
    - 更好的 SEO：SPA 页面的内容是通过 Ajax 获取，而搜索引擎爬取工具并不会等待 Ajax 异步完成后再抓取页面内容,ssr则可以
    - 更快的内容到达时间（首屏加载更快）：SPA 会等待所有 Vue 编译后的 js 文件都下载完成后，才开始进行页面的渲染，文件下载等需要一定的时间等，所以首屏渲染需要一定的时间

* ssr渲染的缺点：
    - 更多的开发条件限制：例如服务端渲染只支持 beforCreate 和 created 两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境；
    - 更多的服务器负载：在 Node.js中渲染完整的应用程序，显然会比仅仅提供静态文件的  server 更加大量占用CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 ( high traffic ) 下使用，请准备相应的服务器负载，并明智地采用缓存策略

## 能说下vue-router中常用的hash和history路由模式实现原理吗

### hash模式的实现原理

原理很简单，location.hash 的值就是 URL 中 # 后面的内容

* URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
* hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
* 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
* 可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）

### history模式的实现原理

> HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：

* pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
* 我们可以使用 popstate  事件来监听 url 的变化，从而对页面进行跳转（渲染）；
* history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）

## [vue中key的作用](https://juejin.im/post/5aae19aa6fb9a028d4445d1a)

> key的作用主要是为了高效的更新虚拟DOM

* 从虚拟dom的角度来看：我们需要使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点

## vue通过数据劫持可以精准探测数据变化, 为什么还需要虚拟dom进行diff检测差异

现代前端框架有两种方式侦测变化, 一种是pull一种是push

pull: 其代表为React, 我们可以回忆一下React是如何侦测到变化的, 我们通常会用setStateAPI显式更新, 然后React会进行一层层的Virtual Dom Diff操作找出差异, 然后Patch到DOM上, React从一开始就不知道到底是哪发生了变化, 只是知道「有变化了」, 然后再进行比较暴力的Diff操作查找「哪发生变化了」，另外一个代表就是Angular的脏检查操作。

push: Vue的响应式系统则是push的代表, 当Vue程序初始化的时候就会对数据data进行依赖的收集, 一但数据发生变化, 响应式系统就会立刻得知, 因此Vue是一开始就知道是「在哪发生变化了」, 但是这又会产生一个问题, 如果你熟悉Vue的响应式系统就知道, 通常一个绑定一个数据就需要一个Watcher, 一但我们的绑定细粒度过高就会产生大量的Watcher, 这会带来内存以及依赖追踪的开销, 而细粒度过低会无法精准侦测变化, 因此Vue的设计是选择中等细粒度的方案, 在组件级别进行push侦测的方式, 也就是那套响应式系统, 通常我们会第一时间侦测到发生变化的组件, 然后在组件内部进行Virtual Dom Diff获取更加具体的差异, 而Virtual Dom Diff则是pull操作, Vue是push+pull结合的方式进行变化侦测的

## 如何理解virtualdom

[实现原理](https://juejin.im/post/5d36cc575188257aea108a74#heading-14)

* 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
* diff 算法 — 比较两棵虚拟 DOM 树的差异；
* pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

优缺点：
优点：

* 保证性能下限： 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
* 无需手动操作 DOM： 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
* 跨平台： 虚拟 DOM 本质上是 JavaScript 对象, 而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。

缺点:
无法进行极致优化： 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。

## [vue性能优化](https://github.com/Coffcer/Blog/issues/3)

[参考文章](https://juejin.im/post/5d548b83f265da03ab42471d)

1. 组件上优化点：初始化相对较慢

> 而正是这种做法引发了性能问题，要初始化一个父组件，必然需要先初始化它的子组件，而子组件又有它自己的子组件。那么要初始化根标签<app>，就需要从底层开始冒泡，将页面所有组件都初始化完。所以我们的页面会在所有组件都初始化完才开始显示

```js
<body>
    <app></app> 
</body>
```
> 解决方案：我们给要延迟渲染的组件加上v-if,v-if是惰性的，只有当第一次值为true时才会开始初始化
```js
<app>
    <A></A>
    <B v-if="showB"></B>
    <C v-if="showC"></C>
</app>
new Vue({
    data: {
        showB: false,
        showC: false
    },
    created () {
        // 显示B
        setTimeout(() => {
            this.showB = true;
        }, 0);
        // 显示C
        setTimeout(() => {
            this.showC = true;
        }, 0);
    }
});
```
2. vue依赖：初始化时，vue会对data做getter、setter改造，但仍然有优化空间
  
> Object.freeze()是ES5新增的API，用来冻结一个对象，禁止对象被修改, 如果你确保某个data不需要跟踪依赖，可以使用Object.freeze将其冻结。但请注意，被冻结的是对象的值，你仍然可以将引用整个替换调

## 高阶组件封装，HOC

## 项目如何选择框架vue/react

## 有写过什么组件，如何做的？设计一个组件的原则

[参考链接](https://juejin.im/post/5d59f2a451882549be53b170#heading-7)
