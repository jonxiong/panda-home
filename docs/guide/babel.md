# Babel

## Babel历史

Babel的原意指得是人类为了见到上帝，准备建造的一座通天塔(babel)，上帝为了阻止人类，让他们语言变的不同。于是，人类开始有了文化差异，从而导致了冲突，塔也就建不起来了……
==旧约圣经==

## 什么是Babel

> Babel is a JavaScript compiler
![babel-do](https://pic1.zhimg.com/80/v2-e1ed19f8887bb7dd5125f54924a58044_1440w.jpg)
Babel是一个现代JS编译器, 有很多**优秀的es6, es7新语法**都不能直接在**支持低版本语法的浏览器**中运行, 各浏览器对JS版本的支持各不相同
为了解决这个“沟通不畅”的问题，所以就有了Babel，Babel的出现使得我们可以无须顾忌的去使用新的的语法.

#### 特性：

* Babel可以认识并且更改代码
* Babel 的功能很纯粹。我们传递一段源代码给 Babel，然后它返回一串新的代码给我们。它不会运行我们的代码，也不会去打包我们的代码

## Babel的处理步骤

1. 解析（parse）-- 将源代码变成抽象语法树AST
2. 转换（transform）-- 操作AST，把es6/es7等新语法的部分转换为ES5, 这部分我们可以通过配置bebel插件去操作
3. 生成（generate）-- 将更改后的AST，再变回JS代码

> 注意babel本身不具有任何转化功能，它把转化的功能都分解到插件里面。因此当我们不配置任何插件时，经过babel的代码和输入是相同的

## Babel的基本配置

Babel支持多种的配置方式

* babel.config.js
* .babelrc
* .babelrc.js
* package.json

如果希望以编程的方式创建配置文件, 那么**babel.config.js**可以满足我们的需求

``` js
// babel.config.js
module.exports = function(api) {
    api.cache(true);
    const presets = [["@babel/preset-env", {
        "useBuiltIns":"usage" // 检测代码中 ES6/7/8 等的使用情况，仅仅加载代码中用到的 polyfills
    }]];
    const plugins = [
        "@babel/plugin-transform-arrow-functions",
        "@babel/plugin-transform-classes"
    ];

    // 单测需要转一下es modules至commonjs
    if (process.env.NODE_ENV === 'test:unit') {
        plugins.push('@babel/plugin-transform-modules-commonjs');
    }

    return {
        presets,
        plugins
    };
};
```

babel配置里面主要分成两大块：

* plugins: transform 的载体
* presets: 预设，一系列plugins的组合

presets
官方提供了如下几个
@babel/preset-env 推荐使用的
@babel/preset-flow
@babel/preset-react
@babel/preset-typescript

### plugins 与 presets 同时存在的执行顺序
1. 先执行 plugins 的配置项,再执行 Preset 的配置项；
2. plugins 配置项，按照声明顺序执行；
3. Preset 配置项，按照声明逆序执行。

[详细配置](https://zhuanlan.zhihu.com/p/43249121)
## Babel的处理流程

### 1. 代码解析 (Parsing)

> 将代码解析成抽象语法树（AST），每个js引擎（比如V8引擎）都有自己的AST解析器。

在解析过程中有两个阶段：
词法分析和语法分析，
词法分析 可以看成是对代码进行“分词”，它接收一段源代码，执行一个函数把代码分割成被称为Tokens（令牌） 的东西 ，令牌类似于AST中节点；
语法分析： 通过语法分析把 Tokens 转化为上面提到过的 AST

Babel中用的解析器是babylon/`baibilen/

### 2. 代码转换（Transform）

在这个阶段，Babel接收得到AST并对其进行深度优先遍历，在此过程中对节点进行添加、更新及移除操作。这部分也是Babel插件介入工作的部分

<!-- 我们转换代码的关键就是根据当前的AST, 以我们定义的规则生成新的AST, 转换的过程就是生成新AST的过程. -->

Babel中的babel-traverse就是用来做转换的

<!-- traverse方法是一个遍历方法，path封装了每一个节点，并且还提供容器container，作用域scope这样的字段。提供个更多关于节点的相关的信息，让我们更好的操作节点。 -->

### 3：生成(Generator)

经过上面两个阶段，需要转译的代码已经经过转换，生成了新的AST，最后一个阶段就是根据这个AST来生成代码

Babel中的babel-generator对应这一步操作

[插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
[参考文章](https://mp.weixin.qq.com/s/1OyBkl5NnFO1q86L7GjQwg)
[深入浅出 Babel 上篇：架构和原理 + 实战](https://juejin.im/post/5d94bfbf5188256db95589be#heading-9)
[面试官(7): 聊一聊 Babel?](https://juejin.im/post/5c03b85ae51d450c740de19c#heading-9)
[平庸前端码农之蜕变 — AST](https://juejin.im/post/5bfc21d2e51d4544313df666)
[深入Babel](https://juejin.im/post/5c21b584e51d4548ac6f6c99)