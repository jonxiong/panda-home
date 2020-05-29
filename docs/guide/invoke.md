# 调起基础

- [调起基础](#调起基础)

## 核心代码

``` js
if (IOS < 9) {
    window.location.href = $ {
        universalLink
    };
} else {
    var $node = document.createElement('iframe');
    $node.style.display = 'none';
    $node.src = scheme;
    var body = document.body || document.getElementsByTagName('body')[0];
    body.appendChild($node);
    setTimeout(function() {
        body.removeChild($node);
        $node = null;
    }, 0);
}

// IOS>9||安卓chrome>55支持UL调起
// ulink触发条件：
// 1. 用户点击
// 2. 跨域
// 3. 跳转后的域名在某个APP内注册为ulink指定域

// 例子
// ${universalLink} = 'http://myapp.com'
// ${scheme} = 'myapp://index'
```

## IOS调起

## iOS如何实现【安装了调起，没有安装跳下载页】

## Android的调起

安卓调起的最大的特点就是，安卓无法知道是否成功调起了app。安卓下的调起一般都会有自带的兜底策略

## 核心名词

JS-SDK: 面向网页开打着提供的网页开发工具包，
例如我们这个调起组件，可以使用简单的API进行手百的框外调起

## 组件涉及到的设计模式

https://segmentfault.com/a/1190000014926730?utm_source=channel-hottest
