# 面试

## 自我介绍

## 主要的业务以及承担的角色

## 基础

## html
- [HTML基础](#html基础)
  - [doctype的作用是什么](#doctype的作用是什么)
  - [怪异模式和标准模式的区别是什么](#怪异模式和标准模式的区别是什么)
  - [html和xhtml和xml有什么区别](#html和xhtml和xml有什么区别)
  - [什么是data-属性](#什么是data-属性)
  - [对html语义化的理解](#对html语义化的理解)
  - [html5与html4的不同之处](#html5与html4的不同之处)
  - [有哪些常用的meta标签](#有哪些常用的meta标签)
  - [src和href的区别](#src和href的区别)
  - [script标签中defer和async的区别✨](#script标签中defer和async的区别)
  - [iframe有那些缺点✨](#iframe有那些缺点)

## CSS

- [css基本元素类型✨](#css基本元素类型)
- [img元素✨](#img元素)
- [css选择器的优先级Î](#css选择器的优先级î)
  - [!important优先级（最高）](#important优先级最高)
  - [css选择器有哪些什么属性可以继承✨](#css选择器有哪些什么属性可以继承)
- [link和import的区别](#link和import的区别)
- [css有哪些方式可以隐藏页面元素✨](#css有哪些方式可以隐藏页面元素)
  - [【追问】**opacity:0**和**visibility:hidden**都可以隐藏页面元素，它们的区别？✨](#追问opacity0和visibilityhidden都可以隐藏页面元素它们的区别)
- [em和px和rem区别✨](#em和px和rem区别)
  - [用rem的坏处✨](#用rem的坏处)
- [什么是viewport](#什么是viewport)
  - [通过viewport我们可以做什么, 在项目中如何做的适配](#通过viewport我们可以做什么-在项目中如何做的适配)
- [移动端适配1px的问题（考察dpr）✨](#移动端适配1px的问题考察dpr)
  - [物理像素(physical pixel/`piksl/)](#物理像素physical-pixelpiksl)
  - [设备独立像素(density-independent pixel)](#设备独立像素density-independent-pixel)
  - [设备像素比(device pixel ratio )](#设备像素比device-pixel-ratio-)
- [怎么让chrome支持小于12px的文字✨](#怎么让chrome支持小于12px的文字)
- [css有几种定位方式✨](#css有几种定位方式)
- [如何理解z-index](#如何理解z-index)
- [清除浮动有哪些方法](#清除浮动有哪些方法)
- [谈谈对bfc的理解✨](#谈谈对bfc的理解)
  - [什么是bfc](#什么是bfc)
  - [bfc触发条件](#bfc触发条件)
  - [bfc作用](#bfc作用)
- [什么时候会触发重绘和重排，区别以及如何避免✨](#什么时候会触发重绘和重排区别以及如何避免)
- [translatex与left区别✨](#translatex与left区别)
- [drop-shadow和box-shadow的区别和作用✨](#drop-shadow和box-shadow的区别和作用)
- [伪类与伪元素](#伪类与伪元素)
  - [盒模型（标准盒模型，怪异盒模型）✨](#盒模型标准盒模型怪异盒模型)
- [stylus/sass/less区别](#stylussassless区别)
- [css写法注意点](#css写法注意点)
- [浏览器是怎样解析css选择器的](#浏览器是怎样解析css选择器的)
- [动画gpu加速✨](#动画gpu加速)
- [垂直居中列举想到的✨](#垂直居中列举想到的)

## Browser

- [一个页面从输入url到显示经历了什么✨](#一个页面从输入url到显示经历了什么)
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
- [移动端点击穿透问题✨](#移动端点击穿透问题)
  - [解决方案](#解决方案)
- [是否了解Dom1, Dom2, Dom3以及他们的区别](#是否了解dom1-dom2-dom3以及他们的区别)
- [什么是事件委托](#什么是事件委托)
  - [优点](#优点)
  - [局限性](#局限性)
- [页面白屏和首屏时间是怎么计算的✨](#如何判断页面白屏如果出现白屏怎么排查)
- [v8引擎](#v8引擎)
- [前端如何实现实时通讯](#前端如何实现实时通讯)
  - [短轮询](#短轮询)
  - [comet](#comet)
  - [SSE](#sse)
  - [Websocket](#websocket)
  - [Web Worker](#web-worker)
  - [Service workers](#service-workers)
- [浏览器不同tab之间如何通信✨](#浏览器不同tab之间如何通信)

## JS基础

- [JS基础](#js基础)
  - [js数据类型都有什么✨](#js数据类型都有什么)
  - [null与undefined的区别是什么✨](#null与undefined的区别是什么)
  - [为什么会有bigint提案](#为什么会有bigint提案)
  - [0.1加0.2为什么不等于0.3](#01加02为什么不等于03)
  - [类型转换的规则](#类型转换的规则)
    - [类型转换的原理是什么](#类型转换的原理是什么)
  - [解释下变量提升✨](#解释下变量提升)
  - [js是解释型还是编译型语言可引深jit✨](#js是解释型还是编译型语言可引深jit)
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
  - [谈谈对原型链的理解✨](#谈谈对原型链的理解)
    - [原型对象](#原型对象)
    - [原型链](#原型链)
  - [理解闭包吗](#理解闭包吗)
    - [概念](#概念)
    - [用途](#用途)
  - [讲讲js垃圾回收是怎么做的？✨](#讲讲js垃圾回收是怎么做的)
  - [this的理解✨](#this的理解)
    - [箭头函数的this指向哪里](#箭头函数的this指向哪里)
  - [call与apply与bind区别✨](#call与apply与bind区别)
  - [async和await是什么✨](#async和await是什么)
    - [async/await相比于promise的优势](#asyncawait相比于promise的优势)
  - [函数式编程](#函数式编程)
    - [函数的合成和柯里化](#函数的合成和柯里化)
    - [合成](#合成)
    - [柯里化](#柯里化)
  - [响应](#响应)

### HTTP

- [HTTP基础](#http基础)
  - [http原理](#http原理)
  - [http三次握手四次挥手✨](#http三次握手四次挥手)
    - [三次握手](#三次握手)
    - [四次挥手](#四次挥手)
  - [http有哪些方法](#http有哪些方法)
  - [这些方法的具体作用是什么](#这些方法的具体作用是什么)
  - [get和post有什么区别✨](#get和post有什么区别)
  - [http的请求报文是什么样](#http的请求报文是什么样)
  - [http的响应报文是什么样的](#http的响应报文是什么样的)
  - [聊一聊http的部首有哪些](#聊一聊http的部首有哪些)
  - [认证和授权和凭证指的是](#认证和授权和凭证指的是)
  - [有几种前端储存的方式✨](#有几种前端储存的方式)
    - [这些方式的区别](#这些方式的区别)
    - [可以从下吗几个层面来区分](#可以从下吗几个层面来区分)
      - [生命周期](#生命周期)
      - [作用域](#作用域)
      - [存储大小](#存储大小)
      - [http请求](#http请求)
      - [应用场景](#应用场景)
  - [如何跨域共享cookie, 如何使脚本不能访问cookie✨](#如何跨域共享cookie-如何使脚本不能访问cookie)
  - [localstorage跨域共享, localstorage超过5m如何处理✨](#localstorage跨域共享-localstorage超过5m如何处理)
  - [http常用状态码都有哪些, 301和302的区别](#http常用状态码都有哪些-301和302的区别)
  - [谈谈https的加密原理](#谈谈https的加密原理)
  - [如果要将http站迁移到https怎么做迁移](#如果要将http站迁移到https怎么做迁移)
    - [https与http的默认端口号](#https与http的默认端口号)
  - [什么是跨域，解决跨域的方法及原理是什么✨](#什么是跨域解决跨域的方法及原理是什么)
    - [jsonp](#jsonp)
    - [cors](#cors)
  - [fetch和axios和ajax之间的差异✨](#fetch和axios和ajax之间的差异)
  - [如何让每次请求都请求新的资源](#如何让每次请求都请求新的资源)

- [HTTP缓存](#http缓存)
  - [背景](#背景)
  - [http缓存机制](#http缓存机制✨)
    - [强制缓存](#强制缓存)
      - [Expires](#expires)
      - [Cache-Control](#cache-control)
    - [协商缓存](#协商缓存)
      - [Last-Modified](#last-modified)
      - [if-Modified-Since](#if-modified-since)
      - [Etag](#etag)
      - [If-None-Match](#if-none-match)
    - [缓存的优点](#缓存的优点)
    - [不同刷新的请求执行过程](#不同刷新的请求执行过程)
  - [浏览器缓存技术](#浏览器缓存技术)
  - [keep alive](#keep-alive)

* [VUE](#vue)
  - [mvvm](#mvvm)
    - [mvvm的优缺点](#mvvm的优缺点)
    - [vue是如何实现数据双向绑定的](#vue是如何实现数据双向绑定的)
    - [vue框架怎么实现对象和数组的监听✨](#vue框架怎么实现对象和数组的监听)
  - [对vue的生命周期理解，请求一般放在哪个生命周期](#对vue的生命周期理解请求一般放在哪个生命周期)
    - [在哪个生命周期内调用异步请求](#在哪个生命周期内调用异步请求)
    - [在什么阶段才能访问操作DOM✨](#在什么阶段才能访问操作dom)
  - [vue的父组件和子组件生命周期钩子函数执行顺序✨](#vue的父组件和子组件生命周期钩子函数执行顺序)
    - [父组件可以监听到子组件的生命周期吗？如何监听](#父组件可以监听到子组件的生命周期吗如何监听)
  - [计算属性vs方法✨](#计算属性vs方法)
  - [watch与computed的区别✨](#watch与computed的区别)
  - [vue如何实现双向绑定](#vue如何实现双向绑定)
  - [观察者和发布者订阅模式以及区别](#观察者和发布者订阅模式以及区别)
  - [vue3跟vue2的区别](#vue3跟vue2的区别)
    - [proxy与objectdefinedproperty的优点✨](#proxy与objectdefinedproperty的优点)
  - [vue组件间通信有哪几种方式✨](#vue组件间通信有哪几种方式)
    - [vuex是做什么的主要解决什么问题，里面的各个文件是如何分工的](#vuex是做什么的主要解决什么问题里面的各个文件是如何分工的)
  - [如何解决vue渲染白屏问题✨](#如何解决vue渲染白屏问题)
    - [使用过vuessr吗说说ssr](#使用过vuessr吗说说ssr)
  - [能说下vue-router中常用的hash和history路由模式实现原理吗](#能说下vue-router中常用的hash和history路由模式实现原理吗)
    - [hash模式的实现原理](#hash模式的实现原理)
    - [history模式的实现原理](#history模式的实现原理)
  - [vue中key的作用](#vue中key的作用)
  - [vue通过数据劫持可以精准探测数据变化,为什么还需要虚拟dom进行diff检测差异](#vue通过数据劫持可以精准探测数据变化为什么还需要虚拟dom进行diff检测差异)
  - [如何理解virtualdom](#如何理解virtualdom)
  - [vue性能优化](#vue性能优化)
  - [高阶组件封装，HOC](#高阶组件封装hoc)
  - [项目如何选择框架vue/react](#项目如何选择框架vuereact)
  - [有写过什么组件，如何做的？设计一个组件的原则](#有写过什么组件如何做的设计一个组件的原则)

### Node

## Webpack: 

- [WEBPACK](#webpack)
  - [分别介绍bundle，chunk，module是什么](#分别介绍bundlechunkmodule是什么)
  - [webpack配置中需要理解几个核心的概念](#webpack配置中需要理解几个核心的概念)
  - [webpack源码之ast简介](#webpack源码之ast简介)
    - [原理](#原理)
    - [应用场景](#应用场景)
  - [loder是同步还是异步](#loder是同步还是异步)
  - [如何编写一个loader或者plugin](#如何编写一个loader或者plugin)
  - [webpack跟gulp的区别✨](#webpack跟gulp的区别)
  - [常用的哪些loader和plugin✨](#常用的哪些loader和plugin)
  - [babel-loader的编译原理✨](#babel-loader的编译原理)
  - [Loader和Plugin的不同](#loader和plugin的不同)
  - [webpack是的构建流程是什么✨](#webpack是的构建流程是什么)
  - [如何用webpack来优化前端性能](#如何用webpack来优化前端性能)
  - [webpack的劣势在哪里](#webpack的劣势在哪里)
  - [骨架屏实现✨](#骨架屏实现)


### native和前端如何通信

### 如何唤起app原理

### js迁移到ts

### 有自己做过什么小应用，插件，独立博客

### 如何学习前端知识

### 对小程序是否有了解
- [小程序与PWA](#小程序与pwa)
  - [小程序](#小程序)
    - [小程序基本原理](#小程序基本原理)
    - [小程序特点](#小程序特点)
    - [小程序架构](#小程序架构)
    - [小程序优点](#小程序优点)
    - [小程序存在的问题](#小程序存在的问题)
    - [小程序面试问题](#小程序面试问题)
  - [pwa](#pwa)
  - [h5与原生app交互原理](#h5与原生app交互原理)
  - [webAssembly](#webassembly)
  - [websocket](#websocket)

## 项目亮点

## 谈一下所知道的性能优化

* 这些优化方法背后的原理是什么？
* 除了这些常规的，你还了解什么最新的方法么？
* 如何分析页面性能？

### 项目：

* 做过最满意的项目是什么？自己做过项目的难点和亮点
* 项目背景
    - 为什么要做这件事情
    - 最终达到什么效果？
* 在项目中遇到什么技术问题？具体是如何解决的？

### 学习前端的自驱力是

### NPM包管理模式

### 单元测试、组件自动化测试

### 如何做压力测试和抗压方案
