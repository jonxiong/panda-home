# 调起

- [调起](#调起)
  - [调起方式](#调起方式)
    - [scheme](#scheme)
    - [ulink](#ulink)
  - [核心名词](#核心名词)
  - [组件涉及到的设计模式](#组件涉及到的设计模式)

## 调起方式

### scheme

场景：

* 安卓
* 不支持ulink
  + <ios9
  + 屏蔽了ULinke的某些浏览器

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
```

> 安卓调起的最大的特点就是，安卓无法知道是否成功调起了app。安卓下的调起一般都会有自带的兜底策略，所以无论调起成功失败都会走失败逻辑

### ulink

> 苹果推出的IOS9以上取代scheme

特点：

* 成功率高，没有拦截提示弹窗
* 需要用户点击触发，js无法自动执行，所以这种情况不能支持静默调起
* 请求必须跨域，同域调不起对应app
* 无法用常规方式获取调起成功或者失败，可以通过hack技术比如监听页面是否显示来判断

  

``` js
// IOS>9||安卓chrome>55支持UL调起
// 例子
// ${universalLink} = 'http://myapp.com'
// ${scheme} = 'myapp://index'
```

## 核心名词

JS-SDK: 面向网页开打着提供的网页开发工具包，
例如我们这个调起组件，可以使用简单的API进行手百的框外调起

## 组件涉及到的设计模式

## [JSBridge 初探](https://mp.weixin.qq.com/s?__biz=Mzg5NDEyMzA2NQ==&mid=2247484923&idx=2&sn=e79c98448d5d722647eea4c6bfdecdba&chksm=c02528adf752a1bb407fd2126b2b6ca81dcbdb135f0bfd56141720a6f9e62da5a492748f6883&mpshare=1&scene=1&srcid=&sharer_sharetime=1584976095126&sharer_shareid=11d9989b786f4531ef07e883cbf9d2ee&key=fbc37fb85bf8cbeed24a738baaf3d9233d0545e409305dcd55ffa670f5c36ae69d3dca197381216e58c8fc0625623784a98fec9ef6c7ca71073ebcb3a97b9123d2dbef701e3e1864c7b8126e6f794484&ascene=1&uin=MTgxMTAzNzg0Mg%3D%3D&devicetype=Windows+10&version=62080079&lang=zh_CN&exportkey=AfwnUG0wN5xxJAcmDqCZEN0%3D&pass_ticket=u%2FsXE9qMYN8ClL562fw5hSNiXIAL5c2d%2FBQbTuyQ3sfoIhOL2UtpB4%2FrBjGui9cd)
[参考文章](https://libin1991.github.io/2020/03/21/APP%E5%94%A4%E8%B5%B7%E9%82%A3%E7%82%B9%E7%A0%B4%E4%BA%8B/)

[参考文章](https://segmentfault.com/a/1190000014926730?utm_source=channel-hottest)
