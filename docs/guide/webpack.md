# WEBPACK

- [WEBPACK](#webpack)
  - [webpack配置中几个核心概念](#webpack配置中几个核心概念)
  - [webpack是的构建流程是什么](#webpack是的构建流程是什么)
  - [流程细节](#流程细节)
  - [loader](#loader)
    - [处理 SCSS 文件为例](#处理-scss-文件为例)
    - [loder是同步还是异步](#loder是同步还是异步)
  - [plugin](#plugin)
  - [常用的哪些loader和plugin](#常用的哪些loader和plugin)
  - [Loader和Plugin的不同](#loader和plugin的不同)
  - [webpack跟gulp的区别](#webpack跟gulp的区别)
  - [如何用webpack来优化前端性能](#如何用webpack来优化前端性能)
  - [如何提高webpack打包速度](#如何提高webpack打包速度)
  - [webpack的劣势在哪里, 与rollup对比](#webpack的劣势在哪里-与rollup对比)
  - [骨架屏实现](#骨架屏实现)
  - [工程化原理](#工程化原理)

## webpack配置中几个核心概念

> 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

* **Entry**：指定webpack开始构建的入口模块，它指示webpack应该从哪个模块开始着手，来作为其构建内部依赖图的开始。
* **Output**：Output属性告诉webpack在哪里输出它所创建的bundles，也可指定bundles的名称，默认位置为. /dist。
* **Loaders**：编译器, 由于webpack只能处理javascript，所以我们需要对一些非js文件处理成webpack能够处理的模块，比如sass文件
* **Plugins**：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情
* **Module** 模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
* **Mode**: 模式, 可以通过配置对象的mode属性进行配置，主要值为production或者development。两种模式的区别在于一个是为生产环境编译打包，一个是为了开发环境编译打包。生产环境模式下，webpack会自动对代码进行压缩等优化，省去了配置的麻烦
* **Chunk**: coding split的产物，我们可以对一些代码打包成一个单独的chunk，比如某些公共模块，去重，更好的利用缓存。或者按需加载某些功能模块，优化加载时间。在webpack3及以前我们都利用CommonsChunkPlugin将一些公共代码分割成一个chunk，实现单独加载。在webpack4 中CommonsChunkPlugin被废弃，使用SplitChunksPlugin
* **bundle**: 是由webpack打包出来的文件

## webpack是的构建流程是什么

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

* 1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
* 2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
* 3. 确定入口：根据配置中的 entry 找出所有的入口文件；
* 4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
* 5. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
* 6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
* 7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

> 在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

## 流程细节

1. 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。
2. 编译：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
3. 输出：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。

## [loader](https://segmentfault.com/a/1190000015088834)

> loader可以理解为webpack的编译器，它使得webpack可以处理一些非JavaScript文件
> 使用合适的loader可以让JavaScript的import导入非JavaScript模块。JavaScript只认为JavaScript文件是模块，而webpack的设计思想即万物皆模块，为了使得webpack能够认识其他“模块”，所以需要loader这个“编译器”

### 处理 SCSS 文件为例

1. SCSS 源代码会先交给 sass-loader 把 SCSS 转换成 CSS；
2. 把 sass-loader 输出的 CSS 交给 css-loader 处理，找出 CSS 中依赖的资源、压缩 CSS 等；
3. 把 css-loader 输出的 CSS 交给 style-loader 处理，通过一个JS脚本创建一个style标签，里面包含一些样式；

> 可以看出以上的处理过程需要有顺序的链式执行，先 sass-loader 再 css-loader 再 style-loader。
> 注意写法顺序：loader的加载顺序是从右往左

### loder是同步还是异步

## plugin

> 插件可以用于执行范围更广的任务，包括打包、优化、压缩、搭建服务器等等，功能十分强大

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
* clean-webpack-plugin: 加上hash后由于每次生成的JavaScript文件都不同名，所以新的文件不会覆盖旧的文件，而旧的文件一只会存在于/dist文件夹中，随着编译次数的增加，这个文件夹会越来越膨胀，所以应该想办法每次生成新的bundle文件之前清理/dist文件夹，以确保文件夹的干净整洁

## Loader和Plugin的不同

作用不同：

* Loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析_非JavaScript文件_的能力。
* Plugin直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果

用法不同：

Loader在module. rules中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个Object，里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）
Plugin在plugins中单独配置。 类型为数组，每一项是一个plugin的实例，参数都通过构造函数传入。

## webpack跟gulp的区别

Gulp是基于任务运行的工具：
它们会自动执行指定的任务，就像流水线，把资源放上去然后通过不同插件进行加工，它们包含活跃的社区，丰富的插件，能方便的打造各种工作流。

Webpack是基于模块化打包的工具:
自动化处理模块, webpack把一切当成模块，当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

## 如何用webpack来优化前端性能

用webpack优化前端性能是指优化webpack的输出结果，让打包的最终结果在浏览器运行快速高效。

* 压缩代码: 删除多余的代码、注释、简化代码的写法等等方式。可以利用webpack的UglifyJsPlugin和ParallelUglifyPlugin来压缩JS文件， 利用cssnano（css-loader?minimize）来压缩css
* 利用CDN加速: 在构建过程中，将引用的静态资源路径修改为CDN上对应的路径。可以利用webpack对于output参数和各loader的publicPath参数来修改资源路径
* Tree Shaking: 将代码中永远不会走到的片段删除掉。可以通过在启动webpack时追加参数--optimize-minimize来实现
* Code Splitting: 将代码按路由维度或者组件分块(chunk), 这样做到按需加载, 同时可以充分利用浏览器缓存
* 提取公共第三方库:  SplitChunksPlugin插件来进行公共模块抽取, 利用浏览器缓存可以长期缓存这些无需频繁变动的公共代码

## 如何提高webpack打包速度

* HappyPack（打包优化）：在webpack运行在node中打包的时候是单线程去一件一件事情的做，HappyPack可以开启多个子进程去并发执行，子进程处理完后把结果交给主进程
* 外部扩展(externals): 将不怎么需要更新的第三方库脱离webpack打包，不被打入bundle中，从而减少打包时间, 比如jQuery用script标签引入
* 利用缓存: webpack. cache、babel-loader. cacheDirectory、HappyPack. cache都可以利用缓存提高rebuild效率
* 缩小文件搜索范围: 比如babel-loader插件, 如果你的文件仅存在于src中, 那么可以include: path. resolve(__dirname, 'src'), 当然绝大多数情况下这种操作的提升有限, 除非不小心build了node_modules文件
* 多入口情况下，使用CommonsChunkPlugin来提取公共代码（提升构建速度）

## webpack的劣势在哪里, 与rollup对比

* webpack适用于大型复杂的前端站点构建: webpack有强大的loader和插件生态, 打包后的文件实际上就是一个立即执行函数，这个立即执行函数接收一个参数，这个参数是模块对象，键为各个模块的路径，值为模块内容。立即执行函数内部则处理模块之间的引用，执行模块等, 这种情况更适合文件依赖复杂的应用开发. 

* rollup适用于基础库的打包，如vue、d3等: Rollup 就是将各个模块打包进一个文件中，并且通过 Tree-shaking 来删除无用的代码, 可以最大程度上降低代码体积, 但是rollup没有webpack如此多的的如代码分割、按需加载等高级功能，其更聚焦于库的打包，因此更适合库的开发

## 骨架屏实现

## 工程化原理

[webpack原理](https://segmentfault.com/a/1190000015088834?utm_source=tag-newest)
