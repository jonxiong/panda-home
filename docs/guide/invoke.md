<!--
 * @Descripttion: 
 * @version: 
 * @Author: xiongyang
 * @Date: 2020-05-27 11:25:45
 * @LastEditors: xiongyang
 * @LastEditTime: 2020-06-02 22:09:41
--> 

# 调起基础

- [调起基础](#调起基础)
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
- 成功率高，没有拦截提示弹窗
- 需要用户点击触发，js无法自动执行，所以这种情况不能支持静默调起
- 请求必须跨域，同域调不起对应app
- 无法用常规方式获取调起成功或者失败，可以通过hack技术比如监听页面是否显示来判断
  
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

[参考文章](https://segmentfault.com/a/1190000014926730?utm_source=channel-hottest)
