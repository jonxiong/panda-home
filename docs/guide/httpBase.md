# HTTP基础

- [HTTP基础](#http基础)
  - [http原理](#http原理)
  - [http三次握手四次挥手](#http三次握手四次挥手)
    - [三次握手](#三次握手)
    - [四次挥手](#四次挥手)
  - [http有哪些方法](#http有哪些方法)
  - [这些方法的具体作用是什么](#这些方法的具体作用是什么)
  - [get和post有什么区别](#get和post有什么区别)
  - [http的请求报文是什么样](#http的请求报文是什么样)
  - [http的响应报文是什么样的](#http的响应报文是什么样的)
  - [聊一聊http的部首有哪些](#聊一聊http的部首有哪些)
  - [认证和授权和凭证指的是](#认证和授权和凭证指的是)
  - [有几种前端储存的方式](#有几种前端储存的方式)
    - [这些方式的区别](#这些方式的区别)
    - [可以从下吗几个层面来区分](#可以从下吗几个层面来区分)
      - [生命周期](#生命周期)
      - [作用域](#作用域)
      - [存储大小](#存储大小)
      - [http请求](#http请求)
      - [应用场景](#应用场景)
  - [如何跨域共享cookie, 如何使脚本不能访问cookie](#如何跨域共享cookie-如何使脚本不能访问cookie)
  - [localstorage跨域共享, localstorage超过5m如何处理](#localstorage跨域共享-localstorage超过5m如何处理)
  - [http常用状态码都有哪些, 301和302的区别](#http常用状态码都有哪些-301和302的区别)
  - [谈谈https的加密原理](#谈谈https的加密原理)
  - [如果要将http站迁移到https怎么做迁移](#如果要将http站迁移到https怎么做迁移)
    - [https与http的默认端口号](#https与http的默认端口号)
  - [什么是跨域，解决跨域的方法及原理是什么](#什么是跨域解决跨域的方法及原理是什么)
    - [jsonp](#jsonp)
    - [cors](#cors)
  - [fetch和axios和ajax之间的差异](#fetch和axios和ajax之间的差异)
  - [如何让每次请求都请求新的资源](#如何让每次请求都请求新的资源)

## http原理

http（超文本传输协议）是一个基于请求与响应模式的、无状态的、应用层的协议，常基于TCP的连接方式
主要特点：

* 1. 支持客户/服务器模式。
* 2. 简单快速：客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有GET、HEAD、POST。每种方法规定了客户与服务器联系的类型不同。由于HTTP协议简单，使得HTTP服务器的程序规模小，因而通信速度很快。
* 3. 灵活：HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type加以标记。
* 4. 无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。
* 5. 无状态：HTTP协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。

## http三次握手四次挥手

HTTP与TCP区别和联系：
TCP对应传输层，HTTP对应应用层，从本质上来说，两者没有可比性；

HTTP协议即超文本传送协议(Hypertext Transfer Protocol )，是Web联网的基础，也是手机联网常用的协议之一，HTTP协议是建立在TCP协议之上的一种应用。

Http协议是建立在TCP协议基础之上的，当浏览器需要从服务器获取网页数据的时候，会发出一次Http请求。Http会通过TCP建立起一个到服务器的连接通道，当本次请求需要的数据完毕后，Http会立即将TCP连接断开，这个过程是很短的。所以Http连接是一种短连接，是一种无状态的连接。

* TCP是底层协议，定义的是数据传输和连接方式的规范。
* HTTP是应用层协议，定义的是传输数据的内容的规范。

所以三次握手和四次挥手是针对TCP连接的

### 三次握手

所谓三次握手(Three-way Handshake)，是指建立一个 TCP 连接时，需要客户端和服务器总共发送3个包。
三次握手的目的是连接服务器指定端口，建立 TCP 连接，并同步连接双方的序列号和确认号，交换 TCP 窗口大小信息。在 socket 编程中，客户端执行 connect() 时。将触发三次握手

1. 第一次握手，client to server【连接请求】- 我要发送数据给你

2. 第二次握手，server to client【授予连接】- 我能接受数据，你能接收到我给你的数据吗
  
3. 第三次握手，client to server【确认】- 我能接收到你返回的数据，连接ok

客户端再次发送确认包(ACK)，SYN 标志位为0，ACK 标志位为1，并且把服务器发来 ACK 的序号字段+1，放在确定字段中发送给对方，并且在数据段放写ISN的+1
发送完毕后，客户端进入 ESTABLISHED 状态，当服务器端接收到这个包时，也进入 ESTABLISHED 状态，TCP 握手结束。

### 四次挥手

TCP 的连接的拆除需要发送四个包，因此称为四次挥手(Four-way handshake)，也叫做改进的三次握手。客户端或服务器均可主动发起挥手动作，在 socket 编程中，任何一方执行 close() 操作即可产生挥手操作。
简化说：

* 第一次挥手：clientToServer（C: 发送FIN，我没有数据给你了）
* 第二次挥手：serverToClient（S: 好的我知道要关闭请求了，我准备关闭连接）
* 第三次挥手：serverToClient（S: 我再没有数据给你了，我准备好关系连接了）
* 第四次挥手：clientToServer（C: 好的收完了，你可以关闭我们之间的数据传输通道了，S收到确认信息，关闭连接）

## http有哪些方法

* HTTP1.0定义了三种请求方法： GET, POST 和 HEAD方法
* HTTP1.1新增了五种请求方法：OPTIONS, PUT, DELETE, TRACE 和 CONNECT

了解大概有哪些就行

## 这些方法的具体作用是什么

* GET: 通常用于请求服务器发送某些资源
* HEAD: 请求资源的头部信息, 并且这些头部与 HTTP GET 方法请求时返回的一致. 该请求方法的一个使用场景是在下载一个大文件前先获取其大小再决定是否要下载, 以此可以节约带宽资源
* OPTIONS: 用于获取目的资源所支持的通信选项
* POST: 发送数据给服务器
* PUT: 用于新增资源或者使用请求中的有效负载替换目标资源的表现形式
* DELETE: 用于删除指定的资源
* PATCH: 用于对资源进行部分修改
* CONNECT: HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器
* TRACE: 回显服务器收到的请求，主要用于测试或诊断

## get和post有什么区别

除了我们周知的

* 数据传输方式不同：GET请求通过URL传输数据，而POST的数据通过请求体传输。
* 安全性不同：POST的数据因为在请求主体内，所以有一定的安全性保证，而GET的数据在URL中，通过历史记录，缓存很容易查到数据信息。
* 数据类型不同：GET只允许 ASCII 字符，而POST无限制
* GET无害： 刷新、后退等浏览器操作GET请求是无害的，POST可能重复提交表单
* 特性不同：GET是安全（这里的安全是指只读特性，就是使用这个方法不会引起服务器状态变化）且幂等（幂等的概念是指同一个请求方法执行多次和仅执行一次的效果完全相同），而POST是非安全非幂等

[Get与Post的本质区别](https://mp.weixin.qq.com/s?__biz=MzI3NzIzMzg3Mw==&mid=100000054&idx=1&sn=71f6c214f3833d9ca20b9f7dcd9d33e4#rd)

本质上都为TCP链接，并无差别；
区别是：GET产生一个TCP数据包，POST产生两个TCP数据包

## http的请求报文是什么样

请求报文有4部分组成:

* 请求行
* 请求头部
* 请求体

![2019-06-14-11-24-10]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/6bb3600c998901243aa7b3934e5c7ffc.png)

* 请求行包括：请求方法字段、URL字段、HTTP协议版本字段。它们用空格分隔。例如，GET /index.html HTTP/1.1。
* 请求头部: 请求头部由关键字/值对组成，每行一对，关键字和值用英文冒号“:”分隔

1. User-Agent：产生请求的浏览器类型。
2. Accept：客户端可识别的内容类型列表。
3. Host：请求的主机名，允许多个域名同处一个IP地址，即虚拟主机。

* 请求体: post put等请求携带的数据

## http的响应报文是什么样的

请求报文有4部分组成:

* 响应行: 如下代码就是这个请求的响应行，返回请求的http协议及版本，状态码，请求状态等描述信息

``` 
Request URL:https://www.kancloud.cn/yunye/axios/comment?article_id=234845&page=1
Request Method:GET
Status Code:200 OK
Remote Address:117.23.61.221:443
```

* 响应头: 响应头和请求头格式一致，返回版本，缓存等信息。
* 空行
* 响应体: 平常接触最多的就是响应正文，也就是日常开发需要用到的数据。开发者拿到这些数据之后，再进行相应的处理。

![2019-06-14-11-37-02]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/1b6f58868e31fb23d0688b8ca0ca619f.png)

## 聊一聊http的部首有哪些

## 认证和授权和凭证指的是

* 认证：验证当前用户的身份，证明你是你自己
* 授权：用户授权第三方应用访问该用户某些资源的权限
* 凭证：实现认证和授权需要一种媒介（证书）来标记访问者的身份 **身份证**

## 有几种前端储存的方式

cookies、localstorage、sessionstorage、Web SQL、IndexedDB

### 这些方式的区别

* cookies： 在HTML5标准前本地储存的主要方式，优点是兼容性好，请求头自带cookie方便，缺点是大小只有4k，自动请求头加入cookie浪费流量，每个domain限制20个cookie，使用起来麻烦需要自行封装
* localStorage：HTML5加入的以键值对(Key-Value)为标准的方式，优点是操作方便，永久性储存（除非手动删除），大小为5M，兼容IE8+
* sessionStorage：与localStorage基本类似，区别是sessionStorage当页面关闭后会被清理，而且与cookie、localStorage不同，他不能在所有同源窗口中共享，是会话级别的储存方式
* Web SQL：2010年被W3C废弃的本地数据库数据存储方案，但是主流浏览器（火狐除外）都已经有了相关的实现，web sql类似于SQLite，是真正意义上的关系型数据库，用sql进行操作，当我们用JavaScript时要进行转换，较为繁琐。
* IndexedDB： 是被正式纳入HTML5标准的数据库储存方案，它是NoSQL数据库，用键值对进行储存，可以进行快速读取操作，非常适合web场景，同时用JavaScript进行操作会非常方便。

### 可以从下吗几个层面来区分

#### 生命周期

  + cookie: 可设置失效时间，没有设置的话，默认是关闭浏览器后失效
  + localStorage: 永久
  + sessionStorage： 会话存储，当前窗口和标签

#### 作用域

  + 不同浏览器无法共享localStorage或sessionStorage中的信息
  + 相同浏览器的不同页面间可以共享相同的 localStorage（页面属于相同域名和协议，主机和端口）
    - 不同页面或标签页间无法共享sessionStorage的信息
    - localStorage只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份localStorage数据。
    - sessionStorage比localStorage更严苛一点，除了协议、主机名、端口外，还要求在同一窗口（也就是浏览器的标签页）下。

#### 存储大小

  + cookie：4KB左右
  + localStorage||sessionStorage：5MB

#### http请求

  + cookie：每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题
  + localStorage||sessionStorage：仅在客户端（即浏览器）中保存，不参与和服务器的通信

#### 应用场景

  + localStoragese：常用于长期登录（+判断用户是否已登录），适合长期保存在本地的数据；sessionStorage：敏感账号一次性登录

> 注意：session 和 sessionStroage 的区别, 顺便说一句，session 也是依赖于cookie实现的

首先要分清的是，cookies，sessionStroage和localStorage是在客户端，session是在服务器端。服务器端的session机制， session 对象数据保存在服务器上。
实现上，服务器和浏览器之间仅需传递session id即可，服务器根据session id找到对应用户的session对象。会话数据仅在一段时间内有效，这个时间就是server端设置的session有效期。服务器session存储数据安全一些，一般存放用户信息，浏览器只适合存储一般数据.

## 如何跨域共享cookie, 如何使脚本不能访问cookie

* setDomain
* HttpOnly

## localstorage跨域共享, localstorage超过5m如何处理



## http常用状态码都有哪些, 301和302的区别

301:moved permanently，永久性重定向，表示资源已被分配了新的 URL
302:found，临时性重定向，表示资源临时被分配了新的 URL

## 谈谈https的加密原理

HTTP = HTTP + SSL

* 1. 客户端：请求https链接
* 2. 服务端：产生公钥和解公钥钥匙，返回公钥（证书）给客户端
* 3. 客户端：产生随机（对称密钥），使用公钥对对称密钥加密，发送加密后的对称密钥
* 4. 服务端：用公钥钥匙揭秘获得对称密钥，通过对称密钥加密的密文通信

## 如果要将http站迁移到https怎么做迁移

为什么要升级成https：

升级到HTTPS是改善网站和最终业务性能的好方法。
经过测试，运行在HTTPS上的网站的性能要优于HTTP上的网站。原因：数据安全性，更好的技术支持和更好的SEO。

1. 首先要申请SSL证书，然后将SSL证书安装到服务器端
2. 整改网站链接：SSL证书安装成功后，你的服务器就支持https了。这时我们要把自己网站上的全部链接修改成https的形式
3. 运行301重定向： 301重定向将90-99％的排名能力转移到重定向的页面。他们将您的站点平稳地移至HTTPS，从而保持SEO完整性。因此，请在服务器级别运行它们

### https与http的默认端口号

* HTTP服务器，默认端口号为80/tcp（木马Executor开放此端口）
* HTTPS（securely transferring web pages）服务器，默认端口号为443/tcp  443/udp

## 什么是跨域，解决跨域的方法及原理是什么

* 1. 不同源就是跨域
* 2. 同源策略是浏览器的一种安全策略
* 3. 协议，域名，端口号完全相同就是同源，只要有一处不一样就是跨域
* 4. 特例： ajax在判断域名的时候只能解析字符串，导致(localhost和127.0.0.1)在它看来也是跨域请求
* 5. 解决跨域的方式通常用cors和jsonp

### jsonp

* 1. JSONP是一种技巧，不是一门新的技术
* 2. 利用scirpt标签的src属性不受跨域的限制的特点
* 3. 解决跨域：
    - 1.浏览器端：动态生成script标签，提前定义好回调函数，在合适的时机添加src属性指定请求的地址。
    - 2.服务器端：后台接收到回调函数，将数据包括在回调函数调用的句柄中，一起返回。
    - 3.只支持get请求

``` js
function jsonp({
    url,
    params,
    callback
}) {
    return new Promise((resolve, reject) => {
        // 创建srcipt
        let script = document.createElement("script")
        window[callback] = function(data) {
            resolve(data)
            document.body.removeChild(script)
        }
        // 参数重新格式化
        params = {
            ...params,
            callback
        } // wd=b&callback=show
        let arrs = []
        for (let key in params) {
            arrs.push( `${key}=${params[key]}` )
        }
        // 后台获取数据的接口拼接上参数
        script.src = `${url}?${arrs.join('&')}` 
        // srcipt插入
        document.body.appendChild(script)
    })
}
jsonp({
    url: 'http://localhost:3000/say',
    params: {
        wd: 'Iloveyou'
    },
    callback: 'show'
}).then(data => {
    console.log(databufen)
})
```

### cors

* 1. 浏览器端什么也不用干；
* 2. 服务器端设置响应头：Access-Control-Allow-Origin
* 3.cors是一门技术，在本质上让ajax引擎允许跨域
* 4.get和post请求都支持

【提问】：为什么cros能解决跨域

## [fetch和axios和ajax之间的差异](https://juejin.im/post/5acde23c5188255cb32e7e76)

fetch:
号称是ajax的替代品，它的API是基于Promise设计的，旧版本的浏览器不支持Promise，需要使用polyfill es6-promise

axios:
可以在node.js中使用
提供了并发请求的接口
支持Promise API

[参考](http://axios-js.com/zh-cn/axios-ajax-fetch-compare.html)
[参考](https://segmentfault.com/a/1190000012836882)

## 如何让每次请求都请求新的资源


