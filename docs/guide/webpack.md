# webpack

- [webpack](#webpack)
  - [分别介绍bundle，chunk，module是什么](#分别介绍bundlechunkmodule是什么)
  - [webpack配置中需要理解几个核心的概念](#webpack配置中需要理解几个核心的概念)
  - [webpack源码之ast简介](#webpack源码之ast简介)
    - [原理](#原理)
    - [应用场景](#应用场景)
  - [loder是同步还是异步](#loder是同步还是异步)
  - [如何编写一个loader或者plugin](#如何编写一个loader或者plugin)
  - [webpack跟gulp的区别](#webpack跟gulp的区别)
  - [常用的哪些loader和plugin](#常用的哪些loader和plugin)
  - [babel-loader的编译原理](#babel-loader的编译原理)
  - [Loader和Plugin的不同](#loader和plugin的不同)
  - [webpack是的构建流程是什么](#webpack是的构建流程是什么)
  - [如何用webpack来优化前端性能](#如何用webpack来优化前端性能)
  - [webpack的劣势在哪里](#webpack的劣势在哪里)
  - [骨架屏实现](#骨架屏实现)

## 分别介绍bundle，chunk，module是什么

* bundle：是由webpack打包出来的文件
* chunk：代码块，一个chunk由多个模块组合而成，用于代码的合并和分割
* module：是开发中的单个模块，在webpack的世界，一切皆模块，一个模块对应一个文件，webpack会从配置的entry中递归开始找出所有依赖的模块

## webpack配置中需要理解几个核心的概念

* **Entry**：指定webpack开始构建的入口模块，从该模块开始构建并计算出直接或间接依赖的模块或者库
* **Output**：告诉webpack如何命名输出的文件以及输出的目录
* **Loaders**：由于webpack只能处理javascript，所以我们需要对一些非js文件处理成webpack能够处理的模块，比如sass文件
* **Plugins**：Loaders将各类型的文件处理成webpack能够处理的模块，plugins有着很强的能力。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。但也是最复杂的一个。比如对js文件进行压缩优化的UglifyJsPlugin插件
* **Chunk**：coding split的产物，我们可以对一些代码打包成一个单独的chunk，比如某些公共模块，去重，更好的利用缓存。或者按需加载某些功能模块，优化加载时间。在webpack3及以前我们都利用CommonsChunkPlugin将一些公共代码分割成一个chunk，实现单独加载。在webpack4 中CommonsChunkPlugin被废弃，使用SplitChunksPlugin

## [webpack源码之ast简介](https://segmentfault.com/a/1190000014178462#articleHeader1)

### 原理
树是一种重要的数据结构, 由根结点和若干颗子树构成的。 根据结构的不同又可以划分为二叉树, trie树, 红黑树等等。
今天研究的对象是AST, 抽象语法树, 它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。
通过操作这棵树, 可以精准的定位到声明、赋值、运算语句, 从而实现对代码的分析、优化、变更等操作。

### 应用场景

* 代码风格, 语法的检查, IDE中的错误提示, 格式化, 自动补全等等
* 优化变更代码，代码压缩等等
* es6转es5, 以及TypeScript、JSX等转化为原生Javascript等等

## loder是同步还是异步

## [如何编写一个loader或者plugin](https://segmentfault.com/a/1190000015088834)

## webpack跟gulp的区别

Gulp是基于任务运行的工具：
它们会自动执行指定的任务，就像流水线，把资源放上去然后通过不同插件进行加工，它们包含活跃的社区，丰富的插件，能方便的打造各种工作流。

Webpack是基于模块化打包的工具:
自动化处理模块, webpack把一切当成模块，当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

## 常用的哪些loader和plugin

loader：

* file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
* url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
* source-map-loader：加载额外的 Source Map 文件，以方便断点调试
* image-loader：加载并且压缩图片文件
* babel-loader：把 ES6 转换成 ES5
* css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
* style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
* eslint-loader：通过 ESLint 检查 JavaScript 代码

plugin：

* define-plugin：定义环境变量
* html-webpack-plugin：简化html文件创建
* uglifyjs-webpack-plugin：通过UglifyES压缩ES6代码
* webpack-parallel-uglify-plugin: 多核压缩, 提高压缩速度
* webpack-bundle-analyzer: 可视化webpack输出文件的体积
* mini-css-extract-plugin: CSS提取到单独的文件中, 支持按需加载

## babel-loader的编译原理

- 解析: 将代码(其实就是字符串)转换成 AST( 抽象语法树)
- 转换: 访问 AST 的节点进行变换操作生成新的 AST
- 生成: 以新的 AST 为基础生成代码

## Loader和Plugin的不同

作用不同：

* Loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析_非JavaScript文件_的能力。
* Plugin直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果

用法不同：

Loader在module.rules中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个Object，里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）
Plugin在plugins中单独配置。 类型为数组，每一项是一个plugin的实例，参数都通过构造函数传入。

## webpack是的构建流程是什么

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

* 1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
* 2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
* 3. 确定入口：根据配置中的 entry 找出所有的入口文件；
* 4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
* 5. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
* 6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
* 7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

## 如何用webpack来优化前端性能

用webpack优化前端性能是指优化webpack的输出结果，让打包的最终结果在浏览器运行快速高效。

* 压缩代码: 删除多余的代码、注释、简化代码的写法等等方式。可以利用webpack的UglifyJsPlugin和ParallelUglifyPlugin来压缩JS文件， 利用cssnano（css-loader?minimize）来压缩css
* 利用CDN加速: 在构建过程中，将引用的静态资源路径修改为CDN上对应的路径。可以利用webpack对于output参数和各loader的publicPath参数来修改资源路径
* Tree Shaking: 将代码中永远不会走到的片段删除掉。可以通过在启动webpack时追加参数--optimize-minimize来实现
* Code Splitting: 将代码按路由维度或者组件分块(chunk), 这样做到按需加载, 同时可以充分利用浏览器缓存

提取公共第三方库:  SplitChunksPlugin插件来进行公共模块抽取, 利用浏览器缓存可以长期缓存这些无需频繁变动的公共代码

## webpack的劣势在哪里

## 骨架屏实现
