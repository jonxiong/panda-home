# 面试

## 自我介绍

## 主要的业务以及承担的角色

## 基础

## html
- [HTML基础](#html基础)
  - [script标签中defer和async的区别✨](#script标签中defer和async的区别) 
  - [移动端点击穿透问题✨](#移动端点击穿透问题)3.5 fastclick解决不太
  - [浏览器不同tab之间如何通信✨](#浏览器不同tab之间如何通信)
  - [重绘与重排] 3.5
    - [会导致重排的因素](#会导致重排的因素)
    - [如何避免重绘重排](#如何避免重绘重排)
  - [移动端适配1px的问题（考察dpr）✨✨](#移动端适配1px的问题考察dpr) 3.5
  - [谈谈对bfc的理解✨](#谈谈对bfc的理解) 3.5
  - [什么是bfc](#什么是bfc)
  - [bfc触发条件](#bfc触发条件)
  - [bfc作用](#bfc作用)
- [什么时候会触发重绘和重排，区别以及如何避免✨](#什么时候会触发重绘和重排区别以及如何避免)
- 
- [动画gpu加速✨](#动画gpu加速)4
- requestAnimaton
- trans:3d will-change
  - [理解闭包吗](#理解闭包吗) 3.5
    - [概念](#概念)
    - [用途](#用途)
  - [讲讲js垃圾回收是怎么做的？✨](#讲讲js垃圾回收是怎么做的) 3.5（知道一种）
  - [谈谈对原型链的理解✨](#谈谈对原型链的理解)
  - [原型对象](#原型对象)
  - [原型链](#原型链)
  - es6都用过什么
   class和构造函数的区别 4
   - 写法
   - 
   JS模块化：4
   commonJs



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
  - [http缓存机制](#http缓存机制✨) 2。5 记混了
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
  - [babel-loader的编译原理✨](#babel-loader的编译原理) 3.5
  - [Loader和Plugin相关](#loader和plugin的不同) 插件
  - [webpack是的构建流程是什么✨](#webpack是的构建流程是什么)
  - [如何用webpack来优化前端性能](#如何用webpack来优化前端性能)
  - [webpack的劣势在哪里](#webpack的劣势在哪里)
  - [骨架屏实现✨](#骨架屏实现)

- 页面性能优化 4-
- 首屏时间
- 白屏时间
- load时间
- 可用时间

服务端渲染，
静态资源 cdn
懒加载


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

小程序优化 3
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

### NPM包如何开发的 

新手引导组件：组册，执行， 4 也有做相关单元测试

### 单元测试、组件自动化测试

### 如何做压力测试和抗压方案
