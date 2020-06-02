# HTML基础

- [HTML基础](#html基础)
  - [doctype的作用是什么](#doctype的作用是什么)
  - [怪异模式和标准模式的区别是什么](#怪异模式和标准模式的区别是什么)
  - [html和xhtml和xml有什么区别](#html和xhtml和xml有什么区别)
  - [什么是data-属性](#什么是data-属性)
  - [对html语义化的理解](#对html语义化的理解)
  - [html5与html4的不同之处](#html5与html4的不同之处)
  - [有哪些常用的meta标签](#有哪些常用的meta标签)
  - [src和href的区别](#src和href的区别)
  - [script标签中defer和async的区别](#script标签中defer和async的区别)
  - [iframe有那些缺点](#iframe有那些缺点)

## doctype的作用是什么

DOCTYPE是html5标准网页声明，且必须声明在HTML文档的第一行。来告知浏览器的解析器用什么文档标准解析这个文档，不同的渲染模式会影响到浏览器对于 CSS 代码甚至 JavaScript 脚本的解析

文档解析类型有：

* BackCompat：怪异模式，浏览器使用自己的怪异模式解析渲染页面。（如果没有声明DOCTYPE，默认就是这个模式）
* CSS1Compat：标准模式，浏览器使用W3C的标准解析渲染页面。

> 使用了<! DOCTYPE html>就相当于开启了CSS1Compat模式，让浏览器按照该W3C标准解析html标签和css代码

## 怪异模式和标准模式的区别是什么

* 标准模式(standards mode)：页面按照 HTML 与 CSS 的定义渲染
* 怪异模式(quirks mode)模式： 会模拟更旧的浏览器的行为
* 近乎标准(almost standards)模式： 会实施了一种表单元格尺寸的怪异行为（与IE7之前的单元格布局方式一致），除此之外符合标准定义

## html和xhtml和xml有什么区别

* HTML(超文本标记语言): 在html4.0之前HTML先有实现再有标准，导致HTML非常混乱和松散
* XML(可扩展标记语言): 主要用于**存储数据和结构**，可扩展，大家熟悉的JSON也是相似的作用，但是更加轻量高效，所以XML现在市场越来越小了
* XHTML(可扩展超文本标记语言): 基于上面两者而来，W3C为了解决HTML混乱问题而生，并基于此诞生了HTML5，开头加入 `<!DOCTYPE html>` 的做法因此而来，如果不加就是兼容混乱的HTML，加了就是标准模式。(其实XHTML就是严谨而准确的HTML。如果说HTML是汉语，那么XHTML就是标准普通话)

* 区分HTML和XHTML
  + XHTML: 文档开头 `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">` . 有严格版、过渡版、框架版等几个版本
  + HTML: `<!DOCTYPE html>` 

## 什么是data-属性

HTML的数据属性，用于将数据储存于标准的HTML元素中作为额外信息, 我们可以通过js访问并操作它，来达到操作数据的目的。

``` html
<article id="electriccars" data-columns="3" data-index-number="12314" data-parent="cars">
    ...
</article>
```

> 前端框架出现之后，这种方法已经不流行了

## 对html语义化的理解

语义化是指使用恰当语义的html标签，让页面具有良好的结构与含义，比如 `<p>` 标签就代表段落， `<article>` 代表正文内容等等。

语义化的好处主要有两点：

* 开发者友好：使用语义类标签增强了可读性，开发者也能够清晰地看出网页的结构，也更为便于团队的开发和维护
* 机器友好：带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，语义类还可以支持读屏软件，根据文章可以自动生成目录

这对于简书、知乎这种富文本类的应用很重要，语义化对于其网站的内容传播有很大的帮助，但是对于功能性的web软件重要性大打折扣，比如一个按钮、Skeleton这种组件根本没有对应的语义，也不需要什么SEO。

## html5与html4的不同之处

* 文件类型声明（<! DOCTYPE>）仅有一型：<! DOCTYPE HTML>。
* 新的解析顺序：不再基于SGML。
* 新的元素：section, video, progress, nav, meter, time, aside, canvas, command, datalist, details, embed, figcaption, figure, footer, header, hgroup, keygen, mark, output, rp, rt, ruby, source, summary, wbr。
* input元素的新类型：date, email, url等等。
* 新的属性：ping（用于a与area）, charset（用于meta）, async（用于script）。
* 全域属性：id, tabindex, repeat。
* 新的全域属性：contenteditable, contextmenu, draggable, dropzone, hidden, spellcheck。
* 移除元素：acronym, applet, basefont, big, center, dir, font, frame, frameset, isindex, noframes, strike, tt

## 有哪些常用的meta标签

meta标签由name和content两个属性来定义，来描述一个HTML网页文档的 `元信息` ，例如作者、日期和时间、网页描述、关键词、页面刷新等，除了一些http标准规定了一些name作为大家使用的共识，开发者也可以自定义name。

* charset，用于描述HTML文档的编码形式

``` html
 <meta charset="UTF-8">
```

* http-equiv，顾名思义，相当于http的文件头作用, 比如下面的代码就可以设置http的缓存过期日期

``` html
＜meta http-equiv="expires" content="Wed, 20 Jun 2019 22:33:00 GMT"＞
```

* viewport，移动前端最熟悉不过，Web开发人员可以控制视口的大小和比例

``` html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

* apple-mobile-web-app-status-bar-style, 开发过PWA应用的开发者应该很熟悉，为了自定义苹果工具栏的颜色。

``` html
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

## src和href的区别

* src是指向外部资源的位置，指向的内容会嵌入到文档中当前标签所在的位置，在请求src资源时会将其指向的资源下载并应用到文档内，如js脚本，img图片和frame等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，知道将该资源加载、编译、执行完毕，所以一般js脚本会放在底部而不是头部。

* href是指向网络资源所在位置（的超链接），用来建立和当前元素或文档之间的连接，当浏览器识别到它他指向的文件时，就会并行下载资源，不会停止对当前文档的处理。

写代码的时候就经常把这两个属性弄混淆，到底是href还是src，href标识超文本引用，用在link和a等元素上，href是引用和页面关联，是在当前元素和引用资源之间建立联系，src表示引用资源，表示替换当前元素，用在img，script，iframe上，src是页面内容不可缺少的一部分

> 它们之间的主要区别可以用这样一句话来概括: src用于替代这个元素，而href用于建立这个标签与外部资源之间的关系

**href (Hypertext Reference)** 超文本引用href这个属性指定web资源的位置，从而定义当前元素（如锚点a）或当前文档（如链接）与目标锚点或目标资源之间的联系。
例如当我们写：

``` js
< link href = "style.css"
rel = "stylesheet" / >
```

浏览器知道这是个样式表文件，html的解析和渲染不会暂停，css文件的加载是同时进行的，这不同于在style标签里面的内置样式，用@import添加的样式是在页面载入之后再加载，这可能会导致页面因重新渲染而闪烁。所以我们建议使用link而不是@import

补充：link和@import的区别
两者都是外部引用CSS的方式，但是存在一定的区别：

* 区别1：link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
* 区别2：link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载(重要)
* 区别3：link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
* 区别4：link支持使用Javascript控制DOM去改变样式；而@import不支持。

**src (Source)**源这个属性是将资源嵌入到当前文档中元素所在的位置。例如当我们写：

``` js
< script src = "script.js" > < /script>
```

当浏览器解析到这句代码时，页面的加载和解析都会暂停直到浏览器拿到并执行完这个js文件。这就像是把js文件里的内容全部注入到这个script标签中，类似于img，img标签是一个空标签，它的内容就是由src这个属性定义，浏览器会暂停加载直到这个图片加载完成。这也是为什么要将js文件的加载放在body最后的原因（在</body>前面）

## script标签中defer和async的区别

* defer(延迟脚本)：浏览器指示脚本在文档被解析后执行，script被异步加载后并不会立刻执行，而是等待文档被解析完毕后执行，【先于DOMContentLoaded执行】。
* async(异步脚本)：同样是异步加载脚本，区别是脚本加载完毕后立即执行，这导致async属性下的脚本是乱序的，对于script有先后依赖关系的情况，并不适用，【异步脚本会先于load事件前执行】。

![2019-06-13-07-13-42]( https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/c84fdc0e47268832fa8914ab4d125002.png)

> 蓝色线代表网络读取，红色线代表执行时间，这俩都是针对脚本的；绿色线代表 HTML 解析

defer与async的区别是：</br>
defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；</br>
async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。</br>
一句话，defer是“渲染完再执行”，async是“下载完就执行”。</br>
另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的

## iframe有那些缺点

基本知识：
iframe就是我们常用的iframe标签, iframe标签是框架的一种形式，也比较常用到，iframe一般用来包含别的页面，例如我们可以在我们自己的网站页面加载别人网站或者本站其他页面的内容
[iframe如何跨域通信](https://juejin.im/post/5e9045316fb9a03c957ff7ff)

* postMessage

优点：

* iframe能够原封不动地把嵌入的网页展现出来。
* 如果有多个网页调用iframe，只需要修改iframe的内容，就可以实现对调用iframe的每一个页面内容的更改，方便快捷。
* 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe来嵌套，可以增加代码的可重用性。
* 如果遇到加载缓慢的第三方内容，如图标和广告等，可以用iframe来解决

缺点：
iframe会阻塞主页面的Onload事件
搜索引擎的检索程序无法解读这种页面，不利于SEO
iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载
使用iframe之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题

---
参考链接：

1. [src与href](https://blog.csdn.net/Panda_m/article/details/78456358)
2. [语义化](https://www.zhihu.com/question/20455165)
3. [defer和async的区别](https://segmentfault.com/q/1010000000640869)
4. [响应式图片MDN](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
5. [张鑫旭-srcset释义](https://www.zhangxinxu.com/wordpress/2014/10/responsive-images-srcset-size-w-descriptor/)
6. [picture元素-MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture)

---
