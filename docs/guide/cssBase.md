# CSS基础

- [CSS基础](#css基础)
  - [css基本元素类型](#css基本元素类型)
  - [img元素](#img元素)
  - [css选择器的优先级](#css选择器的优先级)
    - [!important优先级（最高）](#important优先级最高)
    - [css选择器有哪些什么属性可以继承](#css选择器有哪些什么属性可以继承)
  - [link和import的区别](#link和import的区别)
  - [css有哪些方式可以隐藏页面元素](#css有哪些方式可以隐藏页面元素)
    - [**opacity:0**和**visibility:hidden**和**display:none**区别](#opacity0和visibilityhidden和displaynone区别)
      - [结构](#结构)
      - [继承](#继承)
      - [性能](#性能)
      - [事件监听](#事件监听)
  - [em和px和rem区别](#em和px和rem区别)
    - [用rem的坏处](#用rem的坏处)
  - [什么是viewport](#什么是viewport)
    - [通过viewport我们可以做什么, 在项目中如何做的适配](#通过viewport我们可以做什么-在项目中如何做的适配)
  - [移动端适配1px的问题（考察dpr）](#移动端适配1px的问题考察dpr)
    - [物理像素(physical pixel/`piksl/)](#物理像素physical-pixelpiksl)
    - [设备独立像素(density-independent pixel)](#设备独立像素density-independent-pixel)
    - [设备像素比(device pixel ratio )](#设备像素比device-pixel-ratio-)
  - [怎么让chrome支持小于12px的文字](#怎么让chrome支持小于12px的文字)
  - [css有几种定位方式](#css有几种定位方式)
  - [如何理解z-index](#如何理解z-index)
  - [清除浮动有哪些方法](#清除浮动有哪些方法)
  - [谈谈对bfc的理解](#谈谈对bfc的理解)
    - [什么是bfc](#什么是bfc)
    - [bfc触发条件](#bfc触发条件)
    - [bfc作用](#bfc作用)
  - [什么时候会触发重绘和重排，区别以及如何避免](#什么时候会触发重绘和重排区别以及如何避免)
  - [translatex与left区别](#translatex与left区别)
  - [drop-shadow和box-shadow的区别和作用](#drop-shadow和box-shadow的区别和作用)
  - [伪类与伪元素](#伪类与伪元素)
    - [盒模型（标准盒模型，怪异盒模型）](#盒模型标准盒模型怪异盒模型)
  - [stylus/sass/less区别](#stylussassless区别)
  - [css写法注意点](#css写法注意点)
  - [浏览器是怎样解析css选择器的](#浏览器是怎样解析css选择器的)
  - [动画gpu加速](#动画gpu加速)
    - [requestanimationframe](#requestanimationframe)
      - [目的](#目的)
      - [优点](#优点)
  - [垂直居中列举想到的](#垂直居中列举想到的)
    - [transform: translate](#transform-translate)
    - [FLEX（不兼容低版本浏览器可以这么做）](#flex不兼容低版本浏览器可以这么做)
    - [Box父元素](#box父元素)
    - [Table父元素](#table父元素)
    - [margin](#margin)

## css基本元素类型

* 【块元素(block)：】

div、ul、li、dl、dt、dd、p、h1-h6、blockquote，canvas

* 【行内元素(inline)：】

a, span, br, i, em, strong, label

* 【行内块元素(inline-block)：】

img, input

* 【空元素（即系没有内容的HTML元素）：】

br、meta、hr、link、input、img

* 块级元素可以设置宽高，独占一行 (display: block)
* 行内元素设置宽高无效，不独占一行 (display: inline)

## img元素

* alt: 图片无法加载时显示的等价描述性文字
* title: 鼠标放在图片上提示的文字

在平常开发中我们会发现img是可以设置宽高的：

* img确实是 `行内元素` 但它也是 `置换元素`
* 浏览器会根据 `img` 标签的src属性的值来读取图片信息并显示出来，而如果查看(X)HTML代码，看不到图片的实际内容
* 又例如根据 `input` 标签的type属性来决定是显示输入框，还是单选按钮等。
* 所以 `img`  `input`  `select`  `textarea`  `button`  `label` 等，他们被称为 `可置换元素` （Replaced element）

这些元素区别一般inline元素是：这些元素拥有内在尺寸 内置宽高 他们可以设置width/height属性，性质等同**inline-block**

[参考文档](https://www.jianshu.com/p/59cc8cb9889e)

## css选择器的优先级

内联 > ID选择器 > 类选择器 > 标签选择器

### !important优先级（最高）

### css选择器有哪些什么属性可以继承

CSS选择器：

* id选择器(#myid)
* 类选择器(. myclassname)
* 标签选择器(div, h1, p)
* 相邻选择器(h1 + p)
* 子选择器（ul > li
* 后代选择器（li a
* 通配符选择器（*）
* 属性选择器（a[rel=”external”]
* 伪类选择器（a:hover, li:nth-child）

可继承的属性：font-size, font-family, color

不可继承的样式：border, padding, margin, width, height

## link和import的区别

* link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
* link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
* link是XHTML标签，无兼容问题；@import是在CSS2. 1提出的，低版本的浏览器不支持。
* link支持使用Javascript控制DOM去改变样式；而@import不支持。

## css有哪些方式可以隐藏页面元素

* **opacity:0**：本质上是将元素的透明度设置为0，就看起来隐藏了，但是依然占据空间且可以交互
* **visibility:hidden**: 与上一个方法类似的效果，占据空间，但是不可以交互了
* **overflow:hidden**: 这个只隐藏元素溢出的部分，但是占据空间且不可交互
* **display:none**: 这个是彻底隐藏了元素，元素从文档流中消失，既不占据空间也不交互，也不影响布局
* **z-index:-9999**: 原理是将层级放到底部，这样就被覆盖了，看起来隐藏了
* **transform: scale(0, 0)**: 平面变换，将元素缩放为0，但是依然占据空间，但不可交互

### **opacity:0**和**visibility:hidden**和**display:none**区别

#### 结构

* opacity:0 --不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，**可以点击**
* visibility:hidden --不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，**不能点击**
* display:none --会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击

#### 继承

* display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。 
* visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible; 可以让子孙节点显式

#### 性能

* display:none: 重排
* visibility:hidden && opacity:0: 重绘
  
#### 事件监听

opacity: 0;可进行Dom事件监听，其余不行


## em和px和rem区别

* **px(像素)**：绝对单位，页面按精确像素展示。
* **em**：相对单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值。
* **rem**：相对单位，可理解为”root em”, 相对根节点html的字体大小来计算，CSS3新加属性，
* **vw/vh**：视口（viewport units）单位，何谓视口，就是根据你浏览器窗口的大小的单位，不受显示器分辨率的影响

### 用rem的坏处

弊端就是，rem是一个相对单位，要想完全契合设计稿，是不可能的。最后渲染出来的元素会有像素差（可能）

可以看一下腾讯团队的解释: https://imweb.io/topic/5745adf5a94f742c1db63485
一般做法是多种适配方案并存 vw vh rem 百分比

## [什么是viewport](https://juejin.im/post/5d736747e51d4561ff66688c)

> 指浏览器的窗口，即浏览器上用来显示网页的那部分区域，是用户网页的可视区域

``` JS
< meta name = "viewport"
content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" >
```

[参考文章](https://www.jianshu.com/p/5f7d2c89ae7b)（讲的很深 够看一段时间）

### 通过viewport我们可以做什么, 在项目中如何做的适配

## 移动端适配1px的问题（考察dpr）

### 物理像素(physical pixel/`piksl/)

一个物理像素是显示器(手机屏幕)上最小的物理显示单元，在操作系统的调度下，每一个设备像素都有自己的颜色值和亮度值。

### 设备独立像素(density-independent pixel)

设备独立像素(也叫密度无关像素)，可以认为是计算机坐标系统中得一个点，这个点代表一个可以由程序使用的虚拟像素(比如: css像素)，然后由相关系统转换为物理像素。
所以说，物理像素和设备独立像素之间存在着一定的对应关系，这就是接下来要说的设备像素比。

### 设备像素比(device pixel ratio )

设备像素比(简称dpr)定义了物理像素和设备独立像素的对应关系，它的值可以按如下的公式的得到：

> 设备像素比(window. devicePixelRatio) = 物理像素 / 设备独立像素 // 在某一方向上，x方向或者y方向

在css中，可以通过-webkit-device-pixel-ratio，-webkit-min-device-pixel-ratio和 -webkit-max-device-pixel-ratio进行媒体查询，对不同dpr的设备，做一些样式适配(这里只针对webkit内核的浏览器和webview)。

[移动端高清、多屏适配方案](http://div.io/topic/1092)

[移动前端开发之viewport的深入理解](http://www.cnblogs.com/2050/p/3877280.html)

## 怎么让chrome支持小于12px的文字

``` css
p {
    font-size: 10px;
    -webkit-transform: scale(0.8);
}
```

## css有几种定位方式

* **static**: 正常文档流定位，此时 top, right, bottom, left 和 z-index 属性无效，块级元素从上往下纵向排布，行级元素从左向右排列。
* **relative**：相对定位，此时的『相对』是相对于正常文档流的位置。
* **absolute**：相对于最近的非 static 定位祖先元素的偏移，来确定元素位置，比如一个绝对定位元素它的父级、和祖父级元素都为relative，它会相对他的父级而产生偏移。
* **fixed**：指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，比如那种回到顶部的按钮一般都是用此定位方式。
* **sticky**：粘性定位，特性近似于relative和fixed的合体，其在实际应用中的近似效果就是IOS通讯录滚动的时候的『顶屁股』。

## 如何理解z-index

CSS 中的z-index属性控制重叠元素的垂直叠加顺序，默认元素的z-index为0，我们可以修改z-index来控制元素的图层位置，而且z-index只能影响设置了position值的元素。

我们可以把视图上的元素认为是一摞书的层叠，而人眼是俯视的视角，设置z-index的位置，就如同设置某一本书在这摞书中的位置。

## 清除浮动有哪些方法

* 空div方法：<div style="clear:both; "></div>
* Clearfix 方法：上文使用. clearfix类已经提到
* overflow: auto或overflow: hidden方法，使用BFC
* 父级div定义zoom

> 在flex已经成为布局主流之后，浮动这种东西越来越少见了，毕竟它的副作用太大

## [谈谈对bfc的理解](https://zhuanlan.zhihu.com/p/25321647)

### 什么是bfc

BFC是指一个独立的渲染区域，只有Block-level Box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干. <br>
它的作用是在一块独立的区域，让处于BFC内部的元素与外部的元素互相隔离. 

### bfc触发条件

* 根元素，即HTML元素
* 绝对定位元素: position: fixed/absolute
* 浮动元素: float 不为none
* overflow不为visible(hidden、auto、scroll)
* display的值为inline-block、table-cell、flex

### bfc作用

* 同一个BFC下外边距会发生折叠: 防止margin发生重叠
* 两栏布局，防止文字环绕等
* 防止元素塌陷

[参考文章](https://zhuanlan.zhihu.com/p/25321647)

## 什么时候会触发重绘和重排，区别以及如何避免

重排必然导致重绘，所以重排更加恶心。其实我们一直研究的应该是怎么避免触发多次重排。

* 将会导致重排的因素：
    - 添加或者删除可见的DOM元素
    - 元素位置改变
    - 元素尺寸改变
    - 元素内容改变（例如：一个文本被另一个不同尺寸的图片替代）
    - 页面渲染初始化（这个无法避免）
    - 浏览器窗口尺寸改变
    - 访问某些属性
* 如何减少repaint/reflow

postion:absolute; left:100px; 会不会引起？不会
translateX:100px; 会不会引起？不会
getBoundingClientRect会不会引起？会
getClientWidth、getClientHeight会不会引起？会

## translatex与left区别

区别是元素位置：

* top left 定位是直接改变元素真实位置的
* transform: translateX(-5px) 只是改变了视觉位置，元素本身位置还是在 0px

最后的区别是效率：
由于transform不改动css布局，因为渲染行为大多数情况下在元素本身，所以效率比 top left 要高。另外在早期的一些版本，用 transform: translateZ(0px) 强制开启硬件加速好像只能应用在 transform 上。

## [drop-shadow和box-shadow的区别和作用](http://www.zhangxinxu.com/wordpress/2016/05/css3-filter-drop-shadow-vs-box-shadow)

区别：

* 兼容性不一：box-shadow支持得更好，但问题不大
* 同样的参数值，表现效果有差异

``` css
filter: drop-shadow(x偏移, y偏移, 模糊大小, 色值);
box-shadow: 5px 5px 10px black; // 阴影距离更小，色值要更深
```

* drop-shadow没有内阴影效果
* drop-shadow不能阴影叠加

> 重点：drop-shadow才是真正意义上的投影，而box-shadow只是盒阴影而已

box-shadow顾名思意“盒阴影”，只是盒子的阴影；这盒子中间明明是透明的，结果，阴影的时候，居然光线没有穿透；<br/>
但是drop-shadow就符合真实世界的投影，非透明的颜色，我就有投影；透明部分，光线穿过，没投影，而什么盒子不盒子的，跟我没有任何关系

## [伪类与伪元素](https://segmentfault.com/a/1190000000484493)

【伪类】 <br/>
是一个以冒号(:)作为前缀，被添加到一个选择器末尾的关键字，当你希望样式在特定状态下才被呈现到指定的元素时，你可以往元素的选择器后面加上对应的伪类。

【伪元素】<br/>
用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过::before来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

【区别】<br/>
伪类的效果可以通过添加一个实际的类来达到，而伪元素的效果则需要通过添加一个实际的元素才能达到，这也是为什么他们一个称为伪类，一个称为伪元素的原因

### 盒模型（标准盒模型，怪异盒模型）

盒模型由content（内容）、padding（内边距）、border（边框）、margin（外边距）组成

标准盒模型和怪异盒模型

* 标准盒模型： 在W3C标准下，我们定义元素的width值即为盒模型中的content的宽度值，height值即为盒模型中的content的高度值。
* 怪异盒模型：而IE怪异盒模型（IE8以下）width的宽度并不是content的宽度，而是border-left + padding-left + content的宽度值 + padding-right + border-right之和，height同理。

虽然现代浏览器默认使用W3C的标准盒模型，但是在不少情况下怪异盒模型更好用，于是W3C在css3中加入box-sizing。

* box-sizing: content-box // 标准盒模型
* box-sizing: border-box // 怪异盒模型(IE8以下)

## stylus/sass/less区别

## css写法注意点

[选择器](https://www.w3cplus.com/css3/pseudo-class-selector)
 > css选择符是从右到左进行匹配的

* dom深度尽量浅; 
* 减少inline javascript、css的数量。
* 使用现代合法的css属性。
* 不要为id选择器指定类名或是标签，因为id可以唯一确定一个元素。
* 避免后代选择符，尽量使用子选择符。原因：子元素匹配符的概率要大于后代元素匹配符。后代选择符; #tp p{} 子选择符：#tp>p{}
* 避免使用通配符，举一个例子，. mod . hd *{font-size:14px; } 根据匹配顺序, 将首先匹配通配符, 也就是说先匹配出通配符, 然后匹配. hd（就是要对dom树上的所有节点进行遍历他的父级元素）, 然后匹配. mod, 这样的性能耗费可想而知. 

## 浏览器是怎样解析css选择器的

CSS选择器的解析是从右向左解析的。若从左向右的匹配，发现不符合规则，需要进行回溯，会损失很多性能。<br/>
若从右向左匹配，先找到所有的最右节点，对于每一个节点，向上寻找其父节点直到找到根元素或满足条件的匹配规则，则结束这个分支的遍历。<br/>
两种匹配规则的性能差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点），而从左向右的匹配规则的性能都浪费在了失败的查找上面。<br/>
而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图。在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 Render Tree。

## 动画gpu加速

开启gpu加速动画的方式：

* will-change:transform
* transform:translateZ(0）
* transform: translate3d(0, 0, 0); 

横滑模块在安卓手机上不流畅可给滑动部分添加做处理（目测为gpu加速，注意不要在子元素上添加，子元素过多添加容易导致网页崩溃闪退）

``` css
-webkit-transform: translate3d(0, 0, 0);
transform: translate3d(0, 0, 0);
-webkit-backface-visibility: hidden; //开启GPU硬件加速之后，有些时候可能会导致浏览器频繁闪烁或抖动，可以尝试以下办法解决
backface-visibility: hidden;
-webkit-perspective: 1000;
```

【追问】如果需要手动写动画，你认为最小时间间隔是多久，为什么？

> 多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16. 7ms。

### requestanimationframe

> requestAnimationFrame是浏览器用于定时循环操作的一个接口，类似于setTimeout，主要用途是按帧对网页进行重绘

#### 目的

是为了让各种网页动画效果（DOM动画、Canvas动画、SVG动画、WebGL动画）能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。代码中使用这个API，就是告诉浏览器希望执行一个动画，让浏览器在下一个动画帧安排一次网页重绘

#### 优点

* 节流：requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧
* 节能：在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量

``` js
let divEle = document.getElementById("div");
const distance = 1500;
const timeCount = 3000;

function handler(time) {
    if (time > timeCount) {
        time = timeCount;
    }
    divEle.style.left = time * distance / timeCount;
    window.requestAnimationFrame(handler);
}
window.requestAnimationFrame(handler);
```

## 垂直居中列举想到的

文字居中

``` css
 line-height=height
```

知道自己的宽高：
父元素relative

``` css
position: absolute;
width: 100px;
height: 100px;
top: 50%;
margin-top: -50px;
left: 50%;
margin-left: -50px;
```

不知道自己的宽高

### transform: translate

``` css
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%)
```

### FLEX（不兼容低版本浏览器可以这么做）

``` css
display: flex;
display： -webkit-flex;
align-item: center;
(上下居中) -webkit-align-item: center;
justify-content: center;
（左右居中） -webkit-justify-content: center;
```

### Box父元素

``` css
display: box;
display: -webkit-box;
-webkit-box-pack: center;
（左右居中） -webkit-box-align: center;
(上下居中)
```

### Table父元素

``` css
display: table;
vertical-align: middle;
```

子元素

``` css
display: table-cell;
vertical-align: middle;
```

### margin

``` css
position: absolute;
top: 0;
bottom: 0;
margin: auto;
left：0;
right: 0;
```
