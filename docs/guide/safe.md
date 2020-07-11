# 前端安全

## [xss和csrf攻击以及防御](https://juejin.im/entry/5b4b56fd5188251b1a7b2ac1)

### XSS(Cross Site Scripting)

> 跨站脚本攻击，恶意注入，指攻击者在网站上注入恶意的客户端代码，通过恶意脚本对客户端网页进行篡改，从而在用户浏览网页时，对用户浏览器进行控制或者获取用户隐私数据的一种攻击方式

攻击方式：往Web页面插入恶意的 JavaScript 代码，当用户浏览网页的时候，插入的代码就是被执行，从而达到攻击的目的

``` js
< script > alert(document.cookie); < /script>
```

XSS防范:

* 将重要的cookies标记为**HTTP ONLY**，让JavaScript代码无法调用，只有http能调用。或者将重要的信息保存在session里面
* 控制用户输入的数据类型。比如就只能输入数字和小数点
* 对数据进行加密处理
* 过滤或者移除特殊的HTML标签，过滤JavaScript代码等

### CSRF(Cross-site request forgery)

> 跨站请求攻击，冒充用户发起请求，完成违背用户意愿的请求. 其实就是攻击者盗用了受害者的身份，以受害者的名义向网站发送恶意请求

xss偏向方法论，代码实现
csrf偏向一个攻击结果
xss是实现csrf诸多路径中的一条

[参考文章](https://tech.meituan.com/2018/09/27/fe-security.html)
[参考文章](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)
