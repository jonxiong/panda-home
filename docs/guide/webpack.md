# webpack
- [webpack](#webpack)
  - [分别介绍bundle，chunk，module是什么](#分别介绍bundlechunkmodule是什么)
  - [webpack配置中需要理解几个核心的概念](#webpack配置中需要理解几个核心的概念)
  - [webpack源码之ast简介](#webpack源码之ast简介)
    - [原理](#原理)
    - [应用场景](#应用场景)
  - [loder是同步还是异步](#loder是同步还是异步)
  - [如何编写一个loader或者plugin](#如何编写一个loader或者plugin)

## 分别介绍bundle，chunk，module是什么
- bundle：是由webpack打包出来的文件
- chunk：代码块，一个chunk由多个模块组合而成，用于代码的合并和分割
- module：是开发中的单个模块，在webpack的世界，一切皆模块，一个模块对应一个文件，webpack会从配置的entry中递归开始找出所有依赖的模块

## webpack配置中需要理解几个核心的概念
- **Entry**：指定webpack开始构建的入口模块，从该模块开始构建并计算出直接或间接依赖的模块或者库
- **Output**：告诉webpack如何命名输出的文件以及输出的目录
- **Loaders**：由于webpack只能处理javascript，所以我们需要对一些非js文件处理成webpack能够处理的模块，比如sass文件
- **Plugins**：Loaders将各类型的文件处理成webpack能够处理的模块，plugins有着很强的能力。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。但也是最复杂的一个。比如对js文件进行压缩优化的UglifyJsPlugin插件
- **Chunk**：coding split的产物，我们可以对一些代码打包成一个单独的chunk，比如某些公共模块，去重，更好的利用缓存。或者按需加载某些功能模块，优化加载时间。在webpack3及以前我们都利用CommonsChunkPlugin将一些公共代码分割成一个chunk，实现单独加载。在webpack4 中CommonsChunkPlugin被废弃，使用SplitChunksPlugin

## [webpack源码之ast简介](https://segmentfault.com/a/1190000014178462#articleHeader1)
### 原理
树是一种重要的数据结构,由根结点和若干颗子树构成的。 根据结构的不同又可以划分为二叉树,trie树,红黑树等等。
今天研究的对象是AST,抽象语法树,它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。
通过操作这棵树,可以精准的定位到声明、赋值、运算语句,从而实现对代码的分析、优化、变更等操作。
### 应用场景
- 代码风格,语法的检查,IDE中的错误提示,格式化,自动补全等等
- 优化变更代码，代码压缩等等
- es6转es5,以及TypeScript、JSX等转化为原生Javascript等等

## loder是同步还是异步

## [如何编写一个loader或者plugin](https://segmentfault.com/a/1190000015088834)